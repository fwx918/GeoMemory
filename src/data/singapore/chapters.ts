import type { Chapter } from '../../types'

// ============================================================================
// 新加坡丹戎巴葛章节：开埠前后 / 海峡殖民地 / 昭南时期 / 建国后 / 当代
// 章节 id 与 pois.ts 的 chapterRef 一一对应，勿改。
// 昭南时期（showa-*）取克制笔法：只记史实进程，不渲染暴行细节。
// ============================================================================

export const KAMPONG_CHAPTERS: Chapter[] = [
  {
    id: 'kampong-c1',
    title: '淡马锡：开埠前五百年就有过一座城',
    yearRange: [1300, 1400],
    circa: true,
    layer: 'history',
    paragraphs: [
      {
        id: 'kampong-c1-p1',
        kind: 'fact',
        text: '元代泉州人汪大渊随商船南下，在《岛夷志略》里记下「龙牙门」与「单马锡」两处地名，说当地人「男女兼中国人居之」，又说此地扼守水道、舟舶往来必经。这大约是十四世纪中叶的见闻。同一时期的爪哇与马来文献也提到过一个叫 Temasek 的港埠——「淡马锡」在马来语里与「海」同源，意思大致是「水边之地」。',
        note: '考：《岛夷志略》所记「单马锡」「龙牙门」是否即今新加坡岛与吉宝海峡，学界尚有不同意见。',
        poiRefs: ['fort-canning', 'keppel-harbour'],
        sources: [
          { title: '岛夷志略', locator: '汪大渊撰，单马锡条', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'kampong-c1-p2',
        kind: 'legend',
        text: '《马来纪年》讲了另一个版本的开头：室利佛逝王子桑尼拉乌他玛渡海至此避风，登岸时望见一头形貌雄伟的走兽，红身黑首白胸，随从说那是狮子，王子遂将此地命名为 Singapura——狮城。故事讲得很好，只有一处对不上：这座岛上从来没有狮子。后人多推测那或许是一只马来虎，也可能只是一个为新王朝找吉兆的说法。',
        note: '考：狮子传说仅见于《马来纪年》一系文献，与本地动物分布不合，此处并存诸说。',
        poiRefs: ['fort-canning'],
        sources: [
          { title: '马来纪年', locator: 'Sejarah Melayu，建国诸章', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'kampong-c1-p3',
        kind: 'fact',
        text: '传说之外还有实物。二十世纪二十年代起，福康宁山上陆续出土十四世纪的元代青瓷、玻璃珠与金饰，1928 年山坡施工时挖出一批金器；后来的系统发掘又在山下找到土垣与作坊遗迹。莱佛士初到时就注意到山上有古墓与壕沟的痕迹，马来人称之为「禁山」，视为先王安眠之地而不轻易上去。开埠之前，这里确实有过一座城。',
        poiRefs: ['fort-canning', 'raffles-landing'],
        sources: [
          { title: '海峡殖民地年报', locator: '福康宁出土物纪录', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
  {
    id: 'kampong-c2',
    title: '插桩的海角',
    yearRange: [1500, 1818],
    circa: true,
    layer: 'history',
    paragraphs: [
      {
        id: 'kampong-c2-p1',
        kind: 'disputed',
        text: '马来语里 tanjong 是海角，pagar 是栅栏或木桩，合起来便是「插了桩的海角」。得名有两说：一说沿岸渔民自古以竹木插桩围成鱼栅（kelong），退潮时收网，海面上远远望去一排排木桩；一说当年海盗出没，村落在岸边立栅自卫，栅栏久之成了地名。两种说法都合乎情理，也都没有同时代的文字可作实证——名字比记载活得长。',
        note: '考：Tanjong Pagar 得名之说均出自后世口传，鱼栅说与防盗栅栏说并存，未有定论。',
        poiRefs: ['tanjong-pagar'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
      {
        id: 'kampong-c2-p2',
        kind: 'fact',
        text: '开埠之前，这道海角的模样与今天毫无关系。岸上是露兜树、椰林与零星的甘蜜、槟榔园，岸边一带红树林绵延，退潮时露出滩涂；今天的滨海湾、直落亚逸街一线，那时都还在水里。海角以西是一条被本岛与外岛夹出来的深水窄峡，水深浪静，马来船只借潮进出——半个世纪后，正是这条水道让新加坡在整个东南亚的港口里胜出。',
        poiRefs: ['tanjong-pagar', 'marina-bay', 'keppel-harbour'],
        sources: [
          { title: '海峡殖民地年报', locator: '早期水文与地貌记载', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
  {
    id: 'kampong-c3',
    title: '1819：登陆、条约与一个免税的港',
    yearRange: [1819, 1825],
    layer: 'history',
    paragraphs: [
      {
        id: 'kampong-c3-p1',
        kind: 'fact',
        text: '1819 年 1 月末，英国东印度公司的莱佛士与法夸尔一行在新加坡河口登岸。岛上人口约千余，河口一带住着天猛公阿都拉曼治下的马来与海人聚落，靠捕鱼、种甘蜜与偶尔的劫掠维生。2 月 6 日，英方与天猛公及被扶立的苏丹胡先签约，取得在此设立商馆的权利。条约文本写得体面，实际的算盘很清楚：在马六甲海峡南口插下一枚钉子。',
        note: '考：登陆的确切日期（1 月 28 日抵泊抑或 29 日登岸）与地点，各家记述略有出入。',
        poiRefs: ['raffles-landing', 'fort-canning'],
        sources: [
          { title: '莱佛士书信', locator: '1819 年致东印度公司诸函', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'kampong-c3-p2',
        kind: 'fact',
        text: '莱佛士做的第一个、也是影响最久的决定是宣布自由港：不征关税，任何国籍的商船都可以进出。消息沿着季风传开，原本要去马六甲、巴达维亚交税的船改道而来。开埠头一年就有数百艘船进港，五年之内人口从千余涨到近万，华人、武吉士人、爪哇人、印度人与阿拉伯商人接踵而至。这座港口从一开始就不是靠出产什么活着，而是靠让别人的货顺利经过。',
        poiRefs: ['raffles-landing', 'telok-ayer'],
        sources: [
          { title: '海峡殖民地年报', locator: '早年贸易与人口统计', kind: 'modern' },
          { title: '莱佛士书信', kind: 'classic' },
        ],
      },
      {
        id: 'kampong-c3-p3',
        kind: 'fact',
        text: '法律上的名分则晚了几年。1824 年 3 月英荷两国签订条约，以马六甲海峡划分势力范围，荷兰放弃对新加坡的异议；同年 8 月，英方又与苏丹和天猛公另订条约，把整座岛屿及其周边十海里内的海面永久割让给东印度公司。至此，一处商馆变成了一块殖民地。此后两百年，这座岛与海峡的命运再没有分开过。',
        poiRefs: ['raffles-landing', 'fort-canning'],
        sources: [
          { title: '海峡殖民地年报', locator: '1824 年条约文本', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
]

export const COLONIAL_CHAPTERS: Chapter[] = [
  {
    id: 'colonial-c1',
    title: '一张图纸决定的城市',
    yearRange: [1822, 1867],
    layer: 'history',
    paragraphs: [
      {
        id: 'colonial-c1-p1',
        kind: 'fact',
        text: '1822 年莱佛士第三次、也是最后一次来到新加坡，发现市镇长得毫无章法，当即成立市镇委员会重划全城。杰克逊上尉绘制的规划图把新加坡河南岸留给商业区，河北岸给政府，各族群则分片安置：欧人区、华人区、甘榜格南的马来与阿拉伯区、印度人聚居区。街道取直角相交，店屋须留出连续的「五脚基」骑楼供行人避雨——这条规矩，两百年后还在管着新加坡的街景。',
        poiRefs: ['raffles-place', 'telok-ayer', 'clarke-quay'],
        sources: [
          { title: '莱佛士书信', locator: '1822—1823 年市镇委员会训令', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'colonial-c1-p2',
        kind: 'fact',
        text: '1826 年，新加坡与槟城、马六甲合组为「海峡殖民地」，由东印度公司统辖；1832 年首府自槟城迁来新加坡，1867 年海峡殖民地脱离印度，改由伦敦的殖民地部直辖。行政层级一次次上抬，理由只有一个：贸易额压过了另外两处。河南岸的商业广场在 1858 年改名莱佛士坊，洋行、银行与保险公司围着中央花园排开，成了整个马来半岛的金融中枢。',
        poiRefs: ['raffles-place', 'fort-canning'],
        sources: [
          { title: '海峡殖民地年报', locator: '建制沿革与贸易统计', kind: 'modern' },
        ],
      },
      {
        id: 'colonial-c1-p3',
        kind: 'fact',
        text: '城市向海的方向也在同时改变。1822 年起新加坡河南岸开始填土整治，挖河泥垫高沼地，造出驳船码头；1880 年代直落亚逸湾被大规模填平，海岸线一口气外推近千米。天福宫原本庙门临海，此后再看不见水；直落亚逸街从滩头变成了内街。新加坡填海的习惯不是从现代开始的——它从开埠第三年就动手了。',
        poiRefs: ['telok-ayer', 'raffles-landing', 'clarke-quay'],
        sources: [
          { title: '海峡殖民地年报', locator: '公共工程章', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '海峡殖民地年报', kind: 'modern' }],
  },
  {
    id: 'colonial-c2',
    title: '1864：深水码头与一条运河带来的运气',
    yearRange: [1864, 1932],
    layer: 'history',
    paragraphs: [
      {
        id: 'colonial-c2-p1',
        kind: 'fact',
        text: '新加坡河口水浅，容不下越来越大的蒸汽轮船。1840 年代起大船改泊本岛西南的「新港」——那条被外岛遮出来的深水窄峡。1864 年丹戎巴葛码头公司成立，沿海角一线开出泊位、货栈与干船坞，1866 年第一座船坞启用。五年后苏伊士运河通航，欧亚航程缩短近半，蒸汽船必须沿途加煤，新加坡恰好卡在补给点上——运气来了，港口刚好准备好了。',
        note: '考：新港于 1900 年改名吉宝港以纪念早年勘测该水道的亨利·吉宝，改名年份各书所记略有先后。',
        poiRefs: ['tanjong-pagar', 'keppel-harbour'],
        sources: [
          { title: '海峡殖民地年报', locator: '港务与船坞章', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'colonial-c2-p2',
        kind: 'fact',
        text: '码头公司越做越大，1905 年被殖民地政府强制征用，1913 年改组为新加坡港务局，港口自此归公。陆上的接口也随之建成：1932 年丹戎巴葛火车站启用，取代旧的直落布兰雅总站，成为马来亚铁路的南端终点，正立面四尊石像分别象征农业、商业、运输与工业。同年落成的还有海边的红灯码头——夜里悬红灯为舟人指路，华人就照着灯给它起了名。',
        poiRefs: ['tanjong-pagar-station', 'clifford-pier', 'tanjong-pagar'],
        sources: [
          { title: '海峡殖民地年报', locator: '铁路与港务', kind: 'modern' },
          { title: '南洋商报', locator: '一九三二年五月车站启用纪事', kind: 'modern' },
        ],
      },
    ],
    sources: [{ title: '海峡殖民地年报', kind: 'modern' }],
  },
  {
    id: 'colonial-c3',
    title: '苦力、店屋与一间面向大海的庙',
    yearRange: [1840, 1930],
    circa: true,
    layer: 'history',
    paragraphs: [
      {
        id: 'colonial-c3-p1',
        kind: 'fact',
        text: '港口要人。十九世纪后半叶，闽粤沿海的男丁被「客头」招上船，签下卖身的契约，抵埠后住进「猪仔馆」等人来领——这就是所谓的「新客」。他们在码头扛麻袋、装煤、拉车，一天做十几小时，工钱先扣船费。牛车水一带的店屋楼下开铺、楼上以木板隔成一格格床位，一间房住十几二十人；名字里的「牛车水」，来自居民用牛车从安祥山泉眼载水贩卖的旧景。',
        poiRefs: ['chinatown', 'duxton-shophouse', 'tanjong-pagar'],
        sources: [
          { title: '新加坡国家档案馆口述历史计划', locator: '早期华人劳工访谈', kind: 'modern' },
          { title: '南洋商报', kind: 'modern' },
        ],
      },
      {
        id: 'colonial-c3-p2',
        kind: 'fact',
        text: '同乡与同业于是抱团。福建帮众自 1839 年起在直落亚逸街建天福宫，1842 年落成，供奉妈祖；建材自福建海运而来，不用一根铁钉。庙门当年正对海面，渡海平安的人上岸第一件事就是来还愿，庙里也顺理成章地办起会馆、调解纠纷、办义学、殓葬无亲无故的同乡。会馆、庙宇与方言帮群，构成了殖民政府之外的另一套秩序。',
        poiRefs: ['thian-hock-keng', 'telok-ayer', 'chinatown'],
        sources: [
          { title: '南洋商报', locator: '会馆与庙宇纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '新加坡国家档案馆口述历史计划', kind: 'modern' }],
  },
]

export const SHOWA_CHAPTERS: Chapter[] = [
  {
    id: 'showa-c1',
    title: '1942：一座要塞的三个月',
    yearRange: [1941, 1942],
    layer: 'history',
    paragraphs: [
      {
        id: 'showa-c1-p1',
        kind: 'fact',
        text: '英国把新加坡经营成「东方的直布罗陀」，重炮朝向海面，认为进攻只会从海上来。1941 年 12 月日军在马来半岛北部登陆，自陆路南下；1942 年 2 月 8 日渡过柔佛海峡，2 月 15 日守军在福康宁山腹的指挥所决定投降。这座被认为坚不可摧的要塞，从开战到易手不过七十天。此后新加坡被更名为「昭南岛」，进入三年半的日本占领时期。',
        poiRefs: ['fort-canning', 'raffles-place'],
        sources: [
          { title: '海峡殖民地年报', locator: '1941—1942 年战时纪录', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'showa-c1-p2',
        kind: 'fact',
        text: '占领期间实行军政管理，街名与机构改用日文名称，学校须教日语，时间也改用东京时区。物资由配给制分发，米、糖、食油凭证限量，军政当局发行的军用票因面值上印香蕉树而被称作「香蕉钞」，越印越多，物价随之飞涨；居民在空地上种木薯与番薯度日。这三年半里平民付出的代价极为沉重，战后新加坡在市中心建碑纪念，每年 2 月 15 日举行悼念。',
        poiRefs: ['chinatown', 'thian-hock-keng'],
        sources: [
          { title: '新加坡国家档案馆口述历史计划', locator: '日据时期生活访谈', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '新加坡国家档案馆口述历史计划', kind: 'modern' }],
  },
  {
    id: 'showa-c2',
    title: '1945：光复与一段修修补补的岁月',
    yearRange: [1945, 1964],
    layer: 'history',
    paragraphs: [
      {
        id: 'showa-c2-p1',
        kind: 'fact',
        text: '1945 年 9 月，英军重返新加坡，9 月 12 日日方在市政厅签署投降文书，「昭南」之名作废。接手的是一座近乎停摆的城市：港口设施与船坞受损，仓库空空，米价按黑市计算，霍乱与营养不良同时流行。军政府先管配给与治安，再逐段修复码头。1946 年海峡殖民地解散，新加坡单独成为直辖殖民地——战前那套统治的合法性，其实已经在 1942 年 2 月碎掉了。',
        poiRefs: ['keppel-harbour', 'tanjong-pagar', 'raffles-place'],
        sources: [
          { title: '南洋商报', locator: '一九四五年九月光复纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'showa-c2-p2',
        kind: 'fact',
        text: '五十年代的丹戎巴葛重新忙碌起来：码头装卸靠人力，苦力肩扛麻包上下跳板；火车站恢复通车，从这里可以一路坐到吉隆坡与曼谷；店屋底层的杂货铺、咖啡店与打金铺照旧开门。工潮与政治也在同一条街上生长，工会办事处就设在店屋楼上。1959 年新加坡取得自治，1963 年加入马来西亚——独立前的最后一段路，是在码头的号子声里走完的。',
        poiRefs: ['tanjong-pagar-station', 'duxton-shophouse', 'chinatown'],
        sources: [
          { title: '南洋商报', locator: '五十年代港区与工运纪事', kind: 'modern' },
          { title: '新加坡国家档案馆口述历史计划', kind: 'modern' },
        ],
      },
    ],
    sources: [{ title: '南洋商报', kind: 'modern' }],
  },
]

export const NATION_CHAPTERS: Chapter[] = [
  {
    id: 'nation-c1',
    title: '1965 之后：把箱子装上船',
    yearRange: [1965, 1985],
    layer: 'history',
    paragraphs: [
      {
        id: 'nation-c1-p1',
        kind: 'fact',
        text: '1965 年 8 月 9 日新加坡脱离马来西亚独立，随即面对两个难题：失去腹地市场，以及英军基地即将撤离带走的大量岗位。答案还是港口，只是要换一种做法。1972 年 6 月，丹戎巴葛码头第一个集装箱泊位启用，首艘全集装箱船靠泊——这是东南亚最早的集装箱码头。吊桥式岸桥一次抓起一只箱子，几十年里靠肩膀吃饭的装卸工，从此要改学开机器。',
        poiRefs: ['tanjong-pagar', 'keppel-harbour', 'clifford-pier'],
        sources: [
          { title: '南洋商报', locator: '一九七二年集装箱码头启用纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'nation-c1-p2',
        kind: 'fact',
        text: '陆地也要重新造。1970 年代起，政府自海中吹填造地，滨海南与滨海中心一带在十余年间从海图上「长」出来；用于填海的沙石一部分挖自本岛的山丘，一座山换来一片新地。丹戎巴葛以东那道曾经的海岸线被推得越来越远，红灯码头面前的水面逐年缩小。两百年前渔民插桩围鱼的海角，此时已经完全在陆地之中了。',
        poiRefs: ['marina-bay', 'tanjong-pagar'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
  {
    id: 'nation-c2',
    title: '搬家：组屋、清河与地铁工地',
    yearRange: [1960, 1989],
    layer: 'history',
    paragraphs: [
      {
        id: 'nation-c2-p1',
        kind: 'fact',
        text: '1960 年建屋发展局成立，此后二十年里大批住户从牛车水与丹戎巴葛的板间房迁入组屋。搬走的不只是人：街边摊贩被集中进小贩中心，作坊迁往工业区，老店屋一空下来就被列入重建名单。1977 年起推行十年「清河计划」，新加坡河上的舯舽船与河边人家陆续迁离，河水从黑臭变回可以看见河底。城市变干净了，也有人一辈子没再习惯电梯楼。',
        poiRefs: ['chinatown', 'duxton-shophouse', 'clarke-quay'],
        sources: [
          { title: '新加坡国家档案馆口述历史计划', locator: '组屋搬迁与清河访谈', kind: 'modern' },
          { title: '南洋商报', kind: 'modern' },
        ],
      },
      {
        id: 'nation-c2-p2',
        kind: 'fact',
        text: '1983 年地铁动工，市中心路段用明挖回填法施工，丹戎巴葛一带的街面被围板圈起好几年，沿街店铺在尘土里照常营业。1987 年首段通车，年底东西线市区段启用，丹戎巴葛站开在写字楼群脚下。也正是在同一个十年里，「拆」的势头被拉住了：1989 年丹戎巴葛与达士敦一带划为保育区，成为全国最早成片修复的店屋群——差一点，它们就只剩照片了。',
        poiRefs: ['tanjong-pagar-mrt', 'duxton-shophouse', 'tanjong-pagar-station'],
        sources: [
          { title: '南洋商报', locator: '一九八七年地铁通车纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '新加坡国家档案馆口述历史计划', kind: 'modern' }],
  },
]

export const NOW_CHAPTERS: Chapter[] = [
  {
    id: 'now-c1',
    title: '一寸寸向海要来的城',
    yearRange: [1990, 2026],
    layer: 'history',
    paragraphs: [
      {
        id: 'now-c1-p1',
        kind: 'fact',
        text: '把 1819 年的海图与今天的地图叠在一起，会看到一件很直观的事：新加坡的国土面积从约五百八十平方公里增加到七百多平方公里，多出来的部分基本都在南岸。丹戎巴葛、滨海湾、滨海南这一大片如今寸土寸金的地方，两百年前都是水。你站在 CBD 任何一栋楼下，脚底下的土多半是从别处运来、或是从海里吹上来的。',
        poiRefs: ['tanjong-pagar', 'marina-bay', 'telok-ayer'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
      {
        id: 'now-c1-p2',
        kind: 'fact',
        text: '2008 年滨海堤坝合龙，把海湾口封住，涨落潮的咸水湾变成了一座蓄水的淡水湖，既防洪又供水；2010 年金沙开业，天际线上多了三座塔与一条横放的「船」。红灯码头 2006 年停用后修复成餐饮场所，它当年面朝的那片海，如今是没有潮汐的湖面。地名还在讲海的事，水已经不是同一种水了。',
        poiRefs: ['marina-bay', 'clifford-pier', 'raffles-place'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
      {
        id: 'now-c1-p3',
        kind: 'fact',
        text: '港口本身则在往西走。集装箱作业陆续迁往巴西班让与大士，丹戎巴葛一带的码头用地按「大南部滨水区」规划逐步腾退，未来将改作住宅、办公与滨水公共空间。地面之上，丹戎巴葛地铁站每天早晚各涨一次人潮，出口直通写字楼；隔一条街，修复过的店屋底层坐满了下班喝一杯的人。同一块地，两百年换了四种用法。',
        poiRefs: ['tanjong-pagar-mrt', 'tanjong-pagar', 'duxton-shophouse'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
  {
    id: 'now-c2',
    title: '2011：最后一班火车',
    yearRange: [2011, 2026],
    layer: 'history',
    paragraphs: [
      {
        id: 'now-c2-p1',
        kind: 'fact',
        text: '2011 年 6 月 30 日夜里，一列开往马来西亚的客车驶离丹戎巴葛火车站，站台上挤满了专程来送最后一班车的人。次日起，马来亚铁道的新加坡总站北迁兀兰，这座 1932 年落成的车站结束了七十九年的客运生涯，同日被列为国家古迹。铁轨拆除后，沿线狭长的地带被辟成「铁道走廊」绿道，从北到南贯穿全岛。',
        poiRefs: ['tanjong-pagar-station'],
        sources: [
          { title: '新加坡国家档案馆口述历史计划', locator: '丹戎巴葛车站相关访谈', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'now-c2-p2',
        kind: 'fact',
        text: '车站空下来之后，它的用处反而更被人琢磨：站厅办过展览与市集，未来将随地铁环线的新站一并改造为交通与公共空间的枢纽。正立面上那四尊象征农业、商业、运输与工业的石像还在原处，只是它们最初面朝的方向——马来亚的橡胶与锡、加煤的蒸汽船、扛麻包上跳板的苦力——都已经不在了。名字留下来，海角、码头、车站，一层压着一层。',
        poiRefs: ['tanjong-pagar-station', 'tanjong-pagar', 'keppel-harbour'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
]
