import { useSelect } from '@consta/stand';
import * as React from 'react';

import { Loader } from '../LoaderCanary';
import { loaderPropSize, loaderPropSizeDefault } from '../types';

const Variants = () => {
  const size = useSelect('size', loaderPropSize, loaderPropSizeDefault);
  return <Loader size={size} />;
};

export default Variants;
