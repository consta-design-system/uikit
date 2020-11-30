import './Pagination.css';

import React from 'react';

import { IconArrowLeft } from '../../icons/IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../utils/bem';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { TextField, TextFieldOnChangeArguments } from '../TextField/TextField';

import { getPaginationInfo } from './helpers';

export const paginationForms = ['default', 'round', 'brick'] as const;
export type PaginationPropForm = typeof paginationForms[number];
export const paginationDefaultForm: PaginationPropForm = 'default';

export const paginationSizes = ['xs', 's', 'm', 'l'] as const;
export type PaginationPropSize = typeof paginationSizes[number];
export const paginationDefaultSize: PaginationPropSize = 'm';

export const paginationTypes = ['default', 'input'] as const;
export type PaginationPropType = typeof paginationTypes[number];
export const paginationDefaultType: PaginationPropType = 'default';

export const cnPagination = cn('Pagination');

type Props = {
  currentPage: number;
  totalPages: number;
  onChangePage: (pageNumber: number) => void | null;
  form?: PaginationPropForm;
  size?: PaginationPropSize;
  type?: PaginationPropType;
  disabled?: boolean;
  className?: string;
};

type Pagination = (props: Props) => React.ReactElement | null;

export const Pagination: Pagination = (props) => {
  const {
    currentPage = 0,
    totalPages = 0,
    onChangePage = null,
    form = paginationDefaultForm,
    size = paginationDefaultSize,
    type = paginationDefaultType,
    disabled = false,
    className,
    ...otherProps
  } = props;
  if (!totalPages) return null;
  const currPage = currentPage + 1;
  const { prevPage, nextPage, isStartDots, isEndDots, pages, isEmpty } = getPaginationInfo(
    currPage,
    totalPages,
  );

  const handleClick = (page: number | null) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (page && page !== currPage && onChangePage) {
      onChangePage(page - 1);
    }
  };

  const handleChange = (args: TextFieldOnChangeArguments) => {
    const { value } = args;
    const pageNumber = Number(value);

    if (pageNumber > totalPages || Number.isNaN(pageNumber)) return;

    if (onChangePage) {
      onChangePage(pageNumber - 1);
    }
  };

  return (
    (!isEmpty && (
      <nav className={cnPagination({ form, size }, [className])} {...otherProps}>
        <Button
          className={cnPagination('ItemLeft', { show: currPage > 1 })}
          onlyIcon
          iconLeft={IconArrowLeft}
          view="clear"
          form={form}
          size={size}
          disabled={disabled}
          onClick={handleClick(prevPage)}
        />
        {type === paginationDefaultType ? (
          <div className={cnPagination('Pages')}>
            {isStartDots && (
              <Button
                className={cnPagination('Item')}
                label="1"
                view={currPage === 1 ? 'primary' : 'clear'}
                form={form}
                size={size}
                disabled={disabled}
                onClick={handleClick(1)}
              />
            )}
            {isStartDots && (
              <Text
                size={size}
                view={disabled ? 'ghost' : 'linkMinor'}
                className={cnPagination('More')}
              >
                ...
              </Text>
            )}
            {pages.map((page) => (
              <Button
                key={page}
                className={cnPagination('Item')}
                label={page}
                view={currPage === page ? 'primary' : 'clear'}
                form={form}
                size={size}
                disabled={disabled}
                onClick={handleClick(page)}
              />
            ))}
            {isEndDots && (
              <Text
                size={size}
                view={disabled ? 'ghost' : 'linkMinor'}
                className={cnPagination('More')}
              >
                ...
              </Text>
            )}
            {isEndDots && (
              <Button
                className={cnPagination('Item')}
                label={totalPages}
                view={currPage === totalPages ? 'primary' : 'clear'}
                form={form}
                size={size}
                disabled={disabled}
                onClick={handleClick(totalPages)}
              />
            )}
          </div>
        ) : (
          <div className={cnPagination('Pages')}>
            <TextField
              className={cnPagination('Input')}
              form={form}
              size={size}
              value={currPage.toString()}
              onChange={handleChange}
              disabled={disabled}
            />
            <Text
              size={size}
              view={disabled ? 'ghost' : 'linkMinor'}
              className={cnPagination('Total')}
            >
              из {totalPages}
            </Text>
          </div>
        )}
        <Button
          className={cnPagination('ItemRight', { show: currPage < totalPages })}
          onlyIcon
          iconRight={IconArrowRight}
          view="clear"
          form={form}
          size={size}
          disabled={disabled}
          onClick={handleClick(nextPage)}
        />
      </nav>
    )) ||
    null
  );
};
