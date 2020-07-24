import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Button, cnButton } from '../../Button/Button';
import { cnFileField, FileField } from '../FileField';

const testId = cnFileField();

const renderComponent = () => {
  const onChange = jest.fn();
  return render(
    <FileField onChange={onChange} value={null}>
      {({ onClick }) => <Button data-testid={testId} label="label" onClick={onClick} />}
    </FileField>,
  );
};

describe('Компонент FileField', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка children', () => {
      it(`отображается прокинутый компонент`, () => {
        renderComponent();
        const fileField = screen.getByTestId(testId);
        expect(fileField).toHaveClass(cnButton());
      });
    });
  });
});
