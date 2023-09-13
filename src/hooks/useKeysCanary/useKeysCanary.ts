import { useCallback } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { KeyCode } from '##/utils/types/KeyCode';

type KeyHandlers = Partial<Record<KeyCode, React.KeyboardEventHandler>> & {
  [key: string]: React.KeyboardEventHandler;
};

type UseKeysProps = {
  keys: KeyHandlers;
  onEvent?: React.KeyboardEventHandler;
  isActive: boolean;
};

export const useKeys = (props: UseKeysProps): React.KeyboardEventHandler => {
  const propsRef = useMutableRef(props);
  return useCallback((e) => {
    const { isActive, keys, onEvent } = propsRef.current;
    if (isActive) {
      (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
    }
    onEvent?.(e);
  }, []);
};
