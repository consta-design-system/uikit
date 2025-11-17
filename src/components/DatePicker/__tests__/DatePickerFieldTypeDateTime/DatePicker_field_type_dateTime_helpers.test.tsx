import { render } from '@testing-library/react';
import React from 'react';
import { IMask, useIMask } from 'react-imask';

import { usePicker } from '../../DatePickerFieldTypeDateTime/helpers';
import { datePickerPropSeparatorDefault } from '../../helpers';
import { datePickerErrorTypes } from '../../types';

jest.mock('react-imask', () => {
  const MaskedEnum = jest.fn();
  const MaskedRange = jest.fn();

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
  dd: string;
  MM: string;
  yyyy: string;
  HH: string;
  mm: string;
  ss: string;
};

const invalidCases: InvalidCase[] = [
  // дата
  { dd: '32', MM: '01', yyyy: '1970', HH: '10', mm: '00', ss: '00' }, // день > 31
  { dd: '00', MM: '01', yyyy: '1970', HH: '10', mm: '00', ss: '00' }, // день < 1
  { dd: '10', MM: '13', yyyy: '1970', HH: '10', mm: '00', ss: '00' }, // месяц > 12
  { dd: '10', MM: '00', yyyy: '1970', HH: '10', mm: '00', ss: '00' }, // месяц < 1
  // время
  { dd: '10', MM: '01', yyyy: '1970', HH: '-1', mm: '00', ss: '00' }, // часы < 0
  { dd: '10', MM: '01', yyyy: '1970', HH: '24', mm: '00', ss: '00' }, // часы > 23
  { dd: '10', MM: '01', yyyy: '1970', HH: '10', mm: '-1', ss: '00' }, // минуты < 0
  { dd: '10', MM: '01', yyyy: '1970', HH: '10', mm: '60', ss: '00' }, // минуты > 59
  { dd: '10', MM: '01', yyyy: '1970', HH: '10', mm: '00', ss: '-1' }, // секунды < 0
  { dd: '10', MM: '01', yyyy: '1970', HH: '10', mm: '59', ss: '60' }, // секунды > 59
];

type MultiplicityCase = {
  label: string;
  fieldKey: 'HH' | 'mm' | 'ss';
  multiplicityProp: keyof Pick<
    UsePickerProps,
    'multiplicityHours' | 'multiplicityMinutes' | 'multiplicitySeconds'
  >;
  max: number;
  step: number;
};

const multiplicityCases: MultiplicityCase[] = [
  {
    label: 'часов',
    fieldKey: 'HH',
    multiplicityProp: 'multiplicityHours',
    max: 23,
    step: 2,
  },
  {
    label: 'минут',
    fieldKey: 'mm',
    multiplicityProp: 'multiplicityMinutes',
    max: 59,
    step: 5,
  },
  {
    label: 'секунд',
    fieldKey: 'ss',
    multiplicityProp: 'multiplicitySeconds',
    max: 59,
    step: 10,
  },
];

describe('Helpers для DatePicker_field_type_dateTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps: UsePickerProps = {
    value: null,
    onChange: jest.fn(),
    onError: jest.fn(),
    multiplicityHours: undefined,
    multiplicityMinutes: undefined,
    multiplicitySeconds: undefined,
    format: 'dd.MM.yyyy HH:mm:ss',
    separator: datePickerPropSeparatorDefault,
    minDate: new Date(1970, 0, 1, 0, 0, 0),
    maxDate: new Date(1970, 0, 31, 23, 59, 59),
  };

  describe('конфиг маски даты (yyyy/MM/dd)', () => {
    it('использует MaskedRange с корректными диапазонами', () => {
      render(<TestComponent {...baseProps} />);

      const useIMaskMock = useIMask as unknown as jest.Mock;
      const IMaskAny = IMask as any;
      const config = useIMaskMock.mock.calls[0][0];

      expect(config.blocks.yyyy.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.yyyy.from).toBe(1);
      expect(config.blocks.yyyy.to).toBe(9999);

      expect(config.blocks.MM.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.MM.from).toBe(1);
      expect(config.blocks.MM.to).toBe(12);

      expect(config.blocks.dd.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.dd.from).toBe(1);
      expect(config.blocks.dd.to).toBe(31);
    });
  });

  describe('конфиг маски (multiplicity)', () => {
    it('при multiplicity undefined использует MaskedRange для HH/mm/ss', () => {
      render(<TestComponent {...baseProps} />);

      const useIMaskMock = useIMask as unknown as jest.Mock;
      const IMaskAny = IMask as any;

      const config = useIMaskMock.mock.calls[0][0];

      multiplicityCases.forEach(({ fieldKey, max }) => {
        const block = (config.blocks as any)[fieldKey];

        expect(block.mask).toBe(IMaskAny.MaskedRange);
        expect(block.from).toBe(0);
        expect(block.to).toBe(max);
      });

      expect(config.blocks.yyyy.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.yyyy.from).toBe(1);
      expect(config.blocks.yyyy.to).toBe(9999);

      expect(config.blocks.MM.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.MM.from).toBe(1);
      expect(config.blocks.MM.to).toBe(12);

      expect(config.blocks.dd.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.dd.from).toBe(1);
      expect(config.blocks.dd.to).toBe(31);
    });

    multiplicityCases.forEach(
      ({ label, fieldKey, multiplicityProp, max, step }) => {
        it(`для multiplicity ${label} > 1 использует MaskedEnum и enum по шагу ${step}`, () => {
          const props = {
            ...baseProps,
            [multiplicityProp]: step,
          } as UsePickerProps;

          render(<TestComponent {...props} />);

          const useIMaskMock = useIMask as unknown as jest.Mock;
          const IMaskAny = IMask as any;
          const config = useIMaskMock.mock.calls[0][0];

          const block = (config.blocks as any)[fieldKey];

          expect(block.mask).toBe(IMaskAny.MaskedEnum);
          expect(Array.isArray(block.enum)).toBe(true);

          const values: string[] = block.enum;
          const expectedLength = Math.floor((max + 1) / step);

          expect(values.length).toBe(expectedLength);
          expect(values[0]).toBe('00');
          expect(values[1]).toBe(String(step).padStart(2, '0'));
          expect(values).not.toContain('01');
        });
      },
    );
  });

  describe('validate', () => {
    invalidCases.forEach(({ dd, MM, yyyy, HH, mm, ss }) => {
      const input = `${dd}.${MM}.${yyyy} ${HH}:${mm}:${ss}`;
      const label = `dd=${dd}, MM=${MM}, yyyy=${yyyy}, HH=${HH}, mm=${mm}, ss=${ss}`;

      it(`возвращает false и вызывает onError при невалидной дате/времени: ${label}`, () => {
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
        expect(err.dd).toBe(dd);
        expect(err.MM).toBe(MM);
        expect(err.yyyy).toBe(yyyy);
        expect(err.HH).toBe(HH);
        expect(err.mm).toBe(mm);
        expect(err.ss).toBe(ss);
      });
    });

    it('возвращает true и не вызывает onError для валидной даты и времени', () => {
      const onError = jest.fn();

      render(<TestComponent {...baseProps} onError={onError} />);

      const useIMaskMock = useIMask as unknown as jest.Mock;
      const config = useIMaskMock.mock.calls[0][0];

      const input = '15.01.1970 10:11:12';

      const result = config.validate(input);

      expect(result).toBe(true);
      expect(onError).not.toHaveBeenCalled();
    });
  });
});
