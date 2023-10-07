import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

type CheckboxGroupPropAttributes = Omit<
  JSX.IntrinsicElements['label'],
  'ref' | 'onChange' | 'onFocus' | 'children' | 'onBlur'
>;

export type CheckboxGroupDefaultItem = {
  key?: string | number;
  label: string;
  disabled?: boolean;
  attributes?: CheckboxGroupPropAttributes;
  ref?: React.RefObject<HTMLLabelElement>;
};

export const checkboxGroupDirections = ['column', 'row'] as const;
export type CheckboxGroupDirection = typeof checkboxGroupDirections[number];
export const checkboxGroupDefaultDirection: CheckboxGroupDirection =
  checkboxGroupDirections[0];

export const checkboxGroupSizes = ['m', 'xs', 's', 'l'] as const;
export type CheckboxGroupPropSize = typeof checkboxGroupSizes[number];
export const checkboxGroupDefaultSize: CheckboxGroupPropSize =
  checkboxGroupSizes[0];

export const checkboxGroupViews = ['primary', 'ghost'] as const;
export type CheckboxGroupPropView = typeof checkboxGroupViews[number];
export const checkboxGroupDefaultView: CheckboxGroupPropView =
  checkboxGroupViews[0];

export type CheckboxGroupPropGetItemKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type CheckboxGroupPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type CheckboxGroupPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type CheckboxGroupPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => CheckboxGroupPropAttributes | undefined;
export type CheckboxGroupPropGetItemRef<ITEM> = (
  item: ITEM,
) => React.RefObject<HTMLLabelElement> | undefined;

export type CheckboxGroupPropOnChange<ITEM> = (
  value: ITEM[] | null,
  props: {
    e: React.ChangeEvent<HTMLInputElement>;
    value: ITEM[] | null;
  },
) => void;

export type CheckboxGroupProps<ITEM = CheckboxGroupDefaultItem> =
  PropsWithHTMLAttributesAndRef<
    {
      value?: ITEM[] | null;
      items: ITEM[];
      getItemKey?: CheckboxGroupPropGetItemKey<ITEM>;
      getItemLabel?: CheckboxGroupPropGetItemLabel<ITEM>;
      getItemDisabled?: CheckboxGroupPropGetItemDisabled<ITEM>;
      getItemAttributes?: CheckboxGroupPropGetItemAttributes<ITEM>;
      getItemRef?: CheckboxGroupPropGetItemRef<ITEM>;
      onChange?: CheckboxGroupPropOnChange<ITEM>;
      name?: string;
      direction?: CheckboxGroupDirection;
      size?: CheckboxGroupPropSize;
      view?: CheckboxGroupPropView;
      disabled?: boolean;
      className?: string;
    },
    HTMLDivElement
  > &
    (ITEM extends { label: CheckboxGroupDefaultItem['label'] }
      ? {}
      : {
          getItemLabel: CheckboxGroupPropGetItemLabel<ITEM>;
        });

export type CheckboxGroupComponent = <ITEM = CheckboxGroupDefaultItem>(
  props: CheckboxGroupProps<ITEM>,
) => React.ReactElement | null;
