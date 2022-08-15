import { fireEvent, render, screen } from '@testing-library/react';
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
  getDateTimeTogglerLabels,
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
        renderComponent({
          value: [new Date(1970, 5, 1), new Date(1970, 5, 3)],
          view,
        });
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
      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        view: 'classic',
      });

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
      renderComponent({
        currentVisibleDate: new Date(1970, 0),
        view: 'slider',
      });

      const sliderlabel = getDateTimeSliderLabel();
      const labels = getDateTimeViewSliderLabels();

      expect(sliderlabel).toHaveTextContent('1970');
      expect(labels[0]).toHaveTextContent('январь 1970');
      expect(labels[1]).toHaveTextContent('февраль 1970');
    });
  });

  describe('проверка onChangeCurrentVisibleDate', () => {
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
    dateTimePropView.forEach((view) => {
      it(`onChange отрабатывает при клике по дню месяца для view=${view}`, () => {
        const handleClick = jest.fn((value) => new Date(value.value));
        renderComponent({
          onChange: handleClick,
          view,
          currentVisibleDate: new Date(1970, 0, 3),
        });

        const DateTimeItem = getDateTimeItem(3);

        fireEvent.click(DateTimeItem);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveReturnedWith(new Date(1970, 0, 1));
      });
    });

    dateTimePropView.forEach((view) => {
      it(`onChange не отрабатывает при клике дню вне месяца для view=${view}`, () => {
        const handleClick = jest.fn();
        renderComponent({
          onChange: handleClick,
          view,
          currentVisibleDate: new Date(1970, 0),
        });

        const DateTimeItem = getDateTimeItem(0);

        fireEvent.click(DateTimeItem);

        expect(handleClick).toHaveBeenCalledTimes(0);
      });
    });

    dateTimePropView.forEach((view) => {
      it(`onChange отрабатывает в допустимом интервале для view=${view}`, () => {
        const handleClick = jest.fn();

        renderComponent({
          onChange: handleClick,
          view,
          currentVisibleDate: new Date(1970, 0),
          minDate: new Date(1970, 0, 2),
          maxDate: new Date(1970, 0, 3),
        });

        const DateTimeItem = getDateTimeItem(5);

        fireEvent.click(DateTimeItem);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    dateTimePropView.forEach((view) => {
      it(`onChange не отрабатывает вне допустимого интервала для view=${view}`, () => {
        const handleClick = jest.fn();

        renderComponent({
          onChange: handleClick,
          view,
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

  describe('проверка переключения месяца и года', () => {
    dateTimePropView.forEach((view) => {
      it(`проверка изменения месяца через DateTimeToggler-Button для view=${view}`, () => {
        renderComponent({
          value: new Date(1970, 0, 3),
          view,
        });

        expect(screen.getByText('январь 1970')).toBeInTheDocument();

        if (view === 'slider') {
          expect(screen.getByText('февраль 1970')).toBeInTheDocument();

          const nextButton = getDateTimeSliderButtonNext();
          fireEvent.click(nextButton);
          expect(screen.getByText('январь 1971')).toBeInTheDocument();
          expect(screen.getByText('февраль 1971')).toBeInTheDocument();

          const prevButton = getDateTimeSliderButtonPrev();
          fireEvent.click(prevButton);
          expect(screen.getByText('февраль 1970')).toBeInTheDocument();
        } else {
          const nextButton = getDateTimeTooglerButtonNext();
          fireEvent.click(nextButton);
          expect(screen.getByText('февраль 1970')).toBeInTheDocument();

          const prevButton = getDateTimeTooglerButtonPrev();
          fireEvent.click(prevButton);
        }

        expect(screen.getByText('январь 1970')).toBeInTheDocument();
      });
    });

    dateTimePropView.forEach((view) => {
      it(`проверка изменения месяца через DateTimeToggler-Label для view=${view}`, () => {
        renderComponent({
          view,
          value: new Date(1970, 0, 3),
        });

        expect(screen.getByText('январь 1970')).toBeInTheDocument();

        if (view === 'slider') {
          const labelButton = getDateTimeViewBookLabels()[0] as Element;
          fireEvent.click(labelButton);
        } else {
          const labelButton = getDateTimeTogglerLabels()[0] as Element;
          fireEvent.click(labelButton);
        }

        const monthButton = getDateTimeItem(1);
        fireEvent.click(monthButton);
        expect(screen.getByText('февраль 1970')).toBeInTheDocument();
      });
    });

    dateTimePropView.forEach((view) => {
      it(`проверка изменения года DateTimeToggler-Label для view=${view}`, () => {
        renderComponent({
          view,
          value: new Date(1970, 0, 3),
        });

        expect(screen.getByText('январь 1970')).toBeInTheDocument();

        if (view === 'slider') {
          const labelButton = getDateTimeViewBookLabels()[0] as Element;
          fireEvent.click(labelButton);

          const newLabelButton = getDateTimeViewBookLabels()[0] as Element;
          fireEvent.click(newLabelButton);
          expect(screen.getByText('1970 - 1979')).toBeInTheDocument();

          const yearButton = getDateTimeItem(2);
          fireEvent.click(yearButton);
          expect(screen.getByText('1980-1990')).toBeInTheDocument();
        } else {
          const labelButton = getDateTimeTogglerLabels()[0] as Element;
          fireEvent.click(labelButton);

          const newLabelButton = getDateTimeTogglerLabels()[0] as Element;
          fireEvent.click(newLabelButton);
          expect(screen.getByText('1970 - 1979')).toBeInTheDocument();

          const yearButton = getDateTimeItem(2);
          fireEvent.click(yearButton);
          expect(screen.getByText('1971')).toBeInTheDocument();
        }
      });
    });
  });

  describe('проверка locale', () => {
    dateTimePropView.forEach((view) => {
      it(`проверка применения locale="fa-IR" при view="${view}"`, () => {
        renderComponent({
          view,
          locale: faIRLocale,
          currentVisibleDate: new Date(2022, 5),
        });

        const label = getDateTimeLabel();
        expect(label).toHaveTextContent('جون 2022');
      });
    });
  });
});
