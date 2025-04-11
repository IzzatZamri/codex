import type { CustomDate } from '~/types/customDate.types'

export type DateUnit =
  | 'minute'
  | 'hour'
  | 'day'
  | 'month'
  | 'year'
  | 'greatYear'

// Constants for time conversion
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 30
const DAYS_PER_MONTH = 30
const MONTHS_PER_YEAR = 30
const YEARS_PER_GREAT_YEAR = 1000

// Derived constants
const MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY
const MINUTES_PER_MONTH = MINUTES_PER_DAY * DAYS_PER_MONTH
const MINUTES_PER_YEAR = MINUTES_PER_MONTH * MONTHS_PER_YEAR
const MINUTES_PER_GREAT_YEAR = MINUTES_PER_YEAR * YEARS_PER_GREAT_YEAR

function toTotalMinutes(date: CustomDate): number {
  const minute = date.minute ?? 0
  const hour = date.hour ?? 0
  const day = date.day ?? 0
  const month = date.month ?? 0

  return (
    ((((date.greatYear * YEARS_PER_GREAT_YEAR + date.year) * MONTHS_PER_YEAR +
      month) *
      DAYS_PER_MONTH +
      day) *
      HOURS_PER_DAY +
      hour) *
      MINUTES_PER_HOUR +
    minute
  )
}

export function useCustomDate() {
  // 1. Parse string into custom date object
  function parse(str: string): CustomDate {
    const [gy, y, mdPart, hmPart] = str.split(/-|:|\/+/)

    if (!gy || !y || !mdPart) throw new Error(`Invalid date format: ${str}`)

    const [monthRaw, dayRaw] = mdPart.split('/')

    const month = parseInt(monthRaw, 10)
    const day = parseInt(dayRaw, 10)

    const hour = hmPart ? parseInt(hmPart.slice(0, 2), 10) : 0
    const minute = hmPart ? parseInt(hmPart.slice(2), 10) : 0

    return {
      greatYear: parseInt(gy, 10),
      year: parseInt(y, 10),
      month: isNaN(month) ? 1 : month,
      day: isNaN(day) ? 1 : day,
      hour: isNaN(hour) ? 0 : hour,
      minute: isNaN(minute) ? 0 : minute,
    }
  }

  // 2. Convert custom date object into string
  function toString(date: CustomDate): string {
    const padded = (n: number, l: number) => String(n).padStart(l, '0')

    const base = `${date.greatYear}-${padded(date.year, 3)}-${padded(
      date.month,
      2
    )}/${padded(date.day, 2)}`
    if (date.hour !== undefined && date.minute !== undefined) {
      return `${base}:${padded(date.hour, 2)}${padded(date.minute, 2)}`
    }

    return base
  }

  // 3. Compare two dates by unit: returns -1, 0, or 1
  function compare(
    a: CustomDate,
    b: CustomDate,
    unit: DateUnit = 'minute'
  ): number {
    const diff = difference(a, b, unit)
    return diff === 0 ? 0 : diff > 0 ? 1 : -1
  }

  // 4. Get difference between two custom dates in a specific unit
  function difference(
    a: CustomDate,
    b: CustomDate,
    unit: DateUnit = 'minute'
  ): number {
    const deltaMin = toTotalMinutes(a) - toTotalMinutes(b)

    switch (unit) {
      case 'minute':
        return deltaMin
      case 'hour':
        return deltaMin / MINUTES_PER_HOUR
      case 'day':
        return deltaMin / MINUTES_PER_DAY
      case 'month':
        return deltaMin / MINUTES_PER_MONTH
      case 'year':
        return deltaMin / MINUTES_PER_YEAR
      case 'greatYear':
        return deltaMin / MINUTES_PER_GREAT_YEAR
      default:
        return deltaMin
    }
  }

  return {
    parse,
    toString,
    compare,
    difference,

    constants: {
      MINUTES_PER_HOUR,
      HOURS_PER_DAY,
      DAYS_PER_MONTH,
      MONTHS_PER_YEAR,
      YEARS_PER_GREAT_YEAR,
      MINUTES_PER_DAY,
      MINUTES_PER_MONTH,
      MINUTES_PER_YEAR,
      MINUTES_PER_GREAT_YEAR,
    },
  }
}
