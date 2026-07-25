import { useMemo, useState } from 'react'
import type { Chapter, Poi } from '../../types'
import ParagraphBlock from './ParagraphBlock'
import SourceBar from './SourceBar'

interface Props {
  chapters: Chapter[]
  /** 该地点的 POI 表（用于解析 poiRefs） */
  poiById: Record<string, Poi>
  /** 当前高亮的 POI id */
  focusedPoiIds: string[]
  onFocusPois: (ids: string[]) => void
  onPoiClick: (poiId: string) => void
}

function formatYears(range?: [number, number], circa?: boolean): string {
  if (!range) return ''
  const fmt = (y: number) => (y < 0 ? `前 ${-y}` : `${y}`)
  const s = range[0] === range[1] ? fmt(range[0]) : `${fmt(range[0])}–${fmt(range[1])}`
  return `${circa ? '约 ' : ''}${s}`
}

/**
 * 时光卷轴：按章节顺序铺开该时代正文。
 * 滚动到某段时通知父级高亮对应 POI；顶部可一键隐藏传说层。
 */
export default function StoryScroll({
  chapters,
  poiById,
  focusedPoiIds,
  onFocusPois,
  onPoiClick,
}: Props) {
  const [showLegend, setShowLegend] = useState(true)

  const visible = useMemo(
    () => (showLegend ? chapters : chapters.filter((c) => c.layer !== 'legend')),
    [chapters, showLegend],
  )
  const legendCount = useMemo(
    () => chapters.filter((c) => c.layer === 'legend').length,
    [chapters],
  )
  const stats = useMemo(() => {
    const paras = chapters.reduce((n, c) => n + c.paragraphs.length, 0)
    const chars = chapters.reduce(
      (n, c) => n + c.paragraphs.reduce((m, p) => m + p.text.length, 0),
      0,
    )
    return { paras, chars }
  }, [chapters])

  return (
    <div className="space-y-4">
      {/* 卷轴头：篇幅统计 + 传说层开关 */}
      <div className="flex items-center justify-between gap-2 text-[11px] text-parchment-200/50">
        <span>
          {chapters.length} 章 · {stats.paras} 段 · 约 {Math.round(stats.chars / 100) / 10} 千字
        </span>
        {legendCount > 0 && (
          <button
            onClick={() => setShowLegend((v) => !v)}
            className={`rounded-full border px-2 py-0.5 transition-colors ${
              showLegend
                ? 'border-seal/40 bg-seal/10 text-parchment-100/80'
                : 'border-white/10 bg-ink-soft/60 text-parchment-200/40'
            }`}
          >
            {showLegend ? `传说层已显示（${legendCount}）` : '传说层已隐藏'}
          </button>
        )}
      </div>

      {visible.map((chapter, ci) => (
        <article
          key={chapter.id}
          className={`animate-fade-in rounded-2xl border p-4 ${
            chapter.layer === 'legend'
              ? 'border-seal/20 bg-seal/[0.04]'
              : 'border-white/5 bg-ink-soft/60'
          }`}
        >
          {/* 章头：竖排章号 + 标题 + 年份 */}
          <header className="mb-3 flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-seal/15 font-serif text-[11px] text-seal">
              {ci + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-base font-semibold leading-tight text-parchment-50">
                {chapter.title}
              </h3>
              {chapter.yearRange && (
                <p className="mt-0.5 text-[11px] tabular-nums text-parchment-200/50">
                  {formatYears(chapter.yearRange, chapter.circa)}
                  {chapter.layer === 'legend' && <span className="ml-1.5 text-seal/70">传说</span>}
                </p>
              )}
            </div>
          </header>

          <div className="space-y-3">
            {chapter.paragraphs.map((p) => (
              <ParagraphBlock
                key={p.id}
                para={p}
                pois={(p.poiRefs ?? []).map((id) => poiById[id]).filter(Boolean)}
                onEnter={onFocusPois}
                onPoiClick={onPoiClick}
                active={Boolean(p.poiRefs?.some((id) => focusedPoiIds.includes(id)))}
              />
            ))}
          </div>

          {chapter.sources && chapter.sources.length > 0 && (
            <SourceBar sources={chapter.sources} />
          )}
        </article>
      ))}
    </div>
  )
}
