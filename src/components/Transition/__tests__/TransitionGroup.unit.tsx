import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { TransitionGroup } from '../TransitionGroup';

createRoot();
clearStack();

type Item = { id: string; label: string };

const timeout = 50;

const itemA: Item = { id: 'a', label: 'A' };
const itemB: Item = { id: 'b', label: 'B' };

const itemTestId = (id: string) => `group-item-${id}`;

const renderNode = (items: Item[]) => (
  <reatomContext.Provider value={top()}>
    <TransitionGroup
      items={items}
      timeout={timeout}
      getItemKey={(item) => item.id}
      renderItem={(item, index, animate) => (
        <div data-testid={itemTestId(item.id)} data-status={animate}>
          {item.label}
        </div>
      )}
    />
  </reatomContext.Provider>
);

const renderComponent = (ctx: TestContext, items: Item[]) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(renderNode(items));
  });
  return root;
};

const rerenderComponent = (
  root: ReturnType<typeof ReactDOM.createRoot>,
  items: Item[],
) => {
  act(() => {
    root.render(renderNode(items));
  });
};

const getItemEl = (ctx: TestContext, id: string) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${itemTestId(id)}"]`,
  );

const getItemStatus = (ctx: TestContext, id: string) =>
  getItemEl(ctx, id)?.getAttribute('data-status') ?? null;
describe('Компонент TransitionGroup', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, [itemA]);

      expect(render).not.toThrow();
    }));

  test('рендерит все элементы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, [itemA, itemB]);

      expect(getItemEl(ctx, 'a')).not.toBeNull();
      expect(getItemEl(ctx, 'b')).not.toBeNull();
      expect(getItemEl(ctx, 'a')?.textContent).toBe('A');
      expect(getItemEl(ctx, 'b')?.textContent).toBe('B');
    }));

  test('новые элементы анимируются: exited → entering → entered', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [itemA]);

      expect(getItemStatus(ctx, 'a')).toBe('exited');

      await wrap(sleep());
      await wrap(tick());
      expect(getItemStatus(ctx, 'a')).toBe('entering');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getItemStatus(ctx, 'a')).toBe('entered');

      rerenderComponent(root, [itemA, itemB]);

      await wrap(sleep());
      await wrap(tick());
      expect(getItemEl(ctx, 'b')).not.toBeNull();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getItemStatus(ctx, 'b')).toBe('entered');
    }));

  test('удалённый элемент анимируется (exiting) и удаляется из DOM', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [itemA, itemB]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getItemStatus(ctx, 'a')).toBe('entered');
      expect(getItemStatus(ctx, 'b')).toBe('entered');

      rerenderComponent(root, [itemA]);

      expect(getItemEl(ctx, 'b')).not.toBeNull();
      expect(getItemStatus(ctx, 'b')).toBe('entered');

      await wrap(sleep());
      await wrap(tick());
      expect(getItemStatus(ctx, 'b')).toBe('exiting');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getItemEl(ctx, 'b')).toBeNull();
      expect(getItemEl(ctx, 'a')).not.toBeNull();
    }));

  test('повторное добавление после полного удаления снова анимируется', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [itemA, itemB]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());

      rerenderComponent(root, [itemA]);
      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getItemEl(ctx, 'b')).toBeNull();

      rerenderComponent(root, [itemA, itemB]);
      await wrap(sleep());
      await wrap(tick());
      expect(getItemEl(ctx, 'b')).not.toBeNull();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getItemStatus(ctx, 'b')).toBe('entered');
    }));
});
