import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type ChoiceGroupDefaultItem = {
  label: string;
  icon?: IconComponent;
  disabled?: boolean;
  attributes?: Omit<
    JSX.IntrinsicElements['label'],
    'ref' | 'onChange' | 'children'
  >;
  ref?: React.RefObject<HTMLLabelElement>;
};

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
export type ChoiceGroupPropWidth = typeof choiceGroupWidth[number];
export const choiceGroupWidthDefault: ChoiceGroupPropWidth =
  choiceGroupWidth[0];

export type ChoiceGroupPropGetItemLabel<ITEM> = (item: ITEM) => string | number;
export type ChoiceGroupPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type ChoiceGroupPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type ChoiceGroupPropGetItemAttributes<ITEM> = (
  item: ITEM,
) =>
  | Omit<JSX.IntrinsicElements['label'], 'ref' | 'onChange' | 'children'>
  | undefined;
export type ChoiceGroupPropGetItemRef<ITEM> = (
  item: ITEM,
) => React.RefObject<HTMLLabelElement> | undefined;

export type ChoiceGroupPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null;

export type ChoiceGroupPropOnChange<ITEM, MULTIPLE extends boolean> = (props: {
  e: React.ChangeEvent<HTMLInputElement>;
  value: MULTIPLE extends true ? ITEM[] | null : ITEM;
}) => void;

export type ChoiceGroupProps<
  ITEM = ChoiceGroupDefaultItem,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    size?: ChoiceGroupPropSize;
    form?: ChoiceGroupPropForm;
    view?: ChoiceGroupPropView;
    width?: ChoiceGroupPropWidth;
    onlyIcon?: boolean;
    iconSize?: IconPropSize;
    items: ITEM[];
    getItemLabel?: ChoiceGroupPropGetItemLabel<ITEM>;
    getItemIcon?: ChoiceGroupPropGetItemIcon<ITEM>;
    getItemAttributes?: ChoiceGroupPropGetItemAttributes<ITEM>;
    getItemRef?: ChoiceGroupPropGetItemRef<ITEM>;
    name: string;
    disabled?: boolean;
    getItemDisabled?: ChoiceGroupPropGetItemDisabled<ITEM>;
    value?: ChoiceGroupPropValue<ITEM, MULTIPLE>;
    onChange?: ChoiceGroupPropOnChange<ITEM, MULTIPLE>;
    multiple?: MULTIPLE;
    truncate?: boolean;
    children?: never;
  },
  HTMLDivElement
> &
  (ITEM extends { label: ChoiceGroupDefaultItem['label'] }
    ? {}
    : {
        getItemLabel: ChoiceGroupPropGetItemLabel<ITEM>;
      });

export type ChoiceGroupItemProps = {
  icon?: IconComponent;
  onlyIcon?: boolean;
  iconSize?: IconPropSize;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  multiple: boolean;
  disabled?: boolean;
};

export type ChoiceGroupComponent = <ITEM, MULTIPLE extends boolean = false>(
  props: ChoiceGroupProps<ITEM, MULTIPLE>,
) => React.ReactElement | null;
