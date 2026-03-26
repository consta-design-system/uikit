import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { cn } from '##/utils/bem';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnColorMarker,
  ColorModel,
  ColorPalette,
  hexModel,
  hsvaModel,
} from '..';

type ColorPaletteProps = React.ComponentProps<typeof ColorPalette>;

createRoot();
clearStack();

const cnColorPalette = cn('ColorPalette');
const testId = cnColorPalette();

const renderComponent = (
  ctx: TestContext,
  props: Omit<ColorPaletteProps, 'model'> & {
    model: ColorModel<unknown>;
  },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPalette data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
  return root;
};

const castModel = <T,>(model: ColorModel<T>): ColorModel<unknown> =>
  model as ColorModel<unknown>;

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLElement;

const getColorMarkers = (ctx: TestContext) =>
  document.querySelectorAll(
    `#${testRootId(ctx)} *[data-testid=${testId}] .${cnColorMarker()}`,
  ) as unknown as HTMLElement[];

const getColorMarker = (ctx: TestContext, index: number) =>
  getColorMarkers(ctx)[index];

describe.concurrent(`${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, {
          model: castModel(hsvaModel),
          items: [],
        }),
      ).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка size', () => {
      (['xs', 's', 'm', 'l'] as const).forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            const items = [hsvaModel.defaultColor];
            renderComponent(ctx, {
              model: castModel(hsvaModel),
              items,
              size,
            });

            expect(getColorMarkers(ctx)).toHaveLength(1);
            expect(getColorMarker(ctx, 0)).toHaveClass(cnColorMarker({ size }));
          }));
      });
    });

    describe.concurrent('проверка form', () => {
      (['default', 'brick', 'round'] as const).forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            const items = [hsvaModel.defaultColor];
            renderComponent(ctx, {
              model: castModel(hsvaModel),
              items,
              form,
            });

            expect(getColorMarkers(ctx)).toHaveLength(1);
            expect(getColorMarker(ctx, 0)).toHaveClass(cnColorMarker({ form }));
          }));
      });
    });

    describe.concurrent('проверка items', () => {
      test('рендерит правильное количество ColorMarker', (ctx) =>
        context.start(async () => {
          const items = [
            hsvaModel.defaultColor,
            { h: 0, s: 100, v: 100, a: 1 },
            { h: 120, s: 100, v: 100, a: 1 },
          ];
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items,
          });

          expect(getColorMarkers(ctx)).toHaveLength(items.length);
        }));

      test('не рендерит ColorMarker при пустом массиве', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items: [],
          });

          expect(getColorMarkers(ctx)).toHaveLength(0);
        }));
    });

    describe.concurrent('проверка value', () => {
      test('активный ColorMarker помечается active', (ctx) =>
        context.start(async () => {
          const items = [
            hsvaModel.defaultColor,
            { h: 0, s: 100, v: 100, a: 1 },
          ];
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items,
            value: items[1],
          });

          const colorMarkers = getColorMarkers(ctx);
          expect(colorMarkers).toHaveLength(2);
          expect(colorMarkers[1]).toHaveClass(cnColorMarker({ active: true }));
          expect(colorMarkers[0]).not.toHaveClass(
            cnColorMarker({ active: true }),
          );
        }));

      test('нет активного ColorMarker при отсутствии value', (ctx) =>
        context.start(async () => {
          const items = [hsvaModel.defaultColor];
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items,
          });

          const colorMarkers = getColorMarkers(ctx);
          expect(colorMarkers).toHaveLength(1);
          expect(colorMarkers[0]).not.toHaveClass(
            cnColorMarker({ active: true }),
          );
        }));
    });

    describe.concurrent('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items: [],
            className,
          });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items: [],
            style,
          });

          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });

    describe.concurrent('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items: [],
            ref,
          });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe.concurrent('проверка модели', () => {
      test('работает с разными моделями', (ctx) =>
        context.start(async () => {
          const items = ['#ff0000', '#00ff00'];
          renderComponent(ctx, {
            model: castModel(hexModel),
            items,
          });

          expect(getColorMarkers(ctx)).toHaveLength(items.length);
        }));

      test('цвета отображаются верно для hex модели', (ctx) =>
        context.start(async () => {
          const items = ['#ff0000', '#00ff00'];
          renderComponent(ctx, {
            model: castModel(hexModel),
            items,
          });

          const colorMarkers = getColorMarkers(ctx);
          expect(colorMarkers).toHaveLength(items.length);
          // Проверяем CSS переменные для первого цвета

          expect(
            colorMarkers[0].style.getPropertyValue(
              '--color-picker-marker-color',
            ),
          ).toBe('hsl(0, 100%, 50%)');
          expect(
            colorMarkers[0].style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('hsla(0, 100%, 50%, 1)');
          // Для второго цвета

          expect(
            colorMarkers[1].style.getPropertyValue(
              '--color-picker-marker-color',
            ),
          ).toBe('hsl(120, 100%, 50%)');
          expect(
            colorMarkers[1].style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('hsla(120, 100%, 50%, 1)');
        }));

      test('цвета отображаются верно для hsva модели', (ctx) =>
        context.start(async () => {
          const items = [
            { h: 0, s: 100, v: 100, a: 1 },
            { h: 120, s: 100, v: 100, a: 0.5 },
          ];
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items,
          });

          const colorMarkers = getColorMarkers(ctx);
          expect(colorMarkers).toHaveLength(items.length);
          // Проверяем CSS переменные для первого цвета (hsl(0, 100%, 50%))

          expect(
            colorMarkers[0].style.getPropertyValue(
              '--color-picker-marker-color',
            ),
          ).toBe('hsl(0, 100%, 50%)');
          expect(
            colorMarkers[0].style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('hsla(0, 100%, 50%, 1)');
          // Для второго цвета с alpha 0.5

          expect(
            colorMarkers[1].style.getPropertyValue(
              '--color-picker-marker-color',
            ),
          ).toBe('hsl(120, 100%, 50%)');
          expect(
            colorMarkers[1].style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('hsla(120, 100%, 50%, 0.5)');
        }));
    });

    describe.concurrent('проверка onChange', () => {
      test('вызывает onChange при клике на ColorMarker с правильным цветом и событием', (ctx) =>
        context.start(async () => {
          const onChange = vi.fn();
          const items = [
            hsvaModel.defaultColor,
            { h: 0, s: 100, v: 100, a: 1 },
          ];
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items,
            onChange,
          });

          const colorMarkers = getColorMarkers(ctx);
          colorMarkers[0].click();
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith(items[0], expect.any(Object));
        }));

      test('вызывает onChange с правильным цветом для второго маркера', (ctx) =>
        context.start(async () => {
          const onChange = vi.fn();
          const items = [
            hsvaModel.defaultColor,
            { h: 0, s: 100, v: 100, a: 1 },
          ];
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            items,
            onChange,
          });

          const colorMarkers = getColorMarkers(ctx);
          colorMarkers[1].click();
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenCalledWith(items[1], expect.any(Object));
        }));
    });
  });
});
