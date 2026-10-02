import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DatePickerFieldTypeDateTimeRange } from '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = 'DatePickerFieldTypeDateTimeRange';

type DatePickerFieldTypeDateTimeRangeProps = React.ComponentProps<
  typeof DatePickerFieldTypeDateTimeRange
>;

const renderComponent = (
  ctx: TestContext,
  props: DatePickerFieldTypeDateTimeRangeProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DatePickerFieldTypeDateTimeRange data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} *[data-testid=${testId}]`);

const getInputs = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll(
    '.DatePickerMixRangeField-Fields input',
  ) as NodeListOf<HTMLInputElement>;

const getStartInput = (ctx: TestContext) => getInputs(ctx)[0];

const getEndInput = (ctx: TestContext) => getInputs(ctx)[1];

const getLabel = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`label`) as HTMLLabelElement;

const getCaption = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.FieldCaption`) as HTMLDivElement;

describe('Компонент DatePicker_field_typeDateTimeRange', () => {
  test('рендерит label, caption и оба поля с корректными value и placeholder', (ctx) =>
    context.start(async () => {
      const startDate = new Date(2023, 0, 1, 12, 0, 0);
      const endDate = new Date(2023, 0, 2, 13, 30, 0);
      const label = 'Выберите диапазон';
      const caption = 'Подсказка';
      const startFieldPlaceholder = 'Начало';
      const endFieldPlaceholder = 'Конец';

      renderComponent(ctx, {
        value: [startDate, endDate],
        startFieldPlaceholder,
        endFieldPlaceholder,
        label,
        caption,
        onChange: vi.fn(),
        onError: vi.fn(),
      });

      expect(getLabel(ctx)).toBeInTheDocument();
      expect(getLabel(ctx).textContent).toBe(label);

      expect(getCaption(ctx)).toBeInTheDocument();
      expect(getCaption(ctx).textContent).toBe(caption);

      const startInput = getStartInput(ctx);
      const endInput = getEndInput(ctx);

      expect(startInput).toBeInTheDocument();
      expect(endInput).toBeInTheDocument();

      expect(startInput.placeholder).toBe(startFieldPlaceholder);
      expect(endInput.placeholder).toBe(endFieldPlaceholder);

      expect(startInput.value).toBe('01.01.2023 12:00:00');
      expect(endInput.value).toBe('02.01.2023 13:30:00');
    }));

  test('передает ref и inputRef', (ctx) =>
    context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      const startRef = React.createRef<HTMLInputElement>();
      const endRef = React.createRef<HTMLInputElement>();

      renderComponent(ctx, {
        ref,
        startFieldRef: startRef,
        endFieldRef: endRef,
        value: [new Date(2023, 0, 1, 12, 0, 0), new Date(2023, 0, 2, 12, 0, 0)],
        onChange: vi.fn(),
        onError: vi.fn(),
        startFieldPlaceholder: 'Начало',
        endFieldPlaceholder: 'Конец',
      });

      expect(ref.current).not.toBeNull();
      expect(startRef.current).not.toBeNull();
      expect(endRef.current).not.toBeNull();
    }));

  test('поддерживает disabled и required', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        disabled: true,
        required: true,
        value: [new Date(2023, 0, 1, 12, 0, 0), new Date(2023, 0, 2, 12, 0, 0)],
        onChange: vi.fn(),
        onError: vi.fn(),
        startFieldPlaceholder: 'Начало',
        endFieldPlaceholder: 'Конец',
      });

      expect(getStartInput(ctx)).toBeDisabled();
      expect(getEndInput(ctx)).toBeDisabled();
    }));
});
