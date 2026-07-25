import type { Poi } from '../../types'

// ============================================================================
// 淮南共享 POI 表：坐标为真实经纬度（bbox 约 [116.36, 31.90, 117.22, 33.00]）。
// eraStates 的 key 必须与 huainan.ts 的 timeline key 一致
// （chu / han / jin / qing / republic / now），resolveEraMarkers 会据此取该
// 时代的称呼渲染地图标签。章节段落用 poiRefs 引用这里的 id。
// ============================================================================

export const HUAINAN_POIS: Poi[] = [
  // ------------------------------------------------ 跨时代锚点
  {
    id: 'shouchun',
    name: '寿春城',
    lng: 116.785,
    lat: 32.585,
    kind: 'landmark',
    priority: 1,
    eraStates: {
      chu: {
        name: '寿春（命曰郢）',
        story: '前 241 年楚考烈王东徙都此，《史记》记「楚东徙都寿春，命曰郢」。这是楚国八百年间最后一座都城，十八年后为秦所灭。',
        chapterRef: 'chu-c1',
      },
      han: {
        name: '寿春（淮南国都）',
        story: '西汉淮南国的王都。刘长、刘安父子先后王于此，刘安在城中招致宾客数千人编成《淮南子》。',
        chapterRef: 'han-c2',
      },
      jin: {
        name: '寿阳',
        story: '东晋避郑太后阿春讳改称寿阳。383 年为前秦苻融攻陷，苻坚登城东望，遂有「草木皆兵」。',
        chapterRef: 'jin-c3',
      },
      qing: {
        name: '寿州城',
        story: '现存砖城为南宋嘉定十二年重筑，四门带瓮城。明清属凤阳府寿州，城墙兼作淮河防洪堤。',
        chapterRef: 'qing-c1',
      },
      now: {
        name: '寿县古城',
        story: '2015 年寿县由六安划归淮南，楚都与煤城合于一个市名之下。城墙已列入「中国明清城墙」世界遗产预备名单。',
        chapterRef: 'now-c2',
      },
    },
  },
  {
    id: 'bagong',
    name: '八公山',
    lng: 116.79,
    lat: 32.66,
    kind: 'landmark',
    priority: 1,
    eraStates: {
      han: {
        name: '八公山（淮王丹灶）',
        story: '相传八位白发老翁化作少年来见刘安，随之登山炼丹，山因此得名；豆腐亦传为炼丹时偶得。',
        chapterRef: 'han-legend-bagong',
        legend: true,
      },
      jin: {
        name: '八公山（草木皆兵）',
        story: '383 年苻坚自寿阳城头望八公山，草木摇动皆疑晋兵，「怃然有惧色」——成语由此而来。',
        chapterRef: 'jin-c1',
      },
      now: {
        name: '八公山（豆腐之乡）',
        story: '1992 年起淮南每年办中国豆腐文化节，节期定在传说中刘安的生日九月十五日。',
        chapterRef: 'now-c2',
      },
    },
  },
  {
    id: 'feishui',
    name: '淝水古战场',
    lng: 116.83,
    lat: 32.61,
    kind: 'landmark',
    priority: 1,
    coordUnverified: true,
    eraStates: {
      jin: {
        name: '淝水古战场',
        story: '383 年冬，晋军请秦军稍退以决战，秦阵一动即溃，朱序阵后大呼「秦兵败矣」，八万破倾国之师。',
        chapterRef: 'jin-c2',
      },
    },
  },

  // ------------------------------------------------ 楚汉
  {
    id: 'anfengtang',
    name: '安丰塘',
    lng: 116.635,
    lat: 32.43,
    kind: 'water',
    priority: 2,
    coordUnverified: true,
    eraStates: {
      chu: {
        name: '芍陂',
        story: '相传楚庄王时令尹孙叔敖所筑，塘周百里、设斗门数十，是江淮间最早的大型陂塘灌溉工程。',
        chapterRef: 'chu-c3',
      },
      qing: {
        name: '安丰塘',
        story: '明清寿州最可靠的粮仓，塘水一放，下游万顷稻田同时得润。2015 年入选世界灌溉工程遗产。',
      },
    },
  },
  {
    id: 'fengtai',
    name: '凤台',
    lng: 116.72,
    lat: 32.71,
    kind: 'village',
    priority: 2,
    eraStates: {
      chu: {
        name: '下蔡',
        story: '春秋州来、战国下蔡故地，淮北岸的重镇。楚都寿春与下蔡隔淮相望，一南一北扼住淮河渡口。',
        chapterRef: 'chu-c1',
      },
      qing: {
        name: '凤台县',
        story: '乾隆四十二年（1777）析寿州淮北之地置县，县治初与寿州同城，道光年间才迁至下蔡故地。',
        chapterRef: 'qing-c1',
      },
      republic: {
        name: '凤台',
        story: '淮河北岸的农业县，二十世纪七十年代后境内探明潘谢煤田，矿区自此跨到淮河以北。',
        chapterRef: 'republic-c2',
      },
    },
  },
  {
    id: 'zhengyangguan',
    name: '正阳关',
    lng: 116.55,
    lat: 32.51,
    kind: 'transit',
    priority: 2,
    coordUnverified: true,
    eraStates: {
      qing: {
        name: '正阳关',
        story: '淮、颍、淠三水交汇，民谚「七十二水通正阳」。清设淮盐总栈，米市盐行沿河排开，人称「小上海」。',
        chapterRef: 'qing-c2',
      },
    },
  },
  {
    id: 'wabuhu',
    name: '瓦埠湖',
    lng: 116.96,
    lat: 32.35,
    kind: 'water',
    priority: 3,
    coordUnverified: true,
    eraStates: {
      han: {
        name: '瓦埠湖',
        story: '淮南国最富庶的一片水乡，稻田连绵，湖鱼与稻米沿东淝河北运入淮。',
        chapterRef: 'han-c1',
      },
      jin: {
        name: '瓦埠湖（东淝河）',
        story: '东淝河出将军岭北流经此，至寿县北硖石口入淮——「淝水之战」的淝水，指的正是这一条。',
        chapterRef: 'jin-c3',
      },
      qing: {
        name: '瓦埠湖圩田',
        story: '沿岸圈起连片圩田，丰年稻米经淮河外销，一遇大水便「大雨大灾，小雨小灾」。',
        chapterRef: 'qing-c2',
      },
    },
  },

  // ------------------------------------------------ 近代矿区
  {
    id: 'shungeng',
    name: '舜耕山',
    lng: 117.02,
    lat: 32.58,
    kind: 'landmark',
    priority: 2,
    coordUnverified: true,
    eraStates: {
      republic: {
        name: '舜耕山煤田',
        story: '淮南煤田的地表露头所在。1930 年淮南煤矿局在山北麓开凿新式竖井，一座城市自井口长出。',
        chapterRef: 'republic-c1',
      },
      now: {
        name: '舜耕山（老矿区公园）',
        story: '老矿区陆续关闭改建为公园与遗址，山南新区在山另一侧起了行政与教育的新中心。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'datong',
    name: '大通煤矿',
    lng: 117.07,
    lat: 32.62,
    kind: 'building',
    priority: 2,
    eraStates: {
      republic: {
        name: '大通煤矿',
        story: '1938—1945 年日军侵占期间掠夺式开采，留下埋着大量矿工遗骨的「万人坑」。',
        chapterRef: 'republic-c1',
      },
      now: {
        name: '大通万人坑教育馆',
        story: '万人坑、窑神庙与碉堡在原址保留，成为淮南近代工业与战时苦难的现场档案。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'jiulonggang',
    name: '九龙岗',
    lng: 117.02,
    lat: 32.61,
    kind: 'building',
    priority: 3,
    eraStates: {
      republic: {
        name: '九龙岗矿',
        story: '1930 年淮南煤矿局在此开凿新式竖井，机器抽水绞车提升，产量迅速超过旧式土窑。',
        chapterRef: 'republic-c1',
      },
    },
  },
  {
    id: 'tianjiaan',
    name: '田家庵',
    lng: 117.0,
    lat: 32.64,
    kind: 'transit',
    priority: 1,
    eraStates: {
      qing: {
        name: '田家庵渡口',
        story: '淮河南岸的渡口小集，几十户人家一座码头，货物在此上岸再由骡车转运。',
        chapterRef: 'qing-c2',
      },
      republic: {
        name: '田家庵（淮南铁路起点）',
        story: '1934 年淮南铁路自此南下裕溪口，煤炭装船下长江。渡口集镇几年间变成枢纽与市府所在。',
        chapterRef: 'republic-c1',
      },
      now: {
        name: '田家庵城区',
        story: '淮南的老城中心，淮河南岸最密的一片街市；田家庵电厂的烟囱仍立在江堤边上。',
      },
    },
  },

  // ------------------------------------------------ 当代
  {
    id: 'pingwei',
    name: '平圩电厂',
    lng: 116.98,
    lat: 32.71,
    kind: 'building',
    priority: 2,
    eraStates: {
      now: {
        name: '平圩电厂',
        story: '1989 年首台六十万千瓦国产机组投产，后扩建至百万千瓦级。煤从矿井出来，走一条皮带就进锅炉。',
        chapterRef: 'now-c1',
      },
    },
  },
  {
    id: 'huainan-east',
    name: '淮南东站',
    lng: 117.12,
    lat: 32.58,
    kind: 'transit',
    priority: 2,
    eraStates: {
      now: {
        name: '淮南东站',
        story: '高铁把淮南拉进合肥半小时、南京一小时的圈子。九十年前为运煤修的铁路，如今换成了运人的。',
        chapterRef: 'now-c2',
      },
    },
  },
  {
    id: 'aust',
    name: '安徽理工大学',
    lng: 117.13,
    lat: 32.62,
    kind: 'building',
    priority: 3,
    eraStates: {
      now: {
        name: '安徽理工大学',
        story: '前身为 1945 年创办的淮南煤矿工业专门学校，2002 年更名。采矿、安全、地质学科以「下得去井」著称。',
        chapterRef: 'now-c2',
      },
    },
  },
]

export const POI_BY_ID: Record<string, Poi> = Object.fromEntries(
  HUAINAN_POIS.map((p) => [p.id, p]),
)
