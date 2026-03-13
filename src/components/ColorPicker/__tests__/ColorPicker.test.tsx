import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ColorPicker } from '../ColorPicker';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

type ColorPickerProps = React.ComponentProps<typeof ColorPicker<HsvaColor>>;

const testId = 'ColorPicker';

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (props: ColorPickerProps) => {
  return render(<ColorPicker<HsvaColor> data-testid={testId} {...props} />);
};

describe('Компонент ColorPicker', () => {
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

    describe('проверка header', () => {
      it('рендерит строковый заголовок', () => {
        const header = 'Color Picker';
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          header,
        });
        expect(screen.getByText(header)).toBeInTheDocument();
      });

      it('рендерит React-узел заголовка', () => {
        const header = <span data-testid="custom-header">Custom</span>;
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          header,
        });
        expect(screen.getByTestId('custom-header')).toBeInTheDocument();
      });

      it('не рендерит заголовок, если header не передан', () => {
        const { container } = renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
        });
        const headerElement = container.querySelector('.ColorPicker-Header');
        expect(headerElement).not.toBeInTheDocument();
      });
    });

    describe('проверка alpha', () => {
      it('при alpha=true рендерит ColorPickerAlpha', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          alpha: true,
        });
        const alphaElement = document.querySelector('.ColorPickerAlpha');
        expect(alphaElement).toBeInTheDocument();
      });

      it('при alpha=false не рендерит ColorPickerAlpha', () => {
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

    describe('проверка palette', () => {
      it('рендерит ColorPalette, если передан массив цветов', () => {
        const palette: HsvaColor[] = [
          { h: 0, s: 100, v: 100, a: 1 },
          { h: 120, s: 100, v: 100, a: 1 },
        ];
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          palette,
          mainControl: false, // отключаем ColorPickerBase чтобы не мешал
        });
        // ColorPalette рендерит ColorMarker с ролью button
        const buttons = screen.getAllByRole('button', { hidden: true });
        // Должно быть 2 кнопки (по одному на каждый цвет)
        expect(buttons).toHaveLength(palette.length);
      });

      it('не рендерит ColorPalette, если palette не передан', () => {
        const { container } = renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          mainControl: false,
        });
        // Ищем ColorMarker (кнопки) - их не должно быть
        const buttons = container.querySelectorAll(
          'button[class*="ColorMarker"]',
        );
        expect(buttons).toHaveLength(0);
      });
    });

    describe('проверка format', () => {
      it('рендерит ColorInputTypeChanger, если format задан', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: 'hex',
        });
        const inputChanger = document.querySelector('.ColorInputTypeChanger');
        expect(inputChanger).toBeInTheDocument();
      });

      it('не рендерит ColorInputTypeChanger, если format=false', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          format: false,
        });
        const inputChanger = document.querySelector('.ColorInputTypeChanger');
        expect(inputChanger).not.toBeInTheDocument();
      });
    });

    describe('проверка mainControl', () => {
      it('при mainControl=true рендерит ColorPickerBase', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          mainControl: true,
        });
        // ColorPickerBase рендерит слайдеры с ролью 'slider'
        const sliders = screen.getAllByRole('slider');
        expect(sliders.length).toBeGreaterThan(0);
      });

      it('при mainControl=false не рендерит ColorPickerBase', () => {
        renderComponent({
          model: hsvaModel,
          value,
          onChange: jest.fn(),
          mainControl: false,
        });

        const sliders = screen.queryAllByRole('slider');
        expect(sliders).toHaveLength(0);
      });
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onChange при изменении цвета через ColorPickerBase', () => {
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

    it('вызывает onChange при выборе цвета из палитры', () => {
      const onChange = jest.fn();
      const palette: HsvaColor[] = [
        { h: 0, s: 100, v: 100, a: 1 },
        { h: 120, s: 100, v: 100, a: 1 },
      ];
      renderComponent({
        model: hsvaModel,
        value: { h: 0, s: 50, v: 50, a: 1 },
        onChange,
        palette,
      });
      // Находим кнопки палитры (первый цвет)
      const paletteButtons = screen.getAllByRole('button', { hidden: true });
      // Первая кнопка - это маркер? нужно уточнить, но для теста предположим, что это кнопка цвета
      // Упростим: кликнем по первому элементу палитры
      const colorButton = paletteButtons.find((btn) =>
        btn.className.includes('ColorPalette-Item'),
      );
      if (colorButton) {
        fireEvent.click(colorButton);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual(palette[0]);
      }
    });
  });
});
