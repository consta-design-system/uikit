import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnHeaderModule, HeaderModule } from '../Module/HeaderModule';

type HeaderModuleProps = React.ComponentProps<typeof HeaderModule>;

const testId = cnHeaderModule();

const renderComponent = (props: HeaderModuleProps) => {
  return render(<HeaderModule data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент HeaderModule', () => {
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
