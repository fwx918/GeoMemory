import type { Era, EraKey } from '../types'

// 时间轴上的全部时代，从今到古
export const ERAS: Era[] = [
  { key: '2026', label: '2026年', year: 2026, dynasty: '当代' },
  { key: '2000', label: '2000年', year: 2000, dynasty: '世纪之交' },
  { key: '1950', label: '1950年', year: 1950, dynasty: '近代' },
  { key: '1900', label: '1900年', year: 1900, dynasty: '清末' },
  { key: '1800', label: '1800年', year: 1800, dynasty: '清·嘉庆' },
  { key: 'ancient', label: '更早', year: -9999, dynasty: '古代' },
]

export const ERA_BY_KEY: Record<EraKey, Era> = ERAS.reduce(
  (acc, era) => {
    acc[era.key] = era
    return acc
  },
  {} as Record<EraKey, Era>,
)

export function getEra(key: EraKey): Era {
  return ERA_BY_KEY[key]
}
