// ============================================================================
// 时迹 ChronoTrace — 核心数据模型
// All historical content is mock/seed data; everything is fully typed so the
// dataset can be extended without touching UI code.
// ============================================================================

export type EraKey = '2026' | '2000' | '1950' | '1900' | '1800' | 'ancient'

export interface Era {
  key: EraKey
  /** 时间轴展示文案，如 "1800年" / "更早" */
  label: string
  /** 用于排序的数值（ancient 取一个很小的哨兵值） */
  year: number
  /** 简短的时代别称，如 "清·嘉庆" */
  dynasty?: string
}

/** 地标图标类型 */
export type MarkerKind = 'landmark' | 'water' | 'temple' | 'transit' | 'village' | 'building'

/** 某地在某个时代的快照记录 */
export interface EraRecord {
  era: EraKey
  /** 如 "西湖 · 北宋" */
  title: string
  /** 叙事段落 */
  summary: string
  /** 要点速览 */
  highlights: string[]
  /** 占位图所用 emoji / 简短标签 */
  imageHint?: string
  /** 真实地理地图的该时代叠加层 */
  geoOverlay?: GeoEraOverlay
}

/** 📖 此地从前 */
export interface PlaceStory {
  nameOrigin: string
  changes: string
  keyFigures: string[]
  landmarkEvents: string[]
  pastVsPresent: string
}

/** 🚶 身边故事 */
export interface NearbySpot {
  id: string
  name: string
  /** 模拟距离（米） */
  distanceM: number
  era: EraKey
  blurb: string
  emoji?: string
}

// --------------------------------------------------------------------------
// 真实地理地图（GeoMap）——使用真实经纬度坐标，渲染时投影到 0..100 视图。
// 用于「更真实」的地图（如淮南：真实行政边界 + 淮河 + 湖泊）。
// --------------------------------------------------------------------------

/** 经纬度坐标 [lng, lat] */
export type LngLat = [number, number]

export type GeoFeatureKind = 'river' | 'lake' | 'rail' | 'road' | 'wall' | 'area' | 'mountain' | 'coastline'

/** 一条真实地理要素：线状（river/rail/road）或环状（lake/area/wall/mountain） */
export interface GeoFeature {
  id: string
  kind: GeoFeatureKind
  name?: string
  /** 闭合环（面）或折线（线），均为 [lng, lat] */
  coords: LngLat[]
}

/** 真实坐标的地标点 */
export interface GeoMarker {
  id: string
  name: string
  lng: number
  lat: number
  kind?: MarkerKind
}

/** 地点的真实地理底图（边界 + 长期存在的水系等） */
export interface GeoBase {
  /** [minLng, minLat, maxLng, maxLat] */
  bbox: [number, number, number, number]
  /** 行政/区域边界环 */
  boundary: LngLat[]
  /** 各时代共有的基础要素（如现今河流、湖泊） */
  base?: GeoFeature[]
}

/** 某时代叠加在真实底图上的要素与地标 */
export interface GeoEraOverlay {
  features?: GeoFeature[]
  markers?: GeoMarker[]
}

export interface Location {
  id: string
  name: string
  /** 用于地址匹配的别名（含完整地址写法） */
  aliases: string[]
  region: string
  coord: { lat: number; lng: number }
  /** 封面 emoji / 标签 */
  cover: string
  /** 一句话简介 */
  tagline: string
  /** 拥有记录的时代（决定时间轴可选项），按从今到古排序 */
  eras: EraKey[]
  records: Partial<Record<EraKey, EraRecord>>
  story: PlaceStory
  nearby: NearbySpot[]
  /** 真实地理底图（边界 + 水系），供 GeoMap 渲染 */
  geo: GeoBase
}

/** 🤖 AI 时空导游：关键词匹配规则 */
export interface AiQARule {
  keywords: string[]
  /** 根据当前地点生成答复 */
  answer: (loc: Location) => string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'guide'
  text: string
}
