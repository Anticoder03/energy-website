import { useRef, type ReactNode } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Pinned horizontal pan — used exactly once on the homepage.
 * On desktop the section pins and the track scrubs sideways with scroll.
 * Mobile falls back to native horizontal scroll-snap.
 */
export function HorizontalPan({
  header,
  children,
}: {
  header: ReactNode
  children: ReactNode
}) {
  const wrapRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 64rem) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, trackRef.current!.scrollWidth - window.innerWidth)
        gsap.to(trackRef.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!fillRef.current) return
              gsap.set(fillRef.current, { scaleX: self.progress })
            },
          },
        })
      })
      return () => mm.revert()
    },
    { scope: wrapRef },
  )

  return (
    <section ref={wrapRef} className="relative flex flex-col overflow-hidden">
      <div className="container-x pt-24 pb-8 lg:pt-28">{header}</div>

      <div
        ref={trackRef}
        className="no-scrollbar flex w-max snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:w-auto lg:overflow-visible lg:px-0"
      >
        {children}
      </div>

      <div className="container-x mt-4 hidden pb-20 lg:block">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Scroll to explore
          </span>
          <div className="h-px flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              ref={fillRef}
              className="h-full w-full origin-left scale-x-0 bg-volt"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <ArrowRight size={15} className="text-ink-muted" />
        </div>
      </div>
    </section>
  )
}