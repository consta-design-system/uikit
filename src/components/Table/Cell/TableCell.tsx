import './TableCell.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { TableColumn, TableRow } from '../Table';

const cnTableCell = cn('TableCell');

export const verticalAligns = ['top', 'center', 'bottom'] as const;
export type VerticalAlign = typeof verticalAligns[number];
export const horizontalAligns = ['left', 'center', 'right'] as const;
export type HorizontalAlign = typeof horizontalAligns[number];

type Props<T extends TableRow> = {
  column: TableColumn<T> & {
    isSticky?: boolean;
    isResized?: boolean;
    filterable?: boolean;
  };
  onClick?: (e: React.SyntheticEvent) => void;
  onContextMenu?: (e: React.SyntheticEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
  wrap?: 'truncate' | 'break';
  showVerticalShadow?: boolean;
  verticalAlign?: VerticalAlign;
} & (
  | {
      type: 'header';
      isSticky?: boolean;
      isResized?: boolean;
    }
  | {
      type: 'content';
      isClickable?: boolean;
      isBorderTop?: boolean;
      isBorderLeft?: boolean;
    }
  | {
      type: 'resizer';
    }
) &
  React.RefAttributes<HTMLDivElement>;

type TableCell = <T extends TableRow>(
  props: Props<T>,
) => React.ReactElement | null;

const getCellClasses = <T extends TableRow>(props: Props<T>): string => {
  const { column, showVerticalShadow, className } = props;

  return cnTableCell(
    {
      showVerticalShadow,
      isSticky: column.isSticky,
      isResized: props.type === 'header' ? props.isResized : column.isResized,
      isSortable: column.sortable,
      isHeader: props.type === 'header',
      isResizer: props.type === 'resizer',
      stickyOnTop:
        (props.type === 'header' && props.isSticky) || props.type === 'resizer',
      stickyOnLeft: column.isSticky,
      isFilterable: column.filterable,
      isControl: Boolean(column.control),
      withoutBorder: props.type === 'resizer',
      isClickable: 'isClickable' in props && props.isClickable,
      isBorderTop: 'isBorderTop' in props && props.isBorderTop,
      isBorderLeft: 'isBorderLeft' in props && props.isBorderLeft,
    },
    [className],
  );
};

const getWrapperClasses = <T extends TableRow>(props: Props<T>): string => {
  const { column, wrapperClassName } = props;

  return cnTableCell(
    'Wrapper',
    {
      withoutPadding: column.withoutPadding || props.type === 'resizer',
      verticalAlign: props.verticalAlign,
      horizontalAlign: column.align,
      isHeader: props.type === 'header',
      wrap: props.wrap,
    },
    [wrapperClassName],
  );
};

export const TableCell: TableCell = React.forwardRef((props, ref) => {
  const { style, onClick, onContextMenu, children } = props;

  const propsWithRole = onClick
    ? {
        role: 'button',
        onClick,
      }
    : {
        role: 'cell',
      };

  return (
    <div
      {...propsWithRole}
      onContextMenu={onContextMenu}
      ref={ref}
      className={getCellClasses(props)}
      style={style}
    >
      <div className={getWrapperClasses(props)}>{children}</div>
    </div>
  );
});
