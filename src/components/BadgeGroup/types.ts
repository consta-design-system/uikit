import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import {
  BadgePropForm,
  BadgePropSize,
  BadgePropStatus,
  BadgePropView,
} from '##/components/Badge';
import { AsAttributes, AsTags } from '##/utils/types/AsTags';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type BadgeGroupDefaultItem = {
  key: string | number;
  status?: BadgePropStatus;
  view?: BadgePropView;
  label?: string;
  iconLeft?: IconComponent;
  iconRight?: IconComponent;
  as?: AsTags;
  ref?: React.RefObject<HTMLElement>;
  attributes?: Omit<AsAttributes, 'children' | 'ref'>;
};

export type BadgeGroupPropGetItemKey<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['key'];
export type BadgeGroupPropGetItemStatus<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['status'];
export type BadgeGroupPropGetItemView<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['view'];
export type BadgeGroupPropGetItemLabel<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['label'];
export type BadgeGroupPropGetItemIconLeft<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['iconLeft'];
export type BadgeGroupPropGetItemIconRight<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['iconRight'];
export type BadgeGroupPropGetItemRef<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['ref'];
export type BadgeGroupPropGetItemAs<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['as'];
export type BadgeGroupPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => BadgeGroupDefaultItem['attributes'];

export type BadgeGroupProps<ITEM = BadgeGroupDefaultItem> =
  PropsWithHTMLAttributesAndRef<
    {
      items: ITEM[];
      fitMode?: 'reduction' | 'wrap';
      getItemKey?: BadgeGroupPropGetItemKey<ITEM>;
      getItemLabel?: BadgeGroupPropGetItemLabel<ITEM>;
      /**
       * "error" deprecated since version 5.13.0 use "alert"
       */
      getItemStatus?: BadgeGroupPropGetItemStatus<ITEM>;
      getItemView?: BadgeGroupPropGetItemView<ITEM>;
      getItemIconLeft?: BadgeGroupPropGetItemIconLeft<ITEM>;
      getItemIconRight?: BadgeGroupPropGetItemIconRight<ITEM>;
      getItemRef?: BadgeGroupPropGetItemRef<ITEM>;
      getItemAs?: BadgeGroupPropGetItemAs<ITEM>;
      getItemAttributes?: BadgeGroupPropGetItemAttributes<ITEM>;
      form?: BadgePropForm;
      size?: BadgePropSize;
      minified?: boolean;
      moreRef?: React.RefObject<HTMLDivElement>;
      moreAttributes?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
    },
    HTMLDivElement
  > &
    (ITEM extends { key: string | number }
      ? {}
      : {
          getItemKey: BadgeGroupPropGetItemKey<ITEM>;
        });

export type BadgeGroupComponent = <ITEM = BadgeGroupDefaultItem>(
  props: BadgeGroupProps<ITEM>,
) => React.ReactElement | null;
