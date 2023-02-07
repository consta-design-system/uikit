import { useEffect, useState } from 'react';

import { useFlag } from '##/hooks/useFlag';

type UseDropdownVisiblePropOnFocus =
  | [
      React.FocusEventHandler<HTMLElement>?,
      React.FocusEventHandler<HTMLElement>?,
    ]
  | React.FocusEventHandler<HTMLElement>;

type FieldType = 'start' | 'end' | undefined;

type FieldResult = {
  flag: boolean;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
};

type UseDropdownVisibleResult = {
  calendarVisible: boolean;
  blocks: {
    start: FieldResult;
    end: FieldResult;
    dropdown: FieldResult;
  };
  close: () => void;
  fieldType: FieldType;
};

type UseDropdownVisible = (
  onFocus: UseDropdownVisiblePropOnFocus | undefined,
  onBlur?: UseDropdownVisiblePropOnFocus,
) => UseDropdownVisibleResult;

export const useDropdownVisible: UseDropdownVisible = (onFocus, onBlur) => {
  const [fieldFocused, setFieldFocused] = useFlag();
  const [fieldType, setFieldType] = useState<FieldType>();
  const [dropdownFocused, setDropdownFocused] = useFlag(false);

  const [calendarVisible, setCalendarVisible] = useFlag();

  useEffect(() => {
    if (dropdownFocused || fieldFocused) {
      setCalendarVisible.on();
    } else {
      setCalendarVisible.off();
    }
  }, [fieldFocused, dropdownFocused]);

  const onStartFocus = (e: React.FocusEvent<HTMLElement>) => {
    setFieldType('start');
    setFieldFocused.on();
    Array.isArray(onFocus) ? onFocus[0]?.(e) : onFocus?.(e);
  };

  const onEndFocus = (e: React.FocusEvent<HTMLElement>) => {
    setFieldType('end');
    setFieldFocused.on();
    Array.isArray(onFocus) ? onFocus[1]?.(e) : onFocus?.(e);
  };

  const onStartBlur = (e: React.FocusEvent<HTMLElement>) => {
    Array.isArray(onBlur) ? onBlur[0]?.(e) : onBlur?.(e);
    setFieldFocused.off();
  };

  const onEndBlur = (e: React.FocusEvent<HTMLElement>) => {
    Array.isArray(onBlur) ? onBlur[1]?.(e) : onBlur?.(e);
    setFieldFocused.off();
  };

  const close = () => {
    setCalendarVisible.off();
    setFieldFocused.off();
    setDropdownFocused.off();
  };

  return {
    calendarVisible,
    close,
    blocks: {
      start: {
        flag: fieldFocused,
        onFocus: onStartFocus,
        onBlur: onStartBlur,
      },
      end: {
        flag: fieldFocused,
        onFocus: onEndFocus,
        onBlur: onEndBlur,
      },
      dropdown: {
        flag: dropdownFocused,
        onFocus: () => setDropdownFocused.on(),
        onBlur: () => setDropdownFocused.off(),
      },
    },
    fieldType,
  };
};
