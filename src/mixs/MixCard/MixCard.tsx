import './MixCard.css';

import { cn } from '../../utils/bem';
import { cnMixSpace } from '../MixSpace/MixSpace';

type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const formMap = ['round', 'square'] as const;
type FormMap = typeof formMap[number];

const cardStatus = ['alert', 'success', 'warning'] as const;
type CardStatus = typeof cardStatus[number] | string;

type Props = {
  shadow?: boolean;
  border?: boolean;
  verticalSpace?: Size;
  horizontalSpace?: Size;
  form?: FormMap;
  status?: CardStatus;
};

type CnCard = (props: Props, classNames?: Array<string | undefined>) => string;

const cnCard = cn('MixCard');

export const cnMixCard: CnCard = (props, classNames = []) => {
  const { verticalSpace, horizontalSpace, ...otherProps } = props;
  return cnCard({ ...otherProps }, [
    cnMixSpace({ pV: verticalSpace, pH: horizontalSpace }),
    ...classNames,
  ]);
};
