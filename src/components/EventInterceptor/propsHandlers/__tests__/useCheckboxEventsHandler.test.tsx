import { fireEvent, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { Checkbox, CheckboxProps } from '../../../Checkbox/Checkbox';
import { useCheckboxEventsHandler } from '../useCheckboxEventsHandler';

const testId = 'Checkbox';
const defaultProps: CheckboxProps = {
  checked: false,
  onChange: jest.fn(),
};
const eventHandler = jest.fn();
const checkboxRef = React.createRef<HTMLLabelElement>();

const renderComponent = (props: CheckboxProps = defaultProps) => {
  return render(<Checkbox data-testid={testId} {...props} />);
};

describe('useCheckboxEventsHandler', () => {
  const { result } = renderHook(() =>
    useCheckboxEventsHandler(defaultProps, eventHandler, checkboxRef),
  );

  it('возвращает пропсы в том же виде, что и получил', () => {
    let props = {};

    act(() => {
      props = result.current;
    });

    expect(props).toEqual({ ...defaultProps, onChange: expect.any(Function) });
  });

  it('при изменении состояния вызывается eventHandler', () => {
    renderComponent(result.current);

    const checkbox = screen.getByTestId(testId);

    fireEvent.click(checkbox);

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
