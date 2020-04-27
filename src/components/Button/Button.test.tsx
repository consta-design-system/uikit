import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button, ButtonProps, ButtonPropWidth } from './Button';

const testId = 'button';

const renderComponent = (props: ButtonProps = {}) => {
  const { label = 'Текст кнопки', ...rest } = props;
  return render(<Button data-testid={testId} label={label} {...rest} />);
};

describe('Компонент Button', () => {
  it('рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      const sizes = ['xs', 's', 'm', 'l'] as const;
      sizes.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          const button = screen.getByTestId(testId);

          expect(button.classList.contains(`Button_size_${size}`)).toBe(true);
        });
      });
    });

    describe('проверка view', () => {
      const views = ['clear', 'ghost', 'primary', 'secondary'] as const;
      views.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });

          const button = screen.getByTestId(testId);

          expect(button.classList.contains(`Button_view_${view}`)).toBe(true);
        });
      });
    });

    describe('проверка width', () => {
      const widths = ['full', 'default'] as const;
      widths.forEach((width) => {
        it(`присваивает класс для width=${width}`, () => {
          renderComponent({ width });

          const button = screen.getByTestId(testId);

          expect(button.classList.contains(`Button_width_${width}`)).toBe(true);
        });
      });
    });

    describe('проверка form', () => {
      const forms = [
        'default',
        'brick',
        'round',
        'brickRound',
        'roundBrick',
        'brickDefault',
        'defaultBrick',
      ] as const;

      forms.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });

          const button = screen.getByTestId(testId);

          expect(button.classList.contains(`Button_form_${form}`)).toBe(true);
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
        expect(button.classList.contains('Button_disabled')).toBe(true);
      });

      it('должен вешать класс disabled на <a> элемент', () => {
        const handleClick = jest.fn();

        renderComponent({ disabled: true, as: 'a', onClick: handleClick });

        const button = screen.getByTestId(testId);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);
        expect(button.classList.contains('Button_disabled')).toBe(true);
      });
    });

    it('должен работать обработчик onClick, если кнопка не отключена', () => {
      const handleClick = jest.fn();

      renderComponent({ onClick: handleClick });

      const button = screen.getByTestId(testId);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('должен отображать текст в кнопке', () => {
      const label = 'Это кнопка';

      renderComponent({ label });

      const button = screen.getByTestId(testId);

      expect(button.textContent).toEqual(label);
    });

    describe('проверка иконки', () => {
      it('должен отображать иконку слева', () => {
        const label = 'Текст кнопки';
        const iconLeftText = 'Иконка слева';
        const IconLeft = () => <span>{iconLeftText}</span>;

        renderComponent({ label, iconLeft: IconLeft });

        const button = screen.getByTestId(testId);

        expect(button.textContent).toEqual(iconLeftText + label);
      });

      it('должен отображать иконку справа', () => {
        const label = 'Текст кнопки';
        const iconRightText = 'Иконка справа';
        const IconRight = () => <span>{iconRightText}</span>;

        renderComponent({ label, iconRight: IconRight });

        const button = screen.getByTestId(testId);

        expect(button.textContent).toEqual(label + iconRightText);
      });

      it('должен отображать иконки слева и справа', () => {
        const label = 'Текст кнопки';
        const iconRightText = 'Иконка справа';
        const iconLeftText = 'Иконка слева';

        const IconLeft = () => <span>{iconLeftText}</span>;
        const IconRight = () => <span>{iconRightText}</span>;

        renderComponent({ label, iconRight: IconRight, iconLeft: IconLeft });

        const button = screen.getByTestId(testId);

        expect(button.textContent).toEqual(iconLeftText + label + iconRightText);
      });

      it('должен отображать только иконку', () => {
        const label = 'Текст кнопки';
        const iconLeftText = 'Иконка слева';

        const IconLeft = () => <span>{iconLeftText}</span>;

        renderComponent({ label, iconLeft: IconLeft, onlyIcon: true });

        const button = screen.getByTestId(testId);

        expect(button.textContent).toEqual(iconLeftText);
      });
    });
  });
});
