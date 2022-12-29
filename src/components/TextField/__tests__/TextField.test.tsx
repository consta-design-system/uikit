import { IconAdd } from '@consta/icons/IconAdd';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnTextField,
  TextField,
  textFieldPropForm,
  textFieldPropSize,
  textFieldPropStatus,
  textFieldPropView,
  textFieldPropWidth,
} from '../TextField';

type TextFieldProps = React.ComponentProps<typeof TextField>;

const testId = cnTextField();

const renderComponent = (props: TextFieldProps = {}) => {
  return render(<TextField data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getInput() {
  return screen
    .getByTestId(testId)
    .querySelector(`input.${cnTextField('Input')}`);
}

function getInputContainer() {
  return screen.getByTestId(testId).querySelector(`.TextField-InputContainer`);
}

function getTextArea() {
  return screen
    .getByTestId(testId)
    .querySelector(`textarea.${cnTextField('Input')}`);
}

function getleftSide() {
  return screen
    .getByTestId(testId)
    .querySelector(`.TextField-Side_position_left`);
}

function getRightSide() {
  return screen
    .getByTestId(testId)
    .querySelector(`.TextField-Side_position_right`);
}

describe('Компонент Button', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка size', () => {
      textFieldPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });
          expect(getRender()).toHaveClass(cnTextField({ size }));
        });
      });
    });
    describe('проверка form', () => {
      textFieldPropForm.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });
          expect(getInputContainer()).toHaveClass(
            cnTextField('InputContainer', { form }),
          );
        });
      });
    });
    describe('проверка status', () => {
      textFieldPropStatus.forEach((status) => {
        it(`присваивает класс для status=${status}`, () => {
          renderComponent({ status });
          expect(getInputContainer()).toHaveClass(
            cnTextField('InputContainer', { status }),
          );
        });
      });
    });
    describe('проверка view', () => {
      textFieldPropView.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });
          expect(getRender()).toHaveClass(cnTextField({ view }));
        });
      });
    });
    describe('проверка width', () => {
      textFieldPropWidth.forEach((width) => {
        it(`присваивает класс для width=${width}`, () => {
          renderComponent({ width });
          expect(getRender()).toHaveClass(cnTextField({ width }));
        });
      });
    });
    describe('проверка type', () => {
      it(`по умолчанию рендерится как input`, () => {
        renderComponent();
        expect(getInput()).not.toBeNull();
      });
      it(`при type=textarea рендерится как textarea`, () => {
        renderComponent({ type: 'textarea' });
        expect(getTextArea()).not.toBeNull();
      });
    });
    describe('проверка onChange', () => {
      it(`в callback попадает ожидаемое value`, () => {
        const handleChange = jest.fn();
        const value = 'value';

        renderComponent({ onChange: handleChange });

        const input = getInput() as Element;

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value } });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value }),
        );
      });
    });
    describe('проверка className', () => {
      it(`присвоился дополнительный класс`, () => {
        const className = 'className';
        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка leftSide', () => {
      it(`отображается как текст`, () => {
        const leftSideText = 'leftSideText';

        renderComponent({ leftSide: leftSideText });

        const leftSide = getleftSide();

        expect(leftSide).toHaveClass(cnTextField('Side', { type: 'string' }));
        expect(leftSide).toHaveTextContent(leftSideText);
      });
      it(`отображается как иконка`, () => {
        renderComponent({ leftSide: IconAdd });

        const leftSide = getleftSide() as Element;

        expect(leftSide).toHaveClass(cnTextField('Side', { type: 'icon' }));

        const icon = leftSide.querySelector(`.${cnTextField('Icon')}`);

        expect(icon).toHaveClass('IconAdd');
      });
    });
    describe('проверка rightSide', () => {
      it(`отображается как текст`, () => {
        const rightSideText = 'rightSideText';

        renderComponent({ rightSide: rightSideText });

        const rightSide = getRightSide();

        expect(rightSide).toHaveClass(cnTextField('Side', { type: 'string' }));
        expect(rightSide).toHaveTextContent(rightSideText);
      });
      it(`отображается как иконка`, () => {
        renderComponent({ rightSide: IconAdd });

        const rightSide = getRightSide() as Element;

        expect(rightSide).toHaveClass(cnTextField('Side', { type: 'icon' }));

        const icon = rightSide.querySelector(`.${cnTextField('Icon')}`);

        expect(icon).toHaveClass('IconAdd');
      });
    });
  });
});
