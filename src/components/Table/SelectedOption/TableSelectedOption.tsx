import './TableSelectedOption.css';

import React from 'react';

import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';

const cnTableSelectedOption = cn('TableSelectedOption');

type Props = {
  name: string;
  onRemove: () => void;
};

export const TableSelectedOption: React.FC<Props> = ({ name, onRemove }) => (
  <div className={cnTableSelectedOption(null)}>
    <Text as="p" size="xs" weight="regular" className={cnTableSelectedOption('Label')}>
      {name}
    </Text>
    <button
      title="Удалить"
      onClick={(event): void => {
        event.stopPropagation();
        onRemove();
      }}
      className={cnTableSelectedOption('Button')}
      type="button"
    >
      <IconClose className={cnTableSelectedOption('Icon')} size="xs" />
    </button>
  </div>
);
