import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { Transition, TransitionProps, TransitionStatus } from '../Transition';

createRoot();
clearStack();

const statusTestId = 'transition-status';
const timeout = 50;

type RenderProps = Omit<TransitionProps, 'children'>;

const renderNode = (props: RenderProps) => (
  <reatomContext.Provider value={top()}>
    <Transition {...props}>
      {(status: TransitionStatus) => (
        <div data-testid={statusTestId}>{status}</div>
      )}
    </Transition>
  </reatomContext.Provider>
);

const getStatusEl = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} [data-testid="${statusTestId}"]`);

const getStatus = (ctx: TestContext) => getStatusEl(ctx)?.textContent ?? null;

const renderComponent = (ctx: TestContext, props: RenderProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(renderNode(props));
  });
  return root;
};

const rerenderComponent = (
  root: ReturnType<typeof ReactDOM.createRoot>,
  props: RenderProps,
) => {
  act(() => {
    root.render(renderNode(props));
  });
};

describe('Компонент Transition', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, { in: false, timeout });

      expect(render).not.toThrow();
    }));

  test('при in=true и без firstStatusAnimate статус сразу entered', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { in: true, timeout });

      expect(getStatus(ctx)).toBe('entered');
    }));

  test('при in=false начальный статус exited', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { in: false, timeout });

      expect(getStatus(ctx)).toBe('exited');
    }));

  test('при in=true и firstStatusAnimate=true анимация начинается с exited', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { in: true, timeout, firstStatusAnimate: true });

      expect(getStatus(ctx)).toBe('exited');

      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entered');
    }));

  test('переключение in с false на true: exited → entering → entered', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, { in: false, timeout });
      expect(getStatus(ctx)).toBe('exited');

      rerenderComponent(root, { in: true, timeout });
      expect(getStatus(ctx)).toBe('exited');

      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entered');
    }));

  test('переключение in с true на false: entered → exiting → exited', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, { in: true, timeout });
      expect(getStatus(ctx)).toBe('entered');

      rerenderComponent(root, { in: false, timeout });
      expect(getStatus(ctx)).toBe('entered');

      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('exiting');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('exited');
    }));

  test('unmountOnExit: при in=false и статусе exited рендерится null', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, {
        in: false,
        timeout,
        unmountOnExit: true,
      });
      expect(getStatusEl(ctx)).toBeNull();

      rerenderComponent(root, { in: true, timeout, unmountOnExit: true });
      expect(getStatus(ctx)).toBe('exited');

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entered');

      rerenderComponent(root, { in: false, timeout, unmountOnExit: true });
      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatusEl(ctx)).toBeNull();
    }));

  test('вызывает onEntering и onEntered при появлении', (ctx) =>
    context.start(async () => {
      const onEntering = vi.fn();
      const onEntered = vi.fn();
      const root = renderComponent(ctx, {
        in: false,
        timeout,
        onEntering,
        onEntered,
      });

      expect(onEntering).not.toHaveBeenCalled();
      expect(onEntered).not.toHaveBeenCalled();

      rerenderComponent(root, { in: true, timeout, onEntering, onEntered });

      await wrap(sleep());
      await wrap(tick());
      expect(onEntering).toHaveBeenCalledTimes(1);

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(onEntered).toHaveBeenCalledTimes(1);
    }));

  test('вызывает onExiting и onExited при скрытии', (ctx) =>
    context.start(async () => {
      const onExiting = vi.fn();
      const onExited = vi.fn();
      const root = renderComponent(ctx, {
        in: true,
        timeout,
        onExiting,
        onExited,
      });

      expect(onExiting).not.toHaveBeenCalled();
      expect(onExited).not.toHaveBeenCalled();

      rerenderComponent(root, { in: false, timeout, onExiting, onExited });

      await wrap(sleep());
      await wrap(tick());
      expect(onExiting).toHaveBeenCalledTimes(1);

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(onExited).toHaveBeenCalledTimes(1);
    }));

  test('повторный рендер без изменения in не запускает анимацию', (ctx) =>
    context.start(async () => {
      const onEntering = vi.fn();
      const root = renderComponent(ctx, { in: false, timeout, onEntering });

      rerenderComponent(root, { in: false, timeout, onEntering });
      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());

      expect(getStatus(ctx)).toBe('exited');
      expect(onEntering).not.toHaveBeenCalled();
    }));
});
