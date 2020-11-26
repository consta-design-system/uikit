import React from 'react';

import { Text } from '../../Text/Text';
import { cnCalendar } from '../Calendar';

export const CalendarWeekHeader: React.FC = () => {
  return (
    <>
      {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((dayName, idx) => (
        <div key={idx} className={cnCalendar('Cell', { weekDay: true })}>
          <div className={cnCalendar('CellContent')}>
            <Text as="span" size="2xs" transform="uppercase" view="ghost" spacing="xs">
              {dayName}
            </Text>
          </div>
        </div>
      ))}
    </>
  );
};
