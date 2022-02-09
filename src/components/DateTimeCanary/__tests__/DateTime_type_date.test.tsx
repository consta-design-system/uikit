import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { DateTime, dateTimePropView } from '../DateTimeCanary';
import { cnDateTimeCell } from '../DateTimeCell/DateTimeCell';
import { cnDateTimeItem } from '../DateTimeItem/DateTimeItem';
import { cnDateTimeLabel } from '../DateTimeLabel/DateTimeLabel';

type DateTimeProps = React.ComponentProps<typeof DateTime>;

const testId = 'DateTime_type_date';

const getRender = () => screen.getByTestId(testId);
const getDateTimeItems = () => getRender().querySelectorAll(`.${cnDateTimeItem()}`);
const getDateTimeCells = () => getRender().querySelectorAll(`.${cnDateTimeCell()}`);
const getDateTimeLabel = () => getRender().querySelector(`.${cnDateTimeLabel()}`);
const getDateTimeViewBookLabels = () => getRender().querySelectorAll(`.${cnDateTimeLabel()}`);
const getDateTimeSliderLabel = () =>
  getRender().querySelector(`.DateTimeSlider-ParentLabel_position_1`);
const getDateTimeViewSliderLabels = () => getRender().querySelectorAll(`.DateTimeMixLayout-Label`);
const getDateTimeTooglerButtonNext = () =>
  getRender().querySelector(`.DateTimeToggler-Button_direction_next`) as Element;
const getDateTimeTooglerButtonPrev = () =>
  getRender().querySelector(`.DateTimeToggler-Button_direction_prev`) as Element;
const getDateTimeSliderButtonNext = () =>
  getRender().querySelector(`.DateTimeSlider-Button_direction_next`) as Element;
const getDateTimeSliderButtonPrev = () =>
  getRender().querySelector(`.DateTimeSlider-Button_direction_prev`) as Element;

const getDateTimeItem = (item = 0) => getDateTimeItems()[item];
const getDateTimeCell = (item = 0) => getDateTimeCells()[item];

const renderComponent = (props: DateTimeProps = {}) => {
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
    it(`Дата оображаеся верная при view='classic'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'classic' });

      const label = getDateTimeLabel();

      expect(label).toHaveTextContent('январь 1970');
    });

    it(`Дата оображаеся верная при view='book'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'book' });

      const labels = getDateTimeViewBookLabels();

      expect(labels[0]).toHaveTextContent('январь 1970');
      expect(labels[1]).toHaveTextContent('февраль 1970');
    });

    it(`Дата оображаеся верная при view='slider'`, () => {
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
  });
});
