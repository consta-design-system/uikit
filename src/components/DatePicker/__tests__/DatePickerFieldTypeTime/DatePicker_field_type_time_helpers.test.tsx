import { render } from '@testing-library/react';
import React from 'react';
import { IMask, useIMask } from 'react-imask';

import { usePicker } from '../../DatePickerFieldTypeTime/helpers';
import { datePickerErrorTypes } from '../../types';

jest.mock('react-imask', () => {
  const MaskedEnum = jest.fn().mockName('MaskedEnum');
  const MaskedRange = jest.fn().mockName('MaskedRange');

  const useIMaskMock = jest.fn(() => ({
    ref: { current: null },
    value: '',
    setValue: jest.fn(),
    maskRef: { current: { updateValue: jest.fn() } },
  }));

  return {
    IMask: { MaskedEnum, MaskedRange },
    useIMask: useIMaskMock,
  };
});

type UsePickerProps = Parameters<typeof usePicker>[0];

const TestComponent: React.FC<UsePickerProps> = (props) => {
  usePicker(props);
  return null;
};

type InvalidCase = {
  HH: string;
  mm: string;
  ss: string;
};

const invalidCases: InvalidCase[] = [
  { HH: '-1', mm: '00', ss: '00' }, // часы < 0
  { HH: '24', mm: '00', ss: '00' }, // часы > 23
  { HH: '12', mm: '-1', ss: '00' }, // минуты < 0
  { HH: '00', mm: '60', ss: '00' }, // минуты > 59
  { HH: '00', mm: '00', ss: '-1' }, // секунды < 0
  { HH: '12', mm: '59', ss: '60' }, // секунды > 59
];

describe('Helpers для DatePicker_field_type_time', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps: UsePickerProps = {
    value: null,
    onChange: jest.fn(),
    onError: jest.fn(),
    format: 'HH:mm:ss',
    separator: ':',
    minDate: new Date(1970, 0, 1, 0, 0, 0),
    maxDate: new Date(1970, 0, 1, 23, 59, 59),
  };

  describe('validate', () => {
    invalidCases.forEach(({ HH, mm, ss }) => {
      const input = `${HH}:${mm}:${ss}`;
      const label = `HH=${HH}, mm=${mm}, ss=${ss}`;

      it(`возвращает false и вызывает onError при невалидном времени: ${label}`, () => {
        const onError = jest.fn();

        render(<TestComponent {...baseProps} onError={onError} />);

        const useIMaskMock = useIMask as unknown as jest.Mock;
        const config = useIMaskMock.mock.calls[0][0];

        const result = config.validate(input);

        expect(result).toBe(false);
        expect(onError).toHaveBeenCalled();

        const err = onError.mock.calls[0][0];
        expect(err.type).toBe(datePickerErrorTypes[1]);
        expect(err.stringValue).toBe(input);
        expect(err.HH).toBe(HH);
        expect(err.mm).toBe(mm);
        expect(err.ss).toBe(ss);
      });
    });

    it('возвращает true и не вызывает onError для валидного времени', () => {
      const onError = jest.fn();

      render(<TestComponent {...baseProps} onError={onError} />);

      const useIMaskMock = useIMask as unknown as jest.Mock;
      const config = useIMaskMock.mock.calls[0][0];

      const result = config.validate('10:11:12');

      expect(result).toBe(true);
      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe('конфиг маски (timeOptions)', () => {
    const timeOptionsCases = [
      {
        label: 'hours, minutes, seconds массивы с данными',
        timeOptions: {
          hours: [0, 6, 12, 15],
          minutes: [0, 5, 30, 35],
          seconds: [15, 19, 30, 35, 45, 49],
        },
        expectedMasks: {
          HH: 'MaskedEnum',
          mm: 'MaskedEnum',
          ss: 'MaskedEnum',
        },
        expectedLengths: {
          HH: 4,
          mm: 4,
          ss: 6,
        },
        expectedFirstLast: {
          HH: ['00', '15'],
          mm: ['00', '35'],
          ss: ['15', '49'],
        },
      },
      {
        label: 'hours и minutes объекты {start, stop, step}',
        timeOptions: {
          hours: { start: 0, stop: 12, step: 2 },
          minutes: { stop: 25, step: 5 },
          seconds: { start: 30, step: 1 },
        },
        expectedMasks: {
          HH: 'MaskedEnum',
          mm: 'MaskedEnum',
          ss: 'MaskedEnum',
        },
        expectedLengths: {
          HH: 7, // 0,2,4,6,8,10,12
          mm: 6, // 0,5,10,15,20,25
          ss: 30, // 30 to 59 step 1
        },
        expectedFirstLast: {
          HH: ['00', '12'],
          mm: ['00', '25'],
          ss: ['30', '59'],
        },
      },
      {
        label: 'пустые массивы → MaskedRange',
        timeOptions: {
          hours: [],
          minutes: [],
          seconds: [],
        },
        expectedMasks: {
          HH: 'MaskedRange',
          mm: 'MaskedRange',
          ss: 'MaskedRange',
        },
        expectedLengths: undefined,
        expectedFirstLast: undefined,
      },
      {
        label: 'minutes и seconds не переданы',
        timeOptions: {
          hours: [0, 6, 12, 15],
        },
        expectedMasks: {
          HH: 'MaskedEnum',
          mm: 'MaskedRange',
          ss: 'MaskedRange',
        },
        expectedLengths: {
          HH: 4,
        },
        expectedFirstLast: {
          HH: ['00', '15'],
        },
      },
      {
        label: 'timeOptions не передан → MaskedRange',
        timeOptions: undefined,
        expectedMasks: {
          HH: 'MaskedRange',
          mm: 'MaskedRange',
          ss: 'MaskedRange',
        },
        expectedLengths: undefined,
        expectedFirstLast: undefined,
      },
      {
        label:
          'hours, minutes, seconds массивы (проверка дублирования одиночных значений в десятке)',
        timeOptions: {
          hours: [0, 6, 12],
          minutes: [0, 5, 30],
          seconds: [15, 30, 45],
        },
        expectedMasks: {
          HH: 'MaskedEnum',
          mm: 'MaskedEnum',
          ss: 'MaskedEnum',
        },
        expectedLengths: {
          HH: 4,
          mm: 4,
          ss: 6,
        },
        expectedFirstLast: {
          HH: ['00', '12'],
          mm: ['00', '30'],
          ss: ['15', '45'],
        },
      },
    ];

    timeOptionsCases.forEach(
      ({
        label,
        timeOptions,
        expectedMasks,
        expectedLengths,
        expectedFirstLast,
      }) => {
        it(`корректно формирует маски при ${label}`, () => {
          render(<TestComponent {...baseProps} timeOptions={timeOptions} />);
          const useIMaskMock = useIMask as unknown as jest.Mock;
          const IMaskAny = IMask as any;
          const config = useIMaskMock.mock.calls[0][0];
          (['HH', 'mm', 'ss'] as const).forEach((key) => {
            const block = config.blocks[key];
            if (expectedMasks[key] === 'MaskedEnum') {
              expect(block.mask).toBe(IMaskAny.MaskedEnum);
              expect(Array.isArray(block.enum)).toBe(true);
              const values: string[] = block.enum;
              if (expectedLengths && expectedLengths[key]) {
                expect(values.length).toBe(expectedLengths[key]);
              }
              if (expectedFirstLast && expectedFirstLast[key]) {
                expect(values[0]).toBe(expectedFirstLast[key][0]);
                expect(values[values.length - 1]).toBe(
                  expectedFirstLast[key][1],
                );
              }
            } else {
              expect(block.mask).toBe(IMaskAny.MaskedRange);
            }
          });
        });
      },
    );
  });
});
