import './SwitchGroup.css';

import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Switch } from '../Switch/Switch';

export const cnSwitchGroup = cn('SwitchGroup');

export const switchGroupDirections = ['column', 'row'] as const;
export type SwitchGroupDirection = typeof switchGroupDirections[number];
export const switchGroupDefaultDirection: SwitchGroupDirection =
  switchGroupDirections[0];

export const switchGroupSizes = ['m', 'l'] as const;
export type SwitchGroupPropSize = typeof switchGroupSizes[number];
export const switchGroupDefaultSize: SwitchGroupPropSize = switchGroupSizes[0];

export const switchGroupViews = ['primary', 'ghost'] as const;
export type SwitchGroupPropView = typeof switchGroupViews[number];
export const switchGroupDefaultView: SwitchGroupPropView = switchGroupViews[0];

type CommonProps<ITEM> = {
  value?: ITEM[] | null;
  items: ITEM[];
  getLabel: (item: ITEM) => string;
  getDisabled?: (item: ITEM) => boolean | undefined;
  onChange: (props: {
    e: React.ChangeEvent<HTMLInputElement>;
    value: ITEM[] | null;
  }) => void;
  name: string;
  direction?: SwitchGroupDirection;
  size?: SwitchGroupPropSize;
  view?: SwitchGroupPropView;
  disabled?: boolean;
  className?: string;
};

type Props<ITEM> = PropsWithHTMLAttributesAndRef<
  CommonProps<ITEM>,
  HTMLDivElement
>;

type SwitchGroup = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const SwitchGroup: SwitchGroup = React.forwardRef((props, ref) => {
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
  } = props;

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
});
