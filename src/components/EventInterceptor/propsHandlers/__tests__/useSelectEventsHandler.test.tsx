import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { Select, SelectProps } from '../../../Select/Select';
import { cnSelect } from '../../../SelectComponents/cnSelect';
import { cnSelectItem } from '../../../SelectComponents/SelectItem/SelectItem';
import { eventInterceptorMap, EventInterceptorProvider } from '../../EventInterceptor';
import { useSelectEventsHandler } from '../useSelectEventsHandler';

const animationDuration = 200;
const SELECT_TEST_ID = 'UseSelectEventsHandlerTest_Select';

const items = [
  { label: 'Neptunium', id: 1 },
  { label: 'Plutonium', id: 2 },
  { label: 'Americium', id: 3 },
];

const TestComponent: React.FC<Omit<Parameters<typeof EventInterceptorProvider>[0], 'children'>> = (
  eventInterceptorArgs,
) => {
  const [value, setValue] = React.useState<typeof items[number] | null>(null);
  return (
    <EventInterceptorProvider {...eventInterceptorArgs}>
      <Select
        items={items}
        value={value}
        onChange={({ value: newValue }) => setValue(newValue)}
        data-testid={SELECT_TEST_ID}
      />
    </EventInterceptorProvider>
  );
};

const renderComponent = (
  eventInterceptorArgs: Omit<Parameters<typeof EventInterceptorProvider>[0], 'children'>,
) => {
  return render(<TestComponent {...eventInterceptorArgs} />);
};

function getSelectRender() {
  return screen.getByTestId(SELECT_TEST_ID);
}

function getInput() {
  return getSelectRender().querySelector(`.${cnSelect('FakeField')}`) as HTMLElement;
}

function getItemsList() {
  return screen.getByRole('listbox');
}

function getItems() {
  return getItemsList().querySelectorAll(`.${cnSelectItem()}`);
}

function getItem(index = 1) {
  return getItems()[index];
}

function inputClick() {
  fireEvent.click(getInput());
}

function animateDelay() {
  act(() => {
    jest.advanceTimersByTime(animationDuration);
  });
}

describe('useBasicSelectEventsHandler', () => {
  it('возвращает пропсы в том же виде, что и получил', () => {
    const onChange = jest.fn();
    const defaultProps: SelectProps = {
      items,
      onChange,
    };

    const { result } = renderHook(() =>
      useSelectEventsHandler(defaultProps, jest.fn(), createRef()),
    );

    let props;

    act(() => {
      props = result.current;
    });

    expect(props).toEqual(defaultProps);
  });

  it('при изменении опции вызывается eventHandler', () => {
    jest.useFakeTimers();
    const fakeHandler = jest.fn();

    act(() => {
      renderComponent({
        map: eventInterceptorMap,
        eventHandler: fakeHandler,
      });
    });

    inputClick();
    animateDelay();

    fireEvent.click(getItem(1));

    inputClick();
    animateDelay();

    fireEvent.click(getItem(0));

    expect(fakeHandler).toHaveBeenCalled();
    expect(fakeHandler).toHaveBeenCalledTimes(2);
  });
});
