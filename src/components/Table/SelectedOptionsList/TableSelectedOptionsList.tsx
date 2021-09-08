import './TableSelectedOptionsList.css';

import React from 'react';

import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { isNotNil } from '../../../utils/type-guards';
import { Button } from '../../Button/Button';
import { Tag } from '../../Tag/Tag';

const cnTableSelectedOptionsList = cn('TableSelectedOptionsList');

type OptionValue = {
  min?: string;
  max?: string;
} & Array<{
  name: string;
  value: string | number;
}> & {
    name: string;
    value: string | number;
  };

export type GetTagLabel = (id: string, name: string, filterValue?: OptionValue) => string;

type Props = {
  values: Array<{ id: string; name: string; value?: any }>;
  getTagLabel?: GetTagLabel;
  onRemove: (id: string) => void;
  onReset: () => void;
};

const getTagLabelDefault: GetTagLabel = (id, name, filterValue?: OptionValue): string => {
  if (!isNotNil(filterValue)) {
    return name;
  }

  let restName = '';
  if (Array.isArray(filterValue)) {
    restName = filterValue.map(({ name }) => name).join(', ');
  }

  if (filterValue.min && filterValue.max) {
    restName = `от ${filterValue.min} до ${filterValue.max}`;
  } else if (filterValue.min) {
    restName = `от ${filterValue.min}`;
  } else if (filterValue.max) {
    restName = `до ${filterValue.max}`;
  }

  if (filterValue.name) {
    restName = `${filterValue.name}`;
  }

  return name + restName;
};

export const TableSelectedOptionsList: React.FC<Props> = ({
  values,
  onRemove,
  onReset,
  getTagLabel = getTagLabelDefault,
}) => {
  return (
    <div className={cnTableSelectedOptionsList()}>
      <div className={cnTableSelectedOptionsList('Options')}>
        {values.map((option) => (
          <Tag
            className={cnTableSelectedOptionsList('Option')}
            key={option.id}
            label={getTagLabel(option.id, option.name, option.value)}
            size="xs"
            mode="cancel"
            onCancel={(): void => onRemove(option.id)}
          />
        ))}
      </div>
      <Button
        type="button"
        onClick={onReset}
        title="Сбросить все фильтры"
        size="xs"
        view="clear"
        onlyIcon
        iconLeft={IconClose}
        className={cnTableSelectedOptionsList('Button')}
      />
    </div>
  );
};
