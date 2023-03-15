import './TableFilterContainer.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

const cnTableFilterContainer = cn('TableFilterContainer');

export type TableFilterContainerProps = {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  className?: string;
  children?: React.ReactNode;
};

export const TableFilterContainer: React.FC<TableFilterContainerProps> = ({
  onConfirm,
  title,
  confirmButtonLabel = 'Применить',
  cancelButtonLabel = 'Отмена',
  onCancel,
  children,
  className,
}) => {
  return (
    <div className={cnTableFilterContainer(null, [className])}>
      {title && (
        <Text
          view="primary"
          size="m"
          className={cnTableFilterContainer('Title')}
          lineHeight="l"
        >
          {title}
        </Text>
      )}
      {children}
      <div className={cnTableFilterContainer('Buttons')}>
        <Button
          type="button"
          label={cancelButtonLabel}
          size="s"
          view="ghost"
          onClick={onCancel}
        />
        <Button
          type="button"
          label={confirmButtonLabel}
          size="s"
          view="primary"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};
