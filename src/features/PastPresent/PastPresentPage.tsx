import { useEffect, useMemo, useState } from 'react'
import type { EraDef, EraKey } from '../../types'
import { useApp } from '../../context/AppContext'
import { getAvailableEraDefs, getRecord, resolveEraLabel, resolveEraMarkers } from '../../data'
import LocationPicker from '../../components/common/LocationPicker'
import OverlaySlider from '../../components/overlay/OverlaySlider'
import GeoMap from '../../components/map/GeoMap'
import StoryCard from '../../components/common/StoryCard'

/** 一侧的时代下拉选择 */
function EraSelect({
  label,
  value,
  eras,
  exclude,
  onChange,
}: {
  label: string
  value: EraKey
  eras: EraDef[]
  exclude: EraKey
  onChange: (era: EraKey) => void
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-parchment-200/70">
      <span className="shrink-0">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-ink-soft/80 px-2 py-1 text-parchment-50 focus:border-seal/60 focus:outline-none"
      >
        {eras.map((e) => (
          <option key={e.key} value={e.key} disabled={e.key === exclude}>
            {e.label}
            {e.dynasty ? ` · ${e.dynasty}` : ''}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function PastPresentPage() {
  const { activeLocation } = useApp()
  const eraDefs = useMemo(() => getAvailableEraDefs(activeLocation), [activeLocation])

  // 默认对比档：地点指定优先（杭州为南宋 vs 当代），否则最古 vs 最今
  const defaults = useMemo<[EraKey, EraKey]>(() => {
    const keys = eraDefs.map((e) => e.key)
    const f = activeLocation.featuredCompare
    if (f && keys.includes(f[0]) && keys.includes(f[1])) return f
    return [keys[keys.length - 1], keys[0]]
  }, [activeLocation, eraDefs])

  const [pastEra, setPastEra] = useState<EraKey>(defaults[0])
  const [presentEra, setPresentEra] = useState<EraKey>(defaults[1])

  // 切换地点时重置为该地点的默认对比档
  useEffect(() => {
    setPastEra(defaults[0])
    setPresentEra(defaults[1])
  }, [defaults])

  const present = useMemo(() => getRecord(activeLocation, presentEra), [activeLocation, presentEra])
  const past = useMemo(() => getRecord(activeLocation, pastEra), [activeLocation, pastEra])

  const renderMap = (era: EraKey) => {
    const record = getRecord(activeLocation, era)
    if (!record) return null
    const markers = resolveEraMarkers(activeLocation, era)
    return (
      <GeoMap
        geo={activeLocation.geo}
        overlay={record.geoOverlay ? { ...record.geoOverlay, markers } : undefined}
        morphKey={era}
      />
    )
  }

  const pastLabel = resolveEraLabel(activeLocation, pastEra).label
  const presentLabel = resolveEraLabel(activeLocation, presentEra).label

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 lg:space-y-6 lg:p-8">
      <LocationPicker />

      <div className="space-y-4 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <div className="space-y-3">
          {/* 任意两档对比选择 */}
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/5 bg-ink-soft/50 p-2.5">
            <EraSelect
              label="左"
              value={pastEra}
              eras={eraDefs}
              exclude={presentEra}
              onChange={setPastEra}
            />
            <EraSelect
              label="右"
              value={presentEra}
              eras={eraDefs}
              exclude={pastEra}
              onChange={setPresentEra}
            />
          </div>

          <p className="text-xs text-parchment-200/70">
            拖动中间的 <span className="text-seal">⇄</span> 滑块，左右对比同一地点的{' '}
            <span className="text-parchment-50">{pastLabel}</span> 与{' '}
            <span className="text-parchment-50">{presentLabel}</span>。
          </p>

          {past && present && (
            <OverlaySlider
              past={renderMap(pastEra)}
              present={renderMap(presentEra)}
              pastLabel={pastLabel}
              presentLabel={presentLabel}
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
