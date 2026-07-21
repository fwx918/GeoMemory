# 时迹 ChronoTrace · 故事线深化方案（杭州试点）

> 基于 `/home/user/GeoMemory/src/types/index.ts` 现有模型、体验设计方案第 2/3/5 节与《杭州西湖故事线大纲》。目标：把「每时代一段 summary」升级为「朝代级时间轴 × 章节卷轴 × POI 锚点」三层结构，并让 AI 导游直接检索同一份数据。

---

## 1. 数据模型扩展（`src/types/index.ts`）

### 1.1 设计原则

- **单一数据源**：卷轴章节、POI 弹层、AI 导游语料共用 `Chapter`/`Poi`，内容不写两遍。
- **字符串 key 取代联合类型**：现有 `EraKey` 是全局 6 档联合类型，是 D4 假感的根源。新模型时代 key 为地点内唯一的自由字符串（如 `'wuyue'`、`'colonial-1890'`）。
- **渐进迁移**：新旧字段并存一个里程碑，UI 通过适配函数消费，最后删旧字段。

### 1.2 新增/修改接口

```ts
// ==========================================================================
// 时代（朝代级，每地点自定义）—— 替代全局 ERAS
// ==========================================================================

export interface EraDef {
  /** 地点内唯一，如 'wuyue' | 'southern-song'。不再受全局 EraKey 约束 */
  key: string
  /** 朝代/时期名：「吴越国」「南宋」「英属海峡殖民地」 */
  dynasty: string
  /** 精确到年，公元前用负数：[907, 978]、[-222, 589] */
  yearRange: [number, number]
  /** 展示覆盖，默认 `${dynasty} · ${formatYearRange(yearRange)}` */
  label?: string
  /** 内容丰富度 1~3，决定时间轴刻度视觉大小 */
  weight?: 1 | 2 | 3
  /** 该时代切换地图时的代表年份（用于「年份滚数」动效），默认取 yearRange 中点 */
  displayYear?: number
}

// ==========================================================================
// 故事线：时代 → 章节 → 段落
// ==========================================================================

export type ParagraphKind = 'fact' | 'legend' | 'disputed'

export type SourceKind = 'book' | 'gazetteer' | 'archive' | 'oral' | 'editorial'

export interface SourceRef {
  /** 书名/志名，渲染时自动加书名号 */
  title: string
  /** 卷次/篇目，如 '卷十二' */
  locator?: string
  kind: SourceKind
}

export interface Paragraph {
  /** 段落内唯一 id（AI 检索定位用），如 'wuyue-c2-p1' */
  id: string
  text: string
  /** 段落提及的 POI；卷轴滚动至此段时地图高亮这些点 */
  poiRefs?: string[]
  /** 默认 'fact'；'legend' 走传说排版 + 赭石「传说」章，'disputed' 灰「存疑」章 */
  kind?: ParagraphKind
  sources?: SourceRef[]
  /** 「考据笔记」眉批：主动暴露不确定性，如「考：断桥之名两说并存……」 */
  note?: string
}

export interface Chapter {
  id: string
  /** 如「筑塘捍潮：海龙王钱镠」 */
  title: string
  /** 精确到年；单年写 [910, 910] */
  yearRange: [number, number]
  /** true 时年份前加「约」——不确定本身是可信度信号 */
  circa?: boolean
  /** 默认 'history'。'legend' 章整章归传说层，可被图层开关过滤 */
  layer?: 'history' | 'legend'
  paragraphs: Paragraph[]
  /** 章节末 SourceBar 的汇总来源（段落级 sources 之外的整体出处） */
  sources?: SourceRef[]
}

// ==========================================================================
// POI：跨时代实体 + 各时代化身
// ==========================================================================

export interface PoiEraState {
  /** 该时代此点的名字：雷峰塔 → 雷峰塔（残）→ 雷峰新塔 */
  name: string
  /** POI 弹层缩略故事，≤120 字 */
  story: string
  /** 「在卷轴中阅读全文 →」跳转目标（Chapter.id 或 Paragraph.id） */
  chapterRef?: string
  /** 该时代此点是否为传说锚点（弹层加「传说」角标） */
  legend?: boolean
}

export interface Poi extends GeoMarker {
  /** 标签放置优先级：1 永远显示，3 放大才显示（体验设计 4.5） */
  priority?: 1 | 2 | 3
  /** key = EraDef.key。缺某时代 = 该时代此点不出现或仅作底图标注 */
  eraStates: Partial<Record<string, PoiEraState>>
  /** 坐标待核标记，渲染无感，供内容管线校准 */
  coordUnverified?: boolean
}

// ==========================================================================
// EraRecord / Location 扩展
// ==========================================================================

export interface EraRecord {
  /** 迁移期保留旧字段 era: EraKey（deprecated），新增： */
  eraKey: string
  title: string
  /** 保留：卷轴顶部导语 + 移动端降级摘要 */
  summary: string
  highlights: string[]
  imageHint?: string
  geoOverlay?: GeoEraOverlay
  /** 新增：本时代章节，卷轴主体。缺省时 UI 回退为 StoryCard 旧展示 */
  chapters?: Chapter[]
}

export interface Location {
  // ...现有字段不变...
  /** @deprecated 迁移期保留，M2 删除 */
  eras?: EraKey[]
  /** 新：地点自有时间轴，从古到今排序 */
  timeline: EraDef[]
  /** key 从 EraKey 放宽为 string（对应 EraDef.key） */
  records: Record<string, EraRecord>
  /** 新：跨时代 POI 库（geoOverlay.markers 保留为纯底图点，故事点迁入此处） */
  pois: Poi[]
}
```

### 1.3 迁移策略（向后兼容）

| 步骤 | 动作 |
|---|---|
| M1-a | `types` 新增上述接口；`EraKey` 改为 `type EraKey = string`（旧联合类型改名 `LegacyEraKey` 供淮南/新加坡/上海暂用） |
| M1-b | `data/eras.ts` 保留 `ERAS` 但导出 `legacyToTimeline(eras: LegacyEraKey[]): EraDef[]` 适配函数——未迁移地点自动获得由旧 5 档生成的 `timeline`（dynasty 取旧 `Era.dynasty`），UI 只消费 `timeline` |
| M1-c | `AppContext.activeEra: EraKey` → `activeEraKey: string`；`availableEras` 改由 `activeLocation.timeline` 派生 |
| M2 | 杭州率先填充 `chapters` + `pois`；`StoryCard` 检测 `record.chapters` 存在则渲染 `StoryScroll`，否则走旧展示（其余三城不炸） |
| M3 | 淮南/新加坡/上海补最小 `timeline`（各 5~6 档真实年代），删除 `Location.eras`、`LegacyEraKey`、全局 `ERAS` |

---

## 2. 呈现方案定稿

**选定：体验设计 2.2 的 c 方案「卷轴为主线 + POI 为锚点 + 双向联动」。**

理由（对齐诊断表）：
1. 纯卷轴（a）治 D3（文案短平）但不治 D7（交互无纵深）；纯 POI 触发（b）反之。混合形态是唯一同时攻两点的方案，且史料大纲天然是「叙事段落 + POI 清单」双结构，映射成本最低。
2. 内容零重复：`Paragraph.poiRefs` 与 `PoiEraState.chapterRef` 互为索引，POI 弹层的 120 字缩略故事是章节段落的摘要而非新写作。
3. 移动端可无损降级为「纯卷轴 + 底部抽屉」，不牺牲主线。

### 页面/组件结构

```
TimeSpaceMapPage
├─ LocationPicker
├─ 桌面 lg:grid-cols-[1.3fr_1fr]（移动端上下堆叠）
│  ├─ 左栏（sticky top-0，移动端钉顶 45vh）
│  │  └─ GeoMap
│  │     ├─ Marker 三态：dimmed / normal / focused（focusedPoiIds 来自 context）
│  │     └─ PoiPopover（点 marker：eraStates[activeEraKey].name + story
│  │        + KindBadge(legend) + 「在卷轴中阅读 →」；移动端 BottomSheet 40vh↑85vh）
│  └─ 右栏
│     ├─ EraTimeline（替换 TimelineSlider：序数等距刻度 + 跨度波浪断线
│     │  + 年份滚数动效 + 移动端横滚 scroll-snap）
│     └─ StoryScroll（src/components/story/）
│        ├─ EraIntro（record.summary 作导语）
│        ├─ ChapterHeader（「卷二」竖排章号 + 标题 + yearRange，进入视口点亮时间轴）
│        ├─ ParagraphBlock（IntersectionObserver threshold 0.6 → focusedPoiIds；
│        │  行内 POI chip 点击 → 地图 flyTo + 脉冲；KindBadge 史实/传说/存疑章）
│        ├─ ScholarNote（note 眉批：桌面第三窄列竖线小字，移动端折叠块）
│        ├─ SourceBar / CiteMark / SourceSheet（章末来源行 + 上标引注）
│        └─ ChapterProgress（左缘章节刻度轨）
```

**双向联动防打架规则**（沿用体验设计）：滚动驱动高亮时清除点击残留态；用户点击 POI 后 3 秒内暂停滚动监测。传说层：`layer === 'legend'` 的章节与 POI 走赭石印章角标 + 引文体排版，卷轴顶部提供「隐藏传说层」开关（过滤 legend 章与 legend POI 态）。

---

## 3. 杭州试点内容规格

### 3.1 规模

| 维度 | 规格 |
|---|---|
| 时代数 | **11 档**（大纲一至十一各成一档），传说层 4 条作为 legend 章挂靠相关时代，不单占时间轴刻度 |
| 章节数 | 每时代 2~4 章，共 **约 32 章**（史实 28 + 传说 4：白蛇挂南宋末/民国双引用取一、梁祝挂元明、济公挂南宋、苏小小挂秦汉六朝） |
| 段落数 | 每章 2~3 段，共约 80 段，每段 120~200 字 |
| POI | 去重后 **约 38 个** Poi 实体；跨时代复用锚点 3 个（雷峰塔 977→1924→2002、凤凰山 隋→南宋、孤山 唐→清→民国）；`eraStates` 总条目约 60 条，每条 story ≤120 字 |
| 来源注 | 每章 1~3 条 SourceRef（《梦粱录》《咸淳临安志》《西湖游览志》《武林旧事》、乾隆《西湖志》等 + `editorial` 演示声明）；考据笔记 note 约 15 处（正好消化大纲 20 处 [待核]） |
| 总字数 | 章节正文约 **1.3 万字** + POI 故事约 6 千字 + note/来源约 2 千字 ≈ **2.1 万字** |

### 3.2 大纲 → timeline 映射

```ts
timeline: [
  { key: 'qin-six', dynasty: '秦汉六朝', yearRange: [-222, 589], weight: 2 },
  { key: 'sui', dynasty: '隋', yearRange: [589, 618], weight: 1 },
  { key: 'tang', dynasty: '唐', yearRange: [618, 907], weight: 2 },
  { key: 'wuyue', dynasty: '吴越国', yearRange: [907, 978], weight: 3 },
  { key: 'north-song', dynasty: '北宋', yearRange: [978, 1127], weight: 2 },
  { key: 'south-song', dynasty: '南宋', yearRange: [1127, 1276], weight: 3 },
  { key: 'yuan-ming', dynasty: '元明', yearRange: [1276, 1644], weight: 2 },
  { key: 'qing', dynasty: '清', yearRange: [1644, 1911], weight: 2 },
  { key: 'republic', dynasty: '民国', yearRange: [1911, 1949], weight: 2 },
  { key: 'prc-early', dynasty: '疏浚与公园时代', yearRange: [1950, 2000], weight: 1 },
  { key: 'now', dynasty: '当代', yearRange: [2000, 2026], weight: 2 },
]
```

注意毛边原则（治 D8）：章节 yearRange 用真实年份（910、1090、1508、1924-09-25 在文案中精确到日），只有时代档位边界允许取朝代界年。

### 3.3 完整示例：吴越国（`wuyue`）

```ts
const WUYUE_RECORD: EraRecord = {
  eraKey: 'wuyue',
  title: '西湖 · 吴越国',
  summary:
    '唐亡后，临安人钱镠建吴越国定都杭州，奉行保境安民，乱世中独享七十年太平。捍海塘压住江潮，撩湖兵常年浚湖，满城塔影，号称东南佛国。',
  highlights: ['捍海石塘', '撩湖兵', '雷峰塔始建', '纳土归宋'],
  chapters: [
    {
      id: 'wuyue-c1',
      title: '石囤木桩：海龙王筑塘',
      yearRange: [907, 932],
      sources: [
        { title: '吴越备史', kind: 'book' },
        { title: '咸淳临安志', kind: 'gazetteer' },
      ],
      paragraphs: [
        {
          id: 'wuyue-c1-p1',
          text: '公元 907 年，唐朝落幕，临安人钱镠受封吴越王，以杭州为国都。他不争中原，只守着两浙十三州，换来乱世里罕见的七十年太平。910 年，他征发民夫，以竹笼盛巨石、打下木桩，在钱塘江边筑起捍海石塘，硬生生压住了年年吞田毁舍的江潮——民间从此尊称他「海龙王」。',
          poiRefs: ['qianwang-temple'],
          kind: 'fact',
          sources: [{ title: '吴越备史', kind: 'book' }],
        },
        {
          id: 'wuyue-c1-p2',
          text: '对西湖，钱镠做了一件此前没人做过的事：设「撩湖兵」千人，专职撩除葑草、疏浚淤泥。西湖第一次有了常设的养护队。传世的还有他写给王妃的那句「陌上花开，可缓缓归矣」——武人笔下九个字，被苏轼赞为「含思宛转」。',
          poiRefs: ['qianwang-temple', 'west-lake-label'],
          kind: 'fact',
          note: '考：撩湖兵人数诸志记为「千人」，或含撩浅军统称，确数待考。',
        },
      ],
    },
    {
      id: 'wuyue-c2',
      title: '东南佛国：满湖塔影',
      yearRange: [954, 975],
      sources: [{ title: '咸淳临安志', kind: 'gazetteer' }],
      paragraphs: [
        {
          id: 'wuyue-c2-p1',
          text: '吴越三代五王皆崇佛，杭州号称「东南佛国」。954 年，南屏山下建起净慈寺的前身慧日永明院；970 年，延寿禅师主持建六和塔于月轮山，以镇江潮；宝石山巅立起保俶塔，纤细如美人——「雷峰如老衲，保俶如美人」的对望格局，就在这几十年里定型。',
          poiRefs: ['jingci-temple', 'liuhe-pagoda', 'baochu-pagoda'],
          kind: 'fact',
        },
        {
          id: 'wuyue-c2-p2',
          text: '保俶塔的始建者，一说为吴越国臣吴延爽，为祈钱俶北行平安而建。此说与「保佑钱俶」的塔名传说互为表里，但确凿建造年份文献阙如。',
          poiRefs: ['baochu-pagoda'],
          kind: 'disputed',
          note: '考：保俶塔始建，一说吴延爽建于 963—968 年间，一说宋初重建时得今名。两说并存。',
        },
      ],
    },
    {
      id: 'wuyue-c3',
      title: '皇妃塔与纳土：一个王朝的退场',
      yearRange: [977, 978],
      sources: [
        { title: '宋史·吴越世家', kind: 'book' },
        { title: '雷峰塔地宫考古发掘（2001）', kind: 'archive' },
      ],
      paragraphs: [
        {
          id: 'wuyue-c3-p1',
          text: '977 年，末代国王钱俶在西湖南岸夕照山上建塔，供奉「佛螺髻发」，初名皇妃塔，俗称西关砖塔——这就是雷峰塔。塔尚未建成传说中的十三层，次年，钱俶做出决断：纳土归宋，把十三州户口图籍和平交予北宋。杭州免于战火，市井塔寺完好无损地进入了下一个王朝。',
          poiRefs: ['leifeng-pagoda'],
          kind: 'fact',
        },
        {
          id: 'wuyue-c3-p2',
          text: '2001 年雷峰塔地宫考古开启，鎏金纯银阿育王塔与「佛螺髻发」舍利出土，为这段千年前的建塔记录提供了实物印证——你在当代图层的新塔内，仍能俯瞰这处吴越地宫遗迹。',
          poiRefs: ['leifeng-pagoda'],
          kind: 'fact',
          sources: [{ title: '雷峰塔地宫考古发掘（2001）', kind: 'archive' }],
        },
      ],
    },
  ],
}

// POI 示例（含跨时代锚点雷峰塔）
const POIS: Poi[] = [
  {
    id: 'leifeng-pagoda', name: '雷峰塔', lng: 120.1489, lat: 30.2313,
    kind: 'temple', priority: 1,
    eraStates: {
      'wuyue': {
        name: '皇妃塔（雷峰塔）',
        story: '977 年钱俶为供奉佛螺髻发而建，初名皇妃塔。次年吴越纳土归宋，此塔成为一个王朝留给西湖的最后剪影。',
        chapterRef: 'wuyue-c3',
      },
      'republic': {
        name: '雷峰塔（塔倒）',
        story: '1924 年 9 月 25 日下午，因塔砖被盗挖而年久失修的雷峰塔轰然倒塌。鲁迅连作数文，塔倒成了新文化的公共话题。',
        chapterRef: 'republic-c2',
      },
      'now': {
        name: '雷峰新塔',
        story: '2002 年 10 月新塔落成，钢结构罩护吴越塔基遗址，「雷峰夕照」缺席 78 年后归位。',
        chapterRef: 'now-c1',
      },
      'south-song': {
        name: '雷峰塔',
        story: '「雷峰夕照」入列西湖十景。传说中法海以此塔镇压白蛇——「雷峰塔倒，西湖水干」。',
        chapterRef: 'ssong-legend-baishe',
        legend: true,
      },
    },
  },
  {
    id: 'baochu-pagoda', name: '保俶塔', lng: 120.1456, lat: 30.2593,
    kind: 'temple', priority: 1,
    eraStates: {
      'wuyue': {
        name: '保俶塔',
        story: '始建于吴越时期，一说吴延爽为祈钱俶平安而建。纤细挺秀，与湖南岸的雷峰塔隔湖对望。',
        chapterRef: 'wuyue-c2',
      },
    },
  },
  {
    id: 'liuhe-pagoda', name: '六和塔', lng: 120.1319, lat: 30.1997,
    kind: 'temple', priority: 2, eraStates: { 'wuyue': { name: '六和塔', story: '970 年延寿禅师主持建造，立于月轮山上以镇钱塘江潮。', chapterRef: 'wuyue-c2' } },
  },
  {
    id: 'jingci-temple', name: '净慈寺', lng: 120.1476, lat: 30.2300,
    kind: 'temple', priority: 2, eraStates: { 'wuyue': { name: '慧日永明院', story: '954 年始建，即后来的净慈寺。南屏晚钟的钟声源头。', chapterRef: 'wuyue-c2' } },
  },
  {
    id: 'qianwang-temple', name: '钱王祠', lng: 120.1553, lat: 30.2405,
    kind: 'building', priority: 2, eraStates: { 'wuyue': { name: '钱王祠（后世建）', story: '后世为纪念钱氏三代五王而建。祠中copy「陌上花开」手泽，是吴越七十年太平的纪念碑。', chapterRef: 'wuyue-c1' } },
  },
  {
    id: 'zhakou-baita', name: '闸口白塔', lng: 120.1416, lat: 30.1978,
    kind: 'temple', priority: 3, eraStates: { 'wuyue': { name: '闸口白塔', story: '吴越晚期石塔，仿木构楼阁式雕造，立于钱塘江畔运河入江口。', chapterRef: 'wuyue-c2' } },
  },
]
```

（注：`qianwang-temple` story 中「copy」为笔误示例，实作时应为「藏」——正式内容管线需过一遍人工校对，此处保留提醒。）

### 3.4 传说层挂靠

| 传说 | 挂靠时代 | 章 id | 说明 |
|---|---|---|---|
| 白蛇传 | south-song（故事时代背景）| `ssong-legend-baishe` | `layer:'legend'`；民国「塔倒」章正文以 fact 段落回链此章（传说与史实交汇点） |
| 济公 | south-song | `ssong-legend-jigong` | 首段 fact（道济实有其人）+ 后段 legend，示范混排 |
| 梁祝 | yuan-ming | `ym-legend-liangzhu` | 万松书院绑定注明「后世附会」 |
| 苏小小 | qin-six | `qs-legend-suxiaoxiao` | kind 用 `disputed`（半传说） |

---

## 4. AI 时空导游复用故事数据

现状 `aiResponses.ts` 是关键词 → 模板函数（D9 根源）。改造为**检索式**，粒度到段落、回答组织到章节：

### 4.1 检索索引（新文件 `src/data/storyIndex.ts`）

```ts
interface StoryIndexEntry {
  locationId: string
  eraKey: string
  chapterId: string
  paragraphId: string
  text: string           // 段落原文
  kind: ParagraphKind
  poiNames: string[]     // poiRefs 解析出的各时代名字（含别名）
  figures: string[]      // 从正文抽取的人名（构建时静态生成，非运行时 NLP）
  yearRange: [number, number]
  sources: SourceRef[]
}
export function buildStoryIndex(loc: Location): StoryIndexEntry[]
```

### 4.2 检索与回答流程

1. **年代解析**：`ERA_PHRASE_MAP` 硬编码 6 档映射废弃。问句中的「500 年前」→ `currentYear - 500 = 1526` → 落入 `timeline` 哪个 `yearRange`（元明）；「宋朝」「吴越」直接匹配 `EraDef.dynasty` 子串。这同时修复了新加坡/淮南共用一把尺子的问题。
2. **打分**：对每个 `StoryIndexEntry` 计 `score = POI 名命中×3 + 人物命中×3 + 正文关键词命中×1 + 年代落域×2 + 当前 activeEraKey 加成×1`。取最高章（同章段落聚合）。
3. **组织回答**：以命中段落原文为主体（不再模板拼接），末尾自动追加：
   - 来源行「据《咸淳临安志》」（复用 `SourceRef` 渲染规则）；
   - `kind === 'legend'` 时前置「这是流传的传说，并非史实：」——AI 口径与 UI 双标签一致；
   - 附操作 chip：「在地图上看雷峰塔 →」（携带 `poiRefs` 让聊天回答反向驱动地图 flyTo + 高亮）、「阅读本章 →」（跳 `chapterId`）。
4. **兜底诚实**：无 entry 得分超阈值时回答「这个问题我的史料里没有记载」并列出当前时代可问的 3 个章节标题——比答非所问的模板保住可信预算。
5. `AiQARule` 保留为高优先级前置层（问「名字由来」等结构化问题仍走 `PlaceStory`），未命中再进检索。

---

## 5. 逐文件改动清单 + 里程碑

### M1（模型与骨架，1 周，不产内容）

| 文件 | 改动 |
|---|---|
| `src/types/index.ts` | 新增 `EraDef/Chapter/Paragraph/SourceRef/Poi/PoiEraState`；`EraKey` 放宽为 `string`（旧联合类型改名 `LegacyEraKey`）；`Location` 加 `timeline/pois`，`eras` 标 deprecated；`EraRecord` 加 `eraKey/chapters` |
| `src/data/eras.ts` | 保留旧 `ERAS`，新增 `legacyToTimeline()` 适配；`getEra` 改按地点 timeline 查找 |
| `src/context/AppContext`（或对应文件） | `activeEra` → `activeEraKey: string`；`availableEras` 由 `activeLocation.timeline` 派生；新增 `focusedPoiIds` 状态 |
| `src/components/timeline/TimelineSlider.tsx` → `EraTimeline.tsx` | 重写：序数等距刻度、weight 圆点、跨度波浪断线 +「+N 年」小字、年份滚数、移动端横滚 snap |
| `src/components/common/EraBadge.tsx`、`src/features/*` 各页 | era 引用改字符串 key；`NearbySpot.era` 同步 |
| `src/data/huainan.ts`/`singapore.ts`/`shanghai.ts` | 仅加一行 `timeline: legacyToTimeline(eras)`，其余不动 |

### M2（杭州内容 + 卷轴，2~3 周，假感消除主力）

| 文件 | 改动 |
|---|---|
| `src/data/hangzhou.ts` | 按第 3 节规格填 11 档 `timeline`、32 章 `chapters`、38 个 `pois`（大纲坐标直接落 `Poi.lng/lat`，[待核] 项落 `note`/`coordUnverified`）；建议拆为 `src/data/hangzhou/` 目录（`timeline.ts`、每时代一文件、`pois.ts`、`geo.ts`） |
| `src/components/story/`（新目录） | `StoryScroll`、`ChapterHeader`、`ParagraphBlock`、`ScholarNote`、`SourceBar`、`CiteMark`、`SourceSheet`、`KindBadge`、`ChapterProgress`、`PoiPopover`（含移动端 BottomSheet） |
| `src/components/map/GeoMap.tsx` | Marker 三态（dimmed/normal/focused + 呼吸外圈）；`viewBox` 插值 flyTo；点击 marker 打开 `PoiPopover` |
| `src/features/TimeSpaceMap/TimeSpaceMapPage.tsx` | 左栏地图 sticky；右栏 `EraTimeline + StoryScroll`；`record.chapters` 缺省回退 `StoryCard`；滚动/点击联动防打架逻辑 |
| `src/components/common/StoryCard.tsx` | 保留为无 chapters 地点的回退展示 |

### M3（AI 检索 + 全站收尾，1~2 周）

| 文件 | 改动 |
|---|---|
| `src/data/storyIndex.ts`（新） | `buildStoryIndex` + 打分检索 + 回答组装（含来源行/传说前缀/兜底） |
| `src/data/aiResponses.ts` | `ERA_PHRASE_MAP` 废弃，改 `yearRange` 数值解析；`AI_QA_RULES` 降为前置层 |
| `src/features/AiGuide/*`、`src/components/chat/*` | 回答支持来源行渲染与「看地图/读本章」操作 chip，反向驱动 `focusedPoiIds` |
| `src/data/huainan.ts`/`singapore.ts`/`shanghai.ts` | 换真实 `timeline`（淮南 6 档：楚寿春→西汉淮南国→东晋淝水→清→民国煤矿→当代；新加坡 6 档：渔村→1819 开埠→1867 海峡殖民地→昭南→1965 建国→当代），各补 3~5 章最小故事线 |
| `src/types/index.ts`、`src/data/eras.ts` | 删除 `Location.eras`、`LegacyEraKey`、全局 `ERAS` 与 `legacyToTheline` 适配层 |

**风险提示**：M2 内容量（2.1 万字）是最大成本项，建议按时代分批上线（吴越/南宋/民国三个 weight-3 时代先行，即可覆盖三个跨时代锚点的纵向穿越演示）；`AppContext` 的 era key 字符串化牵动全部 feature，务必在 M1 一次做完，避免 M2 期间双轨。
