import type { ChatMessage } from '../../types'

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-md bg-seal text-parchment-50'
            : 'rounded-bl-md bg-ink-soft text-parchment-100 border border-white/5'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
