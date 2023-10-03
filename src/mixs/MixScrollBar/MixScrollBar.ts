import './MixScrollBar.css';

import { cn } from '##/utils/bem';

const cnScrollBar = cn('MixScrollBar');

export const mixScrollBarPropSize = ['m', 'xs', 's'] as const;
export type MixScrollBarPropSize = typeof mixScrollBarPropSize[number];
export const mixScrollBarPropSizeDefault: MixScrollBarPropSize =
  mixScrollBarPropSize[0];

type MixScrollBarProps = {
  size?: MixScrollBarPropSize;
  invisible?: boolean;
};

type CnMixScrollBar = (props?: MixScrollBarProps) => string;

export const cnMixScrollBar: CnMixScrollBar = (props) => {
  const { size = mixScrollBarPropSizeDefault, invisible } = props ?? {};
  return cnScrollBar({ size, invisible });
};
