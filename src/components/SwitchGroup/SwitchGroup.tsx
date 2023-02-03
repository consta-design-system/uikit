import './SwitchGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import {
  Switch,
  switchPropSizeDefault,
  switchPropViewDefault,
} from '../Switch';
import { withDefaultGetters } from './helpers';
import {
  SwitchGroupComponent,
  switchGroupDefaultDirection,
  SwitchGroupProps,
} from './types';

export const cnSwitchGroup = cn('SwitchGroup');

const SwitchGroupRender = (
  props: SwitchGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    value = null,
    items,
    getItemLabel,
    getItemDisabled,
    onChange,
    name,
    direction = switchGroupDefaultDirection,
    size = switchPropSizeDefault,
    view = switchPropViewDefault,
    disabled = false,
    className,
    ...otherProps
  } = withDefaultGetters(props);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getItemLabel,
    callBack: onChange,
    multiple: true,
  });

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnSwitchGroup({ direction, size, view }, [className])}
    >
      {items.map((item) => (
        <Switch
          key={getItemLabel(item)}
          label={getItemLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || getItemDisabled?.(item)}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnSwitchGroup('Item')}
        />
      ))}
    </div>
  );
};

export const SwitchGroup = forwardRef(
  SwitchGroupRender,
) as SwitchGroupComponent;

export * from './types';
