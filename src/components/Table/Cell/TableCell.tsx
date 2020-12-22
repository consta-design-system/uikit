import './TableCell.css';

import React, { Ref } from 'react';

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
  onClick?: () => void;
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

const getVerticalAlign = <T extends TableRow>(props: Props<T>): string | undefined => {
  if (props.type === 'header') {
    return 'center';
  }

  return 'verticalAlign' in props ? props.verticalAlign : undefined;
};

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

const getWrapperClasses = <T extends TableRow>(props: Props<T>): string => {
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

export const TableCell = React.forwardRef(
  <T extends TableRow>(props: React.PropsWithChildren<Props<T>>, ref: Ref<HTMLDivElement>) => {
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
  },
) as <T extends TableRow>(p: Props<T> & { ref?: Ref<HTMLDivElement> }) => React.ReactElement;
