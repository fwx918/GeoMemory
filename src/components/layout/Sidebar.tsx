import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from './nav'

/** 桌面端左侧导航（仅在 lg 及以上显示） */
export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-ink-soft/40 lg:flex">
      <div className="flex items-baseline gap-2 px-6 pb-6 pt-7">
        <span className="font-serif text-2xl font-bold tracking-wide text-parchment-50">时迹</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-parchment-200/50">
          ChronoTrace
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                isActive
                  ? 'bg-seal/15 text-parchment-50'
                  : 'text-parchment-200/60 hover:bg-white/5 hover:text-parchment-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-xl ${isActive ? 'scale-110' : 'grayscale-[0.3]'}`}>
                  {tab.emoji}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-tight">{tab.label}</span>
                  <span className="text-[11px] text-parchment-200/40">{tab.desc}</span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <p className="px-6 py-5 font-serif text-xs leading-relaxed text-parchment-200/40">
        站在现在，<br />看见从前。
      </p>
    </aside>
  )
}
