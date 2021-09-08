import './MixCard.css';

import { cn } from '../../utils/bem';

type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const formMap = ['round', 'square'] as const;
type FormMap = typeof formMap[number];

const cardStatus = ['alert', 'success', 'warning'] as const;
type CardStatus = typeof cardStatus[number] | string;

type Props = {
  shadow?: boolean;
  verticalSpace?: Size;
  horizontalSpace?: Size;
  form?: FormMap;
  status?: CardStatus;
};

type CnCard = (
  elemNameOrBlockMods?: Props | string | null,
  elemModsOrBlockMix?: Props | Array<string | undefined> | null,
  elemMix?: Array<string | undefined>,
) => string;

export const cnMixCard: CnCard = cn('MixCard');
