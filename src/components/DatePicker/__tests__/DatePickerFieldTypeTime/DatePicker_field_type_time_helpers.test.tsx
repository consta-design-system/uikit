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

  describe('конфиг маски', () => {
    it('всегда возвращает MaskedRange для HH, mm, ss', () => {
      render(<TestComponent {...baseProps} />);

      const useIMaskMock = useIMask as unknown as jest.Mock;
      const IMaskAny = IMask as any;
      const config = useIMaskMock.mock.calls[0][0];

      expect(config.blocks.HH).toBeDefined();
      expect(config.blocks.mm).toBeDefined();
      expect(config.blocks.ss).toBeDefined();

      expect(config.blocks.HH.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.mm.mask).toBe(IMaskAny.MaskedRange);
      expect(config.blocks.ss.mask).toBe(IMaskAny.MaskedRange);

      expect(config.blocks.HH.from).toBe(0);
      expect(config.blocks.HH.to).toBe(23);

      expect(config.blocks.mm.from).toBe(0);
      expect(config.blocks.mm.to).toBe(59);

      expect(config.blocks.ss.from).toBe(0);
      expect(config.blocks.ss.to).toBe(59);
    });
  });
});
