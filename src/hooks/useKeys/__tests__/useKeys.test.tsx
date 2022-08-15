import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React, { HTMLAttributes } from 'react';

import { useKeys } from '../useKeys';

const testId = 'inputTestId';
const renderComponent = (props: HTMLAttributes<HTMLInputElement>) => {
  return render(<input {...props} data-testid={testId} />);
};

describe('Хук useKeys', () => {
  it('должен вызываться без ошибок', () => {
    expect(() => renderHook(() => useKeys({}))).not.toThrow();
  });

  describe('проверка onKeyDown', () => {
    it('создает обработчик onKeyDown по умолчанию', () => {
      const { result } = renderHook(() => useKeys({}));
      const { current } = result;

      expect(current()).toHaveProperty('onKeyDown');
    });

    it('связывает обработчик onKeyDown с нужными key', () => {
      const handler = jest.fn();
      const { result } = renderHook(() => useKeys({ Alt: handler }));
      renderComponent(result.current());

      fireEvent.keyDown(screen.getByTestId(testId), { key: 'Enter' });
      expect(handler).not.toBeCalled();

      fireEvent.keyDown(screen.getByTestId(testId), { key: 'Alt' });
      expect(handler).toBeCalled();
    });

    it('связывает обработчик onKeyDown с нужными keyCode', () => {
      const handler = jest.fn();
      const { result } = renderHook(() => useKeys({ 2: handler }));
      renderComponent(result.current());

      fireEvent.keyDown(screen.getByTestId(testId), { keyCode: 1 });
      expect(handler).not.toBeCalled();

      fireEvent.keyDown(screen.getByTestId(testId), { keyCode: 2 });
      expect(handler).toBeCalled();
    });

    it('обработчик onKeyDown по умолчанию вызывает передаваемый обработчик', () => {
      const handler = jest.fn();
      const { result } = renderHook(() => useKeys({}));
      renderComponent(result.current({ onKeyDown: handler }));

      fireEvent.keyDown(screen.getByTestId(testId), { key: 'Alt' });
      expect(handler).toBeCalled();
    });
  });

  it('итоговый объект содержит переданные обработчики', () => {
    const { result } = renderHook(() => useKeys({}));
    const handlers = result.current({
      onKeyDown: jest.fn(),
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onClick: jest.fn(),
      onBlur: jest.fn(),
    });

    expect(handlers).toHaveProperty('onKeyDown');
    expect(handlers).toHaveProperty('onChange');
    expect(handlers).toHaveProperty('onFocus');
    expect(handlers).toHaveProperty('onClick');
    expect(handlers).toHaveProperty('onBlur');
  });
});
