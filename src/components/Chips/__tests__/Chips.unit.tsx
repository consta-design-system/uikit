import { IconClose } from '@consta/icons/IconClose';
import { IconDinosaur } from '@consta/icons/IconDinosaur';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { Chips } from '../Chips';
import { ChipsDefaultItem, ChipsProps } from '../types';

createRoot();
clearStack();

const defaultItems: ChipsDefaultItem[] = [
  {
    label: 'one',
  },
  {
    label: 'two',
    iconLeft: IconDinosaur,
  },
  {
    label: 'three',
    iconRight: IconClose,
  },
];
const testId = 'chips-test-id';

type WithPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

function renderComponent(
  ctx: TestContext,
  props?: WithPartial<ChipsProps, 'items'>,
) {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Chips data-testid={testId} items={defaultItems} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
}

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getItem = (ctx: TestContext, index: number) =>
  getRender(ctx).querySelectorAll('.ChipsItem')[index] as HTMLDivElement;

const getRightIcon = (ctx: TestContext, index: number) =>
  getItem(ctx, index).querySelector('.IconClose') as HTMLDivElement;

describe.concurrent('Chips', () => {
  test('Рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {});
      await wrap(tick());

      expect(getRender(ctx)).toBeInTheDocument();
    }));

  describe.concurrent('Props', () => {
    describe.concurrent(
      'Обработчики onItemClick и onItemRightIconClick',
      () => {
        test('onClick вызывается', (ctx) =>
          context.start(async () => {
            const onClick = vi.fn();
            renderComponent(ctx, { onItemClick: onClick });

            await wrap(tick());

            const item = getItem(ctx, 0);
            fireEvent.click(item);

            expect(onClick).toHaveBeenCalled();
            expect(onClick.mock.calls[0][0]).toBe(defaultItems[0]);
          }));

        test('onItemRightIconClick вызывается', (ctx) =>
          context.start(async () => {
            const onClick = vi.fn();
            renderComponent(ctx, {
              onItemRightIconClick: onClick,
            });

            await wrap(tick());

            const rightIcon = getRightIcon(ctx, 2);
            expect(rightIcon).toBeInTheDocument();
            fireEvent.click(rightIcon);

            expect(onClick).toHaveBeenCalled();
            expect(onClick.mock.calls[0][0]).toBe(defaultItems[2]);
          }));

        test('Обработчики не вызываются на глобальный disabled', (ctx) =>
          context.start(async () => {
            const onItemClick = vi.fn();
            const onItemRightIconClick = vi.fn();
            renderComponent(ctx, {
              onItemRightIconClick,
              onItemClick,
              disabled: true,
            });

            await wrap(tick());

            const item = getItem(ctx, 0);
            fireEvent.click(item);

            const rightIcon = getRightIcon(ctx, 2);

            expect(rightIcon).toBeInTheDocument();
            fireEvent.click(rightIcon);

            expect(onItemClick).not.toHaveBeenCalled();
            expect(onItemRightIconClick).not.toHaveBeenCalled();
          }));

        test('Обработчики не вызываются на disabled конкретного элемента', (ctx) =>
          context.start(async () => {
            const onItemClick = vi.fn();
            const onItemRightIconClick = vi.fn();
            const itemsWithDisabled = defaultItems.map((item) => {
              return { ...item, disabled: !!item.iconRight || !!item.iconLeft };
            });
            renderComponent(ctx, {
              items: itemsWithDisabled,
              onItemRightIconClick,
              onItemClick,
            });

            await wrap(tick());

            const disabledItem = getItem(ctx, 1);
            fireEvent.click(disabledItem);

            const rightIcon = getRightIcon(ctx, 2);
            expect(rightIcon).toBeInTheDocument();
            fireEvent.click(rightIcon);

            expect(onItemClick).not.toHaveBeenCalled();
            expect(onItemRightIconClick).not.toHaveBeenCalled();

            const enabledItem = getItem(ctx, 0);
            fireEvent.click(enabledItem);

            expect(onItemClick).toHaveBeenCalled();
          }));
      },
    );
  });
});
