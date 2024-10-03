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

export type MixSpaceProps = {
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
