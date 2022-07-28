import { useAtom } from '@reatom/react';
import React from 'react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { LibPage } from '##/containers/LibPage';
import { LibsPage } from '##/containers/LibsPage';
import { StandPage } from '##/containers/StandPage';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';

export const Pages: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const { route } = useRoute();

  const testStartsWithSegment = startsWithSegment(route.name);

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
