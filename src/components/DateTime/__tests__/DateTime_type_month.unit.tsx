import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import { faIR } from 'date-fns/locale';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DateTime } from '../DateTime';
import {
  getDateTimeCell,
  getDateTimeItem,
  getDateTimeLabel,
  getDateTimeSliderButtonNext,
  getDateTimeSliderButtonPrev,
  getDateTimeSliderLabel,
  getDateTimeTogglerButtonNext,
  getDateTimeTogglerButtonPrev,
  getDateTimeViewBookLabels,
  getDateTimeViewSliderLabels,
  testId,
} from './helpers';

createRoot();
clearStack();

const renderComponent = (ctx: TestContext, props: any = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DateTime {...props} type="month" data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент DateTime_type_month', () => {
  describe('проверка value', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`выбранная дата отображается верно для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: new Date(1970, 0, 1), view });
          const item = getDateTimeItem(ctx);
          expect(item).toHaveClass('DateTimeItem_selected');
          expect(item).toHaveTextContent('янв');
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`выбранный диапазон отображается верно для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: [new Date(1970, 0, 1), new Date(1970, 2, 1)],
            view,
          });
          const item1 = getDateTimeItem(ctx, 0);
          const item2 = getDateTimeItem(ctx, 1);
          const item3 = getDateTimeItem(ctx, 2);

          const cell1 = getDateTimeCell(ctx, 0);
          const cell2 = getDateTimeCell(ctx, 1);
          const cell3 = getDateTimeCell(ctx, 2);

          expect(item1).toHaveClass('DateTimeItem_selected');
          expect(item1).toHaveTextContent('янв');
          expect(item2).not.toHaveClass('DateTimeItem_selected');
          expect(item2).toHaveTextContent('фев');
          expect(item3).toHaveClass('DateTimeItem_selected');
          expect(item3).toHaveTextContent('мар');

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

        expect(label).toHaveTextContent('1970');
      }));

    test(`Дата отображается верная при view='book'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'book',
        });

        const labels = getDateTimeViewBookLabels(ctx);

        expect(labels[0]).toHaveTextContent('1970');
        expect(labels[1]).toHaveTextContent('1971');
      }));

    test(`Дата отображается верная при view='slider'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'slider',
        });

        const sliderLabel = getDateTimeSliderLabel(ctx);
        const labels = getDateTimeViewSliderLabels(ctx);

        expect(sliderLabel).toHaveTextContent('1970-1980');
        expect(labels[0]).toHaveTextContent('1970');
        expect(labels[1]).toHaveTextContent('1971');
      }));
  });

  describe('проверка onChangeCurrentVisibleDate', () => {
    test(`верно срабатывает при view='classic`, (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          onChangeCurrentVisibleDate: handleClick,
          view: 'classic',
        });

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1969, 0));

        fireEvent.click(getDateTimeTogglerButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));

    test(`верно срабатывает при view='book`, (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          onChangeCurrentVisibleDate: handleClick,
          view: 'book',
        });

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1969, 0));

        fireEvent.click(getDateTimeTogglerButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));

    test(`верно срабатывает при view='slider'`, (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          onChangeCurrentVisibleDate: handleClick,
          view: 'slider',
        });

        fireEvent.click(getDateTimeSliderButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1960, 0));

        fireEvent.click(getDateTimeSliderButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));
  });

  describe('проверка onChange', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChange отрабатывает при клике на месяц при view="${view}"`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn(({ value }) => new Date(value));
          renderComponent(ctx, {
            onChange: handleClick,
            currentVisibleDate: new Date(1970, 0),
            view,
          });

          const DateTimeItem = getDateTimeItem(ctx, 3);
          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(1);

          const date = new Date(1970, 3);
          expect(handleClick).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChange отрабатывает в допустимом интервале при view="${view}"`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onChange: handleClick,
            currentVisibleDate: new Date(1970, 0),
            minDate: new Date(1970, 3, 0),
            maxDate: new Date(1970, 5, 0),
            view,
          });

          const DateTimeItem = getDateTimeItem(ctx, 3);
          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChange не отрабатывает вне допустимого интервала при view="${view}"`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onChange: handleClick,
            currentVisibleDate: new Date(1970, 0),
            minDate: new Date(1970, 3, 0),
            maxDate: new Date(1970, 5, 0),
            view,
          });

          const DateTimeItem = getDateTimeItem(ctx, 1);
          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(0);
        }));
    });
  });

  describe('проверка onChangeRange', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChangeRange отрабатывает при клике на месяц при view="${view}"`, (ctx) =>
        context.start(async () => {
          const onChangeRange = vi.fn((value, { e }) => {
            return [
              value[0] ? new Date(value[0]) : null,
              value[1] ? new Date(value[1]) : null,
            ];
          });
          renderComponent(ctx, {
            currentVisibleDate: new Date(1970, 0),
            view,
            onChangeRange,
          });

          const newCurrentValueStart = getDateTimeItem(ctx, 3);
          fireEvent.click(newCurrentValueStart);

          const newCurrentValueEnd = getDateTimeItem(ctx, 5);
          fireEvent.click(newCurrentValueEnd);

          expect(onChangeRange).toHaveBeenCalledTimes(2);

          const firstDate = [new Date(1970, 3), undefined];
          const secondDate = [new Date(1970, 5), undefined];
          expect(onChangeRange).toHaveBeenNthCalledWith(
            1,
            firstDate,
            expect.objectContaining({ e: expect.any(Object) }),
          );
          expect(onChangeRange).toHaveBeenNthCalledWith(
            2,
            secondDate,
            expect.objectContaining({ e: expect.any(Object) }),
          );
        }));
    });
  });

  describe('переключение календаря', () => {
    test('проверка смены года через DateTimeToggler-Button_direction_prev для view="classic"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: new Date(2000, 0),
          currentVisibleDate: new Date(2000, 0),
          view: 'classic',
        });

        const label = getDateTimeLabel(ctx);
        expect(label).toHaveTextContent('2000');

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(label).not.toHaveTextContent('2000');
        expect(label).toHaveTextContent('1999');
      }));

    test('проверка смены года через DateTimeToggler-Button_direction_next для view="classic"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: new Date(2001, 0),
          currentVisibleDate: new Date(2001, 0),
          view: 'classic',
        });

        const label = getDateTimeLabel(ctx);
        expect(label).toHaveTextContent('2001');

        fireEvent.click(getDateTimeTogglerButtonNext(ctx));

        expect(label).not.toHaveTextContent('2001');
        expect(label).toHaveTextContent('2002');
      }));

    test('проверка смены года через DateTimeToggler-Button_direction_prev для view="book"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: new Date(2000, 0),
          currentVisibleDate: new Date(2000, 0),
          view: 'book',
        });

        const labels = getDateTimeViewBookLabels(ctx);
        expect(labels[0]).toHaveTextContent('2000');
        expect(labels[1]).toHaveTextContent('2001');

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(labels[0]).not.toHaveTextContent('2001');
        expect(labels[0]).toHaveTextContent('1999');
        expect(labels[1]).toHaveTextContent('2000');
      }));

    test('проверка смены года через DateTimeToggler-Button_direction_next для view="book"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: new Date(2000, 0),
          currentVisibleDate: new Date(2000, 0),
          view: 'book',
        });

        const labels = getDateTimeViewBookLabels(ctx);
        expect(labels[0]).toHaveTextContent('2000');
        expect(labels[1]).toHaveTextContent('2001');

        fireEvent.click(getDateTimeTogglerButtonNext(ctx));

        expect(labels[0]).not.toHaveTextContent('2000');
        expect(labels[0]).toHaveTextContent('2001');
        expect(labels[1]).toHaveTextContent('2002');
      }));

    test('проверка смены года через DateTimeSlider-Button_direction_prev для view="slider"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: new Date(2000, 0),
          currentVisibleDate: new Date(2000, 0),
          view: 'slider',
        });

        const sliderLabel = getDateTimeSliderLabel(ctx);
        const labels = getDateTimeViewSliderLabels(ctx);

        expect(sliderLabel).toHaveTextContent('2000-2010');

        expect(labels[0]).toHaveTextContent('2000');
        expect(labels[1]).toHaveTextContent('2001');

        fireEvent.click(getDateTimeSliderButtonPrev(ctx));

        const updateSliderLabel = getDateTimeSliderLabel(ctx);

        expect(updateSliderLabel).not.toHaveTextContent('2000-2010');
        expect(updateSliderLabel).toHaveTextContent('1990-2000');

        expect(labels[0]).not.toHaveTextContent('2000');
        expect(labels[0]).toHaveTextContent('1990');
        expect(labels[1]).not.toHaveTextContent('2001');
        expect(labels[1]).toHaveTextContent('1991');
      }));

    test('проверка смены года через DateTimeSlider-Button_direction_next для view="slider"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: new Date(2000, 0),
          currentVisibleDate: new Date(2000, 0),
          view: 'slider',
        });

        const sliderLabel = getDateTimeSliderLabel(ctx);
        const labels = getDateTimeViewSliderLabels(ctx);

        expect(sliderLabel).toHaveTextContent('2000-2010');

        expect(labels[0]).toHaveTextContent('2000');
        expect(labels[1]).toHaveTextContent('2001');

        fireEvent.click(getDateTimeSliderButtonNext(ctx));

        const updateSliderLabel = getDateTimeSliderLabel(ctx);

        expect(updateSliderLabel).not.toHaveTextContent('2000-2010');
        expect(updateSliderLabel).toHaveTextContent('2010-2020');

        expect(labels[0]).not.toHaveTextContent('2000');
        expect(labels[0]).toHaveTextContent('2010');
        expect(labels[1]).not.toHaveTextContent('2001');
        expect(labels[1]).toHaveTextContent('2011');
      }));
  });

  describe('проверка locale', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`проверка применения locale="fa-IR" при view="${view}"`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            locale: faIR,
            currentVisibleDate: new Date(2022, 5),
            view,
          });

          const month = getDateTimeItem(ctx, 0);
          /* cspell:disable-next-line */
          expect(month).toHaveTextContent('ژانـ');
        }));
    });
  });

  describe('проверка disableDates', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`корректно отключает даты при view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            currentVisibleDate: new Date(1970, 0),
            disableDates: [
              new Date(1970, 0),
              new Date(1970, 1),
              new Date(1971, 0),
              new Date(1971, 1),
            ],
            view,
          });

          expect(getDateTimeItem(ctx, 0)).toBeDisabled();
          expect(getDateTimeItem(ctx, 1)).toBeDisabled();

          if (view === 'slider' || view === 'book') {
            expect(getDateTimeItem(ctx, 12)).toBeDisabled();
            expect(getDateTimeItem(ctx, 13)).toBeDisabled();
          }
        }));
    });
  });
});
