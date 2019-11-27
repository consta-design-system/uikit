import React from 'react';
import bem from '../../../../utils/bem';

import './styles.css';

const b = bem('logo');

type Props = {
  locked?: boolean;
  className?: string;
};

const Logo: React.FC<Props> = ({ children, locked, className, ...restProps }) => {
  if (!locked) {
    return (
      <a className={b({}, className)} href="/" {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <a className={b({}, className)} {...restProps}>
        {children}
      </a>
    );
  }
};

export default Logo;
