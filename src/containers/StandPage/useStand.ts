import { useAtom } from '@reatom/react';
import { useRouter } from 'react-router5';

import { routesNames } from '##/modules/router';
import { standAtom } from '##/modules/stand';

export const useStand = () => {
  const [stand] = useAtom(standAtom);

  const router = useRouter();

  if (!stand) {
    router.navigate(routesNames.LIBS, {}, { replace: true });
  }

  return stand;
};
