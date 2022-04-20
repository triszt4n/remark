import { formatDistance } from 'date-fns'

export const toReadableNumber = (num: number): string =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num)

export const toRelativeDateString = (timestamp: number): string =>
  formatDistance(new Date(timestamp * 1000), new Date(), { includeSeconds: true, addSuffix: true })

export const DEFAULT_DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' }
export const LONGER_DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export const toDateString = (timestamp: number, options: object = DEFAULT_DATE_OPTIONS): string =>
  new Date(timestamp * 1000).toLocaleDateString('en-US', options)
