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
    getItemAttributes,
    onChange,
    name,
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
            key={getItemKey(item) ?? getItemLabel(item)}
            label={getItemLabel(item)}
            size={size}
            view={view}
            name={name}
            ref={getItemRef(item)}
            disabled={disabled || getItemDisabled?.(item)}
            checked={getChecked(item)}
            onChange={(_value, { e }) => getOnChange(item)(e)}
            className={cnCheckboxGroup('Item', [className])}
            {...atributes}
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
