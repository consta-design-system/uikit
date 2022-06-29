import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const progressLinePropSize = ['m', 's'] as const;
export type PropgressLinePropSize = typeof progressLinePropSize[number];
export const defaultProgressLinePropSize = progressLinePropSize[0];

export type ProgressLineProps = PropsWithHTMLAttributesAndRef<
  {
    size?: PropgressLinePropSize;
    value?: number;
  },
  HTMLDivElement
>;

export type ProgressLineComponent = (props: ProgressLineProps) => React.ReactElement | null;
