import type { EraDef, EraKey } from '../../types'

interface Props {
  /** 可用时代（从今到古） */
  eras: EraDef[]
  value: EraKey
  onChange: (era: EraKey) => void
}

/**
 * 时间轴滑块：在该地点可用的时代之间切换（从今到古）。
 * 离散刻度，每一步对应一个真实存在的时代记录；
 * 刻度多时（如杭州 11 档）仅重点时代显示文字标签，其余悬浮可见。
 */
export default function TimelineSlider({ eras, value, onChange }: Props) {
  const index = Math.max(0, eras.findIndex((e) => e.key === value))
  const active = eras[index]
  const dense = eras.length > 6

  return (
    <div className="rounded-2xl bg-ink-soft/80 p-4">
      <div className="mb-2 flex items-baseline justify-between text-xs text-parchment-200/60">
        <span>现在</span>
        <span className="flex items-baseline gap-1.5">
          <span className="font-serif text-base text-seal">{active?.label}</span>
          {active?.dynasty && (
            <span className="text-[10px] text-parchment-200/50">{active.dynasty}</span>
          )}
        </span>
        <span>更早</span>
      </div>

      <input
        type="range"
        min={0}
        max={Math.max(0, eras.length - 1)}
        step={1}
        value={index}
        onChange={(e) => onChange(eras[Number(e.target.value)].key)}
        className="w-full accent-seal"
        aria-label="时间轴"
      />

      <div className="mt-2 flex justify-between">
        {eras.map((e) => {
          const isActive = e.key === value
          // 密集时间轴：仅权重 3 或当前项显示标签，避免文字挤压
          const showLabel = !dense || isActive || e.weight === 3
          return (
            <button
              key={e.key}
              onClick={() => onChange(e.key)}
              title={`${e.label}${e.dynasty ? ` · ${e.dynasty}` : ''}`}
              className={`flex min-w-0 flex-col items-center gap-1 text-[10px] transition-colors ${
                isActive ? 'text-seal' : 'text-parchment-200/40 hover:text-parchment-100'
              }`}
            >
              <span
                className={`rounded-full ${
                  e.weight === 3 ? 'h-2 w-2' : 'h-1.5 w-1.5'
                } ${isActive ? 'bg-seal' : 'bg-parchment-200/30'}`}
              />
              <span className={showLabel ? '' : 'invisible'}>{e.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
