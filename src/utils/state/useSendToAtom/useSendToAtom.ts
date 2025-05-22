import { useUpdate } from '@reatom/npm-react';

import { useCreateAtom } from '../useCreateAtom';

export const useSendToAtom = <T>(value: T) => {
  const atom = useCreateAtom(value);
  useUpdate(atom, [value]);

  return atom;
};
