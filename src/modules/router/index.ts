import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { plugin } from '##/exportAtoms/router';
import { createRoutes } from '##/exportFuctions';
import { store } from '##/modules/app';

export { routerAtom } from '##/exportAtoms/router';

export const { routesNames, routes } = createRoutes();

const router = createRouter(routes, { defaultRoute: routesNames.LIBS });

router.usePlugin(browserPlugin());
router.usePlugin(plugin(store));
router.start();
router.subscribe((state) => console.log(state));

export { router };
export * from './useIsActiveRouter';
