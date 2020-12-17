import { useState } from 'react';

import { isDefined } from '../../utils/type-guards';

import { RowField, TableColumn, TableRow } from './Table';

export type Filters<T extends TableRow> = Array<{
  id: string;
  name: string;
  field: RowField<T>;
  filterer: (value: any) => boolean;
}>;

export type SortByProps<T extends TableRow> = {
  sortingBy: keyof T;
  sortOrder: 'asc' | 'desc';
};

export type onSortBy<T extends TableRow> = (props: SortByProps<T> | null) => void;

export type FieldSelectedValues = string[];

export type SelectedFilters = { [field: string]: FieldSelectedValues | undefined };

type SelectedFiltersList = Array<{
  id: string;
  name: string;
}>;

export const getOptionsForFilters = <T extends TableRow>(
  filters: Filters<T>,
  field: RowField<T>,
): { value: string; label: string }[] => {
  return filters
    .filter(({ field: filterField }) => filterField === field)
    .map(({ id, name }) => ({ value: id, label: name }));
};

export const getSelectedFiltersInitialState = <T extends TableRow>(
  filters?: Filters<T>,
): SelectedFilters => {
  if (!filters) {
    return {};
  }

  return filters.reduce<SelectedFilters>((fieldAcc, fieldCur) => {
    if (!fieldAcc[fieldCur.field]) {
      return {
        ...fieldAcc,
        [fieldCur.field]: [],
      };
    }

    return fieldAcc;
  }, {});
};

export const fieldFiltersPresent = <T extends TableRow>(
  tableFilters: Filters<T>,
  field: RowField<T>,
): boolean => {
  return tableFilters.some(({ field: filterField }) => filterField === field);
};

export const isSelectedFiltersPresent = (selectedFilters: SelectedFilters): boolean => {
  return Object.values(selectedFilters).some(
    (filterGroup) => filterGroup && filterGroup.length > 0,
  );
};

export const getSelectedFiltersList = <T extends TableRow>({
  filters,
  selectedFilters,
  columns,
}: {
  filters: Filters<T>;
  selectedFilters: SelectedFilters;
  columns: Array<TableColumn<T>>;
}): SelectedFiltersList => {
  return columns.reduce<SelectedFiltersList>((acc, cur) => {
    const currentFieldFilters = selectedFilters[cur.accessor] || [];
    let orderedFilters: SelectedFiltersList = [];

    if (currentFieldFilters.length) {
      orderedFilters = currentFieldFilters
        .map((filter) => {
          const option = filters.find(({ id: filterId }) => filterId === filter);

          return option
            ? {
                id: option.id,
                name: option.name,
              }
            : undefined;
        })
        .filter(isDefined);
    }

    return currentFieldFilters.length ? [...acc, ...orderedFilters] : acc;
  }, []);
};

export const filterTableData = <T extends TableRow>({
  data,
  filters,
  selectedFilters,
}: {
  data: T[];
  filters: Filters<T>;
  selectedFilters: SelectedFilters;
}): T[] => {
  const mutableFilteredData = [];

  for (const row of data) {
    const columnNames = Object.keys(row);
    let rowIsValid = true;

    for (const columnName of columnNames) {
      const columnFilters = selectedFilters[columnName];

      if (columnFilters && columnFilters.length) {
        let cellIsValid = false;

        for (const filterId of columnFilters) {
          const filter = filters.find(({ id }) => id === filterId);
          const cellContent = row[columnName];

          if (filter && filter.filterer(cellContent)) {
            cellIsValid = true;
            break;
          }
        }

        if (!cellIsValid) {
          rowIsValid = false;
        }
      }

      if (!rowIsValid) {
        break;
      }
    }

    if (rowIsValid) {
      mutableFilteredData.push(row);
    }
  }

  return mutableFilteredData;
};

/* istanbul ignore next */
export const useSelectedFilters = <T extends TableRow>(
  filters?: Filters<T>,
  onFiltersUpdated?: (filters: SelectedFilters) => void,
): {
  selectedFilters: SelectedFilters;
  updateSelectedFilters: (field: string, tooltipSelectedFilters: FieldSelectedValues) => void;
  removeOneSelectedFilter: (availableFilters: Filters<T>, filter: string) => void;
  removeAllSelectedFilters: (availableFilters: Filters<T>) => void;
} => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    getSelectedFiltersInitialState(filters),
  );

  const updateSelectedFilters = (
    field: string,
    tooltipSelectedFilters: FieldSelectedValues,
  ): void => {
    const newSelectedFilters = {
      ...selectedFilters,
      [field]: [...tooltipSelectedFilters],
    };

    setSelectedFilters(newSelectedFilters);
    onFiltersUpdated && onFiltersUpdated(newSelectedFilters);
  };

  const removeOneSelectedFilter = (availableFilters: Filters<T>, filter: string): void => {
    const filterToDelete = availableFilters.find(({ id }) => id === filter);

    if (filterToDelete) {
      updateSelectedFilters(
        filterToDelete.field,
        (selectedFilters[filterToDelete.field] || []).filter((f) => f !== filter),
      );
    }
  };

  const removeAllSelectedFilters = (availableFilters: Filters<T>): void => {
    setSelectedFilters(getSelectedFiltersInitialState(availableFilters));
  };

  return {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  };
};
