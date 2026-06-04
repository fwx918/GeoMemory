import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ChatMessage, EraKey, Location } from '../types'
import { getAvailableEras, getLocationById, getRecord, LOCATIONS } from '../data'

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
  resetChat: () => void
}

const AppContext = createContext<AppState | null>(null)

const DEFAULT_LOCATION_ID = LOCATIONS[0].id
const DEFAULT_ERA: EraKey = '2026'

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeLocationId, setActiveLocationIdRaw] = useState(DEFAULT_LOCATION_ID)
  const [activeEra, setActiveEra] = useState<EraKey>(DEFAULT_ERA)
  const [chat, setChat] = useState<ChatMessage[]>([])

  const activeLocation = useMemo(
    () => getLocationById(activeLocationId) ?? LOCATIONS[0],
    [activeLocationId],
  )

  const availableEras = useMemo(() => getAvailableEras(activeLocation), [activeLocation])

  // 切换地点时，确保当前时代在新地点可用，否则回退到最接近的时代
  const setActiveLocationId = useCallback(
    (id: string) => {
      setActiveLocationIdRaw(id)
      const loc = getLocationById(id)
      if (loc) {
        const eras = getAvailableEras(loc)
        setActiveEra((prev) => {
          if (eras.includes(prev)) return prev
          // getRecord 会回退，但时间轴需要一个真实存在的 key
          const rec = getRecord(loc, prev)
          return rec?.era ?? eras[0]
        })
      }
    },
    [],
  )

  const pushChat = useCallback((msg: ChatMessage) => {
    setChat((prev) => [...prev, msg])
  }, [])

  const resetChat = useCallback(() => setChat([]), [])

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
      resetChat,
    }),
    [
      activeLocation,
      activeLocationId,
      setActiveLocationId,
      activeEra,
      availableEras,
      chat,
      pushChat,
      resetChat,
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
