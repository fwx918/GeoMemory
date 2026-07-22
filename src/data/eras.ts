import type { EraDef } from '../types'

/**
 * 旧版全局 6 档时代的 EraDef 形式（从今到古）。
 * 未自带 timeline 的地点（淮南/上海/新加坡）由此派生时间轴；
 * yearRange 用于 AI 问答的"所问年份是否落在该时代"判断。
 */
export const LEGACY_ERA_DEFS: EraDef[] = [
  { key: '2026', label: '2026年', dynasty: '当代', yearRange: [2001, 2026], year: 2026 },
  { key: '2000', label: '2000年', dynasty: '世纪之交', yearRange: [1976, 2000], year: 2000 },
  { key: '1950', label: '1950年', dynasty: '近代', yearRange: [1926, 1975], year: 1950 },
  { key: '1900', label: '1900年', dynasty: '清末', yearRange: [1876, 1925], year: 1900 },
  { key: '1800', label: '1800年', dynasty: '清·嘉庆', yearRange: [1750, 1875], year: 1800 },
  { key: 'ancient', label: '更早', dynasty: '古代', yearRange: [-2000, 1749], year: 800 },
]

export const LEGACY_ERA_BY_KEY: Record<string, EraDef> = Object.fromEntries(
  LEGACY_ERA_DEFS.map((e) => [e.key, e]),
)
