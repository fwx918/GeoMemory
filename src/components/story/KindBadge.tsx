import type { ParagraphKind } from '../../types'

const STYLE: Record<Exclude<ParagraphKind, 'fact'>, { label: string; className: string }> = {
  legend: { label: '传说', className: 'border-seal/50 bg-seal/15 text-seal' },
  disputed: { label: '存疑', className: 'border-amber-300/40 bg-amber-300/10 text-amber-200/90' },
}

/** 传说 / 存疑 印章角标（史实层不显示，避免噪音） */
export default function KindBadge({ kind }: { kind?: ParagraphKind }) {
  if (!kind || kind === 'fact') return null
  const s = STYLE[kind]
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-1 py-px font-serif text-[10px] leading-tight ${s.className}`}
    >
      {s.label}
    </span>
  )
}
