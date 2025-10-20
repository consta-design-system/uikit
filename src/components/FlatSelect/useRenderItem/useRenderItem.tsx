import { useAction } from '@reatom/npm-react';
import React from 'react';

import { Checkbox } from '##/components/Checkbox';
import { FieldPropSize } from '##/components/FieldComponents';
import { ListItem } from '##/components/ListCanary';
import { Radio } from '##/components/Radio';

import {
  FlatSelectItemDefault,
  FlatSelectPropGetItemDisabled,
  FlatSelectPropGetItemLabel,
  FlatSelectPropRenderItem,
  RenderItemProps,
} from '../types';

export const useRenderItem = <ITEM = FlatSelectItemDefault,>({
  getItemLabel,
  getItemDisabled,
  multiple,
  disabled: componentDisabled,
  size,
  renderItem,
}: {
  getItemLabel: FlatSelectPropGetItemLabel<ITEM>;
  getItemDisabled: FlatSelectPropGetItemDisabled<ITEM>;
  multiple?: boolean;
  disabled?: boolean;
  size: FieldPropSize;
  renderItem?: FlatSelectPropRenderItem<ITEM>;
}) => {
  const renderItemDefault: FlatSelectPropRenderItem<ITEM> = useAction(
    (
      ctx,
      {
        item,
        active,
        hovered,
        onClick,
        onMouseEnter,
        ref,
      }: RenderItemProps<ITEM>,
    ) => {
      const disabled = getItemDisabled(item) || componentDisabled;

      return (
        <ListItem
          ref={ref}
          aria-selected={active}
          aria-disabled={disabled}
          role="option"
          label={getItemLabel(item)}
          size={size}
          active={hovered}
          onMouseEnter={onMouseEnter}
          disabled={disabled}
          onClick={onClick}
          leftSide={
            multiple ? (
              <Checkbox
                checked={active}
                disabled={disabled}
                size={size}
                tabIndex={-1}
              />
            ) : (
              <Radio
                checked={active}
                disabled={disabled}
                size={size}
                tabIndex={-1}
              />
            )
          }
        />
      );
    },
    [getItemLabel, getItemDisabled, multiple, componentDisabled, size],
  );

  return renderItem || renderItemDefault;
};
