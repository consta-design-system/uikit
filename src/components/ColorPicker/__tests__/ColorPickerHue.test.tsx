import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnColorPickerHue, ColorPickerHue } from '../ColorPickerHue';

type ColorPickerHueProps = React.ComponentProps<typeof ColorPickerHue>;

const testId = cnColorPickerHue();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (props: ColorPickerHueProps) => {
  return render(<ColorPickerHue data-testid={testId} {...props} />);
};

describe('Компонент ColorPickerHue', () => {
  it('должен рендериться без ошибок', () => {
    expect(() =>
      renderComponent({
        hue: 180,
        onChange: jest.fn(),
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    const hue = 120;

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({ hue, onChange: jest.fn(), className });
        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({ hue, onChange: jest.fn(), style });
        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ hue, onChange: jest.fn(), ref });
        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка hue', () => {
      it('позиция указателя корректно вычисляется', () => {
        const hue = 270;
        renderComponent({ hue, onChange: jest.fn() });
        const pointer = screen
          .getByRole('slider')
          .querySelector('[class*="Pointer"]');
        expect(pointer).toHaveStyle({ left: `${(hue / 360) * 100}%` });
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при клике на левую кнопку', () => {
      const hue = 180;
      const onChange = jest.fn();
      renderComponent({ hue, onChange });

      const buttons = screen.getAllByRole('button', { hidden: true });
      const leftButton = buttons[0];
      fireEvent.click(leftButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ h: 0 });
    });

    it('вызывает onChange при клике на правую кнопку', () => {
      const hue = 180;
      const onChange = jest.fn();
      renderComponent({ hue, onChange });

      const buttons = screen.getAllByRole('button', { hidden: true });
      const rightButton = buttons[1];
      fireEvent.click(rightButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ h: 360 });
    });

    it('вызывает onChange при нажатии клавиш стрелок', () => {
      const hue = 180;
      const onChange = jest.fn();
      renderComponent({ hue, onChange });

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ h: expect.closeTo(198, 0) });
    });

    it('вызывает onChange при перемещении указателя', () => {
      const hue = 180;
      const onChange = jest.fn();
      renderComponent({ hue, onChange });

      const slider = screen.getByRole('slider');
      fireEvent.mouseDown(slider, { clientX: 100, clientY: 10 });
      // Симуляция движения мыши
      fireEvent.mouseMove(slider, { clientX: 200, clientY: 10 });
      fireEvent.mouseUp(slider);

      expect(onChange).toHaveBeenCalled();
    });
  });
});
