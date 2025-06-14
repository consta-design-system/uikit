import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const progressLinePropSize = ['m', 's'] as const;
export type ProgressLinePropSize = typeof progressLinePropSize[number];
export const defaultProgressLinePropSize = progressLinePropSize[0];

export type ProgressLineItemDefault = {
  label?: string;
};

export type ProgressLinePropGetItemLabel<ITEM> = (
  item: ITEM,
) => string | undefined;

export type ProgressLineProps<ITEM = ProgressLineItemDefault> =
  PropsWithHTMLAttributesAndRef<
    {
      size?: ProgressLinePropSize;
      value?: number;
      steps?: ITEM[];
      getItemLabel?: ProgressLinePropGetItemLabel<ITEM>;
    },
    HTMLDivElement
  >;

export type ProgressLineComponent = <ITEM>(
  props: ProgressLineProps<ITEM>,
) => React.ReactNode | null;
