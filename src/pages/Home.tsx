import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CaretDown, Lightning } from '@phosphor-icons/react'
import { Hero } from '@/components/Hero'
import { HorizontalPan } from '@/components/HorizontalPan'
import { SavingsCalculator } from '@/components/SavingsCalculator'
import { ProductCard } from '@/components/ProductCard'
import { ArrowLink, ButtonLink } from '@/components/ui'
import { usePageEffects } from '@/hooks/usePageEffects'
import { BEST_SELLERS, CATEGORIES } from '@/data/products'
import { FAQS, PROCESS, STATS, TESTIMONIALS, WHY_ROWS } from '@/data/site'
import { IMG } from '@/data/products'
import { cx } from '@/lib/utils'

/* ---------- Stats band ---------- */

function StatsBand() {
  return (
    <section className="border-y border-white/8 bg-void-2">
      <div className="container-x grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} data-reveal className="relative px-2 lg:px-8 lg:first:pl-0 lg:[&+div]:border-l lg:border-white/8">
            <p className="font-mono text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
              <span data-count={s.value} data-suffix={s.suffix}>
                {s.value}
              </span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Category bento ---------- */

function CategoryTile({ c, className }: { c: (typeof CATEGORIES)[number]; className?: string }) {
  return (
    <Link
      to={c.id === 'storage' ? '/storage' : `/shop?category=${c.id}`}
      className={cx(
        'group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-card p-6 hover:-translate-y-1',
        className,
      )}
      data-reveal
    >
      <img
        src={c.img}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/10 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="relative">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-volt">
          <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          {c.short}
        </div>
        <h3 className="mt-2 text-2xl font-bold text-white sm:text-[1.7rem]">{c.name}</h3>
        <p className="mt-1.5 max-w-md text-sm text-white/70">{c.blurb}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/50">
            {c.stat} {c.statLabel}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-volt group-hover:text-void">
            <ArrowUpRight size={15} weight="bold" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function Categories() {
  const [panels, storage, inverters, kits] = CATEGORIES

  return (
    <section className="container-x py-24 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div data-reveal className="max-w-xl">
          <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]">
            One kit for every kind of rooftop
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Panels, storage, inverters and complete kits — sized for Indian weather and warranty-papered from day one.
          </p>
        </div>
        <ArrowLink to="/shop" className="mt-2" onClick={undefined}>
          Browse everything
        </ArrowLink>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
        <CategoryTile c={panels} className="lg:col-span-7 lg:row-span-2 lg:min-h-full min-h-[300px]" />
        <CategoryTile c={storage} className="sm:col-span-1 lg:col-span-5 lg:col-start-8" />
        <CategoryTile c={inverters} className="sm:col-span-1 lg:col-span-5 lg:col-start-8" />

        <Link
          to="/shop?category=kits"
          data-reveal
          className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-card bg-volt p-7 text-void sm:col-span-2 lg:col-span-12 lg:min-h-[160px] lg:p-9"
        >
          <div className="relative z-10 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-void/60">Turnkey systems</p>
            <h3 className="mt-1.5 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{kits.name}</h3>
            <p className="mt-1 max-w-lg text-sm text-void/70">{kits.blurb}</p>
          </div>
          <div className="relative z-10 hidden shrink-0 flex-col items-end sm:flex">
            <span className="font-mono text-2xl font-bold">{kits.stat}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-void/60">{kits.statLabel}</span>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-void text-volt transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
            <ArrowUpRight size={17} weight="bold" />
          </span>
        </Link>
      </div>
    </section>
  )
}

/* ---------- Storage feature split ---------- */

function StorageFeature() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 60% at 80% 40%, rgba(184,243,60,0.07), transparent 65%)' }}
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
            Battery storage
          </p>
          <h2 data-reveal className="mt-3 text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]">
            Power that outlasts the grid
          </h2>
          <p data-reveal className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-muted">
            Pair a Voltaic hybrid inverter with Vault storage and your rooftop keeps running
            through the evening tariff, the storm, the outage.
          </p>
          <ul data-reveal className="mt-8 space-y-4">
            {[
              'Half-second switchover — appliances never notice the grid drop',
              'LiFePO4 chemistry rated for 6,000 charge cycles',
              'Expand from 5 kWh to 20 kWh without changing the inverter',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-volt/15 text-volt ring-1 ring-volt/25">
                  <Lightning size={10} weight="fill" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-9">
            <ButtonLink to="/storage" icon>
              Explore storage
            </ButtonLink>
          </div>
        </div>

        <div data-reveal className="order-1 lg:order-2">
          <div className="bezel -rotate-1 lg:translate-x-6">
            <div className="bezel-core">
              <div className="relative aspect-[16/10]">
                <img
                  src={IMG.batteryWall}
                  alt="Wall-mounted battery storage unit"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-void/60 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse-dot rounded-full bg-volt" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">Backup armed</span>
                </div>
              </div>
            </div>
          </div>
          <div
            data-reveal
            className="bezel absolute -bottom-8 right-4 w-52 rotate-2 lg:right-0"
          >
            <div className="bezel-core !rounded-2xl p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">Vault 2</p>
              <p className="mt-1 text-2xl font-bold text-volt">13.5 kWh</p>
              <p className="text-xs text-ink-muted">usable · 0.5s switchover</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Why / editorial ---------- */

function Why() {
  return (
    <section className="container-x py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2 data-reveal className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]">
            Why generate your own power — and why Voltaic
          </h2>
          <p data-reveal className="mt-4 max-w-[48ch] text-base leading-relaxed text-ink-muted">
            Solar is the most practical way to control power costs. We make the whole journey —
            survey, paperwork, install, monitoring — one accountable process.
          </p>
          <div data-reveal className="mt-8">
            <ArrowLink to="/about" onClick={undefined}>
              Read our story
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol>
            {WHY_ROWS.map((row) => (
              <li
                key={row.index}
                data-reveal
                className="group flex gap-6 border-t border-white/8 py-8 transition-colors duration-300 hover:bg-white/[0.03] sm:gap-10"
              >
                <span className="font-mono text-sm text-ink-faint transition-colors group-hover:text-volt">
                  {row.index}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-ink">{row.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">{row.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------- Process ---------- */

function Process() {
  return (
    <section className="border-y border-white/8 bg-void-2 py-24 lg:py-28">
      <div className="container-x">
        <div data-reveal className="max-w-xl">
          <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            From survey to switch-on in four steps
          </h2>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <li
              key={step.step}
              data-reveal
              className="flex flex-col rounded-card border border-white/8 bg-panel p-6 transition-colors duration-300 hover:border-volt/30"
            >
              <span className="font-mono text-3xl font-bold text-volt/40">{step.step}</span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  return (
    <section className="container-x py-24 lg:py-32">
      <div data-reveal className="max-w-2xl">
        <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]">
          Roofs we've powered, owners who remember it
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            data-reveal
            className={cx(
              'flex flex-col justify-between rounded-card border p-7',
              i === 1
                ? 'border-volt/25 bg-volt/8'
                : 'border-white/8 bg-panel',
            )}
          >
            <blockquote className="text-balance text-[0.98rem] leading-relaxed text-ink">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 border-t border-white/8 pt-4">
              <p className="text-sm font-bold text-ink">{t.name}</p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const panelId = `faq-panel-${index}`
  const btnId = `faq-btn-${index}`

  return (
    <div data-reveal className="border-b border-white/8">
      <button
        id={btnId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className={cx('text-base font-semibold transition-colors sm:text-lg', open ? 'text-volt' : 'text-ink')}>
          {q}
        </span>
        <span
          className={cx(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300',
            open ? 'rotate-180 border-volt/40 bg-volt/10 text-volt' : 'border-white/12 text-ink-muted',
          )}
        >
          <CaretDown size={15} weight="bold" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={cx('grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 text-sm leading-relaxed text-ink-muted">{a}</p>
        </div>
      </div>
    </div>
  )
}

function Faq() {
  return (
    <section id="faq" className="container-x py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 data-reveal className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              Answers before you go solar
            </h2>
            <p data-reveal className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-muted">
              Straight answers on generation, payback, warranties and installation — nothing buried in fine print.
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink to="/contact" variant="ghost" icon>
                Ask an expert
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="border-t border-white/8">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Final CTA ---------- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={IMG.commercial}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-void/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-transparent" />

      <div className="container-x relative py-32 lg:py-44">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
          Ready to generate
        </p>
        <h2 data-reveal className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl md:text-6xl">
          Go solar.
          <span className="italic text-gradient-volt"> Stay powered.</span>
        </h2>
        <p data-reveal className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg">
          Send us your monthly bill and roof basics — we'll size the system and a free survey team will refine it on site.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink to="/contact" icon>
            Get a quote
          </ButtonLink>
          <ButtonLink to="/shop?category=kits" variant="ghost">
            View solar kits
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

/* ---------- Page ---------- */

export function Home() {
  const ref = usePageEffects<HTMLDivElement>()

  return (
    <div ref={ref}>
      <Hero />
      <StatsBand />
      <Categories />
      <HorizontalPan
        header={
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]">
                Most-loved on Voltaic
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
                The arrays, batteries and inverters Indian rooftops actually choose.
              </p>
            </div>
          </div>
        }
      >
        {BEST_SELLERS.map((p) => (
          <ProductCard key={p.slug} product={p} className="w-[300px] shrink-0 snap-start sm:w-[340px]" />
        ))}
        <div className="flex w-[300px] shrink-0 snap-start items-center sm:w-[340px]">
          <Link
            to="/shop"
            className="group flex h-full w-full flex-col items-start justify-between rounded-card border border-dashed border-white/15 p-7 transition-colors duration-300 hover:border-volt/50"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">Full catalog</span>
            <span className="text-2xl font-bold tracking-[-0.02em] text-ink">
              View all <span className="text-volt">54</span> products
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-volt text-void transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight size={17} weight="bold" />
            </span>
          </Link>
        </div>
      </HorizontalPan>
      <StorageFeature />
      <Why />
      <Process />
      <SavingsCalculator />
      <Testimonials />
      <Faq />
      <FinalCta />
    </div>
  )
}