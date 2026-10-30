import { useAction } from '@reatom/react';
import { RefCallback } from 'react';

import { useCreateAtom } from '##/utils/state/useCreateAtom';

export const useRefAtom = <T extends HTMLElement>() => {
  const atom = useCreateAtom<T | null>(null);
  const ref: RefCallback<T | null> = useAction(atom.set);
  return [atom, ref] as const;
};
