import { useBoolean } from '@consta/stand';

const getUndefined = () => undefined;

export const useDefaultGetter = (
  name: string,
  value?: boolean,
  isActive?: boolean,
) => (useBoolean(name, value, isActive) ? undefined : getUndefined);
