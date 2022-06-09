import { LibWithStands } from '@consta/stand/src/exportTypes';

import { createAtom } from '@reatom/core';

export const libAtom = createAtom(
  { set: (payload: Record<string, LibWithStands>) => payload },
  ({ onAction }, state: Record<string, LibWithStands> = {}) => {
    onAction('set', (payload) => (state = payload));
    return state;
  },
);
