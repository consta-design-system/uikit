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
  getDateTimeItemByText,
  getDateTimeItemSelected,
  getDateTimeTimeItem,
  getDateTimeTimeSelected,
  getInput,
  inputFocus,
  testId,
} from '../helpers';

createRoot();
clearStack();

type DatePickerTypeDateTimeRangeProps = React.ComponentProps<
  typeof DatePicker<'date-time-range'>
>;

const renderComponent = (
  ctx: TestContext,
  props: DatePickerTypeDateTimeRangeProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DatePicker
            {...props}
            type="date-time-range"
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент DatePicker_type_dateTimeRange', () => {
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
          value: [new Date(1970, 0, 15, 10, 11, 12), new Date(1970, 0, 17)],
        });

        expect(getInput(ctx)).toHaveValue('15.01.1970 10:11:12');
      }));

    test(`верно отображается в календаре`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [new Date(1970, 0, 15, 10, 11, 12), new Date(1970, 0, 17)],
          currentVisibleDate: new Date(1970, 0),
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        expect(getDateTimeItemSelected(ctx, 0)).toHaveTextContent('15');
        expect(getDateTimeTimeSelected(ctx, 0)).toHaveTextContent('10');
        expect(getDateTimeTimeSelected(ctx, 1)).toHaveTextContent('11');
        expect(getDateTimeTimeSelected(ctx, 2)).toHaveTextContent('12');
      }));
  });

  describe.concurrent('проверка disableDates', () => {
    test('корректно отключает даты', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          disableDates: [[new Date(1970, 0, 20), new Date(1970, 0, 23)]],
          dateTimeView: 'classic',
          timeOptions: {
            hours: [],
            minutes: [],
            seconds: [],
          },
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        expect(getDateTimeItemByText(ctx, '20')).toBeDisabled();
        expect(getDateTimeItemByText(ctx, '21')).toBeDisabled();
        expect(getDateTimeItemByText(ctx, '22')).toBeDisabled();
      }));

    test('корректно отключает часы', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [new Date(1970, 0, 1), new Date(1970, 0, 1)],
          currentVisibleDate: new Date(1970, 0),
          disableDates: [
            [new Date(1970, 0, 1, 2, 0, 0), new Date(1970, 0, 1, 6, 0, 0)],
          ],
          dateTimeView: 'classic',
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        expect(getDateTimeTimeItem(ctx, 3)).toBeDisabled(); // время 03:00
        expect(getDateTimeTimeItem(ctx, 4)).toBeDisabled(); // время 04:00
        expect(getDateTimeTimeItem(ctx, 5)).toBeDisabled(); // время 05:00
      }));
  });
});
