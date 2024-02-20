import './PaginationNumberInput.css';

import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';
import { ReactMaskOpts, useIMask } from 'react-imask';

import { Text } from '##/components/Text';
import { TextField } from '##/components/TextField';
import { useMutableRef } from '##/hooks/useMutableRef';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';
import { isNotNil } from '##/utils/type-guards';

import {
  PaginationNumberInputProps,
  paginationPropFormDefault,
  paginationPropSizeDefault,
} from '../types';

const cnPaginationNumberInput = cn('PaginationNumberInput');

const defaultGetTotalLabel = (pages: number) => `из ${pages}`;

export const PaginationNumberInput = forwardRef<
  HTMLDivElement,
  PaginationNumberInputProps
>((props, ref) => {
  const {
    value,
    onChange,
    total,
    getTotalLabel = defaultGetTotalLabel,
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    className,
    ...otherProps
  } = props;

  const {
    ref: inputRef,
    value: stringValue,
    setValue: setStringValue,
  } = useIMask<HTMLInputElement, ReactMaskOpts>({
    mask: Number,
    scale: 0,
    min: 1,
    max: total,
  });

  const onChangeRef = useMutableRef(onChange);
  const stringValueRef = useMutableRef(stringValue);
  const setStringValueRef = useMutableRef(setStringValue);

  const keysMap: Record<string, React.KeyboardEventHandler> = useMemo(() => {
    return {
      ArrowUp: (e) => {
        e.preventDefault();
        const value = Math.max(
          Math.min(Number(stringValueRef.current) + 1, total),
          1,
        );
        setStringValueRef.current(value.toString());
      },

      ArrowDown: (e) => {
        e.preventDefault();
        const value = Math.max(
          Math.min(Number(stringValueRef.current) - 1, total),
          1,
        );
        setStringValueRef.current(value.toString());
      },

      Enter: (e) => {
        e.preventDefault();
        if (Number(stringValueRef.current)) {
          onChangeRef.current?.(Number(stringValueRef.current), {
            e: e.nativeEvent,
          });
        }
      },
    };
  }, [total]);

  const handleKeyDown: React.KeyboardEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      keysMap[e.key]?.(e);
    },
    [keysMap],
  );

  useEffect(() => {
    const newValue = value?.toString() || '';
    if (newValue !== stringValueRef.current) {
      setStringValueRef.current(newValue);
    }
  }, [value]);

  return (
    <div
      {...otherProps}
      className={cnPaginationNumberInput({ size }, [
        cnMixFlex({ align: 'center', justify: 'center', gap: 'xs' }),
        className,
      ])}
      ref={ref}
    >
      <TextField
        defaultValue={value ? value.toString() : undefined}
        size={size}
        form={form}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        className={cnPaginationNumberInput('Input')}
      />
      {isNotNil(total) && (
        <Text className={cnPaginationNumberInput('Total')} size={size}>
          {getTotalLabel(total)}
        </Text>
      )}
    </div>
  );
});
