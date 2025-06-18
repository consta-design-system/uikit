import { AtomMut } from '@reatom/core';
import { useAtom } from '@reatom/npm-react';
import React, { forwardRef, memo } from 'react';

import { FieldArrayValueInlineControl } from '##/components/FieldComponents';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnCanary as cn } from '##/utils/bem';
import { usePickAtom } from '##/utils/state';

import { PropsWithDefault } from '../defaultProps';
import { SelectGroupDefault, SelectItemDefault } from '../types';

const cnSelectMultipleValue = cn('SelectMultipleValue');

type SelectMultipleValueProps<ITEM, GROUP> = {
  propsAtom: AtomMut<PropsWithDefault<ITEM, GROUP, true>>;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  renderValue: (items: ITEM[]) => React.ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & React.RefAttributes<HTMLDivElement>;

export type SelectMultipleValueComponent = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
>(
  props: SelectMultipleValueProps<ITEM, GROUP>,
) => React.ReactNode | null;

export const SelectMultipleValueRender = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
>(
  {
    propsAtom,
    onFocus,
    onBlur,
    onClick,
    renderValue,
    onChange,
    inputRef,
  }: SelectMultipleValueProps<ITEM, GROUP>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [{ value, disabled, placeholder, size, input, inputDefaultValue }] =
    useAtom(
      usePickAtom(propsAtom, [
        'value',
        'disabled',
        'placeholder',
        'size',
        'input',
        'inputDefaultValue',
      ]),
    );

  return (
    <FieldArrayValueInlineControl
      className={cnSelectMultipleValue(null, [
        cnMixScrollBar({ size: 'xs', trackSize: 'auto' }),
      ])}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      value={value || undefined}
      disabled={disabled}
      placeholder={placeholder}
      renderValue={renderValue}
      size={size}
      disableInput={input ? undefined : true}
      inputRef={inputRef}
      ref={ref}
      inputDefaultValue={input ? inputDefaultValue : undefined}
      onChange={onChange}
    />
  );
};

export const SelectMultipleValue = memo(
  forwardRef(SelectMultipleValueRender),
) as SelectMultipleValueComponent;
