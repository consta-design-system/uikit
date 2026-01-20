import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnFieldControlLayout,
  FieldControlLayout,
  FieldControlLayoutProps,
} from '..';

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
    --field-control-layout-padding-bottom: 0px;
    --field-control-layout-padding-left: calc(var(--field-control-layout-space) + var(--field-control-layout-additional-padding-left, 0px));
    --field-control-layout-padding-right: calc(var(--field-control-layout-space) + var(--field-control-layout-additional-padding-right, 0px));
    --field-control-layout-padding-top: 0px;
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
  it('Компонент корректно обрабатывает состояние hovered', () => {
    renderComponent();

    const element = getRender();
    expect(element).not.toHaveStyle(
      '--field-control-layout-border-color: var(--color-control-bg-border-default-hover)',
    );

    fireEvent.mouseEnter(element);

    expect(element).toHaveStyle(
      '--field-control-layout-border-color: var(--color-control-bg-border-default-hover)',
    );

    fireEvent.mouseLeave(element);

    expect(element).not.toHaveStyle(
      '--field-control-layout-border-color: var(--color-control-bg-border-default-hover)',
    );
  });

  it('Компонент корректно обрабатывает состояние disabled', () => {
    renderComponent({ disabled: true });

    expect(getRender()).toHaveClass(cnFieldControlLayout({ disabled: true }));
    expect(getRender()).toHaveStyle(
      '--field-control-layout-bg-color: var(--color-control-bg-disable)',
    );
  });

  it('Компонент корректно обрабатывает состояние focused', () => {
    renderComponent({ focused: true });

    expect(getRender()).toHaveStyle(
      '--field-control-layout-border-color: var(--color-control-bg-border-focus)',
    );
  });

  it('Компонент корректно обрабатывает разные размеры', () => {
    renderComponent({ size: 's' });
    expect(getRender()).toHaveStyle(
      '--field-control-layout-height: var(--control-height-s)',
    );
  });

  it('Компонент корректно обрабатывает разные формы', () => {
    renderComponent({ form: 'round' });
    expect(getRender()).toHaveStyle(
      '--field-control-layout-border-radius: calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2)',
    );
  });

  it('Компонент корректно обрабатывает разные виды отображения (view)', () => {
    renderComponent({ view: 'clear' });
    expect(getRender()).toHaveStyle('--field-control-layout-border-width: 0px');
  });
});
