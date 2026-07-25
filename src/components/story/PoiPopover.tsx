import type { EraKey, Poi } from '../../types'
import KindBadge from './KindBadge'

interface Props {
  poi: Poi
  era: EraKey
  onClose: () => void
}

/**
 * 地标弹层：显示该 POI 在当前时代的称呼与缩略故事
 * （如雷峰塔在吴越叫「皇妃塔」、民国是「塔倒」）。
 */
export default function PoiPopover({ poi, era, onClose }: Props) {
  const state = poi.eraStates?.[era]
  // 该时代没有专属故事时，退回任一已有状态，避免空弹层
  const fallback = state ? undefined : Object.values(poi.eraStates ?? {})[0]
  const shown = state ?? fallback

  return (
    <div className="absolute inset-x-3 bottom-3 z-10 animate-fade-in rounded-xl border border-white/10 bg-ink/95 p-3 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-parchment-50">
            {shown?.name ?? poi.name}
            {shown?.legend && <KindBadge kind="legend" />}
          </h4>
          {shown?.name && shown.name !== poi.name && (
            <p className="text-[11px] text-parchment-200/50">今称 {poi.name}</p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="关闭"
          className="shrink-0 rounded-full px-1.5 text-parchment-200/50 transition-colors hover:text-parchment-50"
        >
          ✕
        </button>
      </div>

      {shown ? (
        <p className="mt-1.5 text-xs leading-relaxed text-parchment-100/85">{shown.story}</p>
      ) : (
        <p className="mt-1.5 text-xs text-parchment-200/50">
          这个地点在本时代暂无独立记载。
        </p>
      )}

      {!state && fallback && (
        <p className="mt-1 text-[11px] text-parchment-200/40">（该时代无专属记载，显示的是其他时代的条目）</p>
      )}

      {poi.coordUnverified && (
        <p className="mt-1 text-[11px] text-amber-100/50">考：此点坐标为近似值，待核。</p>
      )}
    </div>
  )
}
