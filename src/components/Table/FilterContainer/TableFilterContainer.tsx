import './TableFilterContainer.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

const cnTableFilterContainer = cn('TableFilterContainer');

export type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
};

export const TableFilterContainer: React.FC<Props> = ({
  onConfirm,
  title,
  confirmButtonLabel = 'Применить',
  cancelButtonLabel = 'Отмена',
  onCancel,
  children,
}) => {
  return (
    <div className={cnTableFilterContainer('Content')}>
      {title && (
        <Text view="primary" size="m" className={cnTableFilterContainer('Title')} lineHeight="l">
          {title}
        </Text>
      )}
      {children}
      <div className={cnTableFilterContainer('Buttons')}>
        <Button label={cancelButtonLabel} size="s" view="ghost" onClick={onCancel} />
        <Button label={confirmButtonLabel} size="s" view="primary" onClick={onConfirm} />
      </div>
    </div>
  );
};
