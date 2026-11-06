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
  getInput,
  inputFocus,
  testId,
} from '../helpers';

createRoot();
clearStack();

type DatePickerTypeDateRangeProps = React.ComponentProps<
  typeof DatePicker<'date-range'>
>;

const renderComponent = (
  ctx: TestContext,
  props: DatePickerTypeDateRangeProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DatePicker
            {...props}
            type="date-range"
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент DatePicker_type_dateRange', () => {
  describe('проверка onChange', () => {
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

  describe('проверка value', () => {
    test(`верно отображается в поле ввода`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [new Date(1970, 0, 15), new Date(1970, 0, 17)],
        });

        expect(getInput(ctx)).toHaveValue('15.01.1970');
      }));

    test(`верно отображается в календаре`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: [new Date(1970, 0, 15), new Date(1970, 0, 17)],
          currentVisibleDate: new Date(1970, 0),
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        expect(getDateTimeItemSelected(ctx, 0)).toHaveTextContent('15');
        expect(getDateTimeItemSelected(ctx, 1)).toHaveTextContent('17');
      }));
  });

  describe('проверка disableDates', () => {
    test('корректно отключает даты при dateTimeView="classic"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          disableDates: [[new Date(1970, 0, 20), new Date(1970, 0, 23)]],
          dateTimeView: 'classic',
        });

        inputFocus(ctx);

        await wrap(sleep(animateTimeout));

        expect(getDateTimeItemByText(ctx, '20')).toBeDisabled();
        expect(getDateTimeItemByText(ctx, '21')).toBeDisabled();
        expect(getDateTimeItemByText(ctx, '22')).toBeDisabled();
      }));

    describe('корректно отключает даты с 2 сторон', () => {
      const viewTests: Array<'book' | 'slider'> = ['book', 'slider'];

      viewTests.forEach((dateTimeView) => {
        test(`dateTimeView=${dateTimeView}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              currentVisibleDate: new Date(1970, 0),
              disableDates: [
                [new Date(1970, 0, 20), new Date(1970, 0, 23)],
                [new Date(1970, 1, 10), new Date(1970, 1, 13)],
              ],
              dateTimeView,
            });

            inputFocus(ctx);

            await wrap(sleep(animateTimeout));

            // Отключенные даты в левой стороне календаря (январь)
            expect(getDateTimeItem(ctx, 22)).toBeDisabled();
            expect(getDateTimeItem(ctx, 23)).toBeDisabled();
            expect(getDateTimeItem(ctx, 24)).toBeDisabled();

            // Отключенные даты в правой стороне календаря (февраль)
            expect(getDateTimeItem(ctx, 57)).toBeDisabled();
            expect(getDateTimeItem(ctx, 58)).toBeDisabled();
            expect(getDateTimeItem(ctx, 59)).toBeDisabled();
          }));
      });
    });
  });
});
