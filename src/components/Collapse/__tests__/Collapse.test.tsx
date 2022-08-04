import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnCollapse, Collapse } from '../Collapse';

const testId = cnCollapse();

const defaultChildren = 'Default children';
const defaultLabel = 'Default label';
const additionalClass = 'additionalClass';

const renderComponent = ({
  label = defaultLabel,
  children = defaultChildren,
  isOpen = false,
  ...props
}) => {
  return render(
    <Collapse
      {...props}
      className={additionalClass}
      data-testid={testId}
      isOpen={isOpen}
      label={label}
    >
      {children}
    </Collapse>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLabelText() {
  return getRender().querySelector(`.${cnCollapse('LabelText')}`);
}

describe('Компонент Collapse', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка label', () => {
      it(`label отображается`, () => {
        const label = 'fileName';

        renderComponent({ label });

        const labelElement = getLabelText() as HTMLDivElement;

        expect(labelElement.textContent).toEqual(label);
      });
    });
    describe('проверка onClick', () => {
      it(`клик должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleClick = jest.fn();

        renderComponent({ onClick: handleClick });

        const element = getLabelText() as HTMLDivElement;

        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalled();
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
