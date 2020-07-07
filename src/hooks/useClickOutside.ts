import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
    return undefined;
  }, [isOpened]);

  return [isOpened, setOpened];
};
