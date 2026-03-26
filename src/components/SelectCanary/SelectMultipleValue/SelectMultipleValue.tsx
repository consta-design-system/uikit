import { AtomLike, computed, wrap } from '@reatom/core';
import React, { memo } from 'react';

import { FieldArrayValueInlineControl } from '##/components/FieldComponents';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnCanary as cn } from '##/utils/bem';
import { factoryComponent } from '##/utils/state';

import { PropsWithDefault } from '../defaultProps';
import { SelectGroupDefault, SelectItemDefault } from '../types';

const cnSelectMultipleValue = cn('SelectMultipleValue');

type SelectMultipleValueProps<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
> = {
  rootPropsAtom: AtomLike<PropsWithDefault<ITEM, GROUP, true>>;
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

export const SelectMultipleValue = memo(
  factoryComponent<HTMLDivElement, SelectMultipleValueProps>(
    ({ ref, rootPropsAtom }) => {
      const value = computed(() => rootPropsAtom().value || undefined);
      const disabled = computed(() => rootPropsAtom().disabled);
      const placeholder = computed(() => rootPropsAtom().placeholder);
      const size = computed(() => rootPropsAtom().size);
      const disableInput = computed(() => !rootPropsAtom().input);
      const inputDefaultValue = computed(() =>
        rootPropsAtom().input ? rootPropsAtom().inputDefaultValue : undefined,
      );
      const inputValue = computed(() =>
        rootPropsAtom().input ? rootPropsAtom().inputValue : undefined,
      );

      return ({
        onFocus,
        onBlur,
        onClick,
        renderValue,
        inputRef,
        onChange,
      }) => {
        return (
          <FieldArrayValueInlineControl
            className={cnSelectMultipleValue(null, [
              cnMixScrollBar({ size: 'xs', trackSize: 'auto' }),
            ])}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
            value={value()}
            disabled={disabled()}
            placeholder={placeholder()}
            renderValue={renderValue}
            size={size()}
            disableInput={disableInput()}
            inputRef={inputRef}
            ref={ref}
            inputDefaultValue={inputDefaultValue()}
            onChange={onChange}
            inputValue={inputValue()}
          />
        );
      };
    },
  ),
) as SelectMultipleValueComponent;
