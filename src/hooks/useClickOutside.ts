import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useClickOutside = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpened, setOpened] = useState(false);

  const onClose = () => setOpened(false);

  useEffect(() => {
    if (isOpened) {
      window.addEventListener('click', onClose);

      return () => {
        window.removeEventListener('click', onClose);
      };
    }
  }, [isOpened]);

  return [isOpened, setOpened];
};
