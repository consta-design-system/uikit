import { useMemo, useState } from 'react';

export type Flag = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  },
];

export const useFlag = (initial = false): Flag => {
  const [state, setState] = useState(initial);

  return [
    state,
    useMemo(
      () => ({
        on: () => setState(true),
        off: () => setState(false),
        toggle: () => setState((state) => !state),
        set: setState,
      }),
      [],
    ),
  ];
};
