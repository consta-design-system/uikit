import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { Attachment, cnAttachment } from '../AttachmentDeprecated';

createRoot();
clearStack();

type AttachmentProps = React.ComponentProps<typeof Attachment>;

const testId = 'Attachment';

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
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

function getFileName(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnAttachment('FileName')}`);
}

function getFileDescription(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnAttachment('FileDescription')}`);
}

function getErrorText(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnAttachment('ErrorText')}`);
}

function getLoadingText(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnAttachment('LoadingText')}`);
}

function getButton(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnAttachment('Button')}`);
}

describe.concurrent('Компонент Attachment', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, {});
      await wrap(tick());
      expect(render).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка className', () => {
      test(`Присваивается дополнительный className`, (ctx) =>
        context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка as', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        test(`должен рендериться как <${el}>`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { as: el });
            await wrap(tick());
            expect(getRender(ctx).tagName).toEqual(el.toUpperCase());
          }));
      });
    });

    describe.concurrent('проверка fileName', () => {
      test(`fileName отображается`, (ctx) =>
        context.start(async () => {
          const fileName = 'fileName';

          renderComponent(ctx, { fileName });
          await wrap(tick());

          const fileNameElement = getFileName(ctx) as HTMLDivElement;

          expect(fileNameElement.textContent).toEqual(fileName);
        }));
    });

    describe.concurrent('проверка fileDescription', () => {
      test(`fileDescription отображается`, (ctx) =>
        context.start(async () => {
          const fileDescription = 'fileDescription';

          renderComponent(ctx, { fileDescription });
          await wrap(tick());

          const fileDescriptionElement = getFileDescription(
            ctx,
          ) as HTMLDivElement;

          expect(fileDescriptionElement.textContent).toEqual(fileDescription);
        }));
    });

    describe.concurrent('проверка errorText', () => {
      test(`errorText отображается`, (ctx) =>
        context.start(async () => {
          const errorText = 'errorText';

          renderComponent(ctx, { errorText });
          await wrap(tick());

          const errorTextElement = getErrorText(ctx) as HTMLDivElement;

          expect(errorTextElement.textContent).toEqual(errorText);
        }));
    });

    describe.concurrent('проверка loading', () => {
      test(`fileDescription не отображается если loading=true`, (ctx) =>
        context.start(async () => {
          const fileDescription = 'fileDescription';

          renderComponent(ctx, { fileDescription, loading: true });
          await wrap(tick());
          expect(getFileDescription(ctx)).toEqual(null);
        }));

      test(`loadingText отображается если loading=true`, (ctx) =>
        context.start(async () => {
          const loadingText = 'loadingText';

          renderComponent(ctx, { loadingText, loading: true });
          await wrap(tick());

          const loadingTextElement = getLoadingText(ctx) as HTMLDivElement;

          expect(loadingTextElement.textContent).toEqual(`${loadingText}...`);
        }));

      test(`отображается loadingProgress после loadingText`, (ctx) =>
        context.start(async () => {
          const loadingText = 'loadingText';
          const loadingProgress = 5;

          renderComponent(ctx, { loadingText, loading: true, loadingProgress });
          await wrap(tick());

          const loadingTextElement = getLoadingText(ctx) as HTMLDivElement;

          expect(loadingTextElement.textContent).toEqual(
            `${loadingText} ${loadingProgress}%`,
          );
        }));

      test(`loadingText не отображается если loading=false`, (ctx) =>
        context.start(async () => {
          const loadingText = 'loadingText';

          renderComponent(ctx, { loadingText });
          await wrap(tick());

          expect(getLoadingText(ctx)).toEqual(null);
        }));
    });

    describe.concurrent('проверка onButtonClick', () => {
      test(`событие на кнопке срабатывает`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, { onButtonClick: handleClick });
          await wrap(tick());

          const buttonElement = getButton(ctx) as HTMLButtonElement;

          fireEvent.click(buttonElement);
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });

    describe.concurrent('проверка onClick', () => {
      test(`событие срабатывает`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, { onClick: handleClick });
          await wrap(tick());

          const buttonElement = getRender(ctx) as HTMLButtonElement;

          fireEvent.click(buttonElement);
          expect(handleClick).toHaveBeenCalledTimes(1);
        }));
    });
  });
});
