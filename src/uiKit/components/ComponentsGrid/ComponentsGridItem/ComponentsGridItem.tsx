import './ComponentsGridItem.css';

import React from 'react';

import { Text } from '../../../../components/Text/Text';
import { cn } from '../../../cn';

const cnComponentsGridItem = cn('ComponentsGridItem');

type ComponentsGridItemProps = {
  name: string;
  description?: string;
  href: string;
  children?: never;
};

export const ComponentsGridItem: React.FC<ComponentsGridItemProps> = ({
  name,
  description,
  href,
}) => {
  return (
    <div className={cnComponentsGridItem()}>
      <Text size="l" as="a" view="link" href={href} target="blank">
        {name}
      </Text>
      {description && <Text size="s">{description}</Text>}
    </div>
  );
};
