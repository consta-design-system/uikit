import React, { useEffect } from 'react';

import { routesNames } from '##/modules/router';
import { libsAtom } from '##/modules/libs';
import { useAtom } from '@reatom/react';
import { useRoute, useRouter } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { LibsPage } from '##/containers/LibsPage';
import { LibPage } from '##/containers/LibPage';
import { StandPage } from '##/containers/StandPage';

export const Pages: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const { route } = useRoute();
  const router = useRouter();

  const testStartsWithSegment = startsWithSegment(route.name);

  // если библиотека одна то редереким на сраницу библиотеки
  useEffect(() => {
    if (libs.length <= 1) {
      router.navigate(routesNames.LIBS_STAND, { stand: libs[0].id }, { replace: true });
    }
  }, []);

  if (route.name === routesNames.LIBS) {
    return <LibsPage />;
  }

  if (testStartsWithSegment(routesNames.LIBS_STAND)) {
    if (libs.find((item) => item.id === route.params.stand)) {
      return <LibPage />;
    }
    return <StandPage />;
  }

  return null;
};
