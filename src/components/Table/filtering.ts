import React from 'react';

import { isDefined } from '../../utils/type-guards';
import { SortByProps, TableColumn, TableRow, ValueOf } from './Table';

export type FilterComponentProps = {
  onConfirm: (value: unknown) => void;
  onCancel: () => void;
  filterValue?: unknown;
} & Record<string, unknown>;

export type Filters<T extends TableRow> = ValueOf<{
  [K in keyof T]: {
    id: string;
    name: string;
    field: K extends string ? K : never;
    filterer(value: any, filterValue?: unknown): boolean;
  } & (
    | { component?: never }
    | {
        component: {
          name: React.FC<FilterComponentProps>;
          props?: Omit<FilterComponentProps, 'onConfirm' | 'filterValue'>;
        };
      }
  );
}>[];

export type onSortBy<T extends TableRow> = (
  props: SortByProps<T> | null,
) => void;

export type FieldSelectedValues = string[];

type SelectedFilter = {
  selected: FieldSelectedValues;
  value?: any;
};

export type SelectedFilters = { [field: string]: SelectedFilter };

type SelectedFiltersList = Array<{
  id: string;
  name: string;
}>;

export const getOptionsForFilters = <T extends TableRow>(
  filters: Filters<T>,
  field: string,
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
        [fieldCur.field]: {
          selected: [],
        },
      };
    }

    return fieldAcc;
  }, {});
};

export const fieldFiltersPresent = <T extends TableRow>(
  tableFilters: Filters<T>,
  field: string,
): boolean => {
  return tableFilters.some(({ field: filterField }) => filterField === field);
};

export const isSelectedFiltersPresent = (
  selectedFilters: SelectedFilters,
): boolean => {
  return Object.values(selectedFilters).some(
    (filterGroup) => filterGroup?.selected!.length > 0,
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
    const currentFieldFilters = selectedFilters[cur.accessor!] || [];
    let orderedFilters: SelectedFiltersList = [];

    if (
      currentFieldFilters.selected &&
      currentFieldFilters.selected.length > 0
    ) {
      orderedFilters = currentFieldFilters
        .selected!.map((filter) => {
          const option = filters.find(
            ({ id: filterId }) => filterId === filter,
          );

          return option
            ? {
                id: option.id,
                name: option.name,
                value: currentFieldFilters.value,
              }
            : undefined;
        })
        .filter(isDefined);
    }

    return orderedFilters.length > 0 ? [...acc, ...orderedFilters] : acc;
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
    const copiedRow = { ...row };

    if (copiedRow.rows?.length) {
      copiedRow.rows = filterTableData({
        data: copiedRow.rows as T[],
        filters,
        selectedFilters,
      });
    }

    const columnNames = Object.keys(copiedRow);
    let rowIsValid = true;

    for (const columnName of columnNames) {
      const columnFilters = selectedFilters[columnName];

      if (columnFilters && columnFilters.selected!.length) {
        let cellIsValid = false;
        const cellContent = copiedRow[columnName as keyof T];

        if (columnFilters.value) {
          const [filterId] = columnFilters.selected;
          const filter = filters.find(({ id }) => id === filterId);

          if (filter!.filterer(cellContent, columnFilters.value)) {
            cellIsValid = true;
          }
        } else {
          for (const filterId of columnFilters.selected!) {
            const filter = filters.find(({ id }) => id === filterId);

            if (columnFilters.value === null) {
              cellIsValid = true;
              break;
            }

            if (filter && filter.filterer(cellContent)) {
              cellIsValid = true;
              break;
            }
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
      mutableFilteredData.push(copiedRow);
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
  updateSelectedFilters: (
    field: string,
    tooltipSelectedFilters: FieldSelectedValues,
    value?: unknown,
  ) => void;
  removeOneSelectedFilter: (
    availableFilters: Filters<T>,
    filter: string,
  ) => void;
  removeAllSelectedFilters: (availableFilters: Filters<T>) => void;
} => {
  const [selectedFilters, setSelectedFilters] = React.useState<SelectedFilters>(
    getSelectedFiltersInitialState(filters),
  );

  const updateSelectedFilters = (
    field: string,
    tooltipSelectedFilters: FieldSelectedValues,
    value?: unknown,
  ): void => {
    const newSelectedFilters = {
      ...selectedFilters,
      [field]: {
        selected: [...tooltipSelectedFilters],
        value,
      },
    };

    setSelectedFilters(newSelectedFilters);
    onFiltersUpdated && onFiltersUpdated(newSelectedFilters);
  };

  const removeOneSelectedFilter = (
    availableFilters: Filters<T>,
    filter: string,
  ): void => {
    const filterToDelete = availableFilters.find(({ id }) => id === filter);

    if (filterToDelete) {
      updateSelectedFilters(
        filterToDelete.field,
        (selectedFilters[filterToDelete.field] || {}).selected?.filter(
          (f) => f !== filter,
        ),
      );
    }
  };

  const removeAllSelectedFilters = (availableFilters: Filters<T>): void => {
    const initialSelectedFilters =
      getSelectedFiltersInitialState(availableFilters);
    setSelectedFilters(initialSelectedFilters);
    onFiltersUpdated && onFiltersUpdated(initialSelectedFilters);
  };

  return {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  };
};
