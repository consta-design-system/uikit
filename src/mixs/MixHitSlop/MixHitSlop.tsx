import './MixHitSlop.css';

import { cn } from '##/utils/bem';

type CnMixHitSlop = (props: {
  mode: 'before' | 'after' | 'reverseMargin';
}) => string;

export const cnMixHitSlop = cn('MixHitSlop') as CnMixHitSlop;
