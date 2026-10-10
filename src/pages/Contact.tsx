import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, MapPin, Phone, Clock } from '@phosphor-icons/react'
import { ButtonLink } from '@/components/ui'
import { usePageEffects } from '@/hooks/usePageEffects'
import { BRAND } from '@/data/site'
import { IMG } from '@/data/products'
import { cx } from '@/lib/utils'

const FIELD =
  'mt-2 w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-volt/50 focus:outline-none'

export function Contact() {
  const ref = usePageEffects<HTMLDivElement>()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const nextErrors: typeof errors = {}
    if (!name) nextErrors.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  return (
    <div ref={ref} className="container-x pt-28 pb-24 lg:pt-36">
      <div data-reveal className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">Contact</p>
        <h1 className="mt-3 text-balance text-4xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">
          Talk to an engineer, not a script
        </h1>
        <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-ink-muted">
          Send your monthly bill and roof basics — a Voltaic engineer will reply within one working day
          with rough sizing and next steps.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        {/* form */}
        <div data-reveal className="lg:col-span-7">
          {submitted ? (
            <div className="bezel">
              <div className="bezel-core !rounded-2xl p-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-volt/15 text-volt ring-1 ring-volt/25">
                  <Check size={28} weight="bold" />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-ink">Message received</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                  Thanks for reaching out. An engineer will email you within one working day.
                </p>
                <div className="mt-8 flex justify-center">
                  <ButtonLink to="/shop" variant="ghost">
                    Browse the shop
                  </ButtonLink>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="bezel">
              <div className="bezel-core !rounded-2xl p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-ink">
                      Full name
                    </label>
                    <input id="name" name="name" type="text" autoComplete="name" placeholder="Priya Sharma" className={FIELD} />
                    {errors.name ? <p role="alert" className="mt-2 text-xs text-rose-400">{errors.name}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-ink">
                      Email
                    </label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={FIELD} />
                    {errors.email ? <p role="alert" className="mt-2 text-xs text-rose-400">{errors.email}</p> : null}
                    <p className="mt-2 text-xs text-ink-faint">We reply here — never spam.</p>
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-ink">
                      Phone <span className="text-ink-faint">(optional)</span>
                    </label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 …" className={FIELD} />
                  </div>
                  <div>
                    <label htmlFor="bill" className="text-sm font-medium text-ink">
                      Rough monthly electricity bill
                    </label>
                    <select id="bill" name="bill" defaultValue="" className={cx(FIELD, 'cursor-pointer')}>
                      <option value="" disabled className="bg-panel">
                        Select a range
                      </option>
                      <option className="bg-panel">&lt; ₹1,500</option>
                      <option className="bg-panel">₹1,500 – ₹3,000</option>
                      <option className="bg-panel">₹3,000 – ₹6,000</option>
                      <option className="bg-panel">₹6,000 – ₹15,000</option>
                      <option className="bg-panel">&gt; ₹15,000</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-medium text-ink">
                      What are you hoping to power?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Home backup, office daytime load, workshop…"
                      className={cx(FIELD, 'resize-none')}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-volt py-3.5 text-sm font-semibold text-void transition-all duration-300 hover:bg-volt-2 active:scale-[0.98] sm:w-auto sm:px-10"
                >
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* info */}
        <div className="lg:col-span-5">
          <div data-reveal className="bezel">
            <div className="bezel-core !rounded-2xl">
              <div className="relative aspect-[16/10]">
                <img src={IMG.roofHero} alt="A Voltaic rooftop array" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
                <p className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Voltaic HQ · Surat, Gujarat
                </p>
              </div>
              <div className="space-y-5 p-6">
                <a href={`mailto:${BRAND.email}`} className="group flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-volt/12 text-volt ring-1 ring-volt/25">
                    <MapPin size={18} weight="duotone" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{BRAND.address}</span>
                    <span className="text-sm text-ink-muted">Visit us, or we'll come to you</span>
                  </span>
                </a>
                <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-volt/12 text-volt ring-1 ring-volt/25">
                    <Phone size={18} weight="duotone" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{BRAND.phone}</span>
                    <span className="block text-sm text-ink-muted">{BRAND.email}</span>
                  </span>
                </a>
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-volt/12 text-volt ring-1 ring-volt/25">
                    <Clock size={18} weight="duotone" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{BRAND.hours}</span>
                    <span className="text-sm text-ink-muted">Site surveys run Tuesday–Saturday</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}