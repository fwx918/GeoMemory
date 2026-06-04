import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../types'
import ChatBubble from './ChatBubble'

interface Props {
  messages: ChatMessage[]
  isTyping?: boolean
  emptyHint?: React.ReactNode
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/5 bg-ink-soft px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-parchment-200/70 animate-typing"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, isTyping, emptyHint }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex flex-col gap-3 p-4">
      {messages.length === 0 && !isTyping && emptyHint}
      {messages.map((m) => (
        <ChatBubble key={m.id} message={m} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  )
}
