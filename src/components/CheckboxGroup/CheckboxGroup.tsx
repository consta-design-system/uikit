import './CheckboxGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { Checkbox } from '../Checkbox/Checkbox';
import { withDefaultGetters } from './helper';
import {
  CheckboxGroupComponent,
  checkboxGroupDefaultAlign,
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
    getItemAttributes,
    onChange,
    name,
    align = checkboxGroupDefaultAlign,
    direction = checkboxGroupDefaultDirection,
    size = checkboxGroupDefaultSize,
    view = checkboxGroupDefaultView,
    disabled = false,
    className,
    getItemRef,
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
      {items.map((item) => {
        const { className, ...atributes } = getItemAttributes(item) ?? {};
        return (
          <Checkbox
            {...atributes}
            key={getItemKey(item) ?? getItemLabel(item)}
            align={align}
            label={getItemLabel(item)}
            size={size}
            view={view}
            name={name}
            ref={getItemRef(item)}
            disabled={disabled || getItemDisabled?.(item)}
            checked={getChecked(item)}
            onChange={getOnChange(item)}
            className={cnCheckboxGroup('Item', [className])}
          />
        );
      })}
    </div>
  );
};

export const CheckboxGroup = forwardRef(
  CheckboxGroupRender,
) as CheckboxGroupComponent;

export * from './types';
