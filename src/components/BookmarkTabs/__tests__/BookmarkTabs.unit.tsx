import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent, within } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  BookmarkTabs,
  BookmarkTabsItemDefault,
  BookmarkTabsProps,
  cnBookmarkTabs,
  cnBookmarkTabsTab,
} from '..';

createRoot();
clearStack();

type Render = <ITEM = BookmarkTabsItemDefault>(
  ctx: TestContext,
  props: BookmarkTabsProps<ITEM>,
) => void;

const testId = cnBookmarkTabs();

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

const getAllTabs = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnBookmarkTabsTab()}`);

const getCreateTabButton = (ctx: TestContext) =>
  within(
    getRender(ctx).querySelector(`.BookmarkTabs-Button_type_add`)!,
  ).getByRole('button');

const getRemoveButtonForTab = (ctx: TestContext, index: number) =>
  within(getAllTabs(ctx)[index] as HTMLElement).getByRole('button');

const getNavigationButton = (ctx: TestContext, index: 0 | 1) =>
  within(
    getRender(ctx).querySelector(`.${cnBookmarkTabs('ScrollControls')}`)!,
  ).getAllByRole('button')[index];

const iconLeftText = 'IconLeftMock';
const iconRightText = 'IconRightMock';
const leftIcon = createIconMock(iconLeftText);
const rightIcon = createIconMock(iconRightText);

const itemsDefault: BookmarkTabsItemDefault[] = [
  {
    key: 1,
    label: 'Tab 1',
  },
  {
    key: 2,
    label: 'Tab 2',
    leftIcon,
    rightIcon,
  },
  {
    key: 3,
    label: 'Tab 3',
    rightIcon,
  },
  {
    key: 4,
    label: 'Tab 4',
    leftIcon,
  },
  {
    key: 5,
    label: 'Tab 5',
    leftIcon,
  },
];

const renderComponent: Render = (ctx, props) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <BookmarkTabs
            {...props}
            data-testid={testId}
            style={{ width: 2000 }}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент BookmarkTabs', () => {
  test('должен рендериться без ошибок', (ctx) => {
    context.start(() => {
      expect(() => renderComponent(ctx, { items: itemsDefault })).not.toThrow();
    });
  });

  describe('Проверка items', () => {
    test('все табы отображаются', (ctx) => {
      context.start(() => {
        renderComponent(ctx, { items: itemsDefault });

        expect(getAllTabs(ctx).length).toBe(itemsDefault.length);
      });
    });

    test('fixed свойство скрывает лейбл и фиксирует таб в начале списка', (ctx) => {
      context.start(() => {
        const itemsWithFixed: BookmarkTabsItemDefault[] = [
          ...itemsDefault,
          { key: 6, label: 'Таб 6', fixed: true, leftIcon },
        ];

        renderComponent(ctx, { items: itemsWithFixed });

        const fixedTab = getAllTabs(ctx)[0] as HTMLElement;

        expect(within(fixedTab).getByText(iconLeftText)).toBeInTheDocument();
        expect(fixedTab).not.toHaveTextContent(
          itemsWithFixed[5].label as string,
        );
      });
    });
  });

  describe("проверка callback'ов", () => {
    test('onChange меняет активный таб', (ctx) => {
      context.start(() => {
        const handleChange = vi.fn();

        renderComponent(ctx, {
          items: itemsDefault,
          value: itemsDefault[0],
          onChange: handleChange,
        });

        const tabs = getAllTabs(ctx);

        fireEvent.click(tabs[3]);

        expect(handleChange).toHaveBeenCalledWith(
          itemsDefault[3],
          expect.any(Object),
        );
      });
    });

    test('onCreate добавляет кнопку нового таба и создает новый таб', (ctx) => {
      context.start(() => {
        const handleCreate = vi.fn();

        renderComponent(ctx, {
          items: itemsDefault,
          value: itemsDefault[0],
          onCreate: handleCreate,
        });

        const createTabButton = getCreateTabButton(ctx);
        expect(createTabButton).toBeInTheDocument();

        fireEvent.click(createTabButton!);
        expect(handleCreate).toHaveBeenCalled();
      });
    });

    test('onRemove добавляет кнопку удаления и удаляет таб', (ctx) => {
      context.start(() => {
        const handleRemove = vi.fn();

        renderComponent(ctx, {
          items: itemsDefault,
          value: itemsDefault[0],
          onRemove: handleRemove,
        });

        const secondTabRemoveButton = getRemoveButtonForTab(ctx, 1);
        expect(secondTabRemoveButton).toBeInTheDocument();

        fireEvent.click(secondTabRemoveButton);

        expect(handleRemove).toHaveBeenCalledWith(
          itemsDefault[1],
          expect.any(Object),
        );
      });
    });
  });

  test('navigationButtons отображаются c withNavigationButtons=true', async (ctx) => {
    context.start(async () => {
      renderComponent(ctx, {
        items: itemsDefault,
        withNavigationButtons: true,
      });

      await wrap(tick());
      await wrap(tick());

      expect(getNavigationButton(ctx, 0)).toBeInTheDocument();
      expect(getNavigationButton(ctx, 1)).toBeInTheDocument();
    });
  });

  test('присваивает ref', (ctx) => {
    context.start(() => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent(ctx, { ref, items: itemsDefault });

      expect(ref.current).toBe(getRender(ctx));
    });
  });

  test('должен устанавливать дополнительный класс', (ctx) => {
    context.start(() => {
      const className = 'my-class';
      renderComponent(ctx, { items: itemsDefault, className });

      expect(getRender(ctx)).toHaveClass(className);
    });
  });

  test('renderItem отображает кастомный контент для элемента', (ctx) => {
    context.start(() => {
      renderComponent(ctx, {
        items: itemsDefault,
        renderItem: () => (
          <div data-testid="customContentTestId">custom content</div>
        ),
      });

      const tabsWithCustomContent = within(getRender(ctx)).getAllByTestId(
        'customContentTestId',
      ).length;

      expect(tabsWithCustomContent).toBe(itemsDefault.length);
    });
  });

  test('getItemAs должен рендерить таб как указанный тег', (ctx) => {
    context.start(() => {
      renderComponent(ctx, {
        items: itemsDefault,
        getItemAs: () => 'a',
        getItemAttributes: (item) => ({ href: `#${item.key}` }),
      });

      const firstTab = getAllTabs(ctx)[0];
      expect(firstTab.tagName).toBe('A');
      expect(firstTab).toHaveAttribute('href', `#${itemsDefault[0].key}`);
    });
  });
});
