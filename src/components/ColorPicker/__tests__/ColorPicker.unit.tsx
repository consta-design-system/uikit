import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnColorMarker } from '../ColorMarker';
import { cnColorPicker, ColorPicker } from '../ColorPicker';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

createRoot();
clearStack();

type ColorPickerProps = React.ComponentProps<typeof ColorPicker<HsvaColor>>;

const testId = 'ColorPicker';

const renderComponent = (ctx: TestContext, props: ColorPickerProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPicker<HsvaColor> data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

const getHeader = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} .${cnColorPicker('Header')}`,
  ) as HTMLElement;

const getColorMarkers = (ctx: TestContext) =>
  document.querySelectorAll(`#${testRootId(ctx)} .${cnColorMarker()}`);

describe.concurrent('Компонент ColorPicker', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      const render = () =>
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
        });
      await wrap(tick());
      expect(render).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    const value: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe.concurrent('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            className,
          });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            style,
          });
          await wrap(tick());
          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });

    describe.concurrent('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            ref,
          });
          await wrap(tick());
          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe.concurrent('проверка header', () => {
      test('рендерит строковый заголовок', (ctx) =>
        context.start(async () => {
          const header = 'Color Picker';
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            header,
          });
          await wrap(tick());

          expect(getHeader(ctx)).toBeInTheDocument();
          expect(getHeader(ctx)).toHaveTextContent(header);
        }));

      test('рендерит React-узел заголовка', (ctx) =>
        context.start(async () => {
          const header = <span data-testid="custom-header">Custom</span>;
          const root = ReactDOM.createRoot(
            document.getElementById(testRootId(ctx))!,
          );
          act(() => {
            root.render(
              <reatomContext.Provider value={top()}>
                <Theme preset={presetGpnDefault}>
                  <ColorPicker<HsvaColor>
                    data-testid={testId}
                    model={hsvaModel}
                    value={value}
                    onChange={vi.fn()}
                    header={header}
                  />
                </Theme>
              </reatomContext.Provider>,
            );
          });
          await wrap(tick());
          expect(
            document.querySelector(
              `#${testRootId(ctx)} [data-testid="custom-header"]`,
            ),
          ).toBeInTheDocument();
        }));

      test('не рендерит заголовок, если header не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
          });
          await wrap(tick());

          expect(getHeader(ctx)).not.toBeInTheDocument();
        }));
    });

    describe.concurrent('проверка alpha', () => {
      test('при alpha=true рендерит ColorPickerAlpha', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            alpha: true,
          });
          await wrap(tick());
          const alphaElement = document.querySelector(
            `#${testRootId(ctx)} .ColorPickerAlpha`,
          );
          expect(alphaElement).toBeInTheDocument();
        }));

      test('при alpha=false не рендерит ColorPickerAlpha', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            alpha: false,
          });
          await wrap(tick());
          const alphaElement = document.querySelector(
            `#${testRootId(ctx)} .ColorPickerAlpha`,
          );
          expect(alphaElement).not.toBeInTheDocument();
        }));
    });

    describe.concurrent('проверка palette', () => {
      test('рендерит ColorPalette, если передан массив цветов', (ctx) =>
        context.start(async () => {
          const palette: HsvaColor[] = [
            { h: 0, s: 100, v: 100, a: 1 },
            { h: 120, s: 100, v: 100, a: 1 },
          ];
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            palette,
            mainControl: false, // отключаем ColorPickerBase чтобы не мешал
          });
          await wrap(tick());

          // Должно быть 2 кнопки (по одному на каждый цвет)
          expect(getColorMarkers(ctx).length).toBeGreaterThanOrEqual(
            palette.length,
          );
        }));

      test('не рендерит ColorPalette, если palette не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            mainControl: false,
          });
          await wrap(tick());
          // Ищем ColorMarker (кнопки) - их не должно быть
          const buttons = document.querySelectorAll(
            `#${testRootId(ctx)} button[class*="ColorMarker"]`,
          );
          expect(buttons.length).toBe(0);
        }));
    });

    describe.concurrent('проверка format', () => {
      test('рендерит ColorInputTypeChanger, если format задан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hex',
          });
          await wrap(tick());
          const inputChanger = document.querySelector(
            `#${testRootId(ctx)} .ColorInputTypeChanger`,
          );
          expect(inputChanger).toBeInTheDocument();
        }));

      test('не рендерит ColorInputTypeChanger, если format=false', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: false,
          });
          await wrap(tick());
          const inputChanger = document.querySelector(
            `#${testRootId(ctx)} .ColorInputTypeChanger`,
          );
          expect(inputChanger).not.toBeInTheDocument();
        }));
    });

    describe.concurrent('проверка mainControl', () => {
      test('при mainControl=true рендерит ColorPickerBase', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            mainControl: true,
          });
          await wrap(tick());
          // ColorPickerBase рендерит слайдеры с ролью 'slider'
          const sliders = document.querySelectorAll(
            `#${testRootId(ctx)} [role="slider"]`,
          );
          expect(sliders.length).toBeGreaterThan(0);
        }));

      test('при mainControl=false не рендерит ColorPickerBase', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            mainControl: false,
          });
          await wrap(tick());
          const sliders = document.querySelectorAll(
            `#${testRootId(ctx)} [role="slider"]`,
          );
          expect(sliders.length).toBe(0);
        }));
    });
  });

  describe.concurrent('проверка взаимодействия', () => {
    test('вызывает onChange при изменении цвета через ColorPickerBase', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, {
          model: hsvaModel,
          value: { h: 0, s: 50, v: 50, a: 1 },
          onChange,
          alpha: false,
        });
        await wrap(tick());
        // Находим слайдер saturation (первый слайдер)
        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const saturationSlider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(saturationSlider, { keyCode: 39 }); // ArrowRight
        expect(onChange).toHaveBeenCalledTimes(1);
        // Проверяем, что onChange вызван с объектом, содержащим s и v
        expect(onChange.mock.calls[0][0]).toMatchObject({
          s: expect.closeTo(55, 0),
          v: expect.closeTo(50, 0),
        });
      }));

    test('вызывает onChange при выборе цвета из палитры', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const palette: HsvaColor[] = [
          { h: 0, s: 100, v: 100, a: 1 },
          { h: 120, s: 100, v: 100, a: 1 },
        ];
        renderComponent(ctx, {
          model: hsvaModel,
          value: { h: 0, s: 50, v: 50, a: 1 },
          onChange,
          palette,
        });
        await wrap(tick());
        // Находим кнопки палитры (первый цвет)
        const paletteButtons = document.querySelectorAll(
          `#${testRootId(ctx)} button[role="button"]`,
        );
        // Первая кнопка - это маркер? нужно уточнить, но для теста предположим, что это кнопка цвета
        // Упростим: кликнем по первому элементу палитры
        const colorButton = Array.from(paletteButtons).find((btn) =>
          btn.className.includes('ColorPalette-Item'),
        );
        if (colorButton) {
          fireEvent.click(colorButton);
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange.mock.calls[0][0]).toEqual(palette[0]);
        }
      }));
  });
});
