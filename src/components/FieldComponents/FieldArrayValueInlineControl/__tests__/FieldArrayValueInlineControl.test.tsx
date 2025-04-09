import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { setRef } from '##/utils/setRef';

import {
  cnFieldArrayValueInlineControl,
  FieldArrayValueInlineControl,
} from '..';
import { FieldArrayValueInlineControlProps } from '../types';

const testId = 'FieldArrayValueInlineControl';
const cnRenderValueItem = () => 'RenderValueItem';

const defaultRenderValue: (value: string[]) => React.ReactNode = (value) =>
  value.map((item, index) => {
    return (
      <div className={cnRenderValueItem()} data-index={index}>
        {item}
      </div>
    );
  });

const defaultValue = ['один', 'два', 'три'];

const renderComponent = (
  props: FieldArrayValueInlineControlProps<string> = {
    value: defaultValue,
    renderValue: defaultRenderValue,
  },
) => {
  const { value, renderValue } = props;
  return render(
    <FieldArrayValueInlineControl
      {...props}
      renderValue={renderValue}
      value={value}
      data-testid={testId}
    />,
  );
};

const getRender = () => screen.getByTestId(testId);
const getInput = () =>
  getRender().querySelector(
    `.${cnFieldArrayValueInlineControl('Input')}`,
  ) as HTMLInputElement;
const getValue = () => getRender().querySelectorAll(`.${cnRenderValueItem()}`);
const getValueItem = (index: number = 0) => getValue()[index];

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка ref', () => {
    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        ref: (el) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка className', () => {
    it(`Присваивается дополнительный className`, () => {
      const className = 'className';

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        className,
        children: undefined,
      });
      expect(getRender()).toHaveClass(className);
    });
  });
  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      it(`присваивается  ${prop}=${prop}`, () => {
        renderComponent({
          value: defaultValue,
          renderValue: defaultRenderValue,
          [prop]: prop,
        });

        expect(getRender()).toHaveAttribute(prop, prop);
      });
    });
  });

  describe('проверка inputRef', () => {
    it(`inputRef присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        ref: (el) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка inputMaxLength', () => {
    it(`inputMaxLength ограничивает ввод`, async () => {
      const user = userEvent.setup();
      const inputMaxLength = 4;

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        inputMaxLength,
      });

      await user.type(getInput(), 'hello word');
      expect(getInput()).toHaveValue('hell');
    });
  });

  describe('проверка inputDefaultValue', () => {
    it(`inputDefaultValue присваивается`, async () => {
      const inputDefaultValue = 'hello word';

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        inputDefaultValue,
      });

      expect(getInput()).toHaveValue(inputDefaultValue);
    });
  });

  describe('проверка value и renderValue', () => {
    it(`количество элементов совпадает с переданным`, async () => {
      renderComponent();

      expect(getValue().length).toEqual(defaultValue.length);
    });
    it(`рендер элемента корректный`, async () => {
      renderComponent();
      const index = 0;

      expect(getValueItem(index)).toHaveAttribute('data-index', `${index}`);
      expect(getValueItem(index)).toHaveTextContent(defaultValue[index]);
    });
  });
  describe('проверка input', () => {
    it('input получает корректный placeholder, если value пустое', () => {
      const placeholder = 'Введите значение';

      renderComponent({
        renderValue: defaultRenderValue,
        placeholder,
        value: [],
      });
      expect(getInput()).toHaveAttribute('placeholder', placeholder);
    });

    it('input не получает placeholder, если value не пустое', () => {
      const placeholder = 'Введите значение';

      renderComponent({
        renderValue: defaultRenderValue,
        placeholder,
        value: ['значение'],
      });
      expect(getInput()).not.toHaveAttribute('placeholder');
    });

    it('input получает корректный tabIndex', () => {
      const inputTabIndex = 5;

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        inputTabIndex,
      });
      expect(getInput()).toHaveAttribute('tabIndex', `${inputTabIndex}`);
    });

    it('input получает корректный aria-label', () => {
      const inputAriaLabel = 'Поле ввода';

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        inputAriaLabel,
      });
      expect(getInput()).toHaveAttribute('aria-label', inputAriaLabel);
    });

    it('input становится disabled, если передан disabled=true', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        disabled: true,
      });
      expect(getInput()).toBeDisabled();
    });
  });

  describe('проверка handleChange', () => {
    it('handleChange обновляет значение input', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = getInput();
      await user.type(input, 'новое значение');
      expect(input).toHaveValue('новое значение');
    });

    it('handleChange вызывает onChange', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        onChange,
      });

      const input = getInput();
      await user.type(input, 'новое значение');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('проверка стилей', () => {
    it('применяются корректные стили для gap', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        size: 'l',
      });
      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-items-gap: calc(var(--space-3xs) + var(--space-2xs))',
      );
    });

    it('применяются корректные стили для inputMinWidth', () => {
      renderComponent();
      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-input-min-width: 0px',
      );
    });

    it('применяются корректные стили для verticalPadding', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        size: 'm',
      });
      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-vertical-padding: calc(var(--space-xs) - var(--space-3xs))',
      );
    });

    it('применяются корректные стили для inputHeight', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        size: 's',
      });
      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-input-height: var(--space-xl)',
      );
    });
  });
  describe('проверка fakeInputRef', () => {
    it('fakeInputRef отображает корректное значение inputValue', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        inputDefaultValue: 'тестовое значение',
      });

      const fakeInput = getRender().querySelector(
        `.${cnFieldArrayValueInlineControl('HelperInputFakeElement')}`,
      );

      expect(fakeInput).toHaveTextContent('тестовое значение');
    });
  });

  describe('проверка handleChange', () => {
    it('handleChange обновляет inputValue и вызывает onChange', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        onChange,
      });

      const input = getInput();
      await user.type(input, 'новое значение');

      expect(input).toHaveValue('новое значение');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('проверка стилей', () => {
    it('применяются корректные стили для gap', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        size: 'l',
      });

      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-items-gap: calc(var(--space-3xs) + var(--space-2xs))',
      );
    });

    it('применяются корректные стили для verticalPadding', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        size: 'm',
      });

      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-vertical-padding: calc(var(--space-xs) - var(--space-3xs))',
      );
    });

    it('применяются корректные стили для inputHeight', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        size: 's',
      });

      expect(getRender()).toHaveStyle(
        '--field-array-value-inline-control-input-height: var(--space-xl)',
      );
    });
  });

  describe('проверка autoFocus', () => {
    it('input получает фокус при autoFocus=true', () => {
      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        autoFocus: true,
      });

      expect(getInput()).toHaveFocus();
    });
  });

  describe('проверка inputDefaultValue', () => {
    it('inputDefaultValue корректно отображается в input', () => {
      const inputDefaultValue = 'тестовое значение';

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        inputDefaultValue,
      });

      expect(getInput()).toHaveValue(inputDefaultValue);
    });
  });

  describe('проверка style', () => {
    it('применяется переданный style', () => {
      const customStyle = { backgroundColor: 'red', padding: '10px' };

      renderComponent({
        value: defaultValue,
        renderValue: defaultRenderValue,
        style: customStyle,
      });

      expect(getRender()).toHaveStyle('background-color: red');
      expect(getRender()).toHaveStyle('padding: 10px');
    });
  });
});
