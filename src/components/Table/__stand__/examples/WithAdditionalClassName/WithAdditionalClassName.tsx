import './WithAdditionalClassName.css';

import React from 'react';

import { Table, TableProps, TableRow } from '../../../Table';
import { cnTableStories } from '../../helpers';

const WithAdditionalClassName = <T extends TableRow>(props: TableProps<T>) => {
  return (
    <div className={cnTableStories()}>
      <Table {...props} size="m" />
    </div>
  );
};

export default WithAdditionalClassName;
