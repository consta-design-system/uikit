import { createAtom } from '@reatom/core';

import { PreparedStand } from '##/exportTypes';

export const standsAtom = createAtom(
  { set: (payload: Record<string, PreparedStand>) => payload },
  ({ onAction }, state: Record<string, PreparedStand> = {}) => {
    onAction('set', (payload) => {
      state = payload;
    });
    return state;
  },
);
