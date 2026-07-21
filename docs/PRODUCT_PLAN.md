# 时迹 ChronoTrace · 杭州「真实化」最终产品计划

> 一句话定位：用真实地理与可考史料，把杭州页做成可信的时空地图。

---

## 一、背景与问题诊断：为什么"假"

用户核心反馈是「页面内容太假了，需要更加真实的地图、更详细的故事线」。对照仓库现状（`src/data/hangzhou.ts`、`src/components/map/GeoMap.tsx`、`src/data/aiResponses.ts`），假感来自三个互相放大的层面：

1. **地图是简笔画**：西湖仅 12 个手绘点、市界 9 点、钱塘江 4 点折线；bbox `[120.105, 30.19, 120.19, 30.278]` 既放不下灵隐/运河/六和塔，又留出大片空白；没有山体、路网、堤岛，断桥与保俶塔标签叠压（间距仅 0.005°），苏堤/白堤被错标为 `kind: 'water'` 显示成水滴图标。
2. **故事线是薄壳**：每时代只有一段 summary，全局硬编码 6 档 `EraKey`（ancient/1800/1900/…）把杭州两千年历史和新加坡两百年历史套进同一把尺子；无章节、无出处、无史实/传说区分，文案短平且无法追问。
3. **时代切换没有地理差异**：各时代复用同一组地图要素，拖动古今对比滑块时地图几乎不变，「时空对比」这一核心卖点不成立；AI 导游走关键词模板拼接，答非所问进一步透支可信度。

结论：真实感 = 真实几何（A/B 级开源矢量 + C/D 级标注精度的手工数字化）× 真实叙事（朝代级时间轴 + 有出处的章节正文）× 真实差异（每时代专属地理图层）。三者共用同一份数据，一处修改全站生效。

## 二、产品目标（可验收）

1. **地图可信**：湖区级视图中西里湖/北里湖/小南湖/三岛全部可辨（西湖水体 ≥200 点 A 级实测数据）；全图无任何标签叠压；D 级复原要素以虚线 + 角注明示，不冒充实测。
2. **时代可辨**：时代切换时，不看文字标签、仅看地图面要素（古湖岸线/城墙/路网等）即可在 1 秒内判断所处时代；杭州时间轴扩到 11 档朝代级刻度。
3. **故事可查**：杭州全量约 32 章 / 2.1 万字正文上线，每章带《咸淳临安志》等来源注；史实/传说/存疑三态区分；AI 导游回答以段落原文为主体并附来源行，无史料时诚实兜底。

## 三、方案总览

```
                    ┌────────────────────────────────────────────┐
  开源矢量源         │  scripts/geo/  数据管线（fetch→clip→simplify）│
  (raw.githubuser…) ─┤  产物: src/data/generated/*.ts (A/B级,勿手改) │
                    └────────────────────────────────────────────┘
  手工数字化 ────────→ src/data/hangzhouManual.ts (C/D级,逐要素注精度)
                                    │
  史料大纲 ─────────→ src/data/hangzhou/ (timeline 11档 + 32章 chapters
                      + 38个 pois，单一数据源)
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
   GeoMap（两级缩放、        StoryScroll 卷轴（章节、      storyIndex 检索
   多环水体、山体 hatching、  来源注、传说层、滚动联动      （AI 导游按段落
   labelLayout 防叠压、      focusedPoiIds ↔ 地图高亮）    检索+来源行+
   每时代专属 overlay）                                     操作 chip 回控地图）
```

关键合成决策（消除两方案冲突）：

- **时代体系以故事线方案的 11 档字符串 key 为准**（`wuyue`、`south-song`…），废弃全局 6 档 `EraKey`；地图方案中的每时代地理差异表**重新挂靠到 11 档 key** 上（见 §4.4）。
- **POI 统一为故事线方案的 `Poi`（含 `eraStates`）**，地图方案的 marker 坐标修正、`priority`/`minZoom` 字段并入 `Poi`；`geoOverlay.markers` 降级为纯底图标注（山名、水名），故事点全部迁入 `pois`。
- **标签布局用地图方案的 `labelLayout.ts` 贪心算法**，消费 `Poi.priority`（1~3，与故事方案对齐）。
- 里程碑合并为一套 M1/M2/M3（见 §6），两侧工作项按依赖关系交织排布。

## 四、地图真实化

### 4.1 两级视图

| 视图 | bbox `[minLng, minLat, maxLng, maxLat]` | 覆盖 | 用途 |
|---|---|---|---|
| 城区级（默认） | `[120.06, 30.16, 120.24, 30.32]` | 西至灵隐（120.0997）、南至六和塔（30.1966）、北至拱宸桥（30.3183）、东含钱塘江北岸城区 | 首屏、时代切换、古今对比 |
| 湖区级（放大） | `[120.105, 30.20, 120.178, 30.272]` | 西湖全湖 + 三岛 + 两堤 + 吴山北麓 | 点击/双击湖面后 |

两级均近似正方形（城区级 Δlng·cos30.24° ≈ 0.1556 vs Δlat 0.16），与 `createProjector` 的 0–100 视图匹配。西湖实测 bbox（120.119–120.158 / 30.229–30.263）在两级中完整居中。

**架构变更**：城区级 bbox 远小于市界，「boundary 填充为陆地」失效。改为陆地 = 全幅底色（`#262017`），水体作深色面要素叠加；`GeoBase.boundary` 改可选（淮南/上海/新加坡不受影响，零回归）。缩放切换先做 crossfade（复用 morphKey），M2 补 300ms transform 连续动画；不引入瓦片与自由平移。

### 4.2 数据源与退路（精度分级：A <20m 实测 / B 20–200m / C 手工数字化真实走向 / D 文献复原示意）

所有 fetch 固定走 `raw.githubusercontent.com`（HTTPS 经代理，CA `/root/.ccr/ca-bundle.crt`）；`geo.datav.aliyun.com` 与 OSM 官方生态在本环境不可达。

| 图层 | 主数据源（已实测 200） | 退路 | 精度 |
|---|---|---|---|
| 西湖水体 | `maptalks/maptalks.three` 的 `demo/data/westlake.geojson`（OSM id 2308774，MultiPolygon，38 KB） | 无需 | **A** |
| 湖心三岛 | westlake.geojson 内环提取 | 手工：三潭印月（120.1420, 30.2380，~12 点）、湖心亭（120.1447, 30.2452）、阮公墩（120.1428, 30.2492） | A/C |
| 苏堤/白堤/杨公堤 | 无现成矢量 | 手工：苏堤跨虹桥（120.1317, 30.2568）→花港（120.1385, 30.2310）12–15 点；白堤断桥（120.1518, 30.2587）→孤山 8–10 点；杨公堤 10–12 点 | **C** |
| 钱塘江 | Natural Earth `ne_10m_rivers_lake_centerlines.geojson` 中 `name='Fuchun'`（82 点），按 `[119.9, 30.05, 120.25, 120.25→30.25]` 裁剪 | NE 止于 120.16/30.20，市区下游段手工续接 12–18 点至 bbox 东缘；渲染为中心线两侧偏移 ~0.004° 的江面多边形 | B+C |
| 京杭大运河 | `weponusa/teachany-courseware` 的 `rivers-historical.geojson`（元代取直线，自带 `period` 属性） | 城区段（拱宸桥→武林门→艮山门）手工加密至 8–12 点 | D+C |
| 群山 ×6 | 无可用 DEM | 手工多边形（各 10–20 点）：宝石山—葛岭、北高峰、南高峰、玉皇山、吴山、凤凰山，hatching 渲染 | **C** |
| 主干路网 ×8–10 | 无可用源 | 手工：北山街、南山路、湖滨路、延安路、解放路、环城西路、灵隐路、之江路、体育场路、中河高架（走中河故道） | **C** |
| 南宋临安城/皇城 | GitHub 无矢量（已确认） | 手工依咸淳临安志复原图常识：外城墙 20–30 点，皇城 8–12 点（凤凰山东麓 120.155–120.168 / 30.212–30.228）；虚线 +「复原示意」角注 | **D** |
| 清杭州府城墙 | 无 | 手工 15–20 点沿环城北/东/西路闭合，城门 marker 取武林门、涌金门、清波门、凤山门 | D |
| 历代湖岸线 ×2 | 无 | 手工：唐以前潟湖岸线、明代湖岸（茅家埠水域），各 15–25 点，仅对应时代 overlay 出现 | D |
| 区县边界（备用） | `lyhmyd1211/GeoMapData_CN` `county/{adcode}.json`（330102/330106 已实测）；高精度换 `Vonng/adcode` `data/fences/{adcode}.json` | dataease 镜像（须带 commit sha `e46e25f4…`） | A |
| 市界 | `Civitasv/DataV_GeoJSON` `city/330100.json` | — | A |

### 4.3 数据管线与渲染升级

**管线** `scripts/geo/`：`sources.mjs`（源注册表）、`fetch.mjs`（缓存至 `raw/`，gitignore）、`simplify.mjs`（Douglas-Peucker，经度乘 cos(midLat) 校正）、`clip.mjs`（bbox 裁剪 / 主环-岛环拆分 / 多边形 inset）、`build.mjs`（写出 `src/data/generated/*.ts`，文件头注来源/epsilon/精度级）。npm script：`"geo:build"`。

D-P 参数：市界 `1.5e-3`（100–150 点）、区县 `8e-4`、**西湖 `1.5e-4`（200–300 点，湖湾必须可辨）**、岛环 `5e-5` 或不精简、钱塘江 NE 段 `5e-4`（30–50 点）、运河历史线不精简。

**渲染**（在 `GeoMap.tsx` 现有骨架上加层，不推翻 projector/memo/morphKey）：
1. `lake` 改多环 path（`fill-rule="evenodd"` 挖岛）+ `water-ripple` pattern（opacity 0.12）；
2. 江面成面渲染，上游窄段保留线；
3. 山体 `hill-hatch`（45° 斜线）+ 内缩 1–2 次等高环；
4. 路网两级：`road-major`（0.8 宽）/`road`（0.45），湖区级才显示次级；
5. D 级要素统一 `stroke-dasharray` + 图角 3px 小字「◌ 虚线图层为文献复原示意」；
6. 标签防叠压：新文件 `src/components/map/labelLayout.ts`，贪心 4 候选位 + 引线 + 隐藏兜底，O(n²) 纯函数可单测。同步修正坐标：保俶塔 → 120.1497, 30.2565；龙翔桥 → 120.161, 30.257；苏/白堤 `kind:'water'` 错标改 `landmark`/新增 `causeway`。

### 4.4 每时代专属地理（挂靠 11 档 timeline，治「切换无差异」）

底图仅保留跨时代不变项：西湖水体、钱塘江、山体。其余全部下放到各时代 overlay：

| 时代 key | 专属地理要素 |
|---|---|
| `qin-six` / `sui` | 古潟湖/海湾岸线（东扩至今武林门—湖滨，D 级）、无堤 |
| `tang` | 唐湖岸线、仅白堤，无苏堤 |
| `wuyue` | 捍海塘线（C）、保俶塔/雷峰塔/六和塔 marker 出现 |
| `south-song` | 临安城墙 + 皇城多边形（D）+ 御街线（沿今中山路，C）、苏白二堤齐备 |
| `yuan-ming` | 明代湖岸（杨公堤以西茅家埠水域）、府城墙 |
| `qing` | 清府城墙 + 四城门 marker、雷峰塔（完整）、龙井茶园 area |
| `republic` | 城墙渐拆、雷峰塔（残→倒）、沪杭铁路 + 城站 marker、运河漕运加亮 |
| `prc-early` | 城墙消失、湖滨公园、疏浚expanded湖面 |
| `now` | 主干路网全开、杨公堤复建、雷峰新塔、地铁 1 号线示意（rail）、湖滨步行街 area |

Marker 密度：城区级 8–12 个、湖区级 15–20 个（`minZoom: 'lake'` 控制）。

## 五、故事线深化

### 5.1 数据模型（`src/types/index.ts`，全部新增字段可选，其他三城零改动兼容）

核心接口（详细定义按故事线方案 §1.2 落地）：

- **`EraDef`**：地点内唯一字符串 `key` + `dynasty` + 精确 `yearRange`（公元前用负数）+ `weight`(1~3 决定刻度大小) + `displayYear`。替代全局 `ERAS`。
- **`Chapter`**：`title` + `yearRange`（真实年份如 910、1090，非整数年代）+ `circa` + `layer: 'history' | 'legend'` + `paragraphs` + `sources`。
- **`Paragraph`**：`id`（AI 检索定位）+ `text`（120–200 字）+ `poiRefs`（滚动至此段时地图高亮）+ `kind: 'fact' | 'legend' | 'disputed'` + `sources: SourceRef[]`（title/locator/kind，自动加书名号）+ `note`（考据眉批）。
- **`Poi extends GeoMarker`**：`priority: 1|2|3` + `eraStates: Partial<Record<string, PoiEraState>>`（各时代名字 + ≤120 字缩略故事 + `chapterRef` 回链 + `legend` 角标）+ `coordUnverified`。同时并入地图方案的 `minZoom` 字段。
- **地图侧类型**：`GeoFeatureKind` 新增 `'canal' | 'road-major' | 'island' | 'shoreline-old'`；`GeoFeature` 加 `rings`/`accuracy`/`width`；`GeoBase.boundary` 可选 + `zoomBbox`。
- **迁移**：`EraKey` 放宽为 `string`，旧联合类型改名 `LegacyEraKey`；`data/eras.ts` 提供 `legacyToTimeline()`，未迁移地点自动获得 timeline；`AppContext.activeEra → activeEraKey: string`，新增 `focusedPoiIds`；M3 删除全部旧字段。

### 5.2 呈现：卷轴为主线 + POI 为锚点 + 双向联动

`TimeSpaceMapPage` 桌面 `lg:grid-cols-[1.3fr_1fr]`：左栏 sticky GeoMap（Marker 三态 dimmed/normal/focused + PoiPopover，移动端 BottomSheet 40vh↑85vh）；右栏 `EraTimeline`（替换 TimelineSlider：序数等距刻度、weight 圆点、跨度波浪断线、年份滚数、移动端 scroll-snap）+ `StoryScroll`（EraIntro / ChapterHeader 竖排章号 / ParagraphBlock（IntersectionObserver threshold 0.6 驱动地图高亮，行内 POI chip 点击 flyTo + 脉冲）/ ScholarNote 眉批 / SourceBar + CiteMark + SourceSheet / ChapterProgress）。

防打架规则：滚动驱动清除点击残留态；点击 POI 后 3 秒暂停滚动监测。传说层：legend 章/POI 走赭石印章角标 + 引文体排版，卷轴顶部「隐藏传说层」开关。POI 弹层 story 是章节段落摘要而非新写作，内容零重复。

### 5.3 杭州内容规格

| 维度 | 规格 |
|---|---|
| 时代 | **11 档**：秦汉六朝(-222–589) / 隋 / 唐 / 吴越(907–978, w3) / 北宋 / 南宋(1127–1276, w3) / 元明 / 清 / 民国(w2) / 疏浚与公园时代(1950–2000) / 当代(2000–2026) |
| 章节 | 每时代 2–4 章，共 **约 32 章**（史实 28 + 传说 4：白蛇挂南宋、济公挂南宋、梁祝挂元明、苏小小挂秦汉六朝 disputed） |
| 段落 | 约 80 段 × 120–200 字 |
| POI | 去重 **约 38 个**；跨时代锚点 3 个：雷峰塔（977 建→1924-09-25 倒→2002 新塔）、凤凰山（隋→南宋皇城）、孤山（唐→清→民国）；`eraStates` 约 60 条 |
| 来源 | 每章 1–3 条 SourceRef（《梦粱录》《咸淳临安志》《西湖游览志》《武林旧事》、乾隆《西湖志》+ editorial 声明）；考据 note 约 15 处消化大纲 20 处 [待核] |
| 总字数 | 正文 1.3 万 + POI 故事 6 千 + note/来源 2 千 ≈ **2.1 万字** |

毛边原则：章节年份用真实年份（910 筑塘、970 建六和塔、977 建皇妃塔、1924-09-25 塔倒），仅时代档位边界取朝代界年。吴越档已有完整示例内容（3 章 6 段 + 6 POI），作为其余 10 档的写作模板；正式内容需过人工校对。

### 5.4 AI 导游改造为检索式

新文件 `src/data/storyIndex.ts`：`buildStoryIndex(loc)` 把全部段落展平为索引（text/poiNames/figures/yearRange/sources）。流程：① 年代解析——废弃 `ERA_PHRASE_MAP`，「500 年前」→ 2026-500=1526 → 落 timeline 的元明档，「吴越」匹配 dynasty 子串；② 打分 `POI命中×3 + 人物×3 + 关键词×1 + 年代落域×2 + 当前时代×1`；③ 以段落原文组织回答，legend 前置「这是流传的传说，并非史实：」，末尾附来源行 +「在地图上看雷峰塔 →」「阅读本章 →」操作 chip（反向驱动 `focusedPoiIds` 与 flyTo）；④ 无命中时诚实兜底并列出当前时代可问的 3 个章节标题。`AiQARule` 保留为高优先级前置层。

## 六、里程碑

### M1 · 地基（约 1.5 周：地图 3–4 人日 + 模型骨架并行）

**范围**：数据管线 + 类型扩展 + 两级视图 + 时间轴模型，不产正式内容。

**涉及文件**：新建 `scripts/geo/`（sources/fetch/simplify/clip/build.mjs）、`src/data/generated/`（westLake/qiantangRiver/grandCanal/hangzhouBoundary.ts）、`src/data/hangzhouManual.ts`（第一批 C 级：三堤、三岛、江市区续接+成面、主干道 8 条）、`src/components/map/labelLayout.ts`（含单测）、`patterns.tsx`；修改 `src/types/index.ts`（§5.1 全部接口）、`src/data/eras.ts`（`legacyToTimeline`）、AppContext（`activeEraKey`/`focusedPoiIds`）、`src/components/map/geo.ts`（rings 支持）、`GeoMap.tsx`（boundary 可选/全幅陆地/两级 bbox crossfade/新样式）、`src/data/hangzhou.ts`（新 bbox、base 重组、marker 坐标与 kind 修正）、`huainan.ts`/`singapore.ts`/`shanghai.ts`（各加一行 `timeline: legacyToTimeline(eras)`）。

**完成标准**：`npm run geo:build` 可重跑产出 4 个 generated 模块；西湖 A 级水体 + 三堤三岛上图；两级缩放可切换；无标签叠压；其他三城功能零回归；至少 tang/qing/now 三档地理差异肉眼可辨。

### M2 · 内容与卷轴（2–3 周，消除假感主力）

**范围**：杭州 11 档全量内容 + 卷轴组件 + 全部时代 overlay + 地图质感。

**涉及文件**：`src/data/hangzhou/` 目录化（timeline.ts、每时代一文件、pois.ts、geo.ts）；新目录 `src/components/story/`（StoryScroll、ChapterHeader、ParagraphBlock、ScholarNote、SourceBar、CiteMark、SourceSheet、KindBadge、ChapterProgress、PoiPopover）；`EraTimeline.tsx` 重写替换 TimelineSlider；`GeoMap.tsx`（Marker 三态、flyTo、山体 hatching、水纹、连续缩放动画、D 级角注）；`hangzhouManual.ts` 第二批（临安城墙/皇城/御街、清城墙与城门、古湖岸线 ×2、运河城区段）；`TimeSpaceMapPage.tsx`（联动逻辑，`chapters` 缺省回退 StoryCard）；`PastPresentPage.tsx`（默认对比档：南宋 vs 当代）。

**完成标准**：11 档时间轴 + 32 章 2.1 万字上线（可按 吴越/南宋/民国 三个 weight-3 时代先行分批）；滚动卷轴 ↔ 地图高亮双向联动；传说层开关生效；每个时代切换均有专属地理面要素变化；湖区级西里湖/北里湖/小南湖/三岛可辨。内容量是最大成本项，写作与组件开发并行。

### M3 · AI 检索与全站收尾（1–2 周）

**范围**：AI 导游检索化 + 其他三城对齐 + 清理旧模型 + 锦上添花。

**涉及文件**：新建 `src/data/storyIndex.ts`；改 `aiResponses.ts`（废 ERA_PHRASE_MAP、AI_QA_RULES 降前置层）、`AiGuide`/chat 组件（来源行 + 操作 chip）；`huainan.ts`/`singapore.ts`/`shanghai.ts` 换真实 timeline（淮南 6 档：楚寿春→西汉淮南国→东晋淝水→清→民国煤矿→当代；新加坡 6 档：渔村→1819 开埠→1867 海峡殖民地→昭南→1965 建国→当代）并各补 3–5 章最小故事线；`types`/`eras.ts` 删除 `Location.eras`、`LegacyEraKey`、全局 `ERAS`。可选：区县细线层 + 右上角全市概览小地图（复用 hangzhouBoundary.ts）、城区肌理暗纹、管线泛化为上海/新加坡补水体、PastPresent 任意两档对比选择器。

**完成标准**：AI 问「500 年前的雷峰塔」返回元明档段落原文 + 来源行 + 可点 chip；问无史料内容时诚实兜底；旧 era 模型代码全部删除，`tsc` 无 deprecated 引用。

## 七、验收清单（用户打开页面能感知的变化）

1. 首屏地图是真实的杭州城区：西湖轮廓与实际吻合（湖湾、三岛、苏白杨三堤俱在），钱塘江是有宽度的江面，宝石山/吴山等六座山体带山峦纹理。
2. 双击西湖放大到湖区级，西里湖/北里湖/小南湖/三潭印月/湖心亭/阮公墩全部可辨，且出现更多细节标注。
3. 任何缩放级下没有一个标签压着另一个标签；放不下的标签自动带引线外移或隐藏。
4. 拖动时间轴：唐代看到东扩的古湖岸和孤零零的白堤；南宋出现临安城墙与皇城（虚线注明「复原示意」）；清代是府城墙与城门；民国铁路进城、雷峰塔标注「塔倒」；当代路网纵横、地铁上图——闭着眼睛切时代，睁眼 1 秒内认得出。
5. 时间轴是 11 档朝代刻度（吴越、南宋…），带真实年份区间，不再是「古代/1900/2026」。
6. 右栏是可滚动的章节卷轴：约 32 章、每段 120–200 字，滚到「977 年钱俶建皇妃塔」时地图上雷峰塔自动高亮呼吸；点正文中的 POI 名地图 flyTo。
7. 章末有「据《咸淳临安志》」式来源行，可展开查看；约 15 处「考：……」眉批主动交代存疑处。
8. 白蛇传等 4 条传说带赭石「传说」印章角标，与史实排版可区分，且可一键隐藏传说层。
9. 点雷峰塔 marker，弹层随时代变化：吴越叫「皇妃塔」、民国是「塔倒」、当代是「雷峰新塔」，各带 ≤120 字故事和「在卷轴中阅读 →」。
10. 问 AI「南宋的皇城在哪」得到章节原文改写的回答 + 来源 + 「在地图上看 →」chip；问它不知道的，它承认「史料里没有记载」并给出可问的章节。
11. 古今对比页默认「南宋 vs 当代」，两侧地图面要素差异一眼可见。
12. 淮南/上海/新加坡页功能不变（M3 后各自获得真实年代刻度）。
