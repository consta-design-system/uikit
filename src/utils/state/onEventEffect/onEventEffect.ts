import { AtomLike, effect, onEvent } from '@reatom/core';

export const onEventEffect = <T extends HTMLElement>(
  elementAtom: AtomLike<T | null>,
  type: keyof DocumentEventMap,
  listener: EventListener,
  name?: string,
) => {
  effect(() => {
    const el = elementAtom();

    if (el) {
      onEvent(el, type, listener);
    }
  }, name);
};
