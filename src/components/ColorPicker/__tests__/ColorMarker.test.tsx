import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  cnColorMarker,
  ColorMarker,
  ColorModel,
  hexModel,
  hsvaModel,
} from '..';

type ColorMarkerProps = React.ComponentProps<typeof ColorMarker>;

const testId = cnColorMarker();

function getRender() {
  return screen.getByTestId(testId);
}

const castModel = <T,>(model: ColorModel<T>): ColorModel<unknown> =>
  model as ColorModel<unknown>;

const renderComponent = (
  props: Omit<ColorMarkerProps, 'model'> & { model: ColorModel<unknown> },
) => {
  return render(<ColorMarker data-testid={testId} {...props} />);
};

describe('Компонент ColorMarker', () => {
  it('должен рендериться без ошибок', () => {
    expect(() =>
      renderComponent({ model: castModel(hsvaModel), value: undefined }),
    ).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      (['xs', 's', 'm', 'l'] as const).forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({
            model: castModel(hsvaModel),
            value: undefined,
            size,
          });
          expect(getRender()).toHaveClass(cnColorMarker({ size }));
        });
      });
    });

    describe('проверка active', () => {
      it('присваивает класс для active=true', () => {
        renderComponent({
          model: castModel(hsvaModel),
          value: undefined,
          active: true,
        });
        expect(getRender()).toHaveClass(cnColorMarker({ active: true }));
      });

      it('не присваивает класс для active=false', () => {
        renderComponent({
          model: castModel(hsvaModel),
          value: undefined,
          active: false,
        });
        expect(getRender()).not.toHaveClass(cnColorMarker({ active: true }));
      });
    });

    describe('проверка form', () => {
      (['default', 'brick', 'round'] as const).forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({
            model: castModel(hsvaModel),
            value: undefined,
            form,
          });
          expect(getRender()).toHaveClass(cnColorMarker({ form }));
        });
      });
    });

    describe('проверка as', () => {
      (['div', 'span', 'button'] as const).forEach((as) => {
        it(`рендерится как <${as}>`, () => {
          renderComponent({
            model: castModel(hsvaModel),
            value: undefined,
            as,
          });
          expect(getRender().tagName).toBe(as.toUpperCase());
        });
      });
    });

    describe('проверка withoutColor', () => {
      it('присваивает класс when value is undefined', () => {
        renderComponent({ model: castModel(hsvaModel), value: undefined });
        expect(getRender()).toHaveClass(cnColorMarker({ withoutColor: true }));
      });

      it('не присваивает класс when value is provided', () => {
        renderComponent({
          model: castModel(hsvaModel),
          value: hsvaModel.defaultColor as unknown,
        });
        expect(getRender()).not.toHaveClass(
          cnColorMarker({ withoutColor: true }),
        );
      });
    });

    describe('проверка цвета', () => {
      it('устанавливает CSS переменные при наличии value', () => {
        const value = hsvaModel.defaultColor as unknown;
        renderComponent({ model: castModel(hsvaModel), value });
        expect(getRender()).toHaveStyle({
          '--color-picker-marker-color': 'hsl(0, 0%, 0%)',
          '--color-picker-marker-color-with-alpha': 'hsla(0, 0%, 0%, 1)',
        });
      });

      it('не устанавливает CSS переменные при отсутствии value', () => {
        renderComponent({ model: castModel(hsvaModel), value: undefined });
        const element = getRender();
        expect(
          element.style.getPropertyValue('--color-picker-marker-color'),
        ).toBe('');
        expect(
          element.style.getPropertyValue(
            '--color-picker-marker-color-with-alpha',
          ),
        ).toBe('');
      });
    });

    describe('проверка className', () => {
      it('присваивает дополнительный класс', () => {
        const className = 'custom-class';
        renderComponent({
          model: castModel(hsvaModel),
          value: undefined,
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
          value: undefined,
          style,
        });
        expect(getRender()).toHaveStyle(style);
      });
    });

    describe('проверка ref', () => {
      it('ref присваивается элементу', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ model: castModel(hsvaModel), value: undefined, ref });
        expect(ref.current).toBe(getRender());
      });
    });

    describe('проверка модели', () => {
      it('работает с разными моделями', () => {
        const value = '#ff0000' as unknown;
        renderComponent({ model: castModel(hexModel), value });
        expect(getRender()).toHaveStyle({
          '--color-picker-marker-color': 'hsl(0, 100%, 50%)',
          '--color-picker-marker-color-with-alpha': 'hsla(0, 100%, 50%, 1)',
        });
      });
    });
  });
});
