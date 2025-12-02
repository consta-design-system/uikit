import { render } from '@testing-library/react';
import React from 'react';

import { DatePickerFieldTypeDateTime } from '../../DatePickerFieldTypeDateTime/DatePickerFieldTypeDateTime';

const defaultProps = {
  value: new Date(2023, 0, 1, 12, 0, 0),
  onChange: jest.fn(),
  onError: jest.fn(),
  placeholder: 'Выберите дату',
};

const renderComponent = (props = {}) => {
  return render(<DatePickerFieldTypeDateTime {...defaultProps} {...props} />);
};

describe('Компонент DatePickerFieldTypeDateTime', () => {
  it('рендерит TextField с placeholder и value', () => {
    const { getByPlaceholderText } = renderComponent();

    const input = getByPlaceholderText('Выберите дату') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    expect(input.value).toBe('01.01.2023 12:00:00');
  });

  it('поддерживает disabled и required', () => {
    const { getByPlaceholderText } = renderComponent({
      disabled: true,
      required: true,
    });

    const input = getByPlaceholderText('Выберите дату') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('передает ref и inputRef', () => {
    const ref = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();

    renderComponent({ ref, inputRef });

    expect(ref.current).not.toBeNull();
    expect(inputRef.current).not.toBeNull();
  });
});
