import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SliderInput } from '../SliderInput/SliderInput';

const testId = 'SliderInput';

const renderComponent = (props: React.ComponentProps<typeof SliderInput>) => {
  return render(<SliderInput data-testid={testId} {...props} />);
};

const getSliderInput = () => screen.getByRole('spinbutton');

describe('Компонент SliderInput', () => {
  it('рендерится без ошибок', () => {
    expect(() => renderComponent({ value: 50 })).not.toThrow();
  });

  it('отображает начальное значение', () => {
    const value = 50;
    renderComponent({ value });
    const input = getSliderInput();

    expect(input).toHaveValue(value);
  });

  it('вызывает onChange при вводе валидного значения', () => {
    const handleChange = jest.fn();

    renderComponent({ value: 50, onChange: handleChange, max: 100 });
    const input = getSliderInput();
    fireEvent.change(input, { target: { value: '75' } });

    expect(handleChange).toHaveBeenCalledWith({
      value: 75,
      e: expect.any(Object),
    });
  });

  it('не вызывает onChange при вводе невалидного значения', () => {
    const handleChange = jest.fn();

    renderComponent({ value: 50, onChange: handleChange, max: 100 });
    const input = getSliderInput();
    fireEvent.change(input, { target: { value: '150' } });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('при потере фокуса (blur) корректирует значение до max', () => {
    const handleChange = jest.fn();
    const max = 100;

    renderComponent({ value: 50, onChange: handleChange, max });
    const input = getSliderInput();
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalledWith({ value: max });
    expect(input).toHaveValue(max);
  });

  it('при потере фокуса (blur) корректирует значение до min', () => {
    const handleChange = jest.fn();
    const min = 10;

    renderComponent({ value: 50, onChange: handleChange, min });
    const input = getSliderInput();
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);

    expect(handleChange).toHaveBeenCalledWith({ value: min });
    expect(input).toHaveValue(min);
  });

  it('обновляет значение при изменении props.value', () => {
    const { rerender } = renderComponent({ value: 50 });

    const input = getSliderInput();
    expect(input).toHaveValue(50);

    const newValue = 75;
    rerender(<SliderInput data-testid={testId} value={newValue} />);
    expect(input).toHaveValue(newValue);
  });

  it('отключен, если disabled=true', () => {
    renderComponent({ value: 50, disabled: true });

    const input = getSliderInput();
    expect(input).toBeDisabled();
  });
});
