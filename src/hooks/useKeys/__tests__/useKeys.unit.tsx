import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { useKeys } from '../useKeys';

createRoot();
clearStack();

const testId = 'useKeys';

const TestComponent = ({
  keys,
  isActive,
  onEvent,
}: {
  keys: Record<string, () => void>;
  isActive: boolean;
  onEvent?: () => void;
}) => {
  const handler = useKeys({ keys, isActive, onEvent });

  return <input data-testid={testId} onKeyDown={handler} />;
};

const renderComponent = ({
  ctx,
  keys,
  isActive,
  onEvent,
}: {
  ctx: TestContext;
  keys: Record<string, () => void>;
  isActive: boolean;
  onEvent?: () => void;
}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <TestComponent keys={keys} isActive={isActive} onEvent={onEvent} />
      </reatomContext.Provider>,
    );
  });
};

const getElement = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Хук useKeys', () => {
  test('должен вызываться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent({
          ctx,
          keys: {},
          isActive: true,
        }),
      ).not.toThrow();
    }));

  test('вызывает обработчик при нажатии соответствующей клавиши (e.code)', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({
        ctx,
        keys: { Enter: handler },
        isActive: true,
      });

      fireEvent.keyDown(getElement(ctx), { code: 'Enter' });
      expect(handler).toHaveBeenCalledTimes(1);
    }));

  test('вызывает обработчик при нажатии соответствующей клавиши (e.key)', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({
        ctx,
        keys: { Enter: handler },
        isActive: true,
      });

      fireEvent.keyDown(getElement(ctx), { key: 'Enter' });
      expect(handler).toHaveBeenCalledTimes(1);
    }));

  test('не вызывает обработчик для неизвестной клавиши', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({
        ctx,
        keys: { Enter: handler },
        isActive: true,
      });

      fireEvent.keyDown(getElement(ctx), {
        code: 'Escape',
        key: 'Escape',
      });
      expect(handler).not.toHaveBeenCalled();
    }));

  test('не вызывает обработчик клавиши когда isActive = false', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({
        ctx,
        keys: { Enter: handler },
        isActive: false,
      });

      fireEvent.keyDown(getElement(ctx), { code: 'Enter' });
      expect(handler).not.toHaveBeenCalled();
    }));

  test('всегда вызывает onEvent даже когда isActive = false', (ctx) =>
    context.start(async () => {
      const onEvent = vi.fn();
      renderComponent({
        ctx,
        keys: {},
        isActive: false,
        onEvent,
      });

      fireEvent.keyDown(getElement(ctx), { code: 'Enter' });
      expect(onEvent).toHaveBeenCalledTimes(1);
    }));

  test('вызывает onEvent при нажатии любой клавиши', (ctx) =>
    context.start(async () => {
      const onEvent = vi.fn();
      renderComponent({
        ctx,
        keys: {},
        isActive: true,
        onEvent,
      });

      const element = getElement(ctx);
      fireEvent.keyDown(element, { code: 'Enter' });
      fireEvent.keyDown(element, { code: 'Escape' });
      fireEvent.keyDown(element, { code: 'Space' });
      expect(onEvent).toHaveBeenCalledTimes(3);
    }));

  test('вызывает обработчик и onEvent вместе при нажатии зарегистрированной клавиши', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      const onEvent = vi.fn();
      renderComponent({
        ctx,
        keys: { Enter: handler },
        isActive: true,
        onEvent,
      });

      fireEvent.keyDown(getElement(ctx), { code: 'Enter' });
      expect(handler).toHaveBeenCalledTimes(1);
      expect(onEvent).toHaveBeenCalledTimes(1);
    }));
});
