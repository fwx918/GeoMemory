import type { GeoFeature, Location } from '../types'

// 西湖以湖体为主角：用真实经纬度勾勒湖岸、苏堤/白堤、钱塘江与西山。
// bbox 覆盖西湖风景区 + 东侧城区 + 东南钱塘江。
const BBOX: [number, number, number, number] = [120.105, 30.19, 120.19, 30.278]

// 西湖风景区一带的陆地范围（作为底图“陆地”）
const BOUNDARY: [number, number][] = [
  [120.108, 30.275],
  [120.14, 30.277],
  [120.184, 30.274],
  [120.188, 30.24],
  [120.185, 30.205],
  [120.16, 30.193],
  [120.13, 30.195],
  [120.11, 30.21],
  [120.106, 30.245],
]

// 西湖真实湖体轮廓（近似）
const WEST_LAKE: GeoFeature = {
  id: 'west-lake',
  kind: 'lake',
  name: '西湖',
  coords: [
    [120.15, 30.26],
    [120.155, 30.252],
    [120.156, 30.245],
    [120.152, 30.238],
    [120.148, 30.231],
    [120.142, 30.229],
    [120.137, 30.231],
    [120.132, 30.236],
    [120.13, 30.244],
    [120.131, 30.252],
    [120.137, 30.259],
    [120.144, 30.261],
  ],
}

// 钱塘江（西湖东南，自西向东）
const QIANTANG_RIVER: GeoFeature = {
  id: 'qiantang-river',
  kind: 'river',
  name: '钱塘江',
  coords: [
    [120.118, 30.206],
    [120.14, 30.199],
    [120.165, 30.196],
    [120.19, 30.199],
  ],
}

// 西山丘陵（西湖以西）
const WEST_HILLS: GeoFeature = {
  id: 'west-hills',
  kind: 'mountain',
  name: '西山',
  coords: [
    [120.108, 30.26],
    [120.122, 30.258],
    [120.125, 30.24],
    [120.115, 30.228],
    [120.107, 30.238],
  ],
}

// 苏堤（南北纵贯湖面）
const SU_CAUSEWAY: GeoFeature = {
  id: 'su-causeway',
  kind: 'road',
  name: '苏堤',
  coords: [
    [120.14, 30.259],
    [120.139, 30.246],
    [120.138, 30.232],
  ],
}

// 白堤（北部东西向）
const BAI_CAUSEWAY: GeoFeature = {
  id: 'bai-causeway',
  kind: 'road',
  name: '白堤',
  coords: [
    [120.15, 30.26],
    [120.146, 30.2595],
    [120.142, 30.259],
  ],
}

// 古代潟湖：与钱塘江相连的水道
const ANCIENT_LAGOON: GeoFeature = {
  id: 'ancient-lagoon',
  kind: 'river',
  name: '古潟湖水道',
  coords: [
    [120.142, 30.229],
    [120.14, 30.218],
    [120.138, 30.206],
  ],
}

export const HANGZHOU: Location = {
  id: 'hangzhou-west-lake',
  name: '杭州西湖',
  aliases: ['西湖', '杭州西湖', '杭州市西湖区龙井路', '西湖区', '龙井路', '杭州', 'west lake', 'hangzhou'],
  region: '浙江 · 杭州',
  coord: { lat: 30.2469, lng: 120.1494 },
  cover: '🏞️',
  tagline: '一池碧水，照见千年文人风骨',
  eras: ['2026', '1900', '1800', 'ancient'],
  geo: {
    bbox: BBOX,
    boundary: BOUNDARY,
    base: [WEST_LAKE, QIANTANG_RIVER, WEST_HILLS],
  },
  records: {
    '2026': {
      era: '2026',
      title: '西湖 · 当代',
      summary:
        '今天的西湖是免费开放的世界文化遗产景区，环湖地铁与绿道串联起断桥、苏堤与雷峰塔。每到夜晚，音乐喷泉与灯光秀映在湖面，游人如织。',
      highlights: ['世界文化遗产', '环湖免费开放', '地铁直达湖滨', '一年四季客流不息'],
      imageHint: '🚇',
      geoOverlay: {
        features: [SU_CAUSEWAY, BAI_CAUSEWAY],
        markers: [
          { id: 'broken-bridge', name: '断桥', lng: 120.15, lat: 30.26, kind: 'landmark' },
          { id: 'leifeng', name: '雷峰塔', lng: 120.148, lat: 30.231, kind: 'landmark' },
          { id: 'baochu', name: '保俶塔', lng: 120.146, lat: 30.263, kind: 'landmark' },
          { id: 'metro', name: '龙翔桥地铁站', lng: 120.158, lat: 30.252, kind: 'transit' },
        ],
      },
    },
    '1900': {
      era: '1900',
      title: '西湖 · 清末',
      summary:
        '清末的西湖周边多为农田、茶园与寺庙。雷峰塔已显倾颓，湖岸尚无环湖马路，文人雅士乘乌篷船游湖，沿岸是香市与茶肆。',
      highlights: ['雷峰塔残破', '环湖皆农田茶园', '乌篷船游湖', '龙井茶初具盛名'],
      imageHint: '⛵',
      geoOverlay: {
        features: [SU_CAUSEWAY, BAI_CAUSEWAY],
        markers: [
          { id: 'leifeng-old', name: '雷峰塔(残)', lng: 120.148, lat: 30.231, kind: 'landmark' },
          { id: 'tea', name: '龙井茶园', lng: 120.118, lat: 30.232, kind: 'village' },
          { id: 'temple', name: '净慈寺', lng: 120.146, lat: 30.233, kind: 'temple' },
        ],
      },
    },
    '1800': {
      era: '1800',
      title: '西湖 · 清嘉庆',
      summary:
        '嘉庆年间，西湖延续着「西湖十景」的格局。苏堤春晓、断桥残雪皆为文人题咏的对象。湖中画舫往来，岸边香客云集，雷峰塔仍巍然矗立。',
      highlights: ['西湖十景成型', '雷峰塔完整', '画舫游湖之风极盛', '香市繁荣'],
      imageHint: '🛕',
      geoOverlay: {
        features: [SU_CAUSEWAY, BAI_CAUSEWAY],
        markers: [
          { id: 'leifeng-full', name: '雷峰塔', lng: 120.148, lat: 30.231, kind: 'landmark' },
          { id: 'su', name: '苏堤', lng: 120.139, lat: 30.246, kind: 'water' },
          { id: 'bai', name: '白堤', lng: 120.145, lat: 30.2595, kind: 'water' },
        ],
      },
    },
    ancient: {
      era: 'ancient',
      title: '西湖 · 唐宋',
      summary:
        '唐代白居易、北宋苏轼先后任职杭州，疏浚西湖、筑堤为路，遂有「白堤」「苏堤」。彼时西湖本是与钱塘江相连的浅海潟湖，经历代治理才成为今日的城中名湖。',
      highlights: ['本为海湾潟湖', '白居易筑白堤', '苏轼筑苏堤', '「淡妆浓抹总相宜」'],
      imageHint: '🖌️',
      geoOverlay: {
        features: [ANCIENT_LAGOON],
        markers: [
          { id: 'su-ancient', name: '苏轼治湖', lng: 120.139, lat: 30.246, kind: 'water' },
          { id: 'bai-ancient', name: '白居易筑堤', lng: 120.146, lat: 30.259, kind: 'water' },
          { id: 'lagoon', name: '古潟湖', lng: 120.14, lat: 30.214, kind: 'water' },
        ],
      },
    },
  },
  story: {
    nameOrigin:
      '西湖古称「武林水」「钱塘湖」，因位于杭州城西而俗称西湖。它原是与钱塘江相通的海湾，泥沙淤积后形成潟湖，再经历代疏浚，方成今日城中之湖。',
    changes:
      '从唐代白居易疏浚、北宋苏轼筑堤，到南宋成为帝都临安的御苑，再到明清「西湖十景」定型，直至当代列入世界文化遗产并免费开放——西湖始终是杭州的灵魂。',
    keyFigures: ['白居易（筑白堤）', '苏轼（筑苏堤）', '林逋（梅妻鹤子）', '岳飞（葬于栖霞岭）'],
    landmarkEvents: [
      '唐·白居易疏浚西湖、修筑堤坝',
      '北宋·苏轼任杭州知州，浚湖筑苏堤',
      '南宋·定都临安，西湖成为皇家苑囿',
      '2011·西湖文化景观列入世界遗产',
    ],
    pastVsPresent:
      '千年前你需乘乌篷船、付船资才能游湖，雷峰塔下香客摩肩；今天的你刷地铁卡即可抵达湖滨，沿绿道骑行环湖，夜里还能看灯光秀——但脚下的苏堤，仍是九百年前苏轼留下的那条。',
  },
  nearby: [
    { id: 'n-leifeng', name: '雷峰塔', distanceM: 1200, era: 'ancient', blurb: '《白蛇传》中镇压白娘子之塔，1924 年倒塌，2002 年重建。', emoji: '🗼' },
    { id: 'n-lingyin', name: '灵隐寺', distanceM: 3400, era: 'ancient', blurb: '东晋始建的千年古刹，飞来峰造像静默千年。', emoji: '🛕' },
    { id: 'n-longjing', name: '龙井村', distanceM: 4200, era: '1900', blurb: '龙井茶原产地，乾隆曾在此封「十八棵御茶」。', emoji: '🍵' },
    { id: 'n-yuewang', name: '岳王庙', distanceM: 2100, era: 'ancient', blurb: '南宋名将岳飞长眠之地，「精忠报国」于此。', emoji: '⚔️' },
  ],
}

export default HANGZHOU
