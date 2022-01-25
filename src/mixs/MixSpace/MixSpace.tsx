import './MixSpace.css';

import { cn } from '../../utils/bem';

type PropSpace =
  | 0
  | 'auto'
  | 'm'
  | '3xs'
  | '2xs'
  | 'xs'
  | 's'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

type Props = {
  p?: PropSpace;
  m?: PropSpace;
  pV?: PropSpace;
  pH?: PropSpace;
  mV?: PropSpace;
  mH?: PropSpace;
  mT?: PropSpace;
  mL?: PropSpace;
  mR?: PropSpace;
  mB?: PropSpace;
  pT?: PropSpace;
  pL?: PropSpace;
  pR?: PropSpace;
  pB?: PropSpace;
};

type SpaceProps = {
  pT?: PropSpace;
  pL?: PropSpace;
  pR?: PropSpace;
  pB?: PropSpace;
  mT?: PropSpace;
  mL?: PropSpace;
  mR?: PropSpace;
  mB?: PropSpace;
};

type CnSpace = (
  elemNameOrBlockMods?: SpaceProps | string | null,
  elemModsOrBlockMix?: SpaceProps | Array<string | undefined> | null,
  elemMix?: Array<string | undefined>,
) => string;

type CnMixSpace = (props: Props) => string;

const cnSpace: CnSpace = cn('MixSpace');

export const cnMixSpace: CnMixSpace = (props) => {
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
