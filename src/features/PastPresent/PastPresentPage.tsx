import { useMemo } from 'react'
import type { EraRecord } from '../../types'
import { useApp } from '../../context/AppContext'
import { getEra, getRecord } from '../../data'
import LocationPicker from '../../components/common/LocationPicker'
import OverlaySlider from '../../components/overlay/OverlaySlider'
import GeoMap from '../../components/map/GeoMap'
import StoryCard from '../../components/common/StoryCard'

export default function PastPresentPage() {
  const { activeLocation, availableEras } = useApp()

  // 最今 vs 最古
  const presentEra = availableEras[0]
  const pastEra = availableEras[availableEras.length - 1]

  const present = useMemo(() => getRecord(activeLocation, presentEra), [activeLocation, presentEra])
  const past = useMemo(() => getRecord(activeLocation, pastEra), [activeLocation, pastEra])

  const renderMap = (record: EraRecord | undefined, minimal: boolean) =>
    record ? (
      <GeoMap
        geo={activeLocation.geo}
        overlay={record.geoOverlay}
        showLabels={!minimal}
        minimal={minimal}
      />
    ) : null

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 lg:space-y-6 lg:p-8">
      <LocationPicker />

      <div className="space-y-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <div className="space-y-3">
          <p className="text-xs text-parchment-200/70">
            拖动中间的 <span className="text-seal">⇄</span> 滑块，左右对比同一地点的{' '}
            <span className="text-parchment-50">{getEra(pastEra).label}</span> 与{' '}
            <span className="text-parchment-50">{getEra(presentEra).label}</span>。
          </p>

          {past && present && (
            <OverlaySlider
              past={renderMap(past, false)}
              present={renderMap(present, false)}
              pastLabel={getEra(pastEra).label}
              presentLabel={getEra(presentEra).label}
            />
          )}
        </div>

        <StoryCard title="时间留下的痕迹" icon="🏛️">
          <p>{activeLocation.story.pastVsPresent}</p>
        </StoryCard>
      </div>
    </div>
  )
}
