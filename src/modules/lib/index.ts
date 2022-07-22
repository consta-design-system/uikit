import { routerAtom } from '../router';
import { libsAtom } from '../libs';
import { standAtom } from '##/modules/stand';
import { createAtom } from '@reatom/core';

export const libAtom = createAtom({ routerAtom, libsAtom, standAtom }, ({ get }) => {
  const stand = get('standAtom');

  console.log('stand libAtom', stand);

  if (stand) {
    return stand.lib;
  }

  const libId = get('routerAtom').route?.params.stand as string | undefined;
  const libArr = get('libsAtom');

  return libId ? libArr.find((item) => item.id === libId) : undefined;
});
