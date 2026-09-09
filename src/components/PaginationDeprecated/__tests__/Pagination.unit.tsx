import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnPagination, Pagination } from '../PaginationDeprecated';

type PaginationProps = React.ComponentProps<typeof Pagination>;

const testId = 'Pagination';
const additionalClass = 'additionalClass';
const currentPage = 0;

const renderComponent = (
  ctx: TestContext,
  props: {
    form?: PaginationProps['form'];
    size?: PaginationProps['size'];
    type?: PaginationProps['type'];
    totalPages: PaginationProps['totalPages'];
    currentPage: PaginationProps['currentPage'];
  },
) => {
  const onChangePage = vi.fn();

  act(() => {
    const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault} style={{ width: 1000 }}>
          <Pagination
            data-testid={testId}
            onChange={onChangePage}
            className={additionalClass}
            {...props}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

const getPages = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnPagination('Item')}`);

createRoot();
clearStack();

describe('Компонент Pagination', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, { currentPage, totalPages: 9 }),
      ).not.toThrow();
    }));

  describe('проверка totalPages', () => {
    test('количество совпадает если их 9', (ctx) =>
      context.start(async () => {
        const pages = 9;
        renderComponent(ctx, { currentPage, totalPages: 9 });
        const itemsRender = getPages(ctx);
        expect(itemsRender.length).toEqual(pages);
      }));

    test('единожды скрывает часть страниц за многоточием', (ctx) =>
      context.start(async () => {
        const pages = 9;
        renderComponent(ctx, { currentPage, totalPages: 20 });
        const itemsRender = getPages(ctx);
        expect(itemsRender.length).toEqual(pages);
      }));

    test('дважды скрывает часть страниц за многоточием', (ctx) =>
      context.start(async () => {
        const pages = 8;
        const currPage = 5;
        renderComponent(ctx, { currentPage: currPage, totalPages: 20 });
        const itemsRender = getPages(ctx);
        expect(itemsRender.length).toEqual(pages);
      }));
  });

  test('присвоился дополнительный класс', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { currentPage, totalPages: 10 });
      expect(getRender(ctx)).toHaveClass(additionalClass);
    }));
});
