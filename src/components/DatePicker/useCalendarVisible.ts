import React, { useEffect } from 'react';

import { useFlag } from '##/hooks/useFlag';
import { KeyHandlers, useKeysRef } from '##/hooks/useKeysRef';

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

  const ArrowHandler = (e: KeyboardEvent) => {
    e.preventDefault();
    setCalendarVisible.on();
  };

  const Escape = () => {
    setCalendarVisible.off();
  };

  const Enter = () => {
    !disabled && setCalendarVisible.on();
  };

  const Tab = (e: KeyboardEvent) => {
    if (calendarVisible) {
      e.preventDefault();
      setCalendarVisible.off();
    }
  };

  const keys: KeyHandlers = {
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

  useKeysRef({ ref: startRef, keys, isActive: !disabled });
  useKeysRef({ ref: endRef, keys, isActive: !disabled });

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
