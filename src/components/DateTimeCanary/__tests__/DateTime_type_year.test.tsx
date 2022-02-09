import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { DateTime, dateTimePropView } from '../DateTimeCanary';
import { cnDateTimeCell } from '../DateTimeCell/DateTimeCell';
import { cnDateTimeItem } from '../DateTimeItem/DateTimeItem';
import { cnDateTimeLabel } from '../DateTimeLabel/DateTimeLabel';

type DateTimeProps = React.ComponentProps<typeof DateTime>;

const testId = 'DateTime_type_year';

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
  return render(<DateTime {...props} type="year" data-testid={testId} />);
};

describe('Компонент DateTime_type_year', () => {
  describe('проверка value', () => {
    dateTimePropView.forEach((view) => {
      it(`выбранная дата отображаеся верно для view=${view}`, () => {
        renderComponent({ value: new Date(1970, 0, 1), view });
        const item = getDateTimeItem(1);
        expect(item).toHaveClass('DateTimeItem_selected');
        expect(item).toHaveTextContent('1970');
      });
    });

    dateTimePropView.forEach((view) => {
      it(`выбранный диапазон отображаеся верно для view=${view}`, () => {
        renderComponent({ value: [new Date(1970, 0, 1), new Date(1972, 0, 1)], view });
        const item1 = getDateTimeItem(1);
        const item2 = getDateTimeItem(2);
        const item3 = getDateTimeItem(3);

        const cell1 = getDateTimeCell(1);
        const cell2 = getDateTimeCell(2);
        const cell3 = getDateTimeCell(3);

        expect(item1).toHaveClass('DateTimeItem_selected');
        expect(item1).toHaveTextContent('1970');
        expect(item2).not.toHaveClass('DateTimeItem_selected');
        expect(item2).toHaveTextContent('1971');
        expect(item3).toHaveClass('DateTimeItem_selected');
        expect(item3).toHaveTextContent('1972');

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

      expect(label).toHaveTextContent('1970 - 1979');
    });

    it(`Дата оображаеся верная при view='book'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'book' });

      const labels = getDateTimeViewBookLabels();

      expect(labels[0]).toHaveTextContent('1970 - 1979');
      expect(labels[1]).toHaveTextContent('1980 - 1989');
    });

    it(`Дата оображаеся верная при view='slider'`, () => {
      renderComponent({ currentVisibleDate: new Date(1970, 0), view: 'slider' });

      const sliderlabel = getDateTimeSliderLabel();
      const labels = getDateTimeViewSliderLabels();

      expect(sliderlabel).toHaveTextContent('1900-2000');
      expect(labels[0]).toHaveTextContent('1970 - 1979');
      expect(labels[1]).toHaveTextContent('1980 - 1989');
    });
  });

  describe('проверка onChangeCurrentVisibleDate ', () => {
    it(`верно срабатывает при view='classic`, () => {
      const handleClick = jest.fn();

      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        onChangeCurrentVisibleDate: handleClick,
        view: 'classic',
      });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      expect(handleClick).toHaveBeenCalledWith(new Date(1960, 0));

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

      expect(handleClick).toHaveBeenCalledWith(new Date(1960, 0));

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

      expect(handleClick).toHaveBeenCalledWith(new Date(1870, 0));

      fireEvent.click(getDateTimeSliderButtonNext());

      expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('проверка onChange', () => {
    it('onChange отрабатывает при клике на год', () => {
      const handleClick = jest.fn();
      renderComponent({ onChange: handleClick, currentVisibleDate: new Date(1970, 0) });

      const DateTimeItem = getDateTimeItem(3);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('onChange отрабатывает в допустимом интервале', () => {
      const handleClick = jest.fn();

      renderComponent({
        onChange: handleClick,
        currentVisibleDate: new Date(1970, 0),
        minDate: new Date(1971, 3, 0),
        maxDate: new Date(1975, 5, 0),
      });

      const DateTimeItem = getDateTimeItem(3);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('onChange не отрабатывает вне допустимого интервала', () => {
      const handleClick = jest.fn();

      renderComponent({
        onChange: handleClick,
        currentVisibleDate: new Date(1970, 0),
        minDate: new Date(1971, 3, 0),
        maxDate: new Date(1975, 5, 0),
      });

      const DateTimeItem = getDateTimeItem(1);

      fireEvent.click(DateTimeItem);

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });
});
