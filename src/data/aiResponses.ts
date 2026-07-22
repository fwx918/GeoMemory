import type { AiQARule, Location } from '../types'

/**
 * 口语化年代说法 → 目标年份。
 * 匹配到年份后由 getClosestEraByYear 在当前地点的时间轴上就近取时代，
 * 因此同一句「南宋」在杭州命中 south-song、在淮南就近落到 ancient。
 * 注意：短语需足够具体（不收「唐」「宋」单字，避免命中唐人街/宋城）；
 * 顺序即优先级，具体朝代在前、泛称在后。
 */
export const ERA_PHRASE_MAP: { phrases: string[]; year: number; label: string }[] = [
  { phrases: ['南宋', '临安'], year: 1200, label: '南宋' },
  { phrases: ['北宋'], year: 1090, label: '北宋' },
  { phrases: ['吴越'], year: 940, label: '吴越国时期' },
  { phrases: ['唐朝', '唐代'], year: 800, label: '唐代' },
  { phrases: ['宋朝', '宋代'], year: 1150, label: '宋代' },
  { phrases: ['元朝', '元代'], year: 1300, label: '元代' },
  { phrases: ['明朝', '明代'], year: 1550, label: '明代' },
  { phrases: ['隋朝', '隋代'], year: 600, label: '隋代' },
  { phrases: ['秦朝', '秦汉', '汉代', '六朝'], year: 100, label: '秦汉时期' },
  { phrases: ['清末', '租界', '殖民'], year: 1900, label: '清末' },
  { phrases: ['清朝', '清代', '嘉庆', '乾隆', '康熙'], year: 1780, label: '清代' },
  { phrases: ['民国'], year: 1930, label: '民国' },
  { phrases: ['五百年前', '500年前'], year: 1526, label: '500年前' },
  { phrases: ['一千年前', '千年前'], year: 1026, label: '1000年前' },
  { phrases: ['两百年前', '200年前', '1800', '开埠前'], year: 1826, label: '200年前' },
  { phrases: ['一百年前', '100年前', '1900'], year: 1926, label: '100年前' },
  { phrases: ['1950', '解放', '战后', '上世纪'], year: 1950, label: '1950年代' },
  { phrases: ['2000', '世纪之交', '千禧'], year: 2000, label: '2000年前后' },
  { phrases: ['2026', '今天', '如今', '当代', '现代'], year: 2026, label: '今天' },
  { phrases: ['古代', '古时', '最早', '几百年前'], year: 300, label: '古代' },
]

// 基于关键词的问答规则（按优先级从上到下匹配；在年代检测之前执行）
export const AI_QA_RULES: AiQARule[] = [
  {
    keywords: ['名字', '地名', '由来', '为什么叫', '名称', '得名'],
    answer: (loc: Location) => loc.story.nameOrigin,
  },
  {
    keywords: ['谁', '名人', '人物', '住过', '历史人物'],
    answer: (loc: Location) =>
      `与「${loc.name}」渊源最深的人物有：${loc.story.keyFigures.join('、')}。\n\n${loc.story.changes}`,
  },
  {
    keywords: ['事件', '发生', '大事', '历史', '故事'],
    answer: (loc: Location) =>
      `「${loc.name}」经历过这些标志性事件：\n${loc.story.landmarkEvents
        .map((e) => `· ${e}`)
        .join('\n')}`,
  },
  {
    keywords: ['对比', '区别', '变化', '不同', '古今', '以前和现在'],
    answer: (loc: Location) => loc.story.pastVsPresent,
  },
  {
    keywords: ['吃', '生活', '居民', '怎么过', '日常', '古人'],
    answer: (loc: Location) =>
      `要体会古人在「${loc.name}」的生活，不妨看看不同年代的画面：${loc.story.changes}`,
  },
]
