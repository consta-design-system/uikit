import './SnackBarActionButton.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { SnackBarActionButtonProps } from '../helper';

const cnSnackBarActionButton = cn('SnackBarActionButton');

export const SnackBarActionButton: React.FC<SnackBarActionButtonProps> = (props) => {
  const { actions, className } = props;

  if (actions.length < 1) {
    return null;
  }

  return (
    <div className={cnSnackBarActionButton('ActionButtonsWrapper', [className])}>
      {actions.map((item, index) => (
        <Button
          className={cnSnackBarActionButton()}
          key={`${cnSnackBarActionButton()}-${index}`}
          size="s"
          view="ghost"
          label={item.label}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
