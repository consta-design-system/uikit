import './MixPopoverAnimate.css';

import { Direction } from '../../components/Popover/Popover';
import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';

export type Animate =
  | 'entered'
  | 'entering'
  | 'exiting'
  | 'exited'
  | 'unmounted'
  | 'enter'
  | 'enterActive'
  | 'enterDone'
  | 'exit'
  | 'exitActive'
  | 'exitDone';

type Mods = {
  animate?: Animate;
  direction?: Direction;
};

type CnMixPopoverAnimate = (
  mods?: Mods | null,
  mix?: Array<string | undefined>,
) => string;

const cnFn = cn('MixPopoverAnimate');

export const cnMixPopoverAnimate: CnMixPopoverAnimate = cnFn;
export const cnMixPopoverAnimateForCssTransition = cnForCssTransition(cnFn);

export const animateTimeout = 200;
