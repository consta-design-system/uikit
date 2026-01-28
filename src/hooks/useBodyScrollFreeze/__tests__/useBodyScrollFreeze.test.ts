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

  it('добавляет класс и CSS переменную при монтировании с active=true', () => {
    renderHook(() => useBodyScrollFreeze(true));

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(true);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).not.toBe('');
  });

  it('не добавляет класс и CSS переменную при монтировании с active=false', () => {
    renderHook(() => useBodyScrollFreeze(false));

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(false);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).toBe('');
  });

  it('добавляет класс и CSS переменную при смене active с false на true', () => {
    const { rerender } = renderHook(
      ({ active }) => useBodyScrollFreeze(active),
      {
        initialProps: { active: false },
      },
    );

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(false);

    rerender({ active: true });

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(true);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).not.toBe('');
  });

  it('удаляет класс и CSS переменную при смене active с true на false', () => {
    const { rerender } = renderHook(
      ({ active }) => useBodyScrollFreeze(active),
      {
        initialProps: { active: true },
      },
    );

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(true);

    rerender({ active: false });

    expect(
      document.documentElement.classList.contains(cnBodyScrollFreeze()),
    ).toBe(false);
    expect(
      document.documentElement.style.getPropertyValue(SCROLLBAR_WIDTH_VAR),
    ).toBe('');
  });
});
