import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MagnifyingGlass, Package } from '@phosphor-icons/react'
import { ProductCard } from '@/components/ProductCard'
import { usePageEffects } from '@/hooks/usePageEffects'
import { CATEGORIES, PRODUCTS, type CategoryId } from '@/data/products'
import { cx } from '@/lib/utils'

type Sort = 'best' | 'price-asc' | 'price-desc' | 'name'

const SORTS: { id: Sort; label: string }[] = [
  { id: 'best', label: 'Best selling' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name A–Z' },
]

function matchingCategory(value: string | null): CategoryId | null {
  if (!value) return null
  return CATEGORIES.some((c) => c.id === value) ? (value as CategoryId) : null
}

export function Shop() {
  const ref = usePageEffects<HTMLDivElement>()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('best')

  const category = matchingCategory(params.get('category'))

  const pickCategory = (id: CategoryId | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('category', id)
    else next.delete('category')
    setParams(next, { replace: true })
    window.scrollTo({ top: 0 })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = PRODUCTS.filter((p) => {
      const inCategory = !category || p.category === category
      const matches =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.chips.some((chip) => chip.toLowerCase().includes(q))
      return inCategory && matches
    })
    switch (sort) {
      case 'price-asc':
        rows.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        rows.sort((a, b) => b.price - a.price)
        break
      case 'name':
        rows.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    return rows
  }, [query, sort, category])

  const active = CATEGORIES.find((c) => c.id === category)

  return (
    <div ref={ref} className="pt-28 lg:pt-36">
      <div className="container-x">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">
          {active ? active.name : 'Voltaic catalog'}
        </p>
        <h1 data-reveal className="mt-3 text-balance text-4xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">
          {active ? active.name : 'Shop solar & storage'}
        </h1>
        <p data-reveal className="mt-4 max-w-[56ch] text-base leading-relaxed text-ink-muted">
          {active
            ? active.blurb
            : 'Panels, batteries, inverters and complete kits — every item invoiced with GST and warranty-papered.'}
        </p>

        {/* filter bar */}
        <div data-reveal className="sticky top-20 z-30 mt-10 flex flex-col gap-3 rounded-2xl border border-white/8 bg-void/80 p-3 backdrop-blur-xl sm:flex-row sm:items-center">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2.5 transition-colors focus-within:border-volt/50">
            <MagnifyingGlass size={16} className="shrink-0 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search panels, batteries, kits…"
              aria-label="Search products"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
          </label>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {[
              { id: null, label: 'All' },
              ...CATEGORIES.map((c) => ({ id: c.id, label: c.short })),
            ].map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => pickCategory(c.id)}
                aria-pressed={category === c.id}
                className={cx(
                  'shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                  category === c.id ? 'bg-volt text-void' : 'border border-white/10 text-ink-muted hover:text-ink',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort products"
            className="shrink-0 cursor-pointer rounded-full border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-ink transition-colors hover:border-white/20 focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id} className="bg-panel text-ink">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* results */}
      <div className="container-x pb-28 pt-10">
        {filtered.length === 0 ? (
          <div data-reveal className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-card border border-dashed border-white/12 px-8 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/8 bg-white/4 text-ink-faint">
              <Package size={28} />
            </span>
            <p className="text-lg font-bold text-ink">No products found</p>
            <p className="text-sm text-ink-muted">
              Try a different keyword, or browse the full catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                pickCategory(null)
              }}
              className="mt-2 rounded-full bg-volt px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-volt-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        <p data-reveal className="mt-12 text-center text-sm text-ink-faint">
          Question about sizing?{' '}
          <Link to="/contact" className="font-semibold text-volt hover:underline">
            Talk to an engineer
          </Link>{' '}
          before you order.
        </p>
      </div>
    </div>
  )
}