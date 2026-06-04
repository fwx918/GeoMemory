import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { getEra, getRecord } from '../../data'
import type { LayerToggles } from '../../components/map/SvgMap'
import LocationPicker from '../../components/common/LocationPicker'
import OverlaySlider from '../../components/overlay/OverlaySlider'
import StoryCard from '../../components/common/StoryCard'

const TOGGLE_DEFS: { key: keyof LayerToggles; label: string }[] = [
  { key: 'water', label: '水体' },
  { key: 'coastline', label: '海岸线' },
  { key: 'cityExtent', label: '城市范围' },
  { key: 'roads', label: '道路堤岸' },
  { key: 'pois', label: '地标' },
]

export default function PastPresentPage() {
  const { activeLocation, availableEras } = useApp()
  const [show, setShow] = useState<LayerToggles>({
    water: true,
    coastline: true,
    cityExtent: true,
    roads: true,
    pois: false,
  })

  // 最今 vs 最古
  const presentEra = availableEras[0]
  const pastEra = availableEras[availableEras.length - 1]

  const present = useMemo(() => getRecord(activeLocation, presentEra), [activeLocation, presentEra])
  const past = useMemo(() => getRecord(activeLocation, pastEra), [activeLocation, pastEra])

  const toggle = (k: keyof LayerToggles) => setShow((s) => ({ ...s, [k]: !s[k] }))

  return (
    <div className="space-y-4 p-4">
      <LocationPicker />

      <p className="text-xs text-parchment-200/70">
        拖动中间的 <span className="text-seal">⇄</span> 滑块，左右对比同一地点的{' '}
        <span className="text-parchment-50">{getEra(pastEra).label}</span> 与{' '}
        <span className="text-parchment-50">{getEra(presentEra).label}</span>。
      </p>

      {past && present && (
        <OverlaySlider
          past={past.mapLayers}
          present={present.mapLayers}
          pastLabel={getEra(pastEra).label}
          presentLabel={getEra(presentEra).label}
          show={show}
        />
      )}

      {/* 图层开关 */}
      <div className="flex flex-wrap gap-2">
        {TOGGLE_DEFS.map((t) => {
          const on = show[t.key]
          return (
            <button
              key={t.key}
              onClick={() => toggle(t.key)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                on
                  ? 'border-seal/60 bg-seal/15 text-parchment-50'
                  : 'border-white/10 bg-ink-soft/60 text-parchment-200/50'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <StoryCard title="时间留下的痕迹" icon="🏛️">
        <p>{activeLocation.story.pastVsPresent}</p>
      </StoryCard>
    </div>
  )
}
