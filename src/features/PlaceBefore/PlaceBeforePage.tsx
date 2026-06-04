import { useApp } from '../../context/AppContext'
import LocationPicker from '../../components/common/LocationPicker'
import StoryCard from '../../components/common/StoryCard'

export default function PlaceBeforePage() {
  const { activeLocation } = useApp()
  const { story } = activeLocation

  return (
    <div className="space-y-4 p-4">
      <LocationPicker />

      {/* 封面 */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-gradient-to-br from-ink-soft to-ink p-4">
        <span className="text-4xl">{activeLocation.cover}</span>
        <div>
          <h2 className="font-serif text-lg font-bold text-parchment-50">
            {activeLocation.name}
          </h2>
          <p className="text-xs text-parchment-200/70">{activeLocation.region}</p>
          <p className="mt-1 text-xs text-parchment-100/80">{activeLocation.tagline}</p>
        </div>
      </div>

      <StoryCard title="地名由来" icon="🏷️">
        <p>{story.nameOrigin}</p>
      </StoryCard>

      <StoryCard title="历史变迁" icon="🌀">
        <p>{story.changes}</p>
      </StoryCard>

      <StoryCard title="关键人物" icon="👤">
        <ul className="space-y-1">
          {story.keyFigures.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-seal">·</span>
              {f}
            </li>
          ))}
        </ul>
      </StoryCard>

      <StoryCard title="标志事件" icon="⭐">
        <ol className="space-y-1.5">
          {story.landmarkEvents.map((e) => (
            <li key={e} className="flex gap-2">
              <span className="text-seal">·</span>
              {e}
            </li>
          ))}
        </ol>
      </StoryCard>

      <StoryCard title="古今对比" icon="⏳" className="border-seal/20 bg-seal/5">
        <p>{story.pastVsPresent}</p>
      </StoryCard>
    </div>
  )
}
