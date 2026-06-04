import { useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { getEra } from '../../data'

const TITLES: Record<string, string> = {
  '/map': '时空地图',
  '/place': '此地从前',
  '/overlay': '古今对照',
  '/guide': 'AI 时空导游',
  '/nearby': '发现身边故事',
}

export default function AppHeader() {
  const { pathname } = useLocation()
  const { activeLocation, activeEra } = useApp()
  const subtitle = TITLES[pathname] ?? '时空探索'
  const era = getEra(activeEra)

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-ink/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-bold tracking-wide text-parchment-50">
            时迹
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-200/50">
            ChronoTrace
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-seal/20 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-seal" />
          <span className="text-xs font-medium text-parchment-100">{era.label}</span>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs text-parchment-200/60">
        <span className="text-parchment-100/90">{subtitle}</span>
        <span>·</span>
        <span className="truncate">{activeLocation.name}</span>
      </div>
    </header>
  )
}
