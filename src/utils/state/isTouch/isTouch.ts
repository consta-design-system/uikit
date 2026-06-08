import {
  Action,
  Atom,
  atom,
  AtomLike,
  onEvent,
  withActions,
} from '@reatom/core';

import { named } from '##/utils/state/generateAtomName';

export interface IsTouchAtom extends Atom<boolean> {
  check: Action<[], boolean>;
}

const isTouchCondition = () =>
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia('(any-pointer: coarse)').matches;

const stateAtom = (name?: string): IsTouchAtom =>
  atom(isTouchCondition(), name).extend(
    withActions((target) => ({
      check: () => target.set(isTouchCondition()),
    })),
  );

export const isTouch = (name?: string) => {
  const state = stateAtom(name);

  onEvent(window.matchMedia('(any-pointer: coarse)'), 'change', state.check);

  return state as AtomLike<boolean>;
};
