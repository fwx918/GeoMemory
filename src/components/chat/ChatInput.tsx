import { useState } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim() || disabled) return
    onSend(text)
    setText('')
  }

  return (
    <div className="flex gap-2 border-t border-white/5 bg-ink/95 p-3">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="向时空导游提问…"
        className="flex-1 rounded-full border border-white/10 bg-ink-soft/80 px-4 py-2 text-sm text-parchment-50 placeholder:text-parchment-200/40 focus:border-seal/60 focus:outline-none"
      />
      <button
        onClick={submit}
        disabled={disabled || !text.trim()}
        className="rounded-full bg-seal px-4 py-2 text-sm font-medium text-parchment-50 active:scale-95 disabled:opacity-40"
      >
        发送
      </button>
    </div>
  )
}
