import { render, RenderResult, screen } from '@testing-library/react';
import * as React from 'react';

import { cnSelect } from '##/components/SelectComponents/cnSelect';

import {
  SelectContainer,
  SelectContainerProps,
} from '../SelectContainer/SelectContainer';

const testId = 'selectContainer';

const renderComponent = (
  props: Omit<SelectContainerProps, 'children'>,
): RenderResult => {
  return render(
    <SelectContainer {...props} data-testid={testId}>
      <div data-testid="content" />
    </SelectContainer>,
  );
};

const getRender = () => screen.getByTestId(testId);
const getSelectContainer = () =>
  getRender().querySelector(`.${cnSelect('SelectContainer')}`);

describe('Компонент Container', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('добавляется фокус', () => {
    renderComponent({ focused: true });

    expect(getSelectContainer()).toHaveClass(
      cnSelect('SelectContainer', { focused: true }),
    );
  });

  it('добавляется класс disabled', () => {
    renderComponent({ disabled: true });

    expect(getSelectContainer()).toHaveClass(
      cnSelect('SelectContainer', { disabled: true }),
    );
  });
});
