import { render } from '@testing-library/react';
import { ru } from 'date-fns/locale';
import React, { createRef } from 'react';

import { DatePicker } from '../../DatePicker';
import { DatePickerDropdown } from '../../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateTime } from '../../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';

jest.mock('../../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime');
jest.mock('../../DatePickerDropdown/DatePickerDropdown');

const getFieldMock = () =>
  (DatePickerFieldTypeDateTime as any).render as jest.Mock;

const getDropdownMock = () => (DatePickerDropdown as any).render as jest.Mock;

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DatePicker>> = {},
) => {
  const defaultValue = new Date(1970, 0, 1, 10, 0, 0);
  const defaultProps = {
    type: 'date-time' as const,
    value: defaultValue,
    ...props,
  };
  return render(<DatePicker {...defaultProps} />);
};

describe('Компонент DatePicker_type_dateTime_props', () => {
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
        expectedTimeOptions: baseTimeOptions,
      },
      {
        label: 'нет секунд (HH:mm)',
        format: 'dd.MM.yyyy HH:mm',
        expectedTimeOptions: { ...baseTimeOptions, seconds: [] },
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
        expectedTimeOptions: { hours: [], minutes: [], seconds: [] },
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
        renderComponent({ format, timeOptions: baseTimeOptions });

        const FieldMock = getFieldMock();
        const DropdownMock = getDropdownMock();

        const fieldProps = FieldMock.mock.calls[0][0];
        const dropdownProps = DropdownMock.mock.calls[0][0];

        expect(fieldProps.timeOptions).toEqual(expectedTimeOptions);
        expect(dropdownProps.timeOptions).toEqual(expectedTimeOptions);
      });
    });

    it('если timeOptions не передан, становится объектом с полями undefined при полном формате', () => {
      renderComponent({ format: 'dd.MM.yyyy HH:mm:ss' });

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

  it('пробрасывает value в Field и Dropdown', () => {
    const value = new Date(2023, 10, 5, 12, 30, 45);
    renderComponent({ value });

    const fieldProps = getFieldMock().mock.calls[0][0];
    const dropdownProps = getDropdownMock().mock.calls[0][0];

    expect(fieldProps.value).toBe(value);
    expect(dropdownProps.value).toBe(value);
  });

  it('пробрасывает disabled в Field', () => {
    renderComponent({ disabled: true });
    const fieldProps = getFieldMock().mock.calls[0][0];
    expect(fieldProps.disabled).toBe(true);
  });

  it('пробрасывает onChange в Dropdown', () => {
    const onChange = jest.fn();
    renderComponent({ onChange });
    const dropdownProps = getDropdownMock().mock.calls[0][0];
    expect(dropdownProps.onChange).toBe(onChange);
  });

  it('пробрасывает locale и events в Dropdown', () => {
    const locale = ru;
    const events = [new Date(2023, 0, 1), new Date(2023, 1, 1)];
    renderComponent({ locale, events });
    const dropdownProps = getDropdownMock().mock.calls[0][0];
    expect(dropdownProps.locale).toBe(locale);
    expect(dropdownProps.events).toBe(events);
  });

  it('пробрасывает ref и inputRef', () => {
    const ref = createRef<HTMLDivElement>();
    const inputRef = createRef<HTMLInputElement>();
    renderComponent({ ref, inputRef });
    const fieldProps = getFieldMock().mock.calls[0][0];
    expect(fieldProps.inputRef).toBeDefined();
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
