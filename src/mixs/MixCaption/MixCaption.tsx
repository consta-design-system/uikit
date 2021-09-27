import './MixCaption.css';

import { cn } from '../../utils/bem';

type Size = 'xs' | 's' | 'm' | 'l';

type Props = {
  size?: Size;
};

type CnCaption = (
  elemNameOrBlockMods?: Props | string | null,
  elemModsOrBlockMix?: Props | Array<string | undefined> | null,
  elemMix?: Array<string | undefined>,
) => string;

export const cnMixCaption: CnCaption = cn('MixCaption');
