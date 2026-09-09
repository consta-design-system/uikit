import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { ColorPickerInput } from '../ColorPickerInput';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

createRoot();
clearStack();

type ColorPickerInputProps<T> = React.ComponentProps<
  typeof ColorPickerInput<T>
>;

const testId = 'ColorPickerInput';

const renderComponent = <T,>(
  ctx: TestContext,
  props: ColorPickerInputProps<T>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerInput<T> data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент ColorPickerInput', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      const render = () =>
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
        });

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    const value: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            className,
          });

          const element = document.querySelector(
            `#${testRootId(ctx)} *[data-testid="${testId}"]`,
          ) as HTMLElement;
          expect(element).toHaveClass(className);
        }));
    });

    describe('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            style,
          });

          const element = document.querySelector(
            `#${testRootId(ctx)} *[data-testid="${testId}"]`,
          ) as HTMLElement;
          expect(element).toHaveStyle(style);
        }));
    });

    describe('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            ref,
          });

          const element = document.querySelector(
            `#${testRootId(ctx)} *[data-testid="${testId}"]`,
          ) as HTMLElement;
          expect(ref.current).toBe(element);
        }));
    });

    describe('проверка format и alpha', () => {
      test('при format="hex" и alpha=false рендерит одно поле', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hex',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs).toHaveLength(1);
          expect(inputs[0]).toHaveAttribute('type', 'text');
        }));

      test('при format="hex" и alpha=true рендерит два поля', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hex',
            alpha: true,
          });

          const textBoxes = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="text"]`,
          ) as NodeListOf<HTMLInputElement>;
          const spinButtons = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(textBoxes).toHaveLength(1);
          expect(spinButtons).toHaveLength(1);
          expect(textBoxes[0]).toHaveAttribute('type', 'text');
          expect(spinButtons[0]).toHaveAttribute('type', 'number');
        }));

      test('при format="rgb" и alpha=false рендерит три поля', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'rgb',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs).toHaveLength(3);
        }));

      test('при format="rgb" и alpha=true рендерит четыре поля', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'rgb',
            alpha: true,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs).toHaveLength(4);
        }));

      test('при format="hsl" и alpha=false рендерит три поля', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hsl',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs).toHaveLength(3);
        }));

      test('при format="hsv" и alpha=false рендерит три поля', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hsv',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs).toHaveLength(3);
        }));
    });

    describe('проверка значений по умолчанию', () => {
      test('для hex формат отображает правильное значение', (ctx) =>
        context.start(async () => {
          const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hex',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs[0]).toHaveValue('ff0000');
        }));

      test('для rgb формат отображает правильные значения', (ctx) =>
        context.start(async () => {
          const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'rgb',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs[0]).toHaveValue(255);
          expect(inputs[1]).toHaveValue(0);
          expect(inputs[2]).toHaveValue(0);
        }));

      test('для hsl формат отображает правильные значения', (ctx) =>
        context.start(async () => {
          const value: HsvaColor = { h: 120, s: 100, v: 100, a: 1 };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hsl',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs[0]).toHaveValue(120);
          expect(inputs[1]).toHaveValue(100);
          expect(inputs[2]).toHaveValue(50);
        }));

      test('для hsv формат отображает правильные значения', (ctx) =>
        context.start(async () => {
          const value: HsvaColor = { h: 240, s: 50, v: 80, a: 1 };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hsv',
            alpha: false,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          expect(inputs[0]).toHaveValue(240);
          expect(inputs[1]).toHaveValue(50);
          expect(inputs[2]).toHaveValue(80);
        }));

      test('при alpha=true отображает поле alpha с правильным значением', (ctx) =>
        context.start(async () => {
          const value: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'rgb',
            alpha: true,
          });

          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          ) as NodeListOf<HTMLInputElement>;
          const alphaInput = inputs[3];
          expect(alphaInput).toHaveValue(50);
        }));
    });
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onChange при изменении hex поля', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hex',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '00ff00' } });
        fireEvent.blur(inputs[0]);
        expect(onChange).toHaveBeenCalledTimes(1);
        // Проверяем, что onChange вызван с новым значением цвета
        const newColor = onChange.mock.calls[0][0];
        expect(newColor).toBeDefined();
      }));

    test('вызывает onChange при изменении rgb поля', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'rgb',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '128' } });
        fireEvent.blur(inputs[0]);
        expect(onChange).toHaveBeenCalledTimes(1);
        const newColor = onChange.mock.calls[0][0];
        expect(newColor).toBeDefined();
      }));

    test('вызывает onChange при изменении alpha поля', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 0.5 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'rgb',
          alpha: true,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        const alphaInput = inputs[3];
        fireEvent.change(alphaInput, { target: { value: '75' } });
        fireEvent.blur(alphaInput);
        expect(onChange).toHaveBeenCalledTimes(1);
        const newColor = onChange.mock.calls[0][0];
        expect(newColor).toBeDefined();
      }));

    test('не вызывает onChange если значение не изменилось', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hex',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: 'ff0000' } });
        fireEvent.blur(inputs[0]);
        // Значение осталось тем же, onChange не должен вызываться
        expect(onChange).not.toHaveBeenCalled();
      }));
  });

  describe('проверка валидации', () => {
    test('исправляет некорректное hex значение', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hex',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: 'invalid' } });
        fireEvent.blur(inputs[0]);
        // После blur значение должно быть исправлено на исходное
        expect(inputs[0]).toHaveValue('ff0000');
      }));

    test('ограничивает rgb значения максимумом 255', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'rgb',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '300' } });
        fireEvent.blur(inputs[0]);
        // После blur значение должно быть исправлено на 255
        expect(inputs[0]).toHaveValue(255);
      }));

    test('ограничивает alpha значения максимумом 100', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 100, v: 100, a: 0.5 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'rgb',
          alpha: true,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        const alphaInput = inputs[3];
        fireEvent.change(alphaInput, { target: { value: '150' } });
        fireEvent.blur(alphaInput);
        expect(alphaInput).toHaveValue(100);
      }));

    test('ограничивает hsv hue максимумом 359', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsv',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '400' } });
        fireEvent.blur(inputs[0]);
        expect(inputs[0]).toHaveValue(359);
      }));

    test('ограничивает hsv saturation максимумом 100', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsv',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[1], { target: { value: '150' } });
        fireEvent.blur(inputs[1]);
        expect(inputs[1]).toHaveValue(100);
      }));

    test('ограничивает hsv value максимумом 100', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsv',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[2], { target: { value: '200' } });
        fireEvent.blur(inputs[2]);
        expect(inputs[2]).toHaveValue(100);
      }));

    test('ограничивает hsl hue максимумом 359', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsl',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '400' } });
        fireEvent.blur(inputs[0]);
        expect(inputs[0]).toHaveValue(359);
      }));

    test('ограничивает hsl saturation максимумом 100', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsl',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[1], { target: { value: '150' } });
        fireEvent.blur(inputs[1]);
        expect(inputs[1]).toHaveValue(100);
      }));

    test('ограничивает hsl lightness максимумом 100', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsl',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[2], { target: { value: '200' } });
        fireEvent.blur(inputs[2]);
        expect(inputs[2]).toHaveValue(100);
      }));

    test('ограничивает отрицательные значения минимумом 0', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 50, s: 50, v: 50, a: 0.5 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'rgb',
          alpha: true,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
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
      }));

    test('ограничивает отрицательные значения для hsv', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 50, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsv',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '-10' } });
        fireEvent.blur(inputs[0]);
        expect(inputs[0]).toHaveValue(0);

        fireEvent.change(inputs[1], { target: { value: '-5' } });
        fireEvent.blur(inputs[1]);
        expect(inputs[1]).toHaveValue(0);

        fireEvent.change(inputs[2], { target: { value: '-20' } });
        fireEvent.blur(inputs[2]);
        expect(inputs[2]).toHaveValue(0);
      }));

    test('ограничивает отрицательные значения для hsl', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        const value: HsvaColor = { h: 50, s: 50, v: 50, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange,
          format: 'hsl',
          alpha: false,
        });

        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as NodeListOf<HTMLInputElement>;
        fireEvent.change(inputs[0], { target: { value: '-10' } });
        fireEvent.blur(inputs[0]);
        expect(inputs[0]).toHaveValue(0);

        fireEvent.change(inputs[1], { target: { value: '-5' } });
        fireEvent.blur(inputs[1]);
        expect(inputs[1]).toHaveValue(0);

        fireEvent.change(inputs[2], { target: { value: '-20' } });
        fireEvent.blur(inputs[2]);
        expect(inputs[2]).toHaveValue(0);
      }));
  });
});
