import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import { faIR } from 'date-fns/locale';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DateTime, DateTimeProps, dateTimePropView } from '../DateTime';
import {
  getDateTimeCell,
  getDateTimeItem,
  getDateTimeLabel,
  getDateTimeSliderButtonNext,
  getDateTimeSliderButtonPrev,
  getDateTimeSliderLabel,
  getDateTimeTogglerButtonNext,
  getDateTimeTogglerButtonPrev,
  getDateTimeTogglerLabels,
  getDateTimeViewBookLabels,
  getDateTimeViewSliderLabels,
  testId,
} from './helpers';

createRoot();
clearStack();

type DateTimeTypeDateProps = DateTimeProps<'date'>;

const renderComponent = (
  ctx: TestContext,
  props: DateTimeTypeDateProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DateTime {...props} type="date" data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент DateTime_type_date', () => {
  describe('проверка value', () => {
    dateTimePropView.forEach((view) => {
      test(`выбранная дата отображается верно для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: new Date(1970, 5, 1), view });
          const item = getDateTimeItem(ctx);
          expect(item).toHaveClass('DateTimeItem_selected');
          expect(item).toHaveTextContent('1');
        }));
    });

    dateTimePropView.forEach((view) => {
      test(`выбранный диапазон отображается верно для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: [new Date(1970, 5, 1), new Date(1970, 5, 3)],
            view,
          });
          const item1 = getDateTimeItem(ctx, 0);
          const item2 = getDateTimeItem(ctx, 1);
          const item3 = getDateTimeItem(ctx, 2);

          const cell1 = getDateTimeCell(ctx, 7);
          const cell2 = getDateTimeCell(ctx, 8);
          const cell3 = getDateTimeCell(ctx, 9);

          expect(item1).toHaveClass('DateTimeItem_selected');
          expect(item1).toHaveTextContent('1');
          expect(item2).not.toHaveClass('DateTimeItem_selected');
          expect(item2).toHaveTextContent('2');
          expect(item3).toHaveClass('DateTimeItem_selected');
          expect(item3).toHaveTextContent('3');

          expect(cell1).toHaveClass('DateTimeCell_range_first');
          expect(cell2).toHaveClass('DateTimeCell_range');
          expect(cell3).toHaveClass('DateTimeCell_range_last');
        }));
    });
  });

  describe('проверка currentVisibleDate', () => {
    test(`Дата отображается верная при view='classic'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'classic',
        });

        const label = getDateTimeLabel(ctx);

        expect(label).toHaveTextContent('январь 1970');
      }));

    test(`Дата отображается верная при view='book'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'book',
        });

        const labels = getDateTimeViewBookLabels(ctx);

        expect(labels[0]).toHaveTextContent('январь 1970');
        expect(labels[1]).toHaveTextContent('февраль 1970');
      }));

    test(`Дата отображается верная при view='slider'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'slider',
        });

        const sliderLabel = getDateTimeSliderLabel(ctx);
        const labels = getDateTimeViewSliderLabels(ctx);

        expect(sliderLabel).toHaveTextContent('1970');
        expect(labels[0]).toHaveTextContent('январь 1970');
        expect(labels[1]).toHaveTextContent('февраль 1970');
      }));

    test('Если текущая дата меньше минимальной, отображается минимальная', (ctx) =>
      context.start(async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2000, 0));
        renderComponent(ctx, {
          minDate: new Date(2001, 0),
        });

        const label = getDateTimeLabel(ctx);

        expect(label).toHaveTextContent('январь 2001');
        vi.useRealTimers();
      }));

    test('Если текущая дата больше максимальной, отображается максимальная', (ctx) =>
      context.start(async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2000, 0));
        renderComponent(ctx, {
          maxDate: new Date(1999, 0),
        });

        const label = getDateTimeLabel(ctx);

        expect(label).toHaveTextContent('январь 1999');
        vi.useRealTimers();
      }));
  });

  describe('проверка onChangeCurrentVisibleDate', () => {
    test(`верно срабатывает при view='classic`, (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 10, 1, 0, 0, 0),
          onChangeCurrentVisibleDate: handleClick,
          view: 'classic',
        });

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 9, 1, 0, 0, 0));

        fireEvent.click(getDateTimeTogglerButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(
          new Date(1970, 10, 1, 0, 0, 0),
        );

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));

    test(`верно срабатывает при view='book`, (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 10, 1, 0, 0, 0),
          onChangeCurrentVisibleDate: handleClick,
          view: 'book',
        });

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 9, 1, 0, 0, 0));

        fireEvent.click(getDateTimeTogglerButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(
          new Date(1970, 10, 1, 0, 0, 0),
        );

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));

    test(`верно срабатывает при view='slider'`, (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 10),
          onChangeCurrentVisibleDate: handleClick,
          view: 'slider',
        });

        fireEvent.click(getDateTimeSliderButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1969, 10));

        fireEvent.click(getDateTimeSliderButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 10));

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));
  });

  describe('проверка onChange', () => {
    dateTimePropView.forEach((view) => {
      test(`onChange отрабатывает при клике по дню месяца для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn((value) => new Date(value.value));
          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0, 3),
          });

          const DateTimeItem = getDateTimeItem(ctx, 3);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(1);

          const date = new Date(1970, 0, 1);
          expect(handleClick).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));
    });

    dateTimePropView.forEach((view) => {
      test(`onChange не отрабатывает при клике дню вне месяца для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0),
          });

          const DateTimeItem = getDateTimeItem(ctx, 0);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(0);
        }));
    });

    dateTimePropView.forEach((view) => {
      test(`onChange отрабатывает в допустимом интервале для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0),
            minDate: new Date(1970, 0, 2),
            maxDate: new Date(1970, 0, 3),
          });

          const DateTimeItem = getDateTimeItem(ctx, 5);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    dateTimePropView.forEach((view) => {
      test(`onChange не отрабатывает вне допустимого интервала для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0),
            minDate: new Date(1970, 0, 2),
            maxDate: new Date(1970, 0, 3),
          });

          const DateTimeItem = getDateTimeItem(ctx, 0);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(0);
        }));
    });
  });

  describe('проверка переключения месяца и года', () => {
    dateTimePropView.forEach((view) => {
      test(`проверка изменения месяца через DateTimeToggler-Button для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: new Date(1970, 0, 3),
            view,
          });

          expect(document.body).toHaveTextContent('январь 1970');

          if (view === 'slider') {
            expect(document.body).toHaveTextContent('февраль 1970');

            const nextButton = getDateTimeSliderButtonNext(ctx);
            fireEvent.click(nextButton);
            expect(document.body).toHaveTextContent('январь 1971');
            expect(document.body).toHaveTextContent('февраль 1971');

            const prevButton = getDateTimeSliderButtonPrev(ctx);
            fireEvent.click(prevButton);
            expect(document.body).toHaveTextContent('февраль 1970');
          } else {
            const nextButton = getDateTimeTogglerButtonNext(ctx);
            fireEvent.click(nextButton);
            expect(document.body).toHaveTextContent('февраль 1970');

            const prevButton = getDateTimeTogglerButtonPrev(ctx);
            fireEvent.click(prevButton);
          }

          expect(document.body).toHaveTextContent('январь 1970');
        }));
    });

    dateTimePropView.forEach((view) => {
      test(`проверка изменения месяца через DateTimeToggler-Label для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            view,
            value: new Date(1970, 0, 3),
          });

          expect(document.body).toHaveTextContent('январь 1970');

          if (view === 'slider') {
            const labelButton = getDateTimeViewBookLabels(ctx)[0] as Element;
            fireEvent.click(labelButton);
          } else {
            const labelButton = getDateTimeTogglerLabels(ctx)[0] as Element;
            fireEvent.click(labelButton);
          }

          const monthButton = getDateTimeItem(ctx, 1);
          fireEvent.click(monthButton);
          expect(document.body).toHaveTextContent('февраль 1970');
        }));
    });

    dateTimePropView.forEach((view) => {
      test(`проверка изменения года DateTimeToggler-Label для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            view,
            value: new Date(1970, 0, 3),
          });

          expect(document.body).toHaveTextContent('январь 1970');

          if (view === 'slider') {
            const labelButton = getDateTimeViewBookLabels(ctx)[0] as Element;
            fireEvent.click(labelButton);

            const newLabelButton = getDateTimeViewBookLabels(ctx)[0] as Element;
            fireEvent.click(newLabelButton);
            expect(document.body).toHaveTextContent('1970 - 1979');

            const yearButton = getDateTimeItem(ctx, 2);
            fireEvent.click(yearButton);
            expect(document.body).toHaveTextContent('1980-1990');
          } else {
            const labelButton = getDateTimeTogglerLabels(ctx)[0] as Element;
            fireEvent.click(labelButton);

            const newLabelButton = getDateTimeTogglerLabels(ctx)[0] as Element;
            fireEvent.click(newLabelButton);
            expect(document.body).toHaveTextContent('1970 - 1979');

            const yearButton = getDateTimeItem(ctx, 2);
            fireEvent.click(yearButton);
            expect(document.body).toHaveTextContent('1971');
          }
        }));
    });
  });

  describe('проверка locale', () => {
    dateTimePropView.forEach((view) => {
      test(`проверка применения locale="fa-IR" при view="${view}"`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            view,
            locale: faIR,
            currentVisibleDate: new Date(2022, 5),
          });

          const label = getDateTimeLabel(ctx);
          expect(label).toHaveTextContent('جون 2022');
        }));
    });
  });

  describe('проверка disableDates', () => {
    dateTimePropView.forEach((view) => {
      test(`корректно отключает даты при view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            currentVisibleDate: new Date(1970, 0),
            disableDates: [
              [new Date(1970, 0, 20), new Date(1970, 0, 23)],
              [new Date(1970, 1, 10), new Date(1970, 1, 13)],
            ],
            view,
          });

          expect(getDateTimeItem(ctx, 21)).not.toBeDisabled();
          expect(getDateTimeItem(ctx, 22)).toBeDisabled();
          expect(getDateTimeItem(ctx, 23)).toBeDisabled();
          expect(getDateTimeItem(ctx, 24)).toBeDisabled();
          expect(getDateTimeItem(ctx, 25)).not.toBeDisabled();

          if (view === 'slider' || view === 'book') {
            expect(getDateTimeItem(ctx, 56)).not.toBeDisabled();
            expect(getDateTimeItem(ctx, 57)).toBeDisabled();
            expect(getDateTimeItem(ctx, 58)).toBeDisabled();
            expect(getDateTimeItem(ctx, 59)).toBeDisabled();
            expect(getDateTimeItem(ctx, 60)).not.toBeDisabled();
          }
        }));
    });
  });
});
