import { fireEvent, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { createRef } from 'react';

import { Button } from '../../../Button/Button';
import { ButtonProps, useButtonEventHandler } from '../useButtonEventHandler';

type Props = React.ComponentProps<typeof Button>;

const testId = 'Button';

const renderComponent = (props: Props = {}) => {
  return render(<Button data-testid={testId} {...props} />);
};

const eventHandler = jest.fn();

describe('useButtonEventHandler', () => {
  const buttonProps: ButtonProps = {
    size: 'm',
    view: 'primary',
    width: 'default',
    form: 'brick',
    label: 'label',
    onClick: jest.fn(),
  };
  const { result } = renderHook(() =>
    useButtonEventHandler(buttonProps, eventHandler, createRef()),
  );

  it('возвращает пропсы в том же виде, что и получил', () => {
    let props = {};

    act(() => {
      props = result.current;
    });

    expect(props).toEqual({ ...buttonProps, onClick: expect.any(Function) });
  });

  it('при клике по кнопке вызывается eventHandler', () => {
    let props = {};

    act(() => {
      props = result.current;
    });

    renderComponent(props);

    const button = screen.getByTestId(testId);

    fireEvent.click(button);

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
