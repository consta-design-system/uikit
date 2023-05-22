import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type CheckboxGroupDefaultItem = {
  key?: string | number;
  label: string;
  disabled?: boolean;
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

export type CheckboxGroupProps<ITEM = CheckboxGroupDefaultItem> =
  PropsWithHTMLAttributesAndRef<
    {
      value?: ITEM[] | null;
      items: ITEM[];
      getItemKey?: CheckboxGroupPropGetItemKey<ITEM>;
      getItemLabel?: CheckboxGroupPropGetItemLabel<ITEM>;
      getItemDisabled?: CheckboxGroupPropGetItemDisabled<ITEM>;
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
