import { action, AtomLike, effect, onEvent } from '@reatom/core';

import { named } from '##/utils/state/generateAtomName';

export type ClickOutsideHandler = (event: MouseEvent) => void;

type ClickOutsideProps = {
  isActiveAtom?: AtomLike<boolean>;
  ignoreClicksElementsAtom?: AtomLike<(HTMLElement | null)[]>;
  handler?: ClickOutsideHandler;
};

export const clickOutsideEffect = (
  { isActiveAtom, ignoreClicksElementsAtom, handler }: ClickOutsideProps,
  name?: string,
) => {
  const n = named(name, 'clickOutsideEffect');
  effect(
    onEvent(
      document,
      'mousedown',
      action((e: MouseEvent) => {
        const isActive = isActiveAtom?.();
        const ignoreClicksElements = ignoreClicksElementsAtom?.();

        isActive &&
          handler &&
          ignoreClicksElements?.length &&
          ignoreClicksElements.every((el) => !el?.contains(e.target as Node)) &&
          handler(e);
      }, n('action')),
    ),
  );
};
