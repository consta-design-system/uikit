import './TableChoiceGroupFilter.css';

import React, { useMemo, useState } from 'react';

import { cn } from '../../../utils/bem';
import { ChoiceGroup } from '../../ChoiceGroup/ChoiceGroup';
import { CustomFilterComponentProps } from '../customFiltering';
import { TableFilterContainer } from '../FilterContainer/TableFilterContainer';

type Item = {
  name: string;
  value: string | undefined;
};

const defaultValue: Item = { name: 'Все', value: undefined };

type Props = CustomFilterComponentProps & {
  items?: Item[];
  title?: string;
};

export const TableChoiceGroupFilter: React.FC<Props> = ({
  onConfirm,
  items = [],
  savedCustomFilterValue,
  title,
  onCancel,
}) => {
  const cnChoiceGroupFilter = cn('TableChoiceGroupFilter');
  const [value, setValue] = useState<Item | null>(savedCustomFilterValue || null);

  const confirmHandler = () => {
    onConfirm({ value: value?.value ? value : undefined, isActive: Boolean(value?.value) });
  };

  const choiceGroupItems = useMemo(() => [defaultValue, ...items], [items]);

  const onChange = ({ value }: { value: Item }) => {
    setValue(value);
  };

  return (
    <TableFilterContainer title={title} onCancel={onCancel} onConfirm={confirmHandler}>
      <ChoiceGroup
        size="s"
        items={choiceGroupItems}
        getLabel={(item) => item.name}
        name="choiceGroup"
        onChange={onChange}
        value={value?.value ? value : defaultValue}
        multiple={false}
        className={cnChoiceGroupFilter()}
      />
    </TableFilterContainer>
  );
};
