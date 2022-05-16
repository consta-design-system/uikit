import React from 'react';

import { routesNames } from '##/modules/router';
import { standsAtom } from '##/modules/stands';
import { libsAtom } from '##/modules/libs';
import { useAtom } from '@reatom/react';
import { useRoute, useRouter } from 'react-router5';

import { LibsPage } from '##/pages/LibsPage';
import { LibPage } from '##/pages/LibPage';
import { StandPage } from '##/pages/StandPage';

export const App: React.FC = () => {
  const [stands] = useAtom(standsAtom);
  const [libs] = useAtom(libsAtom);
  const route = useRoute();
  const router = useRouter();

  const routeName = route.route?.name;
  const libsLength = libs.length;

  console.log(routeName);

  if (routeName === routesNames.LIBS && libsLength > 1) {
    return <LibsPage />;
  }

  if (routeName === routesNames.LIBS || routeName === routesNames.LIBS_LIB) {
    return <LibPage />;
  }

  if (routeName === routesNames.LIBS_LIB_STAND) {
    return <StandPage />;
  }

  console.log(stands);
  console.log(libs);

  return (
    <div>
      !
      <button
        onClick={() =>
          router.navigate(routesNames.LIBS_LIB_STAND_DESIGN, { libId: 'uikit', standId: 'cc' })
        }
      >
        fff
      </button>
    </div>
  );
};
