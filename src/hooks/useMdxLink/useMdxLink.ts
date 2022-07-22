import { useRoute, useRouter } from 'react-router5';
import { Router, State } from 'router5';

import { buildLink } from '##/hooks/useLink';

export type ReturnItem = [string, React.MouseEventHandler | undefined];

export type UseMdxLinkReturn<T> = T extends [] ? ReturnItem[] : ReturnItem;

const buildNavigateParams = (
  href: string,
): [string, Record<string, string>] => {
  const decoded = decodeURI(href.slice(2, href.length)).toString();
  const parts = decoded.split('|');
  const routeParams: Record<string, string> = {};
  let routeName = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i === 0) {
      routeName = part;
      continue;
    }
    if (part.includes(':')) {
      const [key, value] = part.split(':');
      routeParams[key] = value;
      continue;
    }
    routeParams.hash = part;
  }
  return [routeName, routeParams];
};

export type useMdxLinkHref = string | string[];

const buildMdxLink = (
  router: Router,
  route: State,
  href: string,
): UseMdxLinkReturn<string> => {
  if (href[0] === '#' && href[1] === '#') {
    const [to, params] = buildNavigateParams(href);

    return buildLink(router, { to, params });
  }
  if (href[0] === '#') {
    const params = {
      ...route.params,
      hash: decodeURI(href.slice(1, href.length)),
    };
    const to = route.name;
    return buildLink(router, { to, params });
  }
  return [href, undefined];
};

export const useMdxLink = <T extends useMdxLinkHref>(
  href: T,
): UseMdxLinkReturn<T> => {
  const router = useRouter();
  const { route } = useRoute();

  if (Array.isArray(href)) {
    return href.map((item) =>
      buildMdxLink(router, route, item),
    ) as UseMdxLinkReturn<T>;
  }
  return buildMdxLink(router, route, href) as UseMdxLinkReturn<T>;
};
