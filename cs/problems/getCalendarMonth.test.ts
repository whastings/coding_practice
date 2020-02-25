import getCalendarMonth from './getCalendarMonth'

describe('getCalendarMonth', () => {
  it('returns all dates to be shown in a calendar month view', () => {
    const startMonthDate = new Date('2020-01-01') // Wednesday

    const monthWeeks = getCalendarMonth(startMonthDate)

    expect(monthWeeks[0][0]?.getTime()).toEqual(new Date('2019-12-29').getTime())
    expect(monthWeeks[4][6]?.getTime()).toEqual(new Date('2020-02-01').getTime())
  })
})
