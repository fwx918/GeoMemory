import type { Location } from '../types'
import { HUAINAN } from './huainan'

// ============================================================================
// 种子数据集：
//   · 淮南        —— 真实行政边界 + 淮河 + 湖泊（GeoMap 真实地理地图，默认展示）
//   · 杭州西湖     —— 湖岸与堤坝的演变（程式化 SvgMap）
//   · 上海南京东路 —— 城市扩张与黄浦江外滩（程式化 SvgMap）
//   · 新加坡丹戎巴葛 —— 海岸线填海造地（程式化 SvgMap）
// 含 geo 字段的地点使用真实经纬度渲染；其余使用 0..100 视图的程式化几何。
// ============================================================================

export const LOCATIONS: Location[] = [
  // ---------------------------------------------------- 淮南（真实地理地图）
  HUAINAN,

  // ---------------------------------------------------------------- 杭州西湖
  {
    id: 'hangzhou-west-lake',
    name: '杭州西湖',
    aliases: [
      '西湖',
      '杭州西湖',
      '杭州市西湖区龙井路',
      '西湖区',
      '龙井路',
      '杭州',
      'west lake',
      'hangzhou',
    ],
    region: '浙江 · 杭州',
    coord: { lat: 30.2469, lng: 120.1494 },
    cover: '🏞️',
    tagline: '一池碧水，照见千年文人风骨',
    eras: ['2026', '2000', '1950', '1900', '1800', 'ancient'],
    records: {
      '2026': {
        era: '2026',
        title: '西湖 · 当代',
        summary:
          '今天的西湖是免费开放的世界文化遗产景区，环湖地铁与绿道串联起断桥、苏堤与雷峰塔。每到夜晚，音乐喷泉与灯光秀映在湖面，游人如织。',
        highlights: ['世界文化遗产', '环湖免费开放', '地铁直达湖滨', '一年四季客流不息'],
        imageHint: '🚇',
        mapLayers: {
          land: 'M0,0 H100 V100 H0 Z',
          water:
            'M30,28 C22,34 20,50 26,64 C32,78 50,82 64,76 C78,70 80,48 72,36 C64,24 42,20 30,28 Z',
          cityExtent:
            'M0,0 H100 V100 H0 Z',
          roads: [
            'M30,30 C36,46 38,58 40,74', // 苏堤
            'M28,40 H58', // 白堤
            'M10,10 H90', // 环湖北路
            'M85,8 V92', // 高架/地铁线
          ],
          pois: [
            { id: 'leifeng', name: '雷峰塔', x: 58, y: 76, kind: 'landmark' },
            { id: 'baochu', name: '保俶塔', x: 40, y: 22, kind: 'landmark' },
            { id: 'broken-bridge', name: '断桥', x: 56, y: 34, kind: 'landmark' },
            { id: 'metro', name: '龙翔桥地铁站', x: 80, y: 50, kind: 'transit' },
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
        mapLayers: {
          land: 'M0,0 H100 V100 H0 Z',
          water:
            'M28,26 C19,33 17,51 24,66 C31,80 51,84 66,77 C80,70 82,46 73,34 C64,22 41,19 28,26 Z',
          cityExtent: 'M68,38 C76,40 80,52 76,62 C72,70 62,70 60,62 C58,52 60,40 68,38 Z',
          roads: ['M30,30 C36,46 38,58 40,74', 'M28,40 H58'],
          pois: [
            { id: 'leifeng-old', name: '雷峰塔(残)', x: 60, y: 78, kind: 'landmark' },
            { id: 'tea', name: '龙井茶园', x: 16, y: 60, kind: 'village' },
            { id: 'temple', name: '净慈寺', x: 54, y: 82, kind: 'temple' },
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
        mapLayers: {
          land: 'M0,0 H100 V100 H0 Z',
          water:
            'M27,25 C18,32 16,52 23,67 C30,81 52,85 67,78 C81,71 83,45 74,33 C65,21 40,18 27,25 Z',
          roads: ['M30,29 C36,46 38,58 40,75', 'M28,39 H58'],
          pois: [
            { id: 'leifeng-full', name: '雷峰塔', x: 60, y: 79, kind: 'landmark' },
            { id: 'su-causeway', name: '苏堤', x: 34, y: 52, kind: 'water' },
            { id: 'bai-causeway', name: '白堤', x: 44, y: 39, kind: 'water' },
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
        mapLayers: {
          land: 'M0,0 H100 V100 H0 Z',
          water:
            'M24,22 C13,30 12,54 21,70 C30,84 54,88 70,80 C84,72 86,42 75,30 C64,18 38,14 24,22 Z',
          roads: ['M30,28 C36,46 37,58 40,76'],
          pois: [
            { id: 'su', name: '苏轼治湖', x: 32, y: 54, kind: 'water' },
            { id: 'bai', name: '白居易筑堤', x: 50, y: 30, kind: 'water' },
            { id: 'lagoon', name: '古潟湖', x: 70, y: 60, kind: 'water' },
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
  },

  // ---------------------------------------------------------- 上海南京东路
  {
    id: 'shanghai-nanjing-road',
    name: '上海南京东路',
    aliases: [
      '南京东路',
      '上海南京东路',
      '上海市南京东路',
      '上海',
      '南京路',
      '外滩',
      'nanjing road',
      'shanghai',
    ],
    region: '上海 · 黄浦',
    coord: { lat: 31.2354, lng: 121.4811 },
    cover: '🏙️',
    tagline: '一条马路，写满中国近代的繁华与风云',
    eras: ['2026', '2000', '1950', '1900', '1800'],
    records: {
      '2026': {
        era: '2026',
        title: '南京东路 · 当代',
        summary:
          '今天的南京东路是中国最繁忙的商业步行街之一，霓虹璀璨、人流如潮。东端连接外滩万国建筑群，黄浦江对岸是陆家嘴的摩天楼群，新旧上海在此隔江相望。',
        highlights: ['中华商业第一街', '全程步行街', '外滩万国建筑群', '隔江望陆家嘴'],
        imageHint: '🌃',
        mapLayers: {
          water: 'M78,0 C70,25 74,55 66,80 C62,92 70,100 70,100 L100,100 V0 Z',
          cityExtent: 'M0,0 H78 V100 H0 Z',
          roads: ['M6,46 H72', 'M20,8 V92', 'M40,8 V92', 'M58,10 V90'],
          pois: [
            { id: 'bund', name: '外滩', x: 72, y: 46, kind: 'building' },
            { id: 'pedestrian', name: '步行街', x: 36, y: 46, kind: 'transit' },
            { id: 'lujiazui', name: '陆家嘴', x: 90, y: 40, kind: 'building' },
            { id: 'peace-hotel', name: '和平饭店', x: 70, y: 38, kind: 'landmark' },
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
        mapLayers: {
          water: 'M80,0 C72,25 76,55 68,80 C64,92 72,100 72,100 L100,100 V0 Z',
          cityExtent: 'M4,6 H80 V94 H4 Z',
          roads: ['M8,46 H74', 'M24,12 V88', 'M44,12 V88'],
          pois: [
            { id: 'wing-on', name: '永安公司', x: 40, y: 44, kind: 'building' },
            { id: 'sincere', name: '先施公司', x: 34, y: 50, kind: 'building' },
            { id: 'tram', name: '有轨电车', x: 20, y: 46, kind: 'transit' },
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
        mapLayers: {
          water: 'M76,0 C66,25 72,55 62,82 C58,93 66,100 66,100 L100,100 V0 Z',
          cityExtent: 'M30,18 H76 V82 H30 Z',
          roads: ['M30,46 H70', 'M44,20 V80'],
          pois: [
            { id: 'big-road', name: '大马路', x: 48, y: 44, kind: 'transit' },
            { id: 'banks', name: '外滩洋行', x: 70, y: 50, kind: 'building' },
            { id: 'customs', name: '江海关', x: 68, y: 62, kind: 'landmark' },
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
        mapLayers: {
          water: 'M66,0 C56,25 62,55 52,82 C48,93 56,100 56,100 L100,100 V0 Z',
          cityExtent: 'M40,60 H60 V82 H40 Z',
          roads: ['M44,66 H58'],
          pois: [
            { id: 'marsh', name: '滩涂芦苇', x: 60, y: 40, kind: 'water' },
            { id: 'farm', name: '城北农田', x: 30, y: 50, kind: 'village' },
            { id: 'county', name: '上海县城', x: 48, y: 72, kind: 'village' },
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
  },

  // ------------------------------------------------------- 新加坡丹戎巴葛
  {
    id: 'singapore-tanjong-pagar',
    name: '新加坡丹戎巴葛',
    aliases: [
      '丹戎巴葛',
      '新加坡丹戎巴葛',
      '新加坡',
      'tanjong pagar',
      'singapore',
      '直落亚逸',
    ],
    region: '新加坡 · 中央商务区',
    coord: { lat: 1.2766, lng: 103.8456 },
    cover: '🌆',
    tagline: '从渔村到摩天 CBD，一寸寸向海要来的土地',
    eras: ['2026', '2000', '1950', '1900', '1800'],
    records: {
      '2026': {
        era: '2026',
        title: '丹戎巴葛 · 当代',
        summary:
          '今天的丹戎巴葛是新加坡中央商务区的一部分，摩天楼鳞次栉比，地铁四通八达。昔日的海岸线早已被大规模填海推向远方，老火车站与店屋则被精心保留，新旧并立。',
        highlights: ['中央商务区 CBD', '大规模填海', '地铁枢纽', '保育店屋与老车站'],
        imageHint: '🏢',
        mapLayers: {
          // 填海后海岸线被大幅外推，陆地占据大部分画面
          land: 'M0,0 H100 V70 C80,76 55,74 35,80 C20,84 8,82 0,86 Z',
          coastline: 'M0,86 C8,82 20,84 35,80 C55,74 80,76 100,70',
          water: 'M0,86 C8,82 20,84 35,80 C55,74 80,76 100,70 V100 H0 Z',
          cityExtent: 'M0,0 H100 V66 H0 Z',
          roads: ['M0,30 H100', 'M30,0 V70', 'M64,0 V72'],
          pois: [
            { id: 'cbd', name: 'CBD 摩天楼', x: 50, y: 30, kind: 'building' },
            { id: 'station', name: '丹戎巴葛地铁站', x: 26, y: 44, kind: 'transit' },
            { id: 'old-station', name: '旧火车站', x: 16, y: 58, kind: 'landmark' },
            { id: 'marina', name: '滨海湾(填海)', x: 78, y: 60, kind: 'building' },
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
        mapLayers: {
          land: 'M0,0 H100 V56 C78,62 52,60 32,66 C18,70 8,68 0,72 Z',
          coastline: 'M0,72 C8,68 18,70 32,66 C52,60 78,62 100,56',
          water: 'M0,72 C8,68 18,70 32,66 C52,60 78,62 100,56 V100 H0 Z',
          cityExtent: 'M0,0 H100 V50 H0 Z',
          roads: ['M0,28 H100', 'M30,0 V56'],
          pois: [
            { id: 'station-1950', name: '丹戎巴葛火车站', x: 18, y: 50, kind: 'transit' },
            { id: 'wharf', name: '货运码头', x: 60, y: 58, kind: 'transit' },
            { id: 'shophouse', name: '店屋区', x: 40, y: 30, kind: 'building' },
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
        mapLayers: {
          land: 'M0,0 H100 V44 C78,50 52,48 32,54 C18,58 8,56 0,60 Z',
          coastline: 'M0,60 C8,56 18,58 32,54 C52,48 78,50 100,44',
          water: 'M0,60 C8,56 18,58 32,54 C52,48 78,50 100,44 V100 H0 Z',
          cityExtent: 'M6,8 H70 V40 H6 Z',
          roads: ['M0,26 H80'],
          pois: [
            { id: 'docks', name: '丹戎巴葛码头', x: 50, y: 50, kind: 'transit' },
            { id: 'coal', name: '加煤站', x: 68, y: 46, kind: 'building' },
            { id: 'kampong', name: '华人甘榜', x: 26, y: 26, kind: 'village' },
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
        mapLayers: {
          // 开埠前海岸线深入内陆，陆地最少
          land: 'M0,0 H100 V30 C76,38 50,36 30,42 C16,46 8,44 0,48 Z',
          coastline: 'M0,48 C8,44 16,46 30,42 C50,36 76,38 100,30',
          water: 'M0,48 C8,44 16,46 30,42 C50,36 76,38 100,30 V100 H0 Z',
          cityExtent: 'M10,12 H40 V26 H10 Z',
          roads: [],
          pois: [
            { id: 'cape', name: '插桩海角', x: 56, y: 36, kind: 'water' },
            { id: 'fishing', name: '渔村', x: 22, y: 18, kind: 'village' },
            { id: 'mangrove', name: '红树林', x: 70, y: 44, kind: 'water' },
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
  },
]

export default LOCATIONS
