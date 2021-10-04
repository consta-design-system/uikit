import { useCallback, useRef, useState } from 'react';

export default () => {
  const [isActiveOne, setIsActiveOne] = useState<boolean>(false);
  const [isActiveTwo, setIsActiveTwo] = useState<boolean>(false);
  const pointValueOne = useRef<HTMLButtonElement | null>(null);
  const pointValueTwo = useRef<HTMLButtonElement | null>(null);

  const clearActive = useCallback(() => {
    setIsActiveOne(false);
    setIsActiveTwo(false);
  }, []);

  return {
    isActiveOne,
    setIsActiveOne,
    isActiveTwo,
    setIsActiveTwo,
    pointValueOne,
    pointValueTwo,
    clearActive,
  };
};
