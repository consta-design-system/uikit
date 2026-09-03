import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { FieldInput } from '..';

createRoot();
clearStack();

type FieldInputProps = React.ComponentProps<typeof FieldInput>;

const testId = 'FieldInput';

const renderComponent = (ctx: TestContext, props: FieldInputProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldInput data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement;

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка ref', () => {
    test(`ref присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLInputElement | null } = { current: null };

        renderComponent(ctx, {
          ref: (el) => setRef(ref, el),
        });

        expect(ref.current).toBeTruthy();
      });
    });
  });

  describe('проверка className', () => {
    test(`Присваивается дополнительный className`, async (ctx) => {
      await context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className });

        expect(getRender(ctx)).toHaveClass(className);
      });
    });
  });

  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      test(`присваивается  ${prop}=${prop}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { [prop]: prop });

          expect(getRender(ctx)).toHaveAttribute(prop, prop);
        });
      });
    });
  });

  describe('проверка атрибутов input', () => {
    test('Присваивается placeholder', async (ctx) => {
      await context.start(async () => {
        const placeholder = 'Введите текст';

        renderComponent(ctx, { placeholder });

        expect(getRender(ctx)).toHaveAttribute('placeholder', placeholder);
      });
    });

    test('Присваивается value', async (ctx) => {
      await context.start(async () => {
        const value = 'Тестовое значение';

        renderComponent(ctx, { value, onChange: vi.fn() });

        expect(getRender(ctx)).toHaveAttribute('value', value);
      });
    });

    test('Присваивается type', async (ctx) => {
      await context.start(async () => {
        const type = 'password';

        renderComponent(ctx, { type });

        expect(getRender(ctx)).toHaveAttribute('type', type);
      });
    });

    test('Присваивается disabled', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { disabled: true });

        expect(getRender(ctx)).toBeDisabled();
      });
    });

    test('Присваивается readonly', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { readOnly: true });

        expect(getRender(ctx)).toHaveAttribute('readonly');
      });
    });
  });

  describe('проверка событий', () => {
    test('Срабатывает onChange', async (ctx) => {
      await context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, { onChange });

        fireEvent.change(getRender(ctx), { target: { value: 'test' } });
        expect(onChange).toHaveBeenCalled();
      });
    });

    test('Срабатывает onFocus', async (ctx) => {
      await context.start(async () => {
        const onFocus = vi.fn();
        renderComponent(ctx, { onFocus });

        getRender(ctx).focus();
        expect(onFocus).toHaveBeenCalled();
      });
    });

    test('Срабатывает onBlur', async (ctx) => {
      await context.start(async () => {
        const onBlur = vi.fn();
        renderComponent(ctx, { onBlur });

        getRender(ctx).focus();
        getRender(ctx).blur();
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });
});
