import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export const bookmarkTabsPropSize = ['m', 's'] as const;
export type BookmarkTabsPropSize = typeof bookmarkTabsPropSize[number];
export const bookmarkTabsPropSizeDefault: BookmarkTabsPropSize =
  bookmarkTabsPropSize[0];

export const bookmarkTabsPropForm = ['brick', 'round'] as const;
export type BookmarkTabsPropForm = typeof bookmarkTabsPropForm[number];
export const bookmarkTabsPropFormDefault: BookmarkTabsPropForm =
  bookmarkTabsPropForm[0];

export const bookmarkTabsPropView = ['ghost', 'clear'] as const;
export type BookmarkTabsPropView = typeof bookmarkTabsPropView[number];
export const bookmarkTabsPropViewDefault: BookmarkTabsPropView =
  bookmarkTabsPropView[0];

export type BookmarkTabsItemDefault = {
  key: string | number;
  label?: string | number;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  fixed?: boolean;
  as?: keyof JSX.IntrinsicElements;
  ref?: React.RefObject<HTMLElement>;
  attributes?: JSX.IntrinsicElements[keyof JSX.IntrinsicElements];
};

export type BookmarkTabsPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type BookmarkTabsPropGetItemLabel<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type BookmarkTabsPropGetItemLeftIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type BookmarkTabsPropGetItemRightIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type BookmarkTabsPropGetItemFixed<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type BookmarkTabsPropGetItemAs<ITEM> = (
  item: ITEM,
) => keyof JSX.IntrinsicElements | undefined;
export type BookmarkTabsPropGetItemRef<ITEM> = (
  item: ITEM,
) => React.RefObject<HTMLElement> | undefined;
export type BookmarkTabsPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => JSX.IntrinsicElements[keyof JSX.IntrinsicElements] | undefined;

export type BookmarkTabsPropOnChange<ITEM> = (
  value: ITEM,
  params: {
    e: React.MouseEvent;
    id?: string;
  },
) => void;

export type BookmarkTabsRenderItemProps<ITEM> = {
  item: ITEM;
  onClick: React.MouseEventHandler;
  active?: boolean;
  onClose?: React.MouseEventHandler;
  size: BookmarkTabsPropSize;
  form: BookmarkTabsPropForm;
  view: BookmarkTabsPropView;
  bordered?: boolean;
  tabWidth?: string;
  tabRef?: React.RefObject<HTMLElement>;
  controlRef?: React.RefObject<HTMLElement>;
} & Omit<BookmarkTabsItemDefault, 'key' | 'ref'>;

export type BookmarkTabsPropRenderItem<ITEM> = (
  props: BookmarkTabsRenderItemProps<ITEM>,
) => React.ReactElement | null;

export type BookmarkTabsProps<ITEM = BookmarkTabsItemDefault> =
  PropsWithHTMLAttributesAndRef<
    {
      size?: BookmarkTabsPropSize;
      form?: BookmarkTabsPropForm;
      view?: BookmarkTabsPropView;
      items: ITEM[];
      value?: ITEM | null;
      getItemKey?: BookmarkTabsPropGetItemKey<ITEM>;
      getItemLabel?: BookmarkTabsPropGetItemLabel<ITEM>;
      getItemLeftIcon?: BookmarkTabsPropGetItemLeftIcon<ITEM>;
      getItemRightIcon?: BookmarkTabsPropGetItemRightIcon<ITEM>;
      getItemFixed?: BookmarkTabsPropGetItemFixed<ITEM>;
      getItemAs?: BookmarkTabsPropGetItemAs<ITEM>;
      getItemRef?: BookmarkTabsPropGetItemRef<ITEM>;
      getItemAttributes?: BookmarkTabsPropGetItemAttributes<ITEM>;
      children?: never;
      withNavigationButtons?: boolean;
      onCreate?: React.MouseEventHandler;
      onRemove?: (item: ITEM, params: { e: React.MouseEvent }) => void;
      onChange?: BookmarkTabsPropOnChange<ITEM>;
      renderItem?: BookmarkTabsPropRenderItem<ITEM>;
    },
    HTMLDivElement
  > &
    (ITEM extends { key: string | number }
      ? {}
      : {
          getItemKey: BookmarkTabsPropGetItemKey<ITEM>;
        });

export type BookmarkTabsComponent = <ITEM>(
  props: BookmarkTabsProps<ITEM>,
) => React.ReactElement | null;

export type BookmarkTabsTabProps<
  AS extends keyof JSX.IntrinsicElements = 'button',
> = PropsWithAsAttributes<
  {
    size: BookmarkTabsPropSize;
    form: BookmarkTabsPropForm;
    view: BookmarkTabsPropView;
    active?: boolean;
    tabWidth?: string;
    bordered?: boolean;
    tabRef?: React.RefObject<HTMLElement>;
    controlRef?: React.RefObject<HTMLElement>;
    fixed?: boolean;
    onClose?: React.MouseEventHandler;
  },
  AS
> &
  Omit<BookmarkTabsItemDefault, 'key' | 'attributes' | 'ref'>;

export type BookmarkTabsTabComponent = <
  AS extends keyof JSX.IntrinsicElements = 'button',
>(
  props: BookmarkTabsTabProps<AS>,
) => React.ReactElement | null;
