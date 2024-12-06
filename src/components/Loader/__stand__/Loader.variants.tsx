import { useSelect } from '@consta/stand';
import * as React from 'react';

import { Loader } from '../Loader';

const Variants = () => {
  const size = useSelect('size', ['xs', 's', 'm'], 'm');
  const view = useSelect('view', ['primary', 'clear'], 'primary');
  const type = useSelect('type', ['dots', 'circle'], 'dots');
  return <Loader size={size} view={view} type={type} />;
};

export default Variants;
