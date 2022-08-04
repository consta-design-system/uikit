import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { SnackBar } from '../../../SnackBar/SnackBar';
import { SnackBarItemDefault, SnackBarProps } from '../../../SnackBar/types';
import { useSnackBarEventsHandler } from '../useSnackBarEventsHandler';

const testId = 'SnackBar';
const items: SnackBarItemDefault[] = [
  {
    key: '1',
    message: 'message',
    status: 'normal',
  },
];
const defaultProps = {
  items,
};

const eventHandler = jest.fn();
const renderComponent = (
  props: SnackBarProps<SnackBarItemDefault> = defaultProps,
) => {
  return render(
    <SnackBar
      data-testid={testId}
      {...props}
      getItemKey={(item) => item.key}
    />,
  );
};

describe('useSnackBarEventsHandler', () => {
  const { result } = renderHook(() =>
    useSnackBarEventsHandler(defaultProps, eventHandler),
  );

  it('возвращает пропсы в том же виде, что и получил', () => {
    let props = {};

    act(() => {
      props = result.current;
    });

    expect(props).toEqual(defaultProps);
  });

  it('при изменении items вызывается eventHandler', () => {
    renderComponent(result.current);

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
