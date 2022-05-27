import { routerAtom } from '../router';
import { standsAtom } from '../stands';

import { createAtom } from '@reatom/core';
import { routesNames } from '##/modules/router';
import { libsAtom } from '##/modules/libs';
import { startsWithSegment } from 'router5-helpers';

export type MenuItem = {
  label: string;
  group: string;
};

export const menuAtom = createAtom({ routerAtom, libsAtom }, ({ get }) => {
  const route = get('routerAtom').route;
  let menu: MenuItem[] = [];

  if (!route) {
    return menu;
  }

  const libs = get('libsAtom');

  const testStartsWithSegment = startsWithSegment(route.name);

  // страница библиотек
  if (route?.name === routesNames.LIBS && libs.length > 1) {
    menu = libs.map((item) => ({
      label: item.title,
      group: item.group || 'Библиотеки компонентов',
    }));
  }

  // страница библиоеки
  if (
    (route?.name === routesNames.LIBS && libs.length === 1) ||
    route?.name === routesNames.LIBS_LIB
  ) {
    // return [];
  }

  // страница стенда
  if (testStartsWithSegment(routesNames.LIBS_LIB_STAND)) {
    // return [];
  }

  console.log(libs);

  return menu;
});
