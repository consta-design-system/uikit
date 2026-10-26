import { AtomLike } from '@reatom/core';
import { useAction } from '@reatom/react';

import { useElementAtomEventListener } from '##/utils/state/useElementAtomEventListener';
import { KeyCode } from '##/utils/types/KeyCode';

export type KeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

type UseKeysProps<E extends HTMLElement> = {
  elAtom: AtomLike<E | null>;
  keysAtom?: AtomLike<KeyHandlers>;
  isActiveAtom?: AtomLike<boolean>;
  eventHandler?: (e: KeyboardEvent) => void;
  eventType?: 'keypress' | 'keydown' | 'keyup';
};

export const useKeysAtom = <E extends HTMLElement>({
  elAtom,
  keysAtom,
  isActiveAtom,
  eventType = 'keydown',
  eventHandler,
}: UseKeysProps<E>) => {
  const fn = useAction((e: KeyboardEvent) => {
    const keys = keysAtom && keysAtom();
    const isActive = isActiveAtom && isActiveAtom();
    if (keys && isActive) {
      (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
    }
    eventHandler?.(e);
  });

  useElementAtomEventListener(elAtom, eventType, fn as EventListener);
};
