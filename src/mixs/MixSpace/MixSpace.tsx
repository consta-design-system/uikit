import './MixSpace.css';

import { cn } from '../../utils/bem';

export const propSpace = [
  'm',
  '3xs',
  '2xs',
  'xs',
  's',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const;
type PropSpace = typeof propSpace[number];
export const defaultPropSpace: PropSpace = propSpace[0];

type Props = {
  padding?: PropSpace;
  margin?: PropSpace;
  verticalPadding?: PropSpace;
  horizontalPadding?: PropSpace;
  verticalMargin?: PropSpace;
  horizontalMargin?: PropSpace;
  mTop?: PropSpace;
  mLeft?: PropSpace;
  mRight?: PropSpace;
  mBottom?: PropSpace;
  pTop?: PropSpace;
  pLeft?: PropSpace;
  pRight?: PropSpace;
  pBottom?: PropSpace;
};

type CnSpace = (
  elemNameOrBlockMods?: Props | string | null,
  elemModsOrBlockMix?: Props | Array<string | undefined> | null,
  elemMix?: Array<string | undefined>,
) => string;

export const cnMixSpace: CnSpace = cn('MixSpace');
