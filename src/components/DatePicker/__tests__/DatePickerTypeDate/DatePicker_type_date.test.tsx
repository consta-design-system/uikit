import { act, cleanup, fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import {
  DatePicker,
  DatePickerPropDateTimeView,
  DatePickerProps,
} from '../../DatePicker';
import {
  animateDelay,
  getDateTimeItem,
  getDateTimeItemByText,
  getDateTimeItemSelected,
  getInput,
  inputFocus,
  testId,
} from '../helpers';

const renderComponent = (props: DatePickerProps<'date'> = {}) => {
  return render(<DatePicker {...props} type="date" data-testid={testId} />);
};

describe('Компонент DatePicker_type_date', () => {
  describe('проверка onChange', () => {
    it(`при клике по календарю срабатывает`, () => {
      jest.useFakeTimers();

      const onChange = jest.fn();

      act(() => {
        renderComponent({ onChange, currentVisibleDate: new Date(1970, 0) });
      });

      inputFocus();
      animateDelay();

      inputFocus();

      fireEvent.click(getDateTimeItem(4));

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка value', () => {
    it(`верно отображается в поле ввода`, () => {
      renderComponent({ value: new Date(1970, 0, 15) });

      expect(getInput()).toHaveValue('15.01.1970');
    });

    it(`верно отображается в календаре`, () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          value: new Date(1970, 0, 15),
          currentVisibleDate: new Date(1970, 0),
        });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeItemSelected()).toHaveTextContent('15');
    });
  });

  describe('проверка disableDates', () => {
    it('корректно отключает даты при dateTimeView="classic"', () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          currentVisibleDate: new Date(1970, 0),
          disableDates: [[new Date(1970, 0, 20), new Date(1970, 0, 23)]],
          dateTimeView: 'classic',
        });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeItemByText('20')).toBeDisabled();
      expect(getDateTimeItemByText('21')).toBeDisabled();
      expect(getDateTimeItemByText('22')).toBeDisabled();
    });

    describe('корректно отключает даты с 2 сторон', () => {
      jest.useFakeTimers();

      const viewTests: DatePickerPropDateTimeView[] = ['book', 'slider'];

      test.each(viewTests)('dateTimeView=%s', (dateTimeView) => {
        act(() => {
          renderComponent({
            currentVisibleDate: new Date(1970, 0),
            disableDates: [
              [new Date(1970, 0, 20), new Date(1970, 0, 23)],
              [new Date(1970, 1, 10), new Date(1970, 1, 13)],
            ],
            dateTimeView,
          });
        });

        inputFocus();
        animateDelay();

        // Отключенные даты в левой стороне календаря (январь)
        expect(getDateTimeItem(22)).toBeDisabled();
        expect(getDateTimeItem(23)).toBeDisabled();
        expect(getDateTimeItem(24)).toBeDisabled();

        // Отключенные даты в правой стороне календаря (февраль)
        expect(getDateTimeItem(57)).toBeDisabled();
        expect(getDateTimeItem(58)).toBeDisabled();
        expect(getDateTimeItem(59)).toBeDisabled();

        cleanup();
      });
    });
  });
});
