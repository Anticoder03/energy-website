import { useEffect, useMemo, useRef, useState } from 'react'
import { Lightning } from '@phosphor-icons/react'
import { gsap } from '@/lib/gsap'
import { cx } from '@/lib/utils'

const fmtKw = (n: number) => `${n.toFixed(1)} kW`
const fmtYrs = (n: number) => `${n.toFixed(1)} yrs`
const fmtInr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

function AnimatedNumber({ target, format }: { target: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = Number.parseFloat(el.textContent?.replace(/[^0-9.]/g, '') || '0') || 0
    const state = { v: start }
    const tween = gsap.to(state, {
      v: target,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = format(state.v)
      },
    })
    return () => {
      tween.kill()
    }
  }, [target, format])

  return (
    <span ref={ref}>
      {format(target)}
      <span className="sr-only">Updated value</span>
    </span>
  )
}

function Output({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/8 pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">{label}</p>
      <div className="mt-1 text-2xl font-bold tracking-[-0.02em] text-ink">{children}</div>
    </div>
  )
}

export function SavingsCalculator() {
  const [bill, setBill] = useState(2400)
  const [battery, setBattery] = useState(false)

  const model = useMemo(() => {
    const units = bill / 8
    const offset = 0.8
    const targetUnits = units * offset
    const size = Math.max(1, Math.round((targetUnits / 125) * 2) / 2)
    const cost = size * 55000
    const batteryCost = battery ? 189000 : 0
    const oneTime = cost + batteryCost
    const monthly = bill * offset
    const payback = oneTime / monthly / 12
    return { size, oneTime, monthly, payback }
  }, [bill, battery])

  return (
    <section id="calculator" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="bezel" data-reveal>
          <div className="bezel-core">
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-white/8 p-8 sm:p-10 lg:border-b-0 lg:border-r">
                <span className="inline-flex items-center gap-2 rounded-full bg-volt/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-volt ring-1 ring-volt/25">
                  <Lightning size={12} weight="fill" /> Solar calculator
                </span>
                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                  What would your roof generate?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Rough sizing from your monthly bill. A free survey refines it before you commit.
                </p>

                <div className="mt-10">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="bill" className="text-sm font-medium text-ink">
                      Monthly electricity bill
                    </label>
                    <output htmlFor="bill" className="font-mono text-sm font-bold text-volt">
                      ₹{bill.toLocaleString('en-IN')}
                    </output>
                  </div>
                  <input
                    id="bill"
                    type="range"
                    min={500}
                    max={20000}
                    step={100}
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-volt"
                  />
                  <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                    <span>₹500</span>
                    <span>₹20,000</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBattery((v) => !v)}
                  aria-pressed={battery}
                  className="mt-8 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/4 p-4 text-left transition-colors hover:border-white/20"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink">Run the home through outages</span>
                    <span className="mt-0.5 block text-xs text-ink-muted">Adds Vault-class backup to the estimate</span>
                  </span>
                  <span
                    className={cx(
                      'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300',
                      battery ? 'bg-volt' : 'bg-white/15',
                    )}
                  >
                    <span
                      className={cx(
                        'absolute top-1 h-5 w-5 rounded-full bg-void transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                        battery ? 'translate-x-6' : 'translate-x-1',
                      )}
                    />
                  </span>
                </button>
              </div>

              <div className="p-8 sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">Estimated for your rooftop</p>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                  <Output label="Recommended size">
                    <AnimatedNumber target={model.size} format={fmtKw} />
                  </Output>
                  <Output label="One-time investment">
                    <AnimatedNumber target={model.oneTime} format={fmtInr} />
                  </Output>
                  <Output label="Typical monthly saving">
                    <AnimatedNumber target={model.monthly} format={fmtInr} />
                  </Output>
                  <Output label="Payback window">
                    <AnimatedNumber target={model.payback} format={fmtYrs} />
                  </Output>
                </div>
                <p className="mt-8 rounded-xl border border-volt/20 bg-volt/8 p-4 text-xs leading-relaxed text-ink-muted">
                  Indicative only — actual generation depends on roof area, orientation and utility tariffs.
                  Includes net metering and a ₹8/kWh domestic tariff assumption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}