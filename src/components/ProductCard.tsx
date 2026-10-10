import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from '@phosphor-icons/react'
import type { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { INR, cx } from '@/lib/utils'

export function ProductCard({
  product,
  className,
  reveal = true,
}: {
  product: Product
  className?: string
  reveal?: boolean
}) {
  const { add } = useCart()
  const save = product.compareAt && product.compareAt > product.price

  return (
    <article
      className={cx(
        'bezel group relative transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1',
        reveal && 'data-reveal',
        className,
      )}
    >
      <div className="bezel-core">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-[1] rounded-[1.6rem]" />

        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel/70 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            {product.badge ? (
              <span className="rounded-full bg-volt px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-void">
                {product.badge}
              </span>
            ) : null}
            {save ? (
              <span className="rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-volt ring-1 ring-volt/30 backdrop-blur-sm">
                −{Math.round((1 - product.price / product.compareAt!) * 100)}%
              </span>
            ) : null}
          </div>
          <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            {product.spec}
          </span>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-balance text-[1.05rem] font-bold leading-snug text-ink">{product.name}</h3>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{product.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {product.chips.slice(0, 2).map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted ring-1 ring-white/8"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-1 flex items-end justify-between border-t border-white/8 pt-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{INR(product.price)}</span>
                {save ? (
                  <span className="text-sm text-ink-faint line-through">{INR(product.compareAt!)}</span>
                ) : null}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{product.specLabel}</p>
            </div>
            <button
              type="button"
              onClick={() => add(product.slug)}
              aria-label={`Add ${product.name} to cart`}
              className="relative z-[2] grid h-11 w-11 place-items-center rounded-full bg-volt text-void shadow-[0_12px_30px_-10px_rgba(184,243,60,0.5)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-volt-2 active:scale-[0.96]"
            >
              <Plus size={18} weight="bold" />
            </button>
          </div>
          <span className="pointer-events-none absolute bottom-5 right-16 flex items-center gap-1 text-xs font-semibold text-volt opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View details <ArrowUpRight size={13} weight="bold" />
          </span>
        </div>
      </div>
    </article>
  )
}