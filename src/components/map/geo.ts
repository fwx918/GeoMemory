import type { LngLat } from '../../types'

export interface Projector {
  project: (lng: number, lat: number) => [number, number]
  /** 投影后内容在 100×100 视图中的实际包围盒，便于居中 */
  fitted: { x: number; y: number; w: number; h: number }
}

/**
 * 等距圆柱投影 + 纬度余弦校正，将经纬度按真实长宽比拟合进 size×size 的视图，
 * 居中并留出 pad 的边距。这样画出的形状（河流走向、湖泊位置）与真实地理一致。
 */
export function createProjector(
  bbox: [number, number, number, number],
  size = 100,
  pad = 8,
): Projector {
  const [minLng, minLat, maxLng, maxLat] = bbox
  const midLat = (minLat + maxLat) / 2
  const kx = Math.cos((midLat * Math.PI) / 180) // 经度方向压缩
  const rawW = (maxLng - minLng) * kx
  const rawH = maxLat - minLat
  const avail = size - pad * 2
  const scale = avail / Math.max(rawW, rawH)
  const w = rawW * scale
  const h = rawH * scale
  const offX = pad + (avail - w) / 2
  const offY = pad + (avail - h) / 2

  const project = (lng: number, lat: number): [number, number] => {
    const x = offX + (lng - minLng) * kx * scale
    // 纬度向上为正，屏幕 y 向下，故翻转
    const y = offY + (maxLat - lat) * scale
    return [x, y]
  }

  return { project, fitted: { x: offX, y: offY, w, h } }
}

/** 将一串经纬度投影并拼成 SVG path 的 d 字符串 */
export function toPath(coords: LngLat[], proj: Projector, close = false): string {
  if (coords.length === 0) return ''
  const d = coords
    .map(([lng, lat], i) => {
      const [x, y] = proj.project(lng, lat)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
  return close ? `${d} Z` : d
}
