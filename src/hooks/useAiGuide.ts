import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatAction, EraKey, Location } from '../types'
import {
  AI_QA_RULES,
  ERA_PHRASE_MAP,
  getClosestEraByYear,
  getEraDef,
  getRecord,
} from '../data'
import { extractYear, searchStory, suggestChapters } from '../data/storyIndex'
import { formatSource } from '../components/story/SourceBar'
import { useApp } from '../context/AppContext'

const GUIDE_PREFIX = '【时空导游】'

// 模块级单调计数器：跨组件挂载/卸载保持唯一，避免对话在导航后 id 冲突
let msgSeq = 0

function detectEraYear(query: string): { year: number; label: string } | undefined {
  for (const { phrases, year, label } of ERA_PHRASE_MAP) {
    if (phrases.some((p) => query.includes(p.toLowerCase()))) return { year, label }
  }
  return undefined
}

export interface GuideAnswer {
  text: string
  actions?: ChatAction[]
}

/**
 * 「AI 时空导游」回复引擎，三层：
 * ① 检索式——在章节段落里找原文作答（附来源行 + 操作 chip），这是主路径；
 * ② 意图规则——地名由来/人物/事件/对比等结构化问题；
 * ③ 年代快照 / 诚实兜底。
 * 全程只搬运史料原文，不生成未经记载的内容。
 */
export function composeAnswer(query: string, loc: Location, currentEra?: EraKey): GuideAnswer {
  const q = query.trim().toLowerCase()

  // ① 段落检索（有章节数据的地点）
  const hits = searchStory(loc, query, { currentEra })
  if (hits.length > 0) {
    const top = hits[0]
    const isLegend = top.para.kind === 'legend' || top.chapter.layer === 'legend'
    const lead = isLegend
      ? '这是流传的传说，并非史实——\n'
      : `${top.eraLabel}·${top.chapter.title}——\n`

    const parts = [`${GUIDE_PREFIX}${lead}${top.para.text}`]
    if (top.para.note) parts.push(top.para.note)

    const sources = [...(top.para.sources ?? []), ...(top.chapter.sources ?? [])]
    if (sources.length > 0) {
      parts.push(`据 ${sources.map(formatSource).join('、')}`)
    }
    // 次优命中作为延伸阅读线索
    const alt = hits.slice(1).find((h) => h.chapter.id !== top.chapter.id)
    if (alt) parts.push(`还可以问我：${alt.chapter.title}`)

    const actions: ChatAction[] = []
    const poiId = top.para.poiRefs?.[0]
    if (poiId) {
      const poi = loc.pois?.find((p) => p.id === poiId)
      if (poi) actions.push({ kind: 'focusPoi', label: `在地图上看${poi.name}`, poiId, era: top.eraKey })
    }
    if (top.eraKey !== currentEra) {
      actions.push({ kind: 'gotoEra', label: `切到${top.eraLabel}`, era: top.eraKey })
    }

    return { text: parts.join('\n\n'), actions }
  }

  // ② 意图关键词（地名由来 / 人物 / 事件 / 对比 / 生活）
  for (const rule of AI_QA_RULES) {
    if (rule.keywords.some((k) => q.includes(k.toLowerCase()))) {
      return { text: `${GUIDE_PREFIX}${rule.answer(loc)}` }
    }
  }

  // ③ 年代快照：按问题里的年份/朝代就近取时代记录
  const askedYear = extractYear(query)
  const asked = detectEraYear(q) ?? (askedYear !== undefined ? { year: askedYear, label: `${askedYear} 年` } : undefined)
  if (asked) {
    const key = getClosestEraByYear(loc, asked.year)
    const def = key ? getEraDef(loc, key) : undefined
    const rec = key ? getRecord(loc, key) : undefined
    if (rec && def && key) {
      const inRange = asked.year >= def.yearRange[0] && asked.year <= def.yearRange[1]
      const note = inRange
        ? ''
        : `（我暂时没有「${loc.name}」${asked.label}的独立记载，为你呈现最接近的${def.label}）\n`
      return {
        text: `${GUIDE_PREFIX}${note}${rec.title}——\n${rec.summary}\n\n要点：${rec.highlights.join('、')}。`,
        actions: key !== currentEra ? [{ kind: 'gotoEra', label: `切到${def.label}`, era: key }] : undefined,
      }
    }
  }

  // ④ 诚实兜底：承认没有记载，并给出当前时代可问的章节
  const topics = currentEra ? suggestChapters(loc, currentEra) : []
  const hint =
    topics.length > 0
      ? `这个问题我在史料里没有找到对应的记载。当前时代你可以问我：\n${topics.map((t) => `· ${t}`).join('\n')}`
      : `这个问题我在史料里没有找到对应的记载。关于「${loc.name}」，我手头是：${loc.tagline}。\n\n你可以问我：这里以前叫什么？这里有哪些名人？发生过什么大事？`
  return { text: `${GUIDE_PREFIX}${hint}` }
}

export interface UseAiGuide {
  isTyping: boolean
  send: (text: string) => void
}

/**
 * 模拟「AI 时空导游」：写入用户消息，延迟后写入导游回复，
 * 期间 isTyping=true 以驱动打字指示器。对话历史存于全局 context。
 */
export function useAiGuide(): UseAiGuide {
  const { activeLocation, activeEra, pushChat } = useApp()
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  // 卸载时清理未触发的定时器，避免对已卸载组件 setState
  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
    }
  }, [])

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return // 正在回复时忽略，避免并发竞态

      const id = ++msgSeq
      pushChat({ id: `u-${id}`, role: 'user', text: trimmed })
      setIsTyping(true)

      const answer = composeAnswer(trimmed, activeLocation, activeEra)
      const delay = 350 + Math.min(answer.text.length * 5, 600)

      timerRef.current = window.setTimeout(() => {
        pushChat({ id: `g-${id}`, role: 'guide', text: answer.text, actions: answer.actions })
        setIsTyping(false)
        timerRef.current = undefined
      }, delay)
    },
    [activeLocation, activeEra, pushChat, isTyping],
  )

  return { isTyping, send }
}
