import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { DateTime, DateTimeProps, dateTimePropView } from '../DateTimeCanary';

import {
  getDateTimeCell,
  getDateTimeItem,
  getDateTimeLabel,
  getDateTimeSliderButtonNext,
  getDateTimeSliderButtonPrev,
  getDateTimeSliderLabel,
  getDateTimeTogglerLabel,
  getDateTimeTooglerButtonNext,
  getDateTimeTooglerButtonPrev,
  getDateTimeViewBookLabels,
  getDateTimeViewSliderLabels,
  testId,
} from './helpers';

const renderComponent = (props: DateTimeProps<'date'> = {}) => {
  return render(<DateTime {...props} type="date" data-testid={testId} />);
};

describe('Компонент DateTime_type_date', () => {
  describe('проверка value', () => {
    dateTimePropView.forEach((view) => {
      it(`выбранная дата отображаеся верно для view=${view}`, () => {
        renderComponent({ value: new Date(1970, 5, 1), view });
        const item = getDateTimeItem();
        expect(item).toHaveClass('DateTimeItem_selected');
        expect(item).toHaveTextContent('1');
      });
    });

    dateTimePropView.forEach((view) => {
      it(`выбранный диапазон отображаеся верно для view=${view}`, () => {
        renderComponent({ value: [new Date(1970, 5, 1), new Date(1970, 5, 3)], view });
        const item1 = getDateTimeItem(0);
        const item2 = getDateTimeItem(1);
        const item3 = getDateTimeItem(2);

        const cell1 = getDateTimeCell(7);
        const cell2 = getDateTimeCell(8);
        const cell3 = getDateTimeCell(9);

        expect(item1).toHaveClass('DateTimeItem_selected');
        expect(item1).toHaveTextContent('1');
        expect(item2).not.toHaveClass('DateTimeItem_selected');
        expect(item2).toHaveTextContent('2');
        expect(item3).toHaveClass('DateTimeItem_selected');
        expect(item3).toHaveTextContent('3');

        expect(cell1).toHaveClass('DateTimeCell_range_first');
        expect(cell2).toHaveClass('DateTimeCell_range');
        expect(cell3).toHaveClass('DateTimeCell_range_last');
      });
    });
  });

  describe('проверка currentVisibleDate', () => {
    it(`Дата отображаеся верная при view='classic'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'classic' });

      const label = getDateTimeLabel();

      expect(label).toHaveTextContent('январь 1970');
    });

    it(`Дата отображаеся верная при view='book'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'book' });

      const labels = getDateTimeViewBookLabels();

      expect(labels[0]).toHaveTextContent('январь 1970');
      expect(labels[1]).toHaveTextContent('февраль 1970');
    });

    it(`Дата отображаеся верная при view='slider'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'slider' });

      const sliderlabel = getDateTimeSliderLabel();
      const labels = getDateTimeViewSliderLabels();

      expect(sliderlabel).toHaveTextContent('1970');
      expect(labels[0]).toHaveTextContent('январь 1970');
      expect(labels[1]).toHaveTextContent('февраль 1970');
    });
  });

  describe('проверка onChangeCurrentVisibleDate ', () => {
    it(`верно срабатывает при view='classic`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 10, 1, 0, 0, 0),
        onChangeCurrentVisibleDate: handleClick,
        view: 'classic',
      });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 9, 1, 0, 0, 0));

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 10, 1, 0, 0, 0));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it(`верно срабатывает при view='book`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 10, 1, 0, 0, 0),
        onChangeCurrentVisibleDate: handleClick,
        view: 'book',
      });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 9, 1, 0, 0, 0));

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 10, 1, 0, 0, 0));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it(`верно срабатывает при view='slider'`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 10),
        onChangeCurrentVisibleDate: handleClick,
        view: 'slider',
      });

      fireEvent.click(getDateTimeSliderButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1969, 10));

      fireEvent.click(getDateTimeSliderButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 10));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('проверка onChange', () => {
    it('onChange отрабатывает при клике по дню месяца', () => {
      const handleClick = jest.fn();
      renderComponent({ onChange: handleClick, currentVisibleDate: new Date(1970, 0) });

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

    it('onChange отрабатывает в допустимом интервале', () => {
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

    it('onChange не отрабатывает вне допустимого интервала', () => {
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

    dateTimePropView.forEach((view) => {
      it('проверка смены даты при клике на новый день', () => {
        const onChange = jest.fn((value) => new Date(value.value));
        renderComponent({
          value: new Date(1970, 0, 3),
          view,
          onChange,
        });
        const currentValue = getDateTimeItem(5);
        expect(currentValue).toHaveTextContent('3');
        const newCurrentValue = getDateTimeItem(6);
        fireEvent.click(newCurrentValue);
        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveReturnedWith(new Date(1970, 0, 4));
      });
    });

    it('проверка смены даты при изменении месяца через DateTimeToggler-Button', () => {
      const onChange = jest.fn((value) => new Date(value.value));
      renderComponent({
        value: new Date(1970, 0, 3),
        onChange,
      });
      expect(screen.getByText('январь 1970')).toBeInTheDocument();
      const nextButton = getDateTimeTooglerButtonNext();
      fireEvent.click(nextButton);
      expect(screen.getByText('февраль 1970')).toBeInTheDocument();
      const prevButton = getDateTimeTooglerButtonPrev();
      fireEvent.click(prevButton);
      expect(screen.getByText('январь 1970')).toBeInTheDocument();
      const newCurrentValue = getDateTimeItem(4);
      fireEvent.click(newCurrentValue);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 2));
    });

    it('проверка смены даты при изменении месяца через DateTimeToggler-Label', () => {
      const onChange = jest.fn((value) => new Date(value.value));
      renderComponent({
        value: new Date(1970, 0, 3),
        onChange,
      });
      expect(screen.getByText('январь 1970')).toBeInTheDocument();
      const labelButton = getDateTimeTogglerLabel();
      fireEvent.click(labelButton);
      expect(screen.getByText('фев')).toBeInTheDocument();
      const monthButton = getDateTimeItem(1);
      fireEvent.click(monthButton);
      expect(screen.getByText('февраль 1970')).toBeInTheDocument();
      const newCurrentValue = getDateTimeItem(7);
      fireEvent.click(newCurrentValue);
      expect(onChange).toHaveReturnedWith(new Date(1970, 1, 2));
    });

    it('проверка смены даты при изменении года и месяца через DateTimeToggler-Label', () => {
      const onChange = jest.fn((value) => new Date(value.value));
      renderComponent({
        value: new Date(1970, 0, 3),
        onChange,
      });
      expect(screen.getByText('январь 1970')).toBeInTheDocument();
      const labelButton = getDateTimeTogglerLabel();
      fireEvent.click(labelButton);
      expect(screen.getByText('фев')).toBeInTheDocument();
      const newLabelButton = getDateTimeTogglerLabel();
      fireEvent.click(newLabelButton);
      expect(screen.getByText('1970 - 1979')).toBeInTheDocument();
      const yearButton = getDateTimeItem(2);
      fireEvent.click(yearButton);
      expect(screen.getByText('1971')).toBeInTheDocument();
      const monthButton = getDateTimeItem(2);
      fireEvent.click(monthButton);
      expect(screen.getByText('март 1971')).toBeInTheDocument();
      const newCurrentValue = getDateTimeItem(1);
      fireEvent.click(newCurrentValue);
      expect(onChange).toHaveReturnedWith(new Date(1971, 2, 2));
    });
  });
});
