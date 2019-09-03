import React from 'react';
import bem from '../../utils/bem';

import './Radio.css';

const b = bem('radio');

function Radio({ id, name, wpSize, disabled, children, className }) {
  return (
    <label className={b({ size: wpSize, disabled }, className)}>
      <input type="radio" id={id} name={name} disabled={disabled} className={b('input')} />
      <div className={b('box')}></div>
      <span className={b('text')}>{children}</span>
    </label>
  );
}

export default Radio;
