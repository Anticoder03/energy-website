import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { cx } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'soft'

const styles: Record<Variant, string> = {
  primary:
    'bg-volt text-void hover:bg-volt-2 shadow-[0_18px_50px_-16px_rgba(184,243,60,0.45)] hover:shadow-[0_22px_60px_-14px_rgba(184,243,60,0.55)]',
  ghost:
    'border border-white/12 text-ink hover:border-white/25 hover:bg-white/5',
  soft: 'bg-white/6 border border-white/8 text-ink hover:bg-white/10',
}

interface BaseProps {
  variant?: Variant
  className?: string
  icon?: boolean
  full?: boolean
  children: ReactNode
}

interface LinkProps extends BaseProps {
  to: string
  href?: undefined
  state?: unknown
}

interface AnchorProps extends BaseProps {
  to?: undefined
  href: string
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    to?: undefined
    href?: undefined
  }

const arrow = (icon: boolean | undefined) =>
  icon ? (
    <span
      aria-hidden="true"
      className="ml-2 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/12 text-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <ArrowUpRight size={14} weight="bold" />
    </span>
  ) : null

function base(variant: Variant, className?: string, full?: boolean, icon?: boolean) {
  return cx(
    'group inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]',
    icon && 'pr-2',
    full && 'w-full',
    styles[variant],
    className,
  )
}

export function ButtonLink({ to, variant = 'primary', className, icon, full, children, ...rest }: LinkProps) {
  return (
    <Link to={to} className={base(variant, className, full, icon)} {...rest}>
      {children}
      {arrow(icon)}
    </Link>
  )
}

export function ButtonAnchor({ href, variant = 'primary', className, icon, full, children, ...rest }: AnchorProps) {
  return (
    <a href={href} className={base(variant, className, full, icon)} {...rest}>
      {children}
      {arrow(icon)}
    </a>
  )
}

export function Button({ variant = 'primary', className, icon, full, children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={base(variant, className, full, icon)} {...rest}>
      {children}
      {arrow(icon)}
    </button>
  )
}

export function ArrowLink({
  to,
  children,
  className,
  onClick,
}: {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cx(
        'group inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-volt',
        className,
      )}
    >
      {children}
      <ArrowRight
        size={16}
        weight="bold"
        className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
      />
    </Link>
  )
}

export function Chip({ children, active, className }: { children: ReactNode; active?: boolean; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em]',
        active ? 'bg-volt text-void' : 'bg-white/6 text-ink-muted ring-1 ring-white/8',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHead({
  kicker,
  title,
  body,
  align = 'left',
  className,
  ...rest
}: {
  kicker?: string
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
  className?: string
  [key: string]: unknown
}) {
  return (
    <div
      className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
      {...rest}
    >
      {kicker ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">{kicker}</p>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {body ? <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-ink-muted">{body}</p> : null}
    </div>
  )
}

export function Img({
  src,
  alt,
  className,
  eager,
}: {
  src: string
  alt: string
  className?: string
  eager?: boolean
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cx('h-full w-full object-cover', className)}
    />
  )
}