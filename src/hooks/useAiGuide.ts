import { useCallback, useEffect, useRef, useState } from 'react'
import type { EraKey, Location } from '../types'
import { AI_QA_RULES, ERA_PHRASE_MAP, getClosestEra, getEra, getRecord } from '../data'
import { useApp } from '../context/AppContext'

const GUIDE_PREFIX = '【时空导游】'

// 模块级单调计数器：跨组件挂载/卸载保持唯一，避免对话在导航后 id 冲突
let msgSeq = 0

function detectEra(query: string): EraKey | undefined {
  for (const { phrases, era } of ERA_PHRASE_MAP) {
    if (phrases.some((p) => query.includes(p.toLowerCase()))) return era
  }
  return undefined
}

/** 纯函数式的「AI」回复引擎：先匹配意图规则，再回退到年代快照。 */
export function composeAnswer(query: string, loc: Location): string {
  const q = query.trim().toLowerCase()

  // 1) 先匹配意图关键词（地名由来 / 人物 / 事件 / 对比 / 生活）。
  //    放在年代检测之前，避免「为什么叫唐人街」被「唐」劫持等问题。
  for (const rule of AI_QA_RULES) {
    if (rule.keywords.some((k) => q.includes(k.toLowerCase()))) {
      return `${GUIDE_PREFIX}${rule.answer(loc)}`
    }
  }

  // 2) 若提到具体年代，回答该年代的快照；若该地点缺该年代记录，
  //    就近回退并明确说明，避免把「1800 年」冒充成「500 年前」。
  const era = detectEra(q)
  if (era) {
    const actual = getClosestEra(loc, era)
    const rec = actual ? getRecord(loc, actual) : undefined
    if (rec && actual) {
      const note =
        actual !== era
          ? `（我暂时没有「${loc.name}」${getEra(era).label}的独立记载，为你呈现最接近的${getEra(actual).label}）\n`
          : ''
      return `${GUIDE_PREFIX}${note}${rec.title}——\n${rec.summary}\n\n要点：${rec.highlights.join('、')}。`
    }
  }

  // 3) 优雅兜底
  return (
    `${GUIDE_PREFIX}关于「${loc.name}」，我手头的记载是这样的：${loc.tagline}。\n\n` +
    `你可以问我：这里以前叫什么？这里 500 年前是什么样？这里有哪些名人？发生过什么大事？`
  )
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
  const { activeLocation, pushChat } = useApp()
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

      const answer = composeAnswer(trimmed, activeLocation)
      const delay = 350 + Math.min(answer.length * 6, 600)

      timerRef.current = window.setTimeout(() => {
        pushChat({ id: `g-${id}`, role: 'guide', text: answer })
        setIsTyping(false)
        timerRef.current = undefined
      }, delay)
    },
    [activeLocation, pushChat, isTyping],
  )

  return { isTyping, send }
}
