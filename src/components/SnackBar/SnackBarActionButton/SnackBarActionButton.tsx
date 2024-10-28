import './SnackBarActionButton.css';

import React from 'react';

import { Button } from '##/components/Button';
import { cn } from '##/utils/bem';

import { SnackBarActionButtonProps } from '../types';

const cnSnackBarActionButton = cn('SnackBarActionButton');

export const SnackBarActionButton: React.FC<SnackBarActionButtonProps> = (
  props,
) => {
  const { actions, className, form } = props;

  if (actions.length < 1) {
    return null;
  }

  return (
    <div
      className={cnSnackBarActionButton('ActionButtonsWrapper', [className])}
    >
      {actions.map((item, index) => (
        <Button
          className={cnSnackBarActionButton()}
          key={`${cnSnackBarActionButton()}-${index}`}
          size="s"
          type="button"
          view="ghost"
          label={item.label}
          onClick={item.onClick}
          form={form}
        />
      ))}
    </div>
  );
};
