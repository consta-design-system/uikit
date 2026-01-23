import { render } from '@testing-library/react';
import React from 'react';

import { DatePicker } from '../../DatePicker';
import { DatePickerDropdown } from '../../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeTime } from '../../DatePickerFieldTypeTime/DatePickerFieldTypeTime';

jest.mock('../../DatePickerFieldTypeTime/DatePickerFieldTypeTime');
jest.mock('../../DatePickerDropdown/DatePickerDropdown');

const getFieldMock = () => (DatePickerFieldTypeTime as any).render as jest.Mock;
const getDropdownMock = () => (DatePickerDropdown as any).render as jest.Mock;

const renderComponent = (props: any = {}) => {
  const defaultProps = {
    type: 'time' as const,
    value: new Date(1970, 0, 1, 10, 0, 0),
    ...props,
  };

  return render(<DatePicker {...defaultProps} />);
};

describe('Компонент DatePickerTypeTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('timeOptions + format -> корректный проброс пропсов', () => {
    const baseTimeOptions = {
      hours: [0, 6, 12],
      minutes: [0, 30],
      seconds: [0, 10, 20, 30],
    };

    const formatCases = [
      {
        label: 'полный формат HH:mm:ss',
        format: 'dd.MM.yyyy HH:mm:ss',
        expectedTimeOptions: {
          hours: [0, 6, 12],
          minutes: [0, 30],
          seconds: [0, 10, 20, 30],
        },
      },
      {
        label: 'нет секунд (HH:mm)',
        format: 'dd.MM.yyyy HH:mm',
        expectedTimeOptions: {
          hours: [0, 6, 12],
          minutes: [0, 30],
          seconds: [],
        },
      },
      {
        label: 'нет минут (HH:ss)',
        format: 'dd.MM.yyyy HH:ss',
        expectedTimeOptions: {
          hours: [0, 6, 12],
          minutes: [],
          seconds: [0, 10, 20, 30],
        },
      },
      {
        label: 'нет часов (mm:ss)',
        format: 'dd.MM.yyyy mm:ss',
        expectedTimeOptions: {
          hours: [],
          minutes: [0, 30],
          seconds: [0, 10, 20, 30],
        },
      },
      {
        label: 'формат без времени',
        format: 'dd.MM.yyyy',
        expectedTimeOptions: {
          hours: [],
          minutes: [],
          seconds: [],
        },
      },
      {
        label: 'формат без даты',
        format: 'HH:mm:ss',
        expectedTimeOptions: {
          hours: [0, 6, 12],
          minutes: [0, 30],
          seconds: [0, 10, 20, 30],
        },
      },
      {
        label: 'формат без даты + нет минут (HH:ss)',
        format: 'HH:ss',
        expectedTimeOptions: {
          hours: [0, 6, 12],
          minutes: [],
          seconds: [0, 10, 20, 30],
        },
      },
      {
        label: 'пустой формат (формат по умолчанию)',
        format: '',
        expectedTimeOptions: {
          hours: [0, 6, 12],
          minutes: [0, 30],
          seconds: [0, 10, 20, 30],
        },
      },
    ];

    formatCases.forEach(({ label, format, expectedTimeOptions }) => {
      it(`корректно обрабатывает timeOptions, когда ${label}`, () => {
        renderComponent({
          format,
          timeOptions: baseTimeOptions,
        });

        const FieldMock = getFieldMock();
        const DropdownMock = getDropdownMock();

        const fieldProps = FieldMock.mock.calls[0][0];
        const dropdownProps = DropdownMock.mock.calls[0][0];

        expect(fieldProps.timeOptions).toEqual(expectedTimeOptions);
        expect(dropdownProps.timeOptions).toEqual(expectedTimeOptions);
      });
    });

    it('если timeOptions не передан, становится объектом с полями undefined при полном формате', () => {
      renderComponent({
        format: 'dd.MM.yyyy HH:mm:ss',
      });
      const expectedTimeOptions = {
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
      };

      const FieldMock = getFieldMock();
      const DropdownMock = getDropdownMock();

      const fieldProps = FieldMock.mock.calls[0][0];
      const dropdownProps = DropdownMock.mock.calls[0][0];

      expect(fieldProps.timeOptions).toEqual(expectedTimeOptions);
      expect(dropdownProps.timeOptions).toEqual(expectedTimeOptions);
    });
  });

  describe('преобразование multiplicity в timeOptions', () => {
    it('корректно преобразует multiplicity в timeOptions', () => {
      renderComponent({
        multiplicityHours: 2,
        multiplicityMinutes: 5,
        multiplicitySeconds: 10,
      });

      const FieldMock = getFieldMock();
      const DropdownMock = getDropdownMock();

      const fieldProps = FieldMock.mock.calls[0][0];
      const dropdownProps = DropdownMock.mock.calls[0][0];

      expect(fieldProps.timeOptions).toEqual({
        hours: { step: 2 },
        minutes: { step: 5 },
        seconds: { step: 10 },
      });
      expect(dropdownProps.timeOptions).toEqual({
        hours: { step: 2 },
        minutes: { step: 5 },
        seconds: { step: 10 },
      });
    });

    it('timeOptions имеет приоритет над multiplicity', () => {
      renderComponent({
        multiplicityHours: 2,
        multiplicityMinutes: 5,
        multiplicitySeconds: 10,
        timeOptions: {
          hours: [0, 6, 12],
          minutes: { step: 15 },
        },
      });

      const FieldMock = getFieldMock();
      const DropdownMock = getDropdownMock();

      const fieldProps = FieldMock.mock.calls[0][0];
      const dropdownProps = DropdownMock.mock.calls[0][0];

      expect(fieldProps.timeOptions).toEqual({
        hours: [0, 6, 12],
        minutes: { step: 15 },
        seconds: { step: 10 },
      });
      expect(dropdownProps.timeOptions).toEqual({
        hours: [0, 6, 12],
        minutes: { step: 15 },
        seconds: { step: 10 },
      });
    });
  });
});
