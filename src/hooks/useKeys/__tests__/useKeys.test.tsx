import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import React from 'react';

import { useKeys } from '../useKeys';

const testId = 'useKeys';

const renderComponent = (
  handler: React.KeyboardEventHandler,
  id: string = testId,
) => render(<input data-testid={id} onKeyDown={handler} />);

describe('Хук useKeys', () => {
  it('должен вызываться без ошибок', () => {
    expect(() =>
      renderHook(() => useKeys({ keys: {}, isActive: true })),
    ).not.toThrow();
  });

  it('вызывает обработчик при нажатии соответствующей клавиши (e.code)', () => {
    const handler = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: { Enter: handler }, isActive: true }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Enter' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('вызывает обработчик при нажатии соответствующей клавиши (e.key)', () => {
    const handler = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: { Enter: handler }, isActive: true }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), { key: 'Enter' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('не вызывает обработчик для неизвестной клавиши', () => {
    const handler = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: { Enter: handler }, isActive: true }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), {
      code: 'Escape',
      key: 'Escape',
    });
    expect(handler).not.toHaveBeenCalled();
  });

  it('не вызывает обработчик клавиши когда isActive = false', () => {
    const handler = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: { Enter: handler }, isActive: false }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Enter' });
    expect(handler).not.toHaveBeenCalled();
  });

  it('всегда вызывает onEvent даже когда isActive = false', () => {
    const onEvent = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: {}, isActive: false, onEvent }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Enter' });
    expect(onEvent).toHaveBeenCalledTimes(1);
  });

  it('вызывает onEvent при нажатии любой клавиши', () => {
    const onEvent = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: {}, isActive: true, onEvent }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Enter' });
    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Escape' });
    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Space' });
    expect(onEvent).toHaveBeenCalledTimes(3);
  });

  it('вызывает обработчик и onEvent вместе при нажатии зарегистрированной клавиши', () => {
    const handler = jest.fn();
    const onEvent = jest.fn();
    const { result } = renderHook(() =>
      useKeys({ keys: { Enter: handler }, isActive: true, onEvent }),
    );
    renderComponent(result.current);

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Enter' });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(onEvent).toHaveBeenCalledTimes(1);
  });
});
