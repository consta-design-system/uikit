import { IconComponent } from '@consta/icons/Icon';

export const spolierPropSize = ['m', 'xs', 's', 'l'] as const;
export type SpoilerPropSize = typeof spolierPropSize[number];
export const defaultSpoilerPropSize = spolierPropSize[0];

export type SpoilerProps = {
  size?: SpoilerPropSize;
  lessLabel?: string;
  lessIcon?: IconComponent;
  moreLabel?: string;
  moreIcon?: IconComponent;
  type?: 'more' | 'less';
  mode?: 'inner' | 'external';
};
