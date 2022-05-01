import { Meta } from '@storybook/react/types-6-0';

import CalendarPage from './CalendarPage';

export default {
  title: 'Components/CalendarInput',
} as Meta;

export function Page() {
  const today = new Date();
  return <CalendarPage month={today.getMonth()} year={today.getFullYear()} />;
}
