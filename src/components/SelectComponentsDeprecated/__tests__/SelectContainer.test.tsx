import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';

import { cnSelect } from '../cnSelect';
import {
  SelectContainer,
  SelectContainerProps,
} from '../SelectContainer/SelectContainer';

const renderComponent = (
  props: Omit<SelectContainerProps, 'children'>,
): RenderResult => {
  return render(
    <SelectContainer {...props}>
      <div data-testid="content" />
    </SelectContainer>,
  );
};

describe('Компонент Container', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('добавляется фокус', () => {
    const component = renderComponent({ focused: true });

    expect(
      component.container.querySelector(`.${cnSelect('SelectContainer')}`),
    ).toHaveClass(cnSelect('SelectContainer', { focused: true }));
  });

  it('добавляется класс disabled', () => {
    const component = renderComponent({ disabled: true });

    expect(
      component.container.querySelector(`.${cnSelect('SelectContainer')}`),
    ).toHaveClass(cnSelect('SelectContainer', { disabled: true }));
  });
});
