import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
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
          <DateTime {...props} type="year" data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe('Компонент DateTime_type_year', () => {
  describe('проверка value', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`выбранная дата отображается верно для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: new Date(1970, 0, 1), view });
          const item = getDateTimeItem(ctx, 1);
          expect(item).toHaveClass('DateTimeItem_selected');
          expect(item).toHaveTextContent('1970');
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`выбранный диапазон отображается верно для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: [new Date(1970, 0, 1), new Date(1972, 0, 1)],
            view,
          });
          const item1 = getDateTimeItem(ctx, 1);
          const item2 = getDateTimeItem(ctx, 2);
          const item3 = getDateTimeItem(ctx, 3);

          const cell1 = getDateTimeCell(ctx, 1);
          const cell2 = getDateTimeCell(ctx, 2);
          const cell3 = getDateTimeCell(ctx, 3);

          expect(item1).toHaveClass('DateTimeItem_selected');
          expect(item1).toHaveTextContent('1970');
          expect(item2).not.toHaveClass('DateTimeItem_selected');
          expect(item2).toHaveTextContent('1971');
          expect(item3).toHaveClass('DateTimeItem_selected');
          expect(item3).toHaveTextContent('1972');

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

        expect(label).toHaveTextContent('1970 - 1979');
      }));

    test(`Дата отображается верная при view='book'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'book',
        });

        const labels = getDateTimeViewBookLabels(ctx);

        expect(labels[0]).toHaveTextContent('1970 - 1979');
        expect(labels[1]).toHaveTextContent('1980 - 1989');
      }));

    test(`Дата отображается верная при view='slider'`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          view: 'slider',
        });

        const sliderLabel = getDateTimeSliderLabel(ctx);
        const labels = getDateTimeViewSliderLabels(ctx);

        expect(sliderLabel).toHaveTextContent('1900-2000');
        expect(labels[0]).toHaveTextContent('1970 - 1979');
        expect(labels[1]).toHaveTextContent('1980 - 1989');
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
          type: 'year',
        });

        fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1960, 0));

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

        expect(handleClick).toHaveBeenCalledWith(new Date(1960, 0));

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

        expect(handleClick).toHaveBeenCalledWith(new Date(1870, 0));

        fireEvent.click(getDateTimeSliderButtonNext(ctx));

        expect(handleClick).toHaveBeenCalledWith(new Date(1970, 0));

        expect(handleClick).toHaveBeenCalledTimes(3);
      }));
  });

  describe('проверка onChange', () => {
    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChange отрабатывает при клике на год для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn((value) => new Date(value.value));
          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0),
          });

          const DateTimeItem = getDateTimeItem(ctx, 3);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(1);

          expect(handleClick).toHaveBeenCalledWith(new Date(1972, 0), {
            e: expect.any(Object),
          });
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChange отрабатывает в допустимом интервале для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0),
            minDate: new Date(1971, 3, 0),
            maxDate: new Date(1975, 5, 0),
          });

          const DateTimeItem = getDateTimeItem(ctx, 3);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`onChange не отрабатывает вне допустимого интервала для view=${view}`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onChange: handleClick,
            view,
            currentVisibleDate: new Date(1970, 0),
            minDate: new Date(1971, 3, 0),
            maxDate: new Date(1975, 5, 0),
          });

          const DateTimeItem = getDateTimeItem(ctx, 1);

          fireEvent.click(DateTimeItem);

          expect(handleClick).toHaveBeenCalledTimes(0);
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`проверка смены даты при изменении года через DateTimeToggler-Button_direction_next для view=${view}`, (ctx) =>
        context.start(async () => {
          const onChange = vi.fn((value) => new Date(value.value));
          renderComponent(ctx, {
            value: new Date(1970, 0),
            view,
            onChange,
          });

          if (view === 'slider') {
            const nextButton = getDateTimeSliderButtonNext(ctx);
            fireEvent.click(nextButton);
            // Note: We can't directly check text content like in the original test
            // but we can check that the onChange was called with the correct value

            const newCurrentValue = getDateTimeItem(ctx, 1);
            fireEvent.click(newCurrentValue);

            expect(onChange).toHaveBeenCalledWith(new Date(2070, 0), {
              e: expect.any(Object),
            });
          } else {
            // For classic and book views
            const nextButton = getDateTimeTogglerButtonNext(ctx);
            fireEvent.click(nextButton);

            const newCurrentValue = getDateTimeItem(ctx, 1);
            fireEvent.click(newCurrentValue);

            expect(onChange).toHaveBeenCalledWith(new Date(1980, 0), {
              e: expect.any(Object),
            });
          }
        }));
    });

    ['classic', 'book', 'slider'].forEach((view) => {
      test(`проверка смены даты при изменении года через DateTimeToggler-Button_direction_prev для view=${view}`, (ctx) =>
        context.start(async () => {
          const onChange = vi.fn((value) => new Date(value.value));
          renderComponent(ctx, {
            value: new Date(1970, 0),
            view,
            onChange,
          });

          if (view === 'slider') {
            const prevButton = getDateTimeSliderButtonPrev(ctx);
            fireEvent.click(prevButton);

            const newCurrentValue = getDateTimeItem(ctx, 1);
            fireEvent.click(newCurrentValue);

            expect(onChange).toHaveBeenCalledWith(new Date(1870, 0), {
              e: expect.any(Object),
            });
          } else {
            const prevButton = getDateTimeTogglerButtonPrev(ctx);
            fireEvent.click(prevButton);

            const newCurrentValue = getDateTimeItem(ctx, 1);
            fireEvent.click(newCurrentValue);
            expect(onChange).toHaveBeenCalledWith(new Date(1960, 0), {
              e: expect.any(Object),
            });
          }
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
              new Date(1971, 0),
              new Date(1980, 0),
              new Date(1981, 0),
            ],
            view,
          });

          expect(getDateTimeItem(ctx, 1)).toBeDisabled();
          expect(getDateTimeItem(ctx, 2)).toBeDisabled();

          if (view === 'slider' || view === 'book') {
            expect(getDateTimeItem(ctx, 12)).toBeDisabled();
            expect(getDateTimeItem(ctx, 13)).toBeDisabled();
          }
        }));
    });
  });
});
