import { act, renderHook } from '@testing-library/react';

import { useTimer } from '../useTimer';

describe('Хук useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('инициализируется с начальным состоянием', () => {
    const { result } = renderHook(() => useTimer({ startTime: 0 }));

    expect(result.current.time).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('инициализируется с переданным startTime', () => {
    const { result } = renderHook(() => useTimer({ startTime: 5000 }));

    expect(result.current.time).toBe(5000);
  });

  it('start запускает таймер', () => {
    const { result } = renderHook(() => useTimer({ interval: 1000 }));

    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);
  });

  it('INCREMENTAL тип увеличивает время на интервал', () => {
    const { result } = renderHook(() =>
      useTimer({ interval: 1000, timerType: 'INCREMENTAL', startTime: 0 }),
    );

    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.time).toBe(1000);

    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.time).toBe(2000);
  });

  it('DECREMENTAL тип уменьшает время на интервал', () => {
    const { result } = renderHook(() =>
      useTimer({ interval: 1000, timerType: 'DECREMENTAL', startTime: 3000 }),
    );

    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.time).toBe(2000);

    act(() => jest.advanceTimersByTime(1000));
    expect(result.current.time).toBe(1000);
  });

  it('pause останавливает отсчёт времени', () => {
    const { result } = renderHook(() =>
      useTimer({ interval: 1000, startTime: 0 }),
    );

    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(2000));
    act(() => result.current.pause());

    expect(result.current.isRunning).toBe(false);
    const timeAfterPause = result.current.time;

    act(() => jest.advanceTimersByTime(2000));
    expect(result.current.time).toBe(timeAfterPause);
  });

  it('reset останавливает таймер и сбрасывает время на startTime', () => {
    const startTime = 0;
    const { result } = renderHook(() =>
      useTimer({ interval: 1000, startTime }),
    );

    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(3000));
    act(() => result.current.reset());

    expect(result.current.time).toBe(startTime);
    expect(result.current.isRunning).toBe(false);
  });

  it('вызывает onTimeOver когда время INCREMENTAL таймера достигает endTime', () => {
    const onTimeOver = jest.fn();
    const { result } = renderHook(() =>
      useTimer({
        interval: 1000,
        startTime: 0,
        endTime: 2000,
        timerType: 'INCREMENTAL',
        onTimeOver,
      }),
    );

    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(3000));

    expect(onTimeOver).toHaveBeenCalledTimes(1);
    expect(result.current.isRunning).toBe(false);
  });

  it('вызывает onTimeOver когда время DECREMENTAL таймера достигает endTime', () => {
    const onTimeOver = jest.fn();
    const { result } = renderHook(() =>
      useTimer({
        interval: 1000,
        startTime: 3000,
        endTime: 0,
        timerType: 'DECREMENTAL',
        onTimeOver,
      }),
    );

    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(4000));

    expect(onTimeOver).toHaveBeenCalledTimes(1);
    expect(result.current.isRunning).toBe(false);
  });

  it('повторный вызов start не создаёт дополнительный интервал', () => {
    const { result } = renderHook(() =>
      useTimer({ interval: 1000, startTime: 0 }),
    );

    act(() => result.current.start());
    act(() => result.current.start());
    act(() => jest.advanceTimersByTime(1000));

    expect(result.current.time).toBe(1000);
  });
});
