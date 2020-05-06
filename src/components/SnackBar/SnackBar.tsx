import './SnackBar.css';

import React from 'react';
import { cn } from '../../utils/bem';
import { SnackBarItem } from './Item/SnackBar-Item';

export const cnSnackBar = cn('SnackBar');

export function SnackBar() {
  return (
    <div className={cnSnackBar()}>
      <SnackBarItem />
    </div>
  );
}
