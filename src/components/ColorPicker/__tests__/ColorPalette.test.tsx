import { render, screen } from '@testing-library/react';
import React from 'react';

import { cn } from '##/utils/bem';

import {
  cnColorMarker,
  ColorModel,
  ColorPalette,
  hexModel,
  hsvaModel,
} from '..';

type ColorPaletteProps = React.ComponentProps<typeof ColorPalette>;

const cnColorPalette = cn('ColorPalette');
const testId = cnColorPalette();

function getRender() {
  return screen.getByTestId(testId);
}

const castModel = <T,>(model: ColorModel<T>): ColorModel<unknown> =>
  model as ColorModel<unknown>;

const renderComponent = (
  props: Omit<ColorPaletteProps, 'model'> & {
    model: ColorModel<unknown>;
  },
) => {
  return render(<ColorPalette data-testid={testId} {...props} />);
};

describe('Компонент ColorPalette', () => {
  it('должен рендериться без ошибок', () => {
    expect(() =>
      renderComponent({
        model: castModel(hsvaModel),
        items: [],
      }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      (['xs', 's', 'm', 'l'] as const).forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          const items = [hsvaModel.defaultColor];
          renderComponent({
            model: castModel(hsvaModel),
            items,
            size,
          });

          const colorMarkers = screen.getAllByRole('button');
          expect(colorMarkers).toHaveLength(1);
          expect(colorMarkers[0]).toHaveClass(cnColorMarker({ size }));
        });
      });
    });

    describe('проверка form', () => {
      (['default', 'brick', 'round'] as const).forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          const items = [hsvaModel.defaultColor];
          renderComponent({
            model: castModel(hsvaModel),
            items,
            form,
          });

          const colorMarkers = screen.getAllByRole('button');
          expect(colorMarkers).toHaveLength(1);
          expect(colorMarkers[0]).toHaveClass(cnColorMarker({ form }));
        });
      });
    });

    describe('проверка items', () => {
      it('рендерит правильное количество ColorMarker', () => {
        const items = [
          hsvaModel.defaultColor,
          { h: 0, s: 100, v: 100, a: 1 },
          { h: 120, s: 100, v: 100, a: 1 },
        ];
        renderComponent({
          model: castModel(hsvaModel),
          items,
        });

        const colorMarkers = screen.getAllByRole('button');
        expect(colorMarkers).toHaveLength(items.length);
      });

      it('не рендерит ColorMarker при пустом массиве', () => {
        renderComponent({
          model: castModel(hsvaModel),
          items: [],
        });

        const colorMarkers = screen.queryAllByRole('button');
        expect(colorMarkers).toHaveLength(0);
      });
    });

    describe('проверка value', () => {
      it('активный ColorMarker помечается active', () => {
        const items = [hsvaModel.defaultColor, { h: 0, s: 100, v: 100, a: 1 }];
        renderComponent({
          model: castModel(hsvaModel),
          items,
          value: items[1],
        });

        const colorMarkers = screen.getAllByRole('button');
        expect(colorMarkers).toHaveLength(2);
        expect(colorMarkers[1]).toHaveClass(cnColorMarker({ active: true }));
        expect(colorMarkers[0]).not.toHaveClass(
          cnColorMarker({ active: true }),
        );
      });

      it('нет активного ColorMarker при отсутствии value', () => {
        const items = [hsvaModel.defaultColor];
        renderComponent({
          model: castModel(hsvaModel),
          items,
        });

        const colorMarkers = screen.getAllByRole('button');
        expect(colorMarkers).toHaveLength(1);
        expect(colorMarkers[0]).not.toHaveClass(
          cnColorMarker({ active: true }),
        );
      });
    });

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({
          model: castModel(hsvaModel),
          items: [],
          className,
        });

        expect(getRender()).toHaveClass(className);
      });
    });

    describe('проверка style', () => {
      it('присваивает дополнительные стили', () => {
        const style = { color: 'red' };
        renderComponent({
          model: castModel(hsvaModel),
          items: [],
          style,
        });

        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({
          model: castModel(hsvaModel),
          items: [],
          ref,
        });

        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка модели', () => {
      it('работает с разными моделями', () => {
        const items = ['#ff0000', '#00ff00'];
        renderComponent({
          model: castModel(hexModel),
          items,
        });

        const colorMarkers = screen.getAllByRole('button');
        expect(colorMarkers).toHaveLength(items.length);
      });

      it('цвета отображаются верно для hex модели', () => {
        const items = ['#ff0000', '#00ff00'];
        renderComponent({
          model: castModel(hexModel),
          items,
        });

        const colorMarkers = screen.getAllByRole('button');
        expect(colorMarkers).toHaveLength(items.length);
        // Проверяем CSS переменные для первого цвета
        expect(colorMarkers[0]).toHaveStyle({
          '--color-picker-marker-color': 'hsl(0, 100%, 50%)',
          '--color-picker-marker-color-with-alpha': 'hsla(0, 100%, 50%, 1)',
        });
        // Для второго цвета
        expect(colorMarkers[1]).toHaveStyle({
          '--color-picker-marker-color': 'hsl(120, 100%, 50%)',
          '--color-picker-marker-color-with-alpha': 'hsla(120, 100%, 50%, 1)',
        });
      });

      it('цвета отображаются верно для hsva модели', () => {
        const items = [
          { h: 0, s: 100, v: 100, a: 1 },
          { h: 120, s: 100, v: 100, a: 0.5 },
        ];
        renderComponent({
          model: castModel(hsvaModel),
          items,
        });

        const colorMarkers = screen.getAllByRole('button');
        expect(colorMarkers).toHaveLength(items.length);
        // Проверяем CSS переменные для первого цвета (hsl(0, 100%, 50%))
        expect(colorMarkers[0]).toHaveStyle({
          '--color-picker-marker-color': 'hsl(0, 100%, 50%)',
          '--color-picker-marker-color-with-alpha': 'hsla(0, 100%, 50%, 1)',
        });
        // Для второго цвета с alpha 0.5
        expect(colorMarkers[1]).toHaveStyle({
          '--color-picker-marker-color': 'hsl(120, 100%, 50%)',
          '--color-picker-marker-color-with-alpha': 'hsla(120, 100%, 50%, 0.5)',
        });
      });
    });

    describe('проверка onChange', () => {
      it('вызывает onChange при клике на ColorMarker с правильным цветом и событием', () => {
        const onChange = jest.fn();
        const items = [hsvaModel.defaultColor, { h: 0, s: 100, v: 100, a: 1 }];
        renderComponent({
          model: castModel(hsvaModel),
          items,
          onChange,
        });

        const colorMarkers = screen.getAllByRole('button');
        colorMarkers[0].click();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(items[0], expect.any(Object));
      });

      it('вызывает onChange с правильным цветом для второго маркера', () => {
        const onChange = jest.fn();
        const items = [hsvaModel.defaultColor, { h: 0, s: 100, v: 100, a: 1 }];
        renderComponent({
          model: castModel(hsvaModel),
          items,
          onChange,
        });

        const colorMarkers = screen.getAllByRole('button');
        colorMarkers[1].click();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(items[1], expect.any(Object));
      });
    });
  });
});
