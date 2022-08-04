import './CheckboxGroup.css';

import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Checkbox } from '../Checkbox/Checkbox';

export const cnCheckboxGroup = cn('CheckboxGroup');

export const checkboxGroupDirections = ['column', 'row'] as const;
export type CheckboxGroupDirection = typeof checkboxGroupDirections[number];
export const checkboxGroupDefaultDirection: CheckboxGroupDirection =
  checkboxGroupDirections[0];

export const checkboxGroupSizes = ['m', 'l'] as const;
export type CheckboxGroupPropSize = typeof checkboxGroupSizes[number];
export const checkboxGroupDefaultSize: CheckboxGroupPropSize =
  checkboxGroupSizes[0];

export const checkboxGroupViews = ['primary', 'ghost'] as const;
export type CheckboxGroupPropView = typeof checkboxGroupViews[number];
export const checkboxGroupDefaultView: CheckboxGroupPropView =
  checkboxGroupViews[0];

type CommonProps<ITEM> = {
  value?: ITEM[] | null;
  items: ITEM[];
  getLabel: (item: ITEM) => string;
  getDisabled?: (item: ITEM) => boolean | undefined;
  onChange: (props: {
    e: React.ChangeEvent<HTMLInputElement>;
    value: ITEM[] | null;
  }) => void;
  name?: string;
  direction?: CheckboxGroupDirection;
  size?: CheckboxGroupPropSize;
  view?: CheckboxGroupPropView;
  disabled?: boolean;
  className?: string;
};

type Props<ITEM> = PropsWithHTMLAttributesAndRef<
  CommonProps<ITEM>,
  HTMLDivElement
>;

type CheckboxGroup = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const CheckboxGroup: CheckboxGroup = React.forwardRef((props, ref) => {
  const {
    value = null,
    items,
    getLabel,
    getDisabled,
    onChange,
    name,
    direction = checkboxGroupDefaultDirection,
    size = checkboxGroupDefaultSize,
    view = checkboxGroupDefaultView,
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
      className={cnCheckboxGroup({ direction, size, view }, [className])}
    >
      {items.map((item) => (
        <Checkbox
          key={getLabel(item)}
          label={getLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || getDisabled?.(item)}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnCheckboxGroup('Item')}
        />
      ))}
    </div>
  );
});
