import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnColorPickerAlpha, ColorPickerAlpha } from '../ColorPickerAlpha';
import { HsvaColor } from '../types';

type ColorPickerAlphaProps = React.ComponentProps<typeof ColorPickerAlpha>;

const testId = cnColorPickerAlpha();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (props: ColorPickerAlphaProps) => {
  return render(<ColorPickerAlpha data-testid={testId} {...props} />);
};

describe('Компонент ColorPickerAlpha', () => {
  it('должен рендериться без ошибок', () => {
    const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
    expect(() =>
      renderComponent({
        hsva,
        onChange: jest.fn(),
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    const hsva: HsvaColor = { h: 120, s: 50, v: 75, a: 0.3 };

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

    describe('проверка градиента', () => {
      it('устанавливает CSS переменную --color-picker-alpha-gradient', () => {
        renderComponent({ hsva, onChange: jest.fn() });
        const gradient = getRender().style.getPropertyValue(
          '--color-picker-alpha-gradient',
        );
        expect(gradient).toContain('hsla');
      });

      it('градиент корректно вычисляется для hsva', () => {
        const hsva = { h: 0, s: 100, v: 100, a: 0.5 };
        renderComponent({ hsva, onChange: jest.fn() });
        const element = getRender();
        const gradient = element.style.getPropertyValue(
          '--color-picker-alpha-gradient',
        );
        expect(gradient).toMatch(/hsla\(0,\s*100%,\s*50%,\s*0\)/);
        expect(gradient).toMatch(/hsla\(0,\s*100%,\s*50%,\s*1\)/);
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при клике на левую кнопку', () => {
      const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
      const onChange = jest.fn();
      renderComponent({ hsva, onChange });

      const buttons = screen.getAllByRole('button', { hidden: true });
      const leftButton = buttons[0];
      fireEvent.click(leftButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ a: 0 });
    });

    it('вызывает onChange при клике на правую кнопку', () => {
      const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
      const onChange = jest.fn();
      renderComponent({ hsva, onChange });

      const buttons = screen.getAllByRole('button', { hidden: true });
      const rightButton = buttons[1];
      fireEvent.click(rightButton);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ a: 1 });
    });

    it('вызывает onChange при нажатии клавиш стрелок', () => {
      const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
      const onChange = jest.fn();
      renderComponent({ hsva, onChange });

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ a: expect.closeTo(0.55, 2) });
    });
  });
});
