import { useCallback, useState } from 'react';

const not = (state: boolean) => !state;

type Flag = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toogle: () => void;
  },
];

export const useFlag = (initial = false): Flag => {
  const [state, setState] = useState(initial);

  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const toogle = useCallback(() => setState(not), []);

  return [
    state,
    {
      on,
      off,
      toogle,
    },
  ];
};
