import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { AsAttributes, AsTags } from '##/utils/types/AsTags';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';
import {
  PropsWithHTMLAttributes,
  PropsWithHTMLAttributesAndRef,
} from '##/utils/types/PropsWithHTMLAttributes';

export const paginationPropForm = ['default', 'brick', 'round'] as const;
export type PaginationPropForm = typeof paginationPropForm[number];
export const paginationPropFormDefault: PaginationPropForm =
  paginationPropForm[0];

export const paginationPropSize = ['m', 'xs', 's', 'l'] as const;
export type PaginationPropSize = typeof paginationPropSize[number];
export const paginationPropSizeDefault: PaginationPropSize =
  paginationPropSize[0];

export const paginationPropType = ['default', 'input'] as const;
export type PaginationPropType = typeof paginationPropType[number];
export const paginationPropTypeDefault: PaginationPropType =
  paginationPropType[0];

export type PaginationArrowTypes = 'first' | 'previous' | 'next' | 'last';

export type PaginationPropHotKey = { label: string; keys: string[] };

export type PaginationPropOnItemClick<ITEM> = (
  item: ITEM,
  params: { e: React.MouseEvent },
) => void;

export type PaginationPropOnChange<ITEM> = (
  value: ITEM,
  params: { e: React.MouseEvent | Event | React.KeyboardEvent },
) => void;

// ARROWS

export type PaginationPropArrow =
  | boolean
  | IconComponent
  | {
      label?: string;
      icon?: IconComponent;
    };

export type PaginationBasePropArrow =
  | false
  | {
      label?: string;
      disabled?: boolean;
      icon?: IconComponent;
      onClick?: React.MouseEventHandler;
    };

type PaginationArrowsProps = {
  outerMostArrows?: [PaginationPropArrow?, PaginationPropArrow?];
} & (
  | {
      arrows: [PaginationPropArrow?, PaginationPropArrow?];
      hotKeys?: [PaginationPropHotKey?, PaginationPropHotKey?];
    }
  | {
      arrows?: never;
      hotKeys?: never;
    }
);

type PaginationBaseArrowsProps = {
  outerMostArrows?: [PaginationBasePropArrow?, PaginationBasePropArrow?];
} & (
  | {
      arrows: [PaginationBasePropArrow?, PaginationBasePropArrow?];
      hotKeys?: [PaginationPropHotKey?, PaginationPropHotKey?];
    }
  | {
      arrows?: never;
      hotKeys?: never;
    }
);

type Props<ITEM> = {
  form?: PaginationPropForm;
  size?: PaginationPropSize;
  containerEventListener?: HTMLElement | Window;
  value?: ITEM;
  items?: ITEM extends number ? number : ITEM[];
  onChange?: PaginationPropOnChange<ITEM>;
};

export type PaginationProps<TYPE extends PaginationPropType> =
  PropsWithHTMLAttributes<
    {
      type?: TYPE;
      showFirstPage?: boolean;
      showLastPage?: boolean;
      visibleCount?: number;
    } & Props<number>,
    HTMLDivElement
  > &
    PaginationArrowsProps &
    (TYPE extends 'input'
      ? { getTotalLabel?: (pages: number) => string | number }
      : {
          getTotalLabel?: never;
        });

export type PaginationComponent = <TYPE extends PaginationPropType>(
  props: PaginationProps<TYPE>,
) => React.ReactElement | null;

export type PaginationItem = {
  key: number;
  label: string;
  active?: boolean;
  clickable?: boolean;
  page: number;
};

export type PaginationBaseItemDefault = {
  key: string | number;
  label?: string;
  as?: AsTags;
  ref?: React.RefObject<HTMLElement>;
  clickable?: boolean;
  attributes?: AsAttributes;
  onClick?: React.MouseEventHandler;
};

export type PaginationPropGetItemKey<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['key'];
export type PaginationPropGetItemLabel<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['label'];
export type PaginationPropGetItemClickable<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['clickable'];
export type PaginationPropGetItemAs<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['as'];
export type PaginationPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['attributes'];
export type PaginationPropGetItemRef<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['ref'];
export type PaginationPropGetItemOnClick<ITEM> = (
  item: ITEM,
) => PaginationBaseItemDefault['onClick'];

type Mappers<ITEM = PaginationBaseItemDefault> = {
  getItemLabel?: PaginationPropGetItemLabel<ITEM>;
  getItemKey?: PaginationPropGetItemKey<ITEM>;
  getItemAs?: PaginationPropGetItemAs<ITEM>;
  getItemAttributes?: PaginationPropGetItemAttributes<ITEM>;
  getItemRef?: PaginationPropGetItemRef<ITEM>;
  getItemClickable?: PaginationPropGetItemClickable<ITEM>;
  getItemOnClick?: PaginationPropGetItemOnClick<ITEM>;
};

export type PaginationBaseProps<ITEM = PaginationBaseItemDefault> =
  PropsWithHTMLAttributes<
    Mappers<ITEM> &
      Props<ITEM> &
      PaginationBaseArrowsProps &
      (ITEM extends { key: PaginationBaseItemDefault['key'] }
        ? {}
        : {
            getItemKey: PaginationPropGetItemKey<ITEM>;
          }),
    HTMLDivElement
  >;

export type PaginationBaseComponent = <ITEM = PaginationBaseItemDefault>(
  props: PaginationBaseProps<ITEM>,
) => React.ReactElement | null;

export type PaginationArrowProps = PropsWithHTMLAttributes<
  {
    icon?: IconComponent;
    form?: PaginationPropForm;
    size?: PaginationPropSize;
    disabled?: boolean;
    orientation?: 'start' | 'end';
    label?: string;
    caption?: string;
  },
  HTMLButtonElement
>;

export type PaginationItemProps<AS extends AsTags = 'button'> =
  PropsWithAsAttributes<
    {
      form?: PaginationPropForm;
      size?: PaginationPropSize;
      label?: string;
      active?: boolean;
      clickable?: boolean;
    },
    AS
  >;

export type PaginationItemComponent = <AS extends AsTags = 'button'>(
  props: PaginationItemProps<AS>,
) => React.ReactElement | null;

export type PaginationNumberInputProps = PropsWithHTMLAttributes<
  {
    value?: number;
    onChange?: PaginationPropOnChange<number>;
    form?: PaginationPropForm;
    size?: PaginationPropSize;
    total: number;
    getTotalLabel?: (pages: number) => string | number;
  },
  HTMLDivElement
>;

export type PaginationListProps<ITEM> = PropsWithHTMLAttributesAndRef<
  {
    form?: PaginationPropForm;
    size?: PaginationPropSize;
    items: ITEM[];
    value?: ITEM;
    onItemClick?: PaginationPropOnItemClick<ITEM>;
  },
  HTMLDivElement
> &
  Mappers<ITEM> &
  (ITEM extends { label: string }
    ? {}
    : {
        getItemKey: PaginationPropGetItemKey<ITEM>;
      });

export type PaginationListComponent = <ITEM extends PaginationBaseItemDefault>(
  props: PaginationListProps<ITEM>,
) => React.ReactElement | null;
