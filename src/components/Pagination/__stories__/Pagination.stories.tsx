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

import mdx from './Pagination.docs.mdx';

const cnPaginationStories = cn('PaginationStories');

const defaultKnobs = () => ({
  pages: number('totalPages', 10),
  form: select('form', paginationForms, paginationDefaultForm),
  size: select('size', paginationSizes, paginationDefaultSize),
  type: select('type', paginationTypes, paginationDefaultType),
});

export function Playground() {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const { pages, form, size, type } = defaultKnobs();
  const minifiedProp = boolean('minified', false);
  const positionProp = minifiedProp
    ? undefined
    : select('position', paginationPositions, paginationDefaultPosition);

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
        position={positionProp as never}
        minified={minifiedProp}
        hotkeys={hotKeys}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Навигация/Pagination',
  id: 'components/Pagination',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=4861%3A74397',
    },
  },
});
