import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ColorPickerInput } from '../ColorPickerInput';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

type ColorPickerInputProps<T> = React.ComponentProps<
  typeof ColorPickerInput<T>
>;

const testId = 'ColorPickerInput';

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = <T,>(props: ColorPickerInputProps<T>) => {
  return render(<ColorPickerInput<T> data-testid={testId} {...props} />);
};

describe('Компонент ColorPickerInput', () => {
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

    describe('проверка format и alpha', () => {
      it('при format="hex" и alpha=false рендерит одно поле', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hex',
          alpha: false,
        });
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(1);
        expect(inputs[0]).toHaveAttribute('type', 'text');
      });

      it('при format="hex" и alpha=true рендерит два поля', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hex',
          alpha: true,
        });
        const textBoxes = screen.getAllByRole('textbox');
        const spinButtons = screen.getAllByRole('spinbutton');
        expect(textBoxes).toHaveLength(1);
        expect(spinButtons).toHaveLength(1);
        expect(textBoxes[0]).toHaveAttribute('type', 'text');
        expect(spinButtons[0]).toHaveAttribute('type', 'number');
      });

      it('при format="rgb" и alpha=false рендерит три поля', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'rgb',
          alpha: false,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs).toHaveLength(3);
      });

      it('при format="rgb" и alpha=true рендерит четыре поля', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'rgb',
          alpha: true,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs).toHaveLength(4);
      });

      it('при format="hsl" и alpha=false рендерит три поля', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hsl',
          alpha: false,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs).toHaveLength(3);
      });

      it('при format="hsv" и alpha=false рендерит три поля', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hsv',
          alpha: false,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs).toHaveLength(3);
      });
    });

    describe('проверка значений по умолчанию', () => {
      it('для hex формат отображает правильное значение', () => {
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hex',
          alpha: false,
        });
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('ff0000');
      });

      it('для rgb формат отображает правильные значения', () => {
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'rgb',
          alpha: false,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(255);
        expect(inputs[1]).toHaveValue(0);
        expect(inputs[2]).toHaveValue(0);
      });

      it('для hsl формат отображает правильные значения', () => {
        const value: HsvaColor = { h: 120, s: 100, v: 100, a: 1 };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hsl',
          alpha: false,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(120);
        expect(inputs[1]).toHaveValue(100);
        expect(inputs[2]).toHaveValue(50);
      });

      it('для hsv формат отображает правильные значения', () => {
        const value: HsvaColor = { h: 240, s: 50, v: 80, a: 1 };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hsv',
          alpha: false,
        });
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(240);
        expect(inputs[1]).toHaveValue(50);
        expect(inputs[2]).toHaveValue(80);
      });

      it('при alpha=true отображает поле alpha с правильным значением', () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'rgb',
          alpha: true,
        });
        const inputs = screen.getAllByRole('spinbutton');
        const alphaInput = inputs[3];
        expect(alphaInput).toHaveValue(50);
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при изменении hex поля', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hex',
        alpha: false,
      });
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '00ff00' } });
      fireEvent.blur(input);
      expect(onChange).toHaveBeenCalledTimes(1);
      // Проверяем, что onChange вызван с новым значением цвета
      const newColor = onChange.mock.calls[0][0];
      expect(newColor).toBeDefined();
    });

    it('вызывает onChange при изменении rgb поля', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'rgb',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '128' } });
      fireEvent.blur(inputs[0]);
      expect(onChange).toHaveBeenCalledTimes(1);
      const newColor = onChange.mock.calls[0][0];
      expect(newColor).toBeDefined();
    });

    it('вызывает onChange при изменении alpha поля', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 0.5 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'rgb',
        alpha: true,
      });
      const inputs = screen.getAllByRole('spinbutton');
      const alphaInput = inputs[3];
      fireEvent.change(alphaInput, { target: { value: '75' } });
      fireEvent.blur(alphaInput);
      expect(onChange).toHaveBeenCalledTimes(1);
      const newColor = onChange.mock.calls[0][0];
      expect(newColor).toBeDefined();
    });

    it('не вызывает onChange если значение не изменилось', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hex',
        alpha: false,
      });
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'ff0000' } });
      fireEvent.blur(input);
      // Значение осталось тем же, onChange не должен вызываться
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('проверка валидации', () => {
    it('исправляет некорректное hex значение', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hex',
        alpha: false,
      });
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'invalid' } });
      fireEvent.blur(input);
      // После blur значение должно быть исправлено на исходное
      expect(input).toHaveValue('ff0000');
    });

    it('ограничивает rgb значения максимумом 255', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'rgb',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '300' } });
      fireEvent.blur(inputs[0]);
      // После blur значение должно быть исправлено на 255
      expect(inputs[0]).toHaveValue(255);
    });

    it('ограничивает alpha значения максимумом 100', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 100, v: 100, a: 0.5 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'rgb',
        alpha: true,
      });
      const inputs = screen.getAllByRole('spinbutton');
      const alphaInput = inputs[3];
      fireEvent.change(alphaInput, { target: { value: '150' } });
      fireEvent.blur(alphaInput);
      expect(alphaInput).toHaveValue(100);
    });

    it('ограничивает hsv hue максимумом 359', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsv',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '400' } });
      fireEvent.blur(inputs[0]);
      expect(inputs[0]).toHaveValue(359);
    });

    it('ограничивает hsv saturation максимумом 100', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsv',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[1], { target: { value: '150' } });
      fireEvent.blur(inputs[1]);
      expect(inputs[1]).toHaveValue(100);
    });

    it('ограничивает hsv value максимумом 100', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsv',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[2], { target: { value: '200' } });
      fireEvent.blur(inputs[2]);
      expect(inputs[2]).toHaveValue(100);
    });

    it('ограничивает hsl hue максимумом 359', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsl',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '400' } });
      fireEvent.blur(inputs[0]);
      expect(inputs[0]).toHaveValue(359);
    });

    it('ограничивает hsl saturation максимумом 100', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsl',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[1], { target: { value: '150' } });
      fireEvent.blur(inputs[1]);
      expect(inputs[1]).toHaveValue(100);
    });

    it('ограничивает hsl lightness максимумом 100', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsl',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[2], { target: { value: '200' } });
      fireEvent.blur(inputs[2]);
      expect(inputs[2]).toHaveValue(100);
    });

    it('ограничивает отрицательные значения минимумом 0', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 50, s: 50, v: 50, a: 0.5 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'rgb',
        alpha: true,
      });
      const inputs = screen.getAllByRole('spinbutton');
      // Проверяем каждое поле
      fireEvent.change(inputs[0], { target: { value: '-10' } });
      fireEvent.blur(inputs[0]);
      expect(inputs[0]).toHaveValue(0);

      fireEvent.change(inputs[1], { target: { value: '-5' } });
      fireEvent.blur(inputs[1]);
      expect(inputs[1]).toHaveValue(0);

      fireEvent.change(inputs[2], { target: { value: '-20' } });
      fireEvent.blur(inputs[2]);
      expect(inputs[2]).toHaveValue(0);

      fireEvent.change(inputs[3], { target: { value: '-30' } });
      fireEvent.blur(inputs[3]);
      expect(inputs[3]).toHaveValue(0);
    });

    it('ограничивает отрицательные значения для hsv', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 50, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsv',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '-10' } });
      fireEvent.blur(inputs[0]);
      expect(inputs[0]).toHaveValue(0);

      fireEvent.change(inputs[1], { target: { value: '-5' } });
      fireEvent.blur(inputs[1]);
      expect(inputs[1]).toHaveValue(0);

      fireEvent.change(inputs[2], { target: { value: '-20' } });
      fireEvent.blur(inputs[2]);
      expect(inputs[2]).toHaveValue(0);
    });

    it('ограничивает отрицательные значения для hsl', () => {
      const onChange = jest.fn();
      const value: HsvaColor = { h: 50, s: 50, v: 50, a: 1 };
      renderComponent({
        model: hsvaModel,
        value,
        onChange,
        format: 'hsl',
        alpha: false,
      });
      const inputs = screen.getAllByRole('spinbutton');
      fireEvent.change(inputs[0], { target: { value: '-10' } });
      fireEvent.blur(inputs[0]);
      expect(inputs[0]).toHaveValue(0);

      fireEvent.change(inputs[1], { target: { value: '-5' } });
      fireEvent.blur(inputs[1]);
      expect(inputs[1]).toHaveValue(0);

      fireEvent.change(inputs[2], { target: { value: '-20' } });
      fireEvent.blur(inputs[2]);
      expect(inputs[2]).toHaveValue(0);
    });
  });
});
