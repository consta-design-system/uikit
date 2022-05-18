import './SwitchGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { Switch } from '../Switch/Switch';

import { withDefaultGetters } from './helpers';
import {
  SwitchGroupComponent,
  switchGroupDefaultDirection,
  switchGroupDefaultSize,
  switchGroupDefaultView,
  SwitchGroupProps,
} from './types';

export const cnSwitchGroup = cn('SwitchGroup');

function SwitchGroupRender(props: SwitchGroupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    value = null,
    items,
    getLabel,
    getDisabled,
    onChange,
    name,
    direction = switchGroupDefaultDirection,
    size = switchGroupDefaultSize,
    view = switchGroupDefaultView,
    disabled = false,
    className,
    ...otherProps
  } = withDefaultGetters(props);

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getLabel,
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
          key={getLabel(item)}
          label={getLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || getDisabled?.(item)}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnSwitchGroup('Item')}
        />
      ))}
    </div>
  );
}

export const SwitchGroup = forwardRef(SwitchGroupRender) as SwitchGroupComponent;

export * from './types';
