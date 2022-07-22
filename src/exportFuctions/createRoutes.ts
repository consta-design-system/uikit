export type RouterItem = {
  name: string;
  path: string;
};

const routesNames = {
  LIBS: 'LIBS',
  LIBS_STAND: 'LIBS.STAND',
  LIBS_STAND_DESIGN: 'LIBS.STAND.DESIGN',
  LIBS_STAND_DEV: 'LIBS.STAND.DEV',
  LIBS_STAND_SANDBOX: 'LIBS.STAND.SANDBOX',
};

export const createRoutes = (path = '/libs') => {
  const routes: RouterItem[] = [
    {
      name: routesNames.LIBS,
      path: `${path}?:hash`,
    },
    {
      name: routesNames.LIBS_STAND,
      path: '/:stand?:hash',
    },
    {
      name: routesNames.LIBS_STAND_DESIGN,
      path: '/dev?:hash',
    },
    {
      name: routesNames.LIBS_STAND_DEV,
      path: '/design?:hash',
    },
    {
      name: routesNames.LIBS_STAND_SANDBOX,
      path: '/sandbox?:hash',
    },
  ];

  return { routesNames, routes };
};
