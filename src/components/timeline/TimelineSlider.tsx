import type { EraKey } from '../../types'
import { getEra } from '../../data'

interface Props {
  eras: EraKey[]
  value: EraKey
  onChange: (era: EraKey) => void
}

/**
 * 时间轴滑块：在该地点可用的时代之间切换（从今到古）。
 * 用离散刻度而非连续 range，确保每一步都对应一个真实的时代记录。
 */
export default function TimelineSlider({ eras, value, onChange }: Props) {
  const index = Math.max(0, eras.indexOf(value))

  return (
    <div className="rounded-2xl bg-ink-soft/80 p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-parchment-200/60">
        <span>现在</span>
        <span className="font-serif text-base text-seal">{getEra(value).label}</span>
        <span>更早</span>
      </div>

      <input
        type="range"
        min={0}
        max={eras.length - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(eras[Number(e.target.value)])}
        className="w-full accent-seal"
        aria-label="时间轴"
      />

      <div className="mt-2 flex justify-between">
        {eras.map((k) => {
          const active = k === value
          return (
            <button
              key={k}
              onClick={() => onChange(k)}
              className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${
                active ? 'text-seal' : 'text-parchment-200/40 hover:text-parchment-100'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-seal' : 'bg-parchment-200/30'}`}
              />
              {getEra(k).label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
