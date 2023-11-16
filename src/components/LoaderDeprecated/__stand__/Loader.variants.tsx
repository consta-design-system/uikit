import { useSelect } from '@consta/stand';
import * as React from 'react';

import {
  Loader,
  loaderPropSize,
  loaderPropSizeDefault,
} from '../LoaderDeprecated';

const Variants = () => {
  const size = useSelect('size', loaderPropSize, loaderPropSizeDefault);
  return <Loader size={size} />;
};

export default Variants;
