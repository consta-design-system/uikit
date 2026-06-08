import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DatePickerFieldTypeDateTime } from '../../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = 'DatePickerFieldTypeDateTime';

type DatePickerFieldTypeDateTimeProps = React.ComponentProps<
  typeof DatePickerFieldTypeDateTime
>;

const renderComponent = (
  ctx: TestContext,
  props: DatePickerFieldTypeDateTimeProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DatePickerFieldTypeDateTime data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} *[data-testid=${testId}]`);

const getInput = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`input`) as HTMLInputElement;

describe('Компонент DatePickerFieldTypeDateTime', () => {
  test('рендерит TextField с placeholder и value', (ctx) =>
    context.start(async () => {
      const value = new Date(2023, 0, 1, 12, 0, 0);
      const placeholder = 'Выберите дату';

      renderComponent(ctx, {
        value,
        onChange: vi.fn(),
        onError: vi.fn(),
        placeholder,
      });

      const input = getInput(ctx);
      expect(input).toBeInTheDocument();
      expect(input.value).toBe('01.01.2023 12:00:00');
    }));

  test('поддерживает disabled и required', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        disabled: true,
        required: true,
        value: new Date(2023, 0, 1, 12, 0, 0),
        onChange: vi.fn(),
        onError: vi.fn(),
        placeholder: 'Выберите дату',
      });

      const input = getInput(ctx);
      expect(input).toBeDisabled();
    }));

  test('передает ref и inputRef', (ctx) =>
    context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      const inputRef = React.createRef<HTMLInputElement>();

      renderComponent(ctx, {
        ref,
        inputRef,
        value: new Date(2023, 0, 1, 12, 0, 0),
        onChange: vi.fn(),
        onError: vi.fn(),
        placeholder: 'Выберите дату',
      });

      expect(ref.current).not.toBeNull();
      expect(inputRef.current).not.toBeNull();
    }));
});
