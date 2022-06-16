import { routesNames } from '##/modules/router';

export type NavigationItem = {
    label: string;
    route: string;
}

export const getNavigationList = (withSandbox?: boolean): NavigationItem[] => [
    {
        label: 'Обзор',
        route: routesNames.LIBS_LIB_STAND,
    },
    {
        label: 'Дизайнеру',
        route: routesNames.LIBS_LIB_STAND_DESIGN,
    },
    {
        label: 'Разработчику',
        route: routesNames.LIBS_LIB_STAND_DEV,
    },
    ...(withSandbox ? [{
        label: 'Песочница',
        route: routesNames.LIBS_LIB_STAND_SANDBOX,
    }]: [])
]