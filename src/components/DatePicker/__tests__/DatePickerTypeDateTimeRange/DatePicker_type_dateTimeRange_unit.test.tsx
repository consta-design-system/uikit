import { render } from '@testing-library/react';
import { ru } from 'date-fns/locale';
import React, { createRef } from 'react';

import { DatePicker } from '../../DatePicker';
import { DatePickerDropdown } from '../../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateTimeRange } from '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';

jest.mock(
  '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange',
);
jest.mock('../../DatePickerDropdown/DatePickerDropdown');

const getFieldMock = () =>
  (DatePickerFieldTypeDateTimeRange as any).render as jest.Mock;
const getDropdownMock = () => (DatePickerDropdown as any).render as jest.Mock;

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DatePicker>> = {},
) => {
  const defaultValue: [Date, Date] = [
    new Date(1970, 0, 1, 10, 0, 0),
    new Date(1970, 0, 15),
  ];
  const defaultProps = {
    type: 'date-time-range' as const,
    value: defaultValue,
    ...props,
  };
  return render(<DatePicker {...defaultProps} />);
};

describe('Компонент DatePickerTypeDateTimeRange (unit tests)', () => {
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

  describe('совместимость timeOptions и multiplicity', () => {
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

  describe('проброс остальных props', () => {
    it('пробрасывает value в Field и Dropdown', () => {
      const value: [Date, Date] = [
        new Date(2023, 10, 5, 12, 30, 45),
        new Date(2023, 10, 10),
      ];
      renderComponent({ value });
      const fieldProps = getFieldMock().mock.calls[0][0];
      const dropdownProps = getDropdownMock().mock.calls[0][0];
      expect(fieldProps.value).toEqual(value);
      expect(dropdownProps.value).toEqual(value);
    });

    it('пробрасывает disabled в Field', () => {
      renderComponent({ disabled: true });
      const fieldProps = getFieldMock().mock.calls[0][0];
      expect(fieldProps.disabled).toBe(true);
    });

    it('пробрасывает onChange в Dropdown (wrapped)', () => {
      const onChange = jest.fn();
      renderComponent({ onChange });
      const dropdownProps = getDropdownMock().mock.calls[0][0];
      const wrapper = dropdownProps.onChange;
      expect(typeof wrapper).toBe('function');
    });

    it('пробрасывает locale и events в Dropdown', () => {
      const locale = ru;
      const events = [new Date(2023, 0, 1), new Date(2023, 1, 1)];
      renderComponent({ locale, events });
      const dropdownProps = getDropdownMock().mock.calls[0][0];
      expect(dropdownProps.locale).toBe(locale);
      expect(dropdownProps.events).toEqual(events);
    });

    it('пробрасывает ref и inputRef', () => {
      const ref = createRef<HTMLDivElement>();
      const inputRef: [
        React.RefObject<HTMLInputElement>,
        React.RefObject<HTMLInputElement>,
      ] = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>()];
      renderComponent({
        ref,
        inputRef,
        value: [new Date(1970, 0, 1), new Date(1970, 0, 15)],
      });
      const fieldProps = getFieldMock().mock.calls[0][0];
      expect(fieldProps.startFieldInputRef).toBeDefined();
      expect(fieldProps.endFieldInputRef).toBeDefined();
    });

    it('пробрасывает renderAdditionalControls в Dropdown', () => {
      const renderAdditionalControls = jest.fn();
      renderComponent({ renderAdditionalControls });
      const dropdownProps = getDropdownMock().mock.calls[0][0];
      expect(dropdownProps.renderAdditionalControls).toBe(
        renderAdditionalControls,
      );
    });
  });
});
