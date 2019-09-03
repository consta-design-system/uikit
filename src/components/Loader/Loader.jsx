import React from 'react';
import bem from '../../utils/bem';

import './Loader.css';

const b = bem('loader');

function Loader({ wpSize, className }) {
  return (
    <div className={b({ size: wpSize }, className)}>
      <div className={b('dot')}></div>
    </div>
  );
}

export default Loader;
