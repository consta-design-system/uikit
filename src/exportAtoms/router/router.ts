import { Store, createAtom, defaultStore } from '@reatom/core';

import { State as StateRouter5, Plugin, Router } from 'router5';

export type State = {
  route?: StateRouter5;
  previousRoute?: StateRouter5;
  transitionRoute?: StateRouter5;
  transitionError?: string;
};

type RouterActionProp = {
  toState?: StateRouter5;
  fromState?: StateRouter5;
  err?: string;
};

const initialState: State = {
  route: undefined,
  previousRoute: undefined,
  transitionRoute: undefined,
  transitionError: undefined,
};

export const routerAtom = createAtom(
  {
    transitionStart: (payload: RouterActionProp) => payload,
    transitionSuccess: (payload: RouterActionProp) => payload,
    transitionError: (payload: RouterActionProp) => payload,
    transitionCancel: (payload: RouterActionProp) => payload,
    clearErrors: () => {},
  },
  ({ onAction }, state = initialState) => {
    onAction(
      'transitionStart',
      (payload) =>
        (state = {
          ...state,
          transitionRoute: payload.toState,
          transitionError: undefined,
        }),
    );
    onAction(
      'transitionSuccess',
      (payload) =>
        (state = {
          ...state,
          route: payload.toState,
          transitionRoute: undefined,
          transitionError: undefined,
          previousRoute: payload.fromState,
        }),
    );
    onAction(
      'transitionError',
      (payload) =>
        (state = {
          ...state,
          transitionRoute: payload.toState,
          transitionError: payload.err,
        }),
    );
    onAction(
      'clearErrors',
      () =>
        (state = {
          ...state,
          transitionRoute: undefined,
          transitionError: undefined,
        }),
    );

    return state;
  },
);

export const plugin = (store: Store = defaultStore) => {
  return (): Plugin => ({
    onTransitionStart(toState, fromState) {
      store.dispatch(routerAtom.transitionStart({ toState, fromState }));
    },
    onTransitionCancel(toState, fromState) {
      store.dispatch(routerAtom.transitionStart({ toState, fromState }));
    },
    onTransitionSuccess(toState, fromState) {
      store.dispatch(routerAtom.transitionSuccess({ toState, fromState }));
    },
    onTransitionError(toState, fromState, err) {
      store.dispatch(routerAtom.transitionError({ toState, fromState, err }));
    },
  });
};
