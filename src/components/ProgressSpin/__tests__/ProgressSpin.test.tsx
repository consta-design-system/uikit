import React from 'react';
import { render, screen } from '@testing-library/react';

import { cnProgressSpin, ProgressSpin } from '../ProgressSpin';

type ProgressSpinProps = React.ComponentProps<typeof ProgressSpin>;

const testId = cnProgressSpin();

function getRender() {
  return screen.getByTestId(testId);
}

const renderComponent = (props: ProgressSpinProps) => {
  return render(<ProgressSpin {...props} data-testid={testId} />);
};

describe('Компонент ProgressSpin', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    it('дополнительный класс присваевается', () => {
      const className = 'className';
      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
});
