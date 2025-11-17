import { render } from '@testing-library/react';
import React from 'react';

import { DateTime, DateTimePropType } from '##/components/DateTime';

import { DatePickerDropdown } from '../../DatePickerDropdown/DatePickerDropdown';

jest.mock('##/components/DateTime');

const renderComponent = (
  props: Partial<React.ComponentProps<typeof DatePickerDropdown>> = {},
) => {
  const anchorRef = React.createRef<HTMLElement>();
  const mergedProps = {
    anchorRef,
    type: 'time' as const,
    view: 'classic' as const,
    isOpen: true,
    ...props,
  };

  const utils = render(<DatePickerDropdown {...mergedProps} />);
  const DateTimeMock = (DateTime as any).render as jest.Mock;

  return {
    ...utils,
    anchorRef,
    DateTimeMock,
  };
};

describe('Компонент DatePickerDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Dropdown открытие/закрытие', () => {
    it('не рендерит dropdown если isOpen=false', () => {
      const { queryByRole } = renderComponent({ isOpen: false });
      expect(queryByRole('listbox')).toBeNull();
    });

    it('рендерит dropdown если isOpen=true', () => {
      const { getByRole } = renderComponent({ isOpen: true });
      expect(getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Рендер DateTime для разных type', () => {
    const types: DateTimePropType[] = [
      'date',
      'month',
      'year',
      'time',
      'date-time',
    ];

    it.each(types)('рендерит DateTime для type=%s', (type) => {
      const { DateTimeMock } = renderComponent({ type });
      expect(DateTimeMock).toHaveBeenCalled();

      const props = DateTimeMock.mock.calls[0][0];
      if (['date', 'time', 'date-time'].includes(type)) {
        expect(props.type).toBe(type);
      }
    });
  });

  it('выбор времени вызывает onChange', () => {
    const onChange = jest.fn();
    const { DateTimeMock } = renderComponent({ type: 'time', onChange });

    const props = DateTimeMock.mock.calls[0][0];
    props.onChange?.(new Date(2023, 0, 1, 12, 0, 0));
    expect(onChange).toHaveBeenCalled();
  });

  describe('multiplicity props', () => {
    it('по умолчанию не передаёт multiplicityHours/Minutes/Seconds', () => {
      const { DateTimeMock } = renderComponent();
      const props = DateTimeMock.mock.calls[0][0];

      expect(props.multiplicityHours).toBeUndefined();
      expect(props.multiplicityMinutes).toBeUndefined();
      expect(props.multiplicitySeconds).toBeUndefined();
    });

    type MultiplicityKey =
      | 'multiplicityHours'
      | 'multiplicityMinutes'
      | 'multiplicitySeconds';
    const cases: { label: string; key: MultiplicityKey; value: number }[] = [
      { label: 'multiplicityHours', key: 'multiplicityHours', value: 2 },
      { label: 'multiplicityMinutes', key: 'multiplicityMinutes', value: 5 },
      { label: 'multiplicitySeconds', key: 'multiplicitySeconds', value: 10 },
    ];

    cases.forEach(({ label, key, value }) => {
      it(`пробрасывает ${label}, если props передан`, () => {
        const { DateTimeMock } = renderComponent({ [key]: value });
        const props = DateTimeMock.mock.calls[0][0];
        expect(props[key]).toBe(value);
      });

      it(`оставляет ${label} undefined, если явно передано undefined`, () => {
        const { DateTimeMock } = renderComponent({ [key]: undefined });
        const props = DateTimeMock.mock.calls[0][0];
        expect(props[key]).toBeUndefined();
      });
    });

    it('одновременно пробрасывает все multiplicity, если все заданы', () => {
      const { DateTimeMock } = renderComponent({
        multiplicityHours: 2,
        multiplicityMinutes: 5,
        multiplicitySeconds: 10,
      });

      const props = DateTimeMock.mock.calls[0][0];

      expect(props.multiplicityHours).toBe(2);
      expect(props.multiplicityMinutes).toBe(5);
      expect(props.multiplicitySeconds).toBe(10);
    });
  });
});
