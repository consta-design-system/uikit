import React, { memo } from 'react';

import bem from '../../../utils/bem';
import { SelectOptionT } from '../';
import './styles.css';

type Props = SelectOptionT & {
  onDelete: (value: string) => void;
  wpSize: 'xs' | 's' | 'm' | 'l';
};

const b = bem('multi-value');

export const IconClose = ({ className, size }: { className?: string; size: 's' | 'xs' }) =>
  size == 's' ? (
    <svg
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1.757.343L.343 1.757 4.586 6 .343 10.243l1.414 1.414L6 7.414l4.243 4.243 1.414-1.414L7.414 6l4.243-4.243L10.243.343 6 4.586 1.757.343z" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M2.16423 9.15573L2.84989 9.84958L5.99996 6.69962L9.14923 9.84898L9.15003 9.84978L9.84984 9.14986L6.69987 5.99973L9.85003 2.84969L9.14293 2.14258L6.0006 5.30042L2.85076 2.15041L2.15009 2.84961L5.30242 6.00205L2.16423 9.15573Z"
        fill="black"
      />
    </svg>
  );

const MultiValueComponent: React.FC<Props> = ({ value, label, onDelete, wpSize = 'm' }) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onDelete(value);
  };

  return (
    <div className={b({ size: wpSize })}>
      <div className={b('label')}>{label}</div>
      <div className={b('delete')} onClick={handleDeleteClick}>
        <IconClose className={b('icon')} size="xs" />
      </div>
    </div>
  );
};

export const MultiValueOption = memo(MultiValueComponent);
