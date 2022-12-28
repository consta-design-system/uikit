import { useCallback, useState } from 'react';

const not = (state: boolean) => !state;

type Flag = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
    /**
     * @deprecated since version 4.6.3 toggle()
     */
    toogle: () => void;
  },
];

export const useFlag = (initial = false): Flag => {
  const [state, setState] = useState(initial);

  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState(not), []);
  const toogle = useCallback(() => setState(not), []);

  return [
    state,
    {
      on,
      off,
      toggle,
      toogle,
    },
  ];
};
