import type { MapPoi } from '../../types'

const KIND_EMOJI: Record<NonNullable<MapPoi['kind']>, string> = {
  landmark: '📍',
  water: '💧',
  temple: '🛕',
  transit: '🚉',
  village: '🏘️',
  building: '🏢',
}

interface Props {
  poi: MapPoi
  showLabel?: boolean
}

export default function MapMarker({ poi, showLabel = true }: Props) {
  const emoji = KIND_EMOJI[poi.kind ?? 'landmark']
  return (
    <g className="map-morph" transform={`translate(${poi.x} ${poi.y})`}>
      <circle r="3.2" className="fill-seal/30" />
      <circle r="1.2" className="fill-seal" />
      <text
        x="0"
        y="-4.2"
        textAnchor="middle"
        style={{ fontSize: '4px' }}
        className="select-none"
      >
        {emoji}
      </text>
      {showLabel && (
        <text
          x="0"
          y="7.5"
          textAnchor="middle"
          style={{ fontSize: '3.2px' }}
          className="select-none fill-parchment-50 font-medium"
        >
          {poi.name}
        </text>
      )}
    </g>
  )
}
