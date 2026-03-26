import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { DatePicker } from '../../DatePicker';
import {
  getDateTimeItem,
  getDateTimeItemSelected,
  getInput,
  inputFocus,
  testId,
} from '../helpers';

createRoot();
clearStack();

type DatePickerTypeMonthRangeProps = React.ComponentProps<
  typeof DatePicker<'month-range'>
>;

const renderComponent = (
  ctx: TestContext,
  props: DatePickerTypeMonthRangeProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DatePicker
            {...props}
            type="month-range"
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент DatePicker_type_monthRange', () => {
  describe.concurrent('проверка onChange', () => {
    test(`при клике по календарю срабатывает`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();

        renderComponent(ctx, {
          onChange,
          currentVisibleDate: new Date(1970, 0),
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        inputFocus(ctx);

        fireEvent.click(getDateTimeItem(ctx, 4));

        expect(onChange).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка value', () => {
    test(`верно отображается в поле ввода`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [new Date(1970, 0, 15), new Date(1970, 1, 17)],
        });

        expect(getInput(ctx)).toHaveValue('01.1970');
      }));

    test(`верно отображается в календаре`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [new Date(1970, 0, 15), new Date(1970, 2, 17)],
          currentVisibleDate: new Date(1970, 0),
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        expect(getDateTimeItemSelected(ctx, 0)).toHaveTextContent('янв');
        expect(getDateTimeItemSelected(ctx, 1)).toHaveTextContent('мар');
      }));
  });
});
