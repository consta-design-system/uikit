import { routesNames } from '##/modules/router';

export type NavigationItem = {
  label: string;
  id: string;
};

export const navigationList: NavigationItem[] = [
  {
    label: 'Обзор',
    id: routesNames.LIBS_STAND,
  },
  {
    label: 'Дизайнеру',
    id: routesNames.LIBS_STAND_DESIGN,
  },
  {
    label: 'Разработчику',
    id: routesNames.LIBS_STAND_DEV,
  },
  { label: 'Песочница', id: routesNames.LIBS_STAND_SANDBOX },
];
