import { useCallback, useState } from 'react'
import type { Location } from '../types'
import { LOCATIONS } from '../data'

export type GeoStatus = 'idle' | 'locating' | 'granted' | 'denied' | 'unsupported'

interface GeoResult {
  status: GeoStatus
  /** 匹配到的最近种子地点（离线/拒绝时回退到默认地点） */
  nearest: Location | null
  coords: { lat: number; lng: number } | null
  requestLocation: () => void
}

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function nearestLocation(coords: { lat: number; lng: number }): Location {
  let best = LOCATIONS[0]
  let bestD = Infinity
  for (const loc of LOCATIONS) {
    const d = haversine(coords, loc.coord)
    if (d < bestD) {
      bestD = d
      best = loc
    }
  }
  return best
}

// 离线 / 拒绝定位时的模拟当前位置（默认落在杭州西湖）
const MOCK_COORDS = LOCATIONS[0].coord

/**
 * 包装 navigator.geolocation；在不可用或被拒绝时，优雅回退到模拟坐标，
 * 始终能给出一个「最近的历史地点」用于演示。
 */
export function useGeolocation(): GeoResult {
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [nearest, setNearest] = useState<Location | null>(null)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  const requestLocation = useCallback(() => {
    const fallback = () => {
      setCoords(MOCK_COORDS)
      setNearest(nearestLocation(MOCK_COORDS))
    }

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('unsupported')
      fallback()
      return
    }

    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setStatus('granted')
        setCoords(c)
        setNearest(nearestLocation(c))
      },
      () => {
        setStatus('denied')
        fallback()
      },
      { timeout: 8000 },
    )
  }, [])

  return { status, nearest, coords, requestLocation }
}
