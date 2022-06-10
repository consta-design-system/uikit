import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const progressLinePropSize = ['m', 's'] as const;
export type PropgressLinePropSize = typeof progressLinePropSize[number];
export const defaultProgressLinePropSize = progressLinePropSize[0];

export const progressLinePropMode = ['determinate', 'indeterminate'] as const;
export type PropgressLinePropMode = typeof progressLinePropMode[number];
export const defaultProgressLinePropMode = progressLinePropMode[0];

export type ProgressLineProps<MODE extends PropgressLinePropMode> = PropsWithHTMLAttributesAndRef<
  {
    size?: PropgressLinePropSize;
    mode?: MODE;
    progress?: number;
  },
  HTMLDivElement
> &
  (MODE extends 'determinate'
    ? {
        progress?: number;
      }
    : {
        progress?: never;
      });

export type ProgressLineComponent = <MODE extends PropgressLinePropMode>(
  props: ProgressLineProps<MODE>,
) => React.ReactElement | null;
