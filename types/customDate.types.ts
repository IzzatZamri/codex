export interface CustomDate {
  year: number
  month: number
  day: number
  hour?: number | 0
  minute?: number | 0
  second?: number | 0
}

export interface CustomDateRange {
  start: CustomDate
  end?: CustomDate
}
