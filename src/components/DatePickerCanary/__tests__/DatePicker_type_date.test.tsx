import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import { DatePicker } from '../DatePickerCanary';

import {
  animateDelay,
  getDateTimeItem,
  getDateTimeItemSelected,
  getInput,
  inputFocus,
  testId,
} from './helpers';

type DateTimeProps = React.ComponentProps<typeof DatePicker>;

const renderComponent = (props: DateTimeProps = {}) => {
  return render(<DatePicker {...props} type="date" data-testid={testId} />);
};

describe('Компонент DatePicker_type_date', () => {
  describe('проверка onChage', () => {
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
        renderComponent({ value: new Date(1970, 0, 15), currentVisibleDate: new Date(1970, 0) });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeItemSelected()).toHaveTextContent('15');
    });
  });
});
