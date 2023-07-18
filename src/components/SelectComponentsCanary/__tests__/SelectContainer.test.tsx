import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';

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
      component.container.querySelector('.Select-SelectContainer'),
    ).toHaveClass('Select-SelectContainer_focused');
  });

  it('добавляется класс disabled', () => {
    const component = renderComponent({ disabled: true });

    expect(
      component.container.querySelector('.Select-SelectContainer'),
    ).toHaveClass('Select-SelectContainer_disabled');
  });
});
