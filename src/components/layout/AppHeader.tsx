import { useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { resolveEraLabel } from '../../data'
import { ROUTE_TITLES } from './nav'

export default function AppHeader() {
  const { pathname } = useLocation()
  const { activeLocation, activeEra } = useApp()
  const subtitle = ROUTE_TITLES[pathname] ?? '时空探索'
  const era = resolveEraLabel(activeLocation, activeEra)

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-ink/95 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        {/* 移动端 logo（桌面端由侧边栏展示） */}
        <div className="flex items-baseline gap-2 lg:hidden">
          <span className="font-serif text-xl font-bold tracking-wide text-parchment-50">时迹</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-200/50">
            ChronoTrace
          </span>
        </div>

        {/* 桌面端页面标题 */}
        <div className="hidden lg:block">
          <h1 className="font-serif text-lg font-semibold text-parchment-50">{subtitle}</h1>
          <p className="text-xs text-parchment-200/60">
            正在探索 · <span className="text-parchment-100/90">{activeLocation.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-seal/20 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-seal" />
          <span className="text-xs font-medium text-parchment-100">{era.label}</span>
        </div>
      </div>

      {/* 移动端副标题行 */}
      <div className="mt-1 flex items-center gap-1.5 text-xs text-parchment-200/60 lg:hidden">
        <span className="text-parchment-100/90">{subtitle}</span>
        <span>·</span>
        <span className="truncate">{activeLocation.name}</span>
      </div>
    </header>
  )
}
