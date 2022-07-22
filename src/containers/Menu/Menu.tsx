import { useAtom } from '@reatom/react';
import React from 'react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { LibPageMenu } from '##/containers/LibPageMenu';
import { LibsPageMenu } from '##/containers/LibsPageMenu';
import { libsAtom } from '##/modules/libs';
import { routesNames } from '##/modules/router';

export const Menu: React.FC = () => {
  const [libs] = useAtom(libsAtom);
  const route = useRoute();

  const routeName = route.route?.name;
  const libsLength = libs.length;

  const testStartsWithSegment = startsWithSegment(routeName);

  if (routeName === routesNames.LIBS && libsLength > 1) {
    return <LibsPageMenu />;
  }

  if (
    routeName === routesNames.LIBS_STAND ||
    testStartsWithSegment(routesNames.LIBS_STAND)
  ) {
    return <LibPageMenu />;
  }

  return null;
};
