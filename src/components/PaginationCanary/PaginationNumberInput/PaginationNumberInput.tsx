import './PaginationNumberInput.css';

import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { Text } from '##/components/Text';
import { TextField, useIMask } from '##/components/TextField';
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
  const onChangeRef = useMutableRef(onChange);
  const valueRef = useMutableRef(value);

  const [stringValue, setStringValue] = useState<string | null>(
    value?.toString() ?? null,
  );

  const stringValueRef = useMutableRef(stringValue);

  const handleChange = ({
    e,
    value: stringValue,
  }: {
    e: Event;
    value: string | null;
  }) => {
    if (stringValueRef.current === stringValue) {
      return;
    }
    setStringValue(stringValue);
    const onChange = onChangeRef.current;

    if (stringValue === null) {
      return;
    }

    const value = valueRef.current;

    const pageNumber = Number(stringValue);

    if (Number.isNaN(pageNumber)) {
      return;
    }
    if (pageNumber !== value) {
      const newValue = Math.max(Math.min(pageNumber, total), 0);
      onChange?.(newValue, { e });
    }
  };

  const { inputRef } = useIMask({
    value: stringValue,
    onChange: (_val, args) => handleChange(args),
    maskOptions: {
      mask: Number,
      scale: 0,
      thousandsSeparator: ' ',
      min: 1,
      max: total,
    },
  });

  useEffect(() => {
    if (value?.toString() !== stringValue) {
      setStringValue(value?.toString() ?? null);
    }
  }, [value]);

  const handleKeyDown: React.KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        return;
      }
      e.stopPropagation();
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const value = Math.max(
          Math.min(
            Number(stringValueRef.current) + (e.key === 'ArrowUp' ? 1 : -1),
            total,
          ),
          1,
        );
        setStringValue(value.toString());
        onChange?.(value, { e });
      }
    },
    [total],
  );

  return (
    <div
      className={cnPaginationNumberInput({ size }, [
        className,
        cnMixFlex({ align: 'center', justify: 'center', gap: 'xs' }),
      ])}
      ref={ref}
      {...otherProps}
    >
      <TextField
        value={stringValue}
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
