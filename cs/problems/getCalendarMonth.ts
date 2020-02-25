const getCalendarMonth = (startOfMonth: Date): Date[][] => {
  let currentDate = new Date(startOfMonth.getTime())

  // JS says Monday is day 0
  while (currentDate.getDay() >= 0) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  const monthWeeks: Date[][] = []
  while (monthWeeks.length < 5) {
    const weekDates: Date[] = []
    while (weekDates.length < 7) {
      weekDates.push(currentDate)
      currentDate = new Date(currentDate.getTime())
      currentDate.setDate(currentDate.getDate() + 1)
    }
    monthWeeks.push(weekDates)
  }

  return monthWeeks
}

export default getCalendarMonth
