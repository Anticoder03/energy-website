import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CaretDown, Check, Minus, Plus, ShieldCheck, Truck } from '@phosphor-icons/react'
import { ProductCard } from '@/components/ProductCard'
import { ButtonLink, Chip } from '@/components/ui'
import { usePageEffects } from '@/hooks/usePageEffects'
import { useCart } from '@/context/CartContext'
import { categoryById, productBySlug, RELATED } from '@/data/products'
import { INR, cx } from '@/lib/utils'

function Disclosure({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  const id = `disclosure-${title.replace(/\s/g, '-').toLowerCase()}`
  return (
    <div className="border-b border-white/8">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className={cx('grid h-8 w-8 place-items-center rounded-full border transition-all duration-300', open ? 'rotate-180 border-volt/40 bg-volt/10 text-volt' : 'border-white/12 text-ink-muted')}>
          <CaretDown size={14} />
        </span>
      </button>
      <div className={cx('grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div id={id} className="overflow-hidden">
          <div className="pb-5 text-sm leading-relaxed text-ink-muted">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const ref = usePageEffects<HTMLDivElement>()
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  const product = slug ? productBySlug(slug) : undefined
  const category = product ? categoryById(product.category) : undefined

  useEffect(() => {
    setQty(1)
  }, [slug])

  if (!product) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-32 text-center">
        <p className="text-lg font-bold text-ink">We couldn't find that product</p>
        <ButtonLink to="/shop">Back to the shop</ButtonLink>
      </div>
    )
  }

  const related = RELATED(product.slug)
  const save = product.compareAt && product.compareAt > product.price

  return (
    <div ref={ref} className="container-x pt-28 pb-24 lg:pt-36">
      <nav aria-label="Breadcrumb" data-reveal className="flex items-center gap-2 text-sm text-ink-faint">
        <Link to="/" className="transition-colors hover:text-ink">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop" className="transition-colors hover:text-ink">Shop</Link>
        <span aria-hidden="true">/</span>
        {category ? (
          <Link to={`/shop?category=${category.id}`} className="transition-colors hover:text-ink">
            {category.name}
          </Link>
        ) : null}
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* gallery */}
        <div data-reveal className="bezel">
          <div className="bezel-core">
            <div className="relative aspect-[4/3]">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                {product.badge ? (
                  <span className="rounded-full bg-volt px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-void">
                    {product.badge}
                  </span>
                ) : null}
                {save ? (
                  <span className="rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-volt ring-1 ring-volt/30 backdrop-blur-sm">
                    Save {INR(product.compareAt! - product.price)}
                  </span>
                ) : null}
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{product.specLabel}</p>
                <p className="text-3xl font-bold text-white">{product.spec}</p>
              </div>
            </div>
          </div>
        </div>

        {/* info */}
        <div>
          <Link
            to={`/shop?category=${product.category}`}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-volt"
          >
            {category?.name}
          </Link>
          <h1 data-reveal className="mt-2 text-balance text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p data-reveal className="mt-3 max-w-[58ch] text-base leading-relaxed text-ink-muted">
            {product.tagline}
          </p>

          <div data-reveal className="mt-5 flex flex-wrap gap-2">
            {product.chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>

          <div data-reveal className="mt-8 rounded-card border border-white/8 bg-panel p-6">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
              <span className="text-3xl font-bold tracking-[-0.02em] text-ink">{INR(product.price)}</span>
              {save ? <span className="text-lg text-ink-faint line-through">{INR(product.compareAt!)}</span> : null}
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">incl. GST</span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-volt">
              <span className={cx('h-1.5 w-1.5 rounded-full', product.stock > 10 ? 'bg-volt' : 'bg-volt')} />
              {product.stock > 10 ? 'In stock — ships within 4 days' : `Only ${product.stock} left`}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/4 p-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/10 hover:text-ink"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-mono text-sm text-ink">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/10 hover:text-ink"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => add(product.slug, qty)}
                className="flex-1 rounded-full bg-volt px-6 py-3.5 text-sm font-semibold text-void transition-all duration-300 hover:bg-volt-2 active:scale-[0.98] sm:flex-none"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => add(product.slug, qty)}
                className="flex-1 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/5 sm:flex-none"
              >
                Buy now
              </button>
            </div>

            <div className="mt-6 grid gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted sm:grid-cols-2">
              <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-volt" /> {product.warranty}</span>
              <span className="flex items-center gap-2"><Truck size={14} className="text-volt" /> Free delivery · PAN India</span>
            </div>
          </div>

          <p data-reveal className="mt-7 leading-relaxed text-ink-muted">{product.description}</p>

          <div data-reveal className="mt-8">
            <h2 className="text-sm font-semibold text-ink">Key features</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                  <Check size={15} weight="bold" className="mt-0.5 shrink-0 text-volt" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-muted">
              <span className="font-semibold text-ink">Ideal for:</span> {product.idealFor}
            </p>
          </div>

          <div data-reveal className="mt-8">
            <Disclosure title="What's included" defaultOpen>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2">
                    <Check size={13} weight="bold" className="text-volt" /> {inc}
                  </li>
                ))}
              </ul>
            </Disclosure>
            <Disclosure title="Shipping & installation">
              Panels and batteries ship within 4 working days via insured freight. Kit orders include a
              coordination call to schedule your certified installation window. Full details on your invoice.
            </Disclosure>
            <Disclosure title="Warranty claim path">
              28-day no-questions replacement window, then manufacturer-warranty service through our
              install network across 160+ cities. Raise a ticket from your Voltaic account anytime.
            </Disclosure>
          </div>
        </div>
      </div>

      {/* related */}
      <section className="mt-28">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-ink sm:text-3xl">Pairs well with</h2>
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-ink-muted transition-colors hover:text-volt">
            <ArrowLeft size={15} /> Back to shop
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}