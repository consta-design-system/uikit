import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { cnDateTime, cnDateTimeItem, DateTime } from '../DateTime';

type DateTimeProps = React.ComponentProps<typeof DateTime>;

const testId = cnDateTime();

const getRender = () => screen.getByTestId(testId);
const getDateTimeItems = () => getRender().querySelectorAll(`.${cnDateTimeItem()}`);
const getDateTimeItem = (item = 0) => getDateTimeItems()[item];

const renderComponent = (props: DateTimeProps = {}) => {
  return render(<DateTime {...props} data-testid={testId} />);
};

describe('Компонент DateTime', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка className', () => {
    it(`Дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });

  describe('проверка onChange', () => {
    it('onChange отрабатывает при клике по дню месяца', () => {
      const handleClick = jest.fn();
      renderComponent({ onChange: handleClick, currentVisibleDate: new Date(1970, 0) });
      // 1 Января
      const DateTimeItem = getDateTimeItem(3);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('onChange не отрабатывает при клике дню вне месяца', () => {
      const handleClick = jest.fn();
      renderComponent({ onChange: handleClick, currentVisibleDate: new Date(1970, 0) });

      const DateTimeItem = getDateTimeItem(0);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
    it('onChange отрабатывает в допустимом интервале дат', () => {
      const handleClick = jest.fn();

      renderComponent({
        onChange: handleClick,
        currentVisibleDate: new Date(1970, 0),
        minDate: new Date(1970, 0, 2),
        maxDate: new Date(1970, 0, 3),
      });

      const DateTimeItem = getDateTimeItem(5);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('onChange не отрабатывает вне допустимого интервала дат', () => {
      const handleClick = jest.fn();

      renderComponent({
        onChange: handleClick,
        currentVisibleDate: new Date(1970, 0),
        minDate: new Date(1970, 0, 2),
        maxDate: new Date(1970, 0, 3),
      });

      const DateTimeItem = getDateTimeItem(0);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });
});
