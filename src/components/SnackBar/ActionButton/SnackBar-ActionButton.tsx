import './SnackBar-ActionButton.css';

import React from 'react';
import { SnackBarPropItemAction, cnSnackBar } from '../SnackBar';
import { Button } from '../../Button/Button';

export type SnackBarActionButtonProps = {
  actions: SnackBarPropItemAction[];
};

export const SnackBarActionButton: React.FC<SnackBarActionButtonProps> = (props) => {
  const { actions } = props;

  if (actions.length < 1) {
    return null;
  }

  return (
    <div className={cnSnackBar('ActionButtonsWrapper')}>
      {actions.map((item, i) => (
        <Button
          className={cnSnackBar('ActionButton')}
          key={i}
          size="s"
          view="ghost"
          label={item.label}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
