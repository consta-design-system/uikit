import { action, AtomLike } from '@reatom/core';

import { KeyCode } from '##/utils/types/KeyCode';

import { onEventEffect } from '../onEventEffect';

export type KeysEffectKeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

type KeysEffectProps<E extends HTMLElement> = {
  elAtom: AtomLike<E | null>;
  keysAtom?: AtomLike<KeysEffectKeyHandlers>;
  isActiveAtom?: AtomLike<boolean>;
  eventHandler?: (e: KeyboardEvent) => void;
  eventType?: 'keypress' | 'keydown' | 'keyup';
};

export const keysEffect = <E extends HTMLElement>({
  elAtom,
  keysAtom,
  isActiveAtom,
  eventType = 'keydown',
  eventHandler,
}: KeysEffectProps<E>) => {
  const fn = action((e: KeyboardEvent) => {
    const keys = keysAtom?.();
    const isActive = isActiveAtom?.();
    if (keys && isActive) {
      (keys[e.code as KeyCode] || keys[e.key as KeyCode])?.(e);
    }
    eventHandler?.(e);
  });

  onEventEffect(elAtom, eventType, fn as unknown as EventListener);
};
