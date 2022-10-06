import React from 'react';

import {
  CustomIDs,
  partOfTableDataForCustomTagLabelFunction,
} from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';
import { isNotNil } from '##/utils/type-guards';

import { cnTableVariants } from '../../Table.variants';
import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithCustomTagLabelFunction = () => {
  type GetTagLabel = (filterValue: any) => string;

  const tagLabelById: Record<string, GetTagLabel> = {
    [CustomIDs.fullName]: (
      filterValue: Array<{ value: string; name: string }>,
    ) => {
      if (!Array.isArray(filterValue)) {
        return '';
      }

      return filterValue.reduce((fullText, { value }) => {
        // Выводим только первые буквы в отдельных словах, таким образом получим инициалы
        return `${fullText}${fullText.length ? ', ' : ''}${value
          .split(' ')
          .map((str) => str.slice(0, 1))
          .join('')}`;
      }, '');
    },
    [CustomIDs.yearOfRegistration]: (filterValue: {
      min: number;
      max: number;
    }) => {
      let restName = '';
      if (filterValue.min && filterValue.max) {
        restName = `начиная с ${filterValue.min} и заканчивая ${filterValue.max}`;
      } else if (filterValue.min) {
        restName = `начиная с ${filterValue.min}`;
      } else if (filterValue.max) {
        restName = `заканчивая ${filterValue.max}`;
      }

      return restName;
    },
  };
  const props = useVariants(partOfTableDataForCustomTagLabelFunction);
  return (
    <div className={cnTableVariants()}>
      <Table
        {...props}
        getTagLabel={(id, name, filterValue: any) => {
          if (!isNotNil(filterValue)) {
            return name;
          }

          const getTagLabel = tagLabelById[id as keyof typeof CustomIDs];

          return name + getTagLabel(filterValue);
        }}
      />
    </div>
  );
};
