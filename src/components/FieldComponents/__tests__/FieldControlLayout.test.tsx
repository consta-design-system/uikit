import { render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnFieldControlLayout,
  FieldControlLayout,
  FieldControlLayoutProps,
} from '../FieldControlLayout';

const testId = cnFieldControlLayout();

const renderComponent = (props: FieldControlLayoutProps = {}) => {
  return render(<FieldControlLayout data-testid={testId} {...props} />);
};

const getRender = () => screen.getByTestId(testId);
const getSlots = () =>
  getRender().querySelectorAll(`.${cnFieldControlLayout('Slot')}`);

describe('Компонент FieldControlLayout', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  it(`Присваивается дополнительный className`, () => {
    const className = 'className';

    renderComponent({ className });
    expect(getRender()).toHaveClass(className);
  });
  it('Указываются все css переменные', () => {
    renderComponent();

    expect(getRender()).toHaveStyle(`
    --field-control-layout-bg-color: var(--color-bg-default);
    --field-control-layout-border-color: var(--color-control-bg-border-default);
    --field-control-layout-border-radius: var(--control-radius) var(--control-radius) var(--control-radius) var(--control-radius);
    --field-control-layout-border-style: solid solid solid solid;
    --field-control-layout-border-width: var(--control-border-width);
    --field-control-layout-height: var(--control-height-m);
    --field-control-layout-padding: 0px var(--field-control-layout-space) 0px var(--field-control-layout-space);
    --field-control-layout-space: calc(var(--control-space-m) * 0.5);
    --field-control-layout-text-line-height: var(--line-height-text-m);
    --field-control-layout-text-size: var(--control-text-size-m);
    `);
  });
  it('Указываются все css переменные', () => {
    renderComponent();

    expect(getRender()).toHaveStyle(`
    --field-control-layout-bg-color: var(--color-bg-default);
    --field-control-layout-border-color: var(--color-control-bg-border-default);
    --field-control-layout-border-radius: var(--control-radius) var(--control-radius) var(--control-radius) var(--control-radius);
    --field-control-layout-border-style: solid solid solid solid;
    --field-control-layout-border-width: var(--control-border-width);
    --field-control-layout-height: var(--control-height-m);
    --field-control-layout-padding: 0px var(--field-control-layout-space) 0px var(--field-control-layout-space);
    --field-control-layout-space: calc(var(--control-space-m) * 0.5);
    --field-control-layout-text-line-height: var(--line-height-text-m);
    --field-control-layout-text-size: var(--control-text-size-m);
    `);
  });

  it('leftSide отображается верно', () => {
    renderComponent({ leftSide: ['1', 0, false, null] });

    expect(getSlots().length).toEqual(2);
  });

  it('rightSide отображается верно', () => {
    renderComponent({ rightSide: ['1', 0, false, null] });

    expect(getSlots().length).toEqual(2);
  });
});
