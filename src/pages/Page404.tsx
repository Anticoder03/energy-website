import { ButtonLink } from '@/components/ui'

export function Page404() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-28 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.22em] text-volt">Error 404</p>
      <h1 className="max-w-xl text-balance text-4xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">
        This page has gone off-grid
      </h1>
      <p className="max-w-md text-base leading-relaxed text-ink-muted">
        The page you're looking for doesn't exist or has moved. Your power stays on, though.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Back home</ButtonLink>
        <ButtonLink to="/shop" variant="ghost">
          Browse the shop
        </ButtonLink>
      </div>
    </div>
  )
}