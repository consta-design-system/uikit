import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnNotification,
  cnNotificationCaption,
  cnNotificationItem,
  groupsByDay,
  Notification,
  NotificationDefaultGroup,
  NotificationDefaultItem,
  NotificationProps,
} from '..';
import {
  defaultGroups,
  defaultItems,
  itemsCustom,
  itemsWithDates,
} from './data';

createRoot();
clearStack();

const testId = 'Notification';

/**
 * Тестовый компонент для рендеринга уведомлений
 * @template ITEM Тип элемента уведомления
 * @template GROUP Тип группы уведомлений
 * @param props Свойства компонента уведомления
 * @returns React-элемент уведомления
 */

/**
 * Рендерит компонент уведомления в тестовом контексте
 * @template ITEM Тип элемента уведомления
 * @template GROUP Тип группы уведомлений
 * @param ctx Тестовый контекст
 * @param props Свойства компонента уведомления
 */
const renderComponent = <
  ITEM = NotificationDefaultItem,
  GROUP = NotificationDefaultGroup,
>(
  ctx: TestContext,
  { ...props }: NotificationProps<ITEM, GROUP>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Notification data-testid={testId} {...props} />
      </reatomContext.Provider>,
    );
  });
};

/**
 * Получает элемент рендеринга уведомления
 * @param ctx Тестовый контекст
 * @returns HTMLElement элемент уведомления
 */
const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

/**
 * Получает все группы уведомлений
 * @param ctx Тестовый контекст
 * @returns NodeList с элементами групп
 */
const getGroups = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll(`.${cnNotification('Group')}`);

/**
 * Получает группу уведомлений по индексу
 * @param ctx Тестовый контекст
 * @param index Индекс группы
 * @returns Элемент группы уведомлений
 */
const getGroup = (ctx: TestContext, index: number) => getGroups(ctx)?.[index];

/**
 * Получает все элементы уведомлений
 * @param ctx Тестовый контекст
 * @returns NodeList с элементами уведомлений
 */
const getItems = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll(`.${cnNotification('Item')}`);

/**
 * Получает элемент уведомления по индексу
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент уведомления
 */
const getItem = (ctx: TestContext, index: number) => getItems(ctx)?.[index];

/**
 * Получает заголовок элемента уведомления
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент заголовка уведомления
 */
const getItemLabel = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnNotificationItem('Title')}`);

/**
 * Получает контент элемента уведомления
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент контента уведомления
 */
const getItemContent = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnNotificationItem('Children')}`);

/**
 * Получает бейдж элемента уведомления
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент бейджа уведомления
 */
const getItemBadge = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnNotificationItem('Badge')}`);

/**
 * Получает подпись элемента уведомления
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент подписи уведомления
 */
const getItemCaption = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnNotificationCaption()}`);

/**
 * Получает аватар элемента уведомления
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент аватара уведомления
 */
const getItemAvatar = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnNotificationItem('Avatar')}`);

/**
 * Получает действия элемента уведомления
 * @param ctx Тестовый контекст
 * @param index Индекс элемента
 * @returns Элемент действий уведомления
 */
const getItemActions = (ctx: TestContext, index: number) =>
  getItem(ctx, index)?.querySelector(`.${cnNotificationItem('Actions')}`);

describe('Компонент Notification', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, {
          items: defaultItems,
        }),
      ).not.toThrow();
    }));

  describe('проверка props', () => {
    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent(ctx, { className, items: defaultItems });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { ref, items: defaultItems });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('проверка style', (ctx) =>
      context.start(async () => {
        const style = { color: 'red' };
        renderComponent(ctx, { style, items: defaultItems });

        expect(getRender(ctx)).toHaveStyle(style);
      }));

    test('рендерит элементы', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItems(ctx)).toHaveLength(defaultItems.length);
      }));

    test('выводит группы из признака', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: itemsWithDates,
          getItemGroup: ({ date }) => groupsByDay(date),
          getGroupLabel: ({ key }) => key.toString(),
        });

        expect(getGroups(ctx)).toHaveLength(2);
      }));

    test('Рендерит группы указанные в groups', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: defaultItems,
          groups: defaultGroups,
        });

        expect(getGroups(ctx)).toHaveLength(defaultGroups.length);
      }));

    test('itemSpace верно работает', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: defaultItems,
          itemSpace: { pT: 'm' },
        });

        expect(getItem(ctx, 0)).toHaveClass('MixSpace_pT_m');
      }));

    test('groupSpace верно работает', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: defaultItems,
          groupSpace: { pT: 'm' },
          groups: defaultGroups,
        });

        expect(getGroup(ctx, 0)).toHaveClass('MixSpace_pT_m');
      }));
  });

  describe('проверка элементов', () => {
    test('рендерит заголовок', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItemLabel(ctx, 0)).toHaveTextContent(defaultItems[0].label);
      }));

    test('рендерит контент', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItemContent(ctx, 0)).toHaveTextContent(
          defaultItems[0]?.content as string,
        );
      }));

    test('рендерит бейджик - непрочитанный', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItemBadge(ctx, 0)).not.toBeInTheDocument();
        expect(getItemBadge(ctx, 1)).toBeInTheDocument();
      }));

    test('рендерит подпись', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItemCaption(ctx, 0)).toHaveTextContent(
          defaultItems[0].caption as string,
        );
      }));

    test('рендерит аватар', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItemAvatar(ctx, 0)).toBeInTheDocument();
        expect(getItemAvatar(ctx, 0)?.querySelector('img')).toHaveAttribute(
          'src',
          defaultItems[0].userImage,
        );
      }));

    test('рендерит действия', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items: defaultItems });

        expect(getItemActions(ctx, 0)).toBeInTheDocument();
      }));
  });

  describe('проверка геттеров', () => {
    test('проверка getItemLabel', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: itemsCustom,
          getItemLabel: (item) => item.name,
        });

        expect(getItemLabel(ctx, 0)).toHaveTextContent(itemsCustom[0].name);
      }));

    test('проверка getItemContent', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: itemsCustom,
          getItemContent: (item) => item.message,
        });

        expect(getItemContent(ctx, 0)).toHaveTextContent(
          itemsCustom[0].message,
        );
      }));

    test('проверка getItemCaption', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: itemsCustom,
          getItemCaption: (item) => item.date.toLocaleDateString(),
        });

        expect(getItemCaption(ctx, 0)).toHaveTextContent(
          itemsCustom[0].date.toLocaleDateString(),
        );
      }));

    test('проверка getItemUserName', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: itemsCustom,
          getItemUserName: (item) => item.name,
        });

        expect(getItemAvatar(ctx, 0)).toBeInTheDocument();
      }));

    test('проверка getItemUserImage', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: itemsCustom,
          getItemUserName: (item) => item.name,
          getItemUserImage: (item) => item.name,
        });

        expect(getItemAvatar(ctx, 0)).toBeInTheDocument();
        expect(getItemAvatar(ctx, 0)?.querySelector('img')).toHaveAttribute(
          'src',
          itemsCustom[0].name,
        );
      }));

    test('проверка getItemActions', (ctx) =>
      context.start(async () => {
        const actions = [
          {
            label: 'Action 1',
            onClick: vi.fn(),
          },
          {
            label: 'Action 2',
            onClick: vi.fn(),
          },
        ];
        renderComponent(ctx, {
          items: itemsCustom,
          getItemActions: () => actions,
        });

        expect(getItemActions(ctx, 0)).toBeInTheDocument();
      }));
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onItemClick при клике на элемент', (ctx) =>
      context.start(async () => {
        const onItemClick = vi.fn();
        renderComponent(ctx, { items: defaultItems, onItemClick });

        fireEvent.click(getItems(ctx)[0]);

        expect(onItemClick).toHaveBeenCalledTimes(1);
      }));
  });
});
