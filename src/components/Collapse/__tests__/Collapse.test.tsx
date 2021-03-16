import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { cnCollapse, Collapse } from '../Collapse';

const testId = cnCollapse();

const defaultChildren = 'Default children';
const defaultLabel = 'Default label';

const renderComponent = ({
  label = defaultLabel,
  children = defaultChildren,
  isOpen = false,
  ...props
}) => {
  return render(
    <Collapse {...props} data-testid={testId} isOpen={isOpen} label={label}>
      {children}
    </Collapse>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLabel() {
  return getRender().querySelector(`.${cnCollapse('Label')}`);
}

describe('Компонент Collapse', () => {
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
    describe('проверка label', () => {
      it(`label отображается`, () => {
        const label = 'fileName';

        renderComponent({ label });

        const labelElement = getLabel() as HTMLDivElement;

        expect(labelElement.textContent).toEqual(label);
      });
    });
    describe('проверка onClick', () => {
      it(`клик должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleClick = jest.fn();

        renderComponent({ onClick: handleClick });

        const element = getLabel() as HTMLButtonElement;

        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalled();
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
