import React, { useEffect, useState } from 'react';

export const useCurrentVisibleDate = (
  date?: Date,
  onChange?: (date: Date) => void,
): [Date | undefined, React.Dispatch<React.SetStateAction<Date | undefined>>] => {
  const state = useState<Date | undefined>(date);

  useEffect(() => state[1](date), [date?.getTime()]);

  useEffect(() => state[0] && onChange?.(state[0]), [state[0]?.getTime()]);

  return state;
};
