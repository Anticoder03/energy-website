import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingCartSimple, Trash, X } from '@phosphor-icons/react'
import { useCart } from '@/context/CartContext'
import { INR, cx } from '@/lib/utils'

function Stepper({ qty, onMinus, onPlus }: { qty: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/4 p-0.5">
      <button
        type="button"
        onClick={onMinus}
        aria-label="Decrease quantity"
        className="grid h-7 w-7 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/10 hover:text-ink"
      >
        {qty === 1 ? <Trash size={13} /> : <Minus size={13} />}
      </button>
      <span className="w-6 text-center font-mono text-sm text-ink">{qty}</span>
      <button
        type="button"
        onClick={onPlus}
        aria-label="Increase quantity"
        className="grid h-7 w-7 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/10 hover:text-ink"
      >
        <Plus size={13} />
      </button>
    </div>
  )
}

export function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, setQty, clear } = useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeCart])

  return (
    <div
      className={cx('fixed inset-0 z-[65]', isOpen ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={cx(
          'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cx(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-panel shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">Your cart</p>
            <h2 className="mt-1 text-lg font-bold text-ink">
              {count} {count === 1 ? 'item' : 'items'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {lines.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="rounded-full px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:text-volt"
              >
                Clear
              </button>
            ) : null}
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted transition-colors hover:bg-white/6 hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/8 bg-white/4 text-ink-faint">
              <ShoppingCartSimple size={28} />
            </span>
            <div>
              <p className="text-lg font-bold text-ink">Your cart is empty</p>
              <p className="mt-1 text-sm text-ink-muted">Browse the shop and add solar products to it.</p>
            </div>
            <Link
              to="/shop"
              onClick={closeCart}
              className="mt-2 inline-flex items-center rounded-full bg-volt px-6 py-3 text-sm font-semibold text-void transition-colors hover:bg-volt-2"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-white/6 overflow-y-auto px-6">
              {lines.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <Link to={`/product/${item.slug}`} onClick={closeCart} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/8">
                    <img src={item.img} alt="" className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="truncate text-sm font-semibold text-ink transition-colors hover:text-volt"
                      >
                        {item.name}
                      </Link>
                      <span className="font-mono text-xs text-ink-faint">{item.spec}</span>
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                      {item.category}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <Stepper qty={item.qty} onMinus={() => setQty(item.slug, item.qty - 1)} onPlus={() => setQty(item.slug, item.qty + 1)} />
                      <span className="text-sm font-semibold text-ink">{INR(item.price * item.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/8 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-muted">Subtotal</span>
                <span className="text-xl font-bold text-ink">{INR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">GST, shipping and subsidy offests calculated at checkout.</p>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-volt py-3.5 text-sm font-semibold text-void transition-all duration-300 hover:bg-volt-2 active:scale-[0.98]"
              >
                Checkout securely
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 w-full rounded-full border border-white/12 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/5"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}