import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSwitch, Switch } from '../Switch';

createRoot();
clearStack();

type SwitchProps = React.ComponentProps<typeof Switch>;

const testId = cnSwitch();

const defaultHandleChange = vi.fn();

const renderComponent = (
  ctx: TestContext,
  {
    onChange = defaultHandleChange,
    checked = false,
    ...props
  }: Omit<SwitchProps, 'onChange' | 'checked'> & {
    onChange?: SwitchProps['onChange'];
    checked?: SwitchProps['checked'];
  } = {},
) => {
  act(() => {
    const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Switch
            data-testid={testId}
            onChange={onChange}
            checked={checked}
            {...props}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const sizes = ['xs', 's', 'm', 'l'] as const;
const views = ['ghost', 'primary'] as const;
const aligns = ['center', 'top'] as const;

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLLabelElement;

const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector('input') as HTMLInputElement;

const getLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSwitch('Label')}`) as HTMLSpanElement;

createRoot();
clearStack();

describe.concurrent('Компонент Switch', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка className', () => {
    test('Присваивается дополнительный className', (ctx) =>
      context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className });
        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe.concurrent('проверка label', () => {
    test('label отображается', (ctx) =>
      context.start(async () => {
        const label = 'fileName';
        renderComponent(ctx, { label });
        expect(getLabel(ctx).textContent).toEqual(label);
      }));
  });

  describe.concurrent('проверка onChange', () => {
    test('клик должен вызвать callback c ожидаемыми параметрами', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();

        renderComponent(ctx, { onChange: handleChange });

        const element = getRender(ctx) as HTMLLabelElement;

        fireEvent.click(element);
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
      }));
  });

  describe.concurrent('проверка checked', () => {
    test('checked должен быть true', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { checked: true });

        expect(getInput(ctx).checked).toBe(true);
      }));

    test('checked должен быть false', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { checked: false });

        expect(getInput(ctx).checked).toBe(false);
      }));

    test('checked должен быть false по умолчанию', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});

        expect(getInput(ctx).checked).toBe(false);
      }));
  });

  describe.concurrent('проверка sizes', () => {
    sizes.forEach((size) => {
      test(`size ${size} должен быть отображен`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });

          expect(getRender(ctx)).toHaveClass(cnSwitch({ size }));
        }));
    });
  });

  describe.concurrent('проверка views', () => {
    views.forEach((view) => {
      test(`view ${view} должен быть отображен`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });

          expect(getRender(ctx)).toHaveClass(cnSwitch({ view }));
        }));
    });
  });

  describe.concurrent('проверка disabled', () => {
    test('disabled должен быть отображен', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { disabled: true });

        expect(getInput(ctx)).toBeDisabled();
      }));

    test('disabled должен быть false по умолчанию', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});

        expect(getInput(ctx)).not.toBeDisabled();
      }));
  });

  describe.concurrent('проверка style', () => {
    test('style должен быть отображен', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { style: { color: 'red' } });

        expect(getRender(ctx)).toHaveStyle('color: red');
      }));
  });

  describe.concurrent('проверка ref', () => {
    test('ref должен быть отображен', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLLabelElement>();

        renderComponent(ctx, { ref });

        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  describe.concurrent('проверка onFocus', () => {
    test('onFocus должен быть отображен', (ctx) =>
      context.start(async () => {
        const onFocus = vi.fn();

        renderComponent(ctx, { onFocus });

        fireEvent.focus(getInput(ctx));

        expect(onFocus).toHaveBeenCalled();
      }));
  });

  describe.concurrent('проверка onBlur', () => {
    test('onBlur должен быть отображен', (ctx) =>
      context.start(async () => {
        const onBlur = vi.fn();

        renderComponent(ctx, { onBlur });

        fireEvent.blur(getInput(ctx));

        expect(onBlur).toHaveBeenCalled();
      }));
  });

  describe.concurrent('проверка readOnly', () => {
    test('readOnly должен быть отображен', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { readOnly: true });

        expect(getInput(ctx)).toHaveAttribute('readonly');
      }));
  });

  describe.concurrent('проверка name', () => {
    test('name должен быть отображен', (ctx) =>
      context.start(async () => {
        const name = 'name';

        renderComponent(ctx, { name });

        expect(getInput(ctx)).toHaveAttribute('name', name);
      }));
  });

  describe.concurrent('проверка tabIndex', () => {
    test('tabIndex должен быть отображен', (ctx) =>
      context.start(async () => {
        const tabIndex = 0;

        renderComponent(ctx, { tabIndex });

        expect(getInput(ctx)).toHaveAttribute('tabindex', tabIndex.toString());
      }));
  });

  describe.concurrent('проверка onKeyDown', () => {
    test('onKeyDown должен быть отображен', (ctx) =>
      context.start(async () => {
        const onKeyDown = vi.fn();

        renderComponent(ctx, { onKeyDown });

        fireEvent.keyDown(getInput(ctx));

        expect(onKeyDown).toHaveBeenCalled();
      }));
  });

  describe.concurrent('проверка required', () => {
    test('required должен быть отображен', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { required: true });

        expect(getInput(ctx)).toHaveAttribute('required');
      }));
  });

  describe.concurrent('проверка inputId', () => {
    test('inputId должен быть отображен', (ctx) =>
      context.start(async () => {
        const inputId = 'inputId';

        renderComponent(ctx, { inputId });

        expect(getInput(ctx)).toHaveAttribute('id', inputId);
      }));
  });

  describe.concurrent('проверка inputRef', () => {
    test('inputRef должен быть отображен', (ctx) =>
      context.start(async () => {
        const inputRef = React.createRef<HTMLInputElement>();

        renderComponent(ctx, { inputRef });

        expect(inputRef.current).toBe(getInput(ctx));
      }));
  });

  describe.concurrent('проверка align', () => {
    aligns.forEach((align) => {
      test(`align ${align} должен быть отображен`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { align });

          expect(getRender(ctx)).toHaveClass(cnSwitch({ align }));
        }));
    });
  });
});
