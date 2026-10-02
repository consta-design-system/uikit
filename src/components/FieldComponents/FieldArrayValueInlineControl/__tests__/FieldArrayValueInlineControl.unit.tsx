import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  cnFieldArrayValueInlineControl,
  FieldArrayValueInlineControl,
  FieldArrayValueInlineControlProps,
} from '..';

createRoot();
clearStack();

const testId = 'FieldArrayValueInlineControl';

const defaultRenderValue: (value: string[]) => React.ReactNode = (value) =>
  value.map((item, index) => {
    return (
      <div className="RenderValueItem" data-index={index} key={index}>
        {item}
      </div>
    );
  });

const defaultValue = ['один', 'два', 'три'];

const renderComponent = <ITEM,>(
  ctx: TestContext,
  props: FieldArrayValueInlineControlProps<ITEM>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldArrayValueInlineControl data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnFieldArrayValueInlineControl('Input')}`,
  ) as HTMLInputElement;

const getValueItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll('.RenderValueItem');

const getValueItem = (ctx: TestContext, index: number = 0) =>
  getValueItems(ctx)[index];

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
        });

      expect(render).not.toThrow();
    }));

  describe('проверка ref', () => {
    test(`ref присвоен`, (ctx) =>
      context.start(async () => {
        const ref: React.RefObject<HTMLDivElement | null> = { current: null };

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          ref: (el) => setRef(ref, el),
        });

        expect(ref.current).toBeTruthy();
      }));
  });

  describe('проверка className', () => {
    test(`Присваивается дополнительный className`, (ctx) =>
      context.start(async () => {
        const className = 'custom-class';

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          className,
        });

        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe('проверка inputRef', () => {
    test(`inputRef присвоен`, (ctx) =>
      context.start(async () => {
        const ref: React.RefObject<HTMLDivElement | null> = { current: null };

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          inputRef: (el) => setRef(ref, el),
        });

        expect(ref.current).toBeTruthy();
      }));
  });

  describe('проверка inputMaxLength', () => {
    test(`inputMaxLength ограничивает ввод`, async (ctx) =>
      context.start(async () => {
        const inputMaxLength = 4;

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          inputMaxLength,
        });

        await userEvent.type(getInput(ctx), 'hello word');

        expect(getInput(ctx).value).toEqual('hell');
      }));
  });

  describe('проверка inputDefaultValue', () => {
    test(`inputDefaultValue присваивается`, async (ctx) =>
      context.start(async () => {
        const inputDefaultValue = 'hello word';

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          inputDefaultValue,
        });

        expect(getInput(ctx)).toHaveValue(inputDefaultValue);
      }));
  });

  describe('проверка value и renderValue', () => {
    test(`количество элементов совпадает с переданным`, async (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
        });

        expect(getValueItems(ctx).length).toEqual(defaultValue.length);
      }));

    test(`рендер элемента корректный`, async (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
        });

        const index = 0;
        expect(getValueItem(ctx, index)).toHaveAttribute(
          'data-index',
          `${index}`,
        );
        expect(getValueItem(ctx, index)).toHaveTextContent(defaultValue[index]);
      }));
  });

  describe('проверка input', () => {
    test('input получает корректный placeholder, если value пустое', (ctx) =>
      context.start(async () => {
        const placeholder = 'Введите значение';

        renderComponent(ctx, {
          renderValue: defaultRenderValue,
          placeholder,
          value: [],
        });

        expect(getInput(ctx)).toHaveAttribute('placeholder', placeholder);
      }));

    test('input не получает placeholder, если value не пустое', (ctx) =>
      context.start(async () => {
        const placeholder = 'Введите значение';

        renderComponent(ctx, {
          renderValue: defaultRenderValue,
          placeholder,
          value: ['значение'],
        });

        expect(getInput(ctx)).not.toHaveAttribute('placeholder');
      }));

    test('input получает корректный tabIndex', (ctx) =>
      context.start(async () => {
        const inputTabIndex = 5;

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          inputTabIndex,
        });

        expect(getInput(ctx)).toHaveAttribute('tabIndex', `${inputTabIndex}`);
      }));

    test('input получает корректный aria-label', (ctx) =>
      context.start(async () => {
        const inputAriaLabel = 'Поле ввода';

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          inputAriaLabel,
        });

        expect(getInput(ctx)).toHaveAttribute('aria-label', inputAriaLabel);
      }));

    test('input становится disabled, если передан disabled=true', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          disabled: true,
        });

        expect(getInput(ctx)).toBeDisabled();
      }));
  });

  describe('проверка handleChange', () => {
    test('handleChange обновляет значение input', async (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
        });

        const input = getInput(ctx);
        fireEvent.change(input, { target: { value: 'новое значение' } });
        expect(input).toHaveValue('новое значение');
      }));

    test('handleChange вызывает onChange', async (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          onChange,
        });

        const input = getInput(ctx);
        fireEvent.change(input, { target: { value: 'новое значение' } });
        expect(onChange).toHaveBeenCalled();
      }));
  });

  describe('проверка стилей', () => {
    test('применяются корректные стили для gap', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          size: 'l',
        });

        expect(
          getRender(ctx).style.getPropertyValue(
            '--field-array-value-inline-control-items-gap',
          ),
        ).toEqual('calc(var(--space-3xs) + var(--space-2xs))');
      }));

    test('применяются корректные стили для verticalPadding', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          size: 'm',
        });

        expect(
          getRender(ctx).style.getPropertyValue(
            '--field-array-value-inline-control-vertical-padding',
          ),
        ).toEqual('calc(var(--space-xs) - var(--space-3xs))');
      }));

    test('применяются корректные стили для inputHeight', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          size: 's',
        });

        expect(
          getRender(ctx).style.getPropertyValue(
            '--field-array-value-inline-control-input-height',
          ),
        ).toEqual('var(--space-xl)');
      }));
  });

  describe('проверка autoFocus', () => {
    test('input получает фокус при autoFocus=true', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          autoFocus: true,
        });

        expect(getInput(ctx)).toHaveFocus();
      }));
  });

  describe('проверка style', () => {
    test('применяется переданный style', (ctx) =>
      context.start(async () => {
        const customStyle = { backgroundColor: 'red', padding: '10px' };

        renderComponent(ctx, {
          value: defaultValue,
          renderValue: defaultRenderValue,
          style: customStyle,
        });

        expect(getRender(ctx)).toHaveStyle('background-color: red');
        expect(getRender(ctx)).toHaveStyle('padding: 10px');
      }));
  });
});
