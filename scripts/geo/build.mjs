// 真实地理数据管线：fetch → clip → simplify → 生成 src/data/generated/*.ts
// 运行：npm run geo:build（产物已入库；重跑仅在更新数据源时需要）
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const RAW = join(ROOT, 'scripts', 'geo', 'raw')
const OUT = join(ROOT, 'src', 'data', 'generated')
mkdirSync(RAW, { recursive: true })
mkdirSync(OUT, { recursive: true })

const SOURCES = {
  westlake: {
    url: 'https://raw.githubusercontent.com/maptalks/maptalks.three/master/demo/data/westlake.geojson',
    note: 'OSM way 2308774 西湖水体 (maptalks demo data)，精度 A 级',
  },
  neRivers: {
    url: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson',
    note: 'Natural Earth 1:10m 河流中心线（Fuchun=富春江/钱塘江），精度 B 级',
  },
}

async function fetchCached(key) {
  const file = join(RAW, `${key}.json`)
  if (!existsSync(file)) {
    console.log('fetching', SOURCES[key].url)
    const res = await fetch(SOURCES[key].url)
    if (!res.ok) throw new Error(`${key}: HTTP ${res.status}`)
    writeFileSync(file, await res.text())
  }
  return JSON.parse(readFileSync(file, 'utf-8'))
}

// Douglas-Peucker，经度差乘 cos(midLat) 校正后再算垂距（单位≈度）
function simplify(pts, eps, midLat) {
  const kx = Math.cos((midLat * Math.PI) / 180)
  const sqDist = (p, a, b) => {
    let [x, y] = [(p[0] - a[0]) * kx, p[1] - a[1]]
    const [dx, dy] = [(b[0] - a[0]) * kx, b[1] - a[1]]
    const d2 = dx * dx + dy * dy
    if (d2 > 0) {
      const t = Math.max(0, Math.min(1, (x * dx + y * dy) / d2))
      x -= t * dx
      y -= t * dy
    }
    return x * x + y * y
  }
  const dp = (arr) => {
    if (arr.length < 3) return arr
    let maxD = 0
    let idx = 0
    for (let i = 1; i < arr.length - 1; i++) {
      const d = sqDist(arr[i], arr[0], arr[arr.length - 1])
      if (d > maxD) {
        maxD = d
        idx = i
      }
    }
    if (maxD > eps * eps) {
      const l = dp(arr.slice(0, idx + 1))
      const r = dp(arr.slice(idx))
      return l.slice(0, -1).concat(r)
    }
    return [arr[0], arr[arr.length - 1]]
  }
  return dp(pts)
}

const ringArea = (ring) =>
  Math.abs(
    ring.reduce((s, p, i) => {
      const q = ring[(i + 1) % ring.length]
      return s + p[0] * q[1] - q[0] * p[1]
    }, 0) / 2,
  )

const round = (pts) => pts.map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)])

function emit(file, header, exports_) {
  const lines = [
    `// 自动生成，勿手改 —— scripts/geo/build.mjs`,
    ...header.map((h) => `// ${h}`),
    '',
    ...exports_,
    '',
  ]
  writeFileSync(join(OUT, file), lines.join('\n'))
  console.log('wrote', file)
}

const fmtRing = (ring) => `[\n${ring.map((p) => `    [${p[0]}, ${p[1]}],`).join('\n')}\n  ]`

// ---------------------------------------------------------------- 西湖水体
{
  const gj = await fetchCached('westlake')
  const geom = gj.features[0].geometry // MultiPolygon
  const midLat = 30.246
  const rings = []
  for (const poly of geom.coordinates) {
    poly.forEach((ring, i) => {
      const outer = i === 0
      // 岛环太碎的丢弃（面积阈值 ~2e-8 平方度 ≈ 0.02 公顷量级）
      if (!outer && ringArea(ring) < 2e-8) return
      const eps = outer ? 1.2e-4 : 4e-5
      const simp = round(simplify(ring, eps, midLat))
      if (simp.length >= (outer ? 30 : 5)) rings.push({ outer, pts: simp })
    })
  }
  const total = rings.reduce((s, r) => s + r.pts.length, 0)
  emit(
    'westLake.ts',
    [
      `来源：${SOURCES.westlake.url}`,
      SOURCES.westlake.note,
      `Douglas-Peucker eps 外环 1.2e-4 / 岛环 4e-5；${rings.length} 环共 ${total} 点`,
      '外环在前；内环为岛（三潭印月/湖心亭/阮公墩/孤山等），用 evenodd 填充挖洞',
    ],
    [
      'export const WEST_LAKE_RINGS: [number, number][][] = [',
      ...rings.map((r) => `  ${fmtRing(r.pts)},`),
      ']',
    ],
  )
}

// ---------------------------------------------------------------- 钱塘江
{
  const gj = await fetchCached('neRivers')
  const feats = gj.features.filter((f) => f.properties?.name === 'Fuchun')
  // 取杭州段最长的一条线
  let line = []
  for (const f of feats) {
    const ls = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates
    for (const l of ls) if (l.length > line.length) line = l
  }
  // 裁剪到杭州上游段（NE 数据止于约 120.149,30.196 六和塔附近）
  const clipped = line.filter(([x, y]) => x > 119.88 && y > 29.98)
  // 手工续接市区下游段（C 级：真实走向近似，六和塔→钱江新城→下沙方向）
  const extension = [
    [120.162, 30.203],
    [120.178, 30.212],
    [120.197, 30.223],
    [120.215, 30.236],
    [120.24, 30.249],
  ]
  const pts = round([...clipped, ...extension])
  emit(
    'qiantangRiver.ts',
    [
      `来源：${SOURCES.neRivers.url}`,
      SOURCES.neRivers.note,
      `NE 段 ${clipped.length} 点（B 级）+ 手工续接市区段 ${extension.length} 点（C 级）`,
    ],
    ['export const QIANTANG_RIVER: [number, number][] = ' + fmtRing(pts).trim()],
  )
}

// ---------------------------------------------------------------- 区县细线层
// 数据源：Vonng/adcode data/fences/{adcode}.json（民政部区划边界，精度 A）
const DISTRICTS = {
  hangzhou: [
    ['330106', '西湖区'], ['330102', '上城区'], ['330105', '拱墅区'],
  ],
  huainan: [
    ['340403', '田家庵区'], ['340404', '谢家集区'], ['340405', '八公山区'],
    ['340406', '潘集区'], ['340422', '寿县'],
  ],
  shanghai: [
    ['310101', '黄浦区'], ['310115', '浦东新区'],
  ],
}

for (const [city, list] of Object.entries(DISTRICTS)) {
  const out = []
  for (const [code, name] of list) {
    const file = join(RAW, `district_${code}.json`)
    if (!existsSync(file)) {
      const url = `https://raw.githubusercontent.com/Vonng/adcode/master/data/fences/${code}.json`
      console.log('fetching', url)
      const res = await fetch(url)
      if (!res.ok) {
        console.log(`  skip ${code}: HTTP ${res.status}`)
        continue
      }
      writeFileSync(file, await res.text())
    }
    const geom = JSON.parse(readFileSync(file, 'utf-8'))
    // Polygon | MultiPolygon → 取最大外环（区县通常单块）
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
    let ring = []
    for (const p of polys) if (p[0].length > ring.length) ring = p[0]
    const midLat = ring.reduce((s, p) => s + p[1], 0) / ring.length
    // 细线层只作背景，精简得更狠（~1km 容差）
    const simp = round(simplify(ring, 1.2e-3, midLat))
    out.push({ code, name, pts: simp })
  }
  if (out.length === 0) continue
  emit(
    `${city}Districts.ts`,
    [
      '来源：https://raw.githubusercontent.com/Vonng/adcode/master/data/fences/{adcode}.json（民政部区划，精度 A）',
      `Douglas-Peucker eps 1.2e-3；${out.length} 个区县，共 ${out.reduce((s, d) => s + d.pts.length, 0)} 点`,
      '仅作底图细线参考层，不参与地标定位',
    ],
    [
      'export interface DistrictRing { code: string; name: string; ring: [number, number][] }',
      '',
      `export const ${city.toUpperCase()}_DISTRICTS: DistrictRing[] = [`,
      ...out.map(
        (d) => `  { code: '${d.code}', name: '${d.name}', ring: ${fmtRing(d.pts)} },`,
      ),
      ']',
    ],
  )
}

console.log('done')
