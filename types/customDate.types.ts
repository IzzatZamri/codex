export interface CustomDate {
  greatYear: number
  year: number
  month: number
  day: number
  hour?: number
  minute?: number
}

export interface CustomDateRange {
  start: CustomDate
  end?: CustomDate
}
