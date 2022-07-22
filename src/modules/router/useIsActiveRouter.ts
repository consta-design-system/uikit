import { useCallback } from 'react';
import { useRoute, useRouter } from 'react-router5';
import { startsWithSegment } from 'router5-helpers';
import { routesNames } from '##/modules/router';

export const useIsActiveRouter = () => {
  const router = useRouter();
  const route = useRoute();
  const routeName = route.route?.name;

  const testStartsWithSegment = startsWithSegment(routeName);

  const getIsActive = useCallback(
    (
      name: string,
      params?: Record<string, string>,
      strictEquality?: boolean,
      ignoreQueryParams?: boolean,
    ) => {
      if (testStartsWithSegment(name)) {
        return (
          router.isActive(name, params, strictEquality, ignoreQueryParams) ||
          (name !== routesNames.LIBS_STAND &&
            route.route.path.includes(router.buildPath(name, params)))
        );
      }
      return false;
    },
    [testStartsWithSegment, routeName],
  );

  return getIsActive;
};
