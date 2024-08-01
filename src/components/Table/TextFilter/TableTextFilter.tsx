import './TableTextFilter.css';

import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import React, { useMemo, useState } from 'react';

import { cnMixScrollBar } from '##/mixs/MixScrollBar';

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

const sanitizeRegex = (futureRegex: string): string =>
  futureRegex
    .replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replaceAll(/\$/g, '$$$$');

const intersectArrays = (one: Item[], other: Item[]) =>
  one.filter(({ value: oneValue }) =>
    other.some(({ value: otherValue }) => oneValue === otherValue),
  );

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

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    const regex = new RegExp(sanitizeRegex(searchValue), 'i');

    return items.filter(({ name }) => name.match(regex));
  }, [searchValue, items]);

  const setAll = () => {
    setCheckboxGroupValue(filteredItems);
  };

  const filteredAndChecked = useMemo(
    () => intersectArrays(filteredItems, checkboxGroupValue ?? []),
    [filteredItems, checkboxGroupValue],
  );

  const isAllSelected = useMemo(
    () => filteredItems.length === filteredAndChecked.length,
    [filteredItems, filteredAndChecked],
  );

  const isSelected = useMemo(
    () => filteredAndChecked.length,
    [filteredAndChecked],
  );

  const confirmHandler = () => {
    setSearchValue(null);
    onConfirm(filteredAndChecked);
  };

  const resetHandler = () => {
    setCheckboxGroupValue(null);
  };

  return (
    <TableFilterContainer
      title={title}
      onCancel={onCancel}
      onConfirm={confirmHandler}
    >
      {withSearch && (
        <TextField
          value={searchValue}
          onChange={setSearchValue}
          leftSide={IconSearchStroked}
          size="s"
          placeholder="Найти в списке"
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
      <div className={cnTextFilter('Checkboxes', [cnMixScrollBar()])}>
        {filteredItems.length ? (
          <CheckboxGroup
            items={filteredItems}
            value={checkboxGroupValue}
            getItemLabel={(item) => item.name}
            onChange={setCheckboxGroupValue}
            name="checkboxGroup"
          />
        ) : (
          <Text lineHeight="2xs" view="primary" size="m">
            {emptySearchText}
          </Text>
        )}
      </div>
    </TableFilterContainer>
  );
};
