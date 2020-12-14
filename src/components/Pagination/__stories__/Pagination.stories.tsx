import './Pagination.stories.css';

import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Pagination,
  paginationDefaultForm,
  paginationDefaultSize,
  paginationDefaultType,
  paginationForms,
  paginationSizes,
  paginationTypes,
} from '../Pagination';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './Pagination.mdx';

const cnPaginationStories = cn('PaginationStories');

const defaultKnobs = () => ({
  pages: number('totalPages', 10),
  form: select('form', paginationForms, paginationDefaultForm),
  size: select('size', paginationSizes, paginationDefaultSize),
  type: select('type', paginationTypes, paginationDefaultType),
  disabled: boolean('disabled', false),
});

export function Playground() {
  const { pages, form, size, type, disabled } = defaultKnobs();
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  return (
    <div className={cnPaginationStories()}>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => setCurrentPage(number)}
        totalPages={pages}
        form={form}
        size={size}
        type={type}
        disabled={disabled}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Components|/Pagination',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
