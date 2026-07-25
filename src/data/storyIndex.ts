import type { Chapter, EraKey, Location, Paragraph, SourceRef } from '../types'
import { getTimeline } from './index'

// ============================================================================
// 段落级检索索引：把地点全部章节展平，供 AI 时空导游按问题检索原文作答。
// 不做向量/模型推断，纯打分匹配——答案永远是史料原文，不是生成的。
// ============================================================================

export interface StoryHit {
  para: Paragraph
  chapter: Chapter
  eraKey: EraKey
  eraLabel: string
  /** 该段涉及的 POI 名称（用于命中打分与「在地图上看」） */
  poiNames: string[]
  score: number
}

interface IndexEntry {
  para: Paragraph
  chapter: Chapter
  eraKey: EraKey
  eraLabel: string
  eraYearRange: [number, number]
  poiIds: string[]
  poiNames: string[]
  /** 预先拼好的检索文本（正文 + 标题 + 地点名 + 来源名） */
  haystack: string
}

const indexCache = new WeakMap<Location, IndexEntry[]>()

/** 展平地点的全部章节段落为可检索条目（结果缓存在 WeakMap） */
export function buildStoryIndex(loc: Location): IndexEntry[] {
  const cached = indexCache.get(loc)
  if (cached) return cached

  const poiName = (id: string) => loc.pois?.find((p) => p.id === id)?.name ?? ''
  const entries: IndexEntry[] = []

  for (const era of getTimeline(loc)) {
    const chapters = loc.records[era.key]?.chapters ?? []
    for (const chapter of chapters) {
      for (const para of chapter.paragraphs) {
        const poiIds = para.poiRefs ?? []
        const poiNames = poiIds.map(poiName).filter(Boolean)
        const sources = [...(para.sources ?? []), ...(chapter.sources ?? [])]
          .map((s: SourceRef) => s.title)
          .join(' ')
        entries.push({
          para,
          chapter,
          eraKey: era.key,
          eraLabel: era.label,
          eraYearRange: era.yearRange,
          poiIds,
          poiNames,
          haystack: `${para.text} ${chapter.title} ${poiNames.join(' ')} ${era.label} ${era.dynasty ?? ''} ${sources}`,
        })
      }
    }
  }

  indexCache.set(loc, entries)
  return entries
}

/** 从问题里抽取可能的年份（「500年前」「1924年」「公元前 241」） */
export function extractYear(q: string): number | undefined {
  const CURRENT = 2026
  const ago = q.match(/(\d+)\s*(?:多)?\s*年前/)
  if (ago) return CURRENT - Number(ago[1])
  const bc = q.match(/(?:公元前|前)\s*(\d+)/)
  if (bc) return -Number(bc[1])
  const ad = q.match(/(\d{3,4})\s*年?/)
  if (ad) {
    const y = Number(ad[1])
    if (y >= 100 && y <= CURRENT) return y
  }
  return undefined
}

/** 中文分词很重，这里用「连续 2-3 字切片」做朴素关键词，够用且零依赖 */
function keywords(q: string): string[] {
  const cleaned = q.replace(/[，。？！、,.?!\s「」《》""'']/g, '')
  const out = new Set<string>()
  for (let n = 2; n <= 3; n++) {
    for (let i = 0; i + n <= cleaned.length; i++) out.add(cleaned.slice(i, i + n))
  }
  return [...out]
}

// 常见提问词不参与打分，避免「这里」「什么」匹配到无关段落
const STOPWORDS = new Set([
  '这里', '那里', '什么', '怎么', '为什么', '是什么', '有哪些', '哪些', '可以',
  '知道', '告诉', '一下', '介绍', '当时', '后来', '现在', '以前', '时候',
])

export interface SearchOptions {
  /** 当前时代（同代段落加权） */
  currentEra?: EraKey
  limit?: number
}

/**
 * 检索最相关的段落。
 * 打分：POI 名命中 ×4 / 章节标题命中 ×3 / 正文关键词 ×1 /
 *       年份落在时代区间 ×5 / 与当前时代相同 ×2
 */
export function searchStory(
  loc: Location,
  query: string,
  { currentEra, limit = 3 }: SearchOptions = {},
): StoryHit[] {
  const entries = buildStoryIndex(loc)
  if (entries.length === 0) return []

  const q = query.trim()
  const year = extractYear(q)
  const kws = keywords(q).filter((k) => !STOPWORDS.has(k))

  const scored = entries.map((e) => {
    let score = 0
    for (const name of e.poiNames) {
      if (name && q.includes(name)) score += 4
    }
    for (const kw of kws) {
      if (e.chapter.title.includes(kw)) score += 3
      else if (e.para.text.includes(kw)) score += 1
      else if (e.haystack.includes(kw)) score += 0.5
    }
    if (year !== undefined) {
      const [a, b] = e.eraYearRange
      if (year >= a && year <= b) score += 5
      // 章节自带的真实年份区间更精确，额外加权
      const cr = e.chapter.yearRange
      if (cr && year >= cr[0] - 30 && year <= cr[1] + 30) score += 4
    }
    if (currentEra && e.eraKey === currentEra) score += 2
    return { entry: e, score }
  })

  return scored
    .filter((s) => s.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry, score }) => ({
      para: entry.para,
      chapter: entry.chapter,
      eraKey: entry.eraKey,
      eraLabel: entry.eraLabel,
      poiNames: entry.poiNames,
      score,
    }))
}

/** 当前时代可供提问的章节标题（无命中时的诚实兜底用） */
export function suggestChapters(loc: Location, era: EraKey, limit = 3): string[] {
  return (loc.records[era]?.chapters ?? [])
    .filter((c) => c.layer !== 'legend')
    .slice(0, limit)
    .map((c) => c.title)
}
