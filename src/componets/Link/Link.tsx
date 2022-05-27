import React from 'react';

import { useRouter } from 'react-router5';
import { NavigationOptions } from 'router5';

import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const Link: React.FC<
  PropsWithHTMLAttributes<
    { href?: never; to: string; params?: Record<string, string>; options?: NavigationOptions },
    HTMLAnchorElement
  >
> = ({ to, onClick, params, options, ...props }) => {
  const router = useRouter();

  return (
    <a
      {...props}
      href={router.buildPath(to, params)}
      onClick={(e) => {
        e.preventDefault();
        router.navigate(to, params || {}, options || {});

        onClick?.(e);
      }}
    >
      {props.children}
    </a>
  );
};
