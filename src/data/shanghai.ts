import type { GeoFeature, Location } from '../types'
import { SHANGHAI_BBOX, SHANGHAI_BOUNDARY } from './shanghaiBoundary'
import { SHANGHAI_POIS } from './shanghai/pois'
import {
  PRE1843_CHAPTERS,
  CONCESSION_CHAPTERS,
  REPUBLIC_CHAPTERS,
  PRC_CHAPTERS,
  NOW_CHAPTERS,
} from './shanghai/chapters'

// ============================================================================
// 上海南京东路：由旧的通用年代档（2026/1950/1900/1800）改造为真实历史分期。
// 5 档时间轴：当代 / 1949-1990 / 民国 / 开埠租界 / 开埠前
// 旧档迁移：2026→now、1950→republic(主)+prc、1900→concession、1800→pre-1843
// ============================================================================

// 黄浦江：自西南流向东北，于外滩转折后北入长江口（真实走向近似）
const HUANGPU_RIVER: GeoFeature = {
  id: 'huangpu-river',
  kind: 'river',
  name: '黄浦江',
  coords: [
    [121.32, 30.88],
    [121.43, 31.02],
    [121.49, 31.13],
    [121.49, 31.2],
    [121.49, 31.235],
    [121.5, 31.3],
    [121.51, 31.38],
  ],
}

// 苏州河：东西向，于外滩附近汇入黄浦江
const SUZHOU_CREEK: GeoFeature = {
  id: 'suzhou-creek',
  kind: 'river',
  name: '苏州河',
  coords: [
    [121.38, 31.25],
    [121.45, 31.246],
    [121.49, 31.24],
  ],
}

// 老城厢城墙（明嘉靖三十二年筑上海县城，环形，近豫园）
const OLD_CITY_WALL: GeoFeature = {
  id: 'old-city-wall',
  kind: 'wall',
  name: '上海县城',
  coords: [
    [121.487, 31.228],
    [121.496, 31.228],
    [121.498, 31.221],
    [121.49, 31.218],
    [121.483, 31.222],
  ],
}

export const SHANGHAI: Location = {
  id: 'shanghai-nanjing-road',
  name: '上海南京东路',
  aliases: ['南京东路', '上海南京东路', '上海市南京东路', '上海', '南京路', '外滩', 'nanjing road', 'shanghai'],
  region: '上海 · 黄浦',
  coord: { lat: 31.2354, lng: 121.4811 },
  cover: '🏙️',
  tagline: '一条马路，写满中国近代的繁华与风云',
  timeline: [
    { key: 'now', label: '当代', dynasty: '步行街·陆家嘴', yearRange: [1990, 2026], year: 2015, weight: 3 },
    { key: 'prc', label: '1949-1990', dynasty: '国营与百货', yearRange: [1949, 1989], year: 1970, weight: 1 },
    { key: 'republic', label: '民国', dynasty: '四大公司·远东第一街', yearRange: [1912, 1949], year: 1930, weight: 3 },
    { key: 'concession', label: '开埠租界', dynasty: '大马路', yearRange: [1843, 1911], year: 1880, weight: 3 },
    { key: 'pre-1843', label: '开埠前', dynasty: '县城北郊', yearRange: [1074, 1842], year: 1800, weight: 1 },
  ],
  eras: ['now', 'prc', 'republic', 'concession', 'pre-1843'],
  geo: {
    bbox: SHANGHAI_BBOX,
    boundary: SHANGHAI_BOUNDARY,
    base: [HUANGPU_RIVER, SUZHOU_CREEK],
    // 放大档：外滩—南京东路—老城厢一线（POI 集中区）
    zoomBbox: [121.462, 31.215, 121.518, 31.252],
    zoomLabel: '外滩·南京路',
  },
  pois: SHANGHAI_POIS,
  featuredCompare: ['concession', 'now'],
  records: {
    'pre-1843': {
      era: 'pre-1843',
      title: '开埠前 · 上海县城北郊',
      summary:
        '北宋熙宁年间设上海务，元至元二十九年（1292）置上海县，明嘉靖三十二年（1553）为御倭筑起周约九里的城墙。今天南京东路所在之处，那时是出北门三四里外的田陌菜畦；再往东是黄浦江边的芦苇滩，岸上一条纤夫踩出来的窄路，本地人只叫它「黄浦滩」。',
      highlights: ['1292 置上海县', '1553 筑城御倭', '城隍庙与豫园是全城中心', '城北是田陌与芦苇滩'],
      imageHint: '🌾',
      chapters: PRE1843_CHAPTERS,
      geoOverlay: {
        features: [OLD_CITY_WALL],
        poiRefs: ['old-county', 'chenghuang', 'yuyuan', 'bund', 'nanjing-road', 'lujiazui'],
      },
    },
    concession: {
      era: 'concession',
      title: '开埠租界 · 大马路',
      summary:
        '1843 年 11 月上海开埠，两年后划定英租界，此后美、法租界相继设立。江边纤道拓成外滩，洋行与银行沿江排开；一条通往跑马场的「花园弄」在 1865 年租界统一路名时定名南京路，华人却照旧叫它「大马路」。1893 年的江海关钟楼与 1873 年的外白渡桥，一个管税，一个管过江。',
      highlights: ['1843 开埠·1845 划定英租界', '1865 定名南京路，俗称大马路', '1862 跑马场迁今人民广场', '江海关与外白渡桥'],
      imageHint: '🏛️',
      chapters: CONCESSION_CHAPTERS,
      geoOverlay: {
        poiRefs: [
          'nanjing-road',
          'bund',
          'customs-house',
          'hsbc',
          'waibaidu',
          'renmin-square',
          'old-county',
        ],
      },
    },
    republic: {
      era: 'republic',
      title: '民国 · 远东第一街',
      summary:
        '1917 年先施开业，次年永安在街对面开张，1926 年新新、1936 年大新相继落成——四大公司在一里长的街面上隔街较劲，把橱窗、霓虹与营业时间一并推向极致。街东端是江海关的钟声与沙逊大厦的绿色塔顶，沿江二十余家银行被称作「远东华尔街」。1925 年五卅惨案也发生在这条路上。',
      highlights: ['1917-1936 四大公司相继开业', '1908 有轨电车通车', '1925.5.30 五卅惨案', '1927 江海关大楼·1929 沙逊大厦'],
      imageHint: '🚋',
      chapters: REPUBLIC_CHAPTERS,
      geoOverlay: {
        poiRefs: [
          'nanjing-road',
          'sincere',
          'wing-on',
          'dasun',
          'peace-hotel',
          'customs-house',
          'bund',
          'renmin-square',
          'old-county',
        ],
      },
    },
    prc: {
      era: 'prc',
      title: '1949-1990 · 国营百货的年代',
      summary:
        '四大公司改换招牌：大新成了上海市第一百货商店，先施旧址是上海时装商店，永安几度更名后挂出华联商厦。1951 年跑马厅收回，北半辟人民公园、南半辟人民广场。外滩的银行大楼多改作机关办公，江边防汛墙成了著名的「情人墙」。1963 年市区有轨电车全部停驶。',
      highlights: ['1953 大新改中百一店', '1951 跑马厅辟为人民广场', '外滩大楼改机关办公', '1963 有轨电车停驶'],
      imageHint: '🏪',
      chapters: PRC_CHAPTERS,
      geoOverlay: {
        poiRefs: ['dasun', 'sincere', 'wing-on', 'nanjing-road', 'renmin-square', 'hsbc', 'peace-hotel', 'bund'],
      },
    },
    now: {
      era: 'now',
      title: '当代 · 步行街与隔江对望',
      summary:
        '1999 年 9 月南京东路河南中路至西藏中路段改建为步行街，2020 年东段延伸直抵外滩。江对岸，1990 年宣布开发的陆家嘴在二十余年间长出东方明珠、金茂、环球金融中心与上海中心；外滩则做了减法——车流沉入地下，江边腾出连续的观景平台。',
      highlights: ['1999 步行街开街', '2020 东延接外滩', '陆家嘴天际线成形', '外滩综合改造·外白渡桥大修'],
      imageHint: '🌃',
      chapters: NOW_CHAPTERS,
      geoOverlay: {
        poiRefs: [
          'nanjing-road',
          'bund',
          'lujiazui',
          'renmin-square',
          'peace-hotel',
          'waibaidu',
          'yuyuan',
        ],
      },
    },
  },
  story: {
    nameOrigin:
      '南京路得名于 1865 年：租界工部局以中国省名命名南北向道路、以城市名命名东西向道路，遂将这条原名「花园弄」（派克弄）的跑马大道定名南京路。华人则按由北往南的次序叫它「大马路」，九江路、汉口路、福州路顺次为二、三、四马路。1945 年后以西藏路为界分为南京东路与南京西路。',
    changes:
      '从开埠前的城北田陌与芦苇滩，到英租界的「大马路」，再到民国四大公司争辉、国营百货的凭票年代，直至今日的步行街与隔江的陆家嘴——南京东路浓缩了上海从县城北郊到国际都会的全部过程。',
    keyFigures: [
      '潘允端（1559 年始建豫园）',
      '马应彪（1917 年创办先施公司）',
      '郭乐、郭泉（1918 年创办永安公司）',
      '维克多·沙逊（1929 年建沙逊大厦）',
    ],
    landmarkEvents: [
      '1292·置上海县',
      '1553·筑城墙御倭',
      '1843·上海开埠，1845 划定英租界',
      '1865·「花园弄」定名南京路',
      '1917-1936·四大公司相继开业',
      '1925·五卅惨案',
      '1951·跑马厅辟为人民广场',
      '1990·宣布开发浦东',
      '1999·南京东路改建为步行街',
    ],
    pastVsPresent:
      '两百年前这里是上海县城北门外的田埂，往东是黄浦江边的芦苇滩，纤夫拉着船逆流而上；一百年前洋行林立、电车叮当，四大公司的霓虹照亮整条街；今天则是花岗岩铺面的步行街，尽头是江，江对岸是陆家嘴。唯一不变的是黄浦江——只是江岸不断被填直，对岸长出了一片森林。',
  },
  nearby: [
    { id: 's-bund', name: '外滩', distanceM: 600, era: 'concession', blurb: '万国建筑博览群，黄浦江畔的近代金融心脏。', emoji: '🏛️' },
    { id: 's-chenghuang', name: '城隍庙', distanceM: 1800, era: 'pre-1843', blurb: '明永乐年间改建，老上海的信仰与市井中心。', emoji: '🛕' },
    { id: 's-yuyuan', name: '豫园', distanceM: 1900, era: 'pre-1843', blurb: '1559 年潘允端始建的江南名园，庙、园、市连成一片。', emoji: '🏯' },
    { id: 's-peace', name: '和平饭店', distanceM: 700, era: 'republic', blurb: '原沙逊大厦，1929 年落成的装饰艺术传奇。', emoji: '🏨' },
  ],
}

export default SHANGHAI
