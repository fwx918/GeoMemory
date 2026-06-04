import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/map', emoji: '🗺️', label: '时空地图' },
  { to: '/place', emoji: '📖', label: '此地从前' },
  { to: '/overlay', emoji: '🏛️', label: '古今对照' },
  { to: '/guide', emoji: '🤖', label: '时空导游' },
  { to: '/nearby', emoji: '🚶', label: '身边故事' },
]

export default function BottomTabBar() {
  return (
    <nav className="z-20 border-t border-white/5 bg-ink-soft/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="flex">
        {TABS.map((tab) => (
          <li key={tab.to} className="flex-1">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2 text-[10px] transition-colors ${
                  isActive ? 'text-seal' : 'text-parchment-200/50 hover:text-parchment-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`text-lg transition-transform ${
                      isActive ? 'scale-110' : 'scale-100 grayscale-[0.3]'
                    }`}
                  >
                    {tab.emoji}
                  </span>
                  <span className="font-medium">{tab.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
