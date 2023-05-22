import './CheckboxGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { Checkbox } from '../Checkbox/Checkbox';
import { withDefaultGetters } from './helper';
import {
  CheckboxGroupComponent,
  checkboxGroupDefaultDirection,
  checkboxGroupDefaultSize,
  checkboxGroupDefaultView,
  CheckboxGroupProps,
} from './types';

export const cnCheckboxGroup = cn('CheckboxGroup');

const CheckboxGroupRender = (
  props: CheckboxGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    value = null,
    items,
    getItemKey,
    getItemLabel,
    getItemDisabled,
    onChange,
    name,
    direction = checkboxGroupDefaultDirection,
    size = checkboxGroupDefaultSize,
    view = checkboxGroupDefaultView,
    disabled = false,
    className,
    ...otherProps
  } = withDefaultGetters(props);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: (item) => getItemKey(item) ?? getItemLabel(item),
    callBack: onChange,
    multiple: true,
  });

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnCheckboxGroup({ direction, size, view }, [className])}
    >
      {items.map((item) => (
        <Checkbox
          key={getItemKey(item) ?? getItemLabel(item)}
          label={getItemLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || getItemDisabled?.(item)}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnCheckboxGroup('Item')}
        />
      ))}
    </div>
  );
};

export const CheckboxGroup = forwardRef(
  CheckboxGroupRender,
) as CheckboxGroupComponent;

export * from './types';
