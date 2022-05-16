import { PreparedStand } from '../../../types';

import { createAtom } from '@reatom/core';

export const standsAtom = createAtom(
  { set: (payload: Record<string, PreparedStand>) => payload },
  ({ onAction }, state: Record<string, PreparedStand> = {}) => {
    onAction('set', (payload) => (state = payload));
    return state;
  },
);
