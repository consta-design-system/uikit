import './Pagination.variants.css';

import { useBoolean, useNumber, useSelect } from '@consta/stand';
import React, { useMemo } from 'react';

import { cn } from '../../../utils/bem';
import { Pagination } from '../Pagination';
import {
  PaginationPropArrow,
  paginationPropForm,
  paginationPropFormDefault,
  PaginationPropHotKey,
  paginationPropSize,
  paginationPropSizeDefault,
  paginationPropType,
} from '../types';

const cnPaginationVariants = cn('PaginationVariants');

const Variants = () => {
  const form = useSelect('form', paginationPropForm, paginationPropFormDefault);
  const size = useSelect('size', paginationPropSize, paginationPropSizeDefault);
  const type = useSelect('type', paginationPropType, 'default');
  const arrows = useSelect(
    'arrows',
    ['hidden', 'icon', 'icon + label'],
    'hidden',
  );
  const withHotKeys = useBoolean('withHotKeys', true, type === 'default');
  const outerMastArrows = useSelect(
    'outerMastArrows',
    ['hidden', 'icon', 'icon + label'],
    'hidden',
  );
  const showFirstPage = useBoolean(
    'showFirstPage',
    true,
    type === 'default' && outerMastArrows === 'hidden',
  );
  const showLastPage = useBoolean(
    'showLastPage',
    true,
    type === 'default' && outerMastArrows === 'hidden',
  );
  const pages = useNumber('totalPages', 10010);
  const visibleCount = useNumber('visibleCount', 0, type === 'default');

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const hotKeys: [PaginationPropHotKey, PaginationPropHotKey] = [
    {
      label: '← Shift',
      keys: ['Shift', 'ArrowLeft'],
    },
    {
      label: 'Shift →',
      keys: ['Shift', 'ArrowRight'],
    },
  ];

  const arrowsProp: [PaginationPropArrow?, PaginationPropArrow?] =
    useMemo(() => {
      if (arrows === 'hidden') {
        return [false, false];
      }
      if (arrows === 'icon + label') {
        return [{ label: 'Назад' }, { label: 'Вперёд' }];
      }
      return [true, true];
    }, [arrows]);

  const outerMastArrowsProp: [PaginationPropArrow?, PaginationPropArrow?] =
    useMemo(() => {
      if (outerMastArrows === 'hidden') {
        return [false, false];
      }
      if (outerMastArrows === 'icon + label') {
        return [{ label: 'В начало' }, { label: 'В конец' }];
      }
      return [true, true];
    }, [outerMastArrows]);

  return (
    <div className={cnPaginationVariants()}>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        items={pages}
        form={form}
        visibleCount={visibleCount}
        showFirstPage={showFirstPage}
        showLastPage={showLastPage}
        size={size}
        outerMostArrows={outerMastArrowsProp}
        type={type}
        arrows={arrowsProp}
        hotKeys={withHotKeys ? hotKeys : undefined}
      />
    </div>
  );
};

export default Variants;
