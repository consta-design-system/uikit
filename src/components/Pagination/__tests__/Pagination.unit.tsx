import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Pagination } from '../Pagination';
import { cnPaginationArrow } from '../PaginationArrow';
import { cnPaginationItem } from '../PaginationItem';

createRoot();
clearStack();

const testId = 'Pagination';

type PaginationProps = React.ComponentProps<typeof Pagination>;

const renderComponent = (ctx: TestContext, props: PaginationProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault} style={{ width: 1000 }}>
          <Pagination {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
};

const queryRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  );
};

const getAllPageButtons = (ctx: TestContext, tagName = 'button') => {
  const render = getRender(ctx);
  return render.querySelectorAll(`${tagName}.${cnPaginationItem()}`);
};

const getPage = (ctx: TestContext, index: number, tagName?: string) => {
  const buttons = getAllPageButtons(ctx, tagName);
  return buttons[index];
};

const getAllArrowButtons = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnPaginationArrow()}`);
};

const getLeftArrow = (ctx: TestContext) => {
  const arrows = getAllArrowButtons(ctx);
  return arrows[0];
};

const getRightArrow = (ctx: TestContext) => {
  const arrows = getAllArrowButtons(ctx);
  return arrows[1];
};

const getPageInput = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelector('input') as HTMLInputElement;
};

describe('Компонент Pagination', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe('проверка items', () => {
    test('при items=0 компонент Pagination не отображается', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: 0 });

        expect(queryRender(ctx)).not.toBeInTheDocument();
      }));

    test('visibleCount ограничивает количество страниц', (ctx) =>
      context.start(async () => {
        const items = 10;
        const visibleCount = 3;
        renderComponent(ctx, { items, visibleCount });

        expect(getAllPageButtons(ctx).length).toBe(visibleCount);
      }));

    test('showFirstPage отображает кнопку первой страницы', (ctx) =>
      context.start(async () => {
        const items = 20;
        const visibleCount = 5;
        renderComponent(ctx, {
          items,
          visibleCount,
          value: 10,
          showFirstPage: true,
        });

        // кнопки 1 ... 10 11 12
        expect(getPage(ctx, 0)).toHaveTextContent('1');
      }));

    test('showLastPage отображает кнопку последней страницы', (ctx) =>
      context.start(async () => {
        const items = 20;
        const visibleCount = 5;
        renderComponent(ctx, {
          items,
          visibleCount,
          value: 10,
          showLastPage: true,
        });

        // кнопки 8 9 10 ... 20
        expect(getPage(ctx, 4)).toHaveTextContent('20');
      }));
  });

  describe('проверка arrows', () => {
    test('не отображаются по-умолчанию', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: 5 });

        expect(getAllArrowButtons(ctx).length).toBe(0);
      }));

    test('отображаются, если передать [true, true]', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: 5, arrows: [true, true] });

        expect(getLeftArrow(ctx)).toBeInTheDocument();
        expect(getRightArrow(ctx)).toBeInTheDocument();
      }));

    test('отображаются с кастомным текстом', (ctx) =>
      context.start(async () => {
        const prevLabel = 'Назад';
        const nextLabel = 'Вперед';
        renderComponent(ctx, {
          items: 5,
          arrows: [{ label: prevLabel }, { label: nextLabel }],
        });

        expect(getLeftArrow(ctx)).toHaveTextContent(prevLabel);
        expect(getRightArrow(ctx)).toHaveTextContent(nextLabel);
      }));

    test('клик по стрелке "вперед" меняет страницу', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 5,
          value: 1,
          onChange: handleChange,
          arrows: [true, true],
        });

        const nextArrow = getRightArrow(ctx);
        fireEvent.click(nextArrow);
        expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
      }));

    test('клик по стрелке "назад" меняет страницу', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 5,
          value: 2,
          onChange: handleChange,
          arrows: [true, true],
        });

        const prevArrow = getLeftArrow(ctx);
        fireEvent.click(prevArrow);
        expect(handleChange).toHaveBeenCalledWith(1, expect.any(Object));
      }));

    test('стрелка "назад" заблокирована на первой странице', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: 5, value: 1, arrows: [true, true] });

        expect(getLeftArrow(ctx)).toBeDisabled();
      }));

    test('стрелка "вперед" заблокирована на последней странице', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: 5, value: 5, arrows: [true, true] });

        expect(getRightArrow(ctx)).toBeDisabled();
      }));
  });

  describe('проверка onChange', () => {
    test('клик по странице вызывает onChange', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 5,
          value: 1,
          visibleCount: 5,
          onChange: handleChange,
        });

        const pageButton = getPage(ctx, 1);
        fireEvent.click(pageButton);
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
      }));

    test('клик по активной странице не вызывает onChange', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 5,
          value: 1,
          visibleCount: 5,
          onChange: handleChange,
        });

        const pageButton = getPage(ctx, 0);
        fireEvent.click(pageButton);
        expect(handleChange).not.toHaveBeenCalled();
      }));
  });

  describe('проверка outerMostArrows', () => {
    test('переходит на последнюю страницу при клике стрелки последней страницы', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 10,
          value: 1,
          visibleCount: 5,
          outerMostArrows: [true, true],
          onChange: handleChange,
        });

        const nextArrow = getRightArrow(ctx);
        fireEvent.click(nextArrow);
        expect(handleChange).toHaveBeenCalledWith(10, expect.any(Object));
      }));

    test('переходит на первую страницу при клике стрелки первой страницы', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 10,
          value: 9,
          visibleCount: 5,
          outerMostArrows: [true, true],
          onChange: handleChange,
        });

        const leftArrow = getLeftArrow(ctx);
        fireEvent.click(leftArrow);
        expect(handleChange).toHaveBeenCalledWith(1, expect.any(Object));
      }));
  });

  describe('проверка type="input"', () => {
    test('отображает инпут', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: 10,
          type: 'input',
        });

        expect(getPageInput(ctx)).toBeInTheDocument();
      }));

    test('вызывает onChange при клике стрелок вверх/вниз на клавиатуре', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: 10,
          value: 1,
          type: 'input',
          onChange: handleChange,
        });

        const pageInput = getPageInput(ctx);
        fireEvent.keyDown(pageInput, { key: 'ArrowUp' });
        fireEvent.keyDown(pageInput, { key: 'Enter' });
        expect(handleChange).toHaveBeenCalledWith(2, expect.any(Object));
        fireEvent.keyDown(pageInput, { key: 'ArrowDown' });
        fireEvent.keyDown(pageInput, { key: 'Enter' });
        expect(handleChange).toHaveBeenCalledWith(1, expect.any(Object));
      }));
  });

  test('getItemAs и getItemAttributes должны работать', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items: 5,
        visibleCount: 5,
        getItemAs: () => 'a',
        getItemAttributes: (item) => ({ href: `#${item.key}` }),
      });

      const pageButton = getPage(ctx, 0, 'a');
      expect(pageButton?.tagName).toBe('A');
      expect(pageButton).toHaveAttribute('href', '#1');
    }));

  test('должен устанавливать кастомный className', (ctx) =>
    context.start(async () => {
      const className = 'my-custom-class';
      renderComponent(ctx, { items: 5, className });

      expect(getRender(ctx)).toHaveClass(className);
    }));
});

describe('проверка hotKeys', () => {
  test('переключает страницу при клике на hotkey', (ctx) =>
    context.start(async () => {
      const onChange = vi.fn();
      renderComponent(ctx, {
        items: 10,
        value: 1,
        visibleCount: 5,
        arrows: [true, true],
        onChange,
        hotKeys: [
          { label: 'влево', keys: ['ArrowLeft'] },
          { label: 'вправо', keys: ['ArrowRight'] },
        ],
      });

      fireEvent.keyDown(document, { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith(2, expect.any(Object));
    }));

  test('переключает страницу при клике на hotkey влево', (ctx) =>
    context.start(async () => {
      const onChange = vi.fn();
      renderComponent(ctx, {
        items: 5,
        value: 5,
        visibleCount: 5,
        arrows: [true, true],
        onChange,
        hotKeys: [
          { label: 'влево', keys: ['ArrowLeft'] },
          { label: 'вправо', keys: ['ArrowRight'] },
        ],
      });

      fireEvent.keyDown(document, { key: 'ArrowLeft' });

      expect(onChange).toHaveBeenCalledWith(4, expect.any(Object));
    }));
});
