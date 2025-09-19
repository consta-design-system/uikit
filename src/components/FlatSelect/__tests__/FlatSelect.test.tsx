import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';

// import { cn } from '##/utils/bem';
import {
  FlatSelect,
  FlatSelectComponent,
  FlatSelectGroupDefault,
  FlatSelectItemDefault,
  FlatSelectProps,
} from '..';
import { groups, items } from '../__mocks__/data.mock';

const testId = 'FlatSelect';
const animationDuration = 200;

const defaultProps = {
  items,
  onChange: () => {},
};

// const cnFlatSelect = cn('FlatSelect');

const ComponentWithAnchorRef: FlatSelectComponent = (props) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={ref} data-testid="anchor" type="button">
        Button
      </button>

      <FlatSelect {...props} anchorRef={ref} />
    </>
  );
};

const renderComponent = <
  ITEM = FlatSelectItemDefault,
  GROUP = FlatSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: FlatSelectProps<ITEM, GROUP, MULTIPLE>,
) => {
  const { anchorRef } = props;

  return render(
    <>
      <div data-testid="outside" />
      {anchorRef ? (
        <ComponentWithAnchorRef data-testid={testId} {...props} />
      ) : (
        <FlatSelect data-testid={testId} {...props} />
      )}
    </>,
  );
};

const getRender = () => screen.queryByTestId(testId) as HTMLDivElement;
const getAnchor = () => screen.getByTestId('anchor');
// const getOutside = () => screen.getByTestId('outside') as HTMLDivElement;

const getClearButton = () =>
  getRender().querySelector(`.FieldClearButton`) as HTMLButtonElement;

const anchorClick = () => fireEvent.click(getAnchor());

const getItems = () =>
  getRender().querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];
// const getItem = (index: number = 0) => getItems()[index] as HTMLDivElement;
const getInput = () => getRender().querySelector('input') as HTMLInputElement;

const getGroups = () => getRender().querySelectorAll(`.${cnListGroupLabel()}`);
const animateDelay = () => {
  act(() => {
    jest.advanceTimersByTime(animationDuration);
  });
};

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    renderComponent(defaultProps);

    expect(getRender()).toBeInTheDocument();
  });

  describe('проверка ref', () => {
    it('ref присвоен', () => {
      const ref = { current: null };
      renderComponent({ ...defaultProps, ref });
      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка className', () => {
    it('Присваивается дополнительный className', () => {
      const className = 'custom-class';
      renderComponent({ ...defaultProps, className });
      expect(getRender()).toHaveClass(className);
    });
  });

  describe('проверка other props', () => {
    it('Присваиваются дополнительные атрибуты', () => {
      renderComponent({
        ...defaultProps,
        'aria-label': 'test-autocomplete',
      });
      expect(getRender()).toHaveAttribute('aria-label', 'test-autocomplete');
    });
  });

  describe('рендерит элементы items', () => {
    it('рендерит элементы items', () => {
      renderComponent(defaultProps);

      items.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });

      expect(getItems().length).toEqual(items.length);
    });
  });

  describe('рендерит группы', () => {
    it('рендерит группы', () => {
      renderComponent({ ...defaultProps, groups });

      groups.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });

      expect(getGroups().length).toEqual(groups.length);
    });
  });

  describe('проверка onChange', () => {
    it('проверка onChange', () => {
      const onChangeMock = jest.fn();
      renderComponent({
        ...defaultProps,
        onChange: onChangeMock,
        value: null,
      });

      fireEvent.click(screen.getByText(items[1].label));
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(items[1], {
        e: expect.any(Object),
      });
    });

    it('проверка onChange при multiple', () => {
      const onChangeMock = jest.fn();
      renderComponent({
        ...defaultProps,
        onChange: onChangeMock,
        multiple: true,
        value: null,
      });

      fireEvent.click(screen.getByText(items[1].label));
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith([items[1]], {
        e: expect.any(Object),
      });
    });

    it('проверка onChange при multiple и value', () => {
      const onChangeMock = jest.fn();
      renderComponent({
        ...defaultProps,
        onChange: onChangeMock,
        multiple: true,
        value: [items[1]],
      });

      fireEvent.click(screen.getByText(items[1].label));
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(null, {
        e: expect.any(Object),
      });
    });
  });

  describe('проверка onFocus', () => {
    it('проверка onFocus', () => {
      const onFocusMock = jest.fn();
      renderComponent({
        ...defaultProps,
        onFocus: onFocusMock,
      });

      fireEvent.focus(getRender());
      expect(onFocusMock).toHaveBeenCalled();
      expect(onFocusMock).toHaveBeenCalledTimes(1);
      expect(onFocusMock).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('проверка onBlur', () => {
    it('проверка onBlur', () => {
      const onBlurMock = jest.fn();
      renderComponent({
        ...defaultProps,
        onBlur: onBlurMock,
      });

      fireEvent.blur(getRender());
      expect(onBlurMock).toHaveBeenCalled();
      expect(onBlurMock).toHaveBeenCalledTimes(1);
      expect(onBlurMock).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('проверка anchorRef', () => {
    it('проверка открытия списка по клику на якорь', () => {
      jest.useFakeTimers();
      const anchorRef = { current: null };
      act(() => {
        renderComponent({
          ...defaultProps,
          anchorRef,
        });
      });

      expect(getRender()).not.toBeInTheDocument();

      anchorClick();

      animateDelay();

      expect(getRender()).toBeInTheDocument();
    });

    it('проверка закрытия списка по клику на якорь', () => {
      jest.useFakeTimers();
      const anchorRef = { current: null };
      act(() => {
        renderComponent({
          ...defaultProps,
          anchorRef,
          isOpen: true,
        });
      });

      expect(getRender()).toBeInTheDocument();

      anchorClick();

      animateDelay();

      expect(getRender()).not.toBeInTheDocument();
    });
  });

  describe('проверка onOpen', () => {
    it('проверка вызова onOpen по клику на якорь', () => {
      jest.useFakeTimers();
      const onOpenMock = jest.fn();
      const anchorRef = { current: null };
      act(() => {
        renderComponent({
          ...defaultProps,
          anchorRef,
          onOpen: onOpenMock,
        });
      });

      anchorClick();

      animateDelay();

      expect(onOpenMock).toHaveBeenCalled();
    });
  });

  describe('проверка input', () => {
    it('проверка input', () => {
      renderComponent({
        ...defaultProps,
        input: true,
      });
      const input = getInput();
      expect(input).toBeInTheDocument();
    });
    it('проверка input с placeholder', () => {
      renderComponent({
        ...defaultProps,
        input: true,
        placeholder: 'placeholder',
      });
      const input = getInput();
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'placeholder');
    });
    it('проверка input с value', () => {
      renderComponent({
        ...defaultProps,
        input: true,
        inputValue: 'value',
      });
      const input = getInput();
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('value');
    });
    it('проверка onInput', () => {
      const onInput = jest.fn();
      renderComponent({
        ...defaultProps,
        input: true,
        inputValue: 'value',
        onInput,
      });
      const input = getInput();
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('value');

      fireEvent.change(input, { target: { value: 'value2' } });
      expect(onInput).toHaveBeenCalledWith('value2');
    });
    it('проверка clearButton c value', () => {
      renderComponent({
        ...defaultProps,
        input: true,
        inputValue: 'value',
        clearButton: true,
      });

      expect(getClearButton()).toBeInTheDocument();
    });

    it('проверка clearButton без value', () => {
      const onInput = jest.fn();
      renderComponent({
        ...defaultProps,
        input: true,
        onInput,
        clearButton: true,
      });
      const input = getInput();

      expect(getClearButton()).not.toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'value' } });

      expect(getClearButton()).toBeInTheDocument();
    });
  });
});
