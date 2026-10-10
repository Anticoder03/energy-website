import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from '@phosphor-icons/react'
import { Logo } from '@/components/Logo'
import { BRAND, FOOTER_COLUMNS } from '@/data/site'

const hrefFor = (link: { label: string; to: string; query?: string }) =>
  link.query ? `${link.to}?category=${link.query}` : link.to

export function Footer() {
  const [sent, setSent] = useState(false)

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <footer className="relative z-10 border-t border-white/8 bg-void-2">
      <div className="container-x pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Voltaic engineers rooftop solar and home battery systems for Indian weather — surveys,
              subsidy paperwork and net metering handled end to end.
            </p>

            <form onSubmit={onSubscribe} className="mt-7 max-w-sm">
              <label htmlFor="newsletter" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Billing hacks & solar intel
              </label>
              {sent ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-4 py-2.5 text-sm text-volt">
                  <Check size={15} weight="bold" /> You're on the list.
                </p>
              ) : (
                <div className="mt-3 flex items-center gap-2 rounded-full border border-white/12 bg-white/4 p-1 pl-4 transition-colors focus-within:border-volt/50">
                  <input
                    id="newsletter"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-volt px-4 py-2.5 text-sm font-semibold text-void transition-colors hover:bg-volt-2"
                  >
                    Join
                  </button>
                </div>
              )}
            </form>

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">Direct lines</p>
              <a href={`mailto:${BRAND.email}`} className="mt-2 block text-sm font-medium text-ink hover:text-volt">
                {BRAND.email}
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="mt-1 block text-sm font-medium text-ink hover:text-volt">
                {BRAND.phone}
              </a>
              <p className="mt-1 text-sm text-ink-muted">{BRAND.address}</p>
              <p className="mt-1 font-mono text-xs text-ink-faint">{BRAND.hours}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={hrefFor(link)}
                        className="text-sm text-ink-muted transition-colors hover:text-volt"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-faint">
            <Link to="/about" className="transition-colors hover:text-ink">Privacy</Link>
            <Link to="/about" className="transition-colors hover:text-ink">Terms</Link>
            <span className="font-mono">GST {BRAND.gst}</span>
          </div>
          <div className="flex items-center gap-1">
            {BRAND.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-white/6 hover:text-ink"
              >
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}