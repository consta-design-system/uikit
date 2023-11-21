import React, { forwardRef } from 'react';

import { Chips } from '##/components/Chips';
import { useChoiceGroup } from '##/hooks/useChoiceGroup';

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

  const { getOnChange, getChecked } = useChoiceGroup<
    ChipsChoiceDefaultItem,
    React.MouseEvent
  >({
    getKey: (item: ChipsChoiceDefaultItem) => {
      const key = getItemKey(item);
      return typeof key !== undefined && key ? key : getItemLabel(item);
    },
    value: value as ChipsChoiceDefaultItem,
    callBack: onChange,
    multiple: multiple as false,
    // привел к типам из-за того что
    // TS не понимает что параметры для не Multiple и Multiple не могут прийти одновременно
  });

  return (
    <Chips
      {...otherProps}
      ref={ref}
      onItemRightIconClick={getUndefined}
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
