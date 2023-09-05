import React, { useEffect } from 'react';

import { useFlag } from '##/hooks/useFlag';
import { KeyHandler, useKeysRef } from '##/hooks/useKeysRef';

type UseCalendarVisibleParams = {
  onDropdownOpen?: (isOpen: boolean) => void;
  dropdownOpen?: boolean;
  disabled?: boolean;
  startRef: React.RefObject<HTMLInputElement>;
  endRef?: React.RefObject<HTMLInputElement>;
};
type UseFlagReturn = ReturnType<typeof useFlag>;
type Return = [UseFlagReturn[0], UseFlagReturn[1]];

export const useCalendarVisible = (
  params: UseCalendarVisibleParams,
): Return => {
  const { onDropdownOpen, dropdownOpen, disabled, startRef, endRef } = params;

  const [calendarVisible, setCalendarVisible] = useFlag(false);

  const ArrowHandler: KeyHandler = (_, e) => {
    e.preventDefault();
    !disabled && setCalendarVisible.on();
  };

  const Escape = () => {
    setCalendarVisible.off();
  };

  const Enter = () => {
    !disabled && setCalendarVisible.on();
  };

  const Tab: KeyHandler = (_, e): void => {
    if (calendarVisible) {
      e.preventDefault();
      setCalendarVisible.off();
    }
  };

  const handlers = {
    ArrowUp: ArrowHandler,
    ArrowDown: ArrowHandler,
    PageUp: ArrowHandler,
    PageDown: ArrowHandler,
    Home: ArrowHandler,
    End: ArrowHandler,
    Enter,
    Escape,
    Tab,
  };

  useKeysRef(startRef, handlers);
  useKeysRef(endRef, handlers);

  useEffect(() => {
    !disabled && onDropdownOpen?.(calendarVisible);
  }, [calendarVisible]);

  useEffect(() => {
    !disabled && setCalendarVisible.set(dropdownOpen ?? false);
  }, [dropdownOpen]);

  useEffect(() => {
    disabled && setCalendarVisible.off();
  }, [disabled]);

  return [calendarVisible, setCalendarVisible];
};
