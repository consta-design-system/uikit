import './Pagination.variants.css';

import { useBoolean, useNumber, useSelect } from '@consta/stand';
import React, { useMemo } from 'react';

import { cn } from '../../../utils/bem';
import { Pagination } from '../PaginationCanary';
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
  const pages = useNumber('totalPages', 15);
  const form = useSelect('form', paginationPropForm, paginationPropFormDefault);
  const size = useSelect('size', paginationPropSize, paginationPropSizeDefault);
  const type = useSelect('type', paginationPropType, 'default');
  const showFirstPage = useBoolean('showFirstPage', true, type === 'default');
  const showLastPage = useBoolean('showLastPage', true, type === 'default');
  const visibleCount = useNumber('visibleCount', 7, type === 'default');

  const withOuterMastArrows = useBoolean('withOuterMastArrows', true);
  const arrowsType = useSelect(
    'arrowsType',
    ['withHotkey', 'icon', 'hidden'],
    'withHotkey',
  );

  const [currentPage, setCurrentPage] = React.useState<number>(14);

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

  const arrows: [PaginationPropArrow?, PaginationPropArrow?] = useMemo(() => {
    if (arrowsType === 'hidden') {
      return [false, false];
    }
    if (arrowsType === 'withHotkey') {
      return [{ label: 'Назад' }, { label: 'Вперёд' }];
    }
    return [true, true];
  }, [arrowsType]);

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
        outerMostArrows={withOuterMastArrows ? [true, true] : undefined}
        type={type}
        arrows={arrows}
        hotKeys={hotKeys}
      />
    </div>
  );
};

export default Variants;
