import './MixFlex.css';

import { cn } from '##/utils/bem';

import { Space } from '../MixSpace';

export const mixFlexPropAlign = [
  'flex-start',
  'flex-end',
  'center',
  'baseline',
  'stretch',
] as const;
export type MixFlexPropAlign = typeof mixFlexPropAlign[number];

export const mixFlexPropJustify = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
export type MixFlexPropJustify = typeof mixFlexPropJustify[number];

export const mixFlexPropFlex = ['flex', 'inline-flex'] as const;
export type MixFlexPropFlex = typeof mixFlexPropFlex[number];

export const mixFlexPropWrap = ['nowrap', 'wrap', 'wrap-reverse'] as const;
export type MixFlexPropWrap = typeof mixFlexPropWrap[number];

export const mixFlexPropDirection = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] as const;
export type MixFlexPropDirection = typeof mixFlexPropDirection[number];

type Props = {
  align?: MixFlexPropAlign;
  justify?: MixFlexPropJustify;
  flex?: MixFlexPropFlex;
  wrap?: MixFlexPropWrap;
  direction?: MixFlexPropDirection;
  gap?: Space;
  order?: -1 | 0 | 1;
};

type CnMixFlex = (
  props: Props,
  classNames?: Array<string | undefined>,
) => string;

const cnFlex = cn('MixFlex');

export const cnMixFlex: CnMixFlex = (props, classNames = []) =>
  cnFlex(props, classNames);
