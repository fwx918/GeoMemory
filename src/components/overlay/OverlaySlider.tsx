import { useRef, useState } from 'react'
import type { MapLayers } from '../../types'
import type { LayerToggles } from '../map/SvgMap'
import SvgMap from '../map/SvgMap'

interface Props {
  past: MapLayers
  present: MapLayers
  pastLabel: string
  presentLabel: string
  show?: LayerToggles
}

/**
 * 古今对照滑块：两张 SvgMap 上下叠放，用一条可拖动的分隔线 + clip-path
 * 揭示「过去」一侧。左侧显示古地图，右侧显示今地图。
 */
export default function OverlaySlider({
  past,
  present,
  pastLabel,
  presentLabel,
  show,
}: Props) {
  const [pos, setPos] = useState(50) // 分隔线位置百分比
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(4, Math.min(96, pct)))
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full select-none overflow-hidden rounded-2xl border border-white/10 bg-ink-soft"
      onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* 今（底层，整张显示） */}
      <div className="absolute inset-0">
        <SvgMap layers={present} show={show} showLabels={false} />
      </div>

      {/* 古（上层，按分隔线裁剪到左侧） */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <SvgMap layers={past} show={show} showLabels={false} />
      </div>

      {/* 标签 */}
      <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[11px] text-parchment-50">
        {pastLabel}
      </span>
      <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[11px] text-parchment-50">
        {presentLabel}
      </span>

      {/* 分隔线 + 拖柄 */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-seal"
        style={{ left: `${pos}%` }}
      >
        <button
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full bg-seal px-2 py-3 text-[10px] font-bold text-parchment-50 shadow-lg"
          onMouseDown={(e) => {
            e.preventDefault()
            dragging.current = true
          }}
          onTouchStart={() => (dragging.current = true)}
          aria-label="拖动对比"
        >
          ⇄
        </button>
      </div>
    </div>
  )
}
