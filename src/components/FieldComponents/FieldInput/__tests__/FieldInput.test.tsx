import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { setRef } from '##/utils/setRef';

import { FieldInput } from '..';

type FieldCaptionProps = React.ComponentProps<typeof FieldInput>;

const testId = 'FieldInput';

const renderComponent = (props: FieldCaptionProps = {}) => {
  return render(<FieldInput data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);

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

  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      it(`присваивается  ${prop}=${prop}`, () => {
        renderComponent({ [prop]: prop });

        expect(getRender()).toHaveAttribute(prop, prop);
      });
    });
  });
  describe('проверка атрибутов input', () => {
    it('Присваивается placeholder', () => {
      const placeholder = 'Введите текст';

      renderComponent({ placeholder });
      expect(getRender()).toHaveAttribute('placeholder', placeholder);
    });

    it('Присваивается value', () => {
      const value = 'Тестовое значение';

      renderComponent({ value });
      expect(getRender()).toHaveAttribute('value', value);
    });

    it('Присваивается type', () => {
      const type = 'password';

      renderComponent({ type });
      expect(getRender()).toHaveAttribute('type', type);
    });

    it('Присваивается disabled', () => {
      renderComponent({ disabled: true });
      expect(getRender()).toBeDisabled();
    });

    it('Присваивается readonly', () => {
      renderComponent({ readOnly: true });
      expect(getRender()).toHaveAttribute('readonly');
    });
  });

  describe('проверка событий', () => {
    it('Срабатывает onChange', () => {
      const onChange = jest.fn();
      renderComponent({ onChange });

      fireEvent.change(getRender(), { target: { value: 'test' } });
      expect(onChange).toHaveBeenCalled();
    });

    it('Срабатывает onFocus', () => {
      const onFocus = jest.fn();
      renderComponent({ onFocus });

      getRender().focus();
      expect(onFocus).toHaveBeenCalled();
    });

    it('Срабатывает onBlur', () => {
      const onBlur = jest.fn();
      renderComponent({ onBlur });

      getRender().focus();
      getRender().blur();
      expect(onBlur).toHaveBeenCalled();
    });
  });
});
