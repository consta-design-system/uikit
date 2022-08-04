import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnHeaderLogo, HeaderLogo } from '../Logo/HeaderLogo';

type HeaderLogoProps = React.ComponentProps<typeof HeaderLogo>;

const testId = cnHeaderLogo();

const renderComponent = (props: HeaderLogoProps) => {
  return render(<HeaderLogo data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент HeaderLogo', () => {
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
    describe('проверка children', () => {
      it(`children отображается`, () => {
        const children = 'children';

        renderComponent({ children });

        const element = getRender() as HTMLDivElement;

        expect(element.textContent).toEqual(children);
      });
    });
  });
});
