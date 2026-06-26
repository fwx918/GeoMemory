import type { GeoFeature, Location } from '../types'
import { SHANGHAI_BBOX, SHANGHAI_BOUNDARY } from './shanghaiBoundary'

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

// 老城厢城墙（明代上海县城，环形，近豫园）
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
  eras: ['2026', '1950', '1900', '1800'],
  geo: {
    bbox: SHANGHAI_BBOX,
    boundary: SHANGHAI_BOUNDARY,
    base: [HUANGPU_RIVER, SUZHOU_CREEK],
  },
  records: {
    '2026': {
      era: '2026',
      title: '南京东路 · 当代',
      summary:
        '今天的南京东路是中国最繁忙的商业步行街之一，霓虹璀璨、人流如潮。东端连接外滩万国建筑群，黄浦江对岸是陆家嘴的摩天楼群，新旧上海在此隔江相望。',
      highlights: ['中华商业第一街', '全程步行街', '外滩万国建筑群', '隔江望陆家嘴'],
      imageHint: '🌃',
      geoOverlay: {
        markers: [
          { id: 'pedestrian', name: '南京东路步行街', lng: 121.479, lat: 31.235, kind: 'transit' },
          { id: 'bund', name: '外滩', lng: 121.49, lat: 31.24, kind: 'building' },
          { id: 'lujiazui', name: '陆家嘴', lng: 121.505, lat: 31.24, kind: 'building' },
          { id: 'renmin', name: '人民广场', lng: 121.474, lat: 31.233, kind: 'transit' },
        ],
      },
    },
    '1950': {
      era: '1950',
      title: '南京东路 · 二十世纪中叶',
      summary:
        '上海解放初期，南京路上的四大公司（永安、先施、新新、大新）依旧是远东最摩登的百货橱窗。有轨电车叮叮驶过，霓虹与旗袍交织出旧上海最后的繁华余韵。',
      highlights: ['四大百货公司', '有轨电车', '远东时尚中心', '霓虹与旗袍'],
      imageHint: '🚋',
      geoOverlay: {
        markers: [
          { id: 'wing-on', name: '永安公司', lng: 121.481, lat: 31.236, kind: 'building' },
          { id: 'sincere', name: '先施公司', lng: 121.478, lat: 31.234, kind: 'building' },
          { id: 'bund-1950', name: '外滩', lng: 121.49, lat: 31.24, kind: 'building' },
        ],
      },
    },
    '1900': {
      era: '1900',
      title: '南京东路 · 清末租界',
      summary:
        '彼时这里被称作「大马路」，是英租界最繁华的商业干道。沿黄浦江的外滩耸立起一座座银行与洋行，黄包车穿梭其间，南京路成为东西方文明碰撞的最前沿。',
      highlights: ['俗称「大马路」', '英租界核心', '外滩洋行林立', '黄包车与马车'],
      imageHint: '🏛️',
      geoOverlay: {
        markers: [
          { id: 'big-road', name: '大马路', lng: 121.479, lat: 31.235, kind: 'transit' },
          { id: 'banks', name: '外滩洋行', lng: 121.49, lat: 31.238, kind: 'building' },
          { id: 'customs', name: '江海关', lng: 121.49, lat: 31.233, kind: 'landmark' },
        ],
      },
    },
    '1800': {
      era: '1800',
      title: '南京东路 · 开埠之前',
      summary:
        '1843 年开埠之前，这里还是上海县城北郊的滩涂与农田，名为「派克弄」附近的乡野。黄浦江畔芦苇丛生，谁也想不到几十年后这里会成为远东第一商街。',
      highlights: ['县城北郊滩涂', '农田与芦苇荡', '尚未开埠', '黄浦江岸线靠西'],
      imageHint: '🌾',
      geoOverlay: {
        features: [OLD_CITY_WALL],
        markers: [
          { id: 'county', name: '上海县城', lng: 121.49, lat: 31.223, kind: 'village' },
          { id: 'marsh', name: '城北滩涂', lng: 121.485, lat: 31.238, kind: 'water' },
        ],
      },
    },
  },
  story: {
    nameOrigin:
      '南京路得名于 1865 年，英租界当局以中国城市命名道路，遂将这条「大马路」定名为南京路。1945 年后分为南京东路与南京西路，东路即昔日最繁华的一段。',
    changes:
      '从开埠前的城北滩涂，到英租界的「大马路」，再到民国四大百货争辉，直至今日的步行街——南京东路浓缩了上海从渔村到国际都会的全部传奇。',
    keyFigures: ['郭乐（永安公司创办人）', '马应彪（先施公司创办人）', '沙逊（外滩地产大亨）'],
    landmarkEvents: [
      '1843·上海开埠，划定英租界',
      '1865·「大马路」正式定名南京路',
      '1917-1936·四大百货公司相继开业',
      '1999·南京东路改建为步行街',
    ],
    pastVsPresent:
      '两百年前这里是黄浦江边的芦苇滩涂，渔舟唱晚；一百年前洋行林立、黄包车穿梭；今天则是霓虹彻夜的步行街。唯一不变的是黄浦江——只是江岸不断东移，对岸长出了陆家嘴的森林。',
  },
  nearby: [
    { id: 's-bund', name: '外滩', distanceM: 600, era: '1900', blurb: '万国建筑博览群，黄浦江畔的近代金融心脏。', emoji: '🏛️' },
    { id: 's-chenghuang', name: '城隍庙', distanceM: 1800, era: 'ancient', blurb: '明代始建，老上海的信仰与市井中心。', emoji: '🛕' },
    { id: 's-yuyuan', name: '豫园', distanceM: 1900, era: 'ancient', blurb: '明代私家园林，江南古典造园的代表作。', emoji: '🏯' },
    { id: 's-peace', name: '和平饭店', distanceM: 700, era: '1950', blurb: '原沙逊大厦，Art Deco 风格的外滩传奇。', emoji: '🏨' },
  ],
}

export default SHANGHAI
