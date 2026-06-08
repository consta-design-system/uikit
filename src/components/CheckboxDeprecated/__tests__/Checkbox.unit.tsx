import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Checkbox, cnCheckbox } from '../CheckboxDeprecated';

createRoot();
clearStack();

type CheckboxProps = React.ComponentProps<typeof Checkbox>;

const testId = 'Checkbox';

const defaultHandleChange = vi.fn();

const renderComponent = (
  ctx: TestContext,
  {
    onChange = defaultHandleChange,
    checked = false,
    ...props
  }: Omit<CheckboxProps, 'onChange' | 'checked'> & {
    onChange?: CheckboxProps['onChange'];
    checked?: CheckboxProps['checked'];
  },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Checkbox
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

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

function getLabel(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnCheckbox('Label')}`);
}

describe('Компонент Checkbox', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, {});

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка className', () => {
      test(`Присваивается дополнительный className`, (ctx) =>
        context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка label', () => {
      test(`label отображается`, (ctx) =>
        context.start(async () => {
          const label = 'fileName';

          renderComponent(ctx, { label });

          const labelElement = getLabel(ctx) as HTMLSpanElement;

          expect(labelElement.textContent).toEqual(label);
        }));
    });

    describe('проверка onChange', () => {
      test(`клик должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, { onChange: handleChange });

          const element = getRender(ctx) as HTMLButtonElement;

          fireEvent.click(element);
          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(true, {
            e: expect.any(Object),
          });
        }));
    });
  });
});
