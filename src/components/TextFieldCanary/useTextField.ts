import React, { useCallback, useEffect, useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';
import { useMutableRef } from '##/hooks/useMutableRef/useMutableRef';

import { TextFieldPropOnChange } from './types';

export const useTextField = <
  INPUT_ELEMENT extends
    | HTMLInputElement
    | HTMLTextAreaElement = HTMLInputElement,
>({
  onClick,
  onChange,
  onBlur,
  onFocus,
  disabled,
  onClear,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  onChange: TextFieldPropOnChange<string> | undefined;
  onBlur: React.FocusEventHandler<HTMLElement> | undefined;
  onFocus: React.FocusEventHandler<HTMLElement> | undefined;
  disabled: boolean | undefined;
  onClear: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<INPUT_ELEMENT>(null);
  const [focused, setFocused] = useFlag();
  const [withValue, setWithValue] = useFlag();

  const mutableRefs = useMutableRef([
    onChange,
    onClick,
    onBlur,
    onFocus,
    disabled,
    onClear,
  ] as const);

  const handleFocus: React.FocusEventHandler<HTMLElement> = useCallback((e) => {
    setFocused.on();
    mutableRefs.current[3]?.(e);
  }, []);

  const handleBlur: React.FocusEventHandler<HTMLElement> = useCallback((e) => {
    setFocused.off();
    mutableRefs.current[2]?.(e);
  }, []);

  const handleClear = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (mutableRefs.current[4]) {
      return;
    }

    if (mutableRefs.current[5]) {
      mutableRefs.current[5]?.(e);
    } else {
      mutableRefs.current[0]?.(null, { e });
      if (inputRef.current && inputRef.current.value !== '') {
        inputRef.current.value = '';
      }
    }
  }, []);

  const handleChange: React.ChangeEventHandler<INPUT_ELEMENT> = useCallback(
    (e) => {
      if (mutableRefs.current[4]) {
        return;
      }

      mutableRefs.current[0]?.(e.target.value || null, { e });

      setWithValue[e.target.value ? 'on' : 'off']();
    },
    [],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      inputRef.current?.focus();
      mutableRefs.current[1]?.(e);
    },
    [],
  );

  useEffect(() => {
    setWithValue[inputRef.current?.value ? 'on' : 'off']();
  }, [inputRef.current?.value]);

  return {
    ref,
    inputRef,
    focused,
    withValue,
    handleFocus,
    handleBlur,
    handleClear,
    handleChange,
    handleClick,
    mutableRefs,
    setWithValue,
  };
};
