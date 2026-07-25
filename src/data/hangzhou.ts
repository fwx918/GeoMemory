import type { GeoFeature, Location } from '../types'
import { HANGZHOU_POIS } from './hangzhou/pois'
import {
  QIN_SIX_CHAPTERS,
  SUI_CHAPTERS,
  TANG_CHAPTERS,
  WUYUE_CHAPTERS,
} from './hangzhou/chapters-early'
import {
  QING_CHAPTERS,
  REPUBLIC_CHAPTERS,
  PRC_CHAPTERS,
  NOW_CHAPTERS,
} from './hangzhou/chapters-late'
import {
  NORTH_SONG_CHAPTERS,
  SOUTH_SONG_CHAPTERS,
  YUAN_MING_CHAPTERS,
} from './hangzhou/chapters-mid'
import { WEST_LAKE_RINGS } from './generated/westLake'
import { QIANTANG_RIVER } from './generated/qiantangRiver'

// ============================================================================
// 杭州（真实化试点）：
// - 城区级 bbox，真实西湖水体（OSM 508 点 20 环，A 级）、钱塘江（Natural Earth，B 级）
// - 山体/道路/运河/堤坝为手工数字化（C 级：真实走向近似）
// - 南宋城墙/皇城/古湖岸线为文献复原示意（D 级：渲染为虚线）
// - 11 档朝代级时间轴，内容依据 docs/plan/hangzhou-story-outline.md
// ============================================================================

// 城区级视图：西至灵隐，南至六和塔，北至拱宸桥，东含钱塘江北岸城区
const BBOX: [number, number, number, number] = [120.06, 30.16, 120.24, 30.32]

// ------------------------------------------------------------- 基础要素（跨时代）

const WEST_LAKE: GeoFeature = {
  id: 'west-lake',
  kind: 'lake',
  name: '西湖',
  coords: [],
  rings: WEST_LAKE_RINGS,
  accuracy: 'A',
}

const QIANTANG: GeoFeature = {
  id: 'qiantang-river',
  kind: 'river',
  name: '钱塘江',
  coords: QIANTANG_RIVER,
  accuracy: 'B',
}

// 山体（C 级手工多边形）
const HILLS: GeoFeature[] = [
  { id: 'baoshi-hill', kind: 'mountain', name: '宝石山·葛岭', accuracy: 'C', coords: [
    [120.134, 30.2645], [120.144, 30.266], [120.152, 30.2635], [120.1495, 30.26],
    [120.142, 30.2605], [120.135, 30.261],
  ] },
  { id: 'beigao-peak', kind: 'mountain', name: '北高峰', accuracy: 'C', coords: [
    [120.088, 30.26], [120.098, 30.262], [120.108, 30.257], [120.104, 30.248],
    [120.093, 30.246], [120.086, 30.252],
  ] },
  { id: 'nangao-peak', kind: 'mountain', name: '南高峰', accuracy: 'C', coords: [
    [120.108, 30.236], [120.118, 30.238], [120.122, 30.231], [120.115, 30.225],
    [120.106, 30.228],
  ] },
  { id: 'yuhuang-hill', kind: 'mountain', name: '玉皇山', accuracy: 'C', coords: [
    [120.142, 30.226], [120.151, 30.227], [120.154, 30.219], [120.146, 30.215],
    [120.139, 30.219],
  ] },
  { id: 'wu-hill', kind: 'mountain', name: '吴山', accuracy: 'C', coords: [
    [120.158, 30.243], [120.166, 30.2425], [120.167, 30.237], [120.160, 30.236],
    [120.156, 30.239],
  ] },
  { id: 'fenghuang-hill', kind: 'mountain', name: '凤凰山', accuracy: 'C', coords: [
    [120.155, 30.231], [120.163, 30.2315], [120.166, 30.224], [120.159, 30.220],
    [120.153, 30.225],
  ] },
]

// 京杭大运河杭州段（拱宸桥→武林门→艮山门方向，C 级）
const GRAND_CANAL: GeoFeature = {
  id: 'grand-canal',
  kind: 'canal',
  name: '京杭大运河',
  accuracy: 'C',
  coords: [
    [120.133, 30.32], [120.139, 30.306], [120.145, 30.295], [120.152, 30.285],
    [120.158, 30.276], [120.163, 30.27], [120.172, 30.266], [120.183, 30.264],
  ],
}

// ------------------------------------------------------------- 堤坝（C 级）

const SU_CAUSEWAY: GeoFeature = {
  id: 'su-causeway', kind: 'road', name: '苏堤', accuracy: 'C',
  coords: [
    [120.1317, 30.2568], [120.1325, 30.25], [120.1335, 30.244], [120.136, 30.236],
    [120.1385, 30.231],
  ],
}
const BAI_CAUSEWAY: GeoFeature = {
  id: 'bai-causeway', kind: 'road', name: '白堤', accuracy: 'C',
  coords: [[120.1517, 30.2587], [120.148, 30.257], [120.1445, 30.2555]],
}
const YANGGONG_CAUSEWAY: GeoFeature = {
  id: 'yanggong-causeway', kind: 'road', name: '杨公堤', accuracy: 'C',
  coords: [
    [120.1245, 30.2525], [120.1247, 30.244], [120.1252, 30.236], [120.127, 30.231],
  ],
}

// ------------------------------------------------------------- 历史要素（D 级复原）

// 秦汉：海湾/潟湖时期的古岸线（湖尚未成形，水面东抵今湖滨一带）
const ANCIENT_SHORELINE: GeoFeature = {
  id: 'ancient-shoreline', kind: 'shoreline-old', name: '古海湾岸线', accuracy: 'D',
  coords: [
    [120.152, 30.263], [120.158, 30.257], [120.163, 30.25], [120.166, 30.242],
    [120.164, 30.235],
  ],
}

// 吴越：捍海石塘（910 年钱镠筑，沿江一线）
const SEAWALL: GeoFeature = {
  id: 'wuyue-seawall', kind: 'wall', name: '捍海石塘', accuracy: 'D',
  coords: [
    [120.14, 30.201], [120.155, 30.208], [120.17, 30.214], [120.188, 30.223],
  ],
}

// 南宋：临安外城城墙（依方志复原示意）
const LINAN_WALL: GeoFeature = {
  id: 'linan-wall', kind: 'wall', name: '临安城墙', accuracy: 'D',
  coords: [
    [120.166, 30.22], [120.172, 30.224], [120.176, 30.235], [120.177, 30.25],
    [120.175, 30.262], [120.168, 30.267], [120.161, 30.266], [120.158, 30.256],
    [120.157, 30.245], [120.158, 30.236], [120.161, 30.228], [120.163, 30.222],
  ],
}
// 南宋：皇城（凤凰山东麓）
const IMPERIAL_CITY: GeoFeature = {
  id: 'imperial-city', kind: 'area', name: '南宋皇城', accuracy: 'D',
  coords: [
    [120.158, 30.22], [120.166, 30.221], [120.168, 30.227], [120.163, 30.23],
    [120.157, 30.226],
  ],
}
// 南宋：御街（和宁门→中山路一线北上）
const IMPERIAL_STREET: GeoFeature = {
  id: 'imperial-street', kind: 'road-major', name: '御街', accuracy: 'C',
  coords: [
    [120.166, 30.223], [120.168, 30.234], [120.169, 30.244], [120.168, 30.252],
    [120.167, 30.258],
  ],
}

// 元明：湖西湮塞为桑田（杨公堤以西）
const SILTED_WEST: GeoFeature = {
  id: 'silted-west', kind: 'area', name: '湖西湮塞（桑田）', accuracy: 'D',
  coords: [
    [120.122, 30.253], [120.13, 30.251], [120.132, 30.24], [120.129, 30.231],
    [120.122, 30.234], [120.12, 30.246],
  ],
}

// 明清：杭州府城墙（沿袭南宋城址，示意沿用同走向）
const MING_QING_WALL: GeoFeature = {
  id: 'fucheng-wall', kind: 'wall', name: '杭州府城墙', accuracy: 'D',
  coords: LINAN_WALL.coords,
}

// 民国：沪杭铁路（东侧入城至城站）
const HUHANG_RAIL: GeoFeature = {
  id: 'huhang-rail', kind: 'rail', name: '沪杭铁路', accuracy: 'C',
  coords: [
    [120.24, 30.282], [120.213, 30.272], [120.194, 30.262], [120.184, 30.252],
    [120.18, 30.246],
  ],
}

// 当代：地铁 1 号线走向示意 + 主干路网（C 级）
const METRO_LINE1: GeoFeature = {
  id: 'metro-1', kind: 'rail', name: '地铁1号线', accuracy: 'C',
  coords: [
    [120.24, 30.292], [120.21, 30.277], [120.19, 30.266], [120.175, 30.258],
    [120.166, 30.25], [120.161, 30.243], [120.168, 30.232], [120.176, 30.225],
  ],
}
const MODERN_ROADS: GeoFeature[] = [
  { id: 'beishan-rd', kind: 'road-major', name: '北山街', accuracy: 'C', coords: [
    [120.13, 30.259], [120.14, 30.26], [120.1495, 30.259], [120.155, 30.2565],
  ] },
  { id: 'nanshan-rd', kind: 'road-major', name: '南山路', accuracy: 'C', coords: [
    [120.157, 30.252], [120.1565, 30.243], [120.153, 30.234], [120.146, 30.2285],
    [120.14, 30.2295],
  ] },
  { id: 'hubin-rd', kind: 'road-major', name: '湖滨路', accuracy: 'C', coords: [
    [120.157, 30.2455], [120.1575, 30.253],
  ] },
  { id: 'yanan-rd', kind: 'road-major', name: '延安路', accuracy: 'C', coords: [
    [120.1605, 30.24], [120.161, 30.25], [120.1615, 30.259], [120.163, 30.268],
  ] },
  { id: 'lingyin-rd', kind: 'road', name: '灵隐路', accuracy: 'C', coords: [
    [120.13, 30.2525], [120.115, 30.2505], [120.103, 30.245],
  ] },
  { id: 'zhijiang-rd', kind: 'road', name: '之江路', accuracy: 'C', coords: [
    [120.135, 30.203], [120.15, 30.2], [120.163, 30.206], [120.178, 30.214],
  ] },
]

// ============================================================================

export const HANGZHOU: Location = {
  id: 'hangzhou-west-lake',
  name: '杭州西湖',
  aliases: ['西湖', '杭州西湖', '杭州市西湖区龙井路', '西湖区', '龙井路', '杭州', 'west lake', 'hangzhou', '临安', '钱塘'],
  region: '浙江 · 杭州',
  coord: { lat: 30.2469, lng: 120.1494 },
  cover: '🏞️',
  tagline: '一池碧水，照见两千年城湖相生',
  timeline: [
    { key: 'now', label: '当代', dynasty: '还湖于民·世界遗产', yearRange: [2000, 2026], year: 2015, weight: 3 },
    { key: 'prc', label: '1950-2000', dynasty: '大疏浚·公园时代', yearRange: [1949, 1999], year: 1975, weight: 1 },
    { key: 'republic', label: '民国', dynasty: '塔倒了·城开了', yearRange: [1911, 1949], year: 1930, weight: 2 },
    { key: 'qing', label: '清', dynasty: '御笔十景', yearRange: [1644, 1911], year: 1780, weight: 2 },
    { key: 'yuan-ming', label: '元明', dynasty: '湮塞与重生', yearRange: [1276, 1644], year: 1500, weight: 1 },
    { key: 'south-song', label: '南宋', dynasty: '行在临安', yearRange: [1127, 1276], year: 1200, weight: 3 },
    { key: 'north-song', label: '北宋', dynasty: '苏轼浚湖', yearRange: [960, 1127], year: 1090, weight: 2 },
    { key: 'wuyue', label: '吴越', dynasty: '东南佛国', yearRange: [907, 978], year: 940, weight: 2 },
    { key: 'tang', label: '唐', dynasty: '白居易', yearRange: [618, 907], year: 823, weight: 2 },
    { key: 'sui', label: '隋', dynasty: '杭州得名', yearRange: [589, 618], year: 600, weight: 1 },
    { key: 'qin-six', label: '秦汉六朝', dynasty: '钱唐县', yearRange: [-222, 588], year: 300, weight: 1 },
  ],
  eras: ['now', 'prc', 'republic', 'qing', 'yuan-ming', 'south-song', 'north-song', 'wuyue', 'tang', 'sui', 'qin-six'],
  geo: {
    bbox: BBOX,
    base: [WEST_LAKE, QIANTANG, GRAND_CANAL, ...HILLS],
    // 湖区级放大档：西湖全湖 + 三岛 + 两堤 + 吴山北麓
    zoomBbox: [120.105, 30.2, 120.178, 30.272],
    zoomLabel: '湖区',
  },
  pois: HANGZHOU_POIS,
  featuredCompare: ['south-song', 'now'],
  records: {
    'qin-six': {
      era: 'qin-six',
      title: '钱唐县 · 海湾变潟湖',
      summary:
        '秦置钱唐县时还没有西湖——只有一个与钱塘江相通的浅海湾，宝石山与吴山是伸入水中的两个岬角。东汉地方官华信筑防海大塘，泥沙渐渐封住湾口，海湾淡化成潟湖，早期称「武林水」「钱塘湖」。东晋咸和元年（326），印度僧人慧理惊叹北高峰南麓「不知何以飞来」，建灵隐寺，飞来峰由此得名。',
      highlights: ['前222 秦置钱唐县', '东汉华信筑塘，海湾成湖', '326 慧理建灵隐寺'],
      imageHint: '🌊',
      chapters: QIN_SIX_CHAPTERS,
      geoOverlay: {
        features: [ANCIENT_SHORELINE],
        poiRefs: ['baoshi-hill', 'wushan', 'lingyin', 'feilai', 'xiling'],
      },
    },
    sui: {
      era: 'sui',
      title: '杭州 · 得名与运河',
      summary:
        '隋开皇九年（589）废钱唐郡置「杭州」，这个名字第一次出现在版图上。开皇十一年杨素把州治迁到凤凰山麓，依山筑起周三十六里的州城——此后近千年，凤凰山下始终是杭州的政治中心。大业六年（610）江南运河凿通，京口至余杭八百余里，杭州从东南小城一跃成为水运枢纽。',
      highlights: ['589 「杭州」之名始于此', '591 杨素筑州城于凤凰山', '610 江南运河凿通'],
      imageHint: '🚣',
      chapters: SUI_CHAPTERS,
      geoOverlay: {
        poiRefs: ['fenghuang-hill', 'liupu', 'grand-canal-end'],
      },
    },
    tang: {
      era: 'tang',
      title: '唐 · 最忆是杭州',
      summary:
        '唐代杭州户口逾十万，跻身东南名郡。贞元年间刺史李泌开六井，用暗渠把西湖淡水引入咸卤的城区，城市重心开始向湖边聚拢。长庆二年（822）白居易出任杭州刺史，修堤蓄水、规定「放水一寸可溉田十五顷」，写下「最爱湖东行不足，绿杨阴里白沙堤」——今天的白堤，就是杭州人对他的纪念。',
      highlights: ['约781 李泌开六井引湖水入城', '822 白居易任杭州刺史', '823-824 修堤浚湖'],
      imageHint: '🖌️',
      chapters: TANG_CHAPTERS,
      geoOverlay: {
        features: [BAI_CAUSEWAY],
        poiRefs: ['baidi', 'duanqiao', 'xiangguo-well', 'gushan'],
      },
    },
    wuyue: {
      era: 'wuyue',
      title: '吴越国 · 保境安民',
      summary:
        '唐亡后钱镠建吴越国，定都杭州，乱世中独享七十年太平。910 年他「石囤木桩」筑捍海塘压住江潮，民间尊称「海龙王」；又设千人「撩湖兵」专职浚湖。吴越崇佛，杭州号称「东南佛国」：六和塔镇江潮、保俶塔立宝石山巅，977 年钱俶建雷峰塔——次年他纳土归宋，杭州免于战火。',
      highlights: ['907 钱镠建吴越国', '910 筑捍海石塘', '977 建雷峰塔·978 纳土归宋'],
      imageHint: '🛕',
      chapters: WUYUE_CHAPTERS,
      geoOverlay: {
        features: [SEAWALL, BAI_CAUSEWAY],
        poiRefs: ['leifeng', 'baochu', 'liuhe', 'jingci', 'seawall'],
      },
    },
    'north-song': {
      era: 'north-song',
      title: '北宋 · 苏轼浚湖筑堤',
      summary:
        '元祐四年（1089）苏轼知杭州，此时西湖「葑合之地」近半。他上《乞开杭州西湖状》，断言「杭州之有西湖，如人之有眉目」，募工二十万疏浚全湖，把挖出的葑泥纵贯南北筑成长堤，上建六桥、遍植芙蓉杨柳——杭人呼为「苏公堤」。他还在湖中立三座石塔禁种菱芡，即三潭印月的前身。',
      highlights: ['1071 苏轼任杭州通判', '1089 知杭州', '1090 疏浚西湖·筑苏堤'],
      imageHint: '📜',
      chapters: NORTH_SONG_CHAPTERS,
      geoOverlay: {
        features: [SU_CAUSEWAY, BAI_CAUSEWAY],
        poiRefs: ['sudi', 'santan', 'longjing', 'gushan'],
      },
    },
    'south-song': {
      era: 'south-song',
      title: '临安 · 行在一百五十年',
      summary:
        '靖康之变后宋室南渡，1138 年定杭州为「行在所」，升临安府。皇城圈占凤凰山东麓，一条御街从和宁门直通城北——就是今天的中山路。临安人口号称过百万，《梦粱录》记夜市至三更不绝。1142 年岳飞以「莫须有」罪名遇害，后迁葬栖霞岭。画院题出「平湖秋月」「断桥残雪」，西湖十景由此定型。',
      highlights: ['1138 定都临安', '1142 岳飞遇害', '西湖十景之名定型', '1276 元军入临安'],
      imageHint: '🏯',
      chapters: SOUTH_SONG_CHAPTERS,
      geoOverlay: {
        features: [LINAN_WALL, IMPERIAL_CITY, IMPERIAL_STREET, SU_CAUSEWAY, BAI_CAUSEWAY],
        poiRefs: ['imperial-city', 'yujie', 'yuefei', 'jingci', 'leifeng', 'duanqiao', 'lingyin', 'fenghuang-hill'],
      },
    },
    'yuan-ming': {
      era: 'yuan-ming',
      title: '元明 · 湮塞与重生',
      summary:
        '元代西湖疏于治理，苏堤以西渐成桑田，「西湖遂废」；飞来峰上却在此期开凿出大批藏式造像。转机在明正德三年（1508）：知州杨孟瑛力排众议，役工数百万疏浚全湖，挖出的泥筑成西侧长堤——杨公堤，与白苏二堤并称「西湖三堤」。杭州人于谦少年在吴山读书写下《石灰吟》，冤死后归葬三台山，西湖多了一座忠魂祠。',
      highlights: ['元代 飞来峰藏式造像', '1508 杨孟瑛浚湖筑杨公堤', '于谦归葬三台山'],
      imageHint: '🌾',
      chapters: YUAN_MING_CHAPTERS,
      geoOverlay: {
        features: [SILTED_WEST, MING_QING_WALL, SU_CAUSEWAY, BAI_CAUSEWAY, YANGGONG_CAUSEWAY],
        poiRefs: ['yanggong', 'yuqian', 'huxinting', 'feilai', 'santan', 'wushan', 'changqiao'],
      },
    },
    qing: {
      era: 'qing',
      title: '清 · 皇帝的西湖',
      summary:
        '康熙南巡屡驻杭州，1699 年为西湖十景逐一题名立碑，「曲院风荷」「花港观鱼」的今名即出康熙手笔；乾隆六下江南次次入住孤山行宫，又为十景各赋诗刻于碑阴。1782 年《四库全书》成，杭州建文澜阁贮藏全书，江南士子可就近抄阅。西湖至此完成从州郡湖泊到「天下景」的加冕。',
      highlights: ['1699 康熙题定西湖十景', '乾隆六下江南驻孤山行宫', '1782 建文澜阁贮《四库全书》'],
      imageHint: '🖋️',
      chapters: QING_CHAPTERS,
      geoOverlay: {
        features: [MING_QING_WALL, SU_CAUSEWAY, BAI_CAUSEWAY, YANGGONG_CAUSEWAY],
        poiRefs: ['xinggong', 'wenlan', 'quyuan', 'huagang', 'longjing', 'duanqiao', 'leifeng', 'gushan'],
      },
    },
    republic: {
      era: 'republic',
      title: '民国 · 塔倒了，城开了',
      summary:
        '1911 年杭州光复后拆除旗营城墙——湖与城之间最后一道墙没了，旗营旧址辟为「湖滨新市场」，杭州第一次真正面湖而居。1924 年 9 月 25 日，年久失修的雷峰塔轰然倒塌，鲁迅连写《论雷峰塔的倒掉》；塔砖中还发现了吴越刻本佛经。1929 年西湖博览会观众逾千万人次。秋瑾归葬西泠桥畔，李叔同在虎跑剃度为弘一。',
      highlights: ['1912-1914 拆旗营辟湖滨', '1924.9.25 雷峰塔倒塌', '1929 西湖博览会'],
      imageHint: '📰',
      chapters: REPUBLIC_CHAPTERS,
      geoOverlay: {
        features: [HUHANG_RAIL, SU_CAUSEWAY, BAI_CAUSEWAY, YANGGONG_CAUSEWAY],
        poiRefs: ['hubin', 'leifeng', 'qiujin', 'chengzhan', 'hupao', 'gushan'],
      },
    },
    prc: {
      era: 'prc',
      title: '1950-2000 · 大疏浚与公园时代',
      summary:
        '1949 年时西湖平均水深仅半米多。1952-1958 年实施建国后首次大规模机械疏浚，挖出淤泥七百余万立方米，水深增至 1.8 米左右。园林学家孙筱祥主持把花港观鱼从一亭一池扩为二十余公顷大公园，环湖公园带成形。1985 年评出「新西湖十景」，1988 年太子湾公园建成，樱花与郁金香成为杭州春天的固定节目。',
      highlights: ['1952-1958 西湖大疏浚', '花港观鱼扩建', '1985 新西湖十景', '1988 太子湾建成'],
      imageHint: '🌷',
      chapters: PRC_CHAPTERS,
      geoOverlay: {
        features: [SU_CAUSEWAY, BAI_CAUSEWAY, YANGGONG_CAUSEWAY, ...MODERN_ROADS.slice(0, 4)],
        poiRefs: ['huagang', 'taiziwan', 'yanggong', 'leifeng'],
      },
    },
    now: {
      era: 'now',
      title: '当代 · 还湖于民与世界遗产',
      summary:
        '2002 年雷峰塔重建落成，「雷峰夕照」缺席 78 年后归位；同年杭州启动「还湖于民」，环湖公园拆墙、免票，「免费西湖」反而带动全城旅游，被称为「西湖模式」。2011 年 6 月 24 日，「杭州西湖文化景观」列入《世界遗产名录》。G20 与亚运会之后，「三面云山一面城」的格局一再成为世界镜头里的杭州。',
      highlights: ['2002 雷峰塔重建·免费开放', '2011 列入世界遗产', 'G20·亚运会'],
      imageHint: '🚇',
      chapters: NOW_CHAPTERS,
      geoOverlay: {
        features: [SU_CAUSEWAY, BAI_CAUSEWAY, YANGGONG_CAUSEWAY, METRO_LINE1, ...MODERN_ROADS],
        poiRefs: ['leifeng', 'hubin', 'baochu', 'longxiang', 'maojiabu', 'sudi', 'baidi'],
      },
    },
  },
  story: {
    nameOrigin:
      '西湖古称「武林水」「钱塘湖」，因位于杭州城西而俗称西湖。它原是与钱塘江相通的海湾，东汉华信筑塘后泥沙封口、淡化成潟湖，再经白居易、苏轼、杨孟瑛历代疏浚，方成今日城中之湖。「杭州」之名则始于隋开皇九年（589）。',
    changes:
      '从秦汉的海湾潟湖，到隋代得名、唐代白居易筑堤，吴越国佛塔林立，北宋苏轼浚湖，南宋升格为都城临安，明代杨公堤问世，清帝题定十景，民国雷峰塔倒塌，直至当代免费开放、列入世界遗产——西湖两千年，就是一部城湖相生史。',
    keyFigures: [
      '白居易（822 年任刺史，筑堤蓄湖）',
      '钱镠（吴越国王，筑捍海塘设撩湖兵）',
      '苏轼（1090 年浚湖筑苏堤）',
      '岳飞（1142 年遇害，葬栖霞岭）',
      '杨孟瑛（1508 年浚湖筑杨公堤）',
      '于谦（杭州人，归葬三台山）',
    ],
    landmarkEvents: [
      '前222·秦置钱唐县',
      '589·置杭州，610·江南运河凿通',
      '822·白居易任杭州刺史',
      '977·钱俶建雷峰塔',
      '1090·苏轼疏浚西湖筑苏堤',
      '1138·南宋定都临安',
      '1699·康熙题定西湖十景',
      '1924·雷峰塔倒塌',
      '2011·西湖文化景观列入世界遗产',
    ],
    pastVsPresent:
      '两千年前你脚下还是钱塘江的海湾，宝石山是伸入水中的岬角；一千年前苏轼的疏浚船正在湖上捞葑泥；八百年前这里是南宋都城，御街上「四孟驾出」；今天你刷地铁卡到龙翔桥，沿绿道环湖骑行——但断桥还是唐代的名字，苏堤还是苏轼留下的那条。',
  },
  nearby: [
    { id: 'n-leifeng', name: '雷峰塔', distanceM: 1200, era: 'wuyue', blurb: '977 年钱俶建，1924 年倒塌，2002 年重建——《白蛇传》镇塔传说所在。', emoji: '🗼' },
    { id: 'n-lingyin', name: '灵隐寺', distanceM: 3400, era: 'qin-six', blurb: '东晋 326 年慧理始建的千年古刹，飞来峰造像静默千年。', emoji: '🛕' },
    { id: 'n-longjing', name: '龙井村', distanceM: 4200, era: 'qing', blurb: '龙井茶原产地，乾隆曾在此封「十八棵御茶」。', emoji: '🍵' },
    { id: 'n-yuewang', name: '岳王庙', distanceM: 2100, era: 'south-song', blurb: '南宋名将岳飞长眠之地，墓前铁跪像四具。', emoji: '⚔️' },
  ],
}

export default HANGZHOU
