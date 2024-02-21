import React, { useEffect, useState } from 'react';

import { Flag } from '##/hooks/useFlag';
import { KeyHandlers, useKeysRef } from '##/hooks/useKeysRef';

type UseCalendarVisibleParams = {
  onDropdownOpen?: (isOpen: boolean) => void;
  dropdownOpen?: boolean;
  disabled?: boolean;
  startRef: React.RefObject<HTMLInputElement>;
  endRef?: React.RefObject<HTMLInputElement>;
};
type UseFlagReturn = ReturnType<typeof useFlagWithDisabled>;
type Return = [UseFlagReturn[0], UseFlagReturn[1]];

const useFlagWithDisabled = (initial = false, disabled?: boolean): Flag => {
  const [state, setState] = useState(initial);
  return [
    state,
    {
      on: () => {
        !disabled && setState(true);
      },
      off: () => setState(false),
      toggle: () => setState((state) => !disabled && !state),
      set: setState,
    },
  ];
};

export const useCalendarVisible = (
  params: UseCalendarVisibleParams,
): Return => {
  const { onDropdownOpen, dropdownOpen, disabled, startRef, endRef } = params;

  const [calendarVisible, setCalendarVisible] = useFlagWithDisabled(
    false,
    disabled,
  );

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

  const eventHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key !== 'Tab' && key !== 'Escape') {
      setCalendarVisible.on();
    }
  };

  useKeysRef({ ref: startRef, keys, eventHandler, isActive: !disabled });
  useKeysRef({ ref: endRef, keys, eventHandler, isActive: !disabled });

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
