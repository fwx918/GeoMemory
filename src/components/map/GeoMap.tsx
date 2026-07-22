import { memo, useMemo } from 'react'
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
  /** 变化时叠加层淡入（用于时代切换的过渡） */
  morphKey?: string
}

interface KindStyle {
  className: string
  width: number
  dash?: string
  closed?: boolean
}

const LINE_STYLE: Record<GeoFeature['kind'], KindStyle> = {
  river: { className: 'fill-none stroke-sky-400/70', width: 1.1 },
  canal: { className: 'fill-none stroke-sky-300/60', width: 0.7 },
  rail: { className: 'fill-none stroke-parchment-100/70', width: 0.7, dash: '1.4 1' },
  'road-major': { className: 'fill-none stroke-parchment-100/50', width: 0.7 },
  road: { className: 'fill-none stroke-parchment-100/35', width: 0.45 },
  lake: { className: 'stroke-sky-300/50', width: 0.4, closed: true },
  area: { className: 'fill-amber-200/10 stroke-amber-200/25', width: 0.4, closed: true },
  wall: { className: 'fill-none stroke-amber-300/70', width: 0.8, dash: '0.9 0.9', closed: true },
  mountain: { className: 'stroke-emerald-300/40', width: 0.4, closed: true },
  coastline: { className: 'fill-none stroke-sky-200/80', width: 0.8, dash: '1.5 1' },
  'shoreline-old': { className: 'fill-none stroke-sky-200/60', width: 0.7, dash: '1.8 1.2' },
}

type Projector = ReturnType<typeof createProjector>

// memo：proj / f 均为稳定引用（数据模块常量），仅在真正变化时重投影
const FeaturePath = memo(function FeaturePath({ f, proj }: { f: GeoFeature; proj: Projector }) {
  const style = LINE_STYLE[f.kind]
  // D 级（文献复原示意）统一虚线呈现，不冒充实测
  const dash = f.accuracy === 'D' ? '1.2 1' : style.dash
  // 多环面（如西湖 + 岛屿）：evenodd 挖洞
  const d = f.rings
    ? f.rings.map((r) => toPath(r, proj, true)).join(' ')
    : toPath(f.coords, proj, Boolean(style.closed))

  const fill =
    f.kind === 'lake' ? 'url(#water-fill)' : f.kind === 'mountain' ? 'url(#hill-hatch)' : undefined

  return (
    <path
      className={style.className}
      style={fill ? { fill } : undefined}
      fillRule="evenodd"
      strokeWidth={style.width}
      strokeDasharray={dash}
      strokeLinejoin="round"
      strokeLinecap="round"
      d={d}
    />
  )
})

type LabelPlacement = 'below' | 'above' | null

interface Box {
  x1: number
  y1: number
  x2: number
  y2: number
}

/**
 * 贪心标签布局：先占位所有点标（圆点+emoji），再逐个尝试
 * 下方 → 上方两个候选位；都冲突则隐藏文字（悬浮 title 仍可见）。
 */
function layoutLabels(ms: GeoMarker[], proj: Projector): LabelPlacement[] {
  const placed: Box[] = []
  const pos = ms.map((m) => {
    const [x, y] = proj.project(m.lng, m.lat)
    return { x, y, w: Math.max(6, m.name.length * 2.9) }
  })
  for (const p of pos) placed.push({ x1: p.x - 2.4, y1: p.y - 4.8, x2: p.x + 2.4, y2: p.y + 2.4 })
  const overlaps = (r: Box) =>
    placed.some((p) => r.x1 < p.x2 && r.x2 > p.x1 && r.y1 < p.y2 && r.y2 > p.y1)
  return pos.map((p) => {
    const below: Box = { x1: p.x - p.w / 2, y1: p.y + 2.6, x2: p.x + p.w / 2, y2: p.y + 6.2 }
    if (!overlaps(below)) {
      placed.push(below)
      return 'below'
    }
    const above: Box = { x1: p.x - p.w / 2, y1: p.y - 8.8, x2: p.x + p.w / 2, y2: p.y - 5.0 }
    if (!overlaps(above)) {
      placed.push(above)
      return 'above'
    }
    return null
  })
}

const Marker = memo(function Marker({
  m,
  proj,
  showLabel,
  labelPos = 'below',
}: {
  m: GeoMarker
  proj: Projector
  showLabel: boolean
  labelPos?: LabelPlacement
}) {
  const [x, y] = proj.project(m.lng, m.lat)
  const emoji = KIND_EMOJI[m.kind ?? 'landmark']
  return (
    <g transform={`translate(${x} ${y})`}>
      <title>{m.name}</title>
      <circle r="2.4" className="fill-seal/30" />
      <circle r="0.9" className="fill-seal" />
      <text x="0" y="-3.2" textAnchor="middle" style={{ fontSize: '3.2px' }} className="select-none">
        {emoji}
      </text>
      {showLabel && labelPos && (
        <text
          x="0"
          y={labelPos === 'below' ? 5.2 : -5.8}
          textAnchor="middle"
          style={{ fontSize: '2.7px', paintOrder: 'stroke', stroke: '#15110d', strokeWidth: 0.5 }}
          className="select-none fill-parchment-50 font-medium"
        >
          {m.name}
        </text>
      )}
    </g>
  )
})

/**
 * 真实地理地图：用地点的真实经纬度边界/水体/山体等要素绘制，
 * 形状与真实地理一致。时代切换时底图不变、叠加层淡入过渡。
 * geo.boundary 缺省时为"城区级"视图：整幅陆地底色，水体叠加其上。
 */
export default function GeoMap({
  geo,
  overlay,
  showLabels = true,
  className = '',
  minimal = false,
  morphKey,
}: Props) {
  const proj = useMemo(() => createProjector(geo.bbox), [geo.bbox])
  const boundaryPath = useMemo(
    () => (geo.boundary ? toPath(geo.boundary, proj, true) : undefined),
    [geo.boundary, proj],
  )
  const hasReconstruction = useMemo(
    () =>
      Boolean(
        overlay?.features?.some((f) => f.accuracy === 'D') ||
          geo.base?.some((f) => f.accuracy === 'D'),
      ),
    [overlay, geo.base],
  )
  const labelPlacements = useMemo(
    () => layoutLabels(overlay?.markers ?? [], proj),
    [overlay, proj],
  )

  return (
    <svg
      viewBox="0 0 100 100"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="真实地理地图"
    >
      <defs>
        {/* 水面斜纹（极淡） */}
        <pattern id="water-ripple" width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M0,1.5 H3" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.14" />
        </pattern>
        {/* 山体 45° 剖面线 */}
        <pattern
          id="hill-hatch"
          width="1.6"
          height="1.6"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="1.6" height="1.6" fill="#34d399" opacity="0.10" />
          <path d="M0,0 V1.6" stroke="#34d399" strokeWidth="0.28" opacity="0.30" />
        </pattern>
        {/* 湖水：底色 + 斜纹叠加 */}
        <pattern id="water-fill" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#0ea5e9" opacity="0.55" />
          <path d="M0,1.5 H3" stroke="#bae6fd" strokeWidth="0.22" opacity="0.25" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="100" height="100" className="fill-[#0f0d0b]" />

      {boundaryPath ? (
        // 行政边界模式：边界内为陆地
        <path
          d={boundaryPath}
          className="fill-[#262017] stroke-amber-200/30"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      ) : (
        // 城区级模式：整幅陆地，水体叠加其上
        <rect x="0" y="0" width="100" height="100" className="fill-[#262017]" />
      )}

      {/* 基础地理要素（河流、湖泊、山体） */}
      {geo.base?.map((f) => (
        <FeaturePath key={f.id} f={f} proj={proj} />
      ))}

      {/* 该时代叠加层：key 随时代变化 → 重挂载并淡入，实现平滑过渡 */}
      <g key={morphKey} className="animate-fade-in">
        {overlay?.features?.map((f) => (
          <FeaturePath key={f.id} f={f} proj={proj} />
        ))}
        {!minimal &&
          overlay?.markers?.map((m, i) => (
            <Marker
              key={m.id}
              m={m}
              proj={proj}
              showLabel={showLabels}
              labelPos={labelPlacements[i]}
            />
          ))}
      </g>

      {/* D 级复原要素在场时的诚实角注 */}
      {hasReconstruction && !minimal && (
        <text x="98" y="98" textAnchor="end" style={{ fontSize: '2.4px' }} className="fill-parchment-200/50 select-none">
          ◌ 虚线要素为文献复原示意
        </text>
      )}
    </svg>
  )
}
