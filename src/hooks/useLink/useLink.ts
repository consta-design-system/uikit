import React from 'react';
import { useRouter } from 'react-router5';
import { NavigationOptions, Router } from 'router5';

export type LinkProps = {
  to: string;
  params?: Record<string, string>;
  options?: NavigationOptions;
  onClick?: React.MouseEventHandler;
};

export type UseLinkProps = LinkProps | LinkProps[];

export type ReturnItem = [string, React.MouseEventHandler];

export type UseLinkReturn<PROPS> = PROPS extends [] ? ReturnItem[] : ReturnItem;

export const buildLink = (
  router: Router,
  { to, params, options }: LinkProps,
  onClick?: React.MouseEventHandler,
): ReturnItem => [
  router.buildPath(to, params),
  (e) => {
    e.preventDefault();
    router.navigate(to, params || {}, options || {});
    onClick?.(e);
  },
];

export const useLink = <PROPS extends UseLinkProps>(
  props: PROPS,
): UseLinkReturn<PROPS> => {
  const router = useRouter();

  if (Array.isArray(props)) {
    return props.map((item) => buildLink(router, item)) as UseLinkReturn<PROPS>;
  }
  return buildLink(router, props) as UseLinkReturn<PROPS>;
};
