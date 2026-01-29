import { renderHook } from '@testing-library/react-hooks';

import {
  cnBodyScrollFreeze,
  SCROLLBAR_WIDTH_VAR,
  useBodyScrollFreeze,
} from '../useBodyScrollFreeze';

describe('Хук useBodyScrollFreeze', () => {
  afterEach(() => {
    document.documentElement.classList.remove(cnBodyScrollFreeze());
    document.documentElement.style.removeProperty(SCROLLBAR_WIDTH_VAR);
  });

  it('добавляет класс и CSS переменную при монтировании с isActive=true', () => {
    renderHook(() => useBodyScrollFreeze({ isActive: true }));

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(true);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).not.toBe('');
  });

  it('не добавляет класс и CSS переменную при монтировании с isActive=false', () => {
    renderHook(() => useBodyScrollFreeze({ isActive: false }));

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(false);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).toBe('');
  });

  it('добавляет класс и CSS переменную при смене isActive с false на true', () => {
    const { rerender } = renderHook(
      ({ isActive }) => useBodyScrollFreeze({ isActive }),
      {
        initialProps: { isActive: false },
      },
    );

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(false);

    rerender({ isActive: true });

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(true);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).not.toBe('');
  });

  it('удаляет класс и CSS переменную при смене isActive с true на false', () => {
    const { rerender } = renderHook(
      ({ isActive }) => useBodyScrollFreeze({ isActive }),
      {
        initialProps: { isActive: true },
      },
    );

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(true);

    rerender({ isActive: false });

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(false);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).toBe('');
  });
});
