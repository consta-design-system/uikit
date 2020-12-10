import './Pagination.stories.css';

import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  HotKeys,
  Pagination,
  paginationDefaultForm,
  paginationDefaultPosition,
  paginationDefaultSize,
  paginationDefaultType,
  paginationForms,
  paginationPositions,
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
  position: select('position', paginationPositions, paginationDefaultPosition),
  disabled: boolean('disabled', false),
});

export function Playground() {
  const { pages, form, size, type, position, disabled } = defaultKnobs();
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const hotKeys: HotKeys = {
    prevPage: {
      label: '← Shift',
      values: ['Shift', 'ArrowLeft'],
    },
    nextPage: {
      label: 'Shift →',
      values: ['Shift', 'ArrowRight'],
    },
  };

  const handleChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={cnPaginationStories()}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={pages}
        form={form}
        size={size}
        type={type}
        position={position}
        disabled={disabled}
        hotkeys={hotKeys}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Pagination',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});
