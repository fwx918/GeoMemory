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

/** 地图上的兴趣点，坐标基于 0..100 的 viewBox */
export interface MapPoi {
  id: string
  name: string
  x: number
  y: number
  /** 标注类型，影响图标 */
  kind?: 'landmark' | 'water' | 'temple' | 'transit' | 'village' | 'building'
  note?: string
}

/**
 * 某个时代的程式化 SVG 地图图层。所有几何均为 SVG path 的 "d" 字符串，
 * 绘制在 0..100 的 viewBox 中，使得不同时代之间可以平滑过渡（古今对照）。
 */
export interface MapLayers {
  /** 基础地貌（陆地轮廓） */
  land?: string
  /** 水体（河流 / 湖泊） */
  water: string
  /** 海岸线 */
  coastline?: string
  /** 建成区 / 城市范围 */
  cityExtent?: string
  /** 道路 / 堤岸等线状要素 */
  roads?: string[]
  pois: MapPoi[]
}

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
  mapLayers: MapLayers
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
}

/** 🤖 AI 时空导游：关键词匹配规则 */
export interface AiQARule {
  keywords: string[]
  eraHint?: EraKey
  /** 根据当前地点生成答复 */
  answer: (loc: Location) => string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'guide'
  text: string
}
