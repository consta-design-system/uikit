import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
  testSuiteId,
  tick,
} from '##/utils/vitest';

import {
  NotificationActions,
  NotificationActionsDefaultItem,
  NotificationActionsProps,
} from '..';

createRoot();
clearStack();

const testId = 'NotificationActions';

type RenderComponent = <ITEM = NotificationActionsDefaultItem>(
  ctx: TestContext,
  props: NotificationActionsProps<ITEM>,
) => void;

const renderComponent: RenderComponent = (ctx, { ...props }) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <NotificationActions
          data-testid={testId}
          dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          clickOutsideSubscriber={document.getElementById(testSuiteId(ctx))!}
          {...props}
        />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`) as HTMLElement;
const getContextMenu = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLElement;
const getContextMenuItems = (ctx: TestContext) =>
  getContextMenu(ctx)?.querySelectorAll(`.ListItem`);
const getContextMenuItem = (ctx: TestContext, index: number) =>
  getContextMenuItems(ctx)?.[index];
const getButtonLabel = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.Button-Label`) as HTMLElement;

const buttonClick = (ctx: TestContext) => fireEvent.click(getRender(ctx));

/**
 * Тесты для компонента NotificationActions
 * Компонент отображает действия для уведомлений в виде кнопок или контекстного меню
 */
describe('NotificationActions', () => {
  /**
   * Проверяет, что компонент рендерится без ошибок
   */

  test('Компонент рендерится без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {});

      expect(
        document.querySelector(
          `#${testRootId(ctx)} *[data-testid="NotificationActions"]`,
        ),
      ).toBeInTheDocument();
    }));

  /**
   * Тесты для рендера компонента с одним элементом действия
   * В этом случае компонент отображается как обычная кнопка
   */
  describe.concurrent('рендер с одним элементом', () => {
    /**
     * Проверяет, что компонент с одним элементом рендерится как кнопка с текстом
     */
    test('рендерится как кнопка с текстом', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: [{ label: 'test', onClick: vi.fn() }],
        });

        expect(getRender(ctx).textContent).toEqual('test');
      }));

    /**
     * Проверяет, что компонент с одним элементом рендерится как кнопка с текстом и иконкой
     */
    test('рендерится как кнопка с текстом и иконкой', (ctx) =>
      context.start(async () => {
        const IconMock = createIconMock('IconMock');
        renderComponent(ctx, {
          items: [{ label: 'test', icon: IconMock, onClick: vi.fn() }],
        });

        expect(getButtonLabel(ctx).textContent).toEqual('test');
        expect(getRender(ctx).querySelector(`.IconMock`)).toBeInTheDocument();
      }));

    /**
     * Проверяет, что клик по кнопке срабатывает корректно
     */
    test('клик отрабатывает', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, {
          items: [{ label: 'test', icon: createIconMock('IconMock'), onClick }],
        });

        expect(onClick).toHaveBeenCalledTimes(0);
        getRender(ctx).click();
        expect(onClick).toHaveBeenCalledTimes(1);
      }));

    /**
     * Проверяет, что компонент рендерится только с иконкой, когда установлен флаг onlyIcon
     */
    test('рендерится с onlyIcon=true', (ctx) =>
      context.start(async () => {
        const IconMock = createIconMock('IconMock');
        renderComponent(ctx, {
          items: [{ label: 'test', icon: IconMock, onClick: vi.fn() }],
          onlyIcon: true,
        });

        expect(getRender(ctx).querySelector(`.IconMock`)).toBeInTheDocument();
        expect(getButtonLabel(ctx)).not.toBeInTheDocument();
      }));

    /**
     * Проверяет, что className прокидывается в компонент
     */
    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent(ctx, {
          items: [{ label: 'test', onClick: vi.fn() }],
          className,
        });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает className с onlyIcon=true', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent(ctx, {
          items: [{ label: 'test', onClick: vi.fn() }],
          className,
          onlyIcon: true,
        });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    /**
     * Проверяет, что ref прокидывается в компонент
     */
    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLButtonElement>();
        const items = [{ label: 'test', onClick: vi.fn() }];
        renderComponent(ctx, { ref, items });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  /**
   * Тесты для рендера компонента с несколькими элементами действий
   * В этом случае компонент отображается как кнопка с контекстным меню
   */
  describe('рендер с несколькими кнопками', () => {
    /**
     * Проверяет, что контекстное меню открывается по клику на кнопку
     */
    test('Контекстное меню открывается по клику на кнопку', (ctx) =>
      context.start(async () => {
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, { items });

        buttonClick(ctx);
        await wrap(sleep(animateTimeout));

        expect(getContextMenu(ctx)).toBeInTheDocument();
      }));

    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, {
          items,
          className,
        });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLButtonElement>();
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, { ref, items });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));

    /**
     * Проверяет, что контекстное меню закрывается по клику на кнопку
     */

    /**
     * Проверяет, что контекстное меню закрывается по клику вне компонента
     */

    /**
     * Проверяет, что количество кнопок в контекстном меню соответствует количеству переданных элементов
     */
    test('количество кнопок равно количеству переданных', (ctx) =>
      context.start(async () => {
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];

        renderComponent(ctx, { items });

        buttonClick(ctx);
        await wrap(sleep(animateTimeout));

        expect(getContextMenuItems(ctx)).toHaveLength(items.length);
      }));

    /**
     * Проверяет, что текст и иконка кнопок в контекстном меню совпадают с переданными
     */
    test('текст и иконка кнопок совпадает с переданными', (ctx) =>
      context.start(async () => {
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, { items });

        buttonClick(ctx);
        await wrap(sleep(animateTimeout));

        const index = 0;

        expect(getContextMenuItem(ctx, index)).toHaveTextContent(
          items[index].label,
        );
        expect(
          getContextMenuItem(ctx, index).querySelector(`.IconMock1`),
        ).toBeInTheDocument();
      }));

    /**
     * Проверяет, что клик на кнопку в контекстном меню отрабатывает корректно
     */
    test('клик на кнопку отрабатывает', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick,
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, { items });

        buttonClick(ctx);
        await wrap(sleep(animateTimeout));

        const index = 0;
        expect(onClick).toHaveBeenCalledTimes(0);
        fireEvent.click(getContextMenuItem(ctx, index));
        expect(onClick).toHaveBeenCalledTimes(1);
      }));

    test('Контекстное меню закрывается по клику вне компонента', (ctx) =>
      context.start(async () => {
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, { items });

        // Открываем меню
        buttonClick(ctx);
        await wrap(tick());
        await wrap(sleep(animateTimeout));

        // Проверяем, что меню открылось
        expect(getContextMenu(ctx)).toBeInTheDocument();

        // Закрываем меню кликом вне компонента
        fireEvent.mouseDown(getOutside(ctx));
        getOutside(ctx).click();
        await wrap(tick());
        await wrap(sleep(animateTimeout));
        await wrap(sleep(animateTimeout));

        // Проверяем, что меню закрылось
        expect(getContextMenu(ctx)).not.toBeInTheDocument();
      }));

    test('Контекстное меню закрывается по клику на кнопку', (ctx) =>
      context.start(async () => {
        const items = [
          {
            label: 'test1',
            icon: createIconMock('IconMock1'),
            onClick: vi.fn(),
          },
          {
            label: 'test2',
            icon: createIconMock('IconMock2'),
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, { items });

        buttonClick(ctx);
        await wrap(tick());

        await wrap(sleep(animateTimeout));

        // Проверяем, что меню открылось
        expect(getContextMenu(ctx)).toBeInTheDocument();

        // Закрываем меню кликом на кнопку
        buttonClick(ctx);
        await wrap(tick());
        await wrap(sleep(animateTimeout));

        // Проверяем, что меню закрылось
        expect(getContextMenu(ctx)).not.toBeInTheDocument();
      }));
  });
});
