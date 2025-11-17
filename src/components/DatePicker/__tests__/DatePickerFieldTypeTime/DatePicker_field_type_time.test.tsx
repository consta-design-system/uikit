import { render } from '@testing-library/react';
import React from 'react';

import { DatePickerFieldTypeTime } from '../../DatePickerFieldTypeTime/DatePickerFieldTypeTime';

const defaultProps = {
  value: new Date(2023, 0, 1, 12, 30, 45),
  onChange: jest.fn(),
  onError: jest.fn(),
  placeholder: 'Выберите время',
};

const renderComponent = (props = {}) => {
  return render(<DatePickerFieldTypeTime {...defaultProps} {...props} />);
};

describe('Компонент DatePickerFieldTypeTime', () => {
  it('рендерит TextField с placeholder и value', () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('Выберите время') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('12:30:45');
  });

  it('поддерживает disabled и required', () => {
    const { getByPlaceholderText } = renderComponent({
      disabled: true,
      required: true,
    });
    const input = getByPlaceholderText('Выберите время') as HTMLInputElement;

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
