import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { TextField } from '../TextFieldCanary';

const testId = 'TextFieldCanary';

describe('Компонент TextFieldCanary', () => {
  describe('проверка inputMode', () => {
    (['text', 'password', 'number', 'textarray'] as const).forEach((type) => {
      it(`передает inputMode в input для type=${type}`, () => {
        render(
          <TextField data-testid={testId} type={type} inputMode="numeric" />,
        );

        const root = screen.getByTestId(testId);

        expect(root.querySelector('input')).toHaveAttribute(
          'inputmode',
          'numeric',
        );
        expect(root).not.toHaveAttribute('inputmode');
      });
    });

    it('передает inputMode в textarea', () => {
      render(
        <TextField data-testid={testId} type="textarea" inputMode="numeric" />,
      );

      const root = screen.getByTestId(testId);

      expect(root.querySelector('textarea')).toHaveAttribute(
        'inputmode',
        'numeric',
      );
      expect(root).not.toHaveAttribute('inputmode');
    });
  });
});
