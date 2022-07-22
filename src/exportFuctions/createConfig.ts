import { CreatedStand, Group, Lib, Stand } from '##/exportTypes';

export const createConfig = <GROUP extends Group>(libProps: Lib<GROUP>) => {
  const createStand = (standProps: Stand<GROUP['id']>): CreatedStand => ({
    stand: standProps,
    lib: libProps,
  });
  return { createStand };
};
