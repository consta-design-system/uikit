import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { SliderInput } from '../SliderInput/SliderInput';

createRoot();
clearStack();

const testId = 'SliderInput';

const renderComponent = (
  ctx: TestContext,
  props: React.ComponentProps<typeof SliderInput>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SliderInput data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getSliderInput = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} input[type="number"]`,
  ) as HTMLInputElement | null;

describe.concurrent('Компонент SliderInput', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, { value: 50 })).not.toThrow();
    }));

  test('отображает начальное значение', (ctx) =>
    context.start(async () => {
      const value = 50;
      renderComponent(ctx, { value });
      const input = getSliderInput(ctx);
      expect(input).toHaveValue(value);
    }));

  test('вызывает onChange при вводе валидного значения', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, { value: 50, onChange: handleChange, max: 100 });
      const input = getSliderInput(ctx);
      if (!input) throw new Error('Input not found');
      fireEvent.change(input, { target: { value: '75' } });
      expect(handleChange).toHaveBeenCalledWith({
        value: 75,
        e: expect.any(Object),
      });
    }));

  test('не вызывает onChange при вводе невалидного значения', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, { value: 50, onChange: handleChange, max: 100 });
      const input = getSliderInput(ctx);
      if (!input) throw new Error('Input not found');
      fireEvent.change(input, { target: { value: '150' } });
      expect(handleChange).not.toHaveBeenCalled();
    }));

  test('при потере фокуса (blur) корректирует значение до max', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      const max = 100;
      renderComponent(ctx, { value: 50, onChange: handleChange, max });
      const input = getSliderInput(ctx);
      if (!input) throw new Error('Input not found');
      fireEvent.change(input, { target: { value: '150' } });
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith({ value: max });
      expect(input).toHaveValue(max);
    }));

  test('при потере фокуса (blur) корректирует значение до min', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      const min = 10;
      renderComponent(ctx, { value: 50, onChange: handleChange, min });
      const input = getSliderInput(ctx);
      if (!input) throw new Error('Input not found');
      fireEvent.change(input, { target: { value: '5' } });
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith({ value: min });
      expect(input).toHaveValue(min);
    }));

  test('обновляет значение при изменении props.value', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { value: 50 });
      const input = getSliderInput(ctx);
      expect(input).toHaveValue(50);
      // Перерендерим с новым значением
      renderComponent(ctx, { value: 75 });
      const input2 = getSliderInput(ctx);
      expect(input2).toHaveValue(75);
    }));

  test('отключен, если disabled=true', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { value: 50, disabled: true });
      const input = getSliderInput(ctx);
      expect(input).toBeDisabled();
    }));
});
