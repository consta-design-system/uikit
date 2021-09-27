import './MixLabel.css';

import { cn } from '../../utils/bem';

type Size = 'xs' | 's' | 'm' | 'l';

const alignMap = ['top', 'left'] as const;
type AlignMap = typeof alignMap[number];

type Props = {
  align?: AlignMap;
  size?: Size;
};

type CnLabel = (
  elemNameOrBlockMods?: Props | string | null,
  elemModsOrBlockMix?: Props | Array<string | undefined> | null,
  elemMix?: Array<string | undefined>,
) => string;

export const cnMixLabel: CnLabel = cn('MixLabel');
