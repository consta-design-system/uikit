import { IconQuestion } from '@consta/icons/IconQuestion';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { SliderProps, sliderPropSize, SliderPropView } from '../helper';
import { Slider } from '../Slider';

createRoot();
clearStack();

const testId = 'Slider';

const renderComponent = <RANGE extends boolean = false>(
  ctx: TestContext,
  props: SliderProps<RANGE>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Slider data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

const getPoints = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll('[role="slider"]') ?? [];

const getLine = (ctx: TestContext) =>
  getRender(ctx)?.querySelector('.SliderLine') as HTMLElement | null;

describe('Компонент Slider', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, { value: 0 })).not.toThrow();
    }));

  test('рендерится с range', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { value: [0, 100], range: true });
      expect(getPoints(ctx).length).toBe(2);
    }));

  describe('проверка props', () => {
    describe('проверка size', () => {
      sliderPropSize.forEach((size) => {
        test(`применяется класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { value: 0, size });
            expect(getRender(ctx)).toHaveClass(`Slider_size_${size}`);
          }));
      });
    });

    describe('проверка view', () => {
      (['default', 'division'] as SliderPropView[]).forEach((view) => {
        test(`применяется класс для view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { value: 0, view });
            expect(getLine(ctx)).toHaveClass(`SliderLine_view_${view}`);
          }));
      });
    });

    test('disabled отключает компонент', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          value: 0,
          disabled: true,
          onChange: handleChange,
        });
        const point = getPoints(ctx)[0] as HTMLButtonElement;
        if (!point) throw new Error('Point not found');
        point.focus();

        fireEvent.keyDown(point, { key: 'ArrowRight' });
        expect(handleChange).not.toHaveBeenCalled();
      }));

    test('отображает label и caption', (ctx) =>
      context.start(async () => {
        const label = 'Test Label';
        const caption = 'Test Caption';
        renderComponent(ctx, { value: 0, label, caption });
        const renderEl = getRender(ctx);
        if (!renderEl) throw new Error('Render not found');
        expect(renderEl).toHaveTextContent(label);
        expect(renderEl).toHaveTextContent(caption);
      }));

    test('отображает leftSide и rightSide как input', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [20, 80],
          range: true,
          leftSide: 'input',
          rightSide: 'input',
        });
        const inputs = document.querySelectorAll(
          `#${testRootId(ctx)} input[type="number"]`,
        );
        expect(inputs.length).toBe(2);
        expect((inputs[0] as HTMLInputElement).value).toBe('20');
        expect((inputs[1] as HTMLInputElement).value).toBe('80');
      }));

    test('отображает leftSide и rightSide как иконки', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [20, 80],
          range: true,
          leftSide: () => <IconQuestion data-testid="iconLeft" />,
          rightSide: () => <IconQuestion data-testid="iconRight" />,
        });
        expect(
          document.querySelector(
            `#${testRootId(ctx)} [data-testid="iconLeft"]`,
          ),
        ).toBeTruthy();
        expect(
          document.querySelector(
            `#${testRootId(ctx)} [data-testid="iconRight"]`,
          ),
        ).toBeTruthy();
      }));

    test('изменяет значение с учетом step', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        const step = 10;
        const initialValue = 50;
        renderComponent(ctx, {
          value: initialValue,
          step,
          onChange: handleChange,
        });
        const point = getPoints(ctx)[0] as HTMLButtonElement;
        if (!point) throw new Error('Point not found');
        point.focus();

        fireEvent.keyDown(point, { key: 'ArrowRight' });

        expect(handleChange).toHaveBeenCalledWith(
          initialValue + step,
          expect.any(Object),
        );
      }));

    describe('проверка min/max', () => {
      test('значение не может быть меньше min', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const min = 20;
          renderComponent(ctx, {
            value: min,
            min,
            onChange: handleChange,
            leftSide: 'input',
          });
          const point = getPoints(ctx)[0] as HTMLButtonElement;
          if (!point) throw new Error('Point not found');
          point.focus();

          fireEvent.keyDown(point, { key: 'ArrowLeft' });
          expect(handleChange).toHaveBeenCalledWith(min, expect.any(Object));
        }));

      test('значение не может быть больше max', (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const max = 80;
          renderComponent(ctx, {
            value: max,
            max,
            onChange: handleChange,
          });
          const point = getPoints(ctx)[0] as HTMLButtonElement;
          if (!point) throw new Error('Point not found');
          point.focus();

          fireEvent.keyDown(point, { key: 'ArrowRight' });
          expect(handleChange).toHaveBeenCalledWith(max, expect.any(Object));
        }));

      test('поля ввода имеют правильные min/max для range', (ctx) =>
        context.start(async () => {
          const min = 10;
          const max = 90;
          const value: [number, number] = [30, 70];
          renderComponent(ctx, {
            value,
            range: true,
            min,
            max,
            leftSide: 'input',
            rightSide: 'input',
          });
          const inputs = document.querySelectorAll(
            `#${testRootId(ctx)} input[type="number"]`,
          );
          expect(inputs[0]).toHaveAttribute('min', min.toString());
          expect(inputs[0]).toHaveAttribute('max', value[1].toString());
          expect(inputs[1]).toHaveAttribute('min', value[0].toString());
          expect(inputs[1]).toHaveAttribute('max', max.toString());
        }));
    });
  });

  describe("проверка callback'ов", () => {
    test('onChange вызывается после изменения значения с SliderPoint', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, { value: 50, onChange: handleChange });
        const point = getPoints(ctx)[0] as HTMLButtonElement;
        if (!point) throw new Error('Point not found');
        point.focus();
        fireEvent.keyDown(point, { key: 'ArrowRight' });
        expect(handleChange).toHaveBeenCalled();
      }));

    test('onChange вызывается после изменения значения с SliderInput', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();
        const initialValue = 50;
        renderComponent(ctx, {
          value: initialValue,
          onChange: handleChange,
          leftSide: 'input',
        });

        const input = document.querySelector(
          `#${testRootId(ctx)} input[type="number"]`,
        ) as HTMLInputElement;
        if (!input) throw new Error('Input not found');
        const newValue = 60;

        fireEvent.change(input, { target: { value: newValue.toString() } });
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith(newValue, expect.any(Object));
      }));
  });
});
