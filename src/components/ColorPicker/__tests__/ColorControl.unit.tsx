import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { ColorControl, ColorControlProps } from '../ColorControl';
import { cnColorMarker } from '../ColorMarker';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

createRoot();
clearStack();

const testId = 'ColorControl';

const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} *[data-testid=${testId}]`);

const getColorMarker = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} .${cnColorMarker()}`);

const getInputs = (ctx: TestContext) =>
  document.querySelectorAll(`#${testRootId(ctx)} input`);

const renderComponent = <T,>(ctx: TestContext, props: ColorControlProps<T>) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorControl data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent(`${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      const render = () =>
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
        });

      expect(() => render()).not.toThrow();
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

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe.concurrent('проверка disabled', () => {
      test('при disabled=true добавляет атрибут disabled на маркер и инпут', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            disabled: true,
          });

          expect(getColorMarker(ctx)).toBeDisabled();

          getInputs(ctx).forEach((input) => {
            expect(input).toBeDisabled();
          });
        }));

      test('при disabled=false не добавляет атрибут disabled', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            disabled: false,
          });

          expect(getColorMarker(ctx)).not.toBeDisabled();

          getInputs(ctx).forEach((input) => {
            expect(input).not.toBeDisabled();
          });
        }));
    });

    describe.concurrent('проверка onlyMarker', () => {
      test('при onlyMarker=true не рендерит ColorPickerInput', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            onlyMarker: true,
          });

          expect(getColorMarker(ctx)).toBeInTheDocument();

          expect(getInputs(ctx)).toHaveLength(0);
        }));

      test('при onlyMarker=false (по умолчанию) рендерит ColorPickerInput', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
          });

          expect(getColorMarker(ctx)).toBeInTheDocument();

          expect(getInputs(ctx).length).toBeGreaterThan(0);
        }));
    });

    describe.concurrent('проверка markerRef', () => {
      test('ref присваивается кнопке маркера', (ctx) =>
        context.start(async () => {
          const markerRef = React.createRef<HTMLButtonElement>();
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            markerRef,
          });

          expect(markerRef.current).toBe(getColorMarker(ctx));
        }));
    });

    describe.concurrent('проверка формата и alpha', () => {
      test('передает format и alpha в ColorPickerInput', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            format: 'hex',
            alpha: false,
          });

          const textBoxes = getInputs(ctx);
          expect(textBoxes).toHaveLength(1);
          expect(textBoxes[0]).toHaveAttribute('type', 'text');
        }));
    });
  });

  describe.concurrent('проверка взаимодействия', () => {
    test('вызывает onChange при изменении значения в ColorPickerInput', (ctx) =>
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

        const input = getInputs(ctx)[0];
        fireEvent.change(input, { target: { value: '00ff00' } });
        fireEvent.blur(input);
        expect(onChange).toHaveBeenCalledTimes(1);
        const newColor = onChange.mock.calls[0][0];
        expect(newColor).toBeDefined();
      }));
  });

  describe.concurrent('проверка маппинга size и form для ColorMarker', () => {
    test('правильно маппит size xs -> xs', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          size: 'xs',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_size_xs');
      }));

    test('правильно маппит size s -> xs', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          size: 's',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_size_xs');
      }));

    test('правильно маппит size m -> s', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          size: 'm',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_size_s');
      }));

    test('правильно маппит size l -> m', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          size: 'l',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_size_m');
      }));

    test('правильно маппит form default -> default', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          form: 'default',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_form_default');
      }));

    test('правильно маппит form brick -> brick', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          form: 'brick',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_form_brick');
      }));

    test('правильно маппит form round -> round', (ctx) =>
      context.start(async () => {
        const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
          form: 'round',
        });

        expect(getColorMarker(ctx)).toHaveClass('ColorMarker_form_round');
      }));
  });
});
