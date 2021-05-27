import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { SelectProps } from '../../../Select/helpers';
import { Select } from '../../../Select/Select';
import { eventInterceptorMap, EventInterceptorProvider } from '../../EventInterceptor';
import { useSelectEventsHandler } from '../useSelectEventsHandler';

type SelectOption = {
  label: string;
  value: string;
};

const items = [
  { label: 'Neptunium', id: 1 },
  { label: 'Plutonium', id: 2 },
  { label: 'Americium', id: 3 },
];

const eventHandler = jest.fn();
const basicSelectRef = React.createRef<HTMLDivElement>();

const getComponent = (props: SelectProps<SelectOption, unknown>) => (
  <EventInterceptorProvider eventHandler={eventHandler} map={eventInterceptorMap}>
    <Select {...props} />
  </EventInterceptorProvider>
);

describe('useBasicSelectEventsHandler', () => {
  const { result } = renderHook(() =>
    useSelectEventsHandler(
      ({ items, onChange: jest.fn() } as unknown) as SelectProps,
      eventHandler,
      basicSelectRef,
    ),
  );

  it('при изменении опции вызывается eventHandler', () => {
    const { rerender } = render(
      getComponent((result.current as unknown) as SelectProps<SelectOption, unknown>),
    );
    const newProps = { ...result.current, value: items[1] };

    rerender(getComponent((newProps as unknown) as SelectProps<SelectOption, unknown>));

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });
});
