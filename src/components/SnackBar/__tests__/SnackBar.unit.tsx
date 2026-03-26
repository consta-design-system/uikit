import { IconAdd } from '@consta/icons/IconAdd';
import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnSnackBar, SnackBar } from '../SnackBar';
import { cnSnackBarItem } from '../SnackBarItem/SnackBarItem';
import { SnackBarItemDefault, SnackBarProps } from '../types';

createRoot();
clearStack();

const testId = cnSnackBar();

const defaultItems: SnackBarItemDefault[] = [
  {
    key: '1',
  },
];

/**
 * Тестовый компонент для рендеринга SnackBar
 * @param props Свойства компонента SnackBar
 * @returns React-элемент SnackBar
 */

/**
 * Рендерит компонент SnackBar в тестовом контексте
 * @param ctx Тестовый контекст
 * @param props Свойства компонента SnackBar
 */
const renderComponent = ({
  ctx,
  ...props
}: { ctx: TestContext } & SnackBarProps<SnackBarItemDefault>) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <SnackBar data-testid={testId} {...props} />
      </reatomContext.Provider>,
    );
  });
};

/**
 * Получает элемент рендеринга SnackBar
 * @param ctx Тестовый контекст
 * @returns HTMLElement элемент SnackBar
 */
const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

/**
 * Получает все элементы SnackBarItem
 * @param ctx Тестовый контекст
 * @returns NodeList с элементами SnackBarItem
 */
const getItems = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll(`.${cnSnackBarItem()}`);

/**
 * Получает элемент SnackBarItem по индексу
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент SnackBarItem
 */
const getItem = (ctx: TestContext, index: number) => getItems(ctx)?.[index];

/**
 * Получает сообщение элемента SnackBarItem
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент сообщения SnackBarItem
 */
const getItemMessage = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnSnackBarItem('Message')}`);

/**
 * Получает иконку элемента SnackBarItem
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент иконки SnackBarItem
 */
const getItemIcon = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnSnackBarItem('Icon')}`);

/**
 * Получает кнопку действия элемента SnackBarItem
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент кнопки действия SnackBarItem
 */
const getItemActionButton = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector('.SnackBarActionButton');

/**
 * Получает кнопку закрытия элемента SnackBarItem
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент кнопки закрытия SnackBarItem
 */
const getItemCloseButton = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnSnackBarItem('CloseButton')}`);

describe.concurrent('Компонент SnackBar', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent({
          ctx,
          items: defaultItems,
        }),
      ).not.toThrow();
    }));

  test('ref должен быть присвоен', (ctx) =>
    context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ctx, items: defaultItems, ref });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender(ctx));
    }));

  describe.concurrent('проверка items', () => {
    describe.concurrent('массив рендериться верно', () => {
      test('количество совпадает с передаваемым', (ctx) =>
        context.start(async () => {
          const items: SnackBarItemDefault[] = [
            {
              key: '1',
            },
            {
              key: '2',
            },
            {
              key: '3',
            },
          ];

          renderComponent({ ctx, items });

          expect(getItems(ctx)).toHaveLength(items.length);
        }));
    });

    describe.concurrent('проверка message', () => {
      test('отображает текст сообщения', (ctx) =>
        context.start(async () => {
          const messageText = 'Сообщение';
          const items: SnackBarProps<SnackBarItemDefault>['items'] = [
            {
              key: '1',
              message: messageText,
            },
          ];

          renderComponent({ ctx, items });

          expect(getItemMessage(ctx, 0)).toHaveTextContent(messageText);
        }));
    });

    describe.concurrent('проверка icon', () => {
      test('отображает иконку', (ctx) =>
        context.start(async () => {
          const items: SnackBarProps<SnackBarItemDefault>['items'] = [
            {
              key: '1',
              icon: IconAdd,
            },
          ];

          renderComponent({ ctx, items });

          expect(getItemIcon(ctx, 0)).toBeInTheDocument();
        }));
    });

    describe.concurrent('проверка actions', () => {
      const actionLabel = 'Действие';
      const handleClick = vi.fn();
      const items: SnackBarProps<SnackBarItemDefault>['items'] = [
        {
          key: '1',
          actions: [
            {
              label: actionLabel,
              onClick: handleClick,
            },
          ],
        },
      ];

      test('отображает кнопку действия', (ctx) =>
        context.start(async () => {
          renderComponent({ ctx, items });

          expect(getItemActionButton(ctx, 0)).toHaveTextContent(actionLabel);
        }));

      test('кнопка действия срабатывает', (ctx) =>
        context.start(async () => {
          renderComponent({ ctx, items });

          fireEvent.click(getItemActionButton(ctx, 0)!);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe.concurrent('проверка onClose', () => {
      const handleClick = vi.fn();
      const items: SnackBarProps<SnackBarItemDefault>['items'] = [
        {
          key: '1',
          onClose: handleClick,
        },
      ];

      test('отображает иконку на кнопке', (ctx) =>
        context.start(async () => {
          renderComponent({ ctx, items });

          expect(getItemCloseButton(ctx, 0)).toBeInTheDocument();
        }));

      test('кнопка закрытия срабатывает', (ctx) =>
        context.start(async () => {
          renderComponent({ ctx, items });

          fireEvent.click(getItemCloseButton(ctx, 0)!);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe.concurrent('проверка autoClose', () => {
      test('срабатывает onClose при autoClose = 1', (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          const items: SnackBarProps<SnackBarItemDefault>['items'] = [
            {
              key: '1',
              autoClose: 1,
              onClose: handleClick,
            },
          ];

          renderComponent({ ctx, items });

          expect(handleClick).not.toHaveBeenCalled();

          await wrap(sleep(1050));

          expect(handleClick).toHaveBeenCalled();
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));

      test('срабатывает onClose при autoClose = true', (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          const items: SnackBarProps<SnackBarItemDefault>['items'] = [
            {
              key: '1',
              autoClose: true,
              onClose: handleClick,
            },
          ];

          renderComponent({ ctx, items });

          expect(handleClick).not.toHaveBeenCalled();

          await wrap(sleep(3050));

          expect(handleClick).toBeCalled();
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));

      test('срабатывает onAutoClose', (ctx) =>
        context.start(async () => {
          const handleClose = vi.fn();
          const handleAutoClose = vi.fn();
          const items: SnackBarProps<SnackBarItemDefault>['items'] = [
            {
              key: '1',
              autoClose: true,
              onClose: handleClose,
              onAutoClose: handleAutoClose,
            },
          ];

          renderComponent({ ctx, items });

          expect(handleClose).not.toBeCalled();
          expect(handleAutoClose).not.toBeCalled();

          await wrap(sleep(3050));

          expect(handleClose).not.toBeCalled();
          expect(handleAutoClose).toBeCalled();
          expect(handleAutoClose).toHaveBeenCalledTimes(1);
        }));
    });
  });
});
