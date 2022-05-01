import React from 'react';

interface Props {
  month: number;
  year: number;
}

function getMonthRows(firstDate: Date): Array<Date | null>[] {
  const rows: Array<Date | null>[] = [];
  let nextDate = firstDate;
  while (nextDate.getMonth() === firstDate.getMonth()) {
    const row = [];
    for (let day = 0; day < 7; day++) {
      if (
        day === nextDate.getDay() &&
        nextDate.getMonth() === firstDate.getMonth()
      ) {
        row.push(nextDate);
        nextDate = new Date(
          nextDate.getFullYear(),
          nextDate.getMonth(),
          nextDate.getDate() + 1,
        );
      } else {
        row.push(null);
      }
    }
    rows.push(row);
  }

  return rows;
}

function CalendarPage({ month, year }: Props) {
  const firstDate = new Date(year, month);
  const rows = getMonthRows(firstDate);
  return (
    <table>
      {rows.map((row, i) => (
        <tr key={i}>
          {row.map((date, j) => (
            <td key={j}>{date?.getDate()}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default CalendarPage;
