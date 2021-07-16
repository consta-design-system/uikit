import './ComponentsGrid.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import * as wp from '../../whitepaper/whitepaper';

import { ComponentsGridItem } from './ComponentsGridItem/ComponentsGridItem';

const cnComponentsGrid = cn('ComponentsGrid');

type Item = {
  name: string;
  description?: string;
  href: string;
};

export type ComponentsGridProps = {
  data: Item[];
};

export const ComponentsGrid: React.FC<ComponentsGridProps> = ({ data }) => {
  return (
    <div
      className={cnComponentsGrid('Section', [wp.tplGrid({ 'ratio': '1-1-1', 'col-gap': 'full' })])}
    >
      {data.map((props, index) => (
        <ComponentsGridItem {...props} key={index} />
      ))}
    </div>
  );
};
