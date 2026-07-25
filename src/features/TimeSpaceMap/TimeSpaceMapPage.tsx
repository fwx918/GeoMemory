import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { getAvailableEraDefs, getPoiMap, getRecord, resolveEraMarkers } from '../../data'
import LocationPicker from '../../components/common/LocationPicker'
import GeoMap from '../../components/map/GeoMap'
import TimelineSlider from '../../components/timeline/TimelineSlider'
import StoryCard from '../../components/common/StoryCard'
import StoryScroll from '../../components/story/StoryScroll'
import PoiPopover from '../../components/story/PoiPopover'

export default function TimeSpaceMapPage() {
  const { activeLocation, activeEra, setActiveEra, pendingFocusPoiId, clearPendingFocus } = useApp()
  const record = getRecord(activeLocation, activeEra)
  const eraDefs = useMemo(() => getAvailableEraDefs(activeLocation), [activeLocation])
  const poiMap = useMemo(() => getPoiMap(activeLocation), [activeLocation])
  const markers = useMemo(
    () => resolveEraMarkers(activeLocation, activeEra),
    [activeLocation, activeEra],
  )

  const [focusedPoiIds, setFocusedPoiIds] = useState<string[]>([])
  const [openPoiId, setOpenPoiId] = useState<string | null>(null)
  // 点击 POI 后短暂暂停滚动驱动，避免两种高亮来源打架
  const pausedUntil = useRef(0)

  // 切换地点/时代时清空联动状态
  useEffect(() => {
    setFocusedPoiIds([])
    setOpenPoiId(null)
  }, [activeLocation.id, activeEra])

  // 消费导游「在地图上看 →」的聚焦请求
  useEffect(() => {
    if (!pendingFocusPoiId) return
    pausedUntil.current = Date.now() + 4000
    setFocusedPoiIds([pendingFocusPoiId])
    setOpenPoiId(pendingFocusPoiId)
    clearPendingFocus()
  }, [pendingFocusPoiId, clearPendingFocus])

  const handleFocusFromScroll = useCallback((ids: string[]) => {
    if (Date.now() < pausedUntil.current) return
    setFocusedPoiIds(ids)
  }, [])

  const handlePoiClick = useCallback((id: string) => {
    pausedUntil.current = Date.now() + 3000
    setFocusedPoiIds([id])
    setOpenPoiId(id)
  }, [])

  const overlayWithMarkers = useMemo(
    () => (record?.geoOverlay ? { ...record.geoOverlay, markers } : undefined),
    [record, markers],
  )

  const openPoi = openPoiId ? poiMap[openPoiId] : undefined

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 lg:space-y-6 lg:p-8">
      <LocationPicker />

      {/* 桌面端左右分栏：左地图（吸顶），右时间轴 + 卷轴 */}
      <div className="space-y-4 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <div className="relative lg:sticky lg:top-4">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
            <GeoMap
              geo={activeLocation.geo}
              overlay={overlayWithMarkers}
              morphKey={activeEra}
              focusedIds={focusedPoiIds}
              onMarkerClick={handlePoiClick}
            />
          </div>
          {openPoi && (
            <PoiPopover
              poi={openPoi}
              era={activeEra}
              onClose={() => setOpenPoiId(null)}
            />
          )}
        </div>

        <div className="space-y-4">
          {/* 时间轴 */}
          <TimelineSlider eras={eraDefs} value={activeEra} onChange={setActiveEra} />

          {/* 该时代记录：有章节则展开时光卷轴，否则回退到摘要卡片 */}
          {record && (
            <>
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

              {record.chapters && record.chapters.length > 0 && (
                <StoryScroll
                  chapters={record.chapters}
                  poiById={poiMap}
                  focusedPoiIds={focusedPoiIds}
                  onFocusPois={handleFocusFromScroll}
                  onPoiClick={handlePoiClick}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
