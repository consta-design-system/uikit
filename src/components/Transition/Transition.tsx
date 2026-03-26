import {
  action,
  atom,
  computed,
  effect,
  peek,
  reatomBoolean,
  sleep,
  withAbort,
  wrap,
} from '@reatom/core';
import React from 'react';

import { factoryComponent } from '##/utils/state';

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export type TransitionProps = {
  children: (status: TransitionStatus) => React.ReactNode;
  timeout: number;
  in: boolean;
  unmountOnExit?: boolean;
  onEntering?: () => void;
  onEntered?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
};

export const Transition = factoryComponent<HTMLElement, TransitionProps>(
  ({ in: inProp }, propsAtom) => {
    const status = atom<TransitionStatus>(inProp ? 'entered' : 'exited');
    const transitionIn = computed(() => propsAtom().in);
    const render = action((status: TransitionStatus) =>
      propsAtom().children(status),
    );
    const firstTransition = reatomBoolean(true);

    const transitionRun = action(async () => {
      if (transitionIn()) {
        status.set('exited');
        status.set('entering');

        await wrap(sleep(propsAtom().timeout));
        status.set('entered');
      } else {
        status.set('entered');
        status.set('exiting');

        await wrap(sleep(propsAtom().timeout));
        status.set('exited');
      }
    }).extend(withAbort());

    effect(() => {
      transitionIn();
      if (peek(firstTransition)) {
        firstTransition.setFalse();
        return;
      }
      transitionRun();
    });

    effect(() => {
      const { onEntering, onEntered, onExited, onExiting } = peek(propsAtom);
      const cbMap: Record<TransitionStatus, (() => void) | undefined> = {
        entering: onEntering,
        entered: onEntered,
        exiting: onExiting,
        exited: onExited,
      };

      cbMap[status()]?.();
    });

    return ({ unmountOnExit, in: inProp }) => {
      const statusState = status();

      if (inProp === false && statusState === 'exited' && unmountOnExit) {
        return null;
      }

      return render(statusState);
    };
  },
);
