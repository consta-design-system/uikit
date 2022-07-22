import { createAtom } from '@reatom/core';

import { LibWithStands } from '##/exportTypes';

export const libAtom = createAtom(
  { set: (payload: Record<string, LibWithStands>) => payload },
  ({ onAction }, state: Record<string, LibWithStands> = {}) => {
    onAction('set', (payload) => {
      state = payload;
    });
    return state;
  },
);
