import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import { faIR } from 'date-fns/locale';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DateTime } from '../DateTime';
import {
  getColumnAllItem,
  getDateTimeColumnItem,
  getDateTimeItem,
  getDateTimeItemByText,
  getDateTimeLabel,
  getDateTimeTogglerButtonNext,
  getDateTimeTogglerButtonPrev,
  getDayItem,
  getDayItemsSelected,
  getTimeItem,
  getTimeItemsSelected,
  multiplicity,
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
          <DateTime {...props} type="date-time" data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент DateTime_type_dateTime', () => {
  describe.concurrent('проверка value', () => {
    test(`выбранная дата отображается верно`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { value: new Date(1970, 0, 1, 10, 15, 20) });
        const timeItems = getTimeItemsSelected(ctx);
        const dayItems = getDayItemsSelected(ctx);
        expect(timeItems[0]).toHaveTextContent('10');
        expect(timeItems[1]).toHaveTextContent('15');
        expect(timeItems[2]).toHaveTextContent('20');
        expect(dayItems[0]).toHaveTextContent('1');
      }));
  });

  describe.concurrent('проверка onChange', () => {
    test(`onChange отрабатывает`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn(({ value }) => new Date(value));

        renderComponent(ctx, {
          onChange,
          currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
        });

        const timeItem = getTimeItem(ctx, 3);
        const dayItem = getDayItem(ctx, 11);

        fireEvent.click(timeItem);
        fireEvent.click(dayItem);

        expect(onChange).toHaveBeenCalledTimes(2);

        const date = new Date(1970, 0, 9);
        expect(onChange).toHaveBeenLastCalledWith(date, {
          e: expect.any(Object),
        });
      }));

    test(`onChange отрабатывает в допустимом интервале`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();

        renderComponent(ctx, {
          onChange,
          minDate: new Date(1970, 0, 1, 9, 15, 20),
          maxDate: new Date(1970, 0, 1, 11, 15, 20),
          currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
        });

        fireEvent.click(getDayItem(ctx, 3));

        expect(onChange).toHaveBeenCalledTimes(1);
      }));

    test(`onChange не отрабатывает вне допустимого интервала`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();

        renderComponent(ctx, {
          onChange,
          minDate: new Date(1970, 0, 1, 9, 15, 20),
          maxDate: new Date(1970, 0, 1, 11, 15, 20),
          currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
        });

        fireEvent.click(getDayItem(ctx, 7));

        expect(onChange).toHaveBeenCalledTimes(0);
      }));

    test(`onChange проверка изменения часа`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn(({ value }) => new Date(value));
        renderComponent(ctx, {
          value: new Date(2022, 5, 27, 11),
          currentVisibleDate: new Date(2022, 5),
          onChange,
        });

        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems[0]).toHaveTextContent('11');

        const dateHoursItem = getDateTimeColumnItem(ctx, 0, 10);
        fireEvent.click(dateHoursItem);

        expect(onChange).toHaveBeenCalledTimes(1);

        const date = new Date(2022, 5, 27, 10);
        expect(onChange).toHaveBeenCalledWith(date, {
          e: expect.any(Object),
        });
      }));

    test(`onChange проверка изменения минут`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn(({ value }) => new Date(value));
        renderComponent(ctx, {
          value: new Date(2022, 5, 27, 11, 10),
          currentVisibleDate: new Date(2022, 5),
          onChange,
        });

        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems[1]).toHaveTextContent('10');

        const dateMinutesItem = getDateTimeColumnItem(ctx, 1, 15);
        fireEvent.click(dateMinutesItem);

        expect(onChange).toHaveBeenCalledTimes(1);

        const date = new Date(2022, 5, 27, 11, 15);
        expect(onChange).toHaveBeenCalledWith(date, {
          e: expect.any(Object),
        });
      }));

    test(`onChange проверка изменения секунд`, (ctx) =>
      context.start(async () => {
        const onChange = vi.fn(({ value }) => new Date(value));
        renderComponent(ctx, {
          value: new Date(2022, 5, 27, 11, 10, 20),
          currentVisibleDate: new Date(2022, 5),
          onChange,
        });

        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems[2]).toHaveTextContent('20');

        const dateSecondsItem = getDateTimeColumnItem(ctx, 2, 35);
        fireEvent.click(dateSecondsItem);

        expect(onChange).toHaveBeenCalledTimes(1);

        const date = new Date(2022, 5, 27, 11, 10, 35);
        expect(onChange).toHaveBeenCalledWith(date, {
          e: expect.any(Object),
        });
      }));
  });

  describe.concurrent(
    'проверка кнопок DateTimeToggler-Button_direction_next/prev',
    () => {
      test('проверка смены месяца и года через DateTimeToggler-Button_direction_next', (ctx) =>
        context.start(async () => {
          const onChange = vi.fn(({ value }) => new Date(value));
          renderComponent(ctx, {
            value: new Date(2022, 4, 27, 11, 10, 20),
            view: 'classic',
            currentVisibleDate: new Date(2022, 4),
            onChange,
          });

          const label = getDateTimeLabel(ctx);
          expect(label).toHaveTextContent('май 2022');

          fireEvent.click(getDateTimeTogglerButtonNext(ctx));

          expect(label).not.toHaveTextContent('май 2022');
          expect(label).toHaveTextContent('июнь 2022');
        }));

      test('проверка смены месяца и года через DateTimeToggler-Button_direction_prev', (ctx) =>
        context.start(async () => {
          const onChange = vi.fn(({ value }) => new Date(value));
          renderComponent(ctx, {
            value: new Date(2022, 4, 27, 11, 10, 25),
            view: 'classic',
            currentVisibleDate: new Date(2022, 4),
            onChange,
          });

          fireEvent.click(getDateTimeTogglerButtonPrev(ctx));

          const timeItems = getTimeItemsSelected(ctx);
          expect(timeItems[2]).toHaveTextContent('25');

          const dateSecondsItem = getDateTimeColumnItem(ctx, 2, 35);
          fireEvent.click(dateSecondsItem);

          expect(onChange).toHaveBeenCalledTimes(1);

          const date = new Date(2022, 4, 27, 11, 10, 35);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));
    },
  );

  describe.concurrent('проверка timeOptions для hours/minutes/seconds', () => {
    const onChange = vi.fn(({ value }) => new Date(value));
    const baseVisibleDate = new Date(2022, 5);
    const baseDate = {
      hours: new Date(2022, 5, 27, 11),
      minutes: new Date(2022, 5, 27, 11, 34),
      seconds: new Date(2022, 5, 27, 11, 34, 56),
    };

    describe.concurrent('проверка step (sequence from 0)', () => {
      const steps = [0, 1, 2, 5, 10];

      steps.forEach((step) => {
        test(`проверка timeOptions.hours.step = ${step} и возможности менять часы`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.hours,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { hours: { step } },
            });
            if (step === 0) {
              const timeItems = getTimeItemsSelected(ctx);
              expect(timeItems).toHaveLength(2);
            } else {
              const hoursColumn = getColumnAllItem(ctx, 0).length;
              expect(hoursColumn).toEqual(Math.ceil(24 / step));
              const currentHour = getColumnAllItem(ctx, 0)[1];
              fireEvent.click(currentHour);
              const date = new Date(2022, 5, 27, step);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }
          }));
      });

      steps.forEach((step) => {
        test(`проверка timeOptions.minutes.step = ${step} и возможности менять минуты`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.minutes,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { minutes: { step } },
            });
            if (step === 0) {
              const timeItems = getTimeItemsSelected(ctx);
              expect(timeItems).toHaveLength(2);
            } else {
              const minutesColumn = getColumnAllItem(ctx, 1).length;
              expect(minutesColumn).toEqual(Math.ceil(60 / step));
              const currentMinutes = getColumnAllItem(ctx, 1)[1];
              fireEvent.click(currentMinutes);
              const date = new Date(2022, 5, 27, 11, step);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }
          }));
      });

      steps.forEach((step) => {
        test(`проверка timeOptions.seconds.step = ${step} и возможности менять секунды`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.seconds,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { seconds: { step } },
            });
            if (step === 0) {
              const timeItems = getTimeItemsSelected(ctx);
              expect(timeItems).toHaveLength(2);
            } else {
              const secondsColumn = getColumnAllItem(ctx, 2).length;
              expect(secondsColumn).toEqual(Math.ceil(60 / step));
              const currentSeconds = getColumnAllItem(ctx, 2)[1];
              fireEvent.click(currentSeconds);
              const date = new Date(2022, 5, 27, 11, 34, step);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }
          }));
      });
    });

    describe.concurrent('проверка start', () => {
      const startValues1 = [-10, 0, 5, 10, 30];
      const startValues2 = [-10, 0, 5, 10, 30, 59, 60];

      startValues1.forEach((start) => {
        test(`проверка timeOptions.hours.start = ${start} (full stop=23, step=1)`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.hours,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { hours: { start } },
            });
            const hoursColumn = getColumnAllItem(ctx, 0);
            const clampedStart = Math.max(0, Math.min(23, start));
            expect(hoursColumn.length).toEqual(24 - clampedStart);
            const firstHour = getColumnAllItem(ctx, 0)[0];
            fireEvent.click(firstHour);
            const date = new Date(2022, 5, 27, clampedStart);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }));
      });

      startValues2.forEach((start) => {
        test(`проверка timeOptions.minutes.start = ${start} (full stop=59, step=1)`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.minutes,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { minutes: { start } },
            });
            const minutesColumn = getColumnAllItem(ctx, 1);
            const clampedStart = Math.max(0, Math.min(59, start));
            expect(minutesColumn.length).toEqual(60 - clampedStart);
            const firstMinutes = getColumnAllItem(ctx, 1)[0];
            fireEvent.click(firstMinutes);
            const date = new Date(2022, 5, 27, 11, clampedStart);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }));
      });

      startValues2.forEach((start) => {
        test(`проверка timeOptions.seconds.start = ${start} (full stop=59, step=1)`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.seconds,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { seconds: { start } },
            });
            const secondsColumn = getColumnAllItem(ctx, 2);
            const clampedStart = Math.max(0, Math.min(59, start));
            expect(secondsColumn.length).toEqual(60 - clampedStart);
            const firstSeconds = getColumnAllItem(ctx, 2)[0];
            fireEvent.click(firstSeconds);
            const date = new Date(2022, 5, 27, 11, 34, clampedStart);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }));
      });
    });

    describe.concurrent(
      'проверка timeOptions.stop (stop to N, start=0, step=1)',
      () => {
        const stopValues1 = [-5, 5, 10, 20, 30];
        const stopValues2 = [-10, 10, 20, 50, 70];

        stopValues1.forEach((stop) => {
          test(`проверка timeOptions.hours.stop = ${stop} (start=0, step=1)`, (ctx) =>
            context.start(async () => {
              renderComponent(ctx, {
                value: baseDate.hours,
                currentVisibleDate: baseVisibleDate,
                onChange,
                timeOptions: { hours: { stop } },
              });
              const hoursColumn = getColumnAllItem(ctx, 0);
              const clampedStop = Math.max(0, Math.min(23, stop));
              expect(hoursColumn.length).toEqual(clampedStop + 1);
              const lastHour = getColumnAllItem(ctx, 0)[clampedStop];
              fireEvent.click(lastHour);
              const date = new Date(2022, 5, 27, clampedStop);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }));
        });

        stopValues2.forEach((stop) => {
          test(`проверка timeOptions.minutes.stop = ${stop} (start=0, step=1)`, (ctx) =>
            context.start(async () => {
              renderComponent(ctx, {
                value: baseDate.minutes,
                currentVisibleDate: baseVisibleDate,
                onChange,
                timeOptions: { minutes: { stop } },
              });
              const minutesColumn = getColumnAllItem(ctx, 1);
              const clampedStop = Math.max(0, Math.min(59, stop));
              expect(minutesColumn.length).toEqual(clampedStop + 1);
              const lastMinutes = getColumnAllItem(ctx, 1)[clampedStop];
              fireEvent.click(lastMinutes);
              const date = new Date(2022, 5, 27, 11, clampedStop);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }));
        });

        stopValues2.forEach((stop) => {
          test(`проверка timeOptions.seconds.stop = ${stop} (start=0, step=1)`, (ctx) =>
            context.start(async () => {
              renderComponent(ctx, {
                value: baseDate.seconds,
                currentVisibleDate: baseVisibleDate,
                onChange,
                timeOptions: { seconds: { stop } },
              });
              const secondsColumn = getColumnAllItem(ctx, 2);
              const clampedStop = Math.max(0, Math.min(59, stop));
              expect(secondsColumn.length).toEqual(clampedStop + 1);
              const lastSeconds = getColumnAllItem(ctx, 2)[clampedStop];
              fireEvent.click(lastSeconds);
              const date = new Date(2022, 5, 27, 11, 34, clampedStop);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }));
        });
      },
    );

    describe.concurrent('проверка start/stop/step комбинации', () => {
      test(`проверка timeOptions.hours.step=5, start=5, stop=15 (combination, no swap)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.hours,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { hours: { step: 5, start: 5, stop: 15 } },
          });
          const hoursColumn = getColumnAllItem(ctx, 0).length;
          expect(hoursColumn).toEqual(3);
          const firstHour = getColumnAllItem(ctx, 0)[0];
          fireEvent.click(firstHour);
          const date = new Date(2022, 5, 27, 5);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.hours.step=3, start=20, stop=10 (swap to 10-20)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.hours,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { hours: { step: 3, start: 20, stop: 10 } },
          });
          const hoursColumn = getColumnAllItem(ctx, 0).length;
          expect(hoursColumn).toEqual(4);
          const firstHour = getColumnAllItem(ctx, 0)[0];
          fireEvent.click(firstHour);
          const date = new Date(2022, 5, 27, 10);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.hours.step=2, start=0, stop=30 (clamp stop=23)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.hours,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { hours: { step: 2, start: 0, stop: 30 } },
          });
          const hoursColumn = getColumnAllItem(ctx, 0).length;
          expect(hoursColumn).toEqual(12);
          const firstHour = getColumnAllItem(ctx, 0)[0];
          fireEvent.click(firstHour);
          const date = new Date(2022, 5, 27, 0);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.minutes.step=10, start=10, stop=50 (combination)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.minutes,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { minutes: { step: 10, start: 10, stop: 50 } },
          });
          const minutesColumn = getColumnAllItem(ctx, 1).length;
          expect(minutesColumn).toEqual(5);
          const firstMinutes = getColumnAllItem(ctx, 1)[0];
          fireEvent.click(firstMinutes);
          const date = new Date(2022, 5, 27, 11, 10);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.minutes.step=5, start=50, stop=20 (swap to 20-50)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.minutes,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { minutes: { step: 5, start: 50, stop: 20 } },
          });
          const minutesColumn = getColumnAllItem(ctx, 1).length;
          expect(minutesColumn).toEqual(7);
          const firstMinutes = getColumnAllItem(ctx, 1)[0];
          fireEvent.click(firstMinutes);
          const date = new Date(2022, 5, 27, 11, 20);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.minutes.step=10, start=-5, stop=70 (clamp start=0, stop=59)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.minutes,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { minutes: { step: 10, start: -5, stop: 70 } },
          });
          const minutesColumn = getColumnAllItem(ctx, 1).length;
          expect(minutesColumn).toEqual(6);
          const firstMinutes = getColumnAllItem(ctx, 1)[0];
          fireEvent.click(firstMinutes);
          const date = new Date(2022, 5, 27, 11, 0);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.seconds.step=15, start=15, stop=45 (combination)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.seconds,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { seconds: { step: 15, start: 15, stop: 45 } },
          });
          const secondsColumn = getColumnAllItem(ctx, 2).length;
          expect(secondsColumn).toEqual(3);
          const firstSeconds = getColumnAllItem(ctx, 2)[0];
          fireEvent.click(firstSeconds);
          const date = new Date(2022, 5, 27, 11, 34, 15);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.seconds.step=10, start=50, stop=20 (swap to 20-50)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.seconds,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { seconds: { step: 10, start: 50, stop: 20 } },
          });
          const secondsColumn = getColumnAllItem(ctx, 2).length;
          expect(secondsColumn).toEqual(4);
          const firstSeconds = getColumnAllItem(ctx, 2)[0];
          fireEvent.click(firstSeconds);
          const date = new Date(2022, 5, 27, 11, 34, 20);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));

      test(`проверка timeOptions.seconds.step=20, start=-10, stop=80 (clamp start=0, stop=59)`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            value: baseDate.seconds,
            currentVisibleDate: baseVisibleDate,
            onChange,
            timeOptions: { seconds: { step: 20, start: -10, stop: 80 } },
          });
          const secondsColumn = getColumnAllItem(ctx, 2).length;
          expect(secondsColumn).toEqual(3);
          const firstSeconds = getColumnAllItem(ctx, 2)[0];
          fireEvent.click(firstSeconds);
          const date = new Date(2022, 5, 27, 11, 34, 0);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }));
    });

    describe.concurrent(
      'проверка custom timeOptions (кастомный список значений)',
      () => {
        test('корректный custom список для hours', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.hours,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { hours: [0, 1, 5, 10, 15, 23] },
            });
            const hoursColumn = getColumnAllItem(ctx, 0);
            expect(hoursColumn).toHaveLength(6);
            expect(hoursColumn[0]).toHaveTextContent('00');
            expect(hoursColumn[5]).toHaveTextContent('23');
            fireEvent.click(hoursColumn[3]);
            const date = new Date(2022, 5, 27, 10);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }));

        test('повторы и числа вне диапазона для hours — фильтруются', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.hours,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { hours: [-5, 0, 0, 1, 10, 25, 40, 40] },
            });
            const hoursColumn = getColumnAllItem(ctx, 0);
            expect(hoursColumn).toHaveLength(3);
            const labels = Array.from(hoursColumn).map((el) => el.textContent);
            expect(labels).toEqual(['00', '01', '10']);
          }));

        test('пустой custom массив для hours — колонка пустая', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.hours,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { hours: [] },
            });
            const timeItems = getTimeItemsSelected(ctx);
            expect(timeItems).toHaveLength(2);
          }));

        test('корректный custom список для minutes', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.minutes,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { minutes: [0, 5, 15, 30, 45] },
            });
            const minutesColumn = getColumnAllItem(ctx, 1);
            expect(minutesColumn).toHaveLength(5);
            expect(minutesColumn[0]).toHaveTextContent('00');
            expect(minutesColumn[4]).toHaveTextContent('45');
            fireEvent.click(minutesColumn[1]);
            const date = new Date(2022, 5, 27, 11, 5);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }));

        test('повторы и вне диапазона minutes', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.minutes,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { minutes: [-1, 0, 0, 30, 59, 60, 120, 60] },
            });
            const minutesColumn = getColumnAllItem(ctx, 1);
            expect(minutesColumn).toHaveLength(3);
            const labels = Array.from(minutesColumn).map(
              (el) => el.textContent,
            );
            expect(labels).toEqual(['00', '30', '59']);
          }));

        test('пустой custom для minutes — колонка пустая', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.minutes,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { minutes: [] },
            });
            const timeItems = getTimeItemsSelected(ctx);
            expect(timeItems).toHaveLength(2);
          }));

        test('корректный custom список для seconds', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.seconds,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { seconds: [0, 10, 23, 33, 40, 50] },
            });
            const secondsColumn = getColumnAllItem(ctx, 2);
            expect(secondsColumn).toHaveLength(6);
            expect(secondsColumn[0]).toHaveTextContent('00');
            expect(secondsColumn[5]).toHaveTextContent('50');
            fireEvent.click(secondsColumn[2]);
            const date = new Date(2022, 5, 27, 11, 34, 23);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }));

        test('повторы и вне диапазона seconds', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.seconds,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { seconds: [-10, -10, 0, 0, 59, 59, 60, 100] },
            });
            const secondsColumn = getColumnAllItem(ctx, 2);
            expect(secondsColumn).toHaveLength(2);
            const labels = Array.from(secondsColumn).map(
              (el) => el.textContent,
            );
            expect(labels).toEqual(['00', '59']);
          }));

        test('пустой custom для seconds — колонка пустая', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.seconds,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { seconds: [] },
            });
            const timeItems = getTimeItemsSelected(ctx);
            expect(timeItems).toHaveLength(2);
          }));

        test('undefined custom — fallback на стандартный диапазон', (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              value: baseDate.seconds,
              currentVisibleDate: baseVisibleDate,
              onChange,
              timeOptions: { seconds: {} },
            });
            const secondsColumn = getColumnAllItem(ctx, 2);
            expect(secondsColumn).toHaveLength(60);
          }));
      },
    );
  });

  describe.concurrent('совместимость timeOptions и multiplicity', () => {
    const onChange = vi.fn(({ value }) => new Date(value));
    const baseVisibleDate = new Date(2022, 5);
    const baseDate = {
      hours: new Date(2022, 5, 27, 11),
      minutes: new Date(2022, 5, 27, 11, 34),
      seconds: new Date(2022, 5, 27, 11, 34, 56),
    };
    test('timeOptions.step имеет приоритет над multiplicity', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: baseDate.hours,
          currentVisibleDate: baseVisibleDate,
          multiplicityHours: 5,
          timeOptions: { hours: { step: 2 } },
          onChange,
        });

        const hoursColumn = getColumnAllItem(ctx, 0);
        expect(hoursColumn.length).toEqual(Math.ceil(24 / 2));

        const firstHour = hoursColumn[0];
        fireEvent.click(firstHour);
        const date = new Date(2022, 5, 27, 0);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      }));

    test('timeOptions.unit как массив имеет приоритет над multiplicity', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          value: baseDate.hours,
          currentVisibleDate: baseVisibleDate,
          onChange,
          timeOptions: { hours: [0, 6, 12, 18] },
          multiplicityHours: 3,
        });

        const hoursColumn = getColumnAllItem(ctx, 0);
        expect(hoursColumn).toHaveLength(4);
        expect(hoursColumn[0]).toHaveTextContent('00');
        expect(hoursColumn[3]).toHaveTextContent('18');
      }));

    test('частичное указание timeOptions использует multiplicity для остальных', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn(({ value }) => new Date(value));
        renderComponent(ctx, {
          value: new Date(2022, 5, 27, 11, 30, 45),
          currentVisibleDate: new Date(2022, 5),
          multiplicityHours: 4,
          multiplicitySeconds: 20,
          timeOptions: { minutes: { step: 15 } },
          onChange,
        });

        const hoursColumn = getColumnAllItem(ctx, 0);
        expect(hoursColumn.length).toEqual(Math.ceil(24 / 4));

        const minutesColumn = getColumnAllItem(ctx, 1);
        expect(minutesColumn.length).toEqual(Math.ceil(60 / 15));

        const secondsColumn = getColumnAllItem(ctx, 2);
        expect(secondsColumn.length).toEqual(Math.ceil(60 / 20));
      }));
  });

  // TODO после того как поправится баг с multiplicity проверить тест со значениями начиная от 5
  //  (начиная со значения 5 для multiplicityHours ожидается (0, 5, 10, 15, 20),
  //  а для multiplicityMinutes и multiplicitySeconds начиная со значения 7 ожидается (0, 7, 14, 21, 28, 35, 42, 49, 56),
  //  но последних значений нет)
  describe.concurrent(
    'проверка multiplicityHours, multiplicityMinutes и multiplicitySeconds',
    () => {
      multiplicity.forEach((multiplicityHours) => {
        test(`проверка multiplicityHours = ${multiplicityHours} и возможности менять часы`, (ctx) =>
          context.start(async () => {
            const onChange = vi.fn(({ value }) => new Date(value));
            renderComponent(ctx, {
              value: new Date(2022, 5, 27, 11),
              currentVisibleDate: new Date(2022, 5),
              onChange,
              multiplicityHours,
            });

            if (multiplicityHours === 0) {
              const timeItems = getTimeItemsSelected(ctx);
              expect(timeItems[0]).not.toHaveTextContent('11');
              expect(timeItems[1]).not.toHaveTextContent('11');
              expect(timeItems).toHaveLength(2);
            } else {
              const hoursColumn = getColumnAllItem(ctx, 0).length;
              expect(hoursColumn).toEqual(Math.ceil(24 / multiplicityHours));

              const currentHour = getColumnAllItem(ctx, 0)[1];
              fireEvent.click(currentHour);

              const date = new Date(2022, 5, 27, multiplicityHours);
              expect(onChange).toHaveBeenCalledWith(date, {
                e: expect.any(Object),
              });
            }
          }));

        multiplicity.forEach((multiplicityMinutes) => {
          test(`проверка multiplicityMinutes = ${multiplicityMinutes} и возможности менять минуты`, (ctx) =>
            context.start(async () => {
              const onChange = vi.fn(({ value }) => new Date(value));
              renderComponent(ctx, {
                value: new Date(2022, 5, 27, 11, 34),
                currentVisibleDate: new Date(2022, 5),
                onChange,
                multiplicityMinutes,
              });

              if (multiplicityMinutes === 0) {
                const timeItems = getTimeItemsSelected(ctx);
                expect(timeItems[0]).not.toHaveTextContent('34');
                expect(timeItems[1]).not.toHaveTextContent('34');
                expect(timeItems).toHaveLength(2);
              } else {
                const minutesColumn = getColumnAllItem(ctx, 1).length;
                expect(minutesColumn).toEqual(
                  Math.ceil(60 / multiplicityMinutes),
                );

                const currentMinutes = getColumnAllItem(ctx, 1)[1];
                fireEvent.click(currentMinutes);
                const date = new Date(2022, 5, 27, 11, multiplicityMinutes);

                expect(onChange).toHaveBeenCalledWith(date, {
                  e: expect.any(Object),
                });
              }
            }));
        });

        multiplicity.forEach((multiplicitySeconds) => {
          test(`проверка multiplicitySeconds = ${multiplicitySeconds} и возможности менять секунды`, (ctx) =>
            context.start(async () => {
              const onChange = vi.fn(({ value }) => new Date(value));
              renderComponent(ctx, {
                value: new Date(2022, 5, 27, 11, 34, 56),
                currentVisibleDate: new Date(2022, 5),
                onChange,
                multiplicitySeconds,
              });

              if (multiplicitySeconds === 0) {
                const timeItems = getTimeItemsSelected(ctx);
                expect(timeItems[0]).not.toHaveTextContent('56');
                expect(timeItems[1]).not.toHaveTextContent('56');
                expect(timeItems).toHaveLength(2);
              } else {
                const secondsColumn = getColumnAllItem(ctx, 2).length;
                expect(secondsColumn).toEqual(
                  Math.ceil(60 / multiplicitySeconds),
                );

                const currentSeconds = getColumnAllItem(ctx, 2)[1];
                fireEvent.click(currentSeconds);

                const date = new Date(2022, 5, 27, 11, 34, multiplicitySeconds);
                expect(onChange).toHaveBeenCalledWith(date, {
                  e: expect.any(Object),
                });
              }
            }));
        });
      });
    },
  );

  describe.concurrent('проверка locale', () => {
    test(`проверка применения locale="fa-IR"`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          locale: faIR,
          currentVisibleDate: new Date(2022, 5),
        });

        const label = getDateTimeLabel(ctx);
        expect(label).toHaveTextContent('جون 2022');
      }));
  });

  describe.concurrent('проверка disableDates', () => {
    test(`корректно отключает даты при view=classic`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          currentVisibleDate: new Date(1970, 0),
          disableDates: [
            [new Date(1970, 0, 20), new Date(1970, 0, 23)],
            [new Date(1970, 1, 10), new Date(1970, 1, 13)],
          ],
          view: 'classic',
        });

        expect(getDateTimeItem(ctx, 21)).not.toBeDisabled();
        expect(getDateTimeItem(ctx, 22)).toBeDisabled();
        expect(getDateTimeItem(ctx, 23)).toBeDisabled();
        expect(getDateTimeItem(ctx, 24)).toBeDisabled();
        expect(getDateTimeItem(ctx, 25)).not.toBeDisabled();
      }));
  });

  describe.concurrent('проверка работы с dateChange', () => {
    const onChange = vi.fn(({ value }) => new Date(value));
    const baseVisibleDate = new Date(1970, 0, 1);

    test('смена даты сбрасывает время на первое валидное', (ctx) =>
      context.start(async () => {
        const baseValue = new Date(1970, 0, 21, 14, 30, 45);
        renderComponent(ctx, {
          value: baseValue,
          onChange,
          currentVisibleDate: baseVisibleDate,
        });
        const targetDay = getDateTimeItemByText(ctx, '15');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChange).toHaveBeenCalled();
        const newDate = onChange.mock.calls[0][0];
        expect(newDate.getDate()).toBe(15);
        expect(newDate.getHours()).toBe(0);
        expect(newDate.getMinutes()).toBe(0);
        expect(newDate.getSeconds()).toBe(0);
      }));

    test('смена даты с timeOptions: время = первое в шаге ( minutes step=30)', (ctx) =>
      context.start(async () => {
        const baseValue = new Date(1970, 0, 21, 14, 25, 45);
        const timeOptions = { minutes: { step: 30 } };
        renderComponent(ctx, {
          value: baseValue,
          onChange,
          timeOptions,
          currentVisibleDate: baseVisibleDate,
        });
        const targetDay = getDateTimeItemByText(ctx, '15');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChange).toHaveBeenCalled();
        const newDate = onChange.mock.calls[0][0];
        expect(newDate.getDate()).toBe(15);
        expect(newDate.getHours()).toBe(0);
        expect(newDate.getMinutes()).toBe(0);
        expect(newDate.getSeconds()).toBe(0);
      }));

    test('смена даты с no valid times: fallback на 00:00:00', (ctx) =>
      context.start(async () => {
        const minDate = new Date(1970, 0, 21, 23, 50, 0);
        const timeOptions = {
          hours: { step: 1 },
          minutes: { step: 5 },
          seconds: { step: 10 },
        };
        const baseValue = new Date(1970, 0, 21, 12, 0, 0);
        renderComponent(ctx, {
          value: baseValue,
          onChange,
          minDate,
          timeOptions,
          currentVisibleDate: baseVisibleDate,
        });
        const targetDay = getDateTimeItemByText(ctx, '15');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChange).toHaveBeenCalled();
        const newDate = onChange.mock.calls[0][0];
        expect(newDate.getDate()).toBe(15);
        expect(newDate.getHours()).toBe(0);
        expect(newDate.getMinutes()).toBe(0);
        expect(newDate.getSeconds()).toBe(0);
      }));
  });

  describe.concurrent('проверка работы с range значениями', () => {
    test('корректно обрабатывает range value и показывает selected состояния timeFor=start', (ctx) =>
      context.start(async () => {
        const onChangeRange = vi.fn();
        const rangeValue: [Date, Date] = [
          new Date(1970, 0, 1, 10, 30, 45),
          new Date(1970, 0, 2, 15, 20, 10),
        ];

        renderComponent(ctx, {
          value: rangeValue,
          onChangeRange,
          timeFor: 'start',
        });

        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems).toHaveLength(3);
        expect(timeItems[0]).toHaveTextContent('10');
        expect(timeItems[1]).toHaveTextContent('30');
        expect(timeItems[2]).toHaveTextContent('45');
      }));

    test('корректно обрабатывает range value и показывает selected состояния timeFor=end', (ctx) =>
      context.start(async () => {
        const onChangeRange = vi.fn();
        const rangeValue: [Date, Date] = [
          new Date(1970, 0, 1, 10, 30, 45),
          new Date(1970, 0, 2, 15, 20, 10),
        ];

        renderComponent(ctx, {
          value: rangeValue,
          onChangeRange,
          timeFor: 'end',
        });

        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems).toHaveLength(3);
        expect(timeItems[0]).toHaveTextContent('15');
        expect(timeItems[1]).toHaveTextContent('20');
        expect(timeItems[2]).toHaveTextContent('10');
      }));

    test('корректно применяет время и дату при изменении даты со временем в range для timeFor=start', (ctx) =>
      context.start(async () => {
        const onChangeRange = vi.fn();
        const rangeValue: [Date, Date] = [
          new Date(1970, 0, 5, 10, 30, 0),
          new Date(1970, 0, 7, 15, 45, 0),
        ];
        renderComponent(ctx, {
          value: rangeValue,
          onChangeRange,
          timeFor: 'start',
          currentVisibleDate: new Date(1970, 0, 1),
        });
        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems).toHaveLength(3);
        expect(timeItems[0]).toHaveTextContent('10');
        expect(timeItems[1]).toHaveTextContent('30');
        expect(timeItems[2]).toHaveTextContent('00');

        const targetDay = getDateTimeItemByText(ctx, '2');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChangeRange).toHaveBeenCalled();
        const newRange = onChangeRange.mock.calls[0][0] as [Date, Date];

        expect(newRange[0].getDate()).toBe(2);
        expect(newRange[0].getHours()).toBe(0);
        expect(newRange[0].getMinutes()).toBe(0);
        expect(newRange[0].getSeconds()).toBe(0);

        expect(newRange[1].getDate()).toBe(5);
        expect(newRange[1].getHours()).toBe(0);
        expect(newRange[1].getMinutes()).toBe(0);
        expect(newRange[1].getSeconds()).toBe(0);
      }));

    test('корректно применяет время и дату при изменении даты без времени в range для timeFor=start', (ctx) =>
      context.start(async () => {
        const onChangeRange = vi.fn();
        const rangeValue: [Date, Date] = [
          new Date(1970, 0, 5, 10, 30, 0),
          new Date(1970, 0, 7, 15, 45, 0),
        ];
        renderComponent(ctx, {
          value: rangeValue,
          onChangeRange,
          timeFor: 'start',
          currentVisibleDate: new Date(1970, 0, 1),
        });
        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems).toHaveLength(3);
        expect(timeItems[0]).toHaveTextContent('10');
        expect(timeItems[1]).toHaveTextContent('30');
        expect(timeItems[2]).toHaveTextContent('00');

        const targetDay = getDateTimeItemByText(ctx, '10');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChangeRange).toHaveBeenCalled();
        const newRange = onChangeRange.mock.calls[0][0] as [Date, Date];

        expect(newRange[0].getDate()).toBe(5);
        expect(newRange[0].getHours()).toBe(10);
        expect(newRange[0].getMinutes()).toBe(30);
        expect(newRange[0].getSeconds()).toBe(0);

        expect(newRange[1].getDate()).toBe(10);
        expect(newRange[1].getHours()).toBe(10);
        expect(newRange[1].getMinutes()).toBe(30);
        expect(newRange[1].getSeconds()).toBe(0);
      }));

    test('корректно применяет время и дату при изменении даты со временем в range для timeFor=end', (ctx) =>
      context.start(async () => {
        const onChangeRange = vi.fn();
        const rangeValue: [Date, Date] = [
          new Date(1970, 0, 5, 10, 30, 0),
          new Date(1970, 0, 7, 15, 45, 0),
        ];
        renderComponent(ctx, {
          value: rangeValue,
          onChangeRange,
          timeFor: 'end',
          currentVisibleDate: new Date(1970, 0, 1),
        });
        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems).toHaveLength(3);
        expect(timeItems[0]).toHaveTextContent('15');
        expect(timeItems[1]).toHaveTextContent('45');
        expect(timeItems[2]).toHaveTextContent('00');

        const targetDay = getDateTimeItemByText(ctx, '6');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChangeRange).toHaveBeenCalled();
        const newRange = onChangeRange.mock.calls[0][0] as [Date, Date];

        expect(newRange[0].getDate()).toBe(5);
        expect(newRange[0].getHours()).toBe(0);
        expect(newRange[0].getMinutes()).toBe(0);
        expect(newRange[0].getSeconds()).toBe(0);

        expect(newRange[1].getDate()).toBe(6);
        expect(newRange[1].getHours()).toBe(0);
        expect(newRange[1].getMinutes()).toBe(0);
        expect(newRange[1].getSeconds()).toBe(0);
      }));

    test('корректно применяет время и дату при изменении даты со временем 2 в range для timeFor=end', (ctx) =>
      context.start(async () => {
        const onChangeRange = vi.fn();
        const rangeValue: [Date, Date] = [
          new Date(1970, 0, 5, 10, 30, 0),
          new Date(1970, 0, 7, 15, 45, 0),
        ];
        renderComponent(ctx, {
          value: rangeValue,
          onChangeRange,
          timeFor: 'end',
          currentVisibleDate: new Date(1970, 0, 1),
        });
        const timeItems = getTimeItemsSelected(ctx);
        expect(timeItems).toHaveLength(3);
        expect(timeItems[0]).toHaveTextContent('15');
        expect(timeItems[1]).toHaveTextContent('45');
        expect(timeItems[2]).toHaveTextContent('00');

        const targetDay = getDateTimeItemByText(ctx, '2');
        expect(targetDay).toBeDefined();
        fireEvent.click(targetDay!);
        expect(onChangeRange).toHaveBeenCalled();
        const newRange = onChangeRange.mock.calls[0][0] as [Date, Date];

        expect(newRange[0].getDate()).toBe(2);
        expect(newRange[0].getHours()).toBe(0);
        expect(newRange[0].getMinutes()).toBe(0);
        expect(newRange[0].getSeconds()).toBe(0);

        expect(newRange[1].getDate()).toBe(5);
        expect(newRange[1].getHours()).toBe(0);
        expect(newRange[1].getMinutes()).toBe(0);
        expect(newRange[1].getSeconds()).toBe(0);
      }));
  });
});
