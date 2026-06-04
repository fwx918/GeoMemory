import type { MapLayers } from '../../types'
import MapMarker from './MapMarker'

export interface LayerToggles {
  water?: boolean
  coastline?: boolean
  cityExtent?: boolean
  roads?: boolean
  pois?: boolean
}

interface Props {
  layers: MapLayers
  /** 控制各图层显隐（默认全部显示） */
  show?: LayerToggles
  showLabels?: boolean
  className?: string
  /** 整体透明度，用于叠加对比 */
  opacity?: number
}

const ALL_ON: Required<LayerToggles> = {
  water: true,
  coastline: true,
  cityExtent: true,
  roads: true,
  pois: true,
}

/**
 * 程式化、完全离线的 SVG 地图。所有几何绘制在 0..100 的 viewBox 中，
 * 时代切换时通过 CSS 过渡（map-morph）平滑变形——这是「古今对照」的核心。
 */
export default function SvgMap({
  layers,
  show,
  showLabels = true,
  className = '',
  opacity = 1,
}: Props) {
  const s = { ...ALL_ON, ...show }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`h-full w-full ${className}`}
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="时空地图"
    >
      {/* 底图地貌 */}
      <rect x="0" y="0" width="100" height="100" className="fill-[#15110d]" />
      {layers.land && <path className="map-morph fill-[#2b2419]" d={layers.land} />}

      {/* 建成区 / 城市范围 */}
      {s.cityExtent && layers.cityExtent && (
        <path className="map-morph fill-amber-200/10 stroke-amber-200/20" strokeWidth="0.4" d={layers.cityExtent} />
      )}

      {/* 水体 */}
      {s.water && (
        <path className="map-morph fill-sky-500/30 stroke-sky-300/40" strokeWidth="0.4" d={layers.water} />
      )}

      {/* 海岸线 */}
      {s.coastline && layers.coastline && (
        <path
          className="map-morph fill-none stroke-sky-200/70"
          strokeWidth="0.7"
          strokeDasharray="1.5 1"
          d={layers.coastline}
        />
      )}

      {/* 道路 / 堤岸 */}
      {s.roads &&
        layers.roads?.map((d, i) => (
          <path
            key={i}
            className="map-morph fill-none stroke-parchment-100/40"
            strokeWidth="0.6"
            strokeLinecap="round"
            d={d}
          />
        ))}

      {/* 兴趣点 */}
      {s.pois &&
        layers.pois.map((poi) => (
          <MapMarker key={poi.id} poi={poi} showLabel={showLabels} />
        ))}
    </svg>
  )
}
