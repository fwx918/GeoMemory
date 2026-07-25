import { useEffect, useRef } from 'react'
import type { Paragraph, Poi } from '../../types'
import KindBadge from './KindBadge'
import SourceBar from './SourceBar'

interface Props {
  para: Paragraph
  /** 该段引用的 POI（已解析） */
  pois: Poi[]
  /** 段落滚入视野中央时回调，用于驱动地图高亮 */
  onEnter: (poiIds: string[]) => void
  /** 点击行内 POI 芯片 */
  onPoiClick: (poiId: string) => void
  active: boolean
}

/**
 * 正文段落：滚动至视野中部时通过 IntersectionObserver 通知父级高亮
 * 对应 POI；段末以芯片形式列出可点击的地点。
 */
export default function ParagraphBlock({ para, pois, onEnter, onPoiClick, active }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onEnterRef = useRef(onEnter)
  onEnterRef.current = onEnter

  useEffect(() => {
    const el = ref.current
    if (!el || !para.poiRefs?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onEnterRef.current(para.poiRefs ?? [])
        }
      },
      // 只在视口中部一条带内触发，避免整屏段落争抢
      { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [para.poiRefs])

  const isLegend = para.kind === 'legend'

  return (
    <div
      ref={ref}
      className={`relative rounded-lg py-1 pl-3 transition-colors duration-300 ${
        active ? 'bg-seal/[0.07]' : ''
      }`}
    >
      {/* 左侧竖线：当前段高亮 */}
      <span
        className={`absolute left-0 top-1.5 bottom-1.5 w-px rounded transition-colors duration-300 ${
          active ? 'bg-seal/70' : isLegend ? 'bg-seal/20' : 'bg-white/8'
        }`}
      />

      <p
        className={`text-sm leading-[1.9] ${
          isLegend
            ? 'font-serif text-parchment-100/80'
            : 'text-parchment-100/90'
        }`}
      >
        {para.kind && para.kind !== 'fact' && (
          <span className="mr-1.5 align-[2px]">
            <KindBadge kind={para.kind} />
          </span>
        )}
        {para.text}
      </p>

      {para.note && (
        <p className="mt-1.5 border-l-2 border-amber-300/30 bg-amber-300/[0.04] py-1 pl-2 text-[11px] leading-relaxed text-amber-100/60">
          {para.note}
        </p>
      )}

      {pois.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {pois.map((p) => (
            <button
              key={p.id}
              onClick={() => onPoiClick(p.id)}
              className="rounded-full border border-white/10 bg-ink-soft/70 px-2 py-0.5 text-[11px] text-parchment-100/75 transition-colors hover:border-seal/50 hover:text-parchment-50"
            >
              📍 {p.name}
            </button>
          ))}
        </div>
      )}

      {para.sources && para.sources.length > 0 && <SourceBar sources={para.sources} />}
    </div>
  )
}
