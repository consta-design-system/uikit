import './ComponentsGrid.css';

import React from 'react';

import { Text } from '../../../components/Text/Text';
import { cn } from '../../cn';
import * as wp from '../../whitepaper/whitepaper';
import { ComponentsGridItem } from './ComponentsGridItem/ComponentsGridItem';

const cnComponentsGrid = cn('ComponentsGrid');

type Item = {
  name?: string;
  description?: string;
  url?: string;
  image?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type ComponentsGridProps = {
  data: {
    title?: string;
    items?: Item[];
  }[];
};

export const ComponentsGrid: React.FC<ComponentsGridProps> = ({ data }) => {
  return (
    <div>
      {data.map(({ title, items }) => (
        <>
          {title && (
            <Text
              size="3xl"
              lineHeight="xs"
              weight="bold"
              className={cnComponentsGrid('Title')}
            >
              {title}
            </Text>
          )}
          <div
            className={cnComponentsGrid('Section', [
              wp.tplGrid({ 'ratio': '1-1-1', 'col-gap': 'full' }),
            ])}
          >
            {items?.map((item, index) => (
              <ComponentsGridItem {...item} key={index} />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
