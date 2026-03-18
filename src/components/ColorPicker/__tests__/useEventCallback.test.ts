import { renderHook } from '@testing-library/react';

import { useEventCallback } from '../hooks/useEventCallback';

describe('useEventCallback', () => {
  it('возвращает функцию, которая вызывает актуальный обработчик', () => {
    const handler1 = jest.fn();
    const { result, rerender } = renderHook(
      ({ handler }) => useEventCallback(handler),
      { initialProps: { handler: handler1 } },
    );
    const callback = result.current;
    callback('test');
    expect(handler1).toHaveBeenCalledWith('test');
    handler1.mockClear();

    const handler2 = jest.fn();
    rerender({ handler: handler2 });
    // callback остаётся тем же, но должен вызывать handler2
    callback('new');
    expect(handler2).toHaveBeenCalledWith('new');
    expect(handler1).not.toHaveBeenCalled();
  });

  it('работает, если обработчик не передан', () => {
    const { result } = renderHook(() => useEventCallback());
    const callback = result.current;
    expect(() => callback('anything')).not.toThrow();
  });

  it('сохраняет ссылочную стабильность при перерендере', () => {
    const handler = jest.fn();
    const { result, rerender } = renderHook(
      ({ handler }) => useEventCallback(handler),
      { initialProps: { handler } },
    );
    const firstCallback = result.current;
    rerender({ handler });
    expect(result.current).toBe(firstCallback);
    rerender({ handler: jest.fn() });
    // callback должен остаться тем же
    expect(result.current).toBe(firstCallback);
  });
});
