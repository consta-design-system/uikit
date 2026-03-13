import { act, renderHook } from '@testing-library/react';

import { useColorManipulation } from '../hooks/useColorManipulation';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

describe('useColorManipulation', () => {
  it('возвращает начальное hsva и функцию обновления', () => {
    const color: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    const { result } = renderHook(() =>
      useColorManipulation(hsvaModel, color, jest.fn()),
    );
    expect(result.current[0]).toEqual(color);
    expect(typeof result.current[1]).toBe('function');
  });

  it('обновляет hsva при изменении внешнего цвета', () => {
    const initial: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    const updated: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };
    const { result, rerender } = renderHook(
      ({ color }) => useColorManipulation(hsvaModel, color, jest.fn()),
      { initialProps: { color: initial } },
    );
    expect(result.current[0]).toEqual(initial);
    rerender({ color: updated });
    expect(result.current[0]).toEqual(updated);
  });

  it('вызывает onChange при изменении hsva', () => {
    const onChange = jest.fn();
    const color: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    const { result } = renderHook(() =>
      useColorManipulation(hsvaModel, color, onChange),
    );
    act(() => {
      result.current[1]({ h: 180 });
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    const newColor = onChange.mock.calls[0][0];
    expect(newColor).toEqual({ h: 180, s: 0, v: 0, a: 1 });
  });

  it('не вызывает onChange, если hsva не изменилась', () => {
    const onChange = jest.fn();
    const color: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    const { result } = renderHook(() =>
      useColorManipulation(hsvaModel, color, onChange),
    );
    act(() => {
      result.current[1]({});
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('обрабатывает частичное обновление hsva', () => {
    const onChange = jest.fn();
    const color: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
    const { result } = renderHook(() =>
      useColorManipulation(hsvaModel, color, onChange),
    );
    act(() => {
      result.current[1]({ s: 100 });
    });
    expect(result.current[0]).toEqual({ h: 0, s: 100, v: 50, a: 1 });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
