import type { EraKey, Location } from '../../types'
import { resolveEraLabel } from '../../data'

/** 时代徽标：按地点自己的时间轴解析标签（旧全局 key 也能回退显示） */
export default function EraBadge({ loc, era }: { loc: Location; era: EraKey }) {
  const { label, dynasty } = resolveEraLabel(loc, era)
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-parchment-200/10 px-2 py-0.5 text-[10px] text-parchment-100">
      {label}
      {dynasty && <span className="text-parchment-200/50">· {dynasty}</span>}
    </span>
  )
}
