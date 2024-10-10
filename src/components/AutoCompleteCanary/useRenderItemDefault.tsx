import React, { useMemo } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { PropRenderItem } from '##/components/Select';
import { SelectItem } from '##/components/SelectComponents/SelectItem';
import { useMutableRef } from '##/hooks/useMutableRef';

import {
  AutoCompleteItemDefault,
  AutoCompletePropDropdownForm,
  AutoCompletePropGetItemLabel,
} from './types';

export const useRenderItemDefault = (
  getItemLabel: AutoCompletePropGetItemLabel<AutoCompleteItemDefault>,
  disabled: boolean,
  size: FieldPropSize,
  dropdownForm: AutoCompletePropDropdownForm,
) => {
  const getItemLabelRef = useMutableRef(getItemLabel);
  return useMemo(() => {
    const renderItemDefault: PropRenderItem<AutoCompleteItemDefault> = ({
      item,
      active,
      hovered,
      onClick,
      onMouseEnter,
      ref,
    }) => {
      return (
        <SelectItem
          label={getItemLabelRef.current(item)}
          active={active}
          hovered={hovered}
          multiple={false}
          disabled={disabled}
          size={size}
          indent={dropdownForm === 'round' ? 'increased' : 'normal'}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          ref={ref}
        />
      );
    };

    return renderItemDefault;
  }, [disabled, size, dropdownForm]);
};
