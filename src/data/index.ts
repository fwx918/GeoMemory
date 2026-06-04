import type { EraKey, EraRecord, Location } from '../types'
import { LOCATIONS } from './locations'
import { ERAS } from './eras'

export { LOCATIONS } from './locations'
export { ERAS, ERA_BY_KEY, getEra } from './eras'
export { AI_QA_RULES, ERA_PHRASE_MAP } from './aiResponses'

export function getAllLocations(): Location[] {
  return LOCATIONS
}

export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.id === id)
}

/**
 * 模糊地址匹配：在 name + aliases 上做大小写不敏感的包含匹配，
 * 返回得分最高的地点（无匹配则 undefined）。
 */
export function searchLocationByAddress(text: string): Location | undefined {
  const q = text.trim().toLowerCase()
  if (!q) return undefined

  let best: { loc: Location; score: number } | undefined

  for (const loc of LOCATIONS) {
    const haystacks = [loc.name, loc.region, ...loc.aliases].map((s) => s.toLowerCase())
    let score = 0
    for (const h of haystacks) {
      if (!h) continue
      if (h === q) score = Math.max(score, 100)
      else if (q.includes(h) || h.includes(q)) {
        // 较长的匹配片段得分更高
        score = Math.max(score, Math.min(h.length, q.length) + 10)
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { loc, score }
    }
  }

  return best?.loc
}

/** 返回某地点真正拥有记录的时代列表（保持从今到古的顺序） */
export function getAvailableEras(loc: Location): EraKey[] {
  const order = ERAS.map((e) => e.key)
  return order.filter((k) => loc.eras.includes(k) && loc.records[k])
}

/** 取某地点某时代的记录；若该时代缺失，回退到最接近的可用时代 */
export function getRecord(loc: Location, era: EraKey): EraRecord | undefined {
  if (loc.records[era]) return loc.records[era]
  const available = getAvailableEras(loc)
  if (available.length === 0) return undefined
  const target = ERAS.find((e) => e.key === era)?.year ?? 0
  let closest = available[0]
  let bestDiff = Infinity
  for (const k of available) {
    const y = ERAS.find((e) => e.key === k)?.year ?? 0
    const diff = Math.abs(y - target)
    if (diff < bestDiff) {
      bestDiff = diff
      closest = k
    }
  }
  return loc.records[closest]
}
