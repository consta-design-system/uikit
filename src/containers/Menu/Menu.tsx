import React from 'react';

import { routesNames } from '##/modules/router';
import { libsAtom } from '##/modules/libs';
import { useAtom } from '@reatom/react';
import { useRoute } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';

import { LibsPageMenu } from '##/containers/LibsPageMenu';
import { LibPageMenu } from '##/containers/LibPageMenu';

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
    routeName === routesNames.LIBS ||
    routeName === routesNames.LIBS_LIB ||
    testStartsWithSegment(routesNames.LIBS_LIB_STAND)
  ) {
    return <LibPageMenu />;
  }

  return null;
};
