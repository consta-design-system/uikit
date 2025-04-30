import { useAction } from '@reatom/npm-react';
import { RefCallback } from 'react';

import { useCreateAtom } from '##/utils/state/useCreateAtom';

export const useRefAtom = <T extends HTMLElement>() => {
  const atom = useCreateAtom<T | null>(null);
  const ref: RefCallback<T> = useAction((ctx, el: T) => atom(ctx, el));
  return [atom, ref] as const;
};
