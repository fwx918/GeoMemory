import { useCallback, useState } from 'react'
import type { EraKey, Location } from '../types'
import { AI_QA_RULES, ERA_PHRASE_MAP, getRecord } from '../data'
import { useApp } from '../context/AppContext'

const GUIDE_PREFIX = '【时空导游】'

function detectEra(query: string): EraKey | undefined {
  for (const { phrases, era } of ERA_PHRASE_MAP) {
    if (phrases.some((p) => query.includes(p.toLowerCase()))) return era
  }
  return undefined
}

/** 纯函数式的「AI」回复引擎：基于关键词 + 年代匹配当前地点的种子数据 */
export function composeAnswer(query: string, loc: Location): string {
  const q = query.trim().toLowerCase()

  // 1) 若提到具体年代，优先回答该年代的快照
  const era = detectEra(q)
  if (era) {
    const rec = getRecord(loc, era)
    if (rec) {
      return `${GUIDE_PREFIX}${rec.title}——\n${rec.summary}\n\n要点：${rec.highlights.join('、')}。`
    }
  }

  // 2) 关键词规则匹配
  for (const rule of AI_QA_RULES) {
    if (rule.keywords.some((k) => q.includes(k.toLowerCase()))) {
      return `${GUIDE_PREFIX}${rule.answer(loc)}`
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

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      pushChat({ id: `u-${Date.now()}`, role: 'user', text: trimmed })
      setIsTyping(true)

      const answer = composeAnswer(trimmed, activeLocation)
      const delay = 350 + Math.min(answer.length * 6, 600)

      window.setTimeout(() => {
        pushChat({ id: `g-${Date.now()}`, role: 'guide', text: answer })
        setIsTyping(false)
      }, delay)
    },
    [activeLocation, pushChat],
  )

  return { isTyping, send }
}
