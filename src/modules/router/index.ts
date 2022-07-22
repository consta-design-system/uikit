import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { store } from '##/modules/app';

import { createRoutes } from '##/exportFuctions';

import { plugin } from '##/exportAtoms/router';

export { routerAtom } from '##/exportAtoms/router';

export const { routesNames, routes } = createRoutes();

const router = createRouter(routes, { defaultRoute: routesNames.LIBS });

router.usePlugin(browserPlugin());
router.usePlugin(plugin(store));
router.start();

export { router };
export * from './useIsActiveRouter';
