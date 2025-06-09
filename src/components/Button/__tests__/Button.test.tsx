import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { createIconMock, IconMock } from '##/../__mocks__/IconMock';
import { cnMixFocus } from '##/mixs/MixFocus/MixFocus';

import {
  Button,
  buttonPropForm,
  buttonPropSize,
  buttonPropView,
  buttonPropWidth,
  cnButton,
} from '../Button';

const iconLeftText = 'IconLeftMock';
const iconRightText = 'IconRightMock';
const IconLeftMock = createIconMock(iconLeftText);
const IconRightMock = createIconMock(iconRightText);

type ButtonProps = React.ComponentProps<typeof Button>;

const testId = 'button';

const getRender = () => screen.getByTestId(testId);

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
        expect(getRender()).toHaveClass(cnButton({ size }));
      });
    });
  });

  describe('проверка view', () => {
    buttonPropView.forEach((view) => {
      it(`присваивает класс для view=${view}`, () => {
        renderComponent({ view });

        expect(getRender()).toHaveClass(cnButton({ view }));
      });
    });
  });

  describe('проверка width', () => {
    buttonPropWidth.forEach((width) => {
      it(`присваивает класс для width=${width}`, () => {
        renderComponent({ width });
        expect(getRender()).toHaveClass(cnButton({ width }));
      });
    });
  });

  describe('проверка form', () => {
    buttonPropForm.forEach((form) => {
      it(`присваивает класс для form=${form}`, () => {
        renderComponent({ form });
        expect(getRender()).toHaveClass(cnButton({ form }));
      });
    });
  });

  describe('проверка тэга', () => {
    const tags = ['a', 'div', 'span'] as const;
    tags.forEach((el) => {
      it(`должен рендериться как <${el}>`, () => {
        renderComponent({ as: el });
        expect(getRender().tagName).toEqual(el.toUpperCase());
      });
    });
  });

  describe('проверка disabled', () => {
    it('должен отключать <button>', () => {
      const handleClick = jest.fn();

      renderComponent({ disabled: true, onClick: handleClick });

      const button = getRender();

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);

      expect(button).toHaveClass(cnButton({ disabled: true }));
    });

    it('должен вешать класс disabled на <a> элемент', () => {
      const handleClick = jest.fn();

      renderComponent({ disabled: true, as: 'a', onClick: handleClick });

      const button = getRender();

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);
      expect(button).toHaveClass(cnButton({ disabled: true }));
    });
  });
  describe('проверка loading', () => {
    it('должен отключать <button>', () => {
      const handleClick = jest.fn();

      renderComponent({ loading: true, onClick: handleClick });

      const button = getRender();

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);

      expect(button).toHaveClass(cnButton({ loading: true }));
    });

    it('должен вешать класс loading на <a> элемент', () => {
      const handleClick = jest.fn();

      renderComponent({ loading: true, as: 'a', onClick: handleClick });

      const button = getRender();

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(0);
      expect(button).toHaveClass(cnButton({ loading: true }));
    });
  });
});

it('должен отображать текст в кнопке', () => {
  const label = 'Это кнопка';
  renderComponent({ label });

  expect(getRender().textContent).toEqual(label);
});

it('должен работать onClick, если кнопка не отключена', () => {
  const handleClick = jest.fn();

  renderComponent({ onClick: handleClick });

  const button = getRender();

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

describe('проверка иконки', () => {
  it('должен отображать иконку слева', () => {
    const label = 'Текст кнопки';
    renderComponent({ label, iconLeft: IconLeftMock });
    expect(getRender()).toHaveTextContent(iconLeftText + label);
  });

  it('должен отображать иконку справа', () => {
    const label = 'Текст кнопки';
    renderComponent({ label, iconRight: IconRightMock });
    expect(getRender()).toHaveTextContent(label + iconRightText);
  });

  it('должен отображать иконки слева и справа', () => {
    const label = 'Текст кнопки';

    renderComponent({
      label,
      iconRight: IconRightMock,
      iconLeft: IconLeftMock,
    });
    expect(getRender()).toHaveTextContent(iconLeftText + label + iconRightText);
  });

  it('должен отображать только иконку', () => {
    const label = 'Текст кнопки';

    renderComponent({ label, iconLeft: IconLeftMock, onlyIcon: true });
    expect(getRender()).toHaveTextContent(iconLeftText);
  });

  describe('проверка атрибута title', () => {
    it('должен устанавливать title, если он передан', () => {
      const title = 'Тестовый title';
      renderComponent({ title });
      expect(getRender()).toHaveAttribute('title', title);
    });

    it('не должен устанавливать title, если он не передан', () => {
      renderComponent();
      expect(getRender()).not.toHaveAttribute('title');
    });

    it('должен устанавливать title, если onlyIcon=true и передан label', () => {
      const label = 'Текст кнопки';
      renderComponent({ onlyIcon: true, label, iconLeft: IconMock });
      expect(getRender()).toHaveAttribute('title', label);
    });
  });

  describe('проверка атрибута tabIndex', () => {
    it('должен устанавливать tabIndex, если он передан', () => {
      const tabIndex = 3;
      renderComponent({ tabIndex });
      expect(getRender()).toHaveAttribute('tabindex', tabIndex.toString());
    });

    it('не должен устанавливать tabIndex, если он не передан', () => {
      renderComponent();
      expect(getRender()).not.toHaveAttribute('tabindex');
    });
  });

  describe('проверка атрибута form', () => {
    it('должен устанавливать form, если передан formId', () => {
      const formId = 'test-form';
      renderComponent({ formId });
      expect(getRender()).toHaveAttribute('form', formId);
    });

    it('не должен устанавливать form, если formId не передан', () => {
      renderComponent();
      expect(getRender()).not.toHaveAttribute('form');
    });
  });

  describe('проверка кастомного класса', () => {
    it('должен добавлять переданный className', () => {
      const customClass = 'custom-class';
      renderComponent({ className: customClass });
      expect(getRender()).toHaveClass(customClass);
    });
  });

  describe('проверка состояния focus', () => {
    it('должен добавлять класс фокуса, если кнопка активна', () => {
      renderComponent();

      const button = getRender();

      fireEvent.focus(button);

      expect(button).toHaveClass(cnMixFocus());
    });

    it('не должен добавлять класс фокуса, если кнопка отключена', () => {
      renderComponent({ disabled: true });

      const button = getRender();

      fireEvent.focus(button);

      expect(button).not.toHaveClass(cnMixFocus());
    });

    it('не должен добавлять класс фокуса, если кнопка в состоянии загрузки', () => {
      renderComponent({ loading: true });

      const button = getRender();

      fireEvent.focus(button);

      expect(button).not.toHaveClass(cnMixFocus());
    });
  });
});
