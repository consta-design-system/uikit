import { useAtom, useUpdate } from '@reatom/npm-react';

export const useSendToAtom = <T>(value: T) => {
  const atom = useAtom(value, undefined, false)[2];

  useUpdate(atom, [value]);

  return atom;
};
