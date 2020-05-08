import './SnackBar-ActionButton.css';

import React from 'react';

import { SnackBarPropItemActionButton, cnSnackBar } from '../SnackBar';
import { Button } from '../../Button/Button';

export type ISnackBarActionButton<ITEM> = {
  action: SnackBarPropItemActionButton<ITEM> | SnackBarPropItemActionButton<ITEM>[];
};

export function SnackBarActionButton<ITEM>(props: ISnackBarActionButton<ITEM>) {
  const { action } = props;

  let actions: SnackBarPropItemActionButton<ITEM>[];
  if (Array.isArray(action)) {
    actions = action;
  } else {
    actions = [action];
  }

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
}
