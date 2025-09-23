import { IconQuestion } from '@consta/icons/IconQuestion';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SliderProps, sliderPropSize, SliderPropView } from '../helper';
import { Slider } from '../Slider';

const testId = 'Slider';

const renderComponent = <RANGE extends boolean = false>(
  props: SliderProps<RANGE>,
) => {
  return render(<Slider data-testid={testId} {...props} />);
};

const getRender = () => {
  return screen.getByTestId(testId);
};

const getPoints = () => {
  return getRender().querySelectorAll('[role="slider"]');
};

const getLine = () => {
  return getRender().querySelector('.SliderLine');
};

describe('Компонент Slider', () => {
  it('рендерится без ошибок', () => {
    expect(() => renderComponent({ value: 0 })).not.toThrow();
  });

  it('рендерится с range', () => {
    renderComponent({ value: [0, 100], range: true });
    expect(getPoints().length).toBe(2);
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      test.each(sliderPropSize)(`применяется класс для size=%p`, (size) => {
        renderComponent({ value: 0, size });
        expect(getRender()).toHaveClass(`Slider_size_${size}`);
      });
    });

    describe('проверка view', () => {
      test.each(['default', 'division'] as SliderPropView[])(
        'применяется класс для view=%p',
        (view) => {
          renderComponent({ value: 0, view });
          expect(getLine()).toHaveClass(`SliderLine_view_${view}`);
        },
      );
    });

    it('disabled отключает компонент', () => {
      const handleChange = jest.fn();
      renderComponent({ value: 0, disabled: true, onChange: handleChange });
      const point = getPoints()[0] as HTMLButtonElement;
      point.focus();

      fireEvent.keyDown(point, { key: 'ArrowRight' });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('отображает label и caption', () => {
      const label = 'Test Label';
      const caption = 'Test Caption';
      renderComponent({ value: 0, label, caption });
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(caption)).toBeInTheDocument();
    });

    it('отображает leftSide и rightSide как input', () => {
      renderComponent({
        value: [20, 80],
        range: true,
        leftSide: 'input',
        rightSide: 'input',
      });
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs.length).toBe(2);
      expect(inputs[0]).toHaveValue(20);
      expect(inputs[1]).toHaveValue(80);
    });

    it('отображает leftSide и rightSide как иконки', () => {
      renderComponent({
        value: [20, 80],
        range: true,
        leftSide: () => <IconQuestion data-testid="iconLeft" />,
        rightSide: () => <IconQuestion data-testid="iconRight" />,
      });
      expect(screen.getByTestId('iconLeft')).toBeInTheDocument();
      expect(screen.getByTestId('iconRight')).toBeInTheDocument();
    });

    it('изменяет значение с учетом step', () => {
      const handleChange = jest.fn();
      const step = 10;
      const initialValue = 50;
      renderComponent({
        value: initialValue,
        step,
        onChange: handleChange,
      });
      const point = getPoints()[0] as HTMLButtonElement;
      point.focus();

      fireEvent.keyDown(point, { key: 'ArrowRight' });

      expect(handleChange).toHaveBeenCalledWith(
        initialValue + step,
        expect.any(Object),
      );
    });

    describe('проверка min/max', () => {
      it('значение не может быть меньше min', () => {
        const handleChange = jest.fn();
        const min = 20;
        renderComponent({
          value: min,
          min,
          onChange: handleChange,
          leftSide: 'input',
        });
        const point = getPoints()[0] as HTMLButtonElement;
        point.focus();

        fireEvent.keyDown(point, { key: 'ArrowLeft' });
        expect(handleChange).toHaveBeenCalledWith(min, expect.any(Object));
      });

      it('значение не может быть больше max', () => {
        const handleChange = jest.fn();
        const max = 80;
        renderComponent({
          value: max,
          max,
          onChange: handleChange,
        });
        const point = getPoints()[0] as HTMLButtonElement;
        point.focus();

        fireEvent.keyDown(point, { key: 'ArrowRight' });
        expect(handleChange).toHaveBeenCalledWith(max, expect.any(Object));
      });

      it('поля ввода имеют правильные min/max для range', () => {
        const min = 10;
        const max = 90;
        const value: [number, number] = [30, 70];
        renderComponent({
          value,
          range: true,
          min,
          max,
          leftSide: 'input',
          rightSide: 'input',
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveAttribute('min', min.toString());
        expect(inputs[0]).toHaveAttribute('max', value[1].toString());
        expect(inputs[1]).toHaveAttribute('min', value[0].toString());
        expect(inputs[1]).toHaveAttribute('max', max.toString());
      });
    });
  });

  describe("проверка callback'ов", () => {
    it('onChange вызывается после изменения значения с SliderPoint', () => {
      const handleChange = jest.fn();
      renderComponent({ value: 50, onChange: handleChange });
      const point = getPoints()[0] as HTMLButtonElement;
      point.focus();
      fireEvent.keyDown(point, { key: 'ArrowRight' });
      expect(handleChange).toHaveBeenCalled();
    });

    it('onChange вызывается после изменения значения с SliderInput', () => {
      const handleChange = jest.fn();
      const initialValue = 50;
      renderComponent({
        value: initialValue,
        onChange: handleChange,
        leftSide: 'input',
      });

      const input = screen.getByRole('spinbutton');
      const newValue = 60;

      fireEvent.change(input, { target: { value: newValue.toString() } });
      fireEvent.blur(input);

      expect(handleChange).toHaveBeenCalledWith(newValue, expect.any(Object));
    });
  });
});
