import { AtomMut } from '@reatom/core';
import { useAction } from '@reatom/npm-react';

import { useElementAtomEventListener } from '##/utils/state/useElementAtomEventListener';
import { useSendToAtom } from '##/utils/state/useSendToAtom';
import { KeyCode } from '##/utils/types/KeyCode';

export type KeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

type UseKeysProps<E extends HTMLElement> = {
  elAtom: AtomMut<E | null>;
  keysAtom?: AtomMut<KeyHandlers>;
  isActiveAtom?: AtomMut<boolean>;
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
  const eventHandlerAtom = useSendToAtom([eventHandler]);
  const fn = useAction((ctx, e: KeyboardEvent) => {
    const keys = keysAtom && ctx.get(keysAtom);
    const isActive = isActiveAtom && ctx.get(isActiveAtom);
    if (keys && isActive) {
      (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
    }
    ctx.get(eventHandlerAtom)[0]?.(e);
  });

  useElementAtomEventListener(elAtom, eventType, fn as EventListener);
};
