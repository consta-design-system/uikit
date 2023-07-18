import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type RadioGroupDefaultItem = {
  key?: string | number;
  label: string;
  disabled?: boolean;
};

export const radioGroupDirections = ['column', 'row'] as const;
export type RadioGroupDirection = typeof radioGroupDirections[number];
export const radioGroupDefaultDirection: RadioGroupDirection =
  radioGroupDirections[0];

export const radioGroupSizes = ['m', 'l', 'xs', 's'] as const;
export type RadioGroupPropSize = typeof radioGroupSizes[number];
export const radioGroupDefaultSize: RadioGroupPropSize = radioGroupSizes[0];

export const radioGroupViews = ['primary', 'ghost'] as const;
export type RadioGroupPropView = typeof radioGroupViews[number];
export const radioGroupDefaultView: RadioGroupPropView = radioGroupViews[0];

export const radioGroupPropAlign = ['center', 'top'] as const;
export type RadioGroupPropAlign = typeof radioGroupPropAlign[number];
export const radioGroupPropAlignDefault: RadioGroupPropAlign =
  radioGroupPropAlign[0];

export type RadioGroupPropGetItemKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type RadioGroupPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type RadioGroupPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;

export type RadioGroupProps<ITEM = RadioGroupDefaultItem> =
  PropsWithHTMLAttributesAndRef<
    {
      align?: RadioGroupPropAlign;
      value?: ITEM | null;
      items: ITEM[];
      getItemKey?: RadioGroupPropGetItemKey<ITEM>;
      getItemLabel?: RadioGroupPropGetItemLabel<ITEM>;
      getItemDisabled?: RadioGroupPropGetItemDisabled<ITEM>;
      onChange: (props: {
        e: React.ChangeEvent<HTMLInputElement>;
        value: ITEM;
      }) => void;
      name?: string;
      direction?: RadioGroupDirection;
      size?: RadioGroupPropSize;
      view?: RadioGroupPropView;
      disabled?: boolean;
      className?: string;
    },
    HTMLDivElement
  > &
    (ITEM extends { label: RadioGroupDefaultItem['label'] }
      ? {}
      : {
          getItemLabel: RadioGroupPropGetItemLabel<ITEM>;
        });

export type RadioGroupComponent = <ITEM = RadioGroupDefaultItem>(
  props: RadioGroupProps<ITEM>,
) => React.ReactElement | null;
