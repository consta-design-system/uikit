import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnHeaderButton, HeaderButton } from '../Button/HeaderButton';

type HeaderButtonProps = React.ComponentProps<typeof HeaderButton>;

const testId = cnHeaderButton();

const renderComponent = (props: HeaderButtonProps) => {
  return render(<HeaderButton data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент HeaderButton', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Дополнительный className присваевается`, () => {
        const className = 'className';

        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
  });
});
