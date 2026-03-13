import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ColorPickerBase } from '../ColorPickerBase';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

type ColorPickerBaseProps<T> = React.ComponentProps<typeof ColorPickerBase<T>>;

const testId = 'ColorPickerBase';

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = <T,>(props: ColorPickerBaseProps<T>) => {
  return render(<ColorPickerBase<T> data-testid={testId} {...props} />);
};

describe('Компонент ColorPickerBase', () => {
  it('должен рендериться без ошибок', () => {
    const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    expect(() =>
      renderComponent({
        model: hsvaModel,
        value,
        onChange: jest.fn(),
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    const value: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          className,
        });
        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          style,
        });
        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ model: hsvaModel, value, onChange: jest.fn(), ref });
        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка alpha', () => {
      it('при alpha=true рендерится ColorPickerAlpha', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          alpha: true,
        });
        // ColorPickerAlpha имеет класс ColorPickerAlpha
        const alphaElement = document.querySelector('.ColorPickerAlpha');
        expect(alphaElement).toBeInTheDocument();
      });

      it('при alpha=false не рендерится ColorPickerAlpha', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          alpha: false,
        });
        const alphaElement = document.querySelector('.ColorPickerAlpha');
        expect(alphaElement).not.toBeInTheDocument();
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при изменении saturation', () => {
      const onChange = jest.fn();
      renderComponent({
        model: hsvaModel,
        value: { h: 0, s: 50, v: 50, a: 1 },
        onChange,
        alpha: false,
      });
      // Находим слайдер saturation (первый слайдер)
      const sliders = screen.getAllByRole('slider');
      const saturationSlider = sliders[0];
      fireEvent.keyDown(saturationSlider, { keyCode: 39 }); // ArrowRight
      expect(onChange).toHaveBeenCalledTimes(1);
      // Проверяем, что onChange вызван с объектом, содержащим s и v
      expect(onChange.mock.calls[0][0]).toMatchObject({
        s: expect.closeTo(55, 0),
        v: expect.closeTo(50, 0),
      });
    });

    it('вызывает onChange при изменении hue', () => {
      const onChange = jest.fn();
      renderComponent({
        model: hsvaModel,
        value: { h: 180, s: 50, v: 50, a: 1 },
        onChange,
        alpha: false,
      });
      // Hue слайдер второй по порядку
      const sliders = screen.getAllByRole('slider');
      const hueSlider = sliders[1];
      fireEvent.keyDown(hueSlider, { keyCode: 39 }); // ArrowRight
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toMatchObject({
        h: expect.closeTo(198, 0),
      });
    });

    it('вызывает onChange при изменении alpha, если alpha=true', () => {
      const onChange = jest.fn();
      renderComponent({
        model: hsvaModel,
        value: { h: 0, s: 0, v: 0, a: 0.5 },
        onChange,
        alpha: true,
      });
      // Alpha слайдер третий
      const sliders = screen.getAllByRole('slider');
      const alphaSlider = sliders[2];
      fireEvent.keyDown(alphaSlider, { keyCode: 39 }); // ArrowRight
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toMatchObject({
        a: expect.closeTo(0.55, 2),
      });
    });
  });
});
