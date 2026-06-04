import type { ReactNode } from 'react'

interface Props {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export default function StoryCard({ title, icon, children, className = '' }: Props) {
  return (
    <section
      className={`animate-fade-in rounded-2xl border border-white/5 bg-ink-soft/60 p-4 ${className}`}
    >
      <h3 className="mb-2 flex items-center gap-1.5 font-serif text-sm font-semibold text-parchment-50">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-parchment-100/85">{children}</div>
    </section>
  )
}
