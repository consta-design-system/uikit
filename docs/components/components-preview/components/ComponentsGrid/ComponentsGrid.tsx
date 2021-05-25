import './ComponentsGrid.css';

import React from 'react';

// import { Text } from '../../../../src/components/Text/Text';
import { cn } from '../../../../../src/utils/bem';

const cnComponentsGrid = cn('ComponentsGrid');

export const ComponentsGrid = () => {
  return <div className={cnComponentsGrid()}>{/* <Text>Это заводится</Text> */}</div>;
};
