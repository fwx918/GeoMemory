import { useState } from 'react'
import type { SourceRef } from '../../types'

/** 把来源渲染成「据《咸淳临安志·卷十》」式文本 */
export function formatSource(s: SourceRef): string {
  const title = s.kind === 'editorial' ? s.title : `《${s.title}》`
  return s.locator ? `${title}·${s.locator}` : title
}

/** 章末来源行，可展开 */
export default function SourceBar({ sources }: { sources: SourceRef[] }) {
  const [open, setOpen] = useState(false)
  if (sources.length === 0) return null

  return (
    <div className="mt-2 border-t border-white/5 pt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] text-parchment-200/50 transition-colors hover:text-parchment-100"
      >
        <span>据 {formatSource(sources[0])}</span>
        {sources.length > 1 && <span>等 {sources.length} 种</span>}
        <span className={`transition-transform ${open ? 'rotate-90' : ''}`}>›</span>
      </button>
      {open && (
        <ul className="mt-1.5 space-y-1 rounded-lg bg-ink/60 p-2">
          {sources.map((s, i) => (
            <li key={i} className="flex gap-1.5 text-[11px] text-parchment-100/70">
              <span className="text-seal/70">·</span>
              <span>
                {formatSource(s)}
                {s.kind === 'editorial' && (
                  <span className="ml-1 text-parchment-200/40">（编者说明）</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
