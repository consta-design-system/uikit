import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnRadio, Radio } from '../Radio';

createRoot();
clearStack();

type RadioProps = React.ComponentProps<typeof Radio>;

const testId = cnRadio();

const renderComponent = (
  ctx: TestContext,
  {
    onChange = vi.fn(),
    checked = false,
    ...props
  }: Omit<RadioProps, 'onChange' | 'checked'> & {
    onChange?: RadioProps['onChange'];
    checked?: RadioProps['checked'];
  },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Radio
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
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLLabelElement;

const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector('input') as HTMLInputElement;

const getLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnRadio('Label')}`) as HTMLSpanElement;

describe('Компонент Radio', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка className', () => {
    test(`Присваивается дополнительный className`, (ctx) =>
      context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe('проверка label', () => {
    test(`label отображается`, (ctx) =>
      context.start(async () => {
        const label = 'fileName';
        renderComponent(ctx, { label });
        await wrap(tick());
        expect(getLabel(ctx).textContent).toEqual(label);
      }));
  });

  describe('проверка onChange', () => {
    test(`клик должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();

        renderComponent(ctx, { onChange: handleChange });
        await wrap(tick());

        const element = getRender(ctx) as HTMLLabelElement;

        fireEvent.click(element);
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
      }));
  });

  describe('проверка checked', () => {
    test(`checked должен быть true`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { checked: true });
        await wrap(tick());

        expect(getInput(ctx).checked).toBe(true);
      }));

    test(`checked должен быть false`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { checked: false });
        await wrap(tick());

        expect(getInput(ctx).checked).toBe(false);
      }));

    test(`checked должен быть false по умолчанию`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());

        expect(getInput(ctx).checked).toBe(false);
      }));
  });

  describe('проверка sizes', () => {
    sizes.forEach((size) => {
      test(`size ${size} должен быть отображен`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnRadio({ size }));
        }));
    });
  });

  describe('проверка views', () => {
    views.forEach((view) => {
      test(`view ${view} должен быть отображен`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnRadio({ view }));
        }));
    });
  });

  describe('проверка disabled', () => {
    test(`disabled должен быть отображен`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { disabled: true });
        await wrap(tick());

        expect(getInput(ctx)).toBeDisabled();
      }));

    test(`disabled должен быть false по умолчанию`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());

        expect(getInput(ctx)).not.toBeDisabled();
      }));
  });

  describe('проверка style', () => {
    test(`style должен быть отображен`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { style: { color: 'red' } });
        await wrap(tick());

        expect(getRender(ctx)).toHaveStyle('color: red');
      }));
  });

  describe('проверка ref', () => {
    test(`ref должен быть отображен`, (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLLabelElement>();

        renderComponent(ctx, { ref });
        await wrap(tick());

        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  describe('проверка onFocus', () => {
    test(`onFocus должен быть отображен`, (ctx) =>
      context.start(async () => {
        const onFocus = vi.fn();

        renderComponent(ctx, { onFocus });
        await wrap(tick());

        fireEvent.focus(getInput(ctx));

        expect(onFocus).toHaveBeenCalled();
      }));
  });

  describe('проверка onBlur', () => {
    test(`onBlur должен быть отображен`, (ctx) =>
      context.start(async () => {
        const onBlur = vi.fn();

        renderComponent(ctx, { onBlur });
        await wrap(tick());

        fireEvent.blur(getInput(ctx));

        expect(onBlur).toHaveBeenCalled();
      }));
  });

  describe('проверка readOnly', () => {
    test(`readOnly должен быть отображен`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { readOnly: true });
        await wrap(tick());

        expect(getInput(ctx)).toHaveAttribute('readonly');
      }));
  });

  describe('проверка name', () => {
    test(`name должен быть отображен`, (ctx) =>
      context.start(async () => {
        const name = 'name';

        renderComponent(ctx, { name });
        await wrap(tick());

        expect(getInput(ctx)).toHaveAttribute('name', name);
      }));
  });

  describe('проверка tabIndex', () => {
    test(`tabIndex должен быть отображен`, (ctx) =>
      context.start(async () => {
        const tabIndex = 0;

        renderComponent(ctx, { tabIndex });
        await wrap(tick());

        expect(getInput(ctx)).toHaveAttribute('tabindex', tabIndex.toString());
      }));
  });

  describe('проверка onKeyDown', () => {
    test(`onKeyDown должен быть отображен`, (ctx) =>
      context.start(async () => {
        const onKeyDown = vi.fn();

        renderComponent(ctx, { onKeyDown });
        await wrap(tick());

        fireEvent.keyDown(getInput(ctx));

        expect(onKeyDown).toHaveBeenCalled();
      }));
  });

  describe('проверка required', () => {
    test(`required должен быть отображен`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { required: true });
        await wrap(tick());

        expect(getInput(ctx)).toHaveAttribute('required');
      }));
  });

  describe('проверка inputId', () => {
    test(`inputId должен быть отображен`, (ctx) =>
      context.start(async () => {
        const inputId = 'inputId';

        renderComponent(ctx, { inputId });
        await wrap(tick());

        expect(getInput(ctx)).toHaveAttribute('id', inputId);
      }));
  });

  describe('проверка inputRef', () => {
    test(`inputRef должен быть отображен`, (ctx) =>
      context.start(async () => {
        const inputRef = React.createRef<HTMLInputElement>();

        renderComponent(ctx, { inputRef });
        await wrap(tick());

        expect(inputRef.current).toBe(getInput(ctx));
      }));
  });

  describe('проверка align', () => {
    aligns.forEach((align) => {
      test(`align ${align} должен быть отображен`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { align });
          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnRadio({ align }));
        }));
    });
  });
});