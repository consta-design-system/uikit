import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnTimer, Timer } from '../Timer';

type TimerProps = React.ComponentProps<typeof Timer>;

const testId = cnTimer();

const renderComponent = (props: TimerProps) => {
  return render(<Timer data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент Timer', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка className', () => {
      const className = 'className';

      it(`присваивает className`, () => {
        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка seconds', () => {
      const seconds = 5;

      it(`секунды отображаются`, () => {
        renderComponent({ seconds });
        expect(getRender()).toHaveTextContent(seconds.toString());
      });
      it(`секунды не отображаются если size != m`, () => {
        renderComponent({ seconds, size: 's' });
        expect(getRender()).toHaveTextContent('');
      });
    });
  });
});
