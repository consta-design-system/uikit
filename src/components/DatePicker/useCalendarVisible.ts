import React, { useEffect, useRef } from 'react';

import { Flag, useFlag } from '##/hooks/useFlag';
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
  const [state, setState] = useFlag(initial);

  useEffect(() => {
    disabled && setState.off();
  }, [disabled]);

  return [
    state,
    {
      on: () => {
        !disabled && setState.on();
      },
      off: () => setState.off(),
      toggle: () => {
        !disabled && setState.toggle();
      },
      set: (action) => {
        !disabled && setState.set(action);
      },
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
  const isFirstRender = useRef(true);

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
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    !disabled && onDropdownOpen?.(calendarVisible);
  }, [calendarVisible]);

  useEffect(() => {
    !disabled && setCalendarVisible.set(dropdownOpen ?? false);
  }, [dropdownOpen]);

  return [calendarVisible, setCalendarVisible];
};
