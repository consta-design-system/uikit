import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnList, List } from '../ListCanary';
import { cnListGroupLabel } from '../ListGroupLabel';
import { DefaultListGroup, DefaultListItem, ListProps } from '../types';

createRoot();
clearStack();

const testId = cnList();

const renderComponent = (
  ctx: TestContext,
  props: ListProps = { items: [] },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <div data-testid={testId}>
            <List {...props} />
          </div>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLElement;

const getListItems = (ctx: TestContext) =>
  document.querySelectorAll(
    `#${testRootId(ctx)} *[data-testid=${testId}] > .ListItem`,
  ) as unknown as HTMLElement[];

const getListItem = (ctx: TestContext, index: number) =>
  getListItems(ctx)[index];

const getItemIconLeft = (ctx: TestContext, index: number) =>
  getListItem(ctx, index).querySelector(
    `.ListItemGrid-Slot_position_left .icons--Icon`,
  );

const getItemIconRight = (ctx: TestContext, index: number) =>
  getListItem(ctx, index).querySelector(
    `.ListItemGrid-Slot_position_right .icons--Icon`,
  );

const getItemLeftSlot = (ctx: TestContext, index: number) =>
  getListItem(ctx, index).querySelector(`.ListItemGrid-Slot_position_left`);

const getItemRightSlot = (ctx: TestContext, index: number) =>
  getListItem(ctx, index).querySelector(`.ListItemGrid-Slot_position_right`);

const getListGroups = (ctx: TestContext) =>
  document.querySelectorAll(
    `#${testRootId(ctx)} *[data-testid=${testId}] > .ListGroupLabel`,
  ) as unknown as HTMLElement[];

const getListGroup = (ctx: TestContext, index: number) =>
  document.querySelectorAll(
    `#${testRootId(ctx)} *[data-testid=${testId}] > .ListGroupLabel`,
  )[index];

describe.concurrent(`${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, { items: [] });

      expect(() => render()).not.toThrow();
    }));

  test('рендерит список элементов', (ctx) =>
    context.start(async () => {
      const items: DefaultListItem[] = [
        { label: 'Первый' },
        { label: 'Второй' },
        { label: 'Третий' },
      ];

      renderComponent(ctx, { items });

      items.forEach(({ label }, index) => {
        expect(getListItem(ctx, index)).toHaveTextContent(label as string);
      });
    }));

  describe.concurrent('интерактивные элементы', () => {
    test('рендерит список интерактивных элементов', (ctx) =>
      context.start(async () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        const items: DefaultListItem[] = [
          { label: 'Первый', onClick: handler1 },
          { label: 'Второй', onClick: handler2 },
        ];

        renderComponent(ctx, { items });

        const itemNodes = getListItems(ctx);

        fireEvent.click(itemNodes[0]);
        fireEvent.click(itemNodes[1]);

        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);

        expect(handler1).toHaveBeenCalledWith(expect.any(Object));
        expect(handler2).toHaveBeenCalledWith(expect.any(Object));
      }));

    test('disabled отключает интерактивный элемент', (ctx) =>
      context.start(async () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();

        const items: DefaultListItem[] = [
          { label: 'Первый', onClick: handler1 },
          { label: 'Второй', onClick: handler2, disabled: true },
        ];

        renderComponent(ctx, { items });

        const itemNodes = getListItems(ctx);

        fireEvent.click(itemNodes[0]);
        fireEvent.click(itemNodes[1]);

        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).not.toHaveBeenCalled();

        expect(handler1).toHaveBeenCalledWith(expect.any(Object));
      }));
  });

  describe.concurrent('дополнительные элементы', () => {
    const iconText = 'IconMock';
    const IconLeftMock = createIconMock(iconText);

    const customContextText = 'customContextText';
    const customContent = <div>{customContextText}</div>;

    test('рендерит иконку leftIcon', (ctx) =>
      context.start(async () => {
        const items: DefaultListItem[] = [
          { label: 'Первый', leftIcon: IconLeftMock },
        ];

        renderComponent(ctx, { items });

        expect(getItemIconLeft(ctx, 0)).toHaveClass(iconText);
      }));

    test('рендерит иконку rightIcon', (ctx) =>
      context.start(async () => {
        const items: DefaultListItem[] = [
          { label: 'Первый', rightIcon: IconLeftMock },
        ];

        renderComponent(ctx, { items });

        expect(getItemIconRight(ctx, 0)).toHaveClass(iconText);
      }));

    test('рендерит контент leftSide', (ctx) =>
      context.start(async () => {
        const items: DefaultListItem[] = [
          { label: 'Первый', leftSide: customContent },
        ];

        renderComponent(ctx, { items });

        expect(getItemLeftSlot(ctx, 0)).toHaveTextContent(customContextText);
      }));

    test('рендерит контент rightSide', (ctx) =>
      context.start(async () => {
        const items: DefaultListItem[] = [
          { label: 'Первый', rightSide: customContent },
        ];

        renderComponent(ctx, { items });

        expect(getItemRightSlot(ctx, 0)).toHaveTextContent(customContextText);
      }));
  });

  test('groupId группирует элементы', (ctx) =>
    context.start(async () => {
      const groupOneLabel = 'group-1';
      const groupTwoLabel = 'group-2';

      const groups: DefaultListGroup[] = [
        { id: 1, label: groupOneLabel },
        { id: 2, label: groupTwoLabel },
      ];

      const items: DefaultListItem[] = [
        { label: 'Первый', groupId: 1 },
        { label: 'Третий', groupId: 1 },
        { label: 'Второй', groupId: 2 },
      ];

      renderComponent(ctx, { items, groups });

      expect(getListGroup(ctx, 0)).toHaveTextContent(groupOneLabel);
      expect(getListGroup(ctx, 1)).toHaveTextContent(groupTwoLabel);

      const container = getRender(ctx);
      const groupNodes = container.querySelectorAll(`.${cnListGroupLabel()}`);
      expect(groupNodes.length).toEqual(groups.length);

      const getFollowingItemsTexts = (labelEl: Element) => {
        const texts: string[] = [];
        let el = labelEl.nextElementSibling;
        while (el && !el.classList.contains(cnListGroupLabel())) {
          const t = el.textContent?.trim();
          if (t) texts.push(t);
          el = el.nextElementSibling;
        }
        return texts;
      };

      const firstGroupItems = getFollowingItemsTexts(groupNodes[0]);
      const secondGroupItems = getFollowingItemsTexts(groupNodes[1]);

      expect(firstGroupItems).toContain('Первый');
      expect(firstGroupItems).toContain('Третий');
      expect(firstGroupItems).not.toContain('Второй');

      expect(secondGroupItems).toContain('Второй');
    }));

  test('renderItem рендерит кастомный контент', (ctx) =>
    context.start(async () => {
      const items: DefaultListItem[] = [{ label: 'Первый' }];
      const customTestId = 'customContent';

      renderComponent(ctx, {
        items,
        renderItem: (item) => (
          <div data-testid={customTestId}>{item.label}</div>
        ),
      });

      const item = getRender(ctx).querySelector(
        `[data-testid="${customTestId}"]`,
      );
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(items[0].label as string);
    }));

  test('getItemAdditionalClassName добавляет класс для всех элементов', (ctx) =>
    context.start(async () => {
      const items: DefaultListItem[] = [
        { label: 'Первый' },
        { label: 'Второй' },
      ];
      const additionalClassName = 'mock-class';

      renderComponent(ctx, {
        items,
        getItemAdditionalClassName: () => additionalClassName,
      });

      expect(getListItem(ctx, 0)).toHaveClass(additionalClassName);
      expect(getListItem(ctx, 1)).toHaveClass(additionalClassName);
    }));

  test('проверка getItemAs', (ctx) =>
    context.start(async () => {
      const items: DefaultListItem[] = [{ label: 'Первый' }];

      renderComponent(ctx, {
        items,
        getItemAs: () => 'a',
      });

      expect(getListItem(ctx, 0).tagName.toLowerCase()).toBe('a');
    }));
});
