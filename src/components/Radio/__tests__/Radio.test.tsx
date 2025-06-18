import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnRadio, Radio } from '../Radio';

type RadioProps = React.ComponentProps<typeof Radio>;

const testId = cnRadio();

const defaultHandleChange = jest.fn();

const renderComponent = ({
  onChange = defaultHandleChange,
  checked = false,
  ...props
}: Omit<RadioProps, 'onChange' | 'checked'> & {
  onChange?: RadioProps['onChange'];
  checked?: RadioProps['checked'];
}) => {
  return render(
    <Radio
      data-testid={testId}
      onChange={onChange}
      checked={checked}
      {...props}
    />,
  );
};

const sizes = ['xs', 's', 'm', 'l'] as const;
const views = ['ghost', 'primary'] as const;
const aligns = ['center', 'top'] as const;

const getRender = () => screen.getByTestId(testId) as HTMLLabelElement;

const getInput = () => getRender().querySelector('input') as HTMLInputElement;

const getLabel = () =>
  getRender().querySelector(`.${cnRadio('Label')}`) as HTMLSpanElement;

describe('Компонент Radio', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка className', () => {
    it(`Присваивается дополнительный className`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
  describe('проверка label', () => {
    it(`label отображается`, () => {
      const label = 'fileName';
      renderComponent({ label });
      expect(getLabel().textContent).toEqual(label);
    });
  });
  describe('проверка onChange', () => {
    it(`клик должен вызвать callback c ожидаемыми параметрами`, () => {
      const handleChange = jest.fn();

      renderComponent({ onChange: handleChange });

      const element = getRender() as HTMLLabelElement;

      fireEvent.click(element);
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('проверка checked', () => {
    it(`checked должен быть true`, () => {
      renderComponent({ checked: true });

      expect(getInput().checked).toBe(true);
    });

    it(`checked должен быть false`, () => {
      renderComponent({ checked: false });

      expect(getInput().checked).toBe(false);
    });

    it(`checked должен быть false по умолчанию`, () => {
      renderComponent({});

      expect(getInput().checked).toBe(false);
    });
  });

  describe('проверка sizes', () => {
    sizes.forEach((size) => {
      it(`size ${size} должен быть отображен`, () => {
        renderComponent({ size });

        expect(getRender()).toHaveClass(cnRadio({ size }));
      });
    });
  });

  describe('проверка views', () => {
    views.forEach((view) => {
      it(`view ${view} должен быть отображен`, () => {
        renderComponent({ view });

        expect(getRender()).toHaveClass(cnRadio({ view }));
      });
    });
  });

  describe('проверка disabled', () => {
    it(`disabled должен быть отображен`, () => {
      renderComponent({ disabled: true });

      expect(getInput()).toBeDisabled();
    });

    it(`disabled должен быть false по умолчанию`, () => {
      renderComponent({});

      expect(getInput()).not.toBeDisabled();
    });
  });

  describe('проверка style', () => {
    it(`style должен быть отображен`, () => {
      renderComponent({ style: { color: 'red' } });

      expect(getRender()).toHaveStyle('color: red');
    });
  });

  describe('проверка ref', () => {
    it(`ref должен быть отображен`, () => {
      const ref = React.createRef<HTMLLabelElement>();

      renderComponent({ ref });

      expect(ref.current).toBe(getRender());
    });
  });

  describe('проверка onFocus', () => {
    it(`onFocus должен быть отображен`, () => {
      const onFocus = jest.fn();

      renderComponent({ onFocus });

      fireEvent.focus(getInput());

      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe('проверка onBlur', () => {
    it(`onBlur должен быть отображен`, () => {
      const onBlur = jest.fn();

      renderComponent({ onBlur });

      fireEvent.blur(getInput());

      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('проверка readOnly', () => {
    it(`readOnly должен быть отображен`, () => {
      renderComponent({ readOnly: true });

      expect(getInput()).toHaveAttribute('readonly');
    });
  });

  describe('проверка name', () => {
    it(`name должен быть отображен`, () => {
      const name = 'name';

      renderComponent({ name });

      expect(getInput()).toHaveAttribute('name', name);
    });
  });

  describe('проверка tabIndex', () => {
    it(`tabIndex должен быть отображен`, () => {
      const tabIndex = 0;

      renderComponent({ tabIndex });

      expect(getInput()).toHaveAttribute('tabindex', tabIndex.toString());
    });
  });

  describe('проверка onKeyDown', () => {
    it(`onKeyDown должен быть отображен`, () => {
      const onKeyDown = jest.fn();

      renderComponent({ onKeyDown });

      fireEvent.keyDown(getInput());

      expect(onKeyDown).toHaveBeenCalled();
    });
  });

  describe('проверка required', () => {
    it(`required должен быть отображен`, () => {
      renderComponent({ required: true });

      expect(getInput()).toHaveAttribute('required');
    });
  });

  describe('проверка inputId', () => {
    it(`inputId должен быть отображен`, () => {
      const inputId = 'inputId';

      renderComponent({ inputId });

      expect(getInput()).toHaveAttribute('id', inputId);
    });
  });

  describe('проверка inputRef', () => {
    it(`inputRef должен быть отображен`, () => {
      const inputRef = React.createRef<HTMLInputElement>();

      renderComponent({ inputRef });

      expect(inputRef.current).toBe(getInput());
    });
  });

  describe('проверка align', () => {
    aligns.forEach((align) => {
      it(`align ${align} должен быть отображен`, () => {
        renderComponent({ align });

        expect(getRender()).toHaveClass(cnRadio({ align }));
      });
    });
  });
});
