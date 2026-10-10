import { Link } from 'react-router-dom'
import { cx } from '@/lib/utils'

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} aria-label="Voltaic Energy — home" className={cx('group inline-flex items-center gap-2.5', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt text-void transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-[-8deg]">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M17.5 5 9 18h5.5L14 27l8.5-13H17l.5-9z" fill="currentColor" />
        </svg>
      </span>
      <span className="text-[1.15rem] font-bold tracking-[-0.02em] text-ink">
        Voltaic
        <span className="text-volt">.</span>
      </span>
    </Link>
  )
}