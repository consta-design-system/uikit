import { renderHook } from '@testing-library/react';

import { usePrevious } from '../usePrevious';

describe('Хук usePrevious', () => {
  it('при первом рендере возвращает начальное значение', () => {
    const { result } = renderHook(() => usePrevious('initial'));
    expect(result.current).toBe('initial');
  });

  it('после обновления возвращает предыдущее значение', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    expect(result.current).toBe('first');
  });

  it('корректно отслеживает несколько последовательных обновлений', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);

    rerender({ value: 4 });
    expect(result.current).toBe(3);
  });

  it('работает с объектами и сохраняет ссылку на предыдущий объект', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: obj1 as { a: number } },
    });

    rerender({ value: obj2 });
    expect(result.current).toBe(obj1);
  });

  it('работает с числовыми значениями', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    rerender({ value: 42 });
    expect(result.current).toBe(0);
  });

  it('работает с булевыми значениями', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: false },
    });

    rerender({ value: true });
    expect(result.current).toBe(false);
  });
});
