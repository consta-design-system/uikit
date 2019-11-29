import React, { memo } from 'react';

import bem from '../../../utils/bem';
import { WpSize } from '../../types';
import { IconClose, SelectOptionT } from '../';

import './styles.css';

type Props = SelectOptionT & {
  onDelete: (value: string) => void;
  wpSize: WpSize;
};

const b = bem('multi-value');

const MultiValueComponent: React.FC<Props> = ({ value, label, onDelete, wpSize }) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onDelete(value);
  };

  return (
    <div className={b({ size: wpSize })}>
      <div className={b('label')}>{label}</div>
      <div className={b('delete')} onClick={handleDeleteClick}>
        <IconClose className={b('icon')} size="s" />
      </div>
    </div>
  );
};

export const MultiValueOption = memo(MultiValueComponent);
