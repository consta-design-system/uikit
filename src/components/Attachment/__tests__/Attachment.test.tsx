import { IconSave } from '@consta/icons/IconSave';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { IconMock } from '##/../__mocks__/IconMock';
import { setRef } from '##/utils/setRef';

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

function getActionsButtons() {
  return getRender().querySelectorAll(
    `.${cnAttachment('Actions')} .${cnAttachment('Button')}`,
  );
}

function getButtons() {
  return getRender().querySelectorAll(`.${cnAttachment('Button')}`);
}

function getButton(index = 0) {
  return getButtons()[index];
}

describe('Компонент Attachment', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка ref', () => {
    // const ref = useRef(null);

    it(`ref присвоен`, () => {
      const ref = { current: null };

      renderComponent({
        ref: (el: HTMLElement) => setRef(ref, el),
      });

      expect(ref.current).toBeTruthy();
    });
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Присваивается дополнительный className`, () => {
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

        renderComponent({ onButtonClick: handleClick, buttonIcon: IconSave });

        const buttonElement = getButton() as HTMLButtonElement;

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка onClick', () => {
      it(`событие срабатывает`, () => {
        const handleClick = jest.fn();

        renderComponent({ onClick: handleClick });

        const render = getRender() as HTMLButtonElement;

        fireEvent.click(render);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
    describe('проверка actions', () => {
      const actions = [
        {
          onClick: jest.fn(),
          title: 'action 1',
          icon: IconMock,
        },
        {
          onClick: jest.fn(),
          title: 'action 2',
          icon: IconMock,
        },
        {
          onClick: jest.fn(),
          title: 'action 3',
          icon: IconMock,
        },
      ];

      renderComponent({
        actions,
      });

      const buttons = getActionsButtons();

      fireEvent.click(buttons[0]);

      it(`Количество кнопок совпадает с ${actions.length}`, () => {
        expect(buttons.length).toEqual(actions.length);
      });

      it(`Отображается иконка`, () => {
        expect(buttons[0]).toHaveTextContent('IconMock');
      });

      it(`Обработка клика`, () => {
        expect(actions[0].onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
