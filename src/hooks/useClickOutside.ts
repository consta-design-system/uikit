import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useClickOutside = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpened, setOpened] = useState(false);

  const onClose = () => setOpened(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
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
