import './RadioGroup.css';

import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { Radio } from '../Radio/Radio';

export const cnRadioGroup = cn('RadioGroup');

export const radioGroupDirections = ['column', 'row'] as const;
export type RadioGroupDirection = typeof radioGroupDirections[number];
export const radioGroupDefaultDirection: RadioGroupDirection = radioGroupDirections[0];

export const radioGroupSizes = ['m', 'l'] as const;
export type RadioGroupPropSize = typeof radioGroupSizes[number];
export const radioGroupDefaultSize: RadioGroupPropSize = radioGroupSizes[0];

export const radioGroupViews = ['primary', 'ghost'] as const;
export type RadioGroupPropView = typeof radioGroupViews[number];
export const radioGroupDefaultView: RadioGroupPropView = radioGroupViews[0];

type Props<ITEM> = {
  value?: ITEM | null;
  items: ITEM[];
  getLabel: (item: ITEM) => string;
  onChange: (props: { e: React.ChangeEvent<HTMLInputElement>; value: ITEM | null }) => void;
  name: string;
  direction?: RadioGroupDirection;
  size?: RadioGroupPropSize;
  view?: RadioGroupPropView;
  disabled?: boolean;
  className?: string;
};

type RadioGroup = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const RadioGroup: RadioGroup = (props: Props<any>) => {
  const {
    value = null,
    items,
    getLabel,
    onChange,
    name,
    direction = radioGroupDefaultDirection,
    size = radioGroupDefaultSize,
    view = radioGroupDefaultView,
    disabled = false,
    className,
    ...otherProps
  } = props;

  const { getOnChange, getChecked } = useChoiceGroup<
    typeof items[number],
    React.ChangeEvent<HTMLInputElement>
  >({
    value,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  return (
    <div {...otherProps} className={cnRadioGroup({ direction, size, view }, [className])}>
      {items.map((item) => (
        <Radio
          key={getLabel(item)}
          label={getLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
        />
      ))}
    </div>
  );
};
