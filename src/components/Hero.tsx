import { Link } from 'react-router-dom'
import { ArrowUpRight, Lightning } from '@phosphor-icons/react'
import { gsap, useGSAP } from '@/lib/gsap'
import { IMG } from '@/data/products'

const TRUST = ['25-yr performance warranty', 'GST invoiced', 'PAN-India install', 'Net-metering handled']

export function Hero() {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('[data-hero-line]', {
        y: 60,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 1.1,
        stagger: 0.1,
      }).from(
        '[data-hero-visual]',
        { opacity: 0, scale: 0.95, y: 40, duration: 1.2 },
        '-=0.5',
      )

      gsap.to('[data-float]', {
        y: -14,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })
    return () => mm.revert()
  })

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-24 lg:pt-28">
      {/* ambient volt glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 72% 12%, rgba(184,243,60,0.10), transparent 60%), radial-gradient(45% 40% at 12% 85%, rgba(184,243,60,0.05), transparent 60%)',
        }}
      />
      {/* faint grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(70% 60% at 50% 30%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, black, transparent)',
        }}
      />

      <div className="container-x relative z-10 grid flex-1 items-center gap-14 pb-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p data-hero-line className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted backdrop-blur-sm">
            <Lightning size={12} weight="fill" className="text-volt" />
            Solar + storage · engineered for Indian rooftops
          </p>

          <h1 className="mt-6 text-balance text-[clamp(2.9rem,8vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
            {['Own the sun.', 'Keep the power.'].map((line, i) => (
              <span key={line} data-hero-line className="block">
                {i === 1 ? (
                  <span className="italic">
                    <span className="text-gradient-volt">{line}</span>
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p data-hero-line className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg">
            Premium solar panels and home battery storage, installed by certified teams — with
            25-year performance backing.
          </p>

          <div data-hero-line className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center rounded-full bg-volt py-3.5 pl-6 pr-2 text-sm font-semibold text-void shadow-[0_18px_50px_-16px_rgba(184,243,60,0.5)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-volt-2 active:scale-[0.98]"
            >
              Shop solar
              <span className="ml-3 grid h-8 w-8 place-items-center rounded-full bg-void/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} weight="bold" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-white/12 px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-white/25 hover:bg-white/5"
            >
              Get a quote
            </Link>
          </div>
        </div>

        {/* visual stack */}
        <div data-hero-visual className="relative lg:col-span-5">
          <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[3rem] bg-volt/8 blur-3xl" />

          <div className="bezel">
            <div className="bezel-core">
              <div className="relative aspect-[4/5] sm:aspect-[5/5]">
                <img
                  src={IMG.roofPortrait}
                  alt="Solar panels installed on a residential rooftop"
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Array</p>
                    <p className="text-xl font-bold text-white">5.2 kW</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-void/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-volt ring-1 ring-volt/25 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-volt" />
                    Generating
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            data-float
            className="bezel absolute -left-3 top-8 w-44 rotate-[-2deg] sm:-left-10 sm:top-12"
          >
            <div className="bezel-core !rounded-2xl p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">Vault 2</p>
              <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-ink">62%</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">battery · charging</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[62%] rounded-full bg-volt" />
              </div>
            </div>
          </div>

          <div
            data-float
            className="absolute -bottom-6 right-2 rounded-2xl border border-white/10 bg-void/70 p-4 backdrop-blur-xl sm:right-6"
            style={{ animationDelay: '1.2s' }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">Today so far</p>
            <p className="mt-1 font-mono text-lg font-bold text-volt">18.4 kWh</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">14.7 kWh exported</p>
          </div>
        </div>
      </div>

      {/* trust strip */}
      <div className="container-x relative z-10 pb-8">
        <ul
          data-hero-line
          className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/8 pt-6 sm:grid-cols-4"
        >
          {TRUST.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}