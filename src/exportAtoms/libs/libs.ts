import { LibWithStands } from '@consta/stand/types';

import { createAtom } from '@reatom/core';

export const libsAtom = createAtom(
  { set: (payload: LibWithStands[]) => payload },
  ({ onAction }, state: LibWithStands[] = []) => {
    onAction('set', (payload) => (state = payload));
    return state;
  },
);
