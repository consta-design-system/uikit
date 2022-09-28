import React from 'react';

import { scrollIntoView } from '../../utils/scrollIntoView';

// useHoistedState

type State = {
  searchValue: string;
  resolvedSearchValue: string;
  isOpen: boolean;
  highlightedIndex: number;
  scrollToHighlighted: boolean;
};
type Action = string;
type Reducer = (state: State, newState: State, action: Action) => State;
type Updater = (state: State) => State;

export function useHoistedState(
  initialState: State,
): [State, (updater: Updater, action: Action) => void] {
  const reducerRef = React.useRef<Reducer>((old, newState) => newState);
  const [state, _setState] = React.useState<State>(initialState);
  const setState = React.useCallback(
    (updater: Updater, action: Action) => {
      if (!action) {
        throw new Error('An action type is required to update the state');
      }
      return _setState((old) => reducerRef.current(old, updater(old), action));
    },
    [_setState],
  );
  return [state, setState];
}

// scrollToIndex

type ScrollToIndexFunctionType = (
  optionIndex: number,
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>,
) => void;

export const scrollToIndex: ScrollToIndexFunctionType = (
  index,
  dropdownRef,
): void => {
  if (!dropdownRef.current) {
    return;
  }

  const elements: NodeListOf<HTMLDivElement> =
    dropdownRef.current.querySelectorAll('div[role=option]');

  scrollIntoView(elements[index], dropdownRef.current);
};
