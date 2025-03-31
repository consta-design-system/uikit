import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { setRef } from '##/utils/setRef';

import { cnFieldCounter, FieldCounter } from '..';

type Props = React.ComponentProps<typeof FieldCounter>;

const testId = 'FieldCounter';

const renderComponent = (props: Props = {}) => {
  return render(<FieldCounter {...props} data-testid={testId} />);
};

const getRender = () => screen.getByTestId(testId);

const getIncrementButton = () =>
  getRender().querySelector(
    `.${cnFieldCounter('Button', { counter: 'increment' }).split(' ')[1]}`,
  );

const getDecrementButton = () =>
  getRender().querySelector(
    `.${cnFieldCounter('Button', { counter: 'decrement' }).split(' ')[1]}`,
  );

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка ref', () => {
    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        ref: (el) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка className', () => {
    it(`Присваивается дополнительный className`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
  describe('проверка onIncrementClick', () => {
    it(`onIncrementClick отрабатывает`, () => {
      const onIncrementClick = jest.fn();

      renderComponent({ onIncrementClick });

      fireEvent.click(getIncrementButton() as HTMLButtonElement);

      expect(onIncrementClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('проверка onDecrementClick', () => {
    it(`onIncrementClick отрабатывает`, () => {
      const onDecrementClick = jest.fn();

      renderComponent({ onDecrementClick });

      fireEvent.click(getDecrementButton() as HTMLButtonElement);

      expect(onDecrementClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('проверка onIncrementFocus', () => {
    it(`onIncrementFocus отрабатывает`, () => {
      const onIncrementFocus = jest.fn();

      renderComponent({ onIncrementFocus });

      fireEvent.focus(getIncrementButton() as HTMLButtonElement);

      expect(onIncrementFocus).toHaveBeenCalledTimes(1);
    });
  });
  describe('проверка onDecrementFocus', () => {
    it(`onDecrementFocus отрабатывает`, () => {
      const onDecrementFocus = jest.fn();

      renderComponent({ onDecrementFocus });

      fireEvent.focus(getDecrementButton() as HTMLButtonElement);

      expect(onDecrementFocus).toHaveBeenCalledTimes(1);
    });
  });
  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      it(`присваивается  ${prop}=${prop}`, () => {
        renderComponent({ [prop]: prop });

        expect(getRender()).toHaveAttribute(prop, prop);
      });
    });
  });

  describe('проверка кнопок инкремента и декремента', () => {
    it('Кнопка инкремента имеет корректный className', () => {
      renderComponent();
      const incrementButton = getIncrementButton();
      expect(incrementButton).toHaveClass(
        cnFieldCounter('Button', { counter: 'increment' }).split(' ')[1],
      );
    });

    it('Кнопка декремента имеет корректный className', () => {
      renderComponent();
      const decrementButton = getDecrementButton();
      expect(decrementButton).toHaveClass(
        cnFieldCounter('Button', { counter: 'decrement' }).split(' ')[1],
      );
    });

    it('Кнопка инкремента имеет корректный tabIndex', () => {
      renderComponent();
      const incrementButton = getIncrementButton();
      expect(incrementButton).toHaveAttribute('tabIndex', '-1');
    });

    it('Кнопка декремента имеет корректный tabIndex', () => {
      renderComponent();
      const decrementButton = getDecrementButton();
      expect(decrementButton).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('проверка иконок', () => {
    it('Иконка инкремента рендерится', () => {
      renderComponent();
      const incrementButton = getIncrementButton();
      expect(incrementButton?.querySelector('svg')).toBeTruthy();
    });

    it('Иконка декремента рендерится', () => {
      renderComponent();
      const decrementButton = getDecrementButton();
      expect(decrementButton?.querySelector('svg')).toBeTruthy();
    });
  });
});
