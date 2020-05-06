import './SnackBar-Item.css';

import React from 'react';
import { cnSnackBar } from '../SnackBar';

export function SnackBarItem() {
  return <div className={cnSnackBar('Item')}>item</div>;
}
