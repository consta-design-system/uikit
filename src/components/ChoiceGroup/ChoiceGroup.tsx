import './ChoiceGroup.css';

import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';

import { ChoiceGroupItem } from './Item/ChoiceGroup-Item';
import { withDefaultGetters } from './helper';
import {
  ChoiceGroupComponent,
  choiceGroupDefaultForm,
  choiceGroupDefaultSize,
  choiceGroupDefaultView,
  ChoiceGroupPropOnChange,
  ChoiceGroupProps,
  ChoiceGroupPropSize,
  choiceGroupWidthDefault,
} from './types';

const sizeMap: Record<ChoiceGroupPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export const cnChoiceGroup = cn('ChoiceGroup');

function ChoiceGroupRender(props: ChoiceGroupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    size = choiceGroupDefaultSize,
    form = choiceGroupDefaultForm,
    view = choiceGroupDefaultView,
    width = choiceGroupWidthDefault,
    onlyIcon,
    iconSize: iconSizeProp,
    value = null,
    multiple = false,
    items,
    getLabel,
    onChange,
    getIcon,
    name,
    className,
    disabled = false,
    getDisabled,
    truncate,
    ...otherProps
  } = withDefaultGetters(props);

  type Item = typeof items[number];

  const { getOnChange, getChecked } = useChoiceGroup<Item, React.ChangeEvent<HTMLInputElement>>({
    value: value as Item,
    getKey: getLabel,
    callBack: onChange as ChoiceGroupPropOnChange<Item, false>,
    multiple: multiple as false,
    // привел к типам из-за того что
    // TS не понимает что параметры для не Multiple и Multiple не могут прийти одновременно
  });

  const iconSize = getByMap(sizeMap, size, iconSizeProp);

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnChoiceGroup({ size, form, view, width, onlyIcon, disabled, truncate }, [
        className,
      ])}
    >
      {items.map((item, idx) => {
        const itemChecked = getChecked(item);
        const itemDisabled = !!getDisabled && getDisabled(item);
        return (
          <React.Fragment key={getLabel(item)}>
            {idx > 0 && (
              <div
                className={cnChoiceGroup('Divider', {
                  checked: itemChecked,
                  disabled: itemDisabled,
                })}
              />
            )}
            <ChoiceGroupItem
              onChange={getOnChange(item)}
              checked={itemChecked}
              label={getLabel(item).toString()}
              icon={getIcon && getIcon(item)}
              iconSize={iconSize}
              multiple={multiple}
              onlyIcon={onlyIcon}
              name={name}
              disabled={disabled || itemDisabled}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export const ChoiceGroup = forwardRef(ChoiceGroupRender) as ChoiceGroupComponent;

export * from './types';
