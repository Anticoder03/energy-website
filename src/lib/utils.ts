export type ClassValue = string | number | null | false | undefined

export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

export const INR = (value: number) =>
  `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

export const cnx = cx