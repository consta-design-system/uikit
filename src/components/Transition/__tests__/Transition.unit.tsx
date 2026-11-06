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

  test('при in=true и без animateOnMount статус сразу entered', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { in: true, timeout });

      expect(getStatus(ctx)).toBe('entered');
    }));

  test('при in=false начальный статус exited', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { in: false, timeout });

      expect(getStatus(ctx)).toBe('exited');
    }));

  test('при in=true и animateOnMount=true анимация начинается с exited', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { in: true, timeout, animateOnMount: true });

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

  test('прерывание анимации: переключение in=false во время entering', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, { in: false, timeout });

      rerenderComponent(root, { in: true, timeout });
      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      rerenderComponent(root, { in: false, timeout });
      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('exiting');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('exited');
    }));

  test('прерывание анимации: переключение in=true во время exiting', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, { in: true, timeout });
      expect(getStatus(ctx)).toBe('entered');

      rerenderComponent(root, { in: false, timeout });
      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('exiting');

      rerenderComponent(root, { in: true, timeout });
      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entered');
    }));

  test('при начальном рендере с in=true и без animateOnMount вызывается только onEntered', (ctx) =>
    context.start(async () => {
      const onEntering = vi.fn();
      const onEntered = vi.fn();
      const onExiting = vi.fn();
      const onExited = vi.fn();
      renderComponent(ctx, {
        in: true,
        timeout,
        animateOnMount: false,
        onEntering,
        onEntered,
        onExiting,
        onExited,
      });

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());

      expect(getStatus(ctx)).toBe('entered');
      expect(onEntering).not.toHaveBeenCalled();
      expect(onEntered).toHaveBeenCalledTimes(1);
      expect(onExiting).not.toHaveBeenCalled();
      expect(onExited).not.toHaveBeenCalled();
    }));

  test('animateOnMount: колбеки вызываются при монтировании без переключения in', (ctx) =>
    context.start(async () => {
      const onEntering = vi.fn();
      const onEntered = vi.fn();
      renderComponent(ctx, {
        in: true,
        timeout,
        animateOnMount: true,
        onEntering,
        onEntered,
      });

      await wrap(sleep());
      await wrap(tick());
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).not.toHaveBeenCalled();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).toHaveBeenCalledTimes(1);
    }));

  test('использует актуальные колбеки после ререндера (без stale props)', (ctx) =>
    context.start(async () => {
      const firstOnEntered = vi.fn();
      const secondOnEntered = vi.fn();
      const root = renderComponent(ctx, {
        in: false,
        timeout,
        onEntered: firstOnEntered,
      });

      rerenderComponent(root, {
        in: true,
        timeout,
        onEntered: secondOnEntered,
      });

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());

      expect(secondOnEntered).toHaveBeenCalledTimes(1);
      expect(firstOnEntered).not.toHaveBeenCalled();
    }));

  test('timeout изменённый во время анимации не влияет на текущий запуск', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, { in: false, timeout: 100 });

      rerenderComponent(root, { in: true, timeout: 100 });
      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      rerenderComponent(root, { in: true, timeout: 20 });
      await wrap(sleep(20));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      await wrap(sleep(100));
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entered');
    }));

  test('unmountOnExit: элемент остаётся в DOM во время exiting', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, {
        in: true,
        timeout,
        unmountOnExit: true,
      });
      expect(getStatus(ctx)).toBe('entered');

      rerenderComponent(root, { in: false, timeout, unmountOnExit: true });

      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('exiting');
      expect(getStatusEl(ctx)).not.toBeNull();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getStatusEl(ctx)).toBeNull();
    }));

  test('размонтирование во время анимации не вызывает ошибок', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, { in: false, timeout });

      rerenderComponent(root, { in: true, timeout });
      await wrap(sleep());
      await wrap(tick());
      expect(getStatus(ctx)).toBe('entering');

      const errorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);

      act(() => {
        root.unmount();
      });

      await wrap(sleep(timeout));
      await wrap(tick());

      expect(errorSpy).not.toHaveBeenCalled();

      errorSpy.mockRestore();
    }));
});
