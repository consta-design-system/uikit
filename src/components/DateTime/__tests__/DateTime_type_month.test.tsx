import { fireEvent, render } from '@testing-library/react';
import faIRLocale from 'date-fns/locale/fa-IR';
import * as React from 'react';

import { DateTime, DateTimeProps, dateTimePropView } from '../DateTime';
import {
  getDateTimeCell,
  getDateTimeItem,
  getDateTimeLabel,
  getDateTimeSliderButtonNext,
  getDateTimeSliderButtonPrev,
  getDateTimeSliderLabel,
  getDateTimeTooglerButtonNext,
  getDateTimeTooglerButtonPrev,
  getDateTimeViewBookLabels,
  getDateTimeViewSliderLabels,
  testId,
} from './helpers';

const renderComponent = (props: DateTimeProps<'month'> = {}) => {
  return render(<DateTime {...props} type="month" data-testid={testId} />);
};

describe('Компонент DateTime_type_month', () => {
  describe('проверка value', () => {
    dateTimePropView.forEach((view) => {
      it(`выбранная дата отображаеся верно для view=${view}`, () => {
        renderComponent({ value: new Date(1970, 0, 1), view });
        const item = getDateTimeItem();
        expect(item).toHaveClass('DateTimeItem_selected');
        expect(item).toHaveTextContent('янв');
      });
    });

    dateTimePropView.forEach((view) => {
      it(`выбранный диапазон отображаеся верно для view=${view}`, () => {
        renderComponent({
          value: [new Date(1970, 0, 1), new Date(1970, 2, 1)],
          view,
        });
        const item1 = getDateTimeItem(0);
        const item2 = getDateTimeItem(1);
        const item3 = getDateTimeItem(2);

        const cell1 = getDateTimeCell(0);
        const cell2 = getDateTimeCell(1);
        const cell3 = getDateTimeCell(2);

        expect(item1).toHaveClass('DateTimeItem_selected');
        expect(item1).toHaveTextContent('янв');
        expect(item2).not.toHaveClass('DateTimeItem_selected');
        expect(item2).toHaveTextContent('фев');
        expect(item3).toHaveClass('DateTimeItem_selected');
        expect(item3).toHaveTextContent('мар');

        expect(cell1).toHaveClass('DateTimeCell_range_first');
        expect(cell2).toHaveClass('DateTimeCell_range');
        expect(cell3).toHaveClass('DateTimeCell_range_last');
      });
    });
  });

  describe('проверка currentVisibleDate', () => {
    it(`Дата оображаеся верная при view='classic'`, () => {
      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        view: 'classic',
      });

      const label = getDateTimeLabel();

      expect(label).toHaveTextContent('1970');
    });

    it(`Дата оображаеся верная при view='book'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'book' });

      const labels = getDateTimeViewBookLabels();

      expect(labels[0]).toHaveTextContent('1970');
      expect(labels[1]).toHaveTextContent('1971');
    });

    it(`Дата оображаеся верная при view='slider'`, () => {
      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        view: 'slider',
      });

      const sliderlabel = getDateTimeSliderLabel();
      const labels = getDateTimeViewSliderLabels();

      expect(sliderlabel).toHaveTextContent('1970-1980');
      expect(labels[0]).toHaveTextContent('1970');
      expect(labels[1]).toHaveTextContent('1971');
    });
  });

  describe('проверка onChangeCurrentVisibleDate', () => {
    it(`верно срабатывает при view='classic`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        onChangeCurrentVisibleDate: handleClick,
        view: 'classic',
      });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1969, 0));

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it(`верно срабатывает при view='book`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        onChangeCurrentVisibleDate: handleClick,
        view: 'book',
      });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1969, 0));

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it(`верно срабатывает при view='slider'`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        onChangeCurrentVisibleDate: handleClick,
        view: 'slider',
      });

      fireEvent.click(getDateTimeSliderButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1960, 0));

      fireEvent.click(getDateTimeSliderButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('проверка onChange', () => {
    dateTimePropView.forEach((view) => {
      it(`onChange отрабатывает при клике на месяц при view="${view}"`, () => {
        const handleClick = jest.fn(({ value }) => new Date(value));
        renderComponent({
          onChange: handleClick,
          currentVisibleDate: new Date(1970, 0),
          view,
        });

        const DateTimeItem = getDateTimeItem(3);
        fireEvent.click(DateTimeItem);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveReturnedWith(new Date(1970, 3));
      });
    });

    dateTimePropView.forEach((view) => {
      it(`onChange отрабатывает в допустимом интервале при view="${view}"`, () => {
        const handleClick = jest.fn();

        renderComponent({
          onChange: handleClick,
          currentVisibleDate: new Date(1970, 0),
          minDate: new Date(1970, 3, 0),
          maxDate: new Date(1970, 5, 0),
          view,
        });

        const DateTimeItem = getDateTimeItem(3);
        fireEvent.click(DateTimeItem);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    dateTimePropView.forEach((view) => {
      it(`onChange не отрабатывает вне допустимого интервала при view="${view}"`, () => {
        const handleClick = jest.fn();

        renderComponent({
          onChange: handleClick,
          currentVisibleDate: new Date(1970, 0),
          minDate: new Date(1970, 3, 0),
          maxDate: new Date(1970, 5, 0),
          view,
        });

        const DateTimeItem = getDateTimeItem(1);
        fireEvent.click(DateTimeItem);

        expect(handleClick).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('проверка onChangeRange', () => {
    dateTimePropView.forEach((view) => {
      it(`onChangeRange отрабатывает при клике на месяц при view="${view}"`, () => {
        const onChangeRange = jest.fn(({ value }) => [
          value[0] ? new Date(value[0]) : null,
          value[1] ? new Date(value[1]) : null,
        ]);
        renderComponent({
          currentVisibleDate: new Date(1970, 0),
          view,
          onChangeRange,
        });

        const newCurrentValueStart = getDateTimeItem(3);
        fireEvent.click(newCurrentValueStart);

        const newCurrentValueEnd = getDateTimeItem(5);
        fireEvent.click(newCurrentValueEnd);

        expect(onChangeRange).toHaveBeenCalledTimes(2);
        expect(onChangeRange).toHaveNthReturnedWith(1, [
          new Date(1970, 3),
          null,
        ]);
        expect(onChangeRange).toHaveNthReturnedWith(2, [
          new Date(1970, 5),
          null,
        ]);
      });
    });
  });

  describe('переключение календаря', () => {
    it('проверка смены года через DateTimeToggler-Button_direction_prev для view="classic"', () => {
      renderComponent({
        value: new Date(2000, 0),
        currentVisibleDate: new Date(2000, 0),
        view: 'classic',
      });

      const label = getDateTimeLabel();
      expect(label).toHaveTextContent('2000');

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(label).not.toHaveTextContent('2000');
      expect(label).toHaveTextContent('1999');
    });

    it('проверка смены года через DateTimeToggler-Button_direction_next для view="classic"', () => {
      renderComponent({
        value: new Date(2001, 0),
        currentVisibleDate: new Date(2001, 0),
        view: 'classic',
      });

      const label = getDateTimeLabel();
      expect(label).toHaveTextContent('2001');

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(label).not.toHaveTextContent('2001');
      expect(label).toHaveTextContent('2002');
    });

    it('проверка смены года через DateTimeToggler-Button_direction_prev для view="book"', () => {
      renderComponent({
        value: new Date(2000, 0),
        currentVisibleDate: new Date(2000, 0),
        view: 'book',
      });

      const labels = getDateTimeViewBookLabels();
      expect(labels[0]).toHaveTextContent('2000');
      expect(labels[1]).toHaveTextContent('2001');

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(labels[0]).not.toHaveTextContent('2001');
      expect(labels[0]).toHaveTextContent('1999');
      expect(labels[1]).toHaveTextContent('2000');
    });

    it('проверка смены года через DateTimeToggler-Button_direction_next для view="book"', () => {
      renderComponent({
        value: new Date(2000, 0),
        currentVisibleDate: new Date(2000, 0),
        view: 'book',
      });

      const labels = getDateTimeViewBookLabels();
      expect(labels[0]).toHaveTextContent('2000');
      expect(labels[1]).toHaveTextContent('2001');

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(labels[0]).not.toHaveTextContent('2000');
      expect(labels[0]).toHaveTextContent('2001');
      expect(labels[1]).toHaveTextContent('2002');
    });

    it('проверка смены года через DateTimeSlider-Button_direction_prev для view="slider"', () => {
      renderComponent({
        value: new Date(2000, 0),
        currentVisibleDate: new Date(2000, 0),
        view: 'slider',
      });

      const sliderlabel = getDateTimeSliderLabel();
      const labels = getDateTimeViewSliderLabels();

      expect(sliderlabel).toHaveTextContent('2000-2010');

      expect(labels[0]).toHaveTextContent('2000');
      expect(labels[1]).toHaveTextContent('2001');

      fireEvent.click(getDateTimeSliderButtonPrev());

      const updateSliderlabel = getDateTimeSliderLabel();

      expect(updateSliderlabel).not.toHaveTextContent('2000-2010');
      expect(updateSliderlabel).toHaveTextContent('1990-2000');

      expect(labels[0]).not.toHaveTextContent('2000');
      expect(labels[0]).toHaveTextContent('1990');
      expect(labels[1]).not.toHaveTextContent('2001');
      expect(labels[1]).toHaveTextContent('1991');
    });

    it('проверка смены года через DateTimeSlider-Button_direction_next для view="slider"', () => {
      renderComponent({
        value: new Date(2000, 0),
        currentVisibleDate: new Date(2000, 0),
        view: 'slider',
      });

      const sliderlabel = getDateTimeSliderLabel();
      const labels = getDateTimeViewSliderLabels();

      expect(sliderlabel).toHaveTextContent('2000-2010');

      expect(labels[0]).toHaveTextContent('2000');
      expect(labels[1]).toHaveTextContent('2001');

      fireEvent.click(getDateTimeSliderButtonNext());

      const updateSliderlabel = getDateTimeSliderLabel();

      expect(updateSliderlabel).not.toHaveTextContent('2000-2010');
      expect(updateSliderlabel).toHaveTextContent('2010-2020');

      expect(labels[0]).not.toHaveTextContent('2000');
      expect(labels[0]).toHaveTextContent('2010');
      expect(labels[1]).not.toHaveTextContent('2001');
      expect(labels[1]).toHaveTextContent('2011');
    });
  });

  describe('проверка locale', () => {
    dateTimePropView.forEach((view) => {
      it(`проверка применения locale="fa-IR" при view="${view}"`, () => {
        renderComponent({
          locale: faIRLocale,
          currentVisibleDate: new Date(2022, 5),
          view,
        });

        const month = getDateTimeItem(0);
        expect(month).toHaveTextContent('ژانـ');
      });
    });
  });
});
