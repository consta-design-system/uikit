import { fireEvent, renderHook } from '@testing-library/react';

import { useGlobalKeys } from '../useGlobalKeys';

describe('Хук useGlobalKeys', () => {
  it('по умолчанию вызывает keyUp событие при нажатии клавиши', () => {
    const handler = jest.fn();

    renderHook(() => useGlobalKeys({ Escape: handler }));

    fireEvent.keyUp(document, { key: 'Escape' });
    expect(handler).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });

  it('вызывает keyDown событие при нажатии клавиши', () => {
    const handler = jest.fn();

    renderHook(() => useGlobalKeys({ Escape: handler }, 'keydown'));

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handler).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });

  it('корректно работает с несколькими событиями', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    renderHook(() => useGlobalKeys({ Escape: handler1, Space: handler2 }));

    fireEvent.keyUp(document, { key: 'Escape' });
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(0);

    fireEvent.keyUp(document, { key: 'Space' });
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
