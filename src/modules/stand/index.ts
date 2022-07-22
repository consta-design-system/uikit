import { createAtom } from '@reatom/core';

import { routerAtom } from '../router';
import { standsAtom } from '../stands';

export const standAtom = createAtom({ routerAtom, standsAtom }, ({ get }) => {
  const standId = get('routerAtom').route?.params.stand as string | undefined;
  const stand = standId ? get('standsAtom')[standId] : undefined;

  return stand;
});
