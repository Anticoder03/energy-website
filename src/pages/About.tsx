import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui'
import { usePageEffects } from '@/hooks/usePageEffects'
import { STATS } from '@/data/site'
import { IMG } from '@/data/products'

const VALUES = [
  {
    title: 'Warranty before watts',
    body: 'Every kit ships with the full warranty trail printed on the invoice — no verbal promises.',
  },
  {
    title: 'Sized to the bill',
    body: 'We model your actual consumption before selling you hardware, not after.',
  },
  {
    title: 'One throat to choke',
    body: 'Survey, install, paperwork and support under one rooftop team. You never juggle vendors.',
  },
  {
    title: 'Built for Indian weather',
    body: 'Dust, hail, 45°C summers and monsoon storms — equipment selected and tested for them.',
  },
]

export function About() {
  const ref = usePageEffects<HTMLDivElement>()

  return (
    <div ref={ref} className="container-x pt-28 pb-24 lg:pt-36">
      <section className="max-w-3xl">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
          About Voltaic
        </p>
        <h1 data-reveal className="mt-3 text-balance text-4xl font-bold leading-[1.03] tracking-[-0.035em] text-ink sm:text-5xl">
          We started by fixing our own dusty rooftops
        </h1>
        <p data-reveal className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-muted sm:text-lg">
          Voltaic began as a Surat engineering team that kept seeing the same problem: homeowners were
          sold panels and left to handle wiring, paperwork and payback math alone. Eighteen years of
          design work later, we still build every system the way we wish someone had built our first one.
        </p>
      </section>

      <section className="mt-16 grid items-center gap-12 lg:grid-cols-2">
        <div data-reveal className="bezel -rotate-1">
          <div className="bezel-core">
            <div className="relative aspect-[4/3]">
              <img src={IMG.roofAlt} alt="Residential solar array" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            </div>
          </div>
        </div>
        <div>
          <h2 data-reveal className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Engineering, not just installation
          </h2>
          <p data-reveal className="mt-4 text-base leading-relaxed text-ink-muted">
            A Voltaic project starts with a shadow study and your last twelve months of bills. Only then
            do we size modules, inverter, storage and structure — every component traceable to one kit
            list and one warranty.
          </p>
          <p data-reveal className="mt-4 text-base leading-relaxed text-ink-muted">
            Our install network spans 160+ cities, and our monitoring team reviews every array annually
            so generation keeps matching your bill, year after year.
          </p>
          <div data-reveal className="mt-8">
            <ButtonLink to="/shop" icon>
              Browse the catalog
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-5 sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <div
            key={v.title}
            data-reveal
            className={
              i === 0
                ? 'rounded-card border border-volt/25 bg-volt/8 p-7'
                : 'rounded-card border border-white/8 bg-panel p-7'
            }
          >
            <span className="font-mono text-sm text-volt">0{i + 1}</span>
            <h3 className="mt-3 text-lg font-bold text-ink">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 border-y border-white/8 bg-void-2">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-reveal className="p-8 lg:border-l lg:border-white/8 lg:first:border-l-0">
              <p className="font-mono text-4xl font-bold tracking-[-0.03em] text-ink">
                <span data-count={s.value} data-suffix={s.suffix}>
                  {s.value}
                </span>
              </p>
              <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 data-reveal className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Come see a system running
          </h2>
          <p data-reveal className="mt-4 max-w-[48ch] text-base leading-relaxed text-ink-muted">
            Our Surat demo roof runs a full home kit with Vault storage. Sit through one outage demo and
            you'll know exactly what you're buying.
          </p>
          <div data-reveal className="mt-8">
            <ButtonLink to="/contact" icon>
              Book a demo
            </ButtonLink>
          </div>
        </div>
        <div data-reveal className="bezel rotate-1">
          <div className="bezel-core">
            <div className="relative aspect-[16/10]">
              <img src={IMG.farmPexels} alt="Voltaic field array" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <p data-reveal className="mt-20 text-center text-sm text-ink-faint">
        Want the full story? <Link to="/contact" className="font-semibold text-volt hover:underline">Book a visit</Link> — chai is on us.
      </p>
    </div>
  )
}