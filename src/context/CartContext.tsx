import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { PRODUCTS, productBySlug, type Product } from '@/data/products'

export interface CartLine {
  slug: string
  qty: number
}

export interface CartItem extends Product {
  qty: number
}

interface CartContextValue {
  lines: CartItem[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  add: (slug: string, qty?: number) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug)
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
      }
      return [...prev, { slug, qty }]
    })
    setIsOpen(true)
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    )
  }, [])

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug))
  }, [])

  const clear = useCallback(() => setLines([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const items: CartItem[] = lines
      .map((l) => {
        const product = productBySlug(l.slug)
        return product ? { ...product, qty: l.qty } : null
      })
      .filter((x): x is CartItem => x !== null)

    return {
      lines: items,
      count: items.reduce((acc, i) => acc + i.qty, 0),
      subtotal: items.reduce((acc, i) => acc + i.qty * i.price, 0),
      isOpen,
      openCart,
      closeCart,
      add,
      setQty,
      remove,
      clear,
    }
  }, [lines, isOpen, add, setQty, remove, clear, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const TOTAL_PRODUCTS = PRODUCTS.length