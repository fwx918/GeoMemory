import type { GeoFeature, Location } from '../types'
import { SINGAPORE_BBOX, SINGAPORE_BOUNDARY } from './singaporeBoundary'

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
// 各时代都沿这条线；2026 年则已推到今日的主岛边界，二者对照即见填海造地。
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
  eras: ['2026', '1950', '1900', '1800'],
  geo: {
    bbox: SINGAPORE_BBOX,
    boundary: SINGAPORE_BOUNDARY,
    base: [SINGAPORE_RIVER],
  },
  records: {
    '2026': {
      era: '2026',
      title: '丹戎巴葛 · 当代',
      summary:
        '今天的丹戎巴葛是新加坡中央商务区的一部分，摩天楼鳞次栉比，地铁四通八达。昔日的海岸线早已被大规模填海推向远方，老火车站与店屋则被精心保留，新旧并立。',
      highlights: ['中央商务区 CBD', '大规模填海', '地铁枢纽', '保育店屋与老车站'],
      imageHint: '🏢',
      geoOverlay: {
        markers: [
          { id: 'cbd', name: 'CBD 摩天楼', lng: 103.85, lat: 1.279, kind: 'building' },
          { id: 'station', name: '丹戎巴葛地铁站', lng: 103.843, lat: 1.276, kind: 'transit' },
          { id: 'marina', name: '滨海湾(填海)', lng: 103.86, lat: 1.283, kind: 'building' },
        ],
      },
    },
    '1950': {
      era: '1950',
      title: '丹戎巴葛 · 二十世纪中叶',
      summary:
        '战后的丹戎巴葛是繁忙的港口与货运区，码头工人聚居于此。1932 年落成的丹戎巴葛火车站是马来亚铁路的南端终点，店屋鳞次，商贸往来不绝。',
      highlights: ['繁忙货运港口', '马来亚铁路终点站', '码头工人社区', '南洋店屋'],
      imageHint: '🚂',
      geoOverlay: {
        features: [HISTORIC_COAST],
        markers: [
          { id: 'station-1950', name: '丹戎巴葛火车站', lng: 103.837, lat: 1.273, kind: 'transit' },
          { id: 'wharf', name: '货运码头', lng: 103.846, lat: 1.27, kind: 'transit' },
          { id: 'shophouse', name: '店屋区', lng: 103.844, lat: 1.281, kind: 'building' },
        ],
      },
    },
    '1900': {
      era: '1900',
      title: '丹戎巴葛 · 殖民港口',
      summary:
        '十九世纪末，丹戎巴葛因深水良港而崛起为东南亚航运枢纽。1864 年丹戎巴葛码头公司成立，蒸汽轮船在此补给加煤，华人苦力与各国商旅汇聚，奠定了新加坡转口贸易的根基。',
      highlights: ['东南亚航运枢纽', '丹戎巴葛码头公司', '蒸汽轮船加煤站', '华人苦力聚居'],
      imageHint: '⚓',
      geoOverlay: {
        features: [HISTORIC_COAST],
        markers: [
          { id: 'docks', name: '丹戎巴葛码头', lng: 103.843, lat: 1.272, kind: 'transit' },
          { id: 'kampong', name: '华人甘榜(牛车水)', lng: 103.844, lat: 1.283, kind: 'village' },
        ],
      },
    },
    '1800': {
      era: '1800',
      title: '丹戎巴葛 · 开埠之前',
      summary:
        '在 1819 年莱佛士登陆之前，丹戎巴葛是一片长满露兜树的海岬。马来语「Tanjong Pagar」意为「插桩的海角」，相传渔民在此插竹桩围捕鱼群，沿岸是宁静的渔村与红树林。',
      highlights: ['马来语「插桩海角」', '渔村与红树林', '原始海岸线靠内陆', '尚未开埠'],
      imageHint: '🎣',
      geoOverlay: {
        features: [HISTORIC_COAST],
        markers: [
          { id: 'cape', name: '插桩海角', lng: 103.845, lat: 1.279, kind: 'water' },
          { id: 'fishing', name: '渔村', lng: 103.836, lat: 1.285, kind: 'village' },
          { id: 'mangrove', name: '红树林', lng: 103.86, lat: 1.286, kind: 'water' },
        ],
      },
    },
  },
  story: {
    nameOrigin:
      '「Tanjong Pagar」在马来语中意为「插了木桩的海角」（tanjong=海角，pagar=围栏/桩），相传源于当地渔民插竹桩围捕鱼群的传统，也有说法与防御海盗的栅栏有关。',
    changes:
      '从露兜树丛生的渔村海岬，到 1860 年代崛起的深水码头，再到战后港口与铁路枢纽，直至今日填海而成的中央商务区——丹戎巴葛的每一步扩张，几乎都是向大海要来的土地。',
    keyFigures: ['莱佛士（开埠者）', '陈笃生（华人慈善先驱）', '丹戎巴葛码头公司董事们'],
    landmarkEvents: [
      '1819·莱佛士登陆新加坡',
      '1864·丹戎巴葛码头公司成立',
      '1932·丹戎巴葛火车站落成',
      '1970s起·大规模填海拓展 CBD',
    ],
    pastVsPresent:
      '两百年前你站立的地方很可能还在海里——那时海岸线深入内陆，红树林环绕渔村；今天同一个坐标已是摩天楼林立的 CBD。这片土地是几代人一寸寸向海争来的，老火车站静静记录着海岸线远去的轨迹。',
  },
  nearby: [
    { id: 'sg-chinatown', name: '牛车水', distanceM: 800, era: '1900', blurb: '新加坡华人聚居的唐人街，店屋与庙宇并存。', emoji: '🏮' },
    { id: 'sg-marina', name: '滨海湾', distanceM: 1500, era: '2026', blurb: '完全填海造出的新地标，金沙与花园在海上崛起。', emoji: '🌊' },
    { id: 'sg-station', name: '旧丹戎巴葛火车站', distanceM: 400, era: '1950', blurb: '1932 年的装饰艺术车站，马来亚铁路南端终点。', emoji: '🚉' },
    { id: 'sg-redlight', name: '红灯码头', distanceM: 1200, era: '1900', blurb: 'Clifford Pier，昔日旅客登岸新加坡的第一站。', emoji: '⚓' },
  ],
}

export default SINGAPORE
