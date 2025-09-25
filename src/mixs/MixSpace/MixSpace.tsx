import './MixSpace.css';

import { cn } from '##/utils/bem';

import { MixSpaceProps } from './types';

type CnMixSpace = (props?: MixSpaceProps) => string;

const cnSpace = cn('MixSpace');

export const cnMixSpace: CnMixSpace = (props) => {
  if (!props) return '';
  const { p, m, pV, pH, mV, mH, mT, mL, mR, mB, pT, pL, pR, pB } = props;
  return cnSpace({
    pT: pT || pV || p,
    pL: pL || pH || p,
    pR: pR || pH || p,
    pB: pB || pV || p,
    mT: mT || mV || m,
    mL: mL || mH || m,
    mR: mR || mH || m,
    mB: mB || mV || m,
  });
};
