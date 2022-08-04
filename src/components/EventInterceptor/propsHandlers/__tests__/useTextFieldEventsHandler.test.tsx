import { fireEvent, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { cnTextField, TextField } from '../../../TextField/TextField';
import { Props, useTextFieldEventsHandler } from '../useTextFieldEventsHandler';

const testId = 'TextField';
const eventHandler = jest.fn();
const textFieldRef = React.createRef<HTMLDivElement>();

const renderComponent = (props: Props) => {
  return render(<TextField data-testid={testId} {...props} />);
};

describe('useTextFieldEventsHandler', () => {
  const textFieldProps = {
    id: 'sample',
    value: null,
    onChange: jest.fn(),
  };
  const { result } = renderHook(() =>
    useTextFieldEventsHandler(textFieldProps, eventHandler, textFieldRef),
  );
  const props = result.current;

  it('возвращает пропсы в том же виде, что и получил', () => {
    expect(props).toEqual({
      ...textFieldProps,
      onBlur: expect.any(Function),
      onFocus: expect.any(Function),
    });
  });

  it('при изменении значения вызывается eventHandler', () => {
    const value = 'value';

    renderComponent(props);

    const input = screen
      .getByTestId(testId)
      .querySelector(`input.${cnTextField('Input')}`) as HTMLElement;

    act(() => {
      fireEvent.change(input, { target: { value } });
    });

    fireEvent.blur(input);

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
