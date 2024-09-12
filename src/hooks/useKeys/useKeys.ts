import { useCallback } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { KeyCode } from '##/utils/types/KeyCode';

export type UseKeysPropKeys<ELEMENT = Element> = Partial<
  Record<KeyCode, React.KeyboardEventHandler<ELEMENT>>
> & {
  [key: string]: React.KeyboardEventHandler;
};

export type UseKeysProps<ELEMENT = Element> = {
  keys: UseKeysPropKeys<ELEMENT>;
  onEvent?: React.KeyboardEventHandler<ELEMENT>;
  isActive: boolean;
};

export const useKeys = <ELEMENT = Element>(
  props: UseKeysProps<ELEMENT>,
): React.KeyboardEventHandler<ELEMENT> => {
  const propsRef = useMutableRef(props);
  return useCallback((e) => {
    const { isActive, keys, onEvent } = propsRef.current;
    if (isActive) {
      (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
    }
    onEvent?.(e);
  }, []);
};
