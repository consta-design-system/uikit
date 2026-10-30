import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { Transition, TransitionProps } from '../Transition';
import { TransitionGroupNode } from '../TransitionGroupNode';

createRoot();
clearStack();

const timeout = 50;

const nodeTestId = (id: string) => `node-${id}`;

const TransitionNode = ({
  id,
  ...transitionProps
}: { id: string } & Partial<TransitionProps>) => (
  <Transition {...transitionProps} timeout={transitionProps.timeout ?? timeout}>
    {(status) => (
      <div data-testid={nodeTestId(id)} data-status={status}>
        {id}
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

  test('пробрасывает in, index, onEntered, onExited и firstStatusAnimate в children', (ctx) =>
    context.start(async () => {
      const SpyChild = (props: {
        in?: boolean;
        index?: number;
        onEntered?: () => void;
        onExited?: () => void;
        firstStatusAnimate?: boolean;
      }) => (
        <div
          data-testid="spy"
          data-in={String(props.in)}
          data-index={props.index}
          data-first-status-animate={String(props.firstStatusAnimate)}
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
      expect(spy?.getAttribute('data-index')).toBe('0');
      expect(spy?.getAttribute('data-first-status-animate')).toBe('true');
      expect(spy?.getAttribute('data-on-entered')).toBe('true');
      expect(spy?.getAttribute('data-on-exited')).toBe('true');
    }));
});
