import React from 'react';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { Item } from '../../../SnackBar/helper';
import { SnackBar } from '../../../SnackBar/SnackBar';
import { useSnackBarEventsHandler } from '../useSnackBarEventsHandler';

type Props = React.ComponentProps<typeof SnackBar>;

const testId = 'SnackBar';
const items: Item[] = [
  {
    key: 1,
    message: 'message',
    status: 'normal',
  },
];
const defaultProps = {
  items,
};

const eventHandler = jest.fn();
const renderComponent = (props: Props = defaultProps) => {
  return render(<SnackBar data-testid={testId} {...props} />);
};

describe('useSnackBarEventsHandler', () => {
  const { result } = renderHook(() => useSnackBarEventsHandler(defaultProps, eventHandler));

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
