# 「时迹 ChronoTrace」杭州地图真实化技术方案

> 基于现状审计（`src/data/hangzhou.ts` 手绘 9 点边界 / 12 点西湖 / 4 点钱塘江）与实测数据源清单，目标是把杭州页从"简笔画"提升到"可信的历史地理图"。方案已核对仓库现有代码：`GeoMap.tsx` 的投影/渲染骨架、`huainanBoundary.ts` 生成模式、`types` 中 `GeoFeatureKind` 定义均予保留复用。

---

## 一、视图设计：从"全市"改为"西湖为中心的城区级视图"

### 1.1 核心决策：两级 bbox

当前 `BBOX = [120.105, 30.19, 120.19, 30.278]` 太小（放不下灵隐、运河、皇城）又太"空"（东侧城区无内容）。改为两级视图：

| 视图 | bbox `[minLng, minLat, maxLng, maxLat]` | 覆盖范围 | 用途 |
|---|---|---|---|
| **城区级（默认）** | `[120.06, 30.16, 120.24, 30.32]` | 西：北高峰/灵隐（120.0997）；东：钱塘江北岸城区；南：六和塔/之江段（30.1966）；北：运河拱宸桥（30.3183，恰在北缘） | 首屏、时代切换、古今对比 |
| **湖区级（放大）** | `[120.105, 30.20, 120.178, 30.272]` | 西湖全湖 + 三岛 + 两堤 + 湖滨 + 吴山北麓 | 点击西湖/双击放大后 |

校验：城区级 `Δlng·cos(30.24°) ≈ 0.1556`，`Δlat = 0.16`，近似正方形，与 `createProjector` 的 0–100 视图匹配良好；湖区级同理（0.0631 vs 0.072）。西湖水体实测 bbox（120.119–120.158 / 30.229–30.263）在两级视图中均完整居中。

### 1.2 关键架构变更：陆地渲染模型

城区级 bbox 远小于杭州市行政边界，**"boundary 多边形填充为陆地"的模型在此失效**（市界完全在视野外）。改为：

- 陆地 = 全幅底色（`#262017` 铺满 viewBox），不再依赖 boundary 填充；
- 水体（西湖、钱塘江、运河）作为"挖空"的深色面要素叠于其上；
- `GeoBase.boundary` 改为**可选**：有则画（淮南/上海/新加坡不受影响），无则走全幅陆地模式——这样杭州与其他三城共用同一组件，零回归风险；
- 市级/区县边界降级为细线装饰层（M3 的"全市概览小地图"再用）。

### 1.3 各图层数据获取方式与退路

精度分级约定（写入生成文件头注释）：
- **A 级**：开源实测矢量，<20 m（如 OSM 导出水体）
- **B 级**：简化/粗精度开源矢量，20–200 m（如 Natural Earth 10m）
- **C 级**：从模型知识手工数字化的真实走向，50–150 m
- **D 级**：文献复原/示意，>200 m（历史图层的合理上限）

| 图层 | 主数据源（实测 200） | 退路 | 精度 |
|---|---|---|---|
| **西湖水体** | `maptalks/maptalks.three` 的 `demo/data/westlake.geojson`（OSM id 2308774，MultiPolygon，38 KB）——本次最有价值命中，直接用 | 无需退路 | **A** |
| **湖心三岛** | westlake.geojson 若 MultiPolygon 含内环/岛屿环则直接提取 | 手工数字化：三潭印月（~120.1420, 30.2380，约 12 点，含放生池"田"字轮廓简化为外圈）、湖心亭（120.1447, 30.2452，6 点）、阮公墩（120.1428, 30.2492，5 点） | A 或 C |
| **苏堤/白堤/杨公堤** | 无现成矢量（OSM 生态全拦截） | 手工数字化：苏堤北端跨虹桥（120.1317, 30.2568）→南端花港（120.1385, 30.2310），取 12–15 点含微弯；白堤断桥（120.1518, 30.2587）→平湖秋月/孤山（120.1445, 30.2557），8–10 点；杨公堤 10–12 点（120.128 一线南北向） | **C** |
| **钱塘江** | Natural Earth `ne_10m_rivers_lake_centerlines.geojson` 中 `name='Fuchun'` 要素（82 点），按 `[119.9, 30.05, 120.25, 30.25]` 裁剪取杭州段 | NE 线末端止于 120.16/30.20，**市区下游段缺失**：手工续接 12–18 点（之江大弯 → 南星桥 → 复兴大桥一线，至 bbox 东缘 120.24），与 NE 上游段拼接；渲染为**双线加宽面**（中心线两侧偏移 ~0.004° 生成江面多边形）而非细折线 | B + C |
| **京杭大运河** | `weponusa/teachany-courseware` 的 `rivers-historical.geojson`：「京杭大运河·元代取直后」南端节点即杭州，且自带朝代 `period` 属性，天然适配时代叠加 | 杭州城区段（拱宸桥→武林门→艮山门）该源仅 1–2 点，手工加密至 8–12 点（沿 120.147→120.16 一线） | D + C |
| **群山** | 无可用 DEM/山体矢量（Overpass 不可达） | 手工数字化 6 个山体多边形（各 10–20 点）：宝石山—葛岭（保俶塔所在）、北高峰—美人峰、南高峰、玉皇山、吴山、凤凰山。以真实山脊范围圈定，配合 hatching 渲染（见 §3） | **C** |
| **主干路网** | 无可用源 | 手工数字化 8–10 条真实走向主干道（各 5–15 点）：北山街、南山路、湖滨路、延安路、解放路、环城西路、灵隐路、之江路、体育场路、中河高架（走中河故道，兼作历史线索） | **C** |
| **南宋临安城/皇城** | GitHub 无可用矢量（已搜索确认） | 手工数字化（依据咸淳临安志复原图的公开常识）：外城墙 20–30 点（南至凤凰山、北至武林门、东沿中河—贴沙河、西沿西湖东岸）；皇城 8–12 点多边形（凤凰山东麓，约 120.155–120.168 / 30.212–30.228）。**明确标注 D 级示意**，图上以虚线 + "复原示意"角注呈现，避免误导 | **D** |
| **清杭州府城墙** | 无 | 手工 15–20 点：大致沿今环城北路—环城东路（贴沙河内侧）—城头巷—环城西路闭合，十座城门取 4–5 座作 marker（武林门、涌金门、清波门、凤山门） | D |
| **历代湖岸线** | 无 | 手工 2–3 条：①唐以前潟湖/海湾岸线（湖面东扩至今武林门—湖滨城区一带，西抵山麓）；②明代湖岸（杨公堤以西茅家埠水域尚存）；各 15–25 点，D 级，仅在对应时代 overlay 中出现 | D |
| **区县边界（备用）** | `lyhmyd1211/GeoMapData_CN` `county/{adcode}.json`（330102 上城/330106 西湖区已实测 200）；更高精度换 `Vonng/adcode` `data/fences/{adcode}.json`（密度 3 倍，裸 geometry 需包 Feature） | dataease 镜像（必须带 commit sha `e46e25f4…`） | A |
| **市界（保留现有用途）** | 已知基线 `Civitasv/DataV_GeoJSON` `city/330100.json` | — | A |

> 硬约束提醒：`geo.datav.aliyun.com` 与整个 OSM 官方生态在本环境均不可达；所有 fetch 固定走 `raw.githubusercontent.com`（HTTPS 经代理，CA `/root/.ccr/ca-bundle.crt`）。

---

## 二、数据管线：脚本化生成 .ts 模块

沿用 `huainanBoundary.ts` 的产物形态（文件头注明来源与精简方式、导出 `BBOX` + 坐标数组常量），但把"一次性手工转换"升级为可重跑脚本。

### 2.1 目录与脚本

```
scripts/geo/
  sources.mjs      # 数据源清单：{ id, url, kind, postProcess }，含 commit-sha 固定的备用镜像
  fetch.mjs        # 拉取并缓存原始文件到 scripts/geo/raw/（.gitignore），失败时回退备用 url
  simplify.mjs     # Douglas-Peucker（纯函数，~40 行，无依赖）
  clip.mjs         # 按 bbox 裁剪 LineString / 提取 MultiPolygon 最大环与岛屿环
  build.mjs        # 编排：raw → 裁剪 → 精简 → 写出 src/data/generated/*.ts
package.json: "geo:build": "node scripts/geo/fetch.mjs && node scripts/geo/build.mjs"
```

产物（自动生成，文件头标注"自动生成，勿手改"+ 来源 + epsilon + 精度等级）：

- `src/data/generated/hangzhouBoundary.ts` — 市界（供概览小地图/其他城市模式复用）
- `src/data/generated/westLake.ts` — 西湖水体 + 岛屿环
- `src/data/generated/qiantangRiver.ts` — NE 裁剪段（手工续接段放手工文件里拼接）
- `src/data/generated/grandCanal.ts` — 运河两条历史线（保留 `period` 属性）

手工数字化数据**不进 generated**，单独维护：

- `src/data/hangzhouManual.ts` — 堤、路网、山体、皇城/城墙、历史湖岸线（每个要素注释精度等级与依据）

### 2.2 Douglas-Peucker 参数（epsilon 单位：度，1e-3 ≈ 100 m）

| 数据 | epsilon | 目标点数 | 理由 |
|---|---|---|---|
| 市界 330100 | `1.5e-3` | 100–150 | 对齐淮南 108 点基线，仅概览用 |
| 区县边界 | `8e-4` | 60–100/区 | 细线装饰，无需高密 |
| **西湖水体** | `1.5e-4` | 200–300 | 主角，湖区级放大后仍需湖湾细节（西里湖、北里湖、小南湖必须可辨） |
| 岛屿环 | `5e-5` 或不精简 | 每岛 8–20 | 本来就小 |
| 钱塘江 NE 段 | `5e-4` | 30–50 | 10m 级源，过密无意义 |
| 运河历史线 | 不精简 | 原样 | 仅 13/5 点，反向需手工加密 |

实现要点：`simplify.mjs` 对经度先乘 `cos(midLat)` 再算点线距，避免纬向失真；MultiPolygon 取面积最大外环为主体，面积 > 阈值（约 1e-6 平方度）的其余环视为岛屿单独输出。

### 2.3 类型扩展（`src/types/index.ts`）

```ts
export type GeoFeatureKind =
  | 'river' | 'lake' | 'rail' | 'road' | 'wall' | 'area' | 'mountain' | 'coastline'
  | 'canal' | 'road-major' | 'island' | 'shoreline-old'   // 新增

export interface GeoFeature {
  id: string
  kind: GeoFeatureKind
  name?: string
  coords: LngLat[]
  rings?: LngLat[][]          // 新增：多环（湖体含岛）
  accuracy?: 'A' | 'B' | 'C' | 'D'  // 新增：D 级要素渲染为虚线+示意角注
  width?: number              // 新增：覆盖 LINE_STYLE 默认线宽（江面/主次干道）
}

export interface GeoMarker {
  // 现有字段不变，新增：
  priority?: number           // 标签布局优先级（1 最高）
  minZoom?: 'city' | 'lake'   // 湖区级才显示的次要标记
}

export interface GeoBase {
  bbox: [number, number, number, number]
  boundary?: [number, number][]   // 改为可选（见 §1.2）
  zoomBbox?: [number, number, number, number]  // 新增：湖区级 bbox
  base?: GeoFeature[]
}
```

`kind: 'water'` 的 marker 语义错误（堤显示成 💧）同步修：苏堤/白堤 marker 改 `kind: 'landmark'`，并新增 `MarkerKind: 'causeway' | 'gate' | 'palace'`。

---

## 三、GeoMap 渲染升级清单

全部在现有骨架上加层，不推翻 `createProjector` / `FeaturePath` / memo / morphKey 机制。

### 3.1 新增图层与样式（`LINE_STYLE` 扩展 + `<defs>`）

1. **水体升级**：`lake` 改为 `rings` 多环 path（`fill-rule="evenodd"`，岛屿自动挖空再以 `island`（陆色填充+浅描边）盖回）；新增 `<pattern id="water-ripple">`（间距 2.5、微弯的 0.15 宽横线，`opacity 0.12`）叠在湖面与江面上。
2. **江面成面**：`build.mjs`/手工数据对钱塘江中心线做左右偏移生成江面多边形（宽 ~0.004°–0.008°，入海方向渐宽），kind 仍 `river` 但走 fill 渲染；上游窄段保留线渲染。
3. **山体 hatching**：`mountain` 多边形填充改为 `<pattern id="hill-hatch">`（45° 短斜线，emerald 低透明度）+ 沿多边形内缩 1–2 次的"等高线环"（`clip.mjs` 里做多边形 inset，或渲染时简单 scale-toward-centroid 两次），远看即有传统舆图的山峦质感。
4. **路网**：`road-major`（宽 0.8、`stroke-parchment-100/55`）与 `road`（0.45、/30）两级；仅城区级显示 major，湖区级两级都显示。
5. **城墙**：现有 `wall` 样式保留，D 级要素统一叠加 `stroke-dasharray` 并在图角渲染一行 3px 小字"◌ 虚线图层为文献复原示意"。
6. **旧湖岸线**：`shoreline-old` 用 `coastline` 变体（sky 低透明长虚线），只出现在对应时代 overlay。

### 3.2 标签防重叠：简单贪心 + 引线（新文件 `labelLayout.ts`）

纯函数，输入投影后的 marker 点列，输出每个标签的锚位或隐藏标志：

1. 按 `priority`（缺省按 kind：landmark > temple > transit > village）排序；
2. 每个标签依次尝试 4 个候选位：下、上、右、左（文本宽估算 `name.length × fontSize × 1.05`，AABB 盒）；
3. 与已放置盒及所有 marker 圆点做矩形相交测试，取第一个不冲突位；
4. 全冲突 → 尝试外推 1.5 倍偏移并画 0.2 宽引线（`<line>` 连回圆点）；
5. 仍冲突 → 该标签在当前缩放级隐藏（圆点保留），湖区级重新布局后通常可显示。

复杂度 O(n²)，n < 30，无需网格索引。可直接单测（纯函数，仿 `composeAnswer` 的做法）。这一步直接解决断桥/保俶塔 0.005° 叠压问题（同时把保俶塔坐标修正到 120.1497, 30.2565；龙翔桥修正到 120.161, 30.257）。

### 3.3 两级缩放

不引入瓦片、不做自由平移（保持 SVG 一次成像的轻量架构）：

- `GeoMap` 新增 prop `view: 'city' | 'lake'`，据此选 `geo.bbox` 或 `geo.zoomBbox` 建 projector；
- 切换时用 CSS `transition` 对内容 `<g>` 做 transform 过渡：由两个 bbox 算出 scale/translate 差值，先 transform 动画 ~300ms，动画毕重投影（点位一致，无跳变）；简化实现可先做 crossfade（key 切换 + `animate-fade-in`，复用 morphKey 机制），M2 再补连续动画；
- UI：地图角落两枚切换钮「全城 / 西湖」，双击湖面也触发放大；
- marker 的 `minZoom: 'lake'` 在城市级不渲染，控制密度（城市级 8–12 个、湖区级 15–20 个）。

### 3.4 每时代地理差异（这是"时空对比"成立的关键）

各时代 overlay 不再复用同一组 features：

| 时代 | 专属地理要素 |
|---|---|
| **ancient（拆为 唐 / 南宋 两档更佳）** | 唐：古潟湖东扩岸线（D）、仅白堤、无苏堤；南宋：临安城墙 + 皇城多边形（D）、苏白二堤齐备、御街线（沿今中山路，C） |
| **1800** | 清府城墙 + 四城门 marker、雷峰塔（完整）、无路网无铁路 |
| **1900** | 清府城墙保留、雷峰塔(残)、运河漕运线加亮、茶园 area（龙井一带） |
| **1950（新增）** | 城墙消失（拆除于民国—50 年代）、沪杭铁路线 + 城站 marker、湖滨公园 |
| **2000（新增）** | 主干路网全开、杨公堤复建（2003 前夕）、雷峰塔重建工地 → 2026 档变为新塔 |
| **2026** | 路网 + 地铁 1 号线示意线（rail）+ 湖滨步行街 area |

底图（`base`）只保留跨时代不变项：西湖水体、钱塘江、山体。路网/铁路/城墙全部下放到各时代 overlay——这样拖动 PastPresent 滑块时，"有城墙的府城 vs 路网纵横的现代城区"对比一眼可见，无需改 PastPresentPage 逻辑。

---

## 四、逐文件改动清单

**新建**

| 文件 | 要点 |
|---|---|
| `scripts/geo/sources.mjs` | 数据源注册表（主 + 备用 url、dataease 需带 commit sha） |
| `scripts/geo/fetch.mjs` | 下载缓存到 `scripts/geo/raw/`（gitignore）；7.3MB 的 NE 河流文件仅本地缓存 |
| `scripts/geo/simplify.mjs` | D-P 实现（纬度余弦校正），导出供 build 与单测 |
| `scripts/geo/clip.mjs` | bbox 裁剪线要素、MultiPolygon 拆主环/岛环、多边形 inset（山体等高环） |
| `scripts/geo/build.mjs` | 编排 + 写出 generated/*.ts，文件头带来源/epsilon/精度等级 |
| `src/data/generated/westLake.ts` | A 级西湖多环（200–300 点 + 岛） |
| `src/data/generated/qiantangRiver.ts` | NE 裁剪段（B 级） |
| `src/data/generated/grandCanal.ts` | 两条历史运河线，保留 period 属性 |
| `src/data/generated/hangzhouBoundary.ts` | 市界（补齐与沪/新/淮一致的数据管线） |
| `src/data/hangzhouManual.ts` | 手工数字化：堤×3、主干道×8-10、山体×6、临安城墙/皇城、清城墙、古湖岸线×2、钱塘江市区续接段；逐要素注释精度等级 |
| `src/components/map/labelLayout.ts` | 贪心标签布局纯函数 + 单测 |
| `src/components/map/patterns.tsx` | `<defs>`：water-ripple、hill-hatch |

**修改**

| 文件 | 要点 |
|---|---|
| `src/types/index.ts` | §2.3 的类型扩展（全部可选字段，其他三城零改动兼容） |
| `src/data/hangzhou.ts` | 换 bbox（两级）、geo.base 重组（水体/江/山）、删除 9 点 BOUNDARY 与假"西山"、6 个时代各配专属 overlay、修 marker 坐标与 kind:'water' 错标、每时代 marker 扩到 8–15 个（灵隐、岳庙、清河坊、六和塔、城隍阁、南宋御街等从 nearby 文案升格上图） |
| `src/components/map/geo.ts` | `toPath` 支持 rings（evenodd 多环 d 串）；`createProjector` 不变 |
| `src/components/map/GeoMap.tsx` | boundary 可选/全幅陆地模式、新 LINE_STYLE 条目、patterns 引入、Marker 接入 labelLayout、`view` prop 与缩放切换、D 级示意角注 |
| `src/data/eras.ts` | 若时代枚举/文案在此定义，补 1950/2000（及 ancient 拆分标签） |
| `src/features/PastPresent/PastPresentPage.tsx` | 无逻辑改动，仅确认两侧分别传对应时代 overlay 后差异自然显现；可加默认对比档（南宋 vs 2026） |

**不动**：`useAiGuide`、story 文案骨架、淮南/上海/新加坡数据文件、morphKey 过渡机制。

---

## 五、工作量分级

### M1 必做——"及格线"（预计 3–4 人日）
1. 数据管线脚本 + 4 个 generated 模块（西湖 A 级水体是最大单点收益）；
2. 两级 bbox 与全幅陆地模式改造（§1.2，含 boundary 可选的兼容处理）；
3. 手工数字化第一批（C 级）：苏/白/杨公堤、三岛、钱塘江市区续接 + 江面成面、主干道 8 条；
4. marker 坐标修正 + kind 语义修正 + 贪心标签布局；
5. 各时代 overlay 去重：至少做到 ancient/1800/2026 三档地理要素肉眼可辨（古岸线、清城墙线、现代路网三选配）。

### M2 提升——"可信的历史地图"（预计 3–4 人日）
1. 补 1950/2000 两档 + ancient 拆唐/南宋，6 时代对齐淮南；
2. 临安城墙 + 皇城 + 御街（D 级示意 + 免责角注）、清府城墙与城门；
3. 山体 hatching + 等高环、水纹 pattern；
4. 两级缩放的连续 transform 动画与 `minZoom` 标记分级；
5. 运河图层（历史线 + 城区段手工加密），运河随时代出现/加亮。

### M3 锦上添花（预计 2–3 人日，可独立取舍）
1. 区县边界细线层 + 右上角"全市概览"小地图（复用 hangzhouBoundary.ts + 现有 projector）;
2. 城区肌理暗纹（路网围合区块的 5% 透明度填充，模拟街区密度）;
3. 标签引线的避让美化、湖区级 POI 扩到 20+;
4. 管线泛化：用同一脚本为上海/新加坡补湖泊水体与河道（sources.mjs 加条目即可）;
5. PastPresent 增加"时代对"选择器（任意两档对比）。

**验收口径**：时代切换时，不看 marker、仅看地图面要素也能在 1 秒内判断出所处时代；湖区级视图中西里湖/北里湖/小南湖/三岛全部可辨；无任何标签叠压。
