import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnLoader, Loader, loaderPropSize } from '../Loader';

type FileProps = React.ComponentProps<typeof Loader>;

const testId = cnLoader();

const renderComponent = (props: FileProps = {}) => {
  return render(<Loader data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент File', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      loaderPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          expect(getRender()).toHaveClass(cnLoader({ size }));
        });
      });
    });
  });
});
