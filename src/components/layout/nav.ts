// 导航元数据的唯一来源：侧边栏、底部 Tab、顶栏标题都从这里派生，避免各处漂移。
export interface NavItem {
  to: string
  emoji: string
  /** 完整标签（侧边栏 / 顶栏标题） */
  label: string
  /** 移动端底部 Tab 的短标签 */
  shortLabel: string
  /** 侧边栏副说明 */
  desc: string
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/map', emoji: '🗺️', label: '时空地图', shortLabel: '时空地图', desc: '时间轴上看变迁' },
  { to: '/place', emoji: '📖', label: '此地从前', shortLabel: '此地从前', desc: '读懂一个地方' },
  { to: '/overlay', emoji: '🏛️', label: '古今对照', shortLabel: '古今对照', desc: '叠加对比今昔' },
  { to: '/guide', emoji: '🤖', label: 'AI 时空导游', shortLabel: '时空导游', desc: '与历史对话' },
  { to: '/nearby', emoji: '🚶', label: '发现身边故事', shortLabel: '身边故事', desc: '附近的历史' },
]

/** 路由 → 完整标题，用于顶栏 */
export const ROUTE_TITLES: Record<string, string> = Object.fromEntries(
  NAV_ITEMS.map((i) => [i.to, i.label]),
)
