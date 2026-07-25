import type { ChatAction, ChatMessage } from '../../types'

interface Props {
  message: ChatMessage
  onAction?: (action: ChatAction) => void
}

export default function ChatBubble({ message, onAction }: Props) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-md bg-seal text-parchment-50'
            : 'rounded-bl-md border border-white/5 bg-ink-soft text-parchment-100'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>

        {/* 操作 chip：把回答接回地图与时间轴 */}
        {message.actions && message.actions.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-white/5 pt-2">
            {message.actions.map((a, i) => (
              <button
                key={i}
                onClick={() => onAction?.(a)}
                className="rounded-full border border-seal/40 bg-seal/10 px-2.5 py-1 text-[11px] text-parchment-50 transition-colors hover:bg-seal/20"
              >
                {a.kind === 'focusPoi' ? '📍' : '⏳'} {a.label} →
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
