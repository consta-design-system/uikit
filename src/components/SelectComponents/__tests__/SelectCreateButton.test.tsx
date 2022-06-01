import React from 'react';
import { render, screen } from '@testing-library/react';

import { cnSelectCreateButton, SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { propSize } from '../types';

type Props = React.ComponentProps<typeof SelectCreateButton>;

const testId = 'selectCreateButtonTestId';

const defaultProps: Props = {
  active: false,
  hovered: false,
  size: 's',
  indent: 'normal',
};

const renderComponent = (props: Props) => {
  return render(<SelectCreateButton {...props} data-testid={testId} />);
};

const getRender = () => {
  return screen.getByTestId(testId);
};

describe('Компонент SelectCreateButton', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    it('должен отображаться labelForCreate', () => {
      const labelForCreate = 'Test label';
      renderComponent({ ...defaultProps, labelForCreate });

      expect(getRender()).toHaveTextContent(labelForCreate);
    });
    it('должен отображаться inputValue', () => {
      const inputValue = 'Test value';
      renderComponent({ ...defaultProps, inputValue });

      expect(getRender()).toHaveTextContent(inputValue);
    });
    it('должен иметь класс при active = true', () => {
      renderComponent({ ...defaultProps, active: true });

      expect(getRender()).toHaveClass(cnSelectCreateButton({ active: true }));
    });
    it('должен иметь класс при hovered = true', () => {
      renderComponent({ ...defaultProps, hovered: true });

      expect(getRender()).toHaveClass(cnSelectCreateButton({ hovered: true }));
    });

    describe('проверка size', () => {
      propSize.forEach((size) => {
        it(`должен иметь класс для size = ${size}`, () => {
          renderComponent({ ...defaultProps, size });
          expect(getRender()).toHaveClass(cnSelectCreateButton({ size }));
        });
      });
    });

    describe('проверка indent', () => {
      (['normal', 'increased'] as const).forEach((indent) => {
        it(`должен иметь класс для indent = ${indent}`, () => {
          renderComponent({ ...defaultProps, indent });
          expect(getRender()).toHaveClass(cnSelectCreateButton({ indent }));
        });
      });
    });
  });
});
