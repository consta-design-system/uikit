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
  const {
    padding,
    margin,
    verticalPadding,
    horizontalPadding,
    verticalMargin,
    horizontalMargin,
    mTop,
    mLeft,
    mRight,
    mBottom,
    pTop,
    pLeft,
    pRight,
    pBottom,
  } = props;

  return cnSpace({
    pT: pTop || verticalPadding || padding,
    pL: pLeft || horizontalPadding || padding,
    pR: pRight || horizontalPadding || padding,
    pB: pBottom || verticalPadding || padding,
    mT: mTop || verticalMargin || margin,
    mL: mLeft || horizontalMargin || margin,
    mR: mRight || horizontalMargin || margin,
    mB: mBottom || verticalMargin || margin,
  });
};
