import './MixSpace.css';

import { cn } from '../../utils/bem';

export type Space =
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
  p?: Space;
  m?: Space;
  pV?: Space;
  pH?: Space;
  mV?: Space;
  mH?: Space;
  mT?: Space;
  mL?: Space;
  mR?: Space;
  mB?: Space;
  pT?: Space;
  pL?: Space;
  pR?: Space;
  pB?: Space;
};

type SpaceProps = {
  pT?: Space;
  pL?: Space;
  pR?: Space;
  pB?: Space;
  mT?: Space;
  mL?: Space;
  mR?: Space;
  mB?: Space;
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
