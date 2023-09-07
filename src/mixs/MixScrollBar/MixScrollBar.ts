import './MixScrollBar.css';

import { cn } from '##/utils/bem';

const cnScrollBar = cn('MixScrollBar');

const mixScrollBarPropSize = ['xs', '3xs', '2xs', 's', 'm'] as const;
type MixScrollBarPropSize = typeof mixScrollBarPropSize[number];
const mixScrollBarPropSizeDefault: MixScrollBarPropSize =
  mixScrollBarPropSize[0];

type MixScrollBarProps = {
  size?: MixScrollBarPropSize;
};

type CnMixScrollBar = (props?: MixScrollBarProps) => string;

export const cnMixScrollBar: CnMixScrollBar = (props) => {
  const { size = mixScrollBarPropSizeDefault } = props ?? {};
  return cnScrollBar({ size });
};
