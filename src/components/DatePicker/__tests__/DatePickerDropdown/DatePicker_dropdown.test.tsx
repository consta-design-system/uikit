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

  describe('timeOptions prop', () => {
    it('по умолчанию не передаёт timeOptions', () => {
      const { DateTimeMock } = renderComponent();
      const props = DateTimeMock.mock.calls[0][0];

      expect(props.timeOptions).toBeUndefined();
    });

    it('пробрасывает timeOptions, если передан', () => {
      const timeOptions = {
        hours: { step: 2 },
        minutes: [0, 30],
        seconds: { start: 0, stop: 10, step: 5 },
      };

      const { DateTimeMock } = renderComponent({ timeOptions });
      const props = DateTimeMock.mock.calls[0][0];

      expect(props.timeOptions).toEqual(timeOptions);
    });

    it('оставляет timeOptions undefined, если передано undefined', () => {
      const { DateTimeMock } = renderComponent({ timeOptions: undefined });
      const props = DateTimeMock.mock.calls[0][0];

      expect(props.timeOptions).toBeUndefined();
    });
  });
});
