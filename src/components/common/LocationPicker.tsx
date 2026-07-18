import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { searchLocationByAddress } from '../../data'

// 示例地址（覆盖全部四个种子地点）
const EXAMPLES = ['安徽淮南', '杭州市西湖区龙井路', '上海市南京东路', '新加坡丹戎巴葛']

/**
 * 地址选择器：可输入现代地址（按 aliases 模糊匹配），
 * 也可直接点选种子地点。命中后切换全局 activeLocation。
 */
export default function LocationPicker() {
  const { locations, activeLocationId, setActiveLocationId } = useApp()
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState(false)

  // 解析一段地址文本；命中则切换地点，未命中则提示
  const submit = (text = query) => {
    const hit = searchLocationByAddress(text)
    if (hit) {
      setActiveLocationId(hit.id)
      setNotFound(false)
    } else {
      setNotFound(true)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setNotFound(false)
          }}
          onKeyDown={(e) => {
            // 忽略输入法组合中的回车（如拼音选词确认）
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) submit()
          }}
          placeholder="输入一个现代地址…"
          className="flex-1 rounded-xl border border-white/10 bg-ink-soft/80 px-3 py-2 text-sm text-parchment-50 placeholder:text-parchment-200/40 focus:border-seal/60 focus:outline-none"
        />
        <button
          onClick={() => submit()}
          className="rounded-xl bg-seal px-4 py-2 text-sm font-medium text-parchment-50 active:scale-95"
        >
          穿越
        </button>
      </div>

      {notFound && (
        <p className="text-xs text-seal/90">
          暂无该地点的史料，试试下面的示例地址 👇
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              setQuery(ex)
              submit(ex)
            }}
            className="rounded-full border border-white/10 bg-parchment-200/5 px-2.5 py-1 text-[11px] text-parchment-100/80 active:scale-95"
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {locations.map((loc) => {
          const active = loc.id === activeLocationId
          return (
            <button
              key={loc.id}
              onClick={() => setActiveLocationId(loc.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                active
                  ? 'border-seal/60 bg-seal/15 text-parchment-50'
                  : 'border-white/10 bg-ink-soft/60 text-parchment-200/70'
              }`}
            >
              <span>{loc.cover}</span>
              {loc.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
