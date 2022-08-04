import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnHeader, Header } from '../Header';

type HeaderProps = React.ComponentProps<typeof Header>;

const testId = cnHeader();

const renderComponent = (props: HeaderProps) => {
  return render(<Header data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLeftSide() {
  return getRender().querySelector(`.${cnHeader('LeftSide')}`);
}

function getRightSide() {
  return getRender().querySelector(`.${cnHeader('RightSide')}`);
}

describe('Компонент Header', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Дополнительный className присваевается`, () => {
        const className = 'className';

        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка leftSide', () => {
      it(`leftSide отображается`, () => {
        const leftSide = 'leftSide';

        renderComponent({ leftSide });

        const leftSideElement = getLeftSide() as HTMLDivElement;

        expect(leftSideElement.textContent).toEqual(leftSide);
      });
    });
    describe('проверка leftSide', () => {
      it(`leftSide отображается`, () => {
        const rightSide = 'rightSide';

        renderComponent({ rightSide });

        const rightSideElement = getRightSide() as HTMLDivElement;

        expect(rightSideElement.textContent).toEqual(rightSide);
      });
    });
  });
});
