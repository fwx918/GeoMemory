// ============================================================================
// 时迹 ChronoTrace — 核心数据模型
// All historical content is seed data; everything is fully typed so the
// dataset can be extended without touching UI code.
// ============================================================================

/**
 * 时代 key。地点可自带朝代级时间轴（如杭州 'south-song'），
 * 未迁移的地点沿用全局 LegacyEraKey（'2026' | '1950' | ...）。
 */
export type EraKey = string

/** 旧版全局 6 档年代 key（淮南/上海/新加坡仍在使用） */
export type LegacyEraKey = '2026' | '2000' | '1950' | '1900' | '1800' | 'ancient'

/** 旧版全局时代（data/eras.ts 的 ERAS 列表项） */
export interface Era {
  key: LegacyEraKey
  /** 时间轴展示文案，如 "1800年" / "更早" */
  label: string
  /** 用于排序的数值（ancient 取一个很小的哨兵值） */
  year: number
  /** 简短的时代别称，如 "清·嘉庆" */
  dynasty?: string
}

/**
 * 朝代级时代定义（地点专属时间轴项）。
 * 例：{ key: 'south-song', label: '南宋', yearRange: [1127, 1276], year: 1200, weight: 3 }
 */
export interface EraDef {
  key: EraKey
  /** 时间轴主标签，如 "南宋" / "吴越" / "当代" */
  label: string
  /** 朝代/时期补充说明，如 "行在临安" */
  dynasty?: string
  /** 起止年（公元前用负数） */
  yearRange: [number, number]
  /** 代表年份，用于"最接近时代"匹配与排序 */
  year: number
  /** 时间轴刻度权重 1-3（3 = 重点时代，刻度更大、优先显示标签） */
  weight?: 1 | 2 | 3
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
// --------------------------------------------------------------------------

/** 经纬度坐标 [lng, lat] */
export type LngLat = [number, number]

export type GeoFeatureKind =
  | 'river'
  | 'lake'
  | 'rail'
  | 'road'
  | 'road-major'
  | 'canal'
  | 'wall'
  | 'area'
  | 'mountain'
  | 'coastline'
  | 'shoreline-old'

/**
 * 数据精度分级：A <20m 实测 / B 20-200m 开源矢量 /
 * C 手工数字化（真实走向近似）/ D 文献复原示意（渲染为虚线）
 */
export type GeoAccuracy = 'A' | 'B' | 'C' | 'D'

/** 一条真实地理要素：线状（river/rail/road）或环状（lake/area/wall/mountain） */
export interface GeoFeature {
  id: string
  kind: GeoFeatureKind
  name?: string
  /** 闭合环（面）或折线（线），均为 [lng, lat] */
  coords: LngLat[]
  /** 多环面（外环+岛环），evenodd 填充；存在时忽略 coords */
  rings?: LngLat[][]
  /** 数据精度（缺省视为 C；D 级渲染为虚线并出角注） */
  accuracy?: GeoAccuracy
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
  /**
   * 行政/区域边界环。省略时视图为"城区级"：
   * 整幅按陆地底色填充，水体作为面要素叠加（如杭州）。
   */
  boundary?: LngLat[]
  /** 各时代共有的基础要素（如现今河流、湖泊、山体） */
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
  /**
   * 朝代级专属时间轴（从今到古）。缺省时由全局 ERAS × eras 派生
   * （见 data/index.ts getTimeline）。
   */
  timeline?: EraDef[]
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
