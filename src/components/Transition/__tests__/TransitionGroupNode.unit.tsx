import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { Transition, TransitionProps } from '../Transition';
import { TransitionGroupNode } from '../TransitionGroupNode';

createRoot();
clearStack();

const timeout = 50;

const nodeTestId = (id: string) => `node-${id}`;

const TransitionNode = ({
  id,
  label,
  ...transitionProps
}: { id: string; label?: string } & Partial<TransitionProps>) => (
  <Transition {...transitionProps} timeout={transitionProps.timeout ?? timeout}>
    {(status) => (
      <div data-testid={nodeTestId(id)} data-status={status}>
        {label ?? id}
      </div>
    )}
  </Transition>
);

const renderNode = (nodes: React.ReactNode) => (
  <reatomContext.Provider value={top()}>
    <TransitionGroupNode>{nodes}</TransitionGroupNode>
  </reatomContext.Provider>
);

const renderComponent = (ctx: TestContext, nodes: React.ReactNode) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(renderNode(nodes));
  });
  return root;
};

const rerenderComponent = (
  root: ReturnType<typeof ReactDOM.createRoot>,
  nodes: React.ReactNode,
) => {
  act(() => {
    root.render(renderNode(nodes));
  });
};

const getNodeEl = (ctx: TestContext, id: string) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${nodeTestId(id)}"]`,
  );

const getNodeStatus = (ctx: TestContext, id: string) =>
  getNodeEl(ctx, id)?.getAttribute('data-status') ?? null;

describe('Компонент TransitionGroupNode', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, <TransitionNode key="a" id="a" />);

      expect(render).not.toThrow();
    }));

  test('рендерит дочерние элементы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, [
        <TransitionNode key="a" id="a" />,
        <TransitionNode key="b" id="b" />,
      ]);

      expect(getNodeEl(ctx, 'a')).not.toBeNull();
      expect(getNodeEl(ctx, 'b')).not.toBeNull();
      expect(getNodeEl(ctx, 'a')?.textContent).toBe('a');
      expect(getNodeEl(ctx, 'b')?.textContent).toBe('b');
    }));

  test('новый узел анимируется: exited → entering → entered', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, <TransitionNode key="a" id="a" />);

      expect(getNodeStatus(ctx, 'a')).toBe('exited');

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entering');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entered');

      rerenderComponent(root, [
        <TransitionNode key="a" id="a" />,
        <TransitionNode key="b" id="b" />,
      ]);

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeEl(ctx, 'b')).not.toBeNull();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'b')).toBe('entered');
    }));

  test('удалённый узел анимируется (exiting) и удаляется из DOM', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [
        <TransitionNode key="a" id="a" />,
        <TransitionNode key="b" id="b" />,
      ]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entered');
      expect(getNodeStatus(ctx, 'b')).toBe('entered');

      rerenderComponent(root, <TransitionNode key="a" id="a" />);

      expect(getNodeEl(ctx, 'b')).not.toBeNull();
      expect(getNodeStatus(ctx, 'b')).toBe('entered');

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'b')).toBe('exiting');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeEl(ctx, 'b')).toBeNull();
      expect(getNodeEl(ctx, 'a')).not.toBeNull();
    }));

  test('рендерит текстовые узлы как есть', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, 'текст');

      const rootEl = document.getElementById(testRootId(ctx));
      expect(rootEl?.textContent).toContain('текст');
    }));

  test('пробрасывает in, onEntered, onExited и animateOnMount в children', (ctx) =>
    context.start(async () => {
      const SpyChild = (props: {
        in?: boolean;
        onEntered?: () => void;
        onExited?: () => void;
        animateOnMount?: boolean;
      }) => (
        <div
          data-testid="spy"
          data-in={String(props.in)}
          data-first-status-animate={String(props.animateOnMount)}
          data-on-entered={String(typeof props.onEntered === 'function')}
          data-on-exited={String(typeof props.onExited === 'function')}
        />
      );

      renderComponent(ctx, <SpyChild key="spy" />);

      const spy = document.querySelector(
        `#${testRootId(ctx)} [data-testid="spy"]`,
      );

      expect(spy).not.toBeNull();
      expect(spy?.getAttribute('data-in')).toBe('true');
      expect(spy?.getAttribute('data-first-status-animate')).toBe('true');
      expect(spy?.getAttribute('data-on-entered')).toBe('true');
      expect(spy?.getAttribute('data-on-exited')).toBe('true');
    }));

  test('пользовательские колбэки onEntering/onEntered вызываются после клонирования элемента', (ctx) =>
    context.start(async () => {
      const onEntering = vi.fn();
      const onEntered = vi.fn();

      renderComponent(ctx, [
        <TransitionNode
          key="a"
          id="a"
          onEntering={onEntering}
          onEntered={onEntered}
        />,
      ]);

      expect(onEntering).not.toHaveBeenCalled();
      expect(onEntered).not.toHaveBeenCalled();

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entering');
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).not.toHaveBeenCalled();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entered');
      expect(onEntering).toHaveBeenCalledTimes(1);
      expect(onEntered).toHaveBeenCalledTimes(1);
    }));

  test('пользовательские колбэки onExiting/onExited вызываются после клонирования, узел удаляется из DOM', (ctx) =>
    context.start(async () => {
      const onExiting = vi.fn();
      const onExited = vi.fn();

      const root = renderComponent(ctx, [
        <TransitionNode key="a" id="a" />,
        <TransitionNode
          key="b"
          id="b"
          onExiting={onExiting}
          onExited={onExited}
        />,
      ]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'b')).toBe('entered');
      expect(onExiting).not.toHaveBeenCalled();
      expect(onExited).not.toHaveBeenCalled();

      rerenderComponent(root, <TransitionNode key="a" id="a" />);

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'b')).toBe('exiting');
      expect(onExiting).toHaveBeenCalledTimes(1);
      expect(onExited).not.toHaveBeenCalled();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeEl(ctx, 'b')).toBeNull();
      expect(onExiting).toHaveBeenCalledTimes(1);
      expect(onExited).toHaveBeenCalledTimes(1);
    }));

  test('unmountOnExit пробрасывается после клонирования, узел удаляется из DOM после выхода', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [
        <TransitionNode key="a" id="a" />,
        <TransitionNode key="b" id="b" unmountOnExit />,
      ]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeEl(ctx, 'b')).not.toBeNull();
      expect(getNodeStatus(ctx, 'b')).toBe('entered');

      rerenderComponent(root, <TransitionNode key="a" id="a" />);

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'b')).toBe('exiting');
      expect(getNodeEl(ctx, 'b')).not.toBeNull();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeEl(ctx, 'b')).toBeNull();
      expect(getNodeEl(ctx, 'a')).not.toBeNull();
    }));

  test('переход к пустым детям: все узлы анимируются и удаляются', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [<TransitionNode key="a" id="a" />]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entered');

      rerenderComponent(root, null);

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('exiting');

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeEl(ctx, 'a')).toBeNull();
    }));

  test('обновление узла с тем же key не запускает повторную анимацию', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [<TransitionNode key="a" id="a" />]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entered');

      rerenderComponent(root, [
        <TransitionNode key="a" id="a" label="a updated" />,
      ]);

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeEl(ctx, 'a')?.textContent).toBe('a updated');
      expect(getNodeStatus(ctx, 'a')).toBe('entered');
    }));

  test('замена узла за один рендер: старый выходит, новый входит', (ctx) =>
    context.start(async () => {
      const root = renderComponent(ctx, [<TransitionNode key="a" id="a" />]);

      await wrap(sleep());
      await wrap(tick());
      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('entered');

      rerenderComponent(root, [<TransitionNode key="b" id="b" />]);

      await wrap(sleep());
      await wrap(tick());
      expect(getNodeStatus(ctx, 'a')).toBe('exiting');
      expect(getNodeEl(ctx, 'b')).not.toBeNull();

      await wrap(sleep(timeout));
      await wrap(tick());
      expect(getNodeEl(ctx, 'a')).toBeNull();
      expect(getNodeStatus(ctx, 'b')).toBe('entered');
    }));
});
