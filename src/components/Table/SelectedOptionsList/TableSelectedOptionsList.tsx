import './TableSelectedOptionsList.css';

import { IconClose } from '@consta/icons/IconClose';
import React from 'react';

import { cn } from '../../../utils/bem';
import { isNotNil, isNumber } from '../../../utils/type-guards';
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

export type GetTagLabel = (
  id: string,
  name: string,
  filterValue?: unknown,
) => string;

type Props = {
  values: Array<{ id: string; name: string; value?: unknown }>;
  getTagLabel?: GetTagLabel;
  onRemove: (id: string) => void;
  onReset: () => void;
};

const getTagLabelDefault: GetTagLabel = (
  id,
  name,
  filterValue?: unknown,
): string => {
  const localFilterValue = (
    isNumber(filterValue) ? { name: String(filterValue) } : filterValue
  ) as OptionValue;
  if (!isNotNil(localFilterValue)) {
    return name;
  }

  let restName = '';
  if (Array.isArray(localFilterValue)) {
    restName = localFilterValue.map(({ name }) => name).join(', ');
  }

  if (localFilterValue.min && localFilterValue.max) {
    restName = `от ${localFilterValue.min} до ${localFilterValue.max}`;
  } else if (localFilterValue.min) {
    restName = `от ${localFilterValue.min}`;
  } else if (localFilterValue.max) {
    restName = `до ${localFilterValue.max}`;
  }

  if (localFilterValue.name) {
    restName = `${localFilterValue.name}`;
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
