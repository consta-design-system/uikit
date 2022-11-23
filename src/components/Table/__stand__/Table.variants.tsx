import './TableVariants.css';

import { useSelect } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { TableVariantBasic } from './variants/TableVariantBasic/TableVariantBasic';
import { TableVariantCustomRows } from './variants/TableVariantCustomRows/TableVariantCustomRows';
import { TableVariantSortByData } from './variants/TableVariantSortByData/TableVariantSortByData';
import { TableVariantWithActiveRowContent } from './variants/TableVariantWithActiveRowContent/TableVariantWithActiveRowContent';
import { TableVariantWithBagde } from './variants/TableVariantWithBagde/TableVariantWithBagde';
import { TableVariantWithBigData } from './variants/TableVariantWithBigData/TableVariantWithBigData';
import { TableVariantWithCheckboxHeader } from './variants/TableVariantWithCheckboxHeader/TableVariantWithCheckboxHeader';
import { TableVariantWithCollapcingRows } from './variants/TableVariantWithCollapcingRows/TableVariantWithCollapcingRows';
import { TableVariantWithColSpan } from './variants/TableVariantWithColSpan/TableVariantWithColSpan';
import { TableVariantWithCustomFilters } from './variants/TableVariantWithCustomFilters/TableVariantWithCustomFilters';
import { TableVariantWithCustomRowsPlaceholder } from './variants/TableVariantWithCustomRowsPlaceholder/TableVariantWithCustomRowsPlaceholder';
import { TableVariantWithCustomTagLabelFunction } from './variants/TableVariantWithCustomTagLabelFunction/TableVariantWithCustomTagLabelFunction';
import { TableVariantWithGetAdditionalClassName } from './variants/TableVariantWithGetAdditionalClassName/TableVariantWithGetAdditionalClassName';
import { TableVariantWithHandleCellClickExample } from './variants/TableVariantWithHandleCellClickExample/TableVariantWithHandleCellClickExample';
import { TableVariantWithHiddenColumn } from './variants/TableVariantWithHiddenColumn/TableVariantWithHiddenColumn';
import { TableVariantWithIcon } from './variants/TableVariantWithIcon/TableVariantWithIcon';
import { TableVariantWithMergedByCustomCallbackCells } from './variants/TableVariantWithMergedByCustomCallbackCells/TableVariantWithMergedByCustomCallbackCells';
import { TableVariantWithMergedCells } from './variants/TableVariantWithMergedCells/TableVariantWithMergedCells';
import { TableVariantWithMultiLevelHeaders } from './variants/TableVariantWithMultiLevelHeaders/TableVariantWithMultiLevelHeaders';
import { TableVariantWithOnRowHover } from './variants/TableVariantWithOnRowHover/TableVariantWithOnRowHover';
import { TableVariantWithRowActions } from './variants/TableVariantWithRowActions/TableVariantWithRowActions';
import { TableVariantWithStickyColumn } from './variants/TableVariantWithStickyColumn/TableVariantWithStickyColumn';
import { TableVariantWithStickyHeader } from './variants/TableVariantWithStickyHeader/TableVariantWithStickyHeader';

export const cnTableVariants = cn('TableVariants');

export const variantTypes = [
  'обычная',
  'с рендером ячеек',
  'с разворачиванием строк',
  'с многоуровневым заголовком',
  'с выбором строки',
  'с зафиксированным заголовком',
  'с зафиксированной колонкой',
  'с Bagde',
  'с дополнительным классом',
  'с чекбоксом в шапке',
  'со своим текстом, если данных нет',
  'с большим количеством строк',
  'сортировка по времени',
  'с наведением на строку',
  'с объединёнными ячейками',
  'с ячейками, объединёнными кастомной функцией',
  'с кастомными фильтрами',
  'со своей функцией переименования тега в фильтре',
  'с добавлением/удалением строк',
  'с дополнительным элементом в заголовке',
  'с обработкой клика по ячейке',
  'со скрытыми колонками',
  'с объединеными по горизонтали ячейками',
] as const;

const Variants = () => {
  const type = useSelect('Пример таблицы', [...variantTypes], variantTypes[0]);

  if (type === 'обычная') {
    return <TableVariantBasic />;
  }

  if (type === 'с рендером ячеек') {
    return <TableVariantCustomRows />;
  }

  if (type === 'с разворачиванием строк') {
    return <TableVariantWithCollapcingRows />;
  }

  if (type === 'с многоуровневым заголовком') {
    return <TableVariantWithMultiLevelHeaders />;
  }

  if (type === 'с выбором строки') {
    return <TableVariantWithActiveRowContent />;
  }

  if (type === 'с зафиксированным заголовком') {
    return <TableVariantWithStickyHeader />;
  }

  if (type === 'с зафиксированной колонкой') {
    return <TableVariantWithStickyColumn />;
  }

  if (type === 'с Bagde') {
    return <TableVariantWithBagde />;
  }

  if (type === 'с дополнительным классом') {
    return <TableVariantWithGetAdditionalClassName />;
  }

  if (type === 'с чекбоксом в шапке') {
    return <TableVariantWithCheckboxHeader />;
  }

  if (type === 'со своим текстом, если данных нет') {
    return <TableVariantWithCustomRowsPlaceholder />;
  }

  if (type === 'с большим количеством строк') {
    return <TableVariantWithBigData />;
  }

  if (type === 'сортировка по времени') {
    return <TableVariantSortByData />;
  }

  if (type === 'с наведением на строку') {
    return <TableVariantWithOnRowHover />;
  }

  if (type === 'с объединёнными ячейками') {
    return <TableVariantWithMergedCells />;
  }

  if (type === 'с ячейками, объединёнными кастомной функцией') {
    return <TableVariantWithMergedByCustomCallbackCells />;
  }

  if (type === 'с кастомными фильтрами') {
    return <TableVariantWithCustomFilters />;
  }

  if (type === 'со своей функцией переименования тега в фильтре') {
    return <TableVariantWithCustomTagLabelFunction />;
  }

  if (type === 'с добавлением/удалением строк') {
    return <TableVariantWithRowActions />;
  }

  if (type === 'с дополнительным элементом в заголовке') {
    return <TableVariantWithIcon />;
  }

  if (type === 'с обработкой клика по ячейке') {
    return <TableVariantWithHandleCellClickExample />;
  }

  if (type === 'с объединеными по горизонтали ячейками') {
    return <TableVariantWithColSpan />;
  }

  return <TableVariantWithHiddenColumn />;
};

export default Variants;
