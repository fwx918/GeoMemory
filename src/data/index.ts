import type { EraDef, EraKey, EraRecord, Location } from '../types'
import { LOCATIONS } from './locations'
import { LEGACY_ERA_BY_KEY, LEGACY_ERA_DEFS } from './eras'

export { LOCATIONS } from './locations'
export { LEGACY_ERA_DEFS, LEGACY_ERA_BY_KEY } from './eras'
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

// ---------------------------------------------------------------- 时间轴

/** 地点时间轴（从今到古）：自带 timeline 优先，否则由旧版 6 档 × eras 派生 */
export function getTimeline(loc: Location): EraDef[] {
  if (loc.timeline) return loc.timeline
  return LEGACY_ERA_DEFS.filter((e) => loc.eras.includes(e.key))
}

export function getEraDef(loc: Location, key: EraKey): EraDef | undefined {
  return getTimeline(loc).find((e) => e.key === key)
}

/** 时代 key → 展示用标签（时间轴外的地点/旧 key 也能优雅回退） */
export function resolveEraLabel(loc: Location, key: EraKey): { label: string; dynasty?: string } {
  const def = getEraDef(loc, key) ?? LEGACY_ERA_BY_KEY[key]
  return def ? { label: def.label, dynasty: def.dynasty } : { label: key }
}

/** 地点真正拥有记录的时代定义（保持从今到古的顺序） */
export function getAvailableEraDefs(loc: Location): EraDef[] {
  return getTimeline(loc).filter((e) => loc.records[e.key])
}

export function getAvailableEras(loc: Location): EraKey[] {
  return getAvailableEraDefs(loc).map((e) => e.key)
}

/** 在可用时代中找代表年份最接近 year 的一个 */
export function getClosestEraByYear(loc: Location, year: number): EraKey | undefined {
  const avail = getAvailableEraDefs(loc)
  if (avail.length === 0) return undefined
  let best = avail[0]
  let bestDiff = Infinity
  for (const e of avail) {
    const diff = Math.abs(e.year - year)
    if (diff < bestDiff) {
      bestDiff = diff
      best = e
    }
  }
  return best.key
}

/**
 * 「就近回退」的唯一实现：目标时代可用则原样返回；
 * 否则解析其代表年份（地点时间轴 → 旧版全局表），按年份就近。
 */
export function getClosestEra(loc: Location, era: EraKey): EraKey | undefined {
  if (loc.records[era]) return era
  const year = (getEraDef(loc, era) ?? LEGACY_ERA_BY_KEY[era])?.year
  if (year === undefined) return getAvailableEras(loc)[0]
  return getClosestEraByYear(loc, year)
}

/** 取某地点某时代的记录；若该时代缺失，回退到最接近的可用时代 */
export function getRecord(loc: Location, era: EraKey): EraRecord | undefined {
  const key = getClosestEra(loc, era)
  return key ? loc.records[key] : undefined
}
