import './ComponentsGridItem.css';

import React from 'react';

import { Text } from '../../../../components/Text/Text';
import { cn } from '../../../cn';

const cnComponentsGridItem = cn('ComponentsGridItem');

type ComponentsGridItemProps = {
  name?: string;
  description?: string;
  url?: string;
  image?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: never;
};

export const ComponentsGridItem: React.FC<ComponentsGridItemProps> = ({
  name,
  description,
  url,
  image: Svg,
}) => {
  return (
    <div className={cnComponentsGridItem()}>
      {Svg && <Svg className={cnComponentsGridItem('Image')} />}
      {name && url && (
        <Text size="l" as="a" view="link" href={url} target="blank">
          {name}
        </Text>
      )}

      {description && <Text size="s">{description}</Text>}
    </div>
  );
};
