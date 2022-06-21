import { routesNames } from '##/modules/router';

export type NavigationItem = {
  label: string;
  routeName: string;
};

export const navigationList: NavigationItem[] = [
  {
    label: 'Обзор',
    routeName: routesNames.LIBS_LIB_STAND,
  },
  {
    label: 'Дизайнеру',
    routeName: routesNames.LIBS_LIB_STAND_DESIGN,
  },
  {
    label: 'Разработчику',
    routeName: routesNames.LIBS_LIB_STAND_DEV,
  },
  { label: 'Песочница', routeName: routesNames.LIBS_LIB_STAND_SANDBOX },
];
