import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const avatarGroupPropSize = ['m', 's', 'xs', 'l'] as const;
export type AvatarGroupPropSize = typeof avatarGroupPropSize[number];
export const avatarGroupPropSizeDefault: AvatarGroupPropSize = avatarGroupPropSize[0];

export const avatarGroupPropForm = ['round', 'brick', 'default'] as const;
export type AvatarGroupPropForm = typeof avatarGroupPropForm[number];
export const avatarGroupPropFormDefault: AvatarGroupPropForm = avatarGroupPropForm[0];

export type AvatarGroupDegaultItem = {
  url?: string;
  name?: string;
};

export type AvatarGroupPropGetItemUrl<ITEM> = (item: ITEM) => string | undefined;
export type AvatarGroupPropGetItemName<ITEM> = (item: ITEM) => string | undefined;

export type AvatarGroupProps<ITEM = AvatarGroupDegaultItem> = PropsWithHTMLAttributesAndRef<
  {
    children?: never;
    items?: ITEM[];
    visibleCount?: number;
    getItemUrl?: AvatarGroupPropGetItemUrl<ITEM>;
    getItemName?: AvatarGroupPropGetItemName<ITEM>;
    size?: AvatarGroupPropSize;
    form?: AvatarGroupPropForm;
  },
  HTMLDivElement
>;

export type AvatarGroupComponent = <ITEM = AvatarGroupDegaultItem>(
  props: AvatarGroupProps<ITEM>,
) => React.ReactElement | null;
