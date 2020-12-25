import './TableCell.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { TableColumn, TableRow } from '../Table';

const cnTableCell = cn('TableCell');

export const verticalAligns = ['top', 'center', 'bottom'] as const;
export type VerticalAlign = typeof verticalAligns[number];
export const horizontalAligns = ['left', 'center', 'right'] as const;
export type HorizontalAlign = typeof horizontalAligns[number];

type Props = {
  column: TableColumn<TableRow> & {
    isSticky?: boolean;
    isResized?: boolean;
    filterable?: boolean;
  };
  onClick?: (e: React.SyntheticEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
  showVerticalShadow?: boolean;
} & (
  | {
      type: 'header';
      isSticky?: boolean;
      isResized?: boolean;
    }
  | {
      type: 'content';
      isClickable?: boolean;
      verticalAlign: VerticalAlign;
      isBorderTop?: boolean;
      isBorderLeft?: boolean;
    }
  | {
      type: 'resizer';
    }
);

const getVerticalAlign = (props: Props): string | undefined => {
  if (props.type === 'header') {
    return 'center';
  }

  return 'verticalAlign' in props ? props.verticalAlign : undefined;
};

const getCellClasses = (props: Props): string => {
  const { column, showVerticalShadow, className } = props;

  return cnTableCell(
    {
      showVerticalShadow,
      isSticky: column.isSticky,
      isResized: props.type === 'header' ? props.isResized : column.isResized,
      isSortable: column.sortable,
      isHeader: props.type === 'header',
      isResizer: props.type === 'resizer',
      stickyOnTop: (props.type === 'header' && props.isSticky) || props.type === 'resizer',
      stickyOnLeft: column.isSticky,
      isFilterable: column.filterable,
      withoutBorder: props.type === 'resizer',
      isClickable: 'isClickable' in props && props.isClickable,
      isBorderTop: 'isBorderTop' in props && props.isBorderTop,
      isBorderLeft: 'isBorderLeft' in props && props.isBorderLeft,
    },
    [className],
  );
};

const getWrapperClasses = (props: Props): string => {
  const { column, wrapperClassName } = props;

  return cnTableCell(
    'Wrapper',
    {
      withoutPadding: column.withoutPadding || props.type === 'resizer',
      verticalAlign: getVerticalAlign(props),
      horizontalAlign: column.align,
    },
    [wrapperClassName],
  );
};

export const TableCell = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { style, onClick, children } = props;

  const propsWithRole = onClick
    ? {
        role: 'button',
        onClick,
      }
    : {
        role: 'cell',
      };

  return (
    <div {...propsWithRole} ref={ref} className={getCellClasses(props)} style={style}>
      <div className={getWrapperClasses(props)}>{children}</div>
    </div>
  );
});
