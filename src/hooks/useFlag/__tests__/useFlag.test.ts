import { act, renderHook } from '@testing-library/react';

import { useFlag } from '../useFlag';

describe('Хук useFlag', () => {
  it('должен инициализироваться с false по умолчанию', () => {
    const { result } = renderHook(() => useFlag());
    expect(result.current[0]).toBe(false);
  });

  it('должен инициализироваться с переданным значением', () => {
    const { result } = renderHook(() => useFlag(true));
    expect(result.current[0]).toBe(true);
  });

  it('on устанавливает значение в true', () => {
    const { result } = renderHook(() => useFlag(false));

    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);
  });

  it('off устанавливает значение в false', () => {
    const { result } = renderHook(() => useFlag(true));

    act(() => result.current[1].off());
    expect(result.current[0]).toBe(false);
  });

  it('повторный вызов on не меняет значение', () => {
    const { result } = renderHook(() => useFlag(true));

    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);
  });

  it('toggle переключает значение с false на true', () => {
    const { result } = renderHook(() => useFlag(false));

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
  });

  it('toggle переключает значение с true на false', () => {
    const { result } = renderHook(() => useFlag(true));

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
  });

  it('toggle корректно работает при нескольких вызовах', () => {
    const { result } = renderHook(() => useFlag(false));

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
  });

  it('set позволяет напрямую устанавливать значение', () => {
    const { result } = renderHook(() => useFlag(false));

    act(() => result.current[1].set(true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].set(false));
    expect(result.current[0]).toBe(false);
  });

  it('set принимает функцию обновления состояния', () => {
    const { result } = renderHook(() => useFlag(false));

    act(() => result.current[1].set((prev) => !prev));
    expect(result.current[0]).toBe(true);
  });
});
