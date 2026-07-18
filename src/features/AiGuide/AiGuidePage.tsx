import { useApp } from '../../context/AppContext'
import { useAiGuide } from '../../hooks/useAiGuide'
import ChatWindow from '../../components/chat/ChatWindow'
import ChatInput from '../../components/chat/ChatInput'

const SUGGESTIONS = [
  '这里500年前是什么？',
  '为什么叫这个名字？',
  '这里有哪些名人？',
  '古今有什么变化？',
]

interface ChipsProps {
  onSend: (s: string) => void
  disabled?: boolean
  variant: 'stack' | 'row'
}

/** 建议追问按钮，空态竖排 / 底部横排两种布局，统一带 disabled 守卫 */
function SuggestionChips({ onSend, disabled, variant }: ChipsProps) {
  const wrap = variant === 'stack' ? 'flex flex-col gap-2' : 'flex gap-2 overflow-x-auto no-scrollbar'
  const chip =
    variant === 'stack'
      ? 'mx-auto rounded-full border border-white/10 bg-ink-soft/70 px-4 py-2 text-sm text-parchment-100/85'
      : 'shrink-0 rounded-full border border-white/10 bg-ink-soft/70 px-3 py-1 text-[11px] text-parchment-100/80'
  return (
    <div className={wrap}>
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onSend(s)}
          disabled={disabled}
          className={`${chip} transition active:scale-95 disabled:opacity-40`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export default function AiGuidePage() {
  const { activeLocation, chat } = useApp()
  const { isTyping, send } = useAiGuide()

  const emptyHint = (
    <div className="mt-6 space-y-4 text-center">
      <div className="text-5xl">🤖</div>
      <div>
        <p className="font-serif text-base text-parchment-50">时空导游已就位</p>
        <p className="mt-1 text-xs text-parchment-200/60">
          像与历史学家聊天一样，问我关于「{activeLocation.name}」的一切
        </p>
      </div>
      <SuggestionChips onSend={send} disabled={isTyping} variant="stack" />
    </div>
  )

  return (
    <div className="flex h-full flex-col">
      {/* 当前地点上下文 */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink/95 px-4 py-2 text-xs text-parchment-200/70">
        <span>{activeLocation.cover}</span>
        正在讲述：<span className="text-parchment-50">{activeLocation.name}</span>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl">
          <ChatWindow messages={chat} isTyping={isTyping} emptyHint={emptyHint} />
        </div>
      </div>

      {/* 已有对话时，底部仍提供快捷追问 */}
      {chat.length > 0 && (
        <div className="mx-auto w-full max-w-3xl border-t border-white/5 px-3 py-2">
          <SuggestionChips onSend={send} disabled={isTyping} variant="row" />
        </div>
      )}

      <div className="mx-auto w-full max-w-3xl">
        <ChatInput onSend={send} disabled={isTyping} />
      </div>
    </div>
  )
}
