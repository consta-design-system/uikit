import { render } from '@testing-library/react';
import React from 'react';

import { DatePickerFieldTypeDateTimeRange } from '../../DatePickerFieldTypeDateTimeRange/DatePickerFieldTypeDateTimeRange';

const defaultProps = {
  value: [new Date(2023, 0, 1, 12, 0, 0), new Date(2023, 0, 2, 12, 0, 0)] as [
    (Date | undefined)?,
    (Date | undefined)?,
  ],
  onChange: jest.fn(),
  onError: jest.fn(),
  label: 'Выберите диапазон',
  caption: 'Подсказка',
  startFieldPlaceholder: 'Начало',
  endFieldPlaceholder: 'Конец',
};

const renderComponent = (props = {}) =>
  render(<DatePickerFieldTypeDateTimeRange {...defaultProps} {...props} />);

describe('Компонент DatePicker_field_typeDateTimeRange', () => {
  it('рендерит label, caption и оба поля с корректными value и placeholder', () => {
    const startDate = new Date(2023, 0, 1, 12, 0, 0);
    const endDate = new Date(2023, 0, 2, 13, 30, 0);

    const { getByPlaceholderText, getByText } = renderComponent({
      value: [startDate, endDate] as [(Date | undefined)?, (Date | undefined)?],
      startFieldPlaceholder: 'Начало',
      endFieldPlaceholder: 'Конец',
      label: 'Выберите диапазон',
      caption: 'Подсказка',
    });

    expect(getByText('Выберите диапазон')).toBeInTheDocument();
    expect(getByText('Подсказка')).toBeInTheDocument();

    const startInput = getByPlaceholderText('Начало');
    const endInput = getByPlaceholderText('Конец');

    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();

    expect((startInput as HTMLInputElement).value).toBe('01.01.2023 12:00:00');
    expect((endInput as HTMLInputElement).value).toBe('02.01.2023 13:30:00');
  });

  it('передает ref и inputRef', () => {
    const ref = React.createRef<HTMLDivElement>();
    const startRef = React.createRef<HTMLInputElement>();
    const endRef = React.createRef<HTMLInputElement>();

    renderComponent({
      ref,
      startFieldRef: startRef,
      endFieldRef: endRef,
    });

    expect(ref.current).not.toBeNull();
    expect(startRef.current).not.toBeNull();
    expect(endRef.current).not.toBeNull();
  });

  it('поддерживает disabled и required', () => {
    const { getByPlaceholderText } = renderComponent({
      disabled: true,
      required: true,
    });

    expect(getByPlaceholderText('Начало')).toBeDisabled();
    expect(getByPlaceholderText('Конец')).toBeDisabled();
  });
});
