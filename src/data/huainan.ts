import type { GeoFeature, Location } from '../types'
import { HUAINAN_BBOX, HUAINAN_BOUNDARY } from './huainanBoundary'
import { HUAINAN_POIS } from './huainan/pois'
import { HUAINAN_DISTRICTS } from './generated/huainanDistricts'
import {
  CHU_CHAPTERS,
  HAN_CHAPTERS,
  JIN_CHAPTERS,
  QING_CHAPTERS,
  REPUBLIC_CHAPTERS,
  NOW_CHAPTERS,
} from './huainan/chapters'

// ============================================================================
// 淮南（朝代级时间轴）：
// - 真实行政边界（DataV）+ 淮河 / 瓦埠湖 / 高塘湖 / 焦岗湖 / 八公山
// - 6 档时间轴：战国楚 → 西汉 → 东晋 → 明清 → 近代 → 当代
// - 地标统一走共享 POI 表（src/data/huainan/pois.ts），章节见 chapters.ts
// ============================================================================

// 真实地理基础要素（各时代共有的自然水系与山体），坐标为真实经纬度 [lng, lat]。
// 位置依据真实地理近似绘制：淮河自西向东穿境而过，瓦埠湖在南、
// 高塘湖在东南、焦岗湖在西、八公山在城区西北。
const HUAI_RIVER: GeoFeature = {
  id: 'huai-river',
  kind: 'river',
  name: '淮河',
  coords: [
    [116.40, 32.58],
    [116.55, 32.63],
    [116.66, 32.68],
    [116.74, 32.72],
    [116.85, 32.70],
    [116.94, 32.64],
    [117.02, 32.62],
    [117.10, 32.63],
    [117.20, 32.61],
  ],
}

const WABU_LAKE: GeoFeature = {
  id: 'wabu-lake',
  kind: 'lake',
  name: '瓦埠湖',
  coords: [
    [116.93, 32.50],
    [116.99, 32.46],
    [117.02, 32.38],
    [117.0, 32.28],
    [116.95, 32.22],
    [116.9, 32.30],
    [116.89, 32.40],
    [116.9, 32.47],
  ],
}

const GAOTANG_LAKE: GeoFeature = {
  id: 'gaotang-lake',
  kind: 'lake',
  name: '高塘湖',
  coords: [
    [117.10, 32.50],
    [117.18, 32.48],
    [117.20, 32.42],
    [117.14, 32.40],
    [117.08, 32.45],
  ],
}

const JIAOGANG_LAKE: GeoFeature = {
  id: 'jiaogang-lake',
  kind: 'lake',
  name: '焦岗湖',
  coords: [
    [116.40, 32.62],
    [116.47, 32.61],
    [116.49, 32.55],
    [116.42, 32.54],
    [116.38, 32.58],
  ],
}

const BAGONG_MOUNTAIN: GeoFeature = {
  id: 'bagong-mountain',
  kind: 'mountain',
  name: '八公山',
  coords: [
    [116.74, 32.69],
    [116.81, 32.69],
    [116.83, 32.64],
    [116.77, 32.62],
    [116.73, 32.65],
  ],
}

// 寿春（寿县）古城墙——现存为南宋嘉定十二年重筑的砖城，四门带瓮城；
// 战国楚都寿春城址在今寿县城东南，规模远大于此，本要素仅作位置示意。
const SHOUCHUN_WALL: GeoFeature = {
  id: 'shouchun-wall',
  kind: 'wall',
  name: '寿春城墙',
  coords: [
    [116.775, 32.595],
    [116.80, 32.595],
    [116.80, 32.575],
    [116.775, 32.575],
  ],
}

// 1950s 淮南铁路：田家庵向南（运煤干线）
const HUAINAN_RAIL: GeoFeature = {
  id: 'huainan-rail-1950',
  kind: 'rail',
  name: '淮南铁路',
  coords: [
    [117.0, 32.63],
    [117.04, 32.5],
    [117.08, 32.35],
    [117.1, 32.2],
  ],
}

// 现代高铁（商合杭 / 京福经淮南东站）：东西向
const HIGH_SPEED_RAIL: GeoFeature = {
  id: 'hsr-2026',
  kind: 'rail',
  name: '高铁线',
  coords: [
    [116.85, 32.52],
    [116.98, 32.56],
    [117.12, 32.58],
    [117.21, 32.6],
  ],
}

export const HUAINAN: Location = {
  id: 'huainan',
  name: '淮南',
  aliases: ['淮南', '淮南市', '安徽淮南', '寿春', '寿县', '八公山', '田家庵', 'huainan'],
  region: '安徽 · 淮南',
  coord: { lat: 32.6476, lng: 117.0183 },
  cover: '⛰️',
  tagline: '淮水之南，楚都遗韵与煤电之都的千年叠影',
  timeline: [
    { key: 'now', label: '当代', dynasty: '能源之都·科教转型', yearRange: [2000, 2026], year: 2015, weight: 2 },
    { key: 'republic', label: '近代', dynasty: '因煤而兴', yearRange: [1900, 1999], year: 1950, weight: 2 },
    { key: 'qing', label: '明清', dynasty: '寿州漕运', yearRange: [1368, 1899], year: 1750, weight: 1 },
    { key: 'jin', label: '东晋', dynasty: '淝水之战', yearRange: [317, 420], year: 383, weight: 3 },
    { key: 'han', label: '西汉', dynasty: '淮南国', yearRange: [-206, 220], year: -160, weight: 3 },
    { key: 'chu', label: '战国楚', dynasty: '楚都寿春', yearRange: [-241, -223], year: -241, weight: 3 },
  ],
  geo: {
    bbox: HUAINAN_BBOX,
    boundary: HUAINAN_BOUNDARY,
    base: [HUAI_RIVER, WABU_LAKE, GAOTANG_LAKE, JIAOGANG_LAKE, BAGONG_MOUNTAIN],
    districts: HUAINAN_DISTRICTS,
  },
  pois: HUAINAN_POIS,
  featuredCompare: ['jin', 'now'],
  records: {
    now: {
      era: 'now',
      title: '当代 · 能源之都与科教转型',
      summary:
        '今天的淮南是「中国能源之都」：平圩等大型坑口电厂沿淮河而立，煤从矿井走一条皮带就进锅炉，变成送往长三角的电。高铁淮南东站把这里拉进合肥半小时圈，安徽理工大学等高校扎根煤城；采煤沉陷区架起水面光伏，2015 年寿县划归淮南，楚都与煤城合到了一个市名之下。',
      highlights: ['中国能源之都·坑口电厂群', '高铁淮南东站', '采煤沉陷区水面光伏', '2015 寿县划归淮南'],
      imageHint: '⚡',
      chapters: NOW_CHAPTERS,
      geoOverlay: {
        features: [HIGH_SPEED_RAIL],
        poiRefs: ['tianjiaan', 'pingwei', 'huainan-east', 'aust', 'shungeng', 'datong', 'shouchun', 'bagong'],
      },
    },
    republic: {
      era: 'republic',
      title: '近代 · 因煤而兴',
      summary:
        '1930 年国民政府在舜耕山北麓的九龙岗开凿新式竖井，淮南的煤第一次成规模地出井；1934 年淮南铁路通车，煤经裕溪口装船下长江，田家庵由渡口集镇变成枢纽。抗战期间日军侵占矿区，大通留下「万人坑」。1949 年设矿区，1950 年建市，1952 年升为省辖市——这座城市的建制，是跟着煤层走出来的。',
      highlights: ['1930 九龙岗新式竖井', '1934 淮南铁路通车', '大通万人坑', '1952 年升为省辖市'],
      imageHint: '⛏️',
      chapters: REPUBLIC_CHAPTERS,
      geoOverlay: {
        features: [HUAINAN_RAIL],
        poiRefs: ['datong', 'jiulonggang', 'tianjiaan', 'shungeng', 'fengtai'],
      },
    },
    qing: {
      era: 'qing',
      title: '寿州与凤台 · 明清',
      summary:
        '明清这一带属凤阳府寿州，乾隆四十二年（1777）析淮北之地置凤台县。南宋重筑的四门砖城既挡兵也挡水，淮河一涨城外汪洋而城内安然。西六十里的正阳关「七十二水通正阳」，是淮河中游最大的水陆码头；瓦埠湖、焦岗湖沿岸圩田连片，而淮河南岸的田家庵还只是个渡口小集。',
      highlights: ['寿州四门砖城·月坝防洪', '1777 析置凤台县', '正阳关漕运码头', '瓦埠湖圩田与淮河水患'],
      imageHint: '⛵',
      chapters: QING_CHAPTERS,
      geoOverlay: {
        poiRefs: ['shouchun', 'fengtai', 'zhengyangguan', 'tianjiaan', 'wabuhu', 'anfengtang'],
      },
    },
    jin: {
      era: 'jin',
      title: '寿阳 · 淝水之战',
      summary:
        '东晋避郑太后讳，寿春改称寿阳，成为南北对峙时代最要紧的一把锁钥。太元八年（383）前秦苻坚倾国南下，攻陷寿阳后登城东望，见八公山草木摇动皆疑晋兵；谢石、谢玄率北府兵八万夹淝水而阵，请秦军稍退以决战，秦阵一动即溃。「草木皆兵」「风声鹤唳」自此写进汉语，南北朝格局就此奠定。',
      highlights: ['383 苻坚南下·陷寿阳', '刘牢之夜袭洛涧', '草木皆兵·风声鹤唳', '谢安折屐齿'],
      imageHint: '⚔️',
      chapters: JIN_CHAPTERS,
      geoOverlay: {
        features: [SHOUCHUN_WALL],
        poiRefs: ['shouchun', 'bagong', 'feishui', 'wabuhu', 'fengtai'],
      },
    },
    han: {
      era: 'han',
      title: '淮南国 · 刘安与《淮南子》',
      summary:
        '汉高祖封英布为淮南王，「淮南」始为国名；刘长时王都东移寿春，前 164 年刘安受封淮南王。刘安好书鼓琴，招致宾客方术之士数千人编成《淮南子》，二十四节气最早的完整名目、女娲补天与后羿射日的说法都赖此书保存。相传他在八公山炼丹得豆腐，又有「一人得道，鸡犬升天」的传说；前 122 年谋反事发自杀，国除为九江郡。',
      highlights: ['前 202 英布封淮南王', '前 164 刘安都寿春', '《淮南子》与二十四节气', '八公山炼丹·豆腐传说'],
      imageHint: '🏛️',
      chapters: HAN_CHAPTERS,
      geoOverlay: {
        features: [SHOUCHUN_WALL],
        poiRefs: ['shouchun', 'bagong', 'wabuhu'],
      },
    },
    chu: {
      era: 'chu',
      title: '寿春 · 楚国最后的都城',
      summary:
        '楚考烈王二十二年（前 241），楚人畏秦东徙，《史记》记「楚东徙都寿春，命曰郢」。此后十八年，寿春是楚国最后一座国都；前 223 年王翦破楚、虏王负刍，八百年的楚国在这座城下终结。城南百里的芍陂（安丰塘）相传为孙叔敖所筑，比楚都还早三百年，至今仍在灌田。',
      highlights: ['前 241 楚东徙都寿春', '前 223 秦灭楚', '寿春城遗址与铸客大鼎', '芍陂·孙叔敖'],
      imageHint: '🏺',
      chapters: CHU_CHAPTERS,
      geoOverlay: {
        features: [SHOUCHUN_WALL],
        poiRefs: ['shouchun', 'fengtai', 'anfengtang'],
      },
    },
  },
  story: {
    nameOrigin:
      '「淮南」即淮河之南。西汉高祖封英布为淮南王，后又封刘长、刘安，淮南国都于寿春（今寿县）。今日的淮南市于 1952 年因煤设市，名字承袭了这片淮水之南的古老地域。',
    changes:
      '从战国楚国的末代都城寿春，到西汉的淮南国，再到淝水之战的古战场；从清代寿州、凤台的漕运圩田，到近代因煤而兴的淮南铁路与矿区，直至今日的「能源之都」——淮南的每一层叠影都与淮河相连。',
    keyFigures: ['楚考烈王（迁都寿春）', '淮南王刘安（编《淮南子》、八公山豆腐）', '谢安·谢玄（淝水之战晋军统帅）', '苻坚（淝水之战前秦君主）'],
    landmarkEvents: [
      '前 241·楚国迁都寿春',
      '西汉·设淮南国，刘安编《淮南子》、传说八公山始制豆腐',
      '383·淝水之战，东晋大败前秦',
      '1934·淮南铁路通车，矿区崛起；1952 年设淮南市',
    ],
    pastVsPresent:
      '两千多年前，你脚下的寿春是楚国的国都、淮南国的中心，八公山上方士炼丹、淝水之畔刀兵相见；今天同一片淮水之南，已是机组轰鸣的煤电基地与高铁穿行的现代城市。唯有那条淮河，依旧自西向东，把楚都的月色与电厂的灯火一并映在水面。',
  },
  nearby: [
    { id: 'hn-bagong', name: '八公山', distanceM: 6000, era: 'han', blurb: '淮南王刘安炼丹之地，相传豆腐由此而生，亦是淝水之战「草木皆兵」的典故所在。', emoji: '⛰️' },
    { id: 'hn-shouxian', name: '寿县古城', distanceM: 22000, era: 'qing', blurb: '南宋嘉定年间重筑的砖城，四门带瓮城；城下叠着楚都寿春与淮南国的旧址。', emoji: '🏯' },
    { id: 'hn-feishui', name: '淝水古战场', distanceM: 9000, era: 'jin', blurb: '公元 383 年东晋以八万北府兵大破倾国南下的前秦，奠定南北朝格局。', emoji: '⚔️' },
    { id: 'hn-datong', name: '大通煤矿遗址', distanceM: 5000, era: 'republic', blurb: '近代淮南煤炭工业的起点，万人坑与窑神庙记录着城市因煤而兴的岁月。', emoji: '⛏️' },
  ],
}

export default HUAINAN
