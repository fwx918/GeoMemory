import { Navigate, Route, Routes } from 'react-router-dom'
import AppHeader from './components/layout/AppHeader'
import BottomTabBar from './components/layout/BottomTabBar'
import TimeSpaceMapPage from './features/TimeSpaceMap/TimeSpaceMapPage'
import PlaceBeforePage from './features/PlaceBefore/PlaceBeforePage'
import PastPresentPage from './features/PastPresent/PastPresentPage'
import AiGuidePage from './features/AiGuide/AiGuidePage'
import NearbyPage from './features/Nearby/NearbyPage'

export default function App() {
  return (
    <div className="mx-auto flex h-full max-w-md flex-col bg-ink text-parchment-100 shadow-2xl">
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
      <BottomTabBar />
    </div>
  )
}
