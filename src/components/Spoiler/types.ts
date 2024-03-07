import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { Space } from '##/mixs/MixSpace';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const spolierPropSize = ['xs', 's', 'm', 'l'] as const;
export type SpoilerPropSize = typeof spolierPropSize[number];
export const defaultSpoilerPropSize = 'm';

export const spolierPropButtonAlign = ['left', 'center', 'right'] as const;
export type SpoilerPropButtonAlign = typeof spolierPropButtonAlign[number];
export const defaultSpoilerPropButtonAlign = spolierPropButtonAlign[0];

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
      buttonIndent?: Space;
      buttonAlign?: SpoilerPropButtonAlign;
      opened?: boolean;
      onOpenButtonClick?: (open: boolean, event: React.MouseEvent) => void;
    },
    HTMLDivElement
  >,
  'children'
> &
  (
    | {
        preview: React.ReactNode;
        content: React.ReactNode;
        maxHeight?: never;
        children?: never;
        lineClamp?: never;
      }
    | {
        preview?: never;
        content?: never;
        children: React.ReactNode;
        maxHeight: number;
        lineClamp?: never;
      }
    | {
        preview?: never;
        content?: never;
        children: React.ReactNode;
        maxHeight?: never;
        lineClamp: number;
      }
  );

export type SpoilerMode = 'lineClamp' | 'blur' | 'toggle';
