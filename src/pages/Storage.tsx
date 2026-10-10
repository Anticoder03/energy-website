import { Link } from 'react-router-dom'
import { BatteryCharging, Lightning, Plug, Timer } from '@phosphor-icons/react'
import { ProductCard } from '@/components/ProductCard'
import { ButtonLink, SectionHead } from '@/components/ui'
import { usePageEffects } from '@/hooks/usePageEffects'
import { PRODUCTS } from '@/data/products'
import { IMG } from '@/data/products'
import { GRID_KNOWLEDGE } from '@/data/site'

const PILLARS = [
  {
    icon: Timer,
    title: 'Half-second switchover',
    body: 'A transfer delay you cannot feel. Lights, fans, fridge and router stay online when the grid blinks.',
  },
  {
    icon: BatteryCharging,
    title: '6,000-cycle chemistry',
    body: 'Lithium iron phosphate cells rated for 15+ years of daily cycling — no lead-acid maintenance, ever.',
  },
  {
    icon: Plug,
    title: 'One cable, one app',
    body: 'Stackable modules link on a single busbar. Monitor state of charge and export from the Voltaic app.',
  },
  {
    icon: Lightning,
    title: 'Run heavy loads',
    body: 'Ton ACs, borewell pumps and EV chargers — sized output, not just lights-and-fan backup.',
  },
]

export function Storage() {
  const ref = usePageEffects<HTMLDivElement>()
  const batteries = PRODUCTS.filter((p) => p.category === 'storage')

  return (
    <div ref={ref}>
      {/* header */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pb-28 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(55% 50% at 78% 20%, rgba(184,243,60,0.10), transparent 60%)' }}
        />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
              Battery storage
            </p>
            <h1 data-reveal className="mt-3 text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
              Your rooftop doesn't stop at sunset
            </h1>
            <p data-reveal className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg">
              Voltaic Vault and VoltCore batteries bank your daytime export and fire it back when the
              grid drops — or when evening tariffs climb.
            </p>
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/shop?category=storage" icon>
                Shop storage
              </ButtonLink>
              <ButtonLink to="/contact" variant="ghost">
                Get a quote
              </ButtonLink>
            </div>
          </div>

          <div data-reveal className="bezel">
            <div className="bezel-core">
              <div className="relative aspect-[16/10]">
                <img src={IMG.batteryWall} alt="Voltaic Vault wall battery" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                  {GRID_KNOWLEDGE.map((k) => (
                    <div key={k.k} className="rounded-xl border border-white/10 bg-void/50 p-3 backdrop-blur-sm">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">{k.k}</p>
                      <p className="mt-1 text-sm font-bold text-white">{k.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section className="border-y border-white/8 bg-void-2 py-24">
        <div className="container-x">
          <SectionHead
            data-reveal
            title="Storage, engineered like the grid owes you minutes"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                data-reveal
                className="rounded-card border border-white/8 bg-panel p-6 transition-colors duration-300 hover:border-volt/30"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-volt/12 text-volt ring-1 ring-volt/25">
                  <p.icon size={20} weight="duotone" />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* lineup */}
      <section className="container-x py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 data-reveal className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              The Voltaic battery line
            </h2>
            <p data-reveal className="mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
              Two ways to build your reserve — a complete wall unit, or stackable modules around a hybrid inverter.
            </p>
          </div>
          <Link to="/shop?category=storage" className="text-sm font-semibold text-ink-muted transition-colors hover:text-volt">
            All storage →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {batteries.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* math band */}
      <section className="relative overflow-hidden py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(50% 60% at 20% 40%, rgba(184,243,60,0.08), transparent 65%)' }}
        />
        <div className="container-x relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
              Storage math
            </p>
            <h2 data-reveal className="mt-3 text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              A typical home breaks even in 4–6 years
            </h2>
            <p data-reveal className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-muted">
              Add a Vault to a 5 kW array and the payback shifts ~18 months later — then the battery keeps
              earning for another decade. The calculator on the homepage will model your numbers.
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink to="/#calculator" variant="ghost" icon>
                Run the numbers
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div data-reveal className="bezel">
              <div className="bezel-core !rounded-2xl p-6 sm:p-8">
                <div className="grid gap-8 sm:grid-cols-3">
                  {[
                    { v: '0.5 s', l: 'switchover time' },
                    { v: '6,000', l: 'charge cycles rating' },
                    { v: '92%', l: 'single-cycle round-trip' },
                    { v: '10 yr', l: 'battery warranty' },
                    { v: '20.4 kWh', l: 'max stack size' },
                    { v: 'IP65', l: 'indoor / outdoor rating' },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="font-mono text-3xl font-bold tracking-[-0.03em] text-volt">{s.v}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}