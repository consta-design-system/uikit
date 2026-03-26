import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnColorMarker,
  ColorMarker,
  ColorModel,
  hexModel,
  hsvaModel,
} from '..';

type ColorMarkerProps = React.ComponentProps<typeof ColorMarker>;

createRoot();
clearStack();

const testId = cnColorMarker();

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLElement;

const castModel = <T,>(model: ColorModel<T>): ColorModel<unknown> =>
  model as ColorModel<unknown>;

const renderComponent = (
  ctx: TestContext,
  props: Omit<ColorMarkerProps, 'model'> & { model: ColorModel<unknown> },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorMarker data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent(`${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, { model: castModel(hsvaModel), value: undefined });

      expect(() => render()).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка size', () => {
      (['xs', 's', 'm', 'l'] as const).forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              model: castModel(hsvaModel),
              value: undefined,
              size,
            });

            expect(getRender(ctx)).toHaveClass(cnColorMarker({ size }));
          }));
      });
    });

    describe.concurrent('проверка active', () => {
      test('присваивает класс для active=true', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            value: undefined,
            active: true,
          });

          expect(getRender(ctx)).toHaveClass(cnColorMarker({ active: true }));
        }));

      test('не присваивает класс для active=false', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            value: undefined,
            active: false,
          });

          expect(getRender(ctx)).not.toHaveClass(
            cnColorMarker({ active: true }),
          );
        }));
    });

    describe.concurrent('проверка form', () => {
      (['default', 'brick', 'round'] as const).forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              model: castModel(hsvaModel),
              value: undefined,
              form,
            });

            expect(getRender(ctx)).toHaveClass(cnColorMarker({ form }));
          }));
      });
    });

    describe.concurrent('проверка as', () => {
      (['div', 'span', 'button'] as const).forEach((as) => {
        test(`рендерится как <${as}>`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              model: castModel(hsvaModel),
              value: undefined,
              as,
            });

            expect(getRender(ctx).tagName).toBe(as.toUpperCase());
          }));
      });
    });

    describe.concurrent('проверка withoutColor', () => {
      test('присваивает класс when value is undefined', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            value: undefined,
          });

          expect(getRender(ctx)).toHaveClass(
            cnColorMarker({ withoutColor: true }),
          );
        }));

      test('не присваивает класс when value is provided', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            value: hsvaModel.defaultColor as unknown,
          });

          expect(getRender(ctx)).not.toHaveClass(
            cnColorMarker({ withoutColor: true }),
          );
        }));
    });

    describe.concurrent('проверка цвета', () => {
      test('устанавливает CSS переменные при наличии value', (ctx) =>
        context.start(async () => {
          const value = hsvaModel.defaultColor as unknown;
          renderComponent(ctx, { model: castModel(hsvaModel), value });

          expect(
            getRender(ctx).style.getPropertyValue(
              '--color-picker-marker-color',
            ),
          ).toBe('hsl(0, 0%, 0%)');
          expect(
            getRender(ctx).style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('hsla(0, 0%, 0%, 1)');
        }));

      test('не устанавливает CSS переменные при отсутствии value', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            value: undefined,
          });

          const element = getRender(ctx);
          expect(
            element.style.getPropertyValue('--color-picker-marker-color'),
          ).toBe('');
          expect(
            element.style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('');
        }));
    });

    describe.concurrent('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, {
            model: castModel(hsvaModel),
            value: undefined,
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
            value: undefined,
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
            value: undefined,
            ref,
          });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe.concurrent('проверка модели', () => {
      test('работает с разными моделями', (ctx) =>
        context.start(async () => {
          const value = '#ff0000' as unknown;
          renderComponent(ctx, { model: castModel(hexModel), value });

          expect(
            getRender(ctx).style.getPropertyValue(
              '--color-picker-marker-color',
            ),
          ).toBe('hsl(0, 100%, 50%)');
          expect(
            getRender(ctx).style.getPropertyValue(
              '--color-picker-marker-color-with-alpha',
            ),
          ).toBe('hsla(0, 100%, 50%, 1)');
        }));
    });
  });
});
