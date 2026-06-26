import type { Location } from '../types'
import { HUAINAN } from './huainan'
import { HANGZHOU } from './hangzhou'
import { SHANGHAI } from './shanghai'
import { SINGAPORE } from './singapore'

// ============================================================================
// 种子数据集 —— 四个地点均采用真实地理地图（GeoMap）：
//   · 淮南        —— 真实行政边界 + 淮河 + 瓦埠湖/高塘湖/焦岗湖（默认展示）
//   · 杭州西湖     —— 真实湖体 + 苏堤/白堤 + 钱塘江
//   · 上海南京东路 —— 真实市域边界 + 黄浦江/苏州河
//   · 新加坡丹戎巴葛 —— 真实主岛海岸线 + 历史海岸线（填海对比）
// 边界与水系坐标均为真实经纬度，渲染时由 GeoMap 投影到视图。
// ============================================================================

export const LOCATIONS: Location[] = [HUAINAN, HANGZHOU, SHANGHAI, SINGAPORE]

export default LOCATIONS
