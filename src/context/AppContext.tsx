import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ChatMessage, EraKey, Location } from '../types'
import { getAvailableEras, getClosestEra, getLocationById, LOCATIONS } from '../data'

interface AppState {
  locations: Location[]
  activeLocation: Location
  activeLocationId: string
  setActiveLocationId: (id: string) => void

  activeEra: EraKey
  setActiveEra: (era: EraKey) => void
  /** 当前地点真实可用的时代（从今到古） */
  availableEras: EraKey[]

  /** AI 时空导游对话历史（跨标签页保留） */
  chat: ChatMessage[]
  pushChat: (msg: ChatMessage) => void

  /** 待地图消费的聚焦请求（导游回答里的「在地图上看」） */
  pendingFocusPoiId: string | null
  requestFocusPoi: (poiId: string, era?: EraKey) => void
  clearPendingFocus: () => void
}

const AppContext = createContext<AppState | null>(null)

const DEFAULT_LOCATION_ID = LOCATIONS[0].id
const DEFAULT_ERA: EraKey = '2026'

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeLocationId, setActiveLocationIdRaw] = useState(DEFAULT_LOCATION_ID)
  const [activeEra, setActiveEra] = useState<EraKey>(DEFAULT_ERA)
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [pendingFocusPoiId, setPendingFocusPoiId] = useState<string | null>(null)

  const activeLocation = useMemo(
    () => getLocationById(activeLocationId) ?? LOCATIONS[0],
    [activeLocationId],
  )

  const availableEras = useMemo(() => getAvailableEras(activeLocation), [activeLocation])

  // 切换地点时，确保当前时代在新地点可用，否则就近回退（复用 getClosestEra）
  const setActiveLocationId = useCallback((id: string) => {
    setActiveLocationIdRaw(id)
    const loc = getLocationById(id)
    if (loc) setActiveEra((prev) => getClosestEra(loc, prev) ?? prev)
  }, [])

  const pushChat = useCallback((msg: ChatMessage) => {
    setChat((prev) => [...prev, msg])
  }, [])

  // 导游回答的操作 chip：先切时代，再把聚焦请求交给地图页
  const requestFocusPoi = useCallback((poiId: string, era?: EraKey) => {
    if (era) setActiveEra(era)
    setPendingFocusPoiId(poiId)
  }, [])

  const clearPendingFocus = useCallback(() => setPendingFocusPoiId(null), [])

  const value = useMemo<AppState>(
    () => ({
      locations: LOCATIONS,
      activeLocation,
      activeLocationId,
      setActiveLocationId,
      activeEra,
      setActiveEra,
      availableEras,
      chat,
      pushChat,
      pendingFocusPoiId,
      requestFocusPoi,
      clearPendingFocus,
    }),
    [
      activeLocation,
      activeLocationId,
      setActiveLocationId,
      activeEra,
      availableEras,
      chat,
      pushChat,
      pendingFocusPoiId,
      requestFocusPoi,
      clearPendingFocus,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp 必须在 <AppProvider> 内使用')
  return ctx
}
