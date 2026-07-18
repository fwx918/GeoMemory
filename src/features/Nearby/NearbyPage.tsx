import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { getClosestEra } from '../../data'
import { useGeolocation } from '../../hooks/useGeolocation'
import EraBadge from '../../components/common/EraBadge'

const STATUS_TEXT: Record<string, string> = {
  idle: '点击下方按钮，发现你周围的历史',
  locating: '正在定位…',
  granted: '已根据你的位置找到附近的历史地点',
  denied: '定位未开启，已为你展示示例区域的故事',
  unsupported: '当前环境不支持定位，已展示示例区域的故事',
}

export default function NearbyPage() {
  const { setActiveLocationId, setActiveEra } = useApp()
  const { status, nearest, requestLocation } = useGeolocation()
  const navigate = useNavigate()

  // 进入页面即尝试定位（离线时自动回退到模拟位置）
  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 lg:p-8">
      <div className="rounded-2xl border border-white/5 bg-ink-soft/60 p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚶</span>
          <div>
            <h2 className="font-serif text-base font-bold text-parchment-50">发现身边故事</h2>
            <p className="text-xs text-parchment-200/60">{STATUS_TEXT[status]}</p>
          </div>
        </div>
        <button
          onClick={requestLocation}
          className="mt-3 w-full rounded-xl bg-seal py-2 text-sm font-medium text-parchment-50 active:scale-95"
        >
          {status === 'locating' ? '定位中…' : '📍 重新定位'}
        </button>
      </div>

      {nearest && (
        <>
          <div className="flex items-center gap-2 px-1 text-xs text-parchment-200/70">
            <span className="h-1.5 w-1.5 rounded-full bg-seal" />
            最近的历史区域：
            <span className="text-parchment-50">{nearest.name}</span>
          </div>

          <ul className="grid gap-3 lg:grid-cols-2">
            {nearest.nearby.map((spot) => (
              <li key={spot.id}>
                <button
                  onClick={() => {
                    setActiveLocationId(nearest.id)
                    // 该景点年代若无对应记录，就近取一个该地点真实拥有的年代，
                    // 避免全局 activeEra 停在地图/时间轴都不存在的年代上
                    const era = getClosestEra(nearest, spot.era)
                    if (era) setActiveEra(era)
                    navigate('/map')
                  }}
                  className="flex w-full animate-fade-in items-start gap-3 rounded-2xl border border-white/5 bg-ink-soft/60 p-3 text-left active:scale-[0.99]"
                >
                  <span className="text-2xl">{spot.emoji ?? '📍'}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-parchment-50">{spot.name}</span>
                      <span className="text-[11px] text-parchment-200/50">
                        约 {spot.distanceM >= 1000 ? `${(spot.distanceM / 1000).toFixed(1)}km` : `${spot.distanceM}m`}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-parchment-100/80">
                      {spot.blurb}
                    </p>
                    <div className="mt-1.5">
                      <EraBadge era={spot.era} />
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
