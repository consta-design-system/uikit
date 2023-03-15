import './TableTextFilter.css';

import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import React, { useMemo, useState } from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { CheckboxGroup } from '../../CheckboxGroup';
import { Text } from '../../Text/Text';
import { TextField } from '../../TextField/TextField';
import { TableFilterContainer } from '../FilterContainer/TableFilterContainer';
import { FilterComponentProps } from '../filtering';

const cnTextFilter = cn('TableTextFilter');

type Item = {
  name: string;
  value: string;
};

type TableTextFilterProps = FilterComponentProps & {
  items?: Item[];
  withSearch?: boolean;
  title?: string;
  emptySearchText?: string;
};

export const TableTextFilter: React.FC<TableTextFilterProps> = ({
  items = [],
  withSearch = false,
  onConfirm,
  onCancel,
  filterValue,
  title,
  emptySearchText = 'Ничего не найдено :(',
}) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<Item[] | null>(
    (filterValue as Item[]) || items,
  );

  const confirmHandler = () => {
    setSearchValue(null);
    onConfirm(checkboxGroupValue === null ? [] : checkboxGroupValue);
  };

  const resetHandler = () => {
    setCheckboxGroupValue(null);
  };

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    return items.filter(({ name }) => {
      return name.match(new RegExp(`${searchValue}`, 'i'));
    });
  }, [searchValue, items]);

  const setAll = () => {
    setCheckboxGroupValue(filteredItems);
  };

  const isAllSelected = useMemo(
    () => filteredItems.length === checkboxGroupValue?.length,
    [filteredItems, checkboxGroupValue],
  );

  const isSelected = useMemo(
    () => checkboxGroupValue?.length,
    [checkboxGroupValue],
  );

  return (
    <TableFilterContainer
      title={title}
      onCancel={onCancel}
      onConfirm={confirmHandler}
    >
      {withSearch && (
        <TextField
          value={searchValue}
          onChange={({ value }) => setSearchValue(value)}
          leftSide={IconSearchStroked}
          size="s"
          placeholder="Найти в списке"
          width="full"
          className={cnTextFilter('Searchbar')}
        />
      )}
      <div className={cnTextFilter('Controls')}>
        <Button
          size="m"
          type="button"
          form="brick"
          label="Выбрать все"
          view="clear"
          onClick={setAll}
          disabled={!filteredItems.length || isAllSelected}
        />
        <Button
          size="m"
          form="brick"
          type="button"
          label="Сбросить"
          view="clear"
          onClick={resetHandler}
          disabled={!filteredItems.length || !isSelected}
        />
      </div>
      <div className={cnTextFilter('Checkboxes')}>
        {filteredItems.length ? (
          <CheckboxGroup
            items={filteredItems}
            value={checkboxGroupValue}
            getItemLabel={(item) => item.name}
            onChange={({ value }) => {
              setCheckboxGroupValue(value);
            }}
            name="checkboxGroup"
          />
        ) : (
          <Text lineHeight="2xs">{emptySearchText}</Text>
        )}
      </div>
    </TableFilterContainer>
  );
};
