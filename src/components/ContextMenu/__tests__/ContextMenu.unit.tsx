import { IconAllDone } from '@consta/icons/IconAllDone';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { cnListGroupLabel, cnListItem, cnListItemGrid } from '../../ListCanary';
import { cnText } from '../../Text/Text';
import { exampleItems as items, groups } from '../__mocks__/mock.data';
import { ContextMenu } from '../ContextMenu';
import {
  ContextMenuGroupDefault,
  ContextMenuItemDefault,
  ContextMenuProps,
} from '../types';

createRoot();
clearStack();

const testId = 'ContextMenuCanary';
const additionalClass = 'additionalClass';

const renderComponent = (
  ctx: TestContext,
  props: ContextMenuProps<ContextMenuItemDefault, ContextMenuGroupDefault> | {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ContextMenu
            {...props}
            isOpen
            anchorRef={undefined}
            position={{ x: 0, y: 0 }}
            items={items}
            className={additionalClass}
            data-testid={testId}
            container={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnListItem()}`);

const getItem = (ctx: TestContext, index = 0) => getItems(ctx)[index];

const getSide = (ctx: TestContext, index = 0, sideIndex = 0) =>
  getItem(ctx, index).querySelectorAll(`.${cnListItemGrid('Slot')}`)[sideIndex];

const getIcon = (ctx: TestContext, index = 0, sideIndex = 0) =>
  getSide(ctx, index, sideIndex).querySelectorAll('.icons--Icon')[0];

const getGroups = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnListGroupLabel()}`);

const getGroup = (ctx: TestContext, index = 0) => getGroups(ctx)[index];

describe.concurrent('Компонент ContextMenu', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
      await wrap(tick());
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка items', () => {
      test('количество совпадает с передаваемым', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getItems(ctx).length).toEqual(items.length);
        }));
    });

    describe.concurrent('проверка getItemLabel', () => {
      test('label совпадает', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            getItemLeftSide: () => undefined,
            getItemRightSide: () => undefined,
          });
          await wrap(tick());
          expect(getItem(ctx).textContent).toEqual(items[0].label);
        }));
    });

    describe.concurrent('проверка getGroupId', () => {
      test('количество групп совпадает', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { groups });
          await wrap(tick());
          expect(getGroups(ctx).length).toEqual(groups.length);
        }));
    });

    describe.concurrent('проверка getGroupLabel', () => {
      test('label совпадает', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { groups });
          await wrap(tick());
          expect(getGroup(ctx)?.textContent).toEqual(groups[0].label);
        }));
    });

    describe.concurrent('проверка getItemOnClick', () => {
      test('клик по элементу должен вызвать callback', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, {
            onItemClick: handleChange,
            getItemSubMenu: () => undefined,
          });
          await wrap(tick());

          fireEvent.click(getItem(ctx));

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
        }));
    });

    describe.concurrent('проверка getItemStatus', () => {
      test('элементу присвоился нужный модификатор', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());

          expect(getItem(ctx)).toHaveClass(cnText({ view: items[0].status }));
        }));
    });

    describe.concurrent('проверка getItemDisabled', () => {
      test('элементу присвоился нужный модификатор и onClick не отрабатывает', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, {
            getItemDisabled: () => true,
            getItemOnClick: (item) => () => handleChange(item),
          });
          await wrap(tick());

          expect(getItem(ctx)).toHaveClass(cnListItem({ disabled: true }));

          fireEvent.click(getItem(ctx));
          expect(handleChange).toHaveBeenCalledTimes(0);
        }));
    });

    describe.concurrent('проверка getItemLeftSide', () => {
      test('side слева отобразился', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            getItemLeftIcon: () => undefined,
            getItemLeftSide: () => 'test',
          });
          await wrap(tick());

          expect(getSide(ctx)).toHaveClass(
            cnListItemGrid('Slot', { position: 'left' }),
          );
        }));
    });

    describe.concurrent('проверка getItemRightSide', () => {
      test('side справа отобразился', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            getItemRightIcon: () => undefined,
            getItemRightSide: () => 'test',
          });
          await wrap(tick());

          expect(getSide(ctx, 0, 2)).toHaveClass(
            cnListItemGrid('Slot', { position: 'right' }),
          );
        }));
    });

    describe.concurrent('проверка getItemLeftIcon', () => {
      test('icon слева отобразился', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            getItemLeftSide: () => undefined,
            getItemLeftIcon: () => IconAllDone,
          });
          await wrap(tick());

          expect(getIcon(ctx, 0, 0)).toHaveClass('IconAllDone');
        }));
    });

    describe.concurrent('проверка getItemRightIcon', () => {
      test('icon справа отобразился', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            getItemRightSide: () => undefined,
            getItemRightIcon: () => IconAllDone,
          });
          await wrap(tick());

          expect(getIcon(ctx, 0, 2)).toHaveClass('IconAllDone');
        }));
    });

    describe.concurrent('проверка getItemAs', () => {
      test('icon справа отобразился', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            getItemAs: () => 'button',
          });
          await wrap(tick());

          expect(getItem(ctx).tagName).toEqual('BUTTON');
        }));
    });

    describe.concurrent('проверка className', () => {
      test('дополнительный класс применяется', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(additionalClass);
        }));
    });
  });
});
