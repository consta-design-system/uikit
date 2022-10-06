import React from 'react';

import { Table } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithActiveRowContent = () => {
  const props = useVariants();

  const [activeRow, setActiveRow] = React.useState<string>();

  const handleClickRow = ({ id }: { id?: string }): void => {
    setActiveRow(id);
  };
  return (
    <Table activeRow={{ id: activeRow, onChange: handleClickRow }} {...props} />
  );
};
