import './Pagination.variants.css';

import { useBoolean, useNumber, useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '../../../utils/bem';
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

const cnPaginationVariants = cn('PaginationVariants');

const Variants = () => {
  const pages = useNumber('totalPages', 5);
  const form = useSelect('form', paginationForms, paginationDefaultForm);
  const size = useSelect('size', paginationSizes, paginationDefaultSize);
  const type = useSelect('type', paginationTypes, paginationDefaultType);

  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const minifiedProp = useBoolean('minified', false);
  const positionProp = useSelect(
    'position',
    paginationPositions,
    paginationDefaultPosition,
  );

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
    <div className={cnPaginationVariants()}>
      <Pagination
        currentPage={currentPage}
        onChange={handleChange}
        totalPages={Number(pages) > 0 ? Number(pages) : 1}
        form={form}
        size={size}
        type={type}
        position={positionProp as never}
        minified={minifiedProp}
        hotkeys={hotKeys}
      />
    </div>
  );
};

export default Variants;
