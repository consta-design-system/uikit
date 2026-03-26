import { action, AtomLike, effect, onEvent, wrap } from '@reatom/core';

export type ClickOutsideHandler = (event: MouseEvent) => void;

type ClickOutsideProps = {
  isActiveAtom?: AtomLike<boolean>;
  ignoreClicksElementsAtom?: AtomLike<(HTMLElement | null)[]>;
  handler?: ClickOutsideHandler;
};

export const clickOutsideEffect = ({
  isActiveAtom,
  ignoreClicksElementsAtom,
  handler,
}: ClickOutsideProps) => {
  effect(
    onEvent(
      document,
      'mousedown',
      wrap(
        action((e: MouseEvent) => {
          const isActive = isActiveAtom?.();
          const ignoreClicksElements = ignoreClicksElementsAtom?.();

          isActive &&
            handler &&
            ignoreClicksElements?.length &&
            ignoreClicksElements.every(
              (el) => !el?.contains(e.target as Node),
            ) &&
            handler(e);
        }),
      ),
    ),
  );
};
