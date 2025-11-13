import { render, screen } from '@testing-library/react';
import React from 'react';

import { cnGridItem, GridItem } from '../GridItem';

type GridProps = React.ComponentProps<typeof GridItem>;

const testId = cnGridItem();
const children = 'children';

const renderComponent = (props: GridProps = {}) => {
  return render(
    <GridItem data-testid={testId} {...props}>
      {props.children || children}
    </GridItem>,
  );
};

const getRender = () => screen.getByTestId(testId);

describe('Компонент GridItem', () => {
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

  it('должен устанавливать col', () => {
    const col = 2;
    renderComponent({ col });
    expect(getRender()).toHaveClass(cnGridItem({ col }));
    expect(getRender()).toHaveStyle({ '--grid-item-col-end': `${col}` });
  });

  it('должен устанавливать colStart', () => {
    const colStart = 2;
    renderComponent({ colStart });
    expect(getRender()).toHaveClass(cnGridItem({ colStart }));
    expect(getRender()).toHaveStyle({
      '--grid-item-col-start': `${colStart} / span`,
    });
  });

  it('должен устанавливать row', () => {
    const row = 2;
    renderComponent({ row });
    expect(getRender()).toHaveClass(cnGridItem({ row }));
    expect(getRender()).toHaveStyle({ '--grid-item-row-end': `${row}` });
  });

  it('должен устанавливать rowStart', () => {
    const rowStart = 2;
    renderComponent({ rowStart });
    expect(getRender()).toHaveClass(cnGridItem({ rowStart }));
    expect(getRender()).toHaveStyle({
      '--grid-item-row-start': `${rowStart} / span`,
    });
  });

  it('должен устанавливать order', () => {
    const order = 1;
    renderComponent({ order });
    expect(getRender()).toHaveClass(cnGridItem({ order }));
    expect(getRender()).toHaveStyle({ '--gird-item-order': `${order}` });
  });
});
