import { renderHook } from '@testing-library/react';

import { useDebounce } from '../useDebounce';

describe('Хук useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('откладывает время выполнения функции', () => {
    const handler = jest.fn();
    const time = 500;
    const { result } = renderHook(() => useDebounce(handler, time));

    result.current();
    result.current();
    result.current();

    expect(handler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);
    expect(handler).toHaveBeenCalled();
  });

  it('вызывает функцию с корректными аргументами', () => {
    const handler = jest.fn();
    const time = 500;
    const { result } = renderHook(() => useDebounce(handler, time));

    result.current('a');
    result.current('ab');
    result.current('abc');

    expect(handler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(time);
    expect(handler).toHaveBeenCalledWith('abc');
  });

  it('не вызывает функцию после размонтирования', () => {
    const handler = jest.fn();
    const time = 500;
    const { result, unmount } = renderHook(() => useDebounce(handler, time));

    result.current();

    unmount();

    jest.advanceTimersByTime(time);
    expect(handler).not.toHaveBeenCalled();
  });

  it('сбрасывает таймер при повторном вызове', () => {
    const handler = jest.fn();
    const time = 500;
    const { result } = renderHook(() => useDebounce(handler, time));

    result.current();
    jest.advanceTimersByTime(time - 100);
    expect(handler).not.toHaveBeenCalled();

    result.current();
    jest.advanceTimersByTime(time - 100);
    expect(handler).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('использует последнюю переданную функцию', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const time = 500;

    const { result, rerender } = renderHook(({ fn }) => useDebounce(fn, time), {
      initialProps: { fn: handler1 },
    });

    result.current();

    rerender({ fn: handler2 });

    jest.advanceTimersByTime(time);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
