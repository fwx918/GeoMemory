# 时迹 ChronoTrace

基于位置与历史数据的时空探索 Web 应用。四座城市（杭州西湖 / 淮南 / 上海南京东路 / 新加坡丹戎巴葛），每城一条朝代级时间轴，地图为真实经纬度投影的离线 SVG，故事以章节卷轴呈现并与地图联动。

## 命令

```bash
npm run dev          # 开发服务器 localhost:5173
npm run typecheck    # 类型检查（最快自检，改完必跑）
npm run build        # 类型检查 + 生产构建
npm run geo:build    # 重新生成 src/data/generated/*（仅数据源更新时）
```

## 架构速览

- `src/data/<城市>.ts` — 城市主文件：timeline（EraDef[]）、records（各时代 summary/geoOverlay/chapters）、geo 底图要素
- `src/data/<城市>/pois.ts` — 共享地标表：真实经纬度 + eraStates（各时代名称与故事）
- `src/data/<城市>/chapters*.ts` — 章节正文（Chapter → Paragraph）
- `src/data/index.ts` — 全部选择器（getTimeline/getRecord/getClosestEraByYear/resolveEraMarkers）
- `src/data/storyIndex.ts` — AI 导游检索索引与打分
- `src/components/map/GeoMap.tsx` — 地图渲染（投影/图层/标签防叠压/缩放/概览小地图）
- `src/components/story/` — 卷轴组件（滚动联动 IntersectionObserver 在 ParagraphBlock）
- `src/data/generated/` — 管线产物，**勿手改**
- 详细操作配方见 `docs/LOCAL_DEV.md`；产品计划见 `docs/PRODUCT_PLAN.md`

## 硬性约束（改数据必守，否则联动断链）

1. 段落 `poiRefs` / record 的 `geoOverlay.poiRefs` 里的 id 必须存在于该城市 `pois.ts`
2. POI 的 `chapterRef` 必须存在于该城市 `chapters*.ts` 的章节 id
3. `eraStates` 与 `records` 的 key 必须是该城市 `timeline` 里的时代 key
4. 章节 id 命名 `<时代key>-cN`，段落 id `<章节id>-pN`
5. 正文段落 120-200 字；史实/传说用 `kind: 'fact' | 'legend' | 'disputed'` 区分；不确定的史实写 `note: '考：……'`，不要默默写成定论
6. 地理要素标 `accuracy: 'A'|'B'|'C'|'D'`；D 级（文献复原）会自动渲染为虚线并出角注，不要把复原当实测

## 注意

- `package-lock.json` 跨平台（Linux 容器 vs macOS）会漂移：**不要提交它的变动**，还原用 `git checkout package-lock.json`
- 分支：`claude/chronotrace-app-design-aXBoX`；提交信息用英文 conventional 风格（feat/fix/docs），正文可含中文
- UI 全中文；配色宣纸+印章红（tailwind.config.js 的 ink/parchment/seal）
- 完全离线：不引入需联网的地图瓦片或字体 CDN
