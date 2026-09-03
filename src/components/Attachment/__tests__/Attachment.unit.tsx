import { IconSave } from '@consta/icons/IconSave';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Attachment, cnAttachment } from '../Attachment';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = cnAttachment();

type AttachmentProps = React.ComponentProps<typeof Attachment>;

const renderComponent = (ctx: TestContext, props: AttachmentProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Attachment data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLDivElement;

const getFileName = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnAttachment('FileName')}`);
};

const getFileDescription = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnAttachment('FileDescription')}`);
};

const getErrorText = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnAttachment('ErrorText')}`);
};

const getLoadingText = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnAttachment('LoadingText')}`);
};

const getActionsButtons = (ctx: TestContext) => {
  return getRender(ctx).querySelectorAll(
    `.${cnAttachment('Actions')} .${cnAttachment('Button')}`,
  );
};

const getButtons = (ctx: TestContext) => {
  return getRender(ctx).querySelectorAll(`.${cnAttachment('Button')}`);
};

const getButton = (ctx: TestContext, index = 0) => {
  return getButtons(ctx)[index];
};

describe('Компонент Attachment', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = renderComponent(ctx, {});

      expect(() => render).not.toThrow();
    }));

  describe('проверка ref', () => {
    test(`ref присвоен`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          ref: (el: HTMLElement) => setRef(ref, el),
        });

        expect(ref.current).toBeTruthy();
      }));
  });

  describe('проверка props', () => {
    describe('проверка className', () => {
      test(`Присваивается дополнительный className`, (ctx) =>
        context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка as', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        test(`должен рендериться как <${el}>`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { as: el });

            expect(getRender(ctx).tagName).toEqual(el.toUpperCase());
          }));
      });
    });

    describe('проверка fileName', () => {
      test(`fileName отображается`, (ctx) =>
        context.start(async () => {
          const fileName = 'fileName';

          renderComponent(ctx, { fileName });

          const fileNameElement = getFileName(ctx) as HTMLDivElement;

          expect(fileNameElement.textContent).toEqual(fileName);
        }));
    });

    describe('проверка fileDescription', () => {
      test(`fileDescription отображается`, (ctx) =>
        context.start(async () => {
          const fileDescription = 'fileDescription';

          renderComponent(ctx, { fileDescription });

          const fileDescriptionElement = getFileDescription(
            ctx,
          ) as HTMLDivElement;

          expect(fileDescriptionElement.textContent).toEqual(fileDescription);
        }));
    });

    describe('проверка errorText', () => {
      test(`errorText отображается`, (ctx) =>
        context.start(async () => {
          const errorText = 'errorText';

          renderComponent(ctx, { errorText });

          const errorTextElement = getErrorText(ctx) as HTMLDivElement;

          expect(errorTextElement.textContent).toEqual(errorText);
        }));
    });

    describe('проверка loading', () => {
      test(`fileDescription не отображается если loading=true`, (ctx) =>
        context.start(async () => {
          const fileDescription = 'fileDescription';

          renderComponent(ctx, { fileDescription, loading: true });

          expect(getFileDescription(ctx)).toEqual(null);
        }));

      test(`loadingText отображается если loading=true`, (ctx) =>
        context.start(async () => {
          const loadingText = 'loadingText';

          renderComponent(ctx, { loadingText, loading: true });

          const loadingTextElement = getLoadingText(ctx) as HTMLDivElement;

          expect(loadingTextElement.textContent).toEqual(`${loadingText}...`);
        }));

      test(`отображается loadingProgress после loadingText`, (ctx) =>
        context.start(async () => {
          const loadingText = 'loadingText';
          const loadingProgress = 5;

          renderComponent(ctx, { loadingText, loading: true, loadingProgress });

          const loadingTextElement = getLoadingText(ctx) as HTMLDivElement;

          expect(loadingTextElement.textContent).toEqual(
            `${loadingText} ${loadingProgress}%`,
          );
        }));

      test(`loadingText не отображается если loading=false`, (ctx) =>
        context.start(async () => {
          const loadingText = 'loadingText';

          renderComponent(ctx, { loadingText });

          expect(getLoadingText(ctx)).toEqual(null);
        }));
    });

    describe('проверка onButtonClick', () => {
      test(`событие на кнопке срабатывает`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onButtonClick: handleClick,
            buttonIcon: IconSave,
          });

          const buttonElement = getButton(ctx) as HTMLButtonElement;

          fireEvent.click(buttonElement);
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe('проверка onClick', () => {
      test(`событие срабатывает`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, { onClick: handleClick });

          const renderElement = getRender(ctx) as unknown as HTMLButtonElement;

          fireEvent.click(renderElement);
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe('проверка actions', () => {
      test(`Количество кнопок совпадает с actions.length`, (ctx) =>
        context.start(async () => {
          const actions = [
            {
              onClick: vi.fn(),
              title: 'action 1',
              icon: createIconMock('Icon1'),
            },
            {
              onClick: vi.fn(),
              title: 'action 2',
              icon: createIconMock('Icon2'),
            },
            {
              onClick: vi.fn(),
              title: 'action 3',
              icon: createIconMock('Icon3'),
            },
          ];

          renderComponent(ctx, {
            actions,
          });

          const buttons = getActionsButtons(ctx);

          fireEvent.click(buttons[0]);

          expect(buttons.length).toEqual(actions.length);
        }));

      test(`Отображается иконка`, (ctx) =>
        context.start(async () => {
          const actions = [
            {
              onClick: vi.fn(),
              title: 'action 1',
              icon: createIconMock('Icon1'),
            },
          ];

          renderComponent(ctx, {
            actions,
          });

          const buttons = getActionsButtons(ctx);

          expect(buttons[0]).toHaveTextContent('Icon1');
        }));

      test(`Обработка клика`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          const actions = [
            {
              onClick: handleClick,
              title: 'action 1',
              icon: createIconMock('Icon1'),
            },
          ];

          renderComponent(ctx, {
            actions,
          });

          const buttons = getActionsButtons(ctx);

          fireEvent.click(buttons[0]);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });
  });
});
