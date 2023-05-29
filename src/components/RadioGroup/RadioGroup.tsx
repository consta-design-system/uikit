import './RadioGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { Radio } from '../Radio/Radio';
import { withDefaultGetters } from './helper';
import {
  RadioGroupComponent,
  radioGroupDefaultDirection,
  radioGroupDefaultSize,
  radioGroupDefaultView,
  radioGroupPropAlignDefault,
  RadioGroupProps,
} from './types';

export const cnRadioGroup = cn('RadioGroup');

const RadioGroupRender = (
  props: RadioGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    value = null,
    items,
    getItemLabel,
    getItemKey,
    getItemDisabled,
    onChange,
    name,
    direction = radioGroupDefaultDirection,
    size = radioGroupDefaultSize,
    view = radioGroupDefaultView,
    align = radioGroupPropAlignDefault,
    disabled = false,
    className,
    ...otherProps
  } = withDefaultGetters(props);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: (item) => getItemKey(item) ?? getItemLabel(item),
    callBack: onChange,
    multiple: false,
  });

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnRadioGroup({ direction, size, view }, [className])}
    >
      {items.map((item) => (
        <Radio
          align={align}
          key={getItemKey(item) ?? getItemLabel(item)}
          label={getItemLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || (!!getItemDisabled && getItemDisabled(item))}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnRadioGroup('Item')}
        />
      ))}
    </div>
  );
};

export const RadioGroup = forwardRef(RadioGroupRender) as RadioGroupComponent;

export * from './types';
