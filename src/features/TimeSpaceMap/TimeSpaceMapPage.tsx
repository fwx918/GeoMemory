import { useApp } from '../../context/AppContext'
import { getRecord } from '../../data'
import LocationPicker from '../../components/common/LocationPicker'
import SvgMap from '../../components/map/SvgMap'
import GeoMap from '../../components/map/GeoMap'
import TimelineSlider from '../../components/timeline/TimelineSlider'
import StoryCard from '../../components/common/StoryCard'

export default function TimeSpaceMapPage() {
  const { activeLocation, activeEra, setActiveEra, availableEras } = useApp()
  const record = getRecord(activeLocation, activeEra)

  return (
    <div className="space-y-4 p-4">
      <LocationPicker />

      {/* 地图：含 geo 的地点用真实地理地图，否则用程式化 SVG */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
        {activeLocation.geo ? (
          <GeoMap geo={activeLocation.geo} overlay={record?.geoOverlay} />
        ) : (
          record?.mapLayers && <SvgMap layers={record.mapLayers} />
        )}
      </div>

      {/* 时间轴 */}
      <TimelineSlider eras={availableEras} value={activeEra} onChange={setActiveEra} />

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
  )
}
