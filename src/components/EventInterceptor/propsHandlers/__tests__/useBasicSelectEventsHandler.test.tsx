import React from 'react';
import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { BasicSelect } from '../../../BasicSelect';
import { SimpleSelectProps } from '../../../BasicSelect/BasicSelect';
import { eventInterceptorMap, EventInterceptorProvider } from '../../EventInterceptor';
import { useBasicSelectEventsHandler } from '../useBasicSelectEventsHandler';

type SelectOption = {
  label: string;
  value: string;
};

const items = [
  { label: 'Neptunium', value: 'Neptunium' },
  { label: 'Plutonium', value: 'Plutonium' },
  { label: 'Americium', value: 'Americium' },
];
const defaultProps = {
  id: 'sample',
  options: items,
  value: null,
  onChange: jest.fn(),
  getOptionLabel: (option: SelectOption): string => option.label,
};
const eventHandler = jest.fn();
const basicSelectRef = React.createRef<HTMLDivElement>();

const getComponent = (props: SimpleSelectProps<SelectOption>) => (
  <EventInterceptorProvider eventHandler={eventHandler} map={eventInterceptorMap}>
    <BasicSelect {...props} />
  </EventInterceptorProvider>
);

describe('useBasicSelectEventsHandler', () => {
  const { result } = renderHook(() =>
    useBasicSelectEventsHandler(defaultProps, eventHandler, basicSelectRef),
  );

  it('возвращает пропсы в том же виде, что и получил', () => {
    let props = {};

    act(() => {
      props = result.current;
    });

    expect(props).toEqual(defaultProps);
  });

  it('при изменении опции вызывается eventHandler', () => {
    const { rerender } = render(getComponent(result.current as SimpleSelectProps<SelectOption>));
    const newProps = { ...result.current, value: items[1] };

    rerender(getComponent(newProps as SimpleSelectProps<SelectOption>));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
