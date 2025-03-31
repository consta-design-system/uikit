import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { IconMock } from '##/../__mocks__/IconMock';
import { cnMixFocus } from '##/mixs/MixFocus/MixFocus';

import {
  Button,
  buttonPropForm,
  buttonPropSize,
  buttonPropView,
  buttonPropWidth,
  cnButton,
} from '../Button';

type ButtonProps = React.ComponentProps<typeof Button>;

const testId = 'button';

const renderComponent = (props: ButtonProps = {}) => {
  const { label = 'Текст кнопки', ...rest } = props;
  return render(<Button data-testid={testId} label={label} {...rest} />);
};

describe('Компонент Button', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка size', () => {
    buttonPropSize.forEach((size) => {
      it(`присваивает класс для size=${size}`, () => {
        renderComponent({ size });

        const button = screen.getByTestId(testId);
        expect(button).toHaveClass(cnButton({ size }));
      });
    });
  });

  describe('проверка view', () => {
    buttonPropView.forEach((view) => {
      it(`присваивает класс для view=${view}`, () => {
        renderComponent({ view });

        const button = screen.getByTestId(testId);

        expect(button).toHaveClass(cnButton({ view }));
      });
    });
  });

  describe('проверка width', () => {
    buttonPropWidth.forEach((width) => {
      it(`присваивает класс для width=${width}`, () => {
        renderComponent({ width });

        const button = screen.getByTestId(testId);

        expect(button).toHaveClass(cnButton({ width }));
      });
    });
  });

  describe('проверка form', () => {
    buttonPropForm.forEach((form) => {
      it(`присваивает класс для form=${form}`, () => {
        renderComponent({ form });

        const button = screen.getByTestId(testId);

        expect(button).toHaveClass(cnButton({ form }));
      });
    });
  });

  describe('проверка тэга', () => {
    const tags = ['a', 'div', 'span'] as const;
    tags.forEach((el) => {
      it(`должен рендериться как <${el}>`, () => {
        renderComponent({ as: el });

        const button = screen.getByTestId(testId);

        expect(button.tagName).toEqual(el.toUpperCase());
      });
    });
  });

  describe('проверка disabled', () => {
    it('должен отключать <button>', () => {
      const handleClick = jest.fn();

      renderComponent({ disabled: true, onClick: handleClick });

      const button = screen.getByTestId(testId);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);

      expect(button).toHaveClass(cnButton({ disabled: true }));
    });

    it('должен вешать класс disabled на <a> элемент', () => {
      const handleClick = jest.fn();

      renderComponent({ disabled: true, as: 'a', onClick: handleClick });

      const button = screen.getByTestId(testId);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);
      expect(button).toHaveClass(cnButton({ disabled: true }));
    });
  });
  describe('проверка loading', () => {
    it('должен отключать <button>', () => {
      const handleClick = jest.fn();

      renderComponent({ loading: true, onClick: handleClick });

      const button = screen.getByTestId(testId);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);

      expect(button).toHaveClass(cnButton({ loading: true }));
    });

    it('должен вешать класс loading на <a> элемент', () => {
      const handleClick = jest.fn();

      renderComponent({ loading: true, as: 'a', onClick: handleClick });

      const button = screen.getByTestId(testId);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);
      expect(button).toHaveClass(cnButton({ loading: true }));
    });
  });
});

it('должен отображать текст в кнопке', () => {
  const label = 'Это кнопка';

  renderComponent({ label });

  const button = screen.getByTestId(testId);

  expect(button.textContent).toEqual(label);
});

it('должен работать onClick, если кнопка не отключена', () => {
  const handleClick = jest.fn();

  renderComponent({ onClick: handleClick });

  const button = screen.getByTestId(testId);

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

describe('проверка иконки', () => {
  it('должен отображать иконку слева', () => {
    const label = 'Текст кнопки';
    const iconLeftText = 'Иконка слева';
    const IconLeft = () => <span>{iconLeftText}</span>;

    renderComponent({ label, iconLeft: IconLeft });

    const button = screen.getByTestId(testId);

    expect(button).toHaveTextContent(iconLeftText + label);
  });

  it('должен отображать иконку справа', () => {
    const label = 'Текст кнопки';
    const iconRightText = 'Иконка справа';
    const IconRight = () => <span>{iconRightText}</span>;

    renderComponent({ label, iconRight: IconRight });

    const button = screen.getByTestId(testId);

    expect(button).toHaveTextContent(label + iconRightText);
  });

  it('должен отображать иконки слева и справа', () => {
    const label = 'Текст кнопки';
    const iconRightText = 'Иконка справа';
    const iconLeftText = 'Иконка слева';

    const IconLeft = () => <span>{iconLeftText}</span>;
    const IconRight = () => <span>{iconRightText}</span>;

    renderComponent({ label, iconRight: IconRight, iconLeft: IconLeft });

    const button = screen.getByTestId(testId);

    expect(button).toHaveTextContent(iconLeftText + label + iconRightText);
  });

  it('должен отображать только иконку', () => {
    const label = 'Текст кнопки';
    const iconLeftText = 'Иконка слева';

    const IconLeft = () => <span>{iconLeftText}</span>;

    renderComponent({ label, iconLeft: IconLeft, onlyIcon: true });

    const button = screen.getByTestId(testId);

    expect(button).toHaveTextContent(iconLeftText);
  });

  describe('проверка атрибута title', () => {
    it('должен устанавливать title, если он передан', () => {
      const title = 'Тестовый title';
      renderComponent({ title });

      const button = screen.getByTestId(testId);

      expect(button).toHaveAttribute('title', title);
    });

    it('не должен устанавливать title, если он не передан', () => {
      renderComponent();

      const button = screen.getByTestId(testId);

      expect(button).not.toHaveAttribute('title');
    });

    it('должен устанавливать title, если onlyIcon=true и передан label', () => {
      const label = 'Текст кнопки';
      renderComponent({ onlyIcon: true, label, iconLeft: IconMock });

      const button = screen.getByTestId(testId);

      expect(button).toHaveAttribute('title', label);
    });
  });

  describe('проверка атрибута tabIndex', () => {
    it('должен устанавливать tabIndex, если он передан', () => {
      const tabIndex = 3;
      renderComponent({ tabIndex });

      const button = screen.getByTestId(testId);

      expect(button).toHaveAttribute('tabindex', tabIndex.toString());
    });

    it('не должен устанавливать tabIndex, если он не передан', () => {
      renderComponent();

      const button = screen.getByTestId(testId);

      expect(button).not.toHaveAttribute('tabindex');
    });
  });

  describe('проверка атрибута form', () => {
    it('должен устанавливать form, если передан formId', () => {
      const formId = 'test-form';
      renderComponent({ formId });

      const button = screen.getByTestId(testId);

      expect(button).toHaveAttribute('form', formId);
    });

    it('не должен устанавливать form, если formId не передан', () => {
      renderComponent();

      const button = screen.getByTestId(testId);

      expect(button).not.toHaveAttribute('form');
    });
  });

  describe('проверка кастомного класса', () => {
    it('должен добавлять переданный className', () => {
      const customClass = 'custom-class';
      renderComponent({ className: customClass });

      const button = screen.getByTestId(testId);

      expect(button).toHaveClass(customClass);
    });
  });

  describe('проверка состояния focus', () => {
    it('должен добавлять класс фокуса, если кнопка активна', () => {
      renderComponent();

      const button = screen.getByTestId(testId);

      fireEvent.focus(button);

      expect(button).toHaveClass(cnMixFocus());
    });

    it('не должен добавлять класс фокуса, если кнопка отключена', () => {
      renderComponent({ disabled: true });

      const button = screen.getByTestId(testId);

      fireEvent.focus(button);

      expect(button).not.toHaveClass(cnMixFocus());
    });

    it('не должен добавлять класс фокуса, если кнопка в состоянии загрузки', () => {
      renderComponent({ loading: true });

      const button = screen.getByTestId(testId);

      fireEvent.focus(button);

      expect(button).not.toHaveClass(cnMixFocus());
    });
  });
});
