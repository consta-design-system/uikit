import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnText, Text } from '../Text';

type TagProps = React.ComponentProps<typeof Text>;

const testId = cnText();

const renderComponent = (props: TagProps) => {
  return render(<Text data-testid={testId} {...props} />);
};

describe('Компонент Текст', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка className', () => {
      const className = 'className';

      it(`присваивает className`, () => {
        renderComponent({ className });

        const tagBase = screen.getByTestId(testId);

        expect(tagBase).toHaveClass(className);
      });
    });
  });
});
