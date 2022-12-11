import './ChoiceGroup.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { getByMap } from '../../utils/getByMap';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { ChoiceGroupItem } from './Item/ChoiceGroup-Item';

export const choiceGroupForms = ['default', 'brick', 'round'] as const;
export type ChoiceGroupPropForm = typeof choiceGroupForms[number];
export const choiceGroupDefaultForm: ChoiceGroupPropForm = 'default';

export const choiceGroupSizes = ['xs', 's', 'm', 'l'] as const;
export type ChoiceGroupPropSize = typeof choiceGroupSizes[number];
export const choiceGroupDefaultSize: ChoiceGroupPropSize = 'm';

export const choiceGroupViews = ['primary', 'ghost', 'secondary'] as const;
export type ChoiceGroupPropView = typeof choiceGroupViews[number];
export const choiceGroupDefaultView: ChoiceGroupPropView = 'primary';

export const choiceGroupWidth = ['default', 'full'] as const;
export type СhoiceGroupPropWidth = typeof choiceGroupWidth[number];
export const choiceGroupWidthDefault: СhoiceGroupPropWidth =
  choiceGroupWidth[0];

export type ChoiceGroupPropGetLabel<ITEM> = (item: ITEM) => string | number;
export type ChoiceGroupPropGetIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;

export type ChoiceGroupPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null;

export type ChoiceGroupPropOnChange<ITEM, MULTIPLE extends boolean> = (props: {
  e: React.ChangeEvent<HTMLInputElement>;
  value: MULTIPLE extends true ? ITEM[] | null : ITEM;
}) => void;

type Props<
  ITEM,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    size?: ChoiceGroupPropSize;
    form?: ChoiceGroupPropForm;
    view?: ChoiceGroupPropView;
    width?: СhoiceGroupPropWidth;
    onlyIcon?: boolean;
    iconSize?: IconPropSize;
    items: ITEM[];
    getLabel: ChoiceGroupPropGetLabel<ITEM>;
    getIcon?: ChoiceGroupPropGetIcon<ITEM>;
    name: string;
    disabled?: boolean;
    getDisabled?: (item: ITEM) => boolean | undefined;
    value?: ChoiceGroupPropValue<ITEM, MULTIPLE>;
    onChange?: ChoiceGroupPropOnChange<ITEM, MULTIPLE>;
    multiple?: MULTIPLE;
    truncate?: boolean;
    children?: never;
  },
  HTMLDivElement
>;

type ChoiceGroupComponent = <ITEM, MULTIPLE extends boolean = false>(
  props: Props<ITEM, MULTIPLE>,
) => React.ReactElement | null;

const sizeMap: Record<ChoiceGroupPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 'm',
};

export const cnChoiceGroup = cn('ChoiceGroup');

export const ChoiceGroup: ChoiceGroupComponent = React.forwardRef(
  (props, ref) => {
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
    } = props;

    type Item = typeof items[number];

    const { getOnChange, getChecked } = useChoiceGroup<
      Item,
      React.ChangeEvent<HTMLInputElement>
    >({
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
        className={cnChoiceGroup(
          { size, form, view, width, onlyIcon, disabled, truncate },
          [className],
        )}
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
  },
);
