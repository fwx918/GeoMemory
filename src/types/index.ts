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
  /** 章节式正文（时光卷轴）；缺省时回退到 summary 卡片 */
  chapters?: Chapter[]
}

/** 📖 此地从前 */
export interface PlaceStory {
  nameOrigin: string
  changes: string
  keyFigures: string[]
  landmarkEvents: string[]
  pastVsPresent: string
}

// --------------------------------------------------------------------------
// 章节式故事线（时光卷轴）：时代 → 章节 → 段落，段落可联动地图 POI
// --------------------------------------------------------------------------

/** 史料出处 */
export interface SourceRef {
  /** 书名/文献名，渲染时自动加书名号（editorial 除外） */
  title: string
  /** 卷次/篇目等定位信息 */
  locator?: string
  /** classic=古籍 / modern=近现代研究 / editorial=编者说明 */
  kind?: 'classic' | 'modern' | 'editorial'
}

/** 段落性质：史实 / 传说 / 存疑 */
export type ParagraphKind = 'fact' | 'legend' | 'disputed'

export interface Paragraph {
  id: string
  /** 正文 120-200 字 */
  text: string
  kind?: ParagraphKind
  /** 滚动至此段时在地图上高亮的 POI id */
  poiRefs?: string[]
  /** 考据眉批（"考：……"） */
  note?: string
  sources?: SourceRef[]
}

export interface Chapter {
  id: string
  title: string
  /** 真实年份区间，如 [1089, 1090]；单点事件用同值 */
  yearRange?: [number, number]
  /** 年份不确切时的说明，如 "约" */
  circa?: boolean
  /** history=史实层 / legend=传说层（可一键隐藏） */
  layer?: 'history' | 'legend'
  paragraphs: Paragraph[]
  sources?: SourceRef[]
}

/** POI 在某个时代的形态（名字/故事随时代变化） */
export interface PoiEraState {
  /** 该时代的称呼，如 吴越称"皇妃塔" */
  name?: string
  /** ≤120 字缩略故事 */
  story: string
  /** 回链到章节 id */
  chapterRef?: string
  /** 传说角标 */
  legend?: boolean
}

/** 带时代状态的地标（GeoMarker 的超集） */
export interface Poi extends GeoMarker {
  /** 1=主地标（始终显示标签）2=次级 3=细节 */
  priority?: 1 | 2 | 3
  /** 各时代的名称与故事 */
  eraStates?: Record<string, PoiEraState>
  /** 坐标未经核对 */
  coordUnverified?: boolean
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
  /** 放大档 bbox（如杭州湖区级）；存在时地图右上角出现缩放切换 */
  zoomBbox?: [number, number, number, number]
  /** 放大档的名称，如 "湖区" */
  zoomLabel?: string
}

/** 某时代叠加在真实底图上的要素与地标 */
export interface GeoEraOverlay {
  features?: GeoFeature[]
  markers?: GeoMarker[]
  /** 引用共享 POI 表中的 id（与 markers 二选一或并用） */
  poiRefs?: string[]
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
  /** 共享 POI 表（含跨时代状态），由 geoOverlay.poiRefs 引用 */
  pois?: Poi[]
  /** 古今对照页的默认对比档 [过去, 现在]；缺省取最古 vs 最今 */
  featuredCompare?: [EraKey, EraKey]
}

/** 🤖 AI 时空导游：关键词匹配规则 */
export interface AiQARule {
  keywords: string[]
  /** 根据当前地点生成答复 */
  answer: (loc: Location) => string
}

/** 导游回答附带的可点操作（回控地图 / 时间轴） */
export type ChatAction =
  | { kind: 'focusPoi'; label: string; poiId: string; era?: EraKey }
  | { kind: 'gotoEra'; label: string; era: EraKey }

export interface ChatMessage {
  id: string
  role: 'user' | 'guide'
  text: string
  actions?: ChatAction[]
}
