import { render } from '@testing-library/react';
import React from 'react';

import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeTime } from '../DatePickerFieldTypeTime/DatePickerFieldTypeTime';
import { DatePickerTypeTime } from '../DatePickerTypeTime/DatePickerTypeTime';

jest.mock('../DatePickerFieldTypeTime/DatePickerFieldTypeTime');
jest.mock('../DatePickerDropdown/DatePickerDropdown');

const getFieldMock = () => (DatePickerFieldTypeTime as any).render as jest.Mock;

const getDropdownMock = () => (DatePickerDropdown as any).render as jest.Mock;

describe('Компонент DatePickerTypeTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('multiplicity + format -> проброс в Field и Dropdown', () => {
    const baseMultiplicities = {
      multiplicityHours: 2,
      multiplicityMinutes: 5,
      multiplicitySeconds: 10,
    };

    type FormatCase = {
      label: string;
      format: string;
      expectedHours: number | undefined;
      expectedMinutes: number | undefined;
      expectedSeconds: number | undefined;
    };

    const formatCases: FormatCase[] = [
      {
        label: 'полный формат HH:mm:ss',
        format: 'dd.MM.yyyy HH:mm:ss',
        expectedHours: 2,
        expectedMinutes: 5,
        expectedSeconds: 10,
      },
      {
        label: 'нет секунд (HH:mm)',
        format: 'dd.MM.yyyy HH:mm',
        expectedHours: 2,
        expectedMinutes: 5,
        expectedSeconds: 0,
      },
      {
        label: 'нет минут (HH:ss)',
        format: 'dd.MM.yyyy HH:ss',
        expectedHours: 2,
        expectedMinutes: 0,
        expectedSeconds: 10,
      },
      {
        label: 'нет часов (mm:ss)',
        format: 'dd.MM.yyyy mm:ss',
        expectedHours: 0,
        expectedMinutes: 5,
        expectedSeconds: 10,
      },
      {
        label: 'формат без времени вообще',
        format: 'dd.MM.yyyy',
        expectedHours: 0,
        expectedMinutes: 0,
        expectedSeconds: 0,
      },
    ];

    formatCases.forEach(
      ({ label, format, expectedHours, expectedMinutes, expectedSeconds }) => {
        it(`корректно рассчитывает multiplicity, когда ${label}`, () => {
          render(
            <DatePickerTypeTime
              value={new Date(1970, 0, 1, 10, 0, 0)}
              format={format}
              {...baseMultiplicities}
            />,
          );

          const FieldMock = getFieldMock();
          const DropdownMock = getDropdownMock();

          expect(FieldMock).toHaveBeenCalled();
          expect(DropdownMock).toHaveBeenCalled();

          const fieldProps = FieldMock.mock.calls[0][0];
          const dropdownProps = DropdownMock.mock.calls[0][0];

          expect(fieldProps.multiplicityHours).toBe(expectedHours);
          expect(fieldProps.multiplicityMinutes).toBe(expectedMinutes);
          expect(fieldProps.multiplicitySeconds).toBe(expectedSeconds);

          expect(dropdownProps.multiplicityHours).toBe(expectedHours);
          expect(dropdownProps.multiplicityMinutes).toBe(expectedMinutes);
          expect(dropdownProps.multiplicitySeconds).toBe(expectedSeconds);
        });
      },
    );

    it('если multiplicity не передан, остаётся undefined даже при полном формате', () => {
      render(
        <DatePickerTypeTime
          value={new Date(1970, 0, 1, 10, 0, 0)}
          format="dd.MM.yyyy HH:mm:ss"
        />,
      );

      const FieldMock = getFieldMock();
      const DropdownMock = getDropdownMock();

      const fieldProps = FieldMock.mock.calls[0][0];
      const dropdownProps = DropdownMock.mock.calls[0][0];

      expect(fieldProps.multiplicityHours).toBeUndefined();
      expect(fieldProps.multiplicityMinutes).toBeUndefined();
      expect(fieldProps.multiplicitySeconds).toBeUndefined();

      expect(dropdownProps.multiplicityHours).toBeUndefined();
      expect(dropdownProps.multiplicityMinutes).toBeUndefined();
      expect(dropdownProps.multiplicitySeconds).toBeUndefined();
    });
  });
});
