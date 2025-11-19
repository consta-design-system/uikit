import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useRefs } from '##/hooks/useRefs';

import { useMouseLeave } from '../useMouseLeave';

const TestComponent = ({
  isActive = true,
  handler,
  debounce,
  itemsCount = 2,
}: {
  isActive?: boolean;
  handler: (event: any) => void;
  debounce?: number;
  itemsCount?: number;
}) => {
  const refs = useRefs<HTMLDivElement>(itemsCount);

  useMouseLeave({
    isActive,
    handler,
    refs,
    debounce,
  });

  return (
    <div>
      {refs.map((ref, index) => (
        <div
          key={index}
          ref={ref}
          data-testid={`test-item-${index}`}
          style={{ width: 100, height: 100 }}
        >
          Item {index}
        </div>
      ))}
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe('хук useMouseLeave', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('вызывает handler при уходе мыши с элемента', () => {
    const handler = jest.fn();
    render(<TestComponent handler={handler} />);

    const item0 = screen.getByTestId('test-item-0');

    fireEvent.mouseLeave(item0);

    jest.runAllTimers();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('не вызывает handler, если isActive = false', () => {
    const handler = jest.fn();
    render(<TestComponent handler={handler} isActive={false} />);

    const item0 = screen.getByTestId('test-item-0');

    fireEvent.mouseLeave(item0);
    jest.runAllTimers();

    expect(handler).not.toHaveBeenCalled();
  });

  it('не вызывает handler, если мышь перешла на другой отслеживаемый элемент (имитация группы)', () => {
    const handler = jest.fn();
    render(<TestComponent handler={handler} itemsCount={2} />);

    const item0 = screen.getByTestId('test-item-0');
    const item1 = screen.getByTestId('test-item-1');

    // Уходим с первого элемента
    fireEvent.mouseLeave(item0);

    // И сразу двигаем мышью внутри второго
    fireEvent.mouseMove(item1);

    jest.runAllTimers();

    // Handler не должен вызваться, так как мы остались "внутри" группы
    expect(handler).not.toHaveBeenCalled();
  });

  it('не вызывает handler, если мышь вернулась обратно на тот же элемент до срабатывания debounce', () => {
    const handler = jest.fn();
    const debounce = 100;
    render(<TestComponent handler={handler} debounce={debounce} />);

    const item0 = screen.getByTestId('test-item-0');

    // Уходим
    fireEvent.mouseLeave(item0);

    // Возвращаемся до истечения таймера
    jest.advanceTimersByTime(50);
    fireEvent.mouseMove(item0);

    // Завершаем таймер
    jest.advanceTimersByTime(100);

    expect(handler).not.toHaveBeenCalled();
  });

  it('учитывает задержку debounce', () => {
    const handler = jest.fn();
    const debounce = 200;
    render(<TestComponent handler={handler} debounce={debounce} />);

    const item0 = screen.getByTestId('test-item-0');

    fireEvent.mouseLeave(item0);

    // половина времени
    jest.advanceTimersByTime(100);
    expect(handler).not.toHaveBeenCalled();

    // все время
    jest.advanceTimersByTime(100);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
