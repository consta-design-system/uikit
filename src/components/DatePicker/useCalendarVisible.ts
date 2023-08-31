import { useEffect } from 'react';

import { useFlag } from '##/hooks/useFlag';

type UseCalendarVisibleParams = {
  onDropdownOpen?: (isOpen: boolean) => void;
  dropdownOpen?: boolean;
};

export const useCalendarVisible = (
  params: UseCalendarVisibleParams,
): ReturnType<typeof useFlag> => {
  const { onDropdownOpen, dropdownOpen } = params;

  const [calendarVisible, setCalendarVisible] = useFlag(false);

  useEffect(() => {
    onDropdownOpen?.(calendarVisible);
  }, [calendarVisible]);

  useEffect(() => {
    setCalendarVisible.set(dropdownOpen ?? false);
  }, [dropdownOpen]);

  return [calendarVisible, setCalendarVisible];
};
