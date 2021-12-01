import React from 'react';

export type DataItem = {
  componentName?: string;
  name: string;
  description?: string;
  url: string;
  image?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type Group = {
  title?: string;
  items?: DataItem[];
};

export type Data = Group[];
