# 本地开发指南

在自己电脑上改代码、验证满意后推送到远端。

## 日常循环

```bash
cd ~/Desktop/GeoMemory     # 你的本地路径

git pull                   # 1. 先拿最新（重要：每次动手前都做）
npm run dev                # 2. 起开发服务器，改代码即时热更新
                           #    浏览器打开 http://localhost:5173/

npm run typecheck          # 3. 满意后自检：类型
npm run build              # 4. 自检：能否构建

git add -A
git commit -m "说明改了什么"
git push                   # 5. 推到远端
```

`npm run dev` 会占住终端，另开一个终端标签跑 typecheck/git 命令即可；停服务器按 `Ctrl+C`。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 开发服务器（热更新） |
| `npm run typecheck` | 只做类型检查，最快的自检 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建产物 |
| `npm run build:single` | 打包成单个离线 HTML（`dist-single/index.html`，双击即开） |
| `npm run geo:build` | 重跑地理数据管线，重新生成 `src/data/generated/*.ts` |

## 改什么去哪里

```
src/data/
  <城市>.ts              城市主文件：时间轴、各时代 records、geo 底图要素
  <城市>/pois.ts         地标表（坐标 + 各时代的名称与故事）
  <城市>/chapters*.ts    章节正文（时光卷轴的内容）
  generated/             管线产物，勿手改（改了下次 geo:build 会覆盖）
  storyIndex.ts          AI 导游的检索与打分逻辑
  aiResponses.ts         AI 的年代短语表与意图规则

src/components/
  map/GeoMap.tsx         地图渲染（图层样式、标签防叠压、缩放、概览小地图）
  story/                 卷轴组件（章节、段落、来源行、传说角标、POI 弹层）
  timeline/              时间轴滑块

src/features/            五个页面各一个文件
docs/PRODUCT_PLAN.md     产品计划（M1/M2/M3 全貌与验收清单）
docs/plan/               史料大纲、地图技术方案、数据源实测表
```

## 常见改动配方

**改一段正文** → 找到 `src/data/<城市>/chapters*.ts` 里对应的 `text`，直接改。

**加一个地标**
1. 在 `src/data/<城市>/pois.ts` 的数组里加一项（`id` 全局唯一、`lng`/`lat` 用真实经纬度）
2. 想让它在某时代出现：把 `id` 加进 `src/data/<城市>.ts` 对应 record 的 `geoOverlay.poiRefs`
3. 想让它有专属故事：在该 POI 的 `eraStates` 里按时代 key 写 `{ name, story }`

**加一章故事**
1. 在 `chapters*.ts` 对应时代的数组里加一个 `Chapter`（`id` 用 `<时代key>-cN` 规律）
2. 段落 `poiRefs` 只能填 `pois.ts` 里存在的 id，否则滚动联动会断
3. 建议带 `sources`（来源）；没把握的史实写 `note: '考：……'`

**加一个时代档** → 在城市主文件的 `timeline` 数组加一个 `EraDef`，并在 `records` 里补同 key 的记录（含 `geoOverlay` 与 `chapters`）。

**改地图要素**（河流/城墙/道路走向）→ 在城市主文件顶部的 `const XXX: GeoFeature` 里改 `coords`。精度用 `accuracy` 标注：`A` 实测 / `B` 开源矢量 / `C` 手工数字化 / `D` 文献复原（D 会自动渲染成虚线并出角注）。

## 改完自查

除了 `npm run typecheck`，数据类改动建议跑一下完整性检查（防止 id 写错导致断链）：

```bash
node -e "
const g=require('fs').readdirSync('src/data');console.log('检查中…')
" 2>/dev/null
npm run build   # 构建能过基本就没有引用错误
```

要点：
- `poiRefs` 里的 id 必须在该城市的 `pois.ts` 里存在
- `chapterRef` 里的 id 必须在该城市的 `chapters*.ts` 里存在
- `eraStates` 的 key 必须是该城市 `timeline` 里的时代 key

## 与云端协作（避免冲突）

我（Claude）在云端容器里干活时也会推到同一个分支。为免互相覆盖：

- **你要动手前**：先 `git pull`，并告诉我一声「我本地在改 X」，我就不碰那些文件
- **你改完推送后**：告诉我，我 `git pull` 再继续
- **万一冲突了**：`git pull` 会提示冲突文件，手动编辑消除 `<<<<<<<` 标记后 `git add` + `git commit` 即可；实在乱了可以 `git reset --hard origin/<分支名>` 丢弃本地改动重来（会丢失未推送的修改，慎用）

也可以各开各的分支，最后再合：

```bash
git checkout -b my-edits    # 从当前分支开一个自己的
# ...改...
git push -u origin my-edits
```

## 踩坑提示

- **`package-lock.json` 平台差异**：云端是 Linux、你的是 macOS，重装依赖后这个文件会变。它变了不用管，**别提交**；要还原就 `git checkout package-lock.json`。
- **`npm install` 不要中途 Ctrl+C**：打断会留下损坏的二进制（典型报错 `esbuild ... error -88`）。真遇到就 `rm -rf node_modules package-lock.json && npm cache clean --force && npm install`。
- **网慢**：`npm install --registry=https://registry.npmmirror.com`
- **`src/data/generated/` 不要手改**：那是 `npm run geo:build` 的产物。
