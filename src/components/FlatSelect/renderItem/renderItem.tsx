import { Computed, computed } from '@reatom/core';
import React from 'react';

import { Checkbox } from '##/components/Checkbox';
import { ListItem } from '##/components/ListCanary';
import { Radio } from '##/components/Radio';

import { PropsWithDefault } from '../defaultProps';
import {
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectPropRenderItem,
  RenderItemProps,
} from '../types';

export const renderItemAtom = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  propsAtom: Computed<PropsWithDefault<ITEM, GROUP, MULTIPLE>>,
) =>
  computed(() => {
    const {
      getItemDisabled,
      getItemLabel,
      multiple,
      disabled: componentDisabled,
      size,
      renderItem,
    } = propsAtom();

    if (renderItem) {
      return renderItem;
    }

    const renderItemDefault: FlatSelectPropRenderItem<ITEM> = ({
      item,
      active,
      hovered,
      onClick,
      onMouseEnter,
      ref,
    }: RenderItemProps<ITEM>) => {
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
    };

    return renderItemDefault;
  });
