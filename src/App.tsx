import React from 'react';

import { routerAtom, routesNames } from '##/modules/router';
import { standsAtom } from '##/modules/stands';
import { libsAtom } from '##/modules/libs';
import { useAtom } from '@reatom/react';
import { useRoute, useRouter } from 'react-router5';

import { LibsPage } from '##/pages/LibsPage';

export const App: React.FC = () => {
  // const [router] = useAtom(routerAtom);
  const [stands] = useAtom(standsAtom);
  const [libs] = useAtom(libsAtom);
  const route = useRoute();
  const router = useRouter();

  console.log(route.route);

  // if (route.route?.name === routesNames.LIBS) {
  //   return <LibsPage />;
  // }

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
