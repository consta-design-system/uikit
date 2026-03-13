import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnSaturation, ColorPickerSaturation } from '../ColorPickerSaturation';
import { HsvaColor } from '../types';

type ColorPickerSaturationProps = React.ComponentProps<
  typeof ColorPickerSaturation
>;

const testId = cnSaturation();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (props: ColorPickerSaturationProps) => {
  return render(<ColorPickerSaturation data-testid={testId} {...props} />);
};

describe('Компонент ColorPickerSaturation', () => {
  it('должен рендериться без ошибок', () => {
    const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
    expect(() =>
      renderComponent({
        hsva,
        onChange: jest.fn(),
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    const hsva: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({ hsva, onChange: jest.fn(), className });
        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({ hsva, onChange: jest.fn(), style });
        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ hsva, onChange: jest.fn(), ref });
        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка фона', () => {
      it('устанавливает корректный цвет фона на основе hue', () => {
        const hsva = { h: 180, s: 100, v: 100, a: 1 };
        renderComponent({ hsva, onChange: jest.fn() });
        const element = getRender();
        expect(element).toHaveStyle({
          backgroundColor: 'hsl(180, 100%, 50%)',
        });
      });
    });

    describe('проверка позиции указателя', () => {
      it('позиция указателя корректно вычисляется по s и v', () => {
        const hsva = { h: 0, s: 30, v: 60, a: 1 };
        renderComponent({ hsva, onChange: jest.fn() });
        const pointer = screen
          .getByRole('slider')
          .querySelector('[class*="Pointer"]');
        expect(pointer).toHaveStyle({
          left: `${hsva.s}%`,
          top: `${(1 - hsva.v / 100) * 100}%`,
        });
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при нажатии клавиш стрелок', () => {
      const hsva: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      const onChange = jest.fn();
      renderComponent({ hsva, onChange });

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        s: expect.closeTo(55, 0),
        v: expect.closeTo(50, 0),
      });
    });

    it('вызывает onChange при нажатии стрелки вниз', () => {
      const hsva: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      const onChange = jest.fn();
      renderComponent({ hsva, onChange });

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { keyCode: 40 }); // ArrowDown

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        s: expect.closeTo(50, 0),
        v: expect.closeTo(45, 0),
      });
    });

    it('вызывает onChange при перемещении указателя', () => {
      const hsva: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
      const onChange = jest.fn();
      renderComponent({ hsva, onChange });

      const slider = screen.getByRole('slider');
      fireEvent.mouseDown(slider, { clientX: 100, clientY: 100 });
      fireEvent.mouseMove(slider, { clientX: 200, clientY: 200 });
      fireEvent.mouseUp(slider);

      expect(onChange).toHaveBeenCalled();
    });
  });
});
