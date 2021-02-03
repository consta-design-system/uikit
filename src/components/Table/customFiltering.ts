import { useState } from 'react';

import { isDefined } from '../../utils/type-guards';

import { RowField, TableRow } from './Table';

export type CustomFilterValue = any;
export type CustomFilterComponentProps = {
  onConfirm: (value: { value: CustomFilterValue; isActive: boolean }) => void;
  onCancel: () => void;
  savedCustomFilterValue: CustomFilterValue;
} & Record<string, unknown>;

type CustomFilter = {
  filterer: (value: any, filterValue: CustomFilterValue) => boolean;
  filterComponent: React.FC<CustomFilterComponentProps>;
  filterComponentProps?: Omit<CustomFilterComponentProps, 'onConfirm' | 'savedCustomFilterValue'>;
  initialValue?: CustomFilterValue;
  externalFiltration?: boolean;
};

export type CustomFilters<T extends TableRow> = { [key in RowField<T>]?: CustomFilter };

type CustomSavedFilter = CustomFilter & {
  value: CustomFilterValue;
  isActive: boolean;
};

export type CustomSavedFilters<T extends TableRow> = {
  [field in RowField<T>]?: CustomSavedFilter;
};

export const getSavedCustomFiltersInitialState = <T extends TableRow>(
  filters?: CustomFilters<T>,
  withInitialValue = true,
): CustomSavedFilters<T> => {
  if (!filters) {
    return {} as CustomSavedFilters<T>;
  }

  return Object.keys(filters).reduce<CustomSavedFilters<T>>((fieldAcc, fieldCur) => {
    if (!fieldAcc[fieldCur]) {
      return {
        ...fieldAcc,
        [fieldCur]: {
          ...filters[fieldCur],
          isActive: withInitialValue ? isDefined(filters[fieldCur]?.initialValue) : false,
          value: withInitialValue ? filters[fieldCur]?.initialValue : undefined,
        },
      };
    }

    return fieldAcc;
  }, {});
};

export const fieldCustomFilterPresent = <T extends TableRow>(
  tableFilters: CustomFilters<T>,
  field: RowField<T>,
): boolean => {
  return Object.keys(tableFilters).includes(field);
};

export const isSomeCustomFilterActive = <T extends TableRow>(
  savedFilters: CustomSavedFilters<T>,
): boolean => {
  return Object.values(savedFilters).some((filter) => filter && filter.isActive);
};

export const useCustomFilters = <T extends TableRow>(
  filters?: CustomFilters<T>,
  onFiltersUpdated?: (filters: CustomSavedFilters<T>) => void,
): {
  savedCustomFilters: CustomSavedFilters<T>;
  updateCustomFilterValue: (
    field: RowField<T>,
    filterValue: { value: CustomFilterValue; isActive: boolean },
  ) => CustomSavedFilters<T>;
  resetCustomFilters: () => void;
} => {
  const [savedCustomFilters, setSavedCustomFilters] = useState<CustomSavedFilters<T>>(
    getSavedCustomFiltersInitialState(filters, true),
  );

  const updateCustomFilterValue = (
    field: RowField<T>,
    updatedFilter: { value: CustomFilterValue; isActive: boolean },
  ): CustomSavedFilters<T> => {
    const newSavedFilters: CustomSavedFilters<T> = {
      ...savedCustomFilters,
      [field]: {
        ...savedCustomFilters[field],
        value: updatedFilter.value,
        isActive: updatedFilter.isActive,
      },
    };

    setSavedCustomFilters(newSavedFilters);
    onFiltersUpdated && onFiltersUpdated(newSavedFilters);

    return newSavedFilters;
  };

  const resetCustomFilters = () => {
    const freshFilters = getSavedCustomFiltersInitialState(filters, false);
    setSavedCustomFilters(freshFilters);
    onFiltersUpdated && onFiltersUpdated(freshFilters);
  };

  return {
    resetCustomFilters,
    savedCustomFilters,
    updateCustomFilterValue,
  };
};
