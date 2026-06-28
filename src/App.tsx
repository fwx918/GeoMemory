import { Navigate, Route, Routes } from 'react-router-dom'
import AppHeader from './components/layout/AppHeader'
import BottomTabBar from './components/layout/BottomTabBar'
import Sidebar from './components/layout/Sidebar'
import TimeSpaceMapPage from './features/TimeSpaceMap/TimeSpaceMapPage'
import PlaceBeforePage from './features/PlaceBefore/PlaceBeforePage'
import PastPresentPage from './features/PastPresent/PastPresentPage'
import AiGuidePage from './features/AiGuide/AiGuidePage'
import NearbyPage from './features/Nearby/NearbyPage'

export default function App() {
  return (
    <div className="flex h-full bg-ink text-parchment-100">
      {/* 桌面端左侧导航 */}
      <Sidebar />

      {/* 主列：移动端为居中窄列（手机外观），桌面端铺满 */}
      <div className="mx-auto flex h-full w-full min-w-0 max-w-md flex-col shadow-2xl lg:mx-0 lg:max-w-none">
        <AppHeader />
        <main className="no-scrollbar flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="/map" element={<TimeSpaceMapPage />} />
            <Route path="/place" element={<PlaceBeforePage />} />
            <Route path="/overlay" element={<PastPresentPage />} />
            <Route path="/guide" element={<AiGuidePage />} />
            <Route path="/nearby" element={<NearbyPage />} />
            <Route path="*" element={<Navigate to="/map" replace />} />
          </Routes>
        </main>
        {/* 移动端底部 Tab，桌面端隐藏 */}
        <BottomTabBar />
      </div>
    </div>
  )
}
