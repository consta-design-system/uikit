import './MixDropdownAnimate.css';

import { cn } from '../../utils/bem';
import { cnForCssTransition } from '../../utils/cnForCssTransition';

export const cnMixDropdownAnimate = cn('MixDropdownAnimate');
export const cnMixDropdownAnimateForCssTransition = cnForCssTransition(cnMixDropdownAnimate);
export const animateTimeout = 200;
