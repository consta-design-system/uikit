import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const spolierPropSize = ['m', 'xs', 's', 'l'] as const;
export type SpoilerPropSize = typeof spolierPropSize[number];
export const defaultSpoilerPropSize = spolierPropSize[0];

export type SpoilerModeProp = 'dots' | 'blur';

export type SpoilerButtonProps = {
  size?: SpoilerPropSize;
  lessLabel?: string;
  lessIcon?: IconComponent;
  moreLabel?: string;
  moreIcon?: IconComponent;
  open?: boolean;
};

export type SpoilerProps = Omit<
  PropsWithHTMLAttributes<
    {
      size?: SpoilerPropSize;
      lessLabel?: string;
      lessIcon?: IconComponent;
      moreLabel?: string;
      moreIcon?: IconComponent;
    },
    HTMLDivElement
  >,
  'children'
> &
  (
    | {
        preview: React.ReactNode;
        fullText: React.ReactNode;
        maxHeight?: never;
        children?: never;
      }
    | {
        preview?: never;
        fullText?: never;
        children: React.ReactNode;
        maxHeight?: number;
      }
  );
