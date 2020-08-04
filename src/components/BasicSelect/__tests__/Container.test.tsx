import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Container } from '../Container';
import { ContainerProps } from '../Container/Container';

const renderComponent = (props: Omit<ContainerProps, 'children'>): RenderResult => {
  return render(
    <Container {...props}>
      <div data-testid="content" />
    </Container>,
  );
};

describe('Компонент Container', () => {
  it('должен рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('добавляется фокус', () => {
    const component = renderComponent({ focused: true });

    expect(component.container.querySelector('.Select')).toHaveClass('Select_focused');
  });

  it('добавляется класс disabled', () => {
    const component = renderComponent({ disabled: true });

    expect(component.container.querySelector('.Select')).toHaveClass('Select_disabled');
  });
});
