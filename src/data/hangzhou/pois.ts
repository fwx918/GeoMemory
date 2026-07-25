import type { Poi } from '../../types'

// ============================================================================
// 杭州共享 POI 表：坐标为真实经纬度；eraStates 记录同一地点在不同时代的
// 称呼与故事（如雷峰塔：吴越「皇妃塔」→ 民国「塔倒」→ 当代「雷峰新塔」）。
// 章节段落用 poiRefs 引用这里的 id，滚动时驱动地图高亮。
// ============================================================================

export const HANGZHOU_POIS: Poi[] = [
  // ------------------------------------------------ 跨时代锚点
  {
    id: 'leifeng',
    name: '雷峰塔',
    lng: 120.1489,
    lat: 30.2313,
    kind: 'landmark',
    priority: 1,
    eraStates: {
      wuyue: {
        name: '皇妃塔',
        story: '977 年吴越末代国王钱俶建塔供奉「佛螺髻发」，初名皇妃塔，因建在雷峰之上，民间径呼雷峰塔。次年他便纳土归宋。',
        chapterRef: 'wuyue-c3',
      },
      'south-song': {
        name: '雷峰塔',
        story: '南宋画院题「雷峰夕照」为西湖十景之一。塔影落日成为临安人共同的黄昏记忆。',
        chapterRef: 'south-song-c3',
      },
      qing: { name: '雷峰塔', story: '清代塔身木檐尽毁，只剩赭红砖芯，反而被文人赞为「老衲」，与保俶塔「美人」相对，有「雷峰如老衲，保俶如美人」之说。' },
      republic: {
        name: '雷峰塔（1924 倒塌）',
        story: '塔砖被乡民盗挖（传可辟邪养蚕），1924 年 9 月 25 日下午轰然倒塌。砖孔中发现吴越刻本《宝箧印陀罗尼经》。',
        chapterRef: 'republic-c1',
      },
      prc: { name: '雷峰塔遗址', story: '倒塌后废墟沉睡近八十年，「雷峰夕照」成了西湖十景中唯一缺席的一景。' },
      now: {
        name: '雷峰新塔',
        story: '2002 年新塔落成，以钢结构罩护吴越塔基遗址，游人可下到地宫层看见 977 年的砖石。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'fenghuang-hill',
    name: '凤凰山',
    lng: 120.161,
    lat: 30.226,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      sui: { name: '隋州治', story: '591 年杨素移州治于此，依山筑周三十六里州城——此后近千年，凤凰山下始终是杭州的政治中心。', chapterRef: 'sui-c1' },
      'south-song': { name: '南宋皇城', story: '1138 年宋室在此圈占皇城，北起凤山门，方圆九里。今日馒头山一带的坡地下仍埋着大内的柱础。', chapterRef: 'south-song-c1' },
      now: { name: '凤凰山（皇城遗址）', story: '南宋皇城遗址已列入考古遗址公园规划，山间尚存南宋摩崖与御道残石。' },
    },
  },
  {
    id: 'gushan',
    name: '孤山',
    lng: 120.142,
    lat: 30.254,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      tang: { name: '孤山', story: '白居易任内常至孤山，《钱塘湖春行》「孤山寺北贾亭西」即写此处，是唐代文人游湖的起点。', chapterRef: 'tang-c2' },
      'north-song': { name: '孤山（林逋隐居）', story: '北宋林逋隐居孤山二十年不仕不娶，种梅养鹤，人称「梅妻鹤子」。' },
      qing: { name: '孤山行宫', story: '康熙、乾隆南巡在此建行宫，后又建文澜阁贮《四库全书》，孤山成了皇家与士林共享的书山。', chapterRef: 'qing-c2' },
      republic: { name: '国立艺专', story: '1928 年林风眠在孤山罗苑创办国立艺术院，中国第一所综合性高等艺术学府在湖边诞生。' },
    },
  },

  // ------------------------------------------------ 秦汉六朝
  { id: 'baoshi-hill', name: '宝石山', lng: 120.145, lat: 30.2585, kind: 'landmark', priority: 2,
    eraStates: {
      'qin-six': { name: '宝石山（古岬角）', story: '西湖还是海湾时，宝石山是伸入水中的北岬角。山上「大佛头」石被附会为秦始皇东巡的缆船石。', chapterRef: 'qin-six-c1' },
      wuyue: { name: '保俶塔所在', story: '吴越时塔立山巅，此后历代重修，成为北岸天际线的标志。' },
    } },
  { id: 'wushan', name: '吴山', lng: 120.1637, lat: 30.2408, kind: 'landmark', priority: 2,
    eraStates: {
      'qin-six': { name: '吴山（古岬角）', story: '与宝石山相对的南岬角。两山之间的水面淤塞封口后，海湾才变成了潟湖。', chapterRef: 'qin-six-c1' },
      'yuan-ming': { name: '吴山（于谦读书处）', story: '少年于谦在吴山三茅观读书，写下《石灰吟》：「粉骨碎身浑不怕，要留清白在人间。」', chapterRef: 'yuan-ming-c3' },
    } },
  { id: 'lingyin', name: '灵隐寺', lng: 120.1009, lat: 30.2419, kind: 'temple', priority: 1,
    eraStates: {
      'qin-six': { name: '灵隐寺', story: '326 年印度僧人慧理登北高峰南麓，叹「不知何以飞来」，建灵隐寺——杭州佛教自此开山。', chapterRef: 'qin-six-c2' },
      'south-song': { name: '灵隐寺（济公出家处）', story: '南宋僧人道济在此出家，破帽敝衣、饮酒食肉却屡屡济人于危，民间称他「济公」。', chapterRef: 'south-song-legend-jigong', legend: true },
    } },
  { id: 'feilai', name: '飞来峰', lng: 120.1024, lat: 30.2408, kind: 'temple', priority: 2,
    eraStates: {
      'qin-six': { name: '飞来峰', story: '因慧理「此乃中天竺国灵鹫山之小岭，不知何以飞来」一语得名。' },
      'yuan-ming': { name: '飞来峰造像', story: '元代江南释教总统杨琏真迦在此主持开凿大批藏传佛教风格造像——艺术价值极高，来历却沾着盗掘宋陵的血。', chapterRef: 'yuan-ming-c1' },
    } },

  // ------------------------------------------------ 隋唐
  { id: 'grand-canal-end', name: '运河南端', lng: 120.152, lat: 30.285, kind: 'transit', priority: 2,
    eraStates: {
      sui: { name: '江南运河南端', story: '610 年江南运河凿通，京口至余杭八百余里。运河的南端点落在杭州，小州城从此成为南北水运枢纽。', chapterRef: 'sui-c2' },
      republic: { name: '拱宸桥漕运', story: '铁路兴起前，运河仍是杭州的生命线，拱宸桥一带米市、丝行云集。' },
    } },
  { id: 'liupu', name: '柳浦渡', lng: 120.1668, lat: 30.2205, kind: 'transit', priority: 3,
    eraStates: { sui: { name: '柳浦', story: '钱塘江北岸的古渡口，隋代州治即迁至「柳浦西」，江船在此换乘入城。' } } },
  { id: 'xiangguo-well', name: '相国井', lng: 120.162, lat: 30.2489, kind: 'water', priority: 3, coordUnverified: true,
    eraStates: {
      tang: { name: '六井', story: '贞元年间刺史李泌开六井，用暗渠把西湖淡水引进咸卤的城区——杭州人第一次喝上湖水，城市重心开始向湖边聚拢。', chapterRef: 'tang-c1' },
    } },
  { id: 'baidi', name: '白堤', lng: 120.148, lat: 30.257, kind: 'landmark', priority: 1,
    eraStates: {
      tang: { name: '白沙堤', story: '白居易写「绿杨阴里白沙堤」时，这条堤已经存在；他真正修的白公堤在钱塘门外，早已湮没。杭州人把纪念给了这一条。', chapterRef: 'tang-c3' },
      now: { name: '白堤', story: '断桥—锦带桥—平湖秋月，一线穿湖，是今天游人最密的一公里。' },
    } },
  { id: 'duanqiao', name: '断桥', lng: 120.1517, lat: 30.2587, kind: 'landmark', priority: 1,
    eraStates: {
      tang: { name: '断桥', story: '唐代已名「断桥」，张祜诗中可见。名字来历一说雪后桥面阳融阴积、望之若断。' },
      'south-song': { name: '断桥残雪', story: '南宋画院题「断桥残雪」入西湖十景。雪霁初晴，桥阴犹白，远望如断。', chapterRef: 'south-song-c3' },
      qing: { name: '断桥（白蛇借伞处）', story: '《白娘子永镇雷峰塔》里，白娘子与许仙在此借伞定情——断桥从此不只是雪景。', chapterRef: 'qing-legend-baishe', legend: true },
    } },

  // ------------------------------------------------ 吴越
  { id: 'baochu', name: '保俶塔', lng: 120.1456, lat: 30.2593, kind: 'landmark', priority: 1,
    eraStates: {
      wuyue: { name: '保俶塔', story: '相传为吴越臣民祈祷入朝的国王钱俶平安归来而建，故名「保俶」。塔身纤秀，立宝石山巅。', chapterRef: 'wuyue-c3' },
      now: { name: '保俶塔', story: '现存塔为 1933 年按旧制重修，仍是北岸的天际线标志。' },
    } },
  { id: 'liuhe', name: '六和塔', lng: 120.1319, lat: 30.1997, kind: 'landmark', priority: 2,
    eraStates: {
      wuyue: { name: '六和塔', story: '970 年吴越王命延寿禅师建塔于月轮山，以镇钱塘江潮。塔灯彻夜，也为江船指路。', chapterRef: 'wuyue-c2' },
    } },
  { id: 'jingci', name: '净慈寺', lng: 120.1476, lat: 30.23, kind: 'temple', priority: 2,
    eraStates: {
      wuyue: { name: '慧日永明院', story: '954 年吴越王为延寿禅师建，即净慈寺前身。「南屏晚钟」的钟声自此响起。', chapterRef: 'wuyue-c2' },
      'south-song': { name: '净慈寺（济公圆寂处）', story: '济公在此圆寂。传说净慈寺重建缺木料，他醉酒作法，木头一根根从寺中古井里涌出。', chapterRef: 'south-song-legend-jigong', legend: true },
    } },
  { id: 'seawall', name: '捍海石塘', lng: 120.155, lat: 30.208, kind: 'water', priority: 2,
    eraStates: {
      wuyue: { name: '捍海石塘', story: '910 年钱镠「石囤木桩」筑塘，压住年年毁田的钱塘江潮。民间尊他「海龙王」，传说他曾命弓弩手射潮。', chapterRef: 'wuyue-c1' },
    } },

  // ------------------------------------------------ 两宋
  { id: 'sudi', name: '苏堤', lng: 120.133, lat: 30.241, kind: 'landmark', priority: 1,
    eraStates: {
      'north-song': { name: '苏公堤', story: '1090 年苏轼疏浚西湖，挖出的葑泥无处可堆，索性纵贯南北筑成长堤，上建六桥、遍植芙蓉杨柳。杭人呼为「苏公堤」。', chapterRef: 'north-song-c2' },
      now: { name: '苏堤', story: '「苏堤春晓」居西湖十景之首。你脚下的堤，仍是九百多年前那一条。' },
    } },
  { id: 'santan', name: '三潭印月', lng: 120.1435, lat: 30.2382, kind: 'water', priority: 1,
    eraStates: {
      'north-song': { name: '三塔（禁菱标）', story: '苏轼在湖中立三座小石塔，塔内水域禁种菱芡，以防淤积——这是最早的「湖面管理」标志。', chapterRef: 'north-song-c2' },
      'yuan-ming': { name: '三潭印月', story: '今天的三座石塔为明代重立。月夜塔中点烛，纸糊塔孔，湖面便浮起许多个月亮。' },
    } },
  { id: 'imperial-city', name: '南宋皇城', lng: 120.163, lat: 30.223, kind: 'landmark', priority: 1,
    eraStates: {
      'south-song': { name: '南宋皇城', story: '皇城依凤凰山东麓而建，北门和宁门外即御街。宫室因山就势，与汴京的方正格局完全不同。', chapterRef: 'south-song-c1' },
    } },
  { id: 'yujie', name: '御街', lng: 120.169, lat: 30.244, kind: 'transit', priority: 2,
    eraStates: {
      'south-song': { name: '御街（天街）', story: '自和宁门直通城北，长约四千二百米，铺石板万余块。皇帝「四孟驾出」祭天走这条路，平日则是临安最繁华的商街。', chapterRef: 'south-song-c2' },
      now: { name: '中山中路', story: '南宋御街的今名。地下考古已揭出宋、元、明、清各代路面层层相叠。' },
    } },
  { id: 'yuefei', name: '岳飞墓', lng: 120.1387, lat: 30.2559, kind: 'landmark', priority: 1,
    eraStates: {
      'south-song': { name: '岳飞墓', story: '1142 年除夕，岳飞以「莫须有」罪名死于大理寺。二十年后平反，改葬栖霞岭下，墓前四具铁跪像至今受人唾骂。', chapterRef: 'south-song-c4' },
    } },
  { id: 'changqiao', name: '长桥', lng: 120.1523, lat: 30.2286, kind: 'landmark', priority: 3,
    eraStates: {
      'yuan-ming': { name: '长桥（梁祝送别处）', story: '传说梁山伯与祝英台在此十八相送，你送我一程、我送你一程，「长桥不长情意长」。', chapterRef: 'yuan-ming-legend-liangzhu', legend: true },
    } },

  // ------------------------------------------------ 元明清
  { id: 'yanggong', name: '杨公堤', lng: 120.125, lat: 30.24, kind: 'landmark', priority: 2,
    eraStates: {
      'yuan-ming': { name: '杨公堤', story: '1508 年知州杨孟瑛力排「湖田既成岂可复毁」的反对，役工数百万浚湖，挖出的泥筑成西侧长堤。', chapterRef: 'yuan-ming-c2' },
      now: { name: '杨公堤', story: '2003 年「西湖西进」恢复堤西水域，茅家埠一带重新有了水。' },
    } },
  { id: 'yuqian', name: '于谦墓', lng: 120.1265, lat: 30.229, kind: 'landmark', priority: 3, coordUnverified: true,
    eraStates: {
      'yuan-ming': { name: '于谦墓', story: '北京保卫战的统帅、杭州人于谦，1457 年冤死，归葬三台山。「赖于岳于双少保，人间始觉重西湖。」', chapterRef: 'yuan-ming-c3' },
    } },
  { id: 'huxinting', name: '湖心亭', lng: 120.1447, lat: 30.2455, kind: 'landmark', priority: 2,
    eraStates: {
      'yuan-ming': { name: '湖心亭', story: '明人张岱雪夜独往湖心亭看雪，「天与云与山与水，上下一白」，写成《湖心亭看雪》。' },
    } },
  { id: 'xinggong', name: '清行宫', lng: 120.142, lat: 30.2545, kind: 'building', priority: 3,
    eraStates: {
      qing: { name: '孤山行宫', story: '康熙南巡驻跸，乾隆六下江南次次入住。皇帝的西湖与百姓的西湖，在孤山这一角短暂重叠。', chapterRef: 'qing-c2' },
    } },
  { id: 'wenlan', name: '文澜阁', lng: 120.1428, lat: 30.2537, kind: 'building', priority: 2,
    eraStates: {
      qing: { name: '文澜阁', story: '1782 年建阁贮《四库全书》，江南三阁之一。太平天国战乱中书散，藏书家丁申、丁丙兄弟冒险收拾残帙。', chapterRef: 'qing-c3' },
    } },
  { id: 'quyuan', name: '曲院风荷', lng: 120.131, lat: 30.2495, kind: 'water', priority: 3,
    eraStates: { qing: { name: '曲院风荷', story: '1699 年康熙题西湖十景，把南宋的「麯院荷风」改作「曲院风荷」——御笔一落，景名就定了三百年。', chapterRef: 'qing-c1' } } },
  { id: 'huagang', name: '花港观鱼', lng: 120.1325, lat: 30.2325, kind: 'water', priority: 2,
    eraStates: {
      qing: { name: '花港观鱼', story: '康熙题名立碑，乾隆又赋诗刻于碑阴，祖孙两代同刻一石。' },
      prc: { name: '花港观鱼公园', story: '1952 年起园林学家孙筱祥主持扩建，从一亭一池变成二十余公顷的大公园，成了新中国造园的教科书。', chapterRef: 'prc-c2' },
    } },
  { id: 'longjing', name: '龙井村', lng: 120.116, lat: 30.221, kind: 'village', priority: 3,
    eraStates: {
      'north-song': { name: '龙井', story: '北宋时龙井一带已有僧人种茶，苏轼与上天竺高僧辩才在此往还，留下「过溪亭」的典故。' },
      qing: { name: '龙井御茶', story: '乾隆游龙井，封胡公庙前十八棵茶树为「御茶」——龙井茶的名声自此传遍天下。' },
    } },

  // ------------------------------------------------ 民国以后
  { id: 'hubin', name: '湖滨', lng: 120.157, lat: 30.253, kind: 'building', priority: 2,
    eraStates: {
      republic: { name: '湖滨新市场', story: '1911 年拆旗营城墙，湖与城之间最后一道墙没了。旧址辟为湖滨新市场，杭州第一次真正面湖而居。', chapterRef: 'republic-c2' },
      now: { name: '湖滨步行街', story: '今天的湖滨仍是杭州最热闹的湖岸，音乐喷泉夜夜开演。' },
    } },
  { id: 'qiujin', name: '秋瑾墓', lng: 120.1398, lat: 30.2565, kind: 'landmark', priority: 3,
    eraStates: { republic: { name: '秋瑾墓', story: '「鉴湖女侠」1907 年就义，遗愿「埋骨西泠」。墓几经迁徙，今在西泠桥畔。', chapterRef: 'republic-c3' } } },
  { id: 'chengzhan', name: '城站', lng: 120.18, lat: 30.245, kind: 'transit', priority: 3,
    eraStates: { republic: { name: '城站（沪杭铁路）', story: '1909 年沪杭铁路通车，火车开进城墙脚下。运河千年的水运优势，从此让位于铁轨。', chapterRef: 'republic-c2' } } },
  { id: 'hupao', name: '虎跑', lng: 120.1273, lat: 30.2094, kind: 'temple', priority: 3,
    eraStates: { republic: { name: '虎跑定慧寺', story: '1918 年李叔同在此剃度出家，法号弘一。「长亭外，古道边」的作者从此断了红尘。', chapterRef: 'republic-c3' } } },
  { id: 'xiling', name: '西泠桥', lng: 120.14, lat: 30.2568, kind: 'landmark', priority: 3,
    eraStates: {
      'qin-six': { name: '西泠桥（苏小小）', story: '南齐钱塘名妓苏小小「妾乘油壁车，郎骑青骢马；何处结同心，西陵松柏下」。其人是否实有已不可考。', chapterRef: 'qin-six-legend-suxiaoxiao', legend: true },
    } },
  { id: 'taiziwan', name: '太子湾公园', lng: 120.1425, lat: 30.227, kind: 'water', priority: 3, coordUnverified: true,
    eraStates: { prc: { name: '太子湾公园', story: '1988 年建成，用的正是当年疏浚西湖挖出的湖泥填出的地基。樱花与郁金香成了杭州春天的固定节目。', chapterRef: 'prc-c3' } } },
  { id: 'longxiang', name: '龙翔桥地铁站', lng: 120.161, lat: 30.257, kind: 'transit', priority: 2,
    eraStates: { now: { name: '龙翔桥站', story: '地铁 1 号线站，出站步行三分钟即到湖边——「刷卡到西湖」是这一代杭州人的日常。', chapterRef: 'now-c2' } } },
  { id: 'maojiabu', name: '茅家埠', lng: 120.121, lat: 30.24, kind: 'water', priority: 3, coordUnverified: true,
    eraStates: { now: { name: '茅家埠（西湖西进）', story: '2003 年「西湖西进」恢复的水域，明代以后湮塞成田的湖西，五百年后重新有了水。', chapterRef: 'now-c2' } } },
]

export const POI_BY_ID: Record<string, Poi> = Object.fromEntries(
  HANGZHOU_POIS.map((p) => [p.id, p]),
)
