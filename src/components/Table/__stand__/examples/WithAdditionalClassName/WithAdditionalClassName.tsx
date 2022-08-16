import './WithAdditionalClassName.css';

import React from 'react';

import { cn } from '##/utils/bem';

import { Table, TableProps, TableRow } from '../../../Table';

const cnTableStories = cn('TableStories');

const WithAdditionalClassName = <T extends TableRow>(props: TableProps<T>) => {
  return (
    <div className={cnTableStories()}>
      <Table {...props} size="m" />
    </div>
  );
};

export default WithAdditionalClassName;
