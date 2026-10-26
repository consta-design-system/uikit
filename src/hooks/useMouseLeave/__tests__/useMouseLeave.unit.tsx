import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { useRefs } from '##/hooks/useRefs';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { useMouseLeave } from '../useMouseLeave';

createRoot();
clearStack();

const TestComponent = ({
  isActive = true,
  handler,
  debounce,
  itemsCount = 2,
}: {
  isActive?: boolean;
  handler: (event: any) => void;
  debounce?: number;
  itemsCount?: number;
}) => {
  const refs = useRefs<HTMLDivElement>(itemsCount);

  useMouseLeave({
    isActive,
    handler,
    refs,
    debounce,
  });

  return (
    <div>
      {refs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          data-testid={`test-item-${index}`}
          style={{ width: 100, height: 100 }}
        >
          Item {index}
        </div>
      ))}
      <div data-testid="outside">Outside</div>
    </div>
  );
};

const renderComponent = ({
  ctx,
  isActive = true,
  handler,
  debounce,
  itemsCount = 2,
}: {
  ctx: TestContext;
  isActive?: boolean;
  handler: (event: any) => void;
  debounce?: number;
  itemsCount?: number;
}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <TestComponent
          isActive={isActive}
          handler={handler}
          debounce={debounce}
          itemsCount={itemsCount}
        />
      </reatomContext.Provider>,
    );
  });
};

const getItem = (ctx: TestContext, index: number) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="test-item-${index}"]`,
  ) as HTMLElement;

describe('Хук useMouseLeave', () => {
  test('вызывает handler при уходе мыши с элемента', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({ ctx, handler });

      const item0 = getItem(ctx, 0);

      fireEvent.mouseLeave(item0);
      await wrap(sleep());

      expect(handler).toHaveBeenCalledTimes(1);
    }));

  test('не вызывает handler, если isActive = false', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({ ctx, handler, isActive: false });

      const item0 = getItem(ctx, 0);

      fireEvent.mouseLeave(item0);
      await wrap(sleep());

      expect(handler).not.toHaveBeenCalled();
    }));

  test('не вызывает handler, если мышь перешла на другой отслеживаемый элемент (имитация группы)', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      renderComponent({ ctx, handler, itemsCount: 2, debounce: 100 });

      await wrap(tick());

      const item0 = getItem(ctx, 0);
      const item1 = getItem(ctx, 1);

      // Уходим с первого элемента
      fireEvent.mouseLeave(item0);
      await wrap(sleep(10));

      // И сразу двигаем мышью внутри второго
      fireEvent.mouseMove(item1);
      await wrap(sleep(10));

      // Handler не должен вызваться, так как мы остались "внутри" группы
      expect(handler).not.toHaveBeenCalled();
    }));

  test('не вызывает handler, если мышь вернулась обратно на тот же элемент до срабатывания debounce', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      const debounce = 100;
      renderComponent({ ctx, handler, debounce });

      const item0 = getItem(ctx, 0);

      // Уходим
      fireEvent.mouseLeave(item0);

      // Возвращаемся до истечения таймера
      await wrap(sleep(50));
      fireEvent.mouseMove(item0);

      // Завершаем таймер
      await wrap(sleep(100));

      expect(handler).not.toHaveBeenCalled();
    }));

  test('учитывает задержку debounce', (ctx) =>
    context.start(async () => {
      const handler = vi.fn();
      const debounce = 200;
      renderComponent({ ctx, handler, debounce });

      const item0 = getItem(ctx, 0);

      fireEvent.mouseLeave(item0);

      // половина времени
      await wrap(sleep(100));

      expect(handler).not.toHaveBeenCalled();

      // все время
      await wrap(sleep(100));

      expect(handler).toHaveBeenCalledTimes(1);
    }));
});
