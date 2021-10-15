import React from 'react';

export type DataItem = {
  name: string;
  description?: string;
  url: string;
  image?: React.FC<React.SVGProps<SVGSVGElement>>;
};
