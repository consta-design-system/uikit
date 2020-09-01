import * as React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import ResizeObserver from '../__mocks__/ResizeObserver';
import { BasicSelect, SimpleSelectProps } from '../BasicSelect';

type SelectOption = {
  value: string;
  label: string;
};

jest.mock('resize-observer-polyfill', () => {
  return ResizeObserver;
});

const items = [
  { label: 'Neptunium', value: 'Neptunium' },
  { label: 'Plutonium', value: 'Plutonium' },
  { label: 'Americium', value: 'Americium' },
  { label: 'Curium', value: 'Curium' },
  { label: 'Berkelium', value: 'Berkelium' },
];

const defaultProps = {
  id: 'sample',
  options: items,
  value: null,
  onChange: jest.fn(),
  getOptionLabel: (option: SelectOption): string => option.label,
  placeholder: 'placeholder',
  ariaLabel: 'test-select',
};

const renderComponent = (props: SimpleSelectProps<SelectOption> = defaultProps): RenderResult => {
  const { options, onChange, value, getOptionLabel, ...restProps } = props;
  return render(
    <>
      <div data-testid="block" />
      <BasicSelect
        value={value}
        onChange={onChange}
        options={options}
        getOptionLabel={getOptionLabel}
        {...restProps}
      />
    </>,
  );
};

const getMenuButton = (): HTMLElement => screen.getByLabelText('test-select');
const getList = (): HTMLElement => screen.getByRole('listbox');

const openSelect = (): void => {
  fireEvent.click(getMenuButton());
};

describe('Компонент BasicSelect', () => {
  it('должен рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('рендерится с установленным значением', () => {
    const select = renderComponent({
      ...defaultProps,
      value: { label: 'Тестовая опция', value: 'test' },
    });
    expect(select.getByText('Тестовая опция')).toBeInTheDocument();
  });

  it('открывается и закрывается по клику', () => {
    renderComponent();

    openSelect();

    const list = getList();
    expect(list).toBeInTheDocument();

    openSelect();

    expect(list).not.toBeInTheDocument();
  });

  it('открывается и закрывается по клику за пределами селекта', () => {
    const select = renderComponent();

    openSelect();

    const block = select.getByTestId('block');
    const list = getList();
    expect(list).toBeInTheDocument();

    fireEvent.mouseDown(block);

    expect(list).not.toBeInTheDocument();
  });

  it('открывается и закрывается по клику на индикатор', () => {
    const select = renderComponent();

    const buttons = select.baseElement.getElementsByTagName('button');

    fireEvent.click(buttons[0]);

    const list = getList();

    expect(list).toBeInTheDocument();

    fireEvent.click(buttons[0]);
    expect(list).not.toBeInTheDocument();
  });

  it('отрисовываются опции', () => {
    const select = renderComponent();

    openSelect();

    const list = getList();
    expect(list).toBeInTheDocument();

    const options = select.getAllByRole('option');
    expect(options.length).toEqual(5);
  });

  it('выбирается опция', () => {
    const select = renderComponent();

    expect(select.getByText('placeholder')).toBeInTheDocument();

    openSelect();

    const options = select.getAllByRole('option');
    const list = getList();

    expect(list).toBeInTheDocument();

    fireEvent.click(options[3]);

    expect(select.getByText('Curium')).toBeInTheDocument();
    expect(select).not.toContain('placeholder');
  });

  it('вызывается onChange', () => {
    const handlerChange = jest.fn();
    const select = renderComponent({ ...defaultProps, onChange: handlerChange });

    openSelect();

    const options = select.getAllByRole('option');
    fireEvent.click(options[3]);

    expect(handlerChange).toBeCalledTimes(1);
  });

  it('вызывается onFocus', () => {
    const handlerFocus = jest.fn();
    renderComponent({ ...defaultProps, onFocus: handlerFocus });

    expect(handlerFocus).toBeCalledTimes(0);

    getMenuButton().focus();

    expect(handlerFocus).toBeCalledTimes(1);
  });

  it('вызывается onBlur', () => {
    const handlerBlur = jest.fn();
    renderComponent({ ...defaultProps, onBlur: handlerBlur });

    getMenuButton().focus();

    expect(handlerBlur).toBeCalledTimes(0);

    getMenuButton().blur();

    expect(handlerBlur).toBeCalledTimes(1);
  });
});
