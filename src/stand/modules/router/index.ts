import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { store } from '@@/stand/modules/app';

import { createRoutes } from '@consta/stand/src/exportFuctions';

import { plugin } from '@consta/stand';

export { routerAtom } from '@consta/stand';

export const { routesNames, routes } = createRoutes();

export const router = createRouter(routes);

router.usePlugin(browserPlugin());

router.usePlugin(plugin(store));
router.start();
