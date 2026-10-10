import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

function countUp(el: HTMLElement) {
  const target = Number.parseFloat(el.getAttribute('data-count') || '0')
  const decimals = Number(el.getAttribute('data-dec') || '0')
  const suffix = el.getAttribute('data-suffix') || ''
  const prefix = el.getAttribute('data-prefix') || ''
  const state = { v: 0 }

  gsap.to(state, {
    v: target,
    duration: 1.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    onUpdate: () => {
      const raw = decimals ? state.v.toFixed(decimals) : String(Math.round(state.v))
      el.textContent = `${prefix}${Number(raw).toLocaleString('en-IN')}${suffix}`
    },
  })
}

/**
 * Mount once per page. Sweeps the page for:
 *  - [data-reveal]  -> fade/slide/blur in as each element enters the viewport
 *  - [data-count]   -> animates numeric textContent toward data-count
 * Scoped to the returned ref, cleaned up on unmount (SPA-safe), and fully
 * disabled under prefers-reduced-motion.
 */
export function usePageEffects<T extends HTMLElement>() {
  const scopeRef = useRef<T | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('[data-reveal]', { opacity: 0, y: 44, filter: 'blur(6px)' })

        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 86%',
          once: true,
          onEnter: (els) => {
            gsap.to(els, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power3.out',
              stagger: 0.08,
              overwrite: true,
            })
          },
        })

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach(countUp)
      })

      return () => mm.revert()
    },
    { scope: scopeRef },
  )

  return scopeRef
}