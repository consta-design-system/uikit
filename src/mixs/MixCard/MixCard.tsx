import './MixCard.css';

import { cn } from '../../utils/bem';

const sizeMap = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
type SizeMap = typeof sizeMap[number];

const formMap = ['round', 'square'] as const;
type FormMap = typeof formMap[number];

const cardState = ['alert', 'success', 'warning'] as const;
type CardState = typeof cardState[number] | string;

type Props = {
  shadow?: boolean;
  verticalSpace?: SizeMap;
  horizontalSpace?: SizeMap;
  form?: FormMap;
  state?: CardState;
};

type CnCard = (
  elemNameOrBlockMods?: Props | string | null,
  elemModsOrBlockMix?: Props | Array<string | undefined> | null,
  elemMix?: Array<string | undefined>,
) => string;

export const cnMixCard: CnCard = cn('MixCard');
