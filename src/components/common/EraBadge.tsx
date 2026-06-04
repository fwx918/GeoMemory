import type { EraKey } from '../../types'
import { getEra } from '../../data'

export default function EraBadge({ era }: { era: EraKey }) {
  const e = getEra(era)
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-parchment-200/10 px-2 py-0.5 text-[10px] text-parchment-100">
      {e.label}
      {e.dynasty && <span className="text-parchment-200/50">· {e.dynasty}</span>}
    </span>
  )
}
