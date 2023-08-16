import { render, screen } from '@testing-library/react';
import React from 'react';

import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';

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
  });
});
