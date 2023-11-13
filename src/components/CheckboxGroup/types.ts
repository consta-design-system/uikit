import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

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

export const checkboxGroupPropDirections = ['column', 'row'] as const;
export type CheckboxGroupPropDirection =
  typeof checkboxGroupPropDirections[number];
export const checkboxGroupDefaultDirection: CheckboxGroupPropDirection =
  checkboxGroupPropDirections[0];

export const checkboxGroupPropSizes = ['m', 'xs', 's', 'l'] as const;
export type CheckboxGroupPropSize = typeof checkboxGroupPropSizes[number];
export const checkboxGroupDefaultSize: CheckboxGroupPropSize =
  checkboxGroupPropSizes[0];

export const checkboxGroupPropViews = ['primary', 'ghost'] as const;
export type CheckboxGroupPropView = typeof checkboxGroupPropViews[number];
export const checkboxGroupDefaultView: CheckboxGroupPropView =
  checkboxGroupPropViews[0];

export const checkboxGroupPropAlign = ['center', 'top'] as const;
export type CheckboxGroupPropAlign = typeof checkboxGroupPropAlign[number];
export const checkboxGroupDefaultAlign: CheckboxGroupPropAlign =
  checkboxGroupPropAlign[0];

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
      onChange: (props: {
        e: React.ChangeEvent<HTMLInputElement>;
        value: ITEM[] | null;
      }) => void;
      name?: string;
      direction?: CheckboxGroupPropDirection;
      align?: CheckboxGroupPropAlign;
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
