import { useCallback, useRef } from 'react';

import { useFlag } from '../../hooks/useFlag/useFlag';

export const useActive = () => {
  const [isActiveOne, changerActiveOne] = useFlag();
  const [isActiveTwo, changerActiveTwo] = useFlag();
  const pointValueOne = useRef(null);
  const pointValueTwo = useRef(null);

  const clearActive = useCallback(() => {
    changerActiveOne.off();
    changerActiveTwo.off();
  }, []);

  return {
    isActiveOne,
    changerActiveOne,
    isActiveTwo,
    changerActiveTwo,
    pointValueOne,
    pointValueTwo,
    clearActive,
  };
};
