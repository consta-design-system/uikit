import './ChoiceGroup.css';

import { IconPropSize } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { withDefaultGetters } from './helper';
import { ChoiceGroupItem } from './Item/ChoiceGroup-Item';
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

const ChoiceGroupRender = (
  props: ChoiceGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => {
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
    getItemLabel,
    onChange,
    getItemIcon,
    name,
    className,
    disabled = false,
    getItemDisabled,
    truncate,
    ...otherProps
  } = withDefaultGetters(props);

  type Item = typeof items[number];

  const { getOnChange, getChecked } = useChoiceGroup<
    Item,
    React.ChangeEvent<HTMLInputElement>
  >({
    value: value as Item,
    getKey: getItemLabel,
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
      className={cnChoiceGroup(
        { size, form, view, width, onlyIcon, disabled, truncate },
        [className],
      )}
    >
      {items.map((item, idx) => {
        const itemChecked = getChecked(item);
        const itemDisabled = !!getItemDisabled && getItemDisabled(item);
        return (
          <React.Fragment key={getItemLabel(item)}>
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
              label={getItemLabel(item).toString()}
              icon={getItemIcon && getItemIcon(item)}
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
};

export const ChoiceGroup = forwardRef(
  ChoiceGroupRender,
) as ChoiceGroupComponent;

export * from './types';
