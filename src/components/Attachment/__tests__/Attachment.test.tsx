import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { Attachment, cnAttachment } from '../Attachment';

type AttachmentProps = React.ComponentProps<typeof Attachment>;

const testId = cnAttachment();

const renderComponent = (props: AttachmentProps) => {
  return render(<Attachment data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getFileName() {
  return getRender().querySelector(`.${cnAttachment('FileName')}`);
}

function getFileDescription() {
  return getRender().querySelector(`.${cnAttachment('FileDescription')}`);
}

function getErrorText() {
  return getRender().querySelector(`.${cnAttachment('ErrorText')}`);
}

function getLoadingText() {
  return getRender().querySelector(`.${cnAttachment('LoadingText')}`);
}

function getButton() {
  return getRender().querySelector(`.${cnAttachment('Button')}`);
}

describe('Компонент Attachment', () => {
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
    describe('проверка as', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ as: el });
          expect(getRender().tagName).toEqual(el.toUpperCase());
        });
      });
    });
    describe('проверка fileName', () => {
      it(`fileName отображается`, () => {
        const fileName = 'fileName';

        renderComponent({ fileName });

        const fileNameElement = getFileName() as HTMLDivElement;

        expect(fileNameElement.textContent).toEqual(fileName);
      });
    });
    describe('проверка fileDescription', () => {
      it(`fileDescription отображается`, () => {
        const fileDescription = 'fileDescription';

        renderComponent({ fileDescription });

        const fileDescriptionElement = getFileDescription() as HTMLDivElement;

        expect(fileDescriptionElement.textContent).toEqual(fileDescription);
      });
    });
    describe('проверка errorText', () => {
      it(`errorText отображается`, () => {
        const errorText = 'errorText';

        renderComponent({ errorText });

        const errorTextElement = getErrorText() as HTMLDivElement;

        expect(errorTextElement.textContent).toEqual(errorText);
      });
    });
    describe('проверка loading', () => {
      it(`fileDescription не отображается если loading=true`, () => {
        const fileDescription = 'fileDescription';

        renderComponent({ fileDescription, loading: true });
        expect(getFileDescription()).toEqual(null);
      });
      it(`loadingText отображается если loading=true`, () => {
        const loadingText = 'loadingText';

        renderComponent({ loadingText, loading: true });

        const loadingTextElement = getLoadingText() as HTMLDivElement;

        expect(loadingTextElement.textContent).toEqual(`${loadingText}...`);
      });
      it(`отображается loadingProgress после loadingText`, () => {
        const loadingText = 'loadingText';
        const loadingProgress = 5;

        renderComponent({ loadingText, loading: true, loadingProgress });

        const loadingTextElement = getLoadingText() as HTMLDivElement;

        expect(loadingTextElement.textContent).toEqual(
          `${loadingText} ${loadingProgress}%`,
        );
      });
      it(`loadingText не отображается если loading=false`, () => {
        const loadingText = 'loadingText';

        renderComponent({ loadingText });

        expect(getLoadingText()).toEqual(null);
      });
    });
    describe('проверка onButtonClick', () => {
      it(`событие на кнопке срабатывает`, () => {
        const handleClick = jest.fn();

        renderComponent({ onButtonClick: handleClick });

        const buttonElement = getButton() as HTMLButtonElement;

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка onClick', () => {
      it(`событие срабатывает`, () => {
        const handleClick = jest.fn();

        renderComponent({ onClick: handleClick });

        const buttonElement = getRender() as HTMLButtonElement;

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
