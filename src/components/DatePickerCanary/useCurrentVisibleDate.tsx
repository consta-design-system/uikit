import { useEffect } from 'react';

import {
  getCurrentVisibleDate,
  useCurrentVisibleDate as useDateTimeCurrentVisibleDate,
  UseCurrentVisibleDateProps,
} from '../DateTimeCanary/helpers/useCurrentVisibleDate';

export const useCurrentVisibleDate = (
  props: UseCurrentVisibleDateProps & { calendarVisible: boolean },
) => {
  const state = useDateTimeCurrentVisibleDate(props);

  useEffect(() => {
    if (props.calendarVisible) {
      state[1](getCurrentVisibleDate(props));
    }
  }, [props.calendarVisible]);

  return state;
};
