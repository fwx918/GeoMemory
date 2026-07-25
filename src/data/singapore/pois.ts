import type { Poi } from '../../types'

// ============================================================================
// 新加坡丹戎巴葛共享 POI 表：坐标为真实经纬度（丹戎巴葛—牛车水—新加坡河一线）。
// eraStates 记录同一地点在不同时代的称呼与故事（如丹戎巴葛：开埠前「插桩海角」
// → 殖民地「深水码头」→ 当代「CBD」）。
// 时代 key 必须与 singapore.ts 的 timeline 一致：
//   now / nation / showa / colonial / kampong
// ============================================================================

export const SINGAPORE_POIS: Poi[] = [
  // ------------------------------------------------ 跨时代锚点
  {
    id: 'tanjong-pagar',
    name: '丹戎巴葛',
    lng: 103.844,
    lat: 1.276,
    kind: 'landmark',
    priority: 1,
    eraStates: {
      kampong: {
        name: '插桩海角',
        story: '马来语 Tanjong Pagar 意为「插了桩的海角」，相传渔民在近岸插竹桩围捕鱼群；岸上是露兜树与红树林，岸后是槟榔与甘蜜园。',
        chapterRef: 'kampong-c2',
      },
      colonial: {
        name: '丹戎巴葛（深水码头）',
        story: '1864 年丹戎巴葛码头公司成立，沿海角一线开出深水泊位与船坞，蒸汽轮船在此加煤补给，海角变成了港区。',
        chapterRef: 'colonial-c2',
      },
      showa: {
        name: '丹戎巴葛（港区）',
        story: '战时港区与铁路总站均受管制，战后码头修复重开，粮食与物资从这里进出，货栈与店屋在瓦砾间恢复营业。',
        chapterRef: 'showa-c2',
      },
      nation: {
        name: '丹戎巴葛（集装箱码头）',
        story: '1972 年东南亚第一座集装箱码头在此启用，吊桥式岸桥取代了苦力的肩膀，港口吞吐量此后一路攀升。',
        chapterRef: 'nation-c1',
      },
      now: {
        name: '丹戎巴葛（CBD）',
        story: '码头功能陆续西迁大士，原址纳入「大南部滨水区」规划；地面之上是中央商务区的楼群与保育店屋并立。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'keppel-harbour',
    name: '吉宝港',
    lng: 103.83,
    lat: 1.266,
    kind: 'water',
    priority: 2,
    eraStates: {
      kampong: {
        name: '海峡水道',
        story: '本岛与圣淘沙之间的天然深水水道，两岸红树林密布，马来船只与渔舟借潮进出，早年海图上只是一条无名的窄峡。',
        chapterRef: 'kampong-c1',
      },
      colonial: {
        name: '新港（New Harbour）',
        story: '深度与遮蔽俱佳，1840 年代起取代新加坡河口成为大船锚地；1900 年为纪念勘测者亨利·吉宝改名吉宝港。',
        chapterRef: 'colonial-c2',
      },
      showa: {
        name: '吉宝港',
        story: '船坞与仓库在战时受损，1945 年后由港务当局逐段修复，重新承担起转口贸易的吞吐。',
        chapterRef: 'showa-c2',
      },
      nation: {
        name: '吉宝船厂与码头',
        story: '1968 年吉宝船厂成立，修造船与集装箱作业并行，成为独立初期最重要的工业与就业来源之一。',
        chapterRef: 'nation-c1',
      },
    },
  },
  {
    id: 'telok-ayer',
    name: '直落亚逸',
    lng: 103.847,
    lat: 1.2795,
    kind: 'water',
    priority: 2,
    eraStates: {
      kampong: {
        name: '直落亚逸湾',
        story: '马来语 Telok Ayer 意为「水湾」。这道浅湾曾直抵今日的直落亚逸街，是登岸最方便的一处滩头。',
        chapterRef: 'kampong-c3',
      },
      colonial: {
        name: '直落亚逸街（华人区）',
        story: '1822 年市镇规划把此处划给华人，福建移民下船即在街上落脚，会馆、庙宇与货栈沿海岸一字排开。',
        chapterRef: 'colonial-c1',
      },
      now: {
        name: '直落亚逸街',
        story: '1880 年代填海后海水退去近千米，昔日的海岸线成了一条内街，路名却把那道水湾留了下来。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'thian-hock-keng',
    name: '天福宫',
    lng: 103.8478,
    lat: 1.2808,
    kind: 'temple',
    priority: 2,
    eraStates: {
      colonial: {
        name: '天福宫',
        story: '1839—1842 年由福建帮众建于直落亚逸街，供奉妈祖。当年庙门正对海面，平安渡海的人上岸第一件事就是来还愿。',
        chapterRef: 'colonial-c3',
      },
      showa: {
        name: '天福宫',
        story: '战时香火未断，庙内曾为周边居民提供暂避之所；建筑本体大体完好地留到了战后。',
        chapterRef: 'showa-c1',
      },
      now: {
        name: '天福宫（国家古迹）',
        story: '1973 年列为国家古迹，2000 年代大修获联合国教科文组织亚太文化遗产奖；庙前早已不见海。',
      },
    },
  },
  {
    id: 'chinatown',
    name: '牛车水',
    lng: 103.844,
    lat: 1.283,
    kind: 'village',
    priority: 1,
    eraStates: {
      colonial: {
        name: '牛车水',
        story: '因居民以牛车自安祥山泉眼载水贩卖而得名。移民按方言分片聚居，一间店屋常住数十人，是全岛最拥挤的地方。',
        chapterRef: 'colonial-c3',
      },
      showa: {
        name: '牛车水',
        story: '战时物资短缺、粮食配给，居民靠黑市与自种度日；街市在停业与复业之间反复。',
        chapterRef: 'showa-c1',
      },
      nation: {
        name: '牛车水',
        story: '街边摊贩陆续迁入新建的小贩中心，大批住户搬入组屋，拥挤的板间房时代告一段落。',
        chapterRef: 'nation-c2',
      },
      now: {
        name: '牛车水',
        story: '店屋修复后成为保育区与旅游区，庙宇、老字号与新开的咖啡馆共用同一条五脚基。',
      },
    },
  },

  // ------------------------------------------------ 开埠前后
  {
    id: 'fort-canning',
    name: '福康宁山',
    lng: 103.8465,
    lat: 1.2937,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      kampong: {
        name: '禁山（旧王城）',
        story: '十四世纪淡马锡的宫室与土垣即在此山，山上有古墓与土沟遗迹，马来人称之为「禁山」，寻常人不敢上。',
        chapterRef: 'kampong-c1',
      },
      colonial: {
        name: '福康宁山',
        story: '莱佛士在山上建起自己的住所，后改为总督府；1860 年代筑炮台，山名取自当时的印度总督康宁。',
        chapterRef: 'colonial-c1',
      },
      showa: {
        name: '福康宁山',
        story: '山腹中的英军指挥所（今「战争碉堡」）是 1942 年 2 月决定投降的会议地点，如今辟为纪念展馆。',
        chapterRef: 'showa-c1',
      },
      now: {
        name: '福康宁公园',
        story: '考古发掘出十四世纪的陶瓷与金饰，证实此地曾有一座早于开埠五百年的城；山顶如今是音乐节的草坪。',
      },
    },
  },
  {
    id: 'raffles-landing',
    name: '莱佛士登陆点',
    lng: 103.8517,
    lat: 1.2879,
    kind: 'landmark',
    priority: 2,
    eraStates: {
      kampong: {
        name: '新加坡河口',
        story: '1819 年 1 月末莱佛士一行在此登岸，河口一带住着天猛公治下的马来与海人聚落，约百余户。',
        chapterRef: 'kampong-c3',
      },
      colonial: {
        name: '驳船码头（Boat Quay）',
        story: '河南岸自 1822 年起填土整治，货栈沿河排开，全岛四分之三的转口货物在此起卸，舯舽船首尾相接。',
        chapterRef: 'colonial-c1',
      },
      now: {
        name: '莱佛士登陆点',
        story: '白色雕像立于北岸，是 1972 年依原有铜像翻制的纪念性标记；对岸的老货栈已改成餐厅。',
      },
    },
  },

  // ------------------------------------------------ 殖民地港埠
  {
    id: 'tanjong-pagar-station',
    name: '丹戎巴葛火车站',
    lng: 103.8368,
    lat: 1.2725,
    kind: 'transit',
    priority: 1,
    eraStates: {
      colonial: {
        name: '丹戎巴葛火车站',
        story: '1932 年启用，取代旧的直落布兰雅总站，是马来亚铁路南端终点；正立面四尊石像分别象征农业、商业、运输与工业。',
        chapterRef: 'colonial-c2',
      },
      showa: {
        name: '丹戎巴葛火车站',
        story: '战时铁路由日军管理，客运一度停顿；1945 年后恢复运行，成为往返马来亚的主要通道。',
        chapterRef: 'showa-c2',
      },
      nation: {
        name: '丹戎巴葛火车站',
        story: '独立后车站与铁路用地仍归马来亚铁道公司管理，站内的马来亚地名牌与新加坡的国界并不重合。',
        chapterRef: 'nation-c2',
      },
      now: {
        name: '丹戎巴葛火车站（国家古迹）',
        story: '2011 年 6 月 30 日末班车驶离，次日起总站北迁兀兰；车站同年列为国家古迹，站台与钟仍在原处。',
        chapterRef: 'now-c2',
      },
    },
  },
  {
    id: 'duxton-shophouse',
    name: '达士敦店屋区',
    lng: 103.8435,
    lat: 1.2795,
    kind: 'building',
    priority: 3,
    eraStates: {
      colonial: {
        name: '店屋与客栈',
        story: '码头工人与新客聚居于此，一栋两三层的店屋楼下开铺、楼上以木板隔成床位，一间房住十余人是常态。',
        chapterRef: 'colonial-c3',
      },
      nation: {
        name: '待拆的老屋',
        story: '住户陆续迁往组屋，空置的店屋一度被列入重建范围，「拆」与「留」在七八十年代反复争论。',
        chapterRef: 'nation-c2',
      },
      now: {
        name: '丹戎巴葛保育区',
        story: '1989 年划为保育区，是全国最早成片修复的店屋群；如今底层是餐厅酒吧，立面上的通风孔与瓷砖依旧。',
        chapterRef: 'now-c2',
      },
    },
  },
  {
    id: 'clifford-pier',
    name: '红灯码头',
    lng: 103.8535,
    lat: 1.2853,
    kind: 'transit',
    priority: 3,
    eraStates: {
      colonial: {
        name: '红灯码头（Clifford Pier）',
        story: '1933 年启用，因夜间悬挂红灯为舟人指路，华人径称「红灯码头」，是旅客与新客登岸的第一站。',
        chapterRef: 'colonial-c2',
      },
      nation: {
        name: '红灯码头',
        story: '大船改靠深水码头后，这里主要供驳船、渡轮与小贩艇使用，海面上仍泊着卖食物的舢板。',
        chapterRef: 'nation-c1',
      },
      now: {
        name: '红灯码头（滨海湾内）',
        story: '2006 年停用，其后修复为餐饮场所；因下游筑起滨海堤坝，它面对的已不是海，而是一座淡水湖。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'raffles-place',
    name: '莱佛士坊',
    lng: 103.8514,
    lat: 1.2839,
    kind: 'building',
    priority: 2,
    eraStates: {
      colonial: {
        name: '商业广场（Commercial Square）',
        story: '1822 年规划中的欧人商业区，1858 年改名莱佛士坊；洋行、银行与保险公司围着中央花园排列。',
        chapterRef: 'colonial-c1',
      },
      showa: {
        name: '莱佛士坊',
        story: '占领期间商行改换招牌、街名一度改用日文；1945 年后原有商号陆续复业。',
        chapterRef: 'showa-c1',
      },
      now: {
        name: '莱佛士坊',
        story: '中央花园之下是 1987 年通车的地铁站，地面楼群一再拔高，广场的形状却还是 1822 年图纸上的那个方块。',
      },
    },
  },
  {
    id: 'clarke-quay',
    name: '克拉码头',
    lng: 103.8465,
    lat: 1.2907,
    kind: 'transit',
    priority: 3,
    eraStates: {
      colonial: {
        name: '克拉码头',
        story: '新加坡河中游的货栈区，以海峡殖民地总督安德鲁·克拉命名，胡椒、树胶与锡在此上落。',
        chapterRef: 'colonial-c1',
      },
      nation: {
        name: '清河之前的克拉码头',
        story: '河水因作业与居住污染严重，1977 年起推动十年「清河计划」，舯舽船与河上人家陆续迁离。',
        chapterRef: 'nation-c2',
      },
      now: {
        name: '克拉码头',
        story: '1993 年起改造为餐饮娱乐区，老货栈刷成彩色；河水清了，运货的船换成了游河的船。',
      },
    },
  },
  {
    id: 'tanjong-pagar-mrt',
    name: '丹戎巴葛地铁站',
    lng: 103.8459,
    lat: 1.2765,
    kind: 'transit',
    priority: 3,
    eraStates: {
      nation: {
        name: '地铁工地',
        story: '1983 年地铁动工，市中心路段以明挖回填施工，街面围板一竖数年，沿街店屋在尘土中照常营业。',
        chapterRef: 'nation-c2',
      },
      now: {
        name: '丹戎巴葛地铁站',
        story: '1987 年 12 月随东西线市区段启用，出口直通写字楼群，早高峰的人流是这一带最准时的潮汐。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'marina-bay',
    name: '滨海湾',
    lng: 103.8607,
    lat: 1.2834,
    kind: 'water',
    priority: 2,
    eraStates: {
      kampong: {
        name: '外海与滩涂',
        story: '此处尚在海中，是船只候潮与下锚的水面，岸线远在今日的直落亚逸街一带。',
        chapterRef: 'kampong-c2',
      },
      nation: {
        name: '填海工地',
        story: '1970 年代起自海中吹填造地，滨海南与滨海中心区在十余年间从海图上「长」了出来。',
        chapterRef: 'nation-c1',
      },
      now: {
        name: '滨海湾',
        story: '2008 年滨海堤坝合龙，海湾变成蓄水的淡水湖；2010 年金沙开业，天际线上多了三座塔与一条船。',
        chapterRef: 'now-c1',
      },
    },
  },
]

export default SINGAPORE_POIS
