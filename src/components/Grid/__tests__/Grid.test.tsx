import { render, screen } from '@testing-library/react';
import React from 'react';

import { cnGrid, Grid } from '../Grid';
import { gridPropGap, gridPropXAlign, gridPropYAlign } from '../types';

type GridProps = React.ComponentProps<typeof Grid>;

const testId = cnGrid();
const children = 'children';

const renderComponent = (props: GridProps = {}) => {
  return render(
    <Grid data-testid={testId} {...props}>
      {props.children || children}
    </Grid>,
  );
};

const getRender = () => screen.getByTestId(testId);

describe('Компонент Grid', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent()).not.toThrow();
  });

  it('должен рендерить children', () => {
    renderComponent();
    expect(getRender()).toHaveTextContent(children);
  });

  it('должен устанавливать className', () => {
    const className = 'test-class';
    renderComponent({ className });
    expect(getRender()).toHaveClass(className);
  });

  it('должен передавать ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ ref });
    expect(ref.current).toBe(getRender());
  });

  it('должен рендериться с тегом, переданным в as', () => {
    renderComponent({ as: 'section' });
    expect(getRender().tagName).toBe('SECTION');
  });

  it('должен устанавливать cols', () => {
    const cols = 3;
    renderComponent({ cols });
    expect(getRender()).toHaveClass(cnGrid({ cols }));
    expect(getRender()).toHaveStyle({ '--grid-cols': `${cols}` });
  });

  test.each(gridPropGap)('присваивает класс для gap=%s', (gap) => {
    renderComponent({ gap });
    expect(getRender()).toHaveClass(cnGrid({ gap }));
  });

  test.each(gridPropGap)('присваивает класс для colGap=%s', (colGap) => {
    renderComponent({ colGap });
    expect(getRender()).toHaveClass(cnGrid({ colGap }));
  });

  test.each(gridPropGap)('присваивает класс для rowGap=%s', (rowGap) => {
    renderComponent({ rowGap });
    expect(getRender()).toHaveClass(cnGrid({ rowGap }));
  });

  test.each(gridPropXAlign)('присваивает класс для xAlign=%s', (xAlign) => {
    renderComponent({ xAlign });
    expect(getRender()).toHaveClass(cnGrid({ xAlign }));
  });

  test.each(gridPropYAlign)('присваивает класс для yAlign=%s', (yAlign) => {
    renderComponent({ yAlign });
    expect(getRender()).toHaveClass(cnGrid({ yAlign }));
  });
});
