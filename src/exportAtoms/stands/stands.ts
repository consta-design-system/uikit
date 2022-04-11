import { CreatedStand } from '../../../types';

import { createAtom } from '@reatom/core';

export const standsAtom = createAtom(
  { set: (payload: Record<string, CreatedStand>) => payload },
  ({ onAction }, state: Record<string, CreatedStand> = {}) => {
    onAction('set', (payload) => (state = payload));
    return state;
  },
);
