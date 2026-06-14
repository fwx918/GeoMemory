import type { GeoFeature, Location } from '../types'
import { HUAINAN_BBOX, HUAINAN_BOUNDARY } from './huainanBoundary'

// 真实地理基础要素（各时代共有的自然水系与山体），坐标为真实经纬度 [lng, lat]。
// 位置依据真实地理近似绘制：淮河自西向东穿境而过，瓦埠湖在南、
// 高塘湖在东南、焦岗湖在西、八公山在城区西北。
const HUAI_RIVER: GeoFeature = {
  id: 'huai-river',
  kind: 'river',
  name: '淮河',
  coords: [
    [116.40, 32.58],
    [116.55, 32.63],
    [116.66, 32.68],
    [116.74, 32.72],
    [116.85, 32.70],
    [116.94, 32.64],
    [117.02, 32.62],
    [117.10, 32.63],
    [117.20, 32.61],
  ],
}

const WABU_LAKE: GeoFeature = {
  id: 'wabu-lake',
  kind: 'lake',
  name: '瓦埠湖',
  coords: [
    [116.93, 32.50],
    [116.99, 32.46],
    [117.02, 32.38],
    [117.0, 32.28],
    [116.95, 32.22],
    [116.9, 32.30],
    [116.89, 32.40],
    [116.9, 32.47],
  ],
}

const GAOTANG_LAKE: GeoFeature = {
  id: 'gaotang-lake',
  kind: 'lake',
  name: '高塘湖',
  coords: [
    [117.10, 32.50],
    [117.18, 32.48],
    [117.20, 32.42],
    [117.14, 32.40],
    [117.08, 32.45],
  ],
}

const JIAOGANG_LAKE: GeoFeature = {
  id: 'jiaogang-lake',
  kind: 'lake',
  name: '焦岗湖',
  coords: [
    [116.40, 32.62],
    [116.47, 32.61],
    [116.49, 32.55],
    [116.42, 32.54],
    [116.38, 32.58],
  ],
}

const BAGONG_MOUNTAIN: GeoFeature = {
  id: 'bagong-mountain',
  kind: 'mountain',
  name: '八公山',
  coords: [
    [116.74, 32.69],
    [116.81, 32.69],
    [116.83, 32.64],
    [116.77, 32.62],
    [116.73, 32.65],
  ],
}

// 寿春（寿县）古城墙——宋代砖城，方形七门，作为古代叠加要素
const SHOUCHUN_WALL: GeoFeature = {
  id: 'shouchun-wall',
  kind: 'wall',
  name: '寿春城墙',
  coords: [
    [116.775, 32.595],
    [116.80, 32.595],
    [116.80, 32.575],
    [116.775, 32.575],
  ],
}

// 1950s 淮南铁路：田家庵向南（运煤干线）
const HUAINAN_RAIL: GeoFeature = {
  id: 'huainan-rail-1950',
  kind: 'rail',
  name: '淮南铁路',
  coords: [
    [117.0, 32.63],
    [117.04, 32.5],
    [117.08, 32.35],
    [117.1, 32.2],
  ],
}

// 现代高铁（商合杭 / 京福经淮南东站）：东西向
const HIGH_SPEED_RAIL: GeoFeature = {
  id: 'hsr-2026',
  kind: 'rail',
  name: '高铁线',
  coords: [
    [116.85, 32.52],
    [116.98, 32.56],
    [117.12, 32.58],
    [117.21, 32.6],
  ],
}

export const HUAINAN: Location = {
  id: 'huainan',
  name: '淮南',
  aliases: ['淮南', '淮南市', '安徽淮南', '寿春', '寿县', '八公山', '田家庵', 'huainan'],
  region: '安徽 · 淮南',
  coord: { lat: 32.6476, lng: 117.0183 },
  cover: '⛰️',
  tagline: '淮水之南，楚都遗韵与煤电之都的千年叠影',
  eras: ['2026', '2000', '1950', '1900', '1800', 'ancient'],
  geo: {
    bbox: HUAINAN_BBOX,
    boundary: HUAINAN_BOUNDARY,
    base: [HUAI_RIVER, WABU_LAKE, GAOTANG_LAKE, JIAOGANG_LAKE, BAGONG_MOUNTAIN],
  },
  records: {
    '2026': {
      era: '2026',
      title: '淮南 · 当代',
      summary:
        '今天的淮南是「中国能源之都」，平圩电厂等大型坑口电厂沿淮河而立，将煤变成送往华东的电。高铁淮南东站接入商合杭通道，安徽理工大学等高校汇聚，城市正从单一煤城转向能源与科教并重。',
      highlights: ['中国能源之都', '高铁淮南东站', '平圩电厂群', '由煤城向科教转型'],
      imageHint: '⚡',
      geoOverlay: {
        features: [HIGH_SPEED_RAIL],
        markers: [
          { id: 'tja', name: '田家庵城区', lng: 117.0, lat: 32.64, kind: 'building' },
          { id: 'pingwei', name: '平圩电厂', lng: 116.98, lat: 32.71, kind: 'building' },
          { id: 'hsr-station', name: '淮南东站', lng: 117.12, lat: 32.58, kind: 'transit' },
          { id: 'aust', name: '安徽理工大学', lng: 117.13, lat: 32.62, kind: 'building' },
        ],
      },
    },
    '1950': {
      era: '1950',
      title: '淮南 · 工矿崛起',
      summary:
        '二十世纪上半叶，舜耕山下的大通、九龙岗煤矿相继开发，1934 年淮南铁路通车，把煤炭运往裕溪口装船。新中国成立后淮南矿务局壮大，淮南由淮河边的集镇一跃成为华东重要的煤炭能源基地，并于 1952 年设市。',
      highlights: ['大通·九龙岗煤矿', '1934 淮南铁路通车', '淮南矿务局', '1952 年设市'],
      imageHint: '⛏️',
      geoOverlay: {
        features: [HUAINAN_RAIL],
        markers: [
          { id: 'datong', name: '大通煤矿', lng: 117.07, lat: 32.62, kind: 'building' },
          { id: 'jiulonggang', name: '九龙岗', lng: 117.02, lat: 32.61, kind: 'building' },
          { id: 'tja-town', name: '田家庵', lng: 117.0, lat: 32.64, kind: 'transit' },
        ],
      },
    },
    '1900': {
      era: '1900',
      title: '淮南 · 清末',
      summary:
        '清末这一带分属寿州与凤台县。淮河南岸的田家庵还只是一个渡口集镇，舟楫往来、商货集散。八公山下的煤苗虽已为人所知，但大规模开采尚未开始，乡野之间一派农耕与漕运景象。',
      highlights: ['分属寿州与凤台', '田家庵尚为渡口集镇', '淮河漕运', '煤矿未大规模开采'],
      imageHint: '⛵',
      geoOverlay: {
        markers: [
          { id: 'shouzhou', name: '寿州古城', lng: 116.785, lat: 32.585, kind: 'landmark' },
          { id: 'fengtai', name: '凤台县城', lng: 116.72, lat: 32.71, kind: 'village' },
          { id: 'tja-ferry', name: '田家庵渡口', lng: 117.0, lat: 32.64, kind: 'transit' },
        ],
      },
    },
    '1800': {
      era: '1800',
      title: '淮南 · 清嘉庆',
      summary:
        '嘉庆年间，寿州古城仍是淮河中游的军事与漕运重镇，宋代砖砌的七门城墙抵御着淮河水患。瓦埠湖、高塘湖滨是连片的圩田，凤台、寿州的米粮经淮河北上南下，文风与农耕并盛。',
      highlights: ['寿州古城为漕运重镇', '宋代七门砖城', '瓦埠湖圩田', '淮河米粮集散'],
      imageHint: '🏯',
      geoOverlay: {
        features: [SHOUCHUN_WALL],
        markers: [
          { id: 'shouzhou-1800', name: '寿州城', lng: 116.785, lat: 32.585, kind: 'landmark' },
          { id: 'fengtai-1800', name: '凤台', lng: 116.72, lat: 32.71, kind: 'village' },
        ],
      },
    },
    ancient: {
      era: 'ancient',
      title: '淮南 · 楚汉',
      summary:
        '公元前 241 年楚国迁都寿春，这里一度是楚国最后的国都。西汉封淮南国，淮南王刘安在此招揽方士编成《淮南子》，相传炼丹时于八公山偶得豆腐，遂为豆腐发源地。公元 383 年淝水之战，东晋以少胜多大败前秦，留下「风声鹤唳」「草木皆兵」的典故。',
      highlights: ['前 241 楚迁都寿春', '淮南王刘安与《淮南子》', '八公山·豆腐发源地', '383 淝水之战'],
      imageHint: '🏛️',
      geoOverlay: {
        features: [SHOUCHUN_WALL],
        markers: [
          { id: 'shouchun', name: '寿春(楚都·淮南国)', lng: 116.785, lat: 32.585, kind: 'landmark' },
          { id: 'bagong', name: '八公山', lng: 116.79, lat: 32.66, kind: 'temple' },
          { id: 'feishui', name: '淝水古战场', lng: 116.83, lat: 32.61, kind: 'landmark' },
        ],
      },
    },
  },
  story: {
    nameOrigin:
      '「淮南」即淮河之南。西汉高祖封英布为淮南王，后又封刘长、刘安，淮南国都于寿春（今寿县）。今日的淮南市于 1952 年因煤设市，名字承袭了这片淮水之南的古老地域。',
    changes:
      '从战国楚国的末代都城寿春，到西汉的淮南国，再到淝水之战的古战场；从清代寿州、凤台的漕运圩田，到近代因煤而兴的淮南铁路与矿区，直至今日的「能源之都」——淮南的每一层叠影都与淮河相连。',
    keyFigures: ['楚考烈王（迁都寿春）', '淮南王刘安（编《淮南子》、八公山豆腐）', '谢安·谢玄（淝水之战晋军统帅）', '苻坚（淝水之战前秦君主）'],
    landmarkEvents: [
      '前 241·楚国迁都寿春',
      '西汉·设淮南国，刘安编《淮南子》、传说八公山始制豆腐',
      '383·淝水之战，东晋大败前秦',
      '1934·淮南铁路通车，矿区崛起；1952 年设淮南市',
    ],
    pastVsPresent:
      '两千多年前，你脚下的寿春是楚国的国都、淮南国的中心，八公山上方士炼丹、淝水之畔刀兵相见；今天同一片淮水之南，已是机组轰鸣的煤电基地与高铁穿行的现代城市。唯有那条淮河，依旧自西向东，把楚都的月色与电厂的灯火一并映在水面。',
  },
  nearby: [
    { id: 'hn-bagong', name: '八公山', distanceM: 6000, era: 'ancient', blurb: '淮南王刘安炼丹之地，相传豆腐由此而生，亦是淝水之战「草木皆兵」的典故所在。', emoji: '⛰️' },
    { id: 'hn-shouxian', name: '寿县古城', distanceM: 22000, era: '1800', blurb: '保存完好的宋代砖城，方形七门，曾为楚都与淮南国都寿春。', emoji: '🏯' },
    { id: 'hn-feishui', name: '淝水古战场', distanceM: 9000, era: 'ancient', blurb: '公元 383 年东晋以八万破前秦八十万，奠定南北朝格局。', emoji: '⚔️' },
    { id: 'hn-datong', name: '大通煤矿遗址', distanceM: 5000, era: '1950', blurb: '近代淮南煤炭工业的起点，记录着城市因煤而兴的岁月。', emoji: '⛏️' },
  ],
}

export default HUAINAN
