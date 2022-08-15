import './TableChoiceGroupFilter.css';

import React, { useMemo, useState } from 'react';

import { cn } from '../../../utils/bem';
import { ChoiceGroup } from '../../ChoiceGroup/ChoiceGroup';
import { TableFilterContainer } from '../FilterContainer/TableFilterContainer';
import { FilterComponentProps } from '../filtering';

type Item = {
  name: string;
  value: string | undefined;
};

const defaultValue: Item = { name: 'Все', value: undefined };

type Props = FilterComponentProps & {
  items?: Item[];
  title?: string;
};

export const TableChoiceGroupFilter: React.FC<Props> = ({
  onConfirm,
  items = [],
  filterValue,
  title,
  onCancel,
}) => {
  const cnChoiceGroupFilter = cn('TableChoiceGroupFilter');
  const [value, setValue] = useState<Item | null>(
    (filterValue as Item) || defaultValue,
  );

  const confirmHandler = () => {
    onConfirm(value);
  };

  const choiceGroupItems = useMemo(() => [defaultValue, ...items], [items]);

  const onChange = ({ value }: { value: Item }) => {
    setValue(value);
  };

  return (
    <TableFilterContainer
      title={title}
      onCancel={onCancel}
      onConfirm={confirmHandler}
    >
      <ChoiceGroup
        size="s"
        items={choiceGroupItems}
        getItemLabel={(item) => item.name}
        name="choiceGroup"
        onChange={onChange}
        value={value?.value ? value : defaultValue}
        className={cnChoiceGroupFilter()}
      />
    </TableFilterContainer>
  );
};
