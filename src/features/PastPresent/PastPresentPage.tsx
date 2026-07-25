import { useMemo } from 'react'
import type { EraKey } from '../../types'
import { useApp } from '../../context/AppContext'
import { getRecord, resolveEraLabel, resolveEraMarkers } from '../../data'
import LocationPicker from '../../components/common/LocationPicker'
import OverlaySlider from '../../components/overlay/OverlaySlider'
import GeoMap from '../../components/map/GeoMap'
import StoryCard from '../../components/common/StoryCard'

export default function PastPresentPage() {
  const { activeLocation, availableEras } = useApp()

  // 默认对比档：地点指定优先（杭州为南宋 vs 当代），否则最古 vs 最今
  const [pastEra, presentEra] = useMemo<[EraKey, EraKey]>(() => {
    const featured = activeLocation.featuredCompare
    if (featured && availableEras.includes(featured[0]) && availableEras.includes(featured[1])) {
      return featured
    }
    return [availableEras[availableEras.length - 1], availableEras[0]]
  }, [activeLocation, availableEras])

  const present = useMemo(() => getRecord(activeLocation, presentEra), [activeLocation, presentEra])
  const past = useMemo(() => getRecord(activeLocation, pastEra), [activeLocation, pastEra])

  const renderMap = (era: EraKey, minimal: boolean) => {
    const record = getRecord(activeLocation, era)
    if (!record) return null
    const markers = resolveEraMarkers(activeLocation, era)
    return (
      <GeoMap
        geo={activeLocation.geo}
        overlay={record.geoOverlay ? { ...record.geoOverlay, markers } : undefined}
        showLabels={!minimal}
        minimal={minimal}
      />
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 lg:space-y-6 lg:p-8">
      <LocationPicker />

      <div className="space-y-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <div className="space-y-3">
          <p className="text-xs text-parchment-200/70">
            拖动中间的 <span className="text-seal">⇄</span> 滑块，左右对比同一地点的{' '}
            <span className="text-parchment-50">{resolveEraLabel(activeLocation, pastEra).label}</span> 与{' '}
            <span className="text-parchment-50">{resolveEraLabel(activeLocation, presentEra).label}</span>。
          </p>

          {past && present && (
            <OverlaySlider
              past={renderMap(pastEra, false)}
              present={renderMap(presentEra, false)}
              pastLabel={resolveEraLabel(activeLocation, pastEra).label}
              presentLabel={resolveEraLabel(activeLocation, presentEra).label}
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
