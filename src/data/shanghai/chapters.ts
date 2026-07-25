import type { Chapter } from '../../types'

// ============================================================================
// 上海南京东路章节：开埠前 / 开埠租界 / 民国 / 1949—1990 / 当代
// 章节 id 与 pois.ts 的 chapterRef 一一对应，勿改。
// 传说层（concession-legend-lions）单独标记 layer:'legend'，UI 可一键隐藏。
// ============================================================================

export const PRE1843_CHAPTERS: Chapter[] = [
  {
    id: 'pre1843-c1',
    title: '从上海务到上海县：一座因水而立的城',
    yearRange: [1074, 1559],
    layer: 'history',
    paragraphs: [
      {
        id: 'pre1843-c1-p1',
        kind: 'fact',
        text: '上海最初不是城，是一处收税的关卡。北宋熙宁年间朝廷在吴淞江下游的支流「上海浦」旁设酒务，「上海」二字第一次落在公文上；南宋时这里已聚成市镇，元至元二十九年（1292）析华亭县东北五乡置上海县，县衙设在今老城厢一带。设县的理由写得很实在：舶商辐辏、人烟浩穰，非置官不足以治。一条不算宽的浦，就这样把一个县从水边拉了出来。',
        note: '考：上海设务、设镇的具体年份，宋元方志与明清《上海县志》记载不一，此处取熙宁七年（1074）设务、至元二十九年（1292）置县的通行说法。',
        poiRefs: ['old-county'],
        sources: [
          { title: '上海县志', locator: '建置沿革', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'pre1843-c1-p2',
        kind: 'fact',
        text: '明嘉靖三十二年（1553），倭寇几度自海上来袭，县里在两个多月内抢筑起一圈城墙，周约九里、高两丈四尺，开六门，环城掘壕。城墙一围，散在浦边的市镇才真正成了「城」。此后三百年，上海人的方位感都由这个圆圈决定：城里是县衙、文庙与庙市，城外是沙船码头与漫无边际的棉田。今天中华路与人民路合成的那个环，就是当年城墙留下的印子。',
        poiRefs: ['old-county', 'chenghuang'],
        sources: [{ title: '上海县志', locator: '城池·兵防', kind: 'classic' }],
      },
      {
        id: 'pre1843-c1-p3',
        kind: 'fact',
        text: '城里最热闹的地方不在县衙而在庙前。上海县城隍庙由金山神庙改建于明永乐年间，供奉汉将霍光与明初知府秦裕伯，香火之盛压过一切官署；庙前庙后自然长出茶楼、点心摊与百货杂陈的市集。嘉靖三十八年（1559），四川布政使潘允端为奉养父亲在庙北起造豫园，掇山凿池，历十余年方成。庙、园、市三样挨在一处，构成了开埠之前上海人全部的「城市生活」。',
        poiRefs: ['chenghuang', 'yuyuan'],
        sources: [
          { title: '上海县志', locator: '祠祀·园宅', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '上海县志', kind: 'classic' }],
  },
  {
    id: 'pre1843-c2',
    title: '城北：芦苇、纤道与一条没有名字的路',
    yearRange: [1600, 1842],
    circa: true,
    layer: 'history',
    paragraphs: [
      {
        id: 'pre1843-c2-p1',
        kind: 'fact',
        text: '出县城北门再走三四里，就是今天南京东路所在的地方。那时这里没有街，只有田埂、菜畦、几座村舍与通往江边的土径，雨后泥泞难行。再往东到黄浦江岸，是一片长着芦苇的滩地，涨潮时水漫上来，退潮后留下一层烂泥。沿岸有一条被纤夫世代踩出来的窄路，专供拉船逆流而上，本地人只叫它「黄浦滩」——外滩这个名字，就是从这条纤道上长出来的。',
        poiRefs: ['nanjing-road', 'bund'],
        sources: [
          { title: '上海研究资料', locator: '上海通社编，地理沿革篇', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'pre1843-c2-p2',
        kind: 'fact',
        text: '江对岸更荒。黄浦江在此拐出一个大弯，弯里淤出大片沙洲与盐碱地，芦苇比人高，只有零星农户与摆渡人。相传明代学者陆深的家族墓地在这片江嘴上，「陆家嘴」的名字便由此而来。县城的人若要过江，得在苏州河口或十六铺等摆渡；苏州河汇入黄浦江之处也没有桥，全靠艄公一篙一篙撑过去。两百年后，这两处最不值钱的滩地，一处叫外滩，一处叫陆家嘴。',
        poiRefs: ['lujiazui', 'waibaidu'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '上海研究资料', locator: '上海通社辑', kind: 'modern' }],
  },
]

export const CONCESSION_CHAPTERS: Chapter[] = [
  {
    id: 'concession-c1',
    title: '1843：一纸条约划出的「北市」',
    yearRange: [1843, 1854],
    layer: 'history',
    paragraphs: [
      {
        id: 'concession-c1-p1',
        kind: 'fact',
        text: '道光二十三年十月（1843 年 11 月 17 日），首任英国领事巴富尔在上海县城内挂出领事馆招牌，上海正式开埠。两年后中英议定《上海土地章程》，划出县城以北、洋泾浜以南、黄浦江以西的一片农田作为英人居留地。界线是在地图上画的，地面上却只有田埂与坟包。此后美租界、法租界相继划定，1863 年英美租界合并为公共租界——上海从此有了两套并行的行政系统。',
        poiRefs: ['old-county', 'bund'],
        sources: [
          { title: '上海县志', locator: '通商', kind: 'classic' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'concession-c1-p2',
        kind: 'fact',
        text: '洋行来得比人快。怡和、宝顺、旗昌等商号一到就沿黄浦江圈地建行栈，纤道被填高拓宽成一条能走马车的江边路，两侧种上树，江面上停满趸船。1854 年租界成立工部局，自设巡捕、征税、修路、点灯，俨然一个城中之国。江边地价一年一涨，最初以每亩几十两购得的滩地，二十年后已论尺计价——上海最早的财富神话，是从一片芦苇滩上开始的。',
        poiRefs: ['bund'],
        sources: [
          { title: '上海公共租界工部局年报', locator: '早年道路与地产章', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'concession-c1-p3',
        kind: 'fact',
        text: '真正让租界改变性质的是难民。1853 年小刀会占据上海县城，1860 年前后太平军进逼江南，大批士绅商民携资涌入租界避难。原本「华洋分居」的规矩被现实冲垮，租界当局顺势推行「华洋杂处」，成片建造石库门里弄出租。人一多，城北的市面便压过了城南：县城被叫作「南市」，租界成了「北市」。上海的重心，就在这十几年里向北移了三里地。',
        poiRefs: ['old-county', 'nanjing-road'],
        sources: [
          { title: '申报', locator: '早期沪上纪事', kind: 'modern' },
          { title: '上海研究资料', locator: '上海通社编', kind: 'modern' },
        ],
      },
    ],
    sources: [{ title: '上海研究资料', locator: '上海通社辑', kind: 'modern' }],
  },
  {
    id: 'concession-c2',
    title: '从跑马道到南京路',
    yearRange: [1850, 1893],
    layer: 'history',
    paragraphs: [
      {
        id: 'concession-c2-p1',
        kind: 'fact',
        text: '南京路的前身是一条跑马的路。1850 年前后侨民组起跑马总会，在今河南中路一带圈地辟出花园与跑马道，那条自江边通向马场的东西向大道被叫作「花园弄」，也写作「派克弄」。跑马场后来两度西迁，道路却留了下来，并随着马场一路向西延长。上海人后来津津乐道的「马路」二字，最初真的与马有关：那是一条给马跑的路，顺带让人走。',
        note: '考：花园弄与派克弄是否指同一条路、其东西端点何在，租界档案与后世追述略有出入。',
        poiRefs: ['nanjing-road', 'renmin-square'],
        sources: [
          { title: '上海公共租界工部局年报', locator: '道路章', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'concession-c2-p2',
        kind: 'fact',
        text: '1862 年跑马总会第三次圈地，把马场迁到今人民广场一带，环场跑马道演化成了后来的西藏中路、南京西路一线。三年后，工部局决定用中国城市与省份的名字统一租界路名：南北向用省名，东西向用城市名，这条最重要的东西干道遂定名「南京路」。名字是官方给的，叫法却是民间的——华人依旧按由北向南的次序叫它「大马路」，南面的九江路、汉口路、福州路顺次为二、三、四马路。',
        note: '考：南京路正式定名的年份，一般系于 1865 年租界统一路名之举，亦有 1862 年一说，此处取前者。',
        poiRefs: ['nanjing-road', 'renmin-square'],
        sources: [
          { title: '上海公共租界工部局年报', locator: '路名厘定', kind: 'modern' },
          { title: '申报', kind: 'modern' },
        ],
      },
      {
        id: 'concession-c2-p3',
        kind: 'fact',
        text: '路的东端顶着黄浦江，那里立着两样管住全城节奏的东西。一是江海关：1845 年设江海北关于此，1857 年建中式关署，1893 年改建成带尖顶钟楼的西式衙署，进出口船货的税单都从这里出。二是桥：1856 年英商在苏州河口建木桥并收过桥费，华人不服，1873 年工部局另建免费木桥，「白渡」——不花钱过渡——遂成了外白渡桥的名字。一座收钱的桥输给了一座不收钱的桥，这件小事被上海人记了一百多年。',
        poiRefs: ['customs-house', 'waibaidu', 'bund'],
        sources: [
          { title: '申报', locator: '同治十二年苏州河桥事', kind: 'modern' },
          { title: '上海研究资料', locator: '上海通社编', kind: 'modern' },
        ],
      },
    ],
    sources: [{ title: '上海公共租界工部局年报', kind: 'modern' }],
  },
  {
    id: 'concession-legend-lions',
    title: '掌故两则：大马路的叫法与门口的铜狮子',
    yearRange: [1865, 1923],
    circa: true,
    layer: 'legend',
    paragraphs: [
      {
        id: 'concession-legend-lions-p1',
        kind: 'disputed',
        text: '「大马路」为什么是大的？一说因为它最宽最早，租界第一条像样的马路自然为大；一说因为它通向跑马厅，是真正跑过马的路，别的路只是照它的样子修的；还有一说，是华人不认租界给的洋味路名，索性按由北往南的次序自己编号，一马路二马路地叫下去，叫顺了就再也改不回来。三种说法各有支持者，可以确定的只有一点：官方叫它南京路，上海人叫它大马路，两个名字并行了大半个世纪。',
        note: '考：「大马路」得名诸说均出自后世追述，无同时代文献可为定谳，此处并存三说。',
        poiRefs: ['nanjing-road', 'renmin-square'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
      {
        id: 'concession-legend-lions-p2',
        kind: 'legend',
        text: '1923 年汇丰银行新楼落成，门前蹲下一对铜狮，一只张口作吼状，一只闭口守静，据说分别取自当时的两位大班之名。铜是熔铸的，传说是长出来的：说摸一摸狮爪能沾财气，考试前摸头、做生意摸爪，摸得两只狮子的爪与鼻子都发亮；又说日军占领时曾想把它们熔了造炮弹，运到半途终究没舍得。今天外滩门口的那一对是复制品，原件被请进了博物馆，可摸狮子的人还是一年比一年多。',
        poiRefs: ['hsbc', 'bund'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
]

export const REPUBLIC_CHAPTERS: Chapter[] = [
  {
    id: 'republic-c1',
    title: '四大公司：一条街上的商业战争',
    yearRange: [1917, 1936],
    layer: 'history',
    paragraphs: [
      {
        id: 'republic-c1-p1',
        kind: 'fact',
        text: '1917 年 10 月，先施公司在南京路浙江路口开张。创办人马应彪是广东香山人，早年在澳洲经营果栏，把当地的零售规矩一并带了回来：明码标价、不二价、开发票，还破例雇用女售货员。上海人先是为了看新鲜而来，进门发现连讨价还价都省了，反倒买得更多。开张当日人潮几乎把大门挤坏，这一天通常被视为中国百货业真正的起点。',
        note: '考：首雇女售货员一事，先施与稍后的永安均有此说，孰为最先，时人记述互异。',
        poiRefs: ['sincere', 'nanjing-road'],
        sources: [
          { title: '申报', locator: '民国六年十月广告与纪事', kind: 'modern' },
          { title: '上海研究资料', locator: '上海通社编，商业篇', kind: 'modern' },
        ],
      },
      {
        id: 'republic-c1-p2',
        kind: 'fact',
        text: '不到一年，郭乐、郭泉兄弟的永安公司在街对面开业，两家隔一条马路正面对峙。永安顶上起了一座「绮云阁」高塔，先施便加建「摩星楼」；一家办游乐场，另一家就办屋顶花园；一家夜里点灯，另一家把灯点得更亮。竞争把整条街的营业时间往后拖，也把橱窗越做越大。上海人逛街不必进门，沿街走一遍就够看半天——「逛马路」这三个字，是这两家公司教会全城的。',
        poiRefs: ['wing-on', 'sincere', 'nanjing-road'],
        sources: [{ title: '申报', locator: '民国七年九月纪事', kind: 'modern' }],
      },
      {
        id: 'republic-c1-p3',
        kind: 'fact',
        text: '1926 年新新公司开业，装了玻璃隔音的电台播音室，让顾客隔着玻璃看播音员说话；1936 年 1 月大新公司在西藏路口落成，营业面积冠绝全市，还装上了中国第一部商用自动扶梯——开业头几个月，专程买最便宜的一件东西、只为坐一次电梯的人排到街上。至此先施、永安、新新、大新四大公司在一里长的街面上排开，南京路成了名副其实的「远东第一街」。',
        poiRefs: ['dasun', 'nanjing-road'],
        sources: [
          { title: '申报', locator: '民国二十五年一月纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '申报', kind: 'modern' }],
  },
  {
    id: 'republic-c2',
    title: '不夜城：电车、霓虹与一口大钟',
    yearRange: [1908, 1937],
    layer: 'history',
    paragraphs: [
      {
        id: 'republic-c2-p1',
        kind: 'fact',
        text: '1908 年 3 月，上海第一条有轨电车通车，自静安寺经南京路直抵外滩，叮叮声从此成了这条街的背景音。二十年代起沿街商号竞相装设霓虹灯管，入夜后红绿两色映在湿漉漉的柏油路面上，报纸称之为「不夜城」。电车、黄包车、汽车与推着小车的摊贩挤在同一条路上，交通规则是一边走一边定的；租界工部局的交通告示，往往刚贴出去就被现实推翻。',
        poiRefs: ['nanjing-road', 'bund'],
        sources: [
          { title: '申报', locator: '宣统元年前后电车纪事', kind: 'modern' },
          { title: '上海公共租界工部局年报', locator: '交通章', kind: 'modern' },
        ],
      },
      {
        id: 'republic-c2-p2',
        kind: 'fact',
        text: '街的东端，外滩在同一时期完成了它的定型。1927 年江海关新楼落成，顶上的大钟由英国制造，每一刻钟奏一段钟乐，全城对时都听它的；两年后，维克多·沙逊的沙逊大厦在南京路口落成，绿色金字塔顶罩着装饰艺术的内饰，楼上华懋饭店的客房招待着过路的银行家与作家。沿江二十余家中外银行一字排开，被称作「远东华尔街」——一条街的两端，一端管钱，一端管货。',
        poiRefs: ['customs-house', 'peace-hotel', 'bund'],
        sources: [
          { title: '申报', locator: '民国十六年、十八年外滩建筑纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '申报', kind: 'modern' }],
  },
  {
    id: 'republic-c3',
    title: '五卅路口与孤岛岁月',
    yearRange: [1925, 1945],
    layer: 'history',
    paragraphs: [
      {
        id: 'republic-c3-p1',
        kind: 'fact',
        text: '1925 年 5 月 30 日下午，为抗议日资纱厂枪杀工人顾正红，学生沿南京路演讲募捐，人群聚到老闸捕房门前。英籍捕头下令开枪，当场死伤数十人，史称五卅惨案。消息传开，上海随即爆发大规模罢工罢市罢课，风潮波及全国。此后每年这一天，南京路上都有人默立；一条以购物闻名的街，就此有了另一重、也更沉的记忆。',
        poiRefs: ['nanjing-road', 'old-county'],
        sources: [
          { title: '申报', locator: '民国十四年五月三十一日至六月纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'republic-c3-p2',
        kind: 'fact',
        text: '1937 年淞沪会战后华界沦陷，被日军包围的公共租界与法租界成了「孤岛」：街面照旧霓虹通明，物价却一日三涨，逃难来的人挤满了里弄。1941 年 12 月 8 日日军开进租界，孤岛结束；1943 年租界名义上交还。1945 年抗战胜利后市政当局重订路名，以西藏路为界，把这条街分为南京东路与南京西路——今天的名字，是从战争的尾声里定下来的。',
        poiRefs: ['nanjing-road', 'peace-hotel'],
        sources: [
          { title: '申报', locator: '民国二十六年至三十四年纪事', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
    ],
    sources: [{ title: '申报', kind: 'modern' }],
  },
]

export const PRC_CHAPTERS: Chapter[] = [
  {
    id: 'prc-c1',
    title: '一店、十店与时装商店',
    yearRange: [1949, 1989],
    layer: 'history',
    paragraphs: [
      {
        id: 'prc-c1-p1',
        kind: 'fact',
        text: '1949 年后四大公司陆续改制。1953 年大新公司改为上海市第一百货商店，「中百一店」这个称呼管了几十年；先施旧址成了上海时装公司门市，「时装商店」四个字长期充当全国的衣着风向标；永安公私合营后几度更名，1969 年定为上海第十百货商店，1988 年才挂出「华联商厦」的招牌。招牌换了，柜台和人流没换——凭票证购物的年代，一店的柜台前照样天不亮就排队。',
        poiRefs: ['dasun', 'sincere', 'wing-on'],
        sources: [
          { title: '上海研究资料', locator: '商业沿革', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'prc-c1-p2',
        kind: 'fact',
        text: '这几十年里，南京东路的身份从「远东第一街」变成了「全国人民的商店」。外地人到上海出差，行李箱里往往揣着单位同事托买的清单：一块手表、几尺的确良、一双回力鞋。1963 年市区有轨电车全部停驶，叮叮声消失，取而代之的是无轨电车的辫子与自行车的铃铛。橱窗仍在，霓虹却熄了大半，直到八十年代才重新一盏盏亮起来。',
        poiRefs: ['nanjing-road', 'dasun'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
  {
    id: 'prc-c2',
    title: '跑马厅变成了人民广场',
    yearRange: [1951, 1989],
    layer: 'history',
    paragraphs: [
      {
        id: 'prc-c2-p1',
        kind: 'fact',
        text: '南京路西端那片跑了近九十年马的草地，1951 年由上海市人民政府收回。北半辟为人民公园，南半辟为人民广场，看台与马厩拆去，跑道改成集会用的场地；跑马总会大楼后来先后做过图书馆与美术馆。一块曾经华人不得入内的地，变成了全市最公共的地方。今天它的地下是三条地铁线的换乘枢纽，地面是博物馆、大剧院与规划馆围出的中心绿地。',
        poiRefs: ['renmin-square'],
        sources: [
          { title: '上海研究资料', locator: '市政沿革', kind: 'modern' },
          { title: '编者综合方志与通史记载', kind: 'editorial' },
        ],
      },
      {
        id: 'prc-c2-p2',
        kind: 'fact',
        text: '街的东端也换了用途。外滩的银行大楼多改作机关与单位办公楼，汇丰大楼自 1955 年起是上海市人民政府所在地，门厅穹顶的马赛克壁画被吊顶封住，反倒因此躲过损毁；沙逊大厦 1956 年改称和平饭店。江边那道防汛墙则被年轻人占领：住房紧张的年代，傍晚沿墙一对一对站满谈恋爱的人，被叫作「情人墙」——外滩最著名的风景，有那么二十年是人。',
        poiRefs: ['hsbc', 'peace-hotel', 'bund'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
]

export const NOW_CHAPTERS: Chapter[] = [
  {
    id: 'now-c1',
    title: '1999：马路变成了街',
    yearRange: [1999, 2026],
    layer: 'history',
    paragraphs: [
      {
        id: 'now-c1-p1',
        kind: 'fact',
        text: '1999 年 9 月，南京东路自河南中路至西藏中路的一段改建完成，机动车退出，路面铺上花岗岩，全长约一千零三十三米的步行街正式开街。争议在开街前一直没停：把最赚钱的一条路封起来，商家怕断了客流。结果相反——人流量翻了几倍，沿街店铺重新排队争抢铺位。一条为跑马而辟、为通车而拓的路，一百五十年后终于把地面还给了走路的人。',
        poiRefs: ['nanjing-road', 'renmin-square'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
      {
        id: 'now-c1-p2',
        kind: 'fact',
        text: '步行街上的老楼大多还在，只是各自换了身份：先施大楼、永安大楼、新新与大新的旧址都列入优秀历史建筑，底层商铺一茬换过一茬，转角的塔楼与骑楼却不许动。2020 年步行街东段延伸至中山东一路，直接接上外滩；观光车在人群中缓缓穿行，游客举着手机对着立面拍照——他们拍的，多半是一百年前四家公司互相较劲时争出来的那些高塔。',
        poiRefs: ['sincere', 'wing-on', 'dasun'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
  {
    id: 'now-c2',
    title: '隔江对望：两个上海之间的四百米',
    yearRange: [1990, 2026],
    layer: 'history',
    paragraphs: [
      {
        id: 'now-c2-p1',
        kind: 'fact',
        text: '1990 年 4 月宣布开发开放浦东时，陆家嘴还是仓库、船厂与工人新村，市民口中「宁要浦西一张床，不要浦东一间房」。此后二十余年，东方明珠（1994）、金茂大厦（1999）、环球金融中心（2008）、上海中心（2016）依次立起，四百米宽的江面两侧，一边是砖石与柱廊，一边是玻璃与钢。站在外滩观景台上转个身，就能把上海的两百年看完。',
        poiRefs: ['lujiazui', 'bund'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
      {
        id: 'now-c2-p2',
        kind: 'fact',
        text: '外滩这一侧则做了减法。2007 至 2010 年间外滩综合改造，把地面的十一车道压缩、车流沉入地下通道，江边腾出连续的观景平台；外白渡桥于 2008 年整体移走大修、次年归位，桥上的铆钉仍是 1907 年那批。五十二幢历史建筑连成一线，1996 年即列为全国重点文物保护单位。江没有变，岸线一直在退——两百年前的纤道，如今是全市最宽的一段人行道。',
        poiRefs: ['bund', 'waibaidu', 'customs-house'],
        sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
      },
    ],
    sources: [{ title: '编者综合方志与通史记载', kind: 'editorial' }],
  },
]
