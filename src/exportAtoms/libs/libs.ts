import { createAtom } from '@reatom/core';

import { LibWithStands } from '##/exportTypes';

export const libsAtom = createAtom(
  { set: (payload: LibWithStands[]) => payload },
  ({ onAction }, state: LibWithStands[] = []) => {
    onAction('set', (payload) => {
      state = payload;
    });
    return state;
  },
);
