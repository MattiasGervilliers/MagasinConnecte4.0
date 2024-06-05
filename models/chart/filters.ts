export type Filters = {
  startDate: Date,
  endDate: Date,
  timeUnit: 'QUARTER_OF_AN_HOUR' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
}