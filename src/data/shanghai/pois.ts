import type { Poi } from '../../types'

// ============================================================================
// 上海南京东路共享 POI 表：坐标为真实经纬度（外滩—南京东路—老城厢一线）。
// eraStates 记录同一地点在不同时代的称呼与故事（如外滩：开埠租界「洋行林立」
// → 民国「远东华尔街」→ 当代「万国建筑群」）。
// 章节段落用 poiRefs 引用这里的 id，滚动时驱动地图高亮。
// 时代 key 必须与 shanghai.ts 的 timeline 一致：
//   now / prc / republic / concession / pre-1843
// ============================================================================

export const SHANGHAI_POIS: Poi[] = [
  // ------------------------------------------------ 跨时代锚点
  {
    id: 'bund',
    name: '外滩',
    lng: 121.49,
    lat: 31.239,
    kind: 'landmark',
    priority: 1,
    eraStates: {
      'pre-1843': {
        name: '黄浦滩',
        story: '开埠前这里是黄浦江西岸的芦苇滩地，岸边有一条纤夫拉船踩出的土路，本地人只叫它「黄浦滩」。',
        chapterRef: 'pre1843-c2',
      },
      concession: {
        name: '外滩（洋行林立）',
        story: '英租界沿江划出「外滩」，怡和、宝顺等洋行次第落成，纤道拓成马路，江边成了侨民的跑马与散步之地。',
        chapterRef: 'concession-c1',
      },
      republic: {
        name: '外滩（远东华尔街）',
        story: '二十余家中外银行沿江排开，被称作「远东华尔街」；江海关的钟声每一刻钟响一次，是全城对时的标准。',
        chapterRef: 'republic-c2',
      },
      prc: {
        name: '外滩（机关大楼）',
        story: '银行大楼多改作机关与单位办公楼，汇丰大楼一度是上海市人民政府所在地；江边成了市民纳凉的「情人墙」。',
        chapterRef: 'prc-c2',
      },
      now: {
        name: '万国建筑群',
        story: '五十二幢历史建筑连成一线，1996 年列为全国重点文物保护单位；观景平台正对浦东的天际线。',
        chapterRef: 'now-c2',
      },
    },
  },
  {
    id: 'nanjing-road',
    name: '南京东路',
    lng: 121.481,
    lat: 31.2372,
    kind: 'transit',
    priority: 1,
    eraStates: {
      'pre-1843': {
        name: '城北田陌',
        story: '开埠前此处属上海县城北郊，是田埂、菜地与几条通往江边的土径，并无街市。',
        chapterRef: 'pre1843-c2',
      },
      concession: {
        name: '大马路',
        story: '先有跑马道「花园弄」，1865 年租界当局以中国城市名统一路名，定名南京路；华人一直照旧叫它「大马路」。',
        chapterRef: 'concession-c2',
      },
      republic: {
        name: '远东第一街',
        story: '四大公司隔街对峙，霓虹、电车、橱窗与咖啡馆连成一片，被报纸称为「远东第一街」「不夜城」。',
        chapterRef: 'republic-c1',
      },
      prc: {
        name: '南京东路',
        story: '百货公司改换招牌与编号，「一店」「十店」成了新的地标；节假日客流仍是全国之最。',
        chapterRef: 'prc-c1',
      },
      now: {
        name: '南京东路步行街',
        story: '1999 年 9 月河南中路至西藏中路段改建为步行街，全长约一千零三十三米，被称作「中华商业第一街」。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'renmin-square',
    name: '人民广场',
    lng: 121.4745,
    lat: 31.2325,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      concession: {
        name: '跑马厅',
        story: '1862 年英侨第三次圈地建跑马场于此，环场跑马道即今西藏中路、南京西路、黄陂北路一线的雏形。',
        chapterRef: 'concession-c2',
      },
      republic: {
        name: '跑马厅',
        story: '看台、钟楼与大草坪占去租界中心的一大片地，赛马与跑马厅的彩票是民国上海最大的赌局。',
        chapterRef: 'republic-c2',
      },
      prc: {
        name: '人民广场·人民公园',
        story: '1951 年跑马厅由上海市人民政府收回，北半辟为人民公园，南半辟为人民广场，成为集会与庆典之地。',
        chapterRef: 'prc-c2',
      },
      now: {
        name: '人民广场',
        story: '地下是三线换乘的地铁枢纽，地面是博物馆、大剧院与城市规划馆围合的市中心绿地。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'lujiazui',
    name: '陆家嘴',
    lng: 121.5057,
    lat: 31.2397,
    kind: 'building',
    priority: 1,
    eraStates: {
      'pre-1843': {
        name: '浦东滩地',
        story: '黄浦江在此拐出一个大弯，江东是芦苇、盐碱地与零星村落，相传因明代学者陆深家族葬地在此得名「陆家嘴」。',
        chapterRef: 'pre1843-c2',
      },
      concession: {
        name: '烂泥渡',
        story: '与外滩仅一江之隔，却是另一个世界：泥泞的渡口、船厂与堆栈，本地人称「烂泥渡路」，晴天一身灰雨天一脚泥。',
      },
      prc: {
        name: '仓库与船厂',
        story: '江东岸多是码头、仓库与工厂宿舍，市民口中「宁要浦西一张床，不要浦东一间房」。',
        chapterRef: 'prc-c2',
      },
      now: {
        name: '陆家嘴金融城',
        story: '1990 年浦东开发启动，东方明珠、金茂大厦、环球金融中心、上海中心先后拔地而起，与外滩隔江相望。',
        chapterRef: 'now-c2',
      },
    },
  },

  // ------------------------------------------------ 开埠前：老城厢
  {
    id: 'old-county',
    name: '上海县城',
    lng: 121.49,
    lat: 31.2235,
    kind: 'village',
    priority: 2,
    eraStates: {
      'pre-1843': {
        name: '上海县城',
        story: '元至元二十九年（1292）置上海县，明嘉靖三十二年（1553）为御倭寇筑起周约九里的城墙，城内街巷绕着县衙与庙市展开。',
        chapterRef: 'pre1843-c1',
      },
      concession: {
        name: '南市（华界）',
        story: '租界在城北崛起后，城内被称作「南市」，与「北市」的租界分属两个世界，一道护城河与城墙隔开。',
        chapterRef: 'concession-c1',
      },
      republic: {
        name: '老城厢',
        story: '1912 年拆城墙填壕，环城辟为中华路与民国路（今人民路），今日地图上那个圆环就是当年的城圈。',
        chapterRef: 'republic-c3',
      },
      now: {
        name: '老城厢',
        story: '城墙只剩大境阁一段残垣，中华路与人民路合围的圆形街区，仍标记着上海最初的形状。',
      },
    },
  },
  {
    id: 'chenghuang',
    name: '城隍庙',
    lng: 121.4925,
    lat: 31.2263,
    kind: 'temple',
    priority: 2,
    eraStates: {
      'pre-1843': {
        name: '上海县城隍庙',
        story: '明永乐年间由金山神庙改建，供奉霍光与秦裕伯，庙前庙后聚成市集，是全县最热闹的地方。',
        chapterRef: 'pre1843-c1',
      },
      concession: {
        name: '城隍庙市集',
        story: '香火与商贩共生，三巡会出会时万人空巷；租界的洋货与庙前的土产在同一座城里并行流通。',
      },
      now: {
        name: '城隍庙商圈',
        story: '庙、园、市三者仍连成一片，是外地游客对「老上海」最集中的想象。',
      },
    },
  },
  {
    id: 'yuyuan',
    name: '豫园',
    lng: 121.4922,
    lat: 31.2272,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      'pre-1843': {
        name: '豫园',
        story: '明嘉靖三十八年（1559）四川布政使潘允端为奉养父亲起造，「豫」取愉悦之意，历十余年方成，是江南名园。',
        chapterRef: 'pre1843-c1',
      },
      concession: {
        name: '豫园（园归公所）',
        story: '潘氏中落后园渐荒废，各业公所分占园地设行会公所，昔日私园成了商帮议事之处。',
      },
      now: {
        name: '豫园',
        story: '1961 年修复开放，1982 年列为全国重点文物保护单位，湖心亭与九曲桥是上海最常被画进明信片的一角。',
      },
    },
  },

  // ------------------------------------------------ 租界与民国：南京路商街
  {
    id: 'wing-on',
    name: '永安公司',
    lng: 121.4785,
    lat: 31.236,
    kind: 'building',
    priority: 2,
    eraStates: {
      republic: {
        name: '永安公司',
        story: '1918 年 9 月开业，郭氏兄弟自澳洲侨商起家，楼顶「绮云阁」高耸，与街对面的先施日夜较劲。',
        chapterRef: 'republic-c1',
      },
      prc: {
        name: '上海第十百货商店',
        story: '1956 年公私合营，后几度更名，1969 年定名「上海第十百货商店」，1988 年挂上「华联商厦」的招牌。',
        chapterRef: 'prc-c1',
      },
      now: {
        name: '永安百货',
        story: '2005 年恢复「永安百货」旧名，骑楼与转角塔楼仍是南京东路上辨识度最高的立面之一。',
      },
    },
  },
  {
    id: 'sincere',
    name: '先施公司',
    lng: 121.478,
    lat: 31.2353,
    kind: 'building',
    priority: 2,
    eraStates: {
      republic: {
        name: '先施公司',
        story: '1917 年 10 月开业，马应彪自香港北上，首创明码标价与女售货员，开张当日人潮几乎挤破大门。',
        chapterRef: 'republic-c1',
      },
      prc: {
        name: '上海时装商店',
        story: '公私合营后改为上海时装公司门市，「时装商店」四字招牌管了几十年上海人的衣着风向。',
        chapterRef: 'prc-c1',
      },
      now: {
        name: '先施大楼',
        story: '大楼保留下来并列入优秀历史建筑，底层商铺换了一茬又一茬，转角的钟楼还在。',
      },
    },
  },
  {
    id: 'dasun',
    name: '大新公司',
    lng: 121.475,
    lat: 31.235,
    kind: 'building',
    priority: 2,
    eraStates: {
      republic: {
        name: '大新公司',
        story: '1936 年 1 月开业，四大公司中最晚也最新，装了中国第一部商用自动扶梯，营业面积冠绝全市。',
        chapterRef: 'republic-c1',
      },
      prc: {
        name: '上海市第一百货商店',
        story: '1953 年改为上海市第一百货商店，「中百一店」是几代人凭票购物、排队抢购的共同记忆。',
        chapterRef: 'prc-c1',
      },
      now: {
        name: '第一百货商业中心',
        story: '老楼与新楼由连廊相接，「一百」的名字留了下来，成了南京东路西端的坐标。',
      },
    },
  },
  {
    id: 'peace-hotel',
    name: '和平饭店',
    lng: 121.4866,
    lat: 31.2405,
    kind: 'building',
    priority: 2,
    eraStates: {
      republic: {
        name: '沙逊大厦·华懋饭店',
        story: '1929 年落成，维克多·沙逊以此为其地产帝国的招牌，绿色金字塔顶、装饰艺术内饰，是当时外滩最高的楼。',
        chapterRef: 'republic-c2',
      },
      prc: {
        name: '和平饭店',
        story: '1956 年改称和平饭店，老年爵士乐队从这里开始演奏，一直演到成为这座城市的固定节目。',
        chapterRef: 'prc-c2',
      },
      now: {
        name: '和平饭店',
        story: '2007—2010 年整体修缮后重新开业，绿色塔尖仍是从外滩任何角度都能一眼认出的轮廓。',
      },
    },
  },
  {
    id: 'customs-house',
    name: '江海关',
    lng: 121.4855,
    lat: 31.2372,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      concession: {
        name: '江海北关',
        story: '1845 年在此设江海北关办理夷船关税，1857 年建中式关署，1893 年改建为带尖顶钟楼的西式建筑。',
        chapterRef: 'concession-c2',
      },
      republic: {
        name: '江海关大楼',
        story: '1927 年新楼落成，顶部大钟由英国制造，每刻鸣钟报时——那是外滩上最准的时间。',
        chapterRef: 'republic-c2',
      },
      now: {
        name: '上海海关大楼',
        story: '钟声几经更换曲调，1986 年后恢复整点报时，至今仍是外滩的听觉标志。',
      },
    },
  },
  {
    id: 'hsbc',
    name: '汇丰银行大楼',
    lng: 121.4853,
    lat: 31.2365,
    kind: 'building',
    priority: 3,
    eraStates: {
      concession: {
        name: '汇丰银行',
        story: '1865 年汇丰在上海设分行，很快成为外滩金融的中枢，各国洋行的汇兑几乎都要经它的账。',
      },
      republic: {
        name: '汇丰银行大楼（铜狮）',
        story: '1923 年新楼落成，号称「从苏伊士运河到白令海峡最讲究的建筑」，门前一对铜狮成了外滩最出名的守门人。',
        chapterRef: 'concession-legend-lions',
        legend: true,
      },
      prc: {
        name: '上海市人民政府大楼',
        story: '1955 年起市人民政府在此办公近四十年，穹顶的马赛克壁画曾被吊顶封住，反而躲过了损毁。',
        chapterRef: 'prc-c2',
      },
      now: {
        name: '浦发银行大楼',
        story: '1997 年起由浦东发展银行使用，八角门厅的壁画修复后重见天日；门前铜狮为复制品，原件藏上海市历史博物馆。',
      },
    },
  },
  {
    id: 'waibaidu',
    name: '外白渡桥',
    lng: 121.487,
    lat: 31.244,
    kind: 'landmark',
    priority: 3,
    eraStates: {
      'pre-1843': {
        name: '苏州河口摆渡',
        story: '苏州河汇入黄浦江之处原本只有摆渡船，两岸往来全靠艄公，渡口即后来桥址所在。',
      },
      concession: {
        name: '韦尔斯桥·花园桥',
        story: '1856 年英商建木桥收取过桥费，华人不服；1873 年工部局另建免费木桥，因「白渡」（不付钱过渡）得名外白渡桥。',
        chapterRef: 'concession-c2',
      },
      republic: {
        name: '外白渡桥',
        story: '1907 年落成的钢桁架桥沿用至今，桥上电车叮当，桥下船只往来，是老照片里出现频率最高的构图。',
      },
      now: {
        name: '外白渡桥',
        story: '2008 年整体移走大修、次年归位，钢梁上的铆钉与百年前一样，晚间亮灯后成为外滩北端的门户。',
      },
    },
  },
]

export default SHANGHAI_POIS
