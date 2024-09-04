import './MixScrollBar.css';

import { cn } from '##/utils/bem';

const cnScrollBar = cn('MixScrollBar');

export const mixScrollBarPropSize = ['m', 'xs', 's'] as const;
export type MixScrollBarPropSize = typeof mixScrollBarPropSize[number];
export const mixScrollBarPropSizeDefault: MixScrollBarPropSize =
  mixScrollBarPropSize[0];

export const mixScrollBarPropTrackSize = ['auto', 'native'] as const;
export type MixScrollBarPropTrackSize =
  typeof mixScrollBarPropTrackSize[number];
export const mixScrollBarPropTrackSizeDefault: MixScrollBarPropTrackSize =
  mixScrollBarPropTrackSize[0];

type MixScrollBarProps = {
  size?: MixScrollBarPropSize;
  invisible?: boolean;
  trackSize?: MixScrollBarPropTrackSize;
};

type CnMixScrollBar = (props?: MixScrollBarProps) => string;

export const cnMixScrollBar: CnMixScrollBar = (props) => {
  const {
    size = mixScrollBarPropSizeDefault,
    invisible,
    trackSize = mixScrollBarPropTrackSizeDefault,
  } = props ?? {};
  return cnScrollBar({ size, invisible, trackSize });
};
