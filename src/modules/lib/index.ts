import { routerAtom } from '../router';
import { libsAtom } from '../libs';

import { createAtom } from '@reatom/core';

export const libAtom = createAtom({ routerAtom, libsAtom }, ({ get }) => {
  const libId = get('routerAtom').route?.params.libId as string | undefined;
  const libArr = get('libsAtom');

  const lib = libId ? libArr.find(item => item.id === libId) : libArr[0];

  return lib;
});
