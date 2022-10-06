import React from 'react';

import { Table } from '##/components/Table/Table';
import { Text } from '##/components/Text/Text';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithCustomRowsPlaceholder = () => {
  const props = useVariants();
  return (
    <Table
      {...props}
      rows={[]}
      emptyRowsPlaceholder={<Text>Данные не найдены</Text>}
    />
  );
};
