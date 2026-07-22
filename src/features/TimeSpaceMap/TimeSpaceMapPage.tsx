import { useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { getAvailableEraDefs, getRecord } from '../../data'
import LocationPicker from '../../components/common/LocationPicker'
import GeoMap from '../../components/map/GeoMap'
import TimelineSlider from '../../components/timeline/TimelineSlider'
import StoryCard from '../../components/common/StoryCard'

export default function TimeSpaceMapPage() {
  const { activeLocation, activeEra, setActiveEra } = useApp()
  const record = getRecord(activeLocation, activeEra)
  const eraDefs = useMemo(() => getAvailableEraDefs(activeLocation), [activeLocation])

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 lg:space-y-6 lg:p-8">
      <LocationPicker />

      {/* 桌面端左右分栏：左地图，右时间轴 + 该时代记录 */}
      <div className="space-y-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-6 lg:space-y-0">
        {/* 真实地理地图，时代切换时叠加层淡入过渡 */}
        <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-soft lg:aspect-auto lg:h-[560px]">
          <GeoMap geo={activeLocation.geo} overlay={record?.geoOverlay} morphKey={activeEra} />
        </div>

        <div className="space-y-4">
          {/* 时间轴 */}
          <TimelineSlider eras={eraDefs} value={activeEra} onChange={setActiveEra} />

          {/* 该时代记录 */}
          {record && (
            <StoryCard title={record.title} icon={record.imageHint ?? '🗺️'}>
              <p>{record.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {record.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-parchment-200/10 px-2 py-0.5 text-[11px] text-parchment-100/80"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </StoryCard>
          )}
        </div>
      </div>
    </div>
  )
}
