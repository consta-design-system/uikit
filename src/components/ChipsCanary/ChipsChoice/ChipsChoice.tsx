import React, { forwardRef } from 'react';

import { Chips } from '##/components/ChipsCanary';
import {
  CallbackWithoutMultiple,
  useChoiceGroup,
} from '##/hooks/useChoiceGroup';

import { defaultGetItemLabel } from '../helpers';
import {
  ChipsChoiceComponent,
  ChipsChoiceDefaultItem,
  ChipsChoicePropGetItemKey,
  ChipsChoiceProps,
} from './types';

export const getUndefined = () => undefined;
export const getItemKeyDefault: ChipsChoicePropGetItemKey<
  ChipsChoiceDefaultItem
> = (item) => item.key;

const ChipsChoiceRender = (
  props: ChipsChoiceProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    value,
    onChange,
    multiple,
    getItemKey = getItemKeyDefault,
    getItemLabel = defaultGetItemLabel,
    ...otherProps
  } = props;

  const callBack: CallbackWithoutMultiple<
    ChipsChoiceDefaultItem,
    React.MouseEvent
  > = ({ value, e }) => onChange(value, { e });

  const { getOnChange, getChecked } = useChoiceGroup<
    ChipsChoiceDefaultItem,
    React.MouseEvent
  >({
    getKey: (item: ChipsChoiceDefaultItem) => {
      const key = getItemKey(item);
      return typeof key !== undefined && key ? key : getItemLabel(item);
    },
    value: value as ChipsChoiceDefaultItem,
    callBack,
    multiple: multiple as false,
    // привел к типам из-за того что
    // TS не понимает что параметры для не Multiple и Multiple не могут прийти одновременно
  });

  return (
    <Chips
      {...otherProps}
      ref={ref}
      onItemOnRightIconClick={getUndefined}
      onItemClick={(item, { e }) => getOnChange(item)(e)}
      getItemIconRight={getUndefined}
      getItemAttributes={getUndefined}
      getItemActive={getChecked}
      interactive
    />
  );
};

export const ChipsChoice = forwardRef(
  ChipsChoiceRender,
) as ChipsChoiceComponent;
