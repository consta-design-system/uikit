import {
  action,
  atom,
  computed,
  effect,
  peek,
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
  in?: boolean;
  unmountOnExit?: boolean;
  onEntering?: () => void;
  onEntered?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  firstStatusAnimate?: boolean;
};

export const Transition = factoryComponent<HTMLElement, TransitionProps>(
  ({ in: inProp, firstStatusAnimate }, propsAtom) => {
    const status = atom<TransitionStatus>(
      !firstStatusAnimate && inProp ? 'entered' : 'exited',
    );

    const transitionInAtom = computed(() => propsAtom().in);

    const transitionRun = action(async () => {
      if (transitionInAtom() && status() !== 'entered') {
        status.set('exited');
        await wrap(sleep());
        status.set('entering');

        await wrap(sleep(propsAtom().timeout));

        status.set('entered');
      }
      if (!transitionInAtom() && status() !== 'exited') {
        status.set('entered');
        await wrap(sleep());
        status.set('exiting');

        await wrap(sleep(propsAtom().timeout));
        status.set('exited');
      }
    }).extend(withAbort());

    effect(() => {
      transitionInAtom();
      transitionRun();
    });

    effect(() => {
      const { onEntering, onEntered, onExited, onExiting } = peek(propsAtom);
      const transitionIn = peek(transitionInAtom);

      const cbMap: Record<TransitionStatus, (() => void) | undefined> = {
        entering: transitionIn ? onEntering : undefined,
        entered: transitionIn ? onEntered : undefined,
        exiting: !transitionIn ? onExiting : undefined,
        exited: !transitionIn ? onExited : undefined,
      };

      cbMap[status()]?.();
    });

    return ({ unmountOnExit, in: inProp, children }) => {
      const statusState = status();

      if (inProp === false && statusState === 'exited' && unmountOnExit) {
        return null;
      }

      return children(statusState);
    };
  },
);
