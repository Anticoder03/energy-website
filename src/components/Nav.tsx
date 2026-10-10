import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MagnifyingGlass, ShoppingCartSimple } from '@phosphor-icons/react'
import { Logo } from '@/components/Logo'
import { useCart } from '@/context/CartContext'
import { useGSAP, gsap } from '@/lib/gsap'
import { NAV_LINKS } from '@/data/site'
import { cx } from '@/lib/utils'

const hrefFor = (link: (typeof NAV_LINKS)[number]) =>
  link.query ? `${link.to}?category=${link.query}` : link.to

function Burger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-6" aria-hidden="true">
      <span
        className={cx(
          'absolute left-0 top-0 h-[2px] w-full rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          open && 'top-1/2 -translate-y-1/2 rotate-45',
        )}
      />
      <span
        className={cx(
          'absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          open && 'opacity-0',
        )}
      />
      <span
        className={cx(
          'absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          open && 'bottom-1/2 translate-y-1/2 -rotate-45',
        )}
      />
    </span>
  )
}

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { count, openCart } = useCart()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // solidify pill after leaving the page top
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    document.body.prepend(sentinel)
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: '-72px 0px 0px' },
    )
    io.observe(sentinel)
    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  // close on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  // body scroll lock + escape
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useGSAP(
    () => {
      if (!open) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        closeBtnRef.current?.focus()
        return
      }
      const items = linksRef.current?.querySelectorAll('li')
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.07,
            delay: 0.1,
          },
        )
      }
      gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      closeBtnRef.current?.focus()
      return () => {
        gsap.killTweensOf(menuRef.current)
      }
    },
    { dependencies: [open], scope: menuRef },
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[60] px-4 sm:px-6">
        <nav
          aria-label="Primary"
          className={cx(
            'mx-auto mt-4 flex h-14 max-w-5xl items-center gap-3 rounded-full border pl-3 pr-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:pl-4',
            solid
              ? 'border-white/10 bg-void/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl'
              : 'border-white/8 bg-void/40 backdrop-blur-md',
          )}
        >
          <Logo />

          <ul className="ml-4 hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={hrefFor(link)}
                  className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-ink-muted transition-colors duration-200 hover:bg-white/6 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/shop"
              aria-label="Search products"
              className="hidden h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/6 hover:text-ink sm:grid"
            >
              <MagnifyingGlass size={18} weight="bold" />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/6 hover:text-ink"
            >
              <ShoppingCartSimple size={18} weight="bold" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-volt px-1 font-mono text-[10px] font-bold text-void">
                  {count}
                </span>
              ) : null}
            </button>
            <Link
              to="/contact"
              className="ml-1 hidden items-center rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-void transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-volt-2 active:scale-[0.98] md:inline-flex"
            >
              Get a quote
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/6 lg:hidden"
            >
              <Burger open={open} />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!open}
        className={cx(
          'fixed inset-0 z-[55] flex flex-col overflow-hidden bg-void/85 backdrop-blur-2xl transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="container-x flex-1 pb-10 pt-24">
          <ul ref={linksRef} className="flex flex-col gap-1">
            {[{ label: 'Home', to: '/', query: undefined }, ...NAV_LINKS, { label: 'Solar Kits', to: '/shop', query: 'kits' }, { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }].map(
              (link, i) => (
                <li key={link.label} className="flex">
                  <Link
                    to={hrefFor(link)}
                    tabIndex={open ? 0 : -1}
                    style={{ transitionDelay: `${i * 30}ms` }}
                    className="flex w-full items-baseline gap-4 border-b border-white/8 py-4 text-3xl font-bold tracking-[-0.03em] text-ink transition-colors hover:text-volt"
                  >
                    <span className="font-mono text-[11px] text-ink-faint">0{i + 1}</span>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-full bg-volt px-6 py-3 text-sm font-semibold text-void"
            >
              Get a quote
            </Link>
            <Link
              to="/shop"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ink"
            >
              Shop all products
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}