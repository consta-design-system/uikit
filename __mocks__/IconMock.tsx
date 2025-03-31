import { createIcon } from '@consta/icons/Icon';
import React from 'react';

export const createIconMock = (name: string) => {
  const svg = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props}>{name}</svg>
  );

  return createIcon({
    xs: svg,
    s: svg,
    m: svg,
    l: svg,
    name,
    color: 'mono',
  });
};

export const iconMockText = 'IconMock';
export const IconMock = createIconMock(iconMockText);
