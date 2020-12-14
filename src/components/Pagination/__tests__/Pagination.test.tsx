import React from 'react';
import { render, screen } from '@testing-library/react';

import { Pagination } from '../Pagination';

type PaginationProps = React.ComponentProps<typeof Pagination>;

const testId = 'Pagination';
const additionalClass = 'additionalClass';
const currentPage = 0;

const renderComponent = (props: {
  form?: PaginationProps['form'];
  size?: PaginationProps['size'];
  type?: PaginationProps['type'];
  totalPages: PaginationProps['totalPages'];
  currentPage: PaginationProps['currentPage'];
}) => {
  const onChangePage = jest.fn();

  return render(
    <Pagination
      data-testid={testId}
      onChangePage={onChangePage}
      className={additionalClass}
      {...props}
    />,
  );
};

const getRender = () => screen.getByTestId(testId);
const getPages = () => getRender().querySelectorAll('.Pagination-Item');

describe('Компонент Pagination', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({ currentPage, totalPages: 9 })).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка totalPages', () => {
      it('количество совпадает если их 9', () => {
        const pages = 9;
        renderComponent({ currentPage, totalPages: 9 });
        const itemsRender = getPages();
        expect(itemsRender.length).toEqual(pages);
      });

      it('единожды скрывает часть страниц за многоточием', () => {
        const pages = 8;
        renderComponent({ currentPage, totalPages: 10 });
        const itemsRender = getPages();
        expect(itemsRender.length).toEqual(pages);
      });

      it('дважды скрывает часть страниц за многоточием', () => {
        const pages = 7;
        const currPage = 5;
        renderComponent({ currentPage: currPage, totalPages: 11 });
        const itemsRender = getPages();
        expect(itemsRender.length).toEqual(pages);
      });
    });

    describe('проверка className', () => {
      it(`присвоился дополнительный класс`, () => {
        renderComponent({ currentPage, totalPages: 10 });
        expect(getRender()).toHaveClass(additionalClass);
      });
    });
  });
});
