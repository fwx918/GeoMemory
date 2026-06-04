import type { AiQARule, EraKey, Location } from '../types'

// 把口语化的年代说法映射到 EraKey
export const ERA_PHRASE_MAP: { phrases: string[]; era: EraKey }[] = [
  { phrases: ['古代', '古时', '最早', '一千年前', '千年前', '唐', '宋', '宋朝', '唐朝', '五百年前', '500年前', '几百年前'], era: 'ancient' },
  { phrases: ['1800', '清朝', '清代', '嘉庆', '两百年前', '200年前', '开埠前'], era: '1800' },
  { phrases: ['1900', '清末', '一百年前', '100年前', '租界', '殖民'], era: '1900' },
  { phrases: ['1950', '解放', '战后', '上世纪', '民国'], era: '1950' },
  { phrases: ['2000', '世纪之交', '千禧'], era: '2000' },
  { phrases: ['2026', '今天', '现在', '如今', '当代', '现代'], era: '2026' },
]

// 基于关键词的问答规则（按优先级从上到下匹配）
export const AI_QA_RULES: AiQARule[] = [
  {
    keywords: ['名字', '地名', '由来', '为什么叫', '名称', '得名'],
    answer: (loc: Location) => loc.story.nameOrigin,
  },
  {
    keywords: ['谁', '名人', '人物', '住过', '生活', '历史人物'],
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
