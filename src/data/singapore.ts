import type { GeoFeature, Location } from '../types'
import { SINGAPORE_BBOX, SINGAPORE_BOUNDARY } from './singaporeBoundary'
import { SINGAPORE_POIS } from './singapore/pois'
import {
  KAMPONG_CHAPTERS,
  COLONIAL_CHAPTERS,
  SHOWA_CHAPTERS,
  NATION_CHAPTERS,
  NOW_CHAPTERS,
} from './singapore/chapters'

// ============================================================================
// 新加坡丹戎巴葛：由旧的通用年代档（2026/1950/1900/1800）改造为真实历史分期。
// 5 档时间轴：当代 / 建国后 / 昭南时期 / 海峡殖民地 / 开埠前后
// 旧档迁移：2026→now、1950→showa(日据·战后)+nation、1900→colonial、1800→kampong
// HISTORIC_COAST 只挂在 now 以外的各档：当代不给，两相对照即见填海造地。
// ============================================================================

// 新加坡河（流入滨海湾），现今水系
const SINGAPORE_RIVER: GeoFeature = {
  id: 'singapore-river',
  kind: 'river',
  name: '新加坡河',
  coords: [
    [103.84, 1.292],
    [103.848, 1.288],
    [103.853, 1.286],
  ],
}

// 填海前的历史海岸线（位于今填海岸线以北）。1970 年代大规模填海之前
// 各时代都沿这条线；当代档则已推到今日的主岛边界，二者对照即见填海造地。
const HISTORIC_COAST: GeoFeature = {
  id: 'historic-coast',
  kind: 'coastline',
  name: '填海前海岸线',
  coords: [
    [103.81, 1.284],
    [103.835, 1.282],
    [103.86, 1.283],
    [103.885, 1.286],
  ],
}

export const SINGAPORE: Location = {
  id: 'singapore-tanjong-pagar',
  name: '新加坡丹戎巴葛',
  aliases: ['丹戎巴葛', '新加坡丹戎巴葛', '新加坡', 'tanjong pagar', 'singapore', '直落亚逸'],
  region: '新加坡 · 中央商务区',
  coord: { lat: 1.2766, lng: 103.8456 },
  cover: '🌆',
  tagline: '从渔村到摩天 CBD，一寸寸向海要来的土地',
  timeline: [
    { key: 'now', label: '当代', dynasty: 'CBD·填海之城', yearRange: [1990, 2026], year: 2015, weight: 3 },
    { key: 'nation', label: '建国后', dynasty: '1965 独立·组屋与港口', yearRange: [1965, 1989], year: 1975, weight: 2 },
    { key: 'showa', label: '昭南时期', dynasty: '1942-1945 日据', yearRange: [1942, 1964], year: 1943, weight: 2 },
    { key: 'colonial', label: '海峡殖民地', dynasty: '码头与苦力', yearRange: [1826, 1941], year: 1900, weight: 3 },
    { key: 'kampong', label: '开埠前后', dynasty: '渔村·1819 莱佛士登陆', yearRange: [1300, 1825], year: 1810, weight: 3 },
  ],
  eras: ['now', 'nation', 'showa', 'colonial', 'kampong'],
  geo: {
    bbox: SINGAPORE_BBOX,
    boundary: SINGAPORE_BOUNDARY,
    base: [SINGAPORE_RIVER],
    // 放大档：丹戎巴葛—牛车水—新加坡河—滨海湾（POI 集中区）
    zoomBbox: [103.824, 1.262, 103.868, 1.3],
    zoomLabel: '市中心',
  },
  pois: SINGAPORE_POIS,
  featuredCompare: ['kampong', 'now'],
  records: {
    kampong: {
      era: 'kampong',
      title: '开埠前后 · 插桩的海角',
      summary:
        '十四世纪的淡马锡曾在福康宁山下留下一座城的痕迹，《岛夷志略》记作「单马锡」，《马来纪年》则讲了一个关于狮子的故事。此后数百年，这里只是柔佛属下的渔村与甘蜜园。1819 年 1 月末莱佛士在新加坡河口登岸，2 月与天猛公及苏丹签约设商馆，宣布自由港——五年之内，人口从千余涨到近万。',
      highlights: ['14 世纪淡马锡故城', 'Tanjong Pagar =「插桩的海角」', '1819 莱佛士登陆·自由港', '1824 英荷条约·全岛割让'],
      imageHint: '🎣',
      chapters: KAMPONG_CHAPTERS,
      geoOverlay: {
        features: [HISTORIC_COAST],
        poiRefs: ['tanjong-pagar', 'fort-canning', 'raffles-landing', 'telok-ayer', 'keppel-harbour', 'marina-bay'],
      },
    },
    colonial: {
      era: 'colonial',
      title: '海峡殖民地 · 码头与苦力',
      summary:
        '1822 年的杰克逊规划把全城按族群分片划定，1826 年新加坡与槟城、马六甲合组海峡殖民地。1864 年丹戎巴葛码头公司成立，1869 年苏伊士运河通航，蒸汽轮船在此加煤补给，深水港区取代河口成为主角。华人新客住进牛车水的店屋，在码头扛麻包；直落亚逸街的天福宫当年庙门正对着海。',
      highlights: ['1822 市镇规划·1826 海峡殖民地', '1864 丹戎巴葛码头公司', '1869 苏伊士运河通航', '1932 丹戎巴葛火车站启用'],
      imageHint: '⚓',
      chapters: COLONIAL_CHAPTERS,
      geoOverlay: {
        features: [HISTORIC_COAST],
        poiRefs: [
          'tanjong-pagar',
          'keppel-harbour',
          'tanjong-pagar-station',
          'chinatown',
          'telok-ayer',
          'thian-hock-keng',
          'duxton-shophouse',
          'clifford-pier',
          'raffles-place',
          'clarke-quay',
        ],
      },
    },
    showa: {
      era: 'showa',
      title: '昭南时期 · 1942-1945 与战后重建',
      summary:
        '1941 年 12 月日军自马来半岛北部登陆南下，1942 年 2 月 15 日守军在福康宁山腹的指挥所决定投降，新加坡被更名为「昭南岛」，进入三年半的占领期：军政管理、物资配给、军用票流通。1945 年 9 月 12 日日方在市政厅签署投降文书，此后是一段修修补补的岁月——码头修复、火车复驶、工潮与政治在店屋楼上生长。',
      highlights: ['1942.2.15 沦陷·更名昭南', '军政管理与配给制', '1945.9.12 日方签署投降', '1946 新加坡单独成为直辖殖民地'],
      imageHint: '🕯️',
      chapters: SHOWA_CHAPTERS,
      geoOverlay: {
        features: [HISTORIC_COAST],
        poiRefs: [
          'fort-canning',
          'tanjong-pagar-station',
          'keppel-harbour',
          'tanjong-pagar',
          'chinatown',
          'thian-hock-keng',
          'raffles-place',
          'duxton-shophouse',
        ],
      },
    },
    nation: {
      era: 'nation',
      title: '建国后 · 集装箱、组屋与地铁工地',
      summary:
        '1965 年独立后，港口是唯一能立刻兑现的资产。1972 年丹戎巴葛第一个集装箱泊位启用，是东南亚最早的集装箱码头；同一时期自海中吹填造地，滨海南一带从海图上「长」了出来。牛车水的住户迁入组屋，1977 年起「清河计划」把舯舽船请离新加坡河，1983 年地铁动工——1989 年，店屋终于等来了保育令。',
      highlights: ['1965.8.9 独立', '1972 东南亚首个集装箱码头', '1977 清河计划·组屋搬迁', '1987 地铁通车·1989 划定保育区'],
      imageHint: '🏗️',
      chapters: NATION_CHAPTERS,
      geoOverlay: {
        features: [HISTORIC_COAST],
        poiRefs: [
          'tanjong-pagar',
          'keppel-harbour',
          'marina-bay',
          'chinatown',
          'duxton-shophouse',
          'clarke-quay',
          'tanjong-pagar-mrt',
          'tanjong-pagar-station',
          'clifford-pier',
        ],
      },
    },
    now: {
      era: 'now',
      title: '当代 · CBD 与填海之城',
      summary:
        '把 1819 年的海图与今天的地图叠在一起，多出来的部分基本都在南岸——丹戎巴葛、滨海湾这一大片寸土寸金的地方，两百年前都是水。2008 年滨海堤坝把海湾封成淡水湖，2010 年金沙开业；2011 年最后一班火车驶离丹戎巴葛车站；码头功能陆续西迁，原址纳入「大南部滨水区」规划，保育店屋与摩天楼并立。',
      highlights: ['填海使国土增至七百余平方公里', '2008 滨海堤坝·2010 金沙', '2011 末班车·车站列为国家古迹', '大南部滨水区规划'],
      imageHint: '🏢',
      chapters: NOW_CHAPTERS,
      geoOverlay: {
        poiRefs: [
          'tanjong-pagar',
          'tanjong-pagar-mrt',
          'tanjong-pagar-station',
          'duxton-shophouse',
          'raffles-place',
          'marina-bay',
          'clifford-pier',
          'clarke-quay',
          'chinatown',
          'telok-ayer',
        ],
      },
    },
  },
  story: {
    nameOrigin:
      '「Tanjong Pagar」在马来语中意为「插了木桩的海角」（tanjong=海角，pagar=栅栏/木桩）：一说源于渔民插竹木围成鱼栅（kelong）捕鱼的旧俗，一说与沿岸立栅防海盗有关，两说并存而无定论。岛名 Singapura（狮城）则出自《马来纪年》里王子见兽命名的传说——只是这座岛上从来没有狮子。',
    changes:
      '从十四世纪淡马锡的故城，到露兜树丛生的渔村海角；1819 年开埠成自由港，1864 年崛起为深水码头，1942 年更名昭南，战后重建为港口与铁路枢纽，1972 年迎来东南亚第一座集装箱码头，直至今日填海而成的中央商务区——丹戎巴葛的每一步扩张，几乎都是向大海要来的土地。',
    keyFigures: [
      '汪大渊（1330 年代记「单马锡」）',
      '莱佛士（1819 年开埠，1822 年规划市镇）',
      '天猛公阿都拉曼（1819 年缔约的本地统治者）',
      '陈笃生（华人慈善先驱，1844 年创办平民医院）',
    ],
    landmarkEvents: [
      '14 世纪·淡马锡故城（福康宁山考古）',
      '1819·莱佛士登陆，宣布自由港',
      '1826·海峡殖民地成立',
      '1864·丹戎巴葛码头公司成立',
      '1932·丹戎巴葛火车站落成',
      '1942·沦陷，更名昭南岛',
      '1965·新加坡独立',
      '1972·东南亚首个集装箱码头启用',
      '2011·最后一班火车驶离丹戎巴葛',
    ],
    pastVsPresent:
      '两百年前你站立的地方很可能还在海里——那时海岸线深抵今日的直落亚逸街，红树林环着渔村，渔民在浅水里插桩围鱼；今天同一个坐标是摩天楼林立的 CBD，脚下的土多半是从别处运来或从海中吹上来的。老火车站与修复过的店屋留在原地，静静记录着海岸线远去的轨迹。',
  },
  nearby: [
    { id: 'sg-chinatown', name: '牛车水', distanceM: 800, era: 'colonial', blurb: '华人聚居的唐人街，店屋与庙宇并存，名字来自牛车载水。', emoji: '🏮' },
    { id: 'sg-marina', name: '滨海湾', distanceM: 1500, era: 'now', blurb: '完全填海造出的新地标，2008 年堤坝合龙后成了淡水湖。', emoji: '🌊' },
    { id: 'sg-station', name: '旧丹戎巴葛火车站', distanceM: 400, era: 'colonial', blurb: '1932 年的装饰艺术车站，马来亚铁路南端终点，2011 年停用。', emoji: '🚉' },
    { id: 'sg-redlight', name: '红灯码头', distanceM: 1200, era: 'colonial', blurb: 'Clifford Pier，1933 年启用，昔日旅客登岸新加坡的第一站。', emoji: '⚓' },
  ],
}

export default SINGAPORE
