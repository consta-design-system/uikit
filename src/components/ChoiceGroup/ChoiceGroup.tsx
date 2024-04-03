import './ChoiceGroup.css';

import { IconPropSize } from '@consta/icons/Icon';
import React, { forwardRef } from 'react';

import { useChoiceGroup } from '##/hooks/useChoiceGroup';
import { cn } from '##/utils/bem';
import { getByMap } from '##/utils/getByMap';

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
    getItemAttributes,
    getItemRef,
    getItemDisabled,
    name,
    className,
    disabled = false,
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
      {items.map((item, index) => {
        const itemChecked = getChecked(item);
        const itemDisabled = !!getItemDisabled && getItemDisabled(item);
        const attributes = getItemAttributes(item) ?? {};
        const label = getItemLabel(item).toString();

        return (
          <React.Fragment key={label}>
            {index > 0 && (
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
              label={label}
              icon={getItemIcon && getItemIcon(item)}
              iconSize={iconSize}
              multiple={multiple}
              onlyIcon={onlyIcon}
              ref={getItemRef(item)}
              name={name}
              disabled={disabled || itemDisabled}
              title={onlyIcon || truncate ? label : undefined}
              {...attributes}
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
