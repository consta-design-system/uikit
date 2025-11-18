import { render } from '@testing-library/react';
import { ru } from 'date-fns/locale';
import React, { createRef } from 'react';

import { DatePickerDropdown } from '../../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateTimeRange } from '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';
import { DatePickerTypeDateTimeRange } from '../../DatePickerTypeDateTimeRange/DatePickerTypeDateTimeRange';

jest.mock(
  '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange',
);
jest.mock('../../DatePickerDropdown/DatePickerDropdown');

const getFieldMock = () =>
  (DatePickerFieldTypeDateTimeRange as any).render as jest.Mock;
const getDropdownMock = () => (DatePickerDropdown as any).render as jest.Mock;

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DatePickerTypeDateTimeRange>> = {},
) => {
  const defaultValue: [Date, Date] = [
    new Date(1970, 0, 1, 10, 0, 0),
    new Date(1970, 0, 15),
  ];
  return render(
    <DatePickerTypeDateTimeRange value={defaultValue} {...props} />,
  );
};

describe('Компонент DatePickerTypeDateTimeRange (unit tests)', () => {
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
          renderComponent({
            format,
            ...baseMultiplicities,
          });
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
      renderComponent({
        format: 'dd.MM.yyyy HH:mm:ss',
      });
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
      render(<DatePickerTypeDateTimeRange ref={ref} inputRef={inputRef} />); // Без default value, так как ref требует точного рендера
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
