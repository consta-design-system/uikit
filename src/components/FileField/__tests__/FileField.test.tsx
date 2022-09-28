import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Button, cnButton } from '../../Button/Button';
import { cnFileField, FileField } from '../FileField';

const testId = cnFileField();

const renderComponent = () => {
  return render(
    <FileField id={testId}>
      {(props) => <Button data-testid={testId} label="label" {...props} />}
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
      it(`прокинутый компонент имеет тег span`, () => {
        renderComponent();
        const fileField = screen.getByTestId(testId);
        expect(fileField.tagName).toEqual('SPAN');
      });
    });
  });
});
