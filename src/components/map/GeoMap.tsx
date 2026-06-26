import { useMemo } from 'react'
import type { GeoBase, GeoEraOverlay, GeoFeature, GeoMarker } from '../../types'
import { createProjector, toPath } from './geo'

const KIND_EMOJI: Record<string, string> = {
  landmark: '📍',
  water: '💧',
  temple: '🛕',
  transit: '🚉',
  village: '🏘️',
  building: '🏢',
}

interface Props {
  geo: GeoBase
  overlay?: GeoEraOverlay
  showLabels?: boolean
  className?: string
  /** 仅显示底图（用于古今对照的“今”底层时隐藏标签等） */
  minimal?: boolean
}

const LINE_STYLE: Record<GeoFeature['kind'], { className: string; width: number; dash?: string }> = {
  river: { className: 'fill-none stroke-sky-400/70', width: 1.1 },
  rail: { className: 'fill-none stroke-parchment-100/70', width: 0.7, dash: '1.4 1' },
  road: { className: 'fill-none stroke-parchment-100/40', width: 0.6 },
  lake: { className: 'fill-sky-500/35 stroke-sky-300/50', width: 0.4 },
  area: { className: 'fill-amber-200/10 stroke-amber-200/25', width: 0.4 },
  wall: { className: 'fill-none stroke-amber-300/70', width: 0.8, dash: '0.8 0.8' },
  mountain: { className: 'fill-emerald-300/15 stroke-emerald-300/40', width: 0.4 },
  coastline: { className: 'fill-none stroke-sky-200/80', width: 0.8, dash: '1.5 1' },
}

function FeaturePath({ f, proj }: { f: GeoFeature; proj: ReturnType<typeof createProjector> }) {
  const closed = f.kind === 'lake' || f.kind === 'area' || f.kind === 'wall' || f.kind === 'mountain'
  const style = LINE_STYLE[f.kind]
  return (
    <path
      className={`map-morph ${style.className}`}
      strokeWidth={style.width}
      strokeDasharray={style.dash}
      strokeLinejoin="round"
      strokeLinecap="round"
      d={toPath(f.coords, proj, closed)}
    />
  )
}

function Marker({
  m,
  proj,
  showLabel,
}: {
  m: GeoMarker
  proj: ReturnType<typeof createProjector>
  showLabel: boolean
}) {
  const [x, y] = proj.project(m.lng, m.lat)
  const emoji = KIND_EMOJI[m.kind ?? 'landmark']
  return (
    <g className="map-morph" transform={`translate(${x} ${y})`}>
      <circle r="2.6" className="fill-seal/30" />
      <circle r="1" className="fill-seal" />
      <text x="0" y="-3.4" textAnchor="middle" style={{ fontSize: '3.4px' }} className="select-none">
        {emoji}
      </text>
      {showLabel && (
        <text
          x="0"
          y="5.6"
          textAnchor="middle"
          style={{ fontSize: '2.9px' }}
          className="select-none fill-parchment-50 font-medium"
        >
          {m.name}
        </text>
      )}
    </g>
  )
}

/**
 * 真实地理地图：用地点的真实经纬度边界 + 河流/湖泊/铁路等要素绘制，
 * 形状与真实地理一致（如淮南的淮河走向、瓦埠湖位置）。时代切换时
 * 通过 base 不变、overlay 变化来表现古今差异。
 */
export default function GeoMap({ geo, overlay, showLabels = true, className = '', minimal = false }: Props) {
  const proj = useMemo(() => createProjector(geo.bbox), [geo.bbox])
  const boundaryPath = useMemo(() => toPath(geo.boundary, proj, true), [geo.boundary, proj])

  return (
    <svg
      viewBox="0 0 100 100"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="真实地理地图"
    >
      <rect x="0" y="0" width="100" height="100" className="fill-[#0f0d0b]" />

      {/* 行政边界填充为陆地 */}
      <path
        d={boundaryPath}
        className="fill-[#262017] stroke-amber-200/30"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      {/* 基础地理要素（现今河流、湖泊、山体） */}
      {geo.base?.map((f) => (
        <FeaturePath key={f.id} f={f} proj={proj} />
      ))}

      {/* 该时代叠加要素 */}
      {overlay?.features?.map((f) => (
        <FeaturePath key={f.id} f={f} proj={proj} />
      ))}

      {/* 地标 */}
      {!minimal &&
        overlay?.markers?.map((m) => (
          <Marker key={m.id} m={m} proj={proj} showLabel={showLabels} />
        ))}
    </svg>
  )
}
