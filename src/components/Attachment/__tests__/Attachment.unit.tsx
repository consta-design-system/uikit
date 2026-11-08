import { IconSave } from '@consta/icons/IconSave';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { cnButton } from '##/components/Button';
import { cnFile } from '##/components/File';
import { cnText } from '##/components/Text';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnIconFile } from '##/fileIcons/FileIcon/FileIcon';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Attachment, cnAttachment } from '../Attachment';
import { AttachmentPropSize, attachmentPropSize } from '../types';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = cnAttachment();

type AttachmentProps = React.ComponentProps<typeof Attachment>;
type Root = ReturnType<typeof ReactDOM.createRoot>;

const fileSizeMap: Record<AttachmentPropSize, 's' | 'm'> = {
  xs: 's',
  s: 's',
  m: 'm',
};

const fileNameSizeMap: Record<AttachmentPropSize, 'xs' | 's'> = {
  xs: 'xs',
  s: 's',
  m: 's',
};

const fileDescriptionSizeMap: Record<AttachmentPropSize, 'xs' | 's'> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
};

const roots = new Map<string, Root>();

const getRoot = (ctx: TestContext) => {
  const id = testRootId(ctx);
  const cached = roots.get(id);
  if (cached) {
    return cached;
  }
  const root = ReactDOM.createRoot(document.getElementById(id)!);
  roots.set(id, root);
  return root;
};

afterEach((ctx) => {
  roots.delete(testRootId(ctx));
});

const renderComponent = (ctx: TestContext, props: AttachmentProps) => {
  act(() => {
    getRoot(ctx).render(
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
  ) as HTMLElement;

const getPictogram = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnAttachment('File')}`);

const getProgressLoader = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnFile('Loader')}`);

const getFileName = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnAttachment('FileName')}`);

const getFileDescription = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnAttachment('FileDescription')}`);

const getErrorText = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnAttachment('ErrorText')}`);

const getLoadingText = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnAttachment('LoadingText')}`);

const getActionsBlock = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnAttachment('Actions')}`);

const getActionsButtons = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(
    `.${cnAttachment('Actions')} .${cnAttachment('Button')}`,
  );

const getButtons = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnAttachment('Button')}`);

const getButton = (ctx: TestContext, index = 0) => getButtons(ctx)[index];

const action = (title?: string, icon: string = 'Icon') => ({
  onClick: vi.fn(),
  title,
  icon: createIconMock(icon),
});

describe('Компонент Attachment', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
      expect(getRender(ctx)).toHaveClass(cnAttachment());
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

    test(`ref указывает на корневой элемент`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          ref: (el: HTMLElement) => setRef(ref, el),
        });

        expect(ref.current).toBe(getRender(ctx));
      }));

    test(`ref присвоен при as=a`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          as: 'a',
          ref: (el: HTMLElement) => setRef(ref, el),
        });

        expect(ref.current).toBe(getRender(ctx));
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

      test(`по умолчанию рендерится как <div>`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getRender(ctx).tagName).toEqual('DIV');
        }));
    });

    describe('проверка otherProps', () => {
      test(`атрибуты пробрасываются на корневой элемент`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            'id': 'attachment-id',
            'data-qux': 'qux',
            'aria-label': 'attachment',
          } as AttachmentProps);

          const element = getRender(ctx);

          expect(element.id).toEqual('attachment-id');
          expect(element.getAttribute('data-qux')).toEqual('qux');
          expect(element.getAttribute('aria-label')).toEqual('attachment');
        }));

      test(`href пробрасывается при as=a`, (ctx) =>
        context.start(async () => {
          const href = 'https://consta.design';

          renderComponent(ctx, { as: 'a', href } as AttachmentProps);

          expect(getRender(ctx).getAttribute('href')).toEqual(href);
        }));
    });

    describe('проверка size', () => {
      attachmentPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });

            expect(getRender(ctx)).toHaveClass(cnAttachment({ size }));
          }));

        test(`для size=${size} пиктограмма получает размер ${fileSizeMap[size]}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, withPictogram: true });

            expect(getPictogram(ctx)).toHaveClass(
              cnIconFile({ size: fileSizeMap[size] }),
            );
          }));

        test(`для size=${size} название получает размер ${fileNameSizeMap[size]}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, fileName: 'fileName' });

            expect(getFileName(ctx)).toHaveClass(
              cnText({ size: fileNameSizeMap[size] }),
            );
          }));

        test(`для size=${size} описание получает размер ${fileDescriptionSizeMap[size]}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, fileDescription: 'fileDescription' });

            expect(getFileDescription(ctx)).toHaveClass(
              cnText({ size: fileDescriptionSizeMap[size] }),
            );
          }));
      });

      test(`по умолчанию присваивает класс size=s`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getRender(ctx)).toHaveClass(cnAttachment({ size: 's' }));
        }));
    });

    describe('проверка withPictogram', () => {
      test(`пиктограмма отображается при withPictogram=true`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withPictogram: true });

          expect(getPictogram(ctx)).not.toEqual(null);
        }));

      test(`пиктограмма не отображается при withPictogram=false`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withPictogram: false });

          expect(getPictogram(ctx)).toEqual(null);
        }));

      test(`пиктограмма не отображается по умолчанию`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getPictogram(ctx)).toEqual(null);
        }));
    });

    describe('проверка fileExtension', () => {
      const extensions = [
        { extension: 'doc', icon: 'FileIconDoc' },
        { extension: 'docx', icon: 'FileIconDoc' },
        { extension: 'DOC', icon: 'FileIconDoc' },
        { extension: 'pdf', icon: 'FileIconPdf' },
        { extension: 'unknown-extension', icon: 'FileIconUndefined' },
      ] as const;

      extensions.forEach(({ extension, icon }) => {
        test(`рисует верную иконку для fileExtension=${extension}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              fileExtension: extension,
              withPictogram: true,
            });

            expect(getPictogram(ctx)).toHaveClass(icon);
          }));
      });

      test(`без fileExtension рисуется иконка FileIconUndefined`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withPictogram: true });

          expect(getPictogram(ctx)).toHaveClass('FileIconUndefined');
        }));

      test(`fileExtension не влияет без withPictogram`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { fileExtension: 'doc' });

          expect(getPictogram(ctx)).toEqual(null);
        }));
    });

    describe('проверка fileName', () => {
      test(`fileName отображается`, (ctx) =>
        context.start(async () => {
          const fileName = 'fileName';

          renderComponent(ctx, { fileName });

          const fileNameElement = getFileName(ctx) as HTMLDivElement;

          expect(fileNameElement.textContent).toEqual(fileName);
        }));

      test(`fileName не отображается если не передан`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getFileName(ctx)).toEqual(null);
        }));

      test(`fileName не отображается если пустая строка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { fileName: '' });

          expect(getFileName(ctx)).toEqual(null);
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

      test(`fileDescription не отображается если пустая строка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { fileDescription: '' });

          expect(getFileDescription(ctx)).toEqual(null);
        }));

      test(`fileDescription отображается вместе с errorText`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            fileDescription: 'fileDescription',
            errorText: 'errorText',
          });

          expect(getFileDescription(ctx)).not.toEqual(null);
          expect(getErrorText(ctx)).not.toEqual(null);
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

      test(`errorText не отображается если пустая строка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { errorText: '' });

          expect(getErrorText(ctx)).toEqual(null);
        }));

      test(`присваивает класс error при наличии errorText`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { errorText: 'errorText' });

          expect(getRender(ctx)).toHaveClass(cnAttachment({ error: true }));
        }));

      test(`не присваивает класс error без errorText`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getRender(ctx)).not.toHaveClass(cnAttachment({ error: true }));
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

      test(`loadingText по умолчанию равен Loading`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { loading: true });

          const loadingTextElement = getLoadingText(ctx) as HTMLDivElement;

          expect(loadingTextElement.textContent).toEqual('Loading...');
        }));

      test(`loadingText не отображается если пустая строка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { loadingText: '', loading: true });

          expect(getLoadingText(ctx)).toEqual(null);
        }));

      test(`loadingProgress=0 трактуется как отсутствие прогресса`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            loadingText: 'loadingText',
            loading: true,
            loadingProgress: 0,
          });

          const loadingTextElement = getLoadingText(ctx) as HTMLDivElement;

          expect(loadingTextElement.textContent).toEqual('loadingText...');
        }));

      test(`loadingProgress не отображается без loading`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            loadingText: 'loadingText',
            loadingProgress: 5,
          });

          expect(getLoadingText(ctx)).toEqual(null);
        }));

      test(`loading меняет пиктограмму на загрузочную`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withPictogram: true, loading: true });

          expect(getPictogram(ctx)).toHaveClass('FileIconLoading');
        }));

      test(`при loading отображается спиннер прогресса`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            withPictogram: true,
            loading: true,
            loadingProgress: 50,
          });

          expect(getProgressLoader(ctx)).not.toEqual(null);
        }));

      test(`без loading спиннер прогресса не отображается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withPictogram: true, loadingProgress: 50 });

          expect(getProgressLoader(ctx)).toEqual(null);
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

      test(`buttonTitle присваивается кнопке`, (ctx) =>
        context.start(async () => {
          const buttonTitle = 'buttonTitle';

          renderComponent(ctx, {
            onButtonClick: vi.fn(),
            buttonIcon: IconSave,
            buttonTitle,
          });

          expect(getButton(ctx)?.getAttribute('title')).toEqual(buttonTitle);
        }));

      test(`кнопка не отображается без buttonIcon`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onButtonClick: vi.fn() });

          expect(getButton(ctx)).toEqual(undefined);
        }));

      test(`кнопка не отображается без onButtonClick`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { buttonIcon: IconSave });

          expect(getButton(ctx)).toEqual(undefined);
        }));

      test(`кнопка из onButtonClick идёт перед actions`, (ctx) =>
        context.start(async () => {
          const buttonTitle = 'buttonTitle';

          renderComponent(ctx, {
            onButtonClick: vi.fn(),
            buttonIcon: IconSave,
            buttonTitle,
            actions: [action('action 1', 'Icon1')],
          });

          const buttons = getButtons(ctx);

          expect(buttons.length).toEqual(2);
          expect(buttons[0].getAttribute('title')).toEqual(buttonTitle);
          expect(buttons[1].getAttribute('title')).toEqual('action 1');
          // кнопка из onButtonClick тоже рендерится внутри блока действий
          expect(getActionsButtons(ctx).length).toEqual(2);
        }));
    });

    describe('проверка withAction', () => {
      test(`присваивает класс hoverEffect`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withAction: true });

          expect(getRender(ctx)).toHaveClass(
            cnAttachment({ hoverEffect: true }),
          );
        }));

      test(`присваивает класс cursor=pointer`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withAction: true });

          expect(getRender(ctx)).toHaveClass(
            cnAttachment({ cursor: 'pointer' }),
          );
        }));

      test(`не присваивает hoverEffect при withAction=false`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withAction: false });

          expect(getRender(ctx)).not.toHaveClass(
            cnAttachment({ hoverEffect: true }),
          );
        }));

      test(`withAction не влияет на отображение кнопок`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { withAction: true });

          expect(getButtons(ctx).length).toEqual(0);
          expect(getActionsBlock(ctx)).toEqual(null);
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

      test(`присваивает класс hoverEffect`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onClick: vi.fn() });

          expect(getRender(ctx)).toHaveClass(
            cnAttachment({ hoverEffect: true }),
          );
        }));

      test(`присваивает класс cursor=pointer`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onClick: vi.fn() });

          expect(getRender(ctx)).toHaveClass(
            cnAttachment({ cursor: 'pointer' }),
          );
        }));
    });

    describe('проверка доступности по клавиатуре', () => {
      test(`role и tabIndex пробрасываются на корневой элемент`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            onClick: vi.fn(),
            role: 'button',
            tabIndex: 0,
          });

          expect(getRender(ctx).getAttribute('role')).toEqual('button');
          expect(getRender(ctx).getAttribute('tabindex')).toEqual('0');
        }));

      test(`корень с tabIndex фокусируется`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            onClick: vi.fn(),
            role: 'button',
            tabIndex: 0,
          });

          getRender(ctx).focus();

          expect(document.activeElement).toBe(getRender(ctx));
        }));

      test(`без tabIndex корень не фокусируется`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onClick: vi.fn() });

          getRender(ctx).focus();

          expect(document.activeElement).not.toBe(getRender(ctx));
        }));

      test(`по клавише Enter срабатывает onKeyDown из props`, (ctx) =>
        context.start(async () => {
          const handleKeyDown = vi.fn();
          const handleClick = vi.fn();

          renderComponent(ctx, {
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            role: 'button',
            tabIndex: 0,
          });

          fireEvent.keyDown(getRender(ctx), { key: 'Enter' });

          expect(handleKeyDown).toHaveBeenCalledTimes(1);
          // клик по компоненту не возникает сам: активацию по клавише
          // добавляет потребитель через onKeyDown
          expect(handleClick).not.toHaveBeenCalled();
        }));
    });

    describe('проверка actions', () => {
      test(`Количество кнопок совпадает с actions.length`, (ctx) =>
        context.start(async () => {
          const actions = [
            action('action 1', 'Icon1'),
            action('action 2', 'Icon2'),
            action('action 3', 'Icon3'),
          ];

          renderComponent(ctx, { actions });

          expect(getActionsButtons(ctx).length).toEqual(actions.length);
        }));

      test(`Отображается иконка`, (ctx) =>
        context.start(async () => {
          const actions = [action('action 1', 'Icon1')];

          renderComponent(ctx, { actions });

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

          renderComponent(ctx, { actions });

          const buttons = getActionsButtons(ctx);

          fireEvent.click(buttons[0]);

          expect(handleClick).toHaveBeenCalledTimes(1);
        }));

      test(`title действия присваивается кнопке`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { actions: [action('action 1', 'Icon1')] });

          expect(getActionsButtons(ctx)[0].getAttribute('title')).toEqual(
            'action 1',
          );
        }));

      test(`клик по действию всплывает к onClick компонента`, (ctx) =>
        context.start(async () => {
          const handleRootClick = vi.fn();
          const handleActionClick = vi.fn();

          renderComponent(ctx, {
            onClick: handleRootClick,
            actions: [
              {
                onClick: handleActionClick,
                title: 'action 1',
                icon: createIconMock('Icon1'),
              },
            ],
          });

          fireEvent.click(getActionsButtons(ctx)[0]);

          expect(handleActionClick).toHaveBeenCalledTimes(1);
          expect(handleRootClick).toHaveBeenCalledTimes(1);
        }));

      test(`ref действия присвоен кнопке`, (ctx) =>
        context.start(async () => {
          const ref = { current: null };

          renderComponent(ctx, {
            actions: [{ ...action('action 1', 'Icon1'), ref }],
          });

          expect(ref.current).toBe(getActionsButtons(ctx)[0]);
        }));

      test(`кнопки недоступны с клавиатуры и рендерятся как только иконка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { actions: [action('action 1', 'Icon1')] });

          const button = getActionsButtons(ctx)[0];

          expect(button.getAttribute('tabindex')).toEqual('-1');
          expect(button).toHaveClass(cnButton({ size: 'xs' }));
          expect(button).toHaveClass(cnButton({ view: 'clear' }));
          expect(button).toHaveClass(cnButton({ onlyIcon: true }));
        }));

      test(`действия без title рендерятся без предупреждения о ключах`, (ctx) =>
        context.start(async () => {
          const consoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => undefined);

          renderComponent(ctx, {
            actions: [action(undefined, 'Icon1'), action(undefined, 'Icon2')],
          });

          expect(getActionsButtons(ctx).length).toEqual(2);
          expect(
            consoleError.mock.calls.filter((args) =>
              args.some((arg) => String(arg).toLowerCase().includes('key')),
            ),
          ).toEqual([]);

          consoleError.mockRestore();
        }));

      test(`присваивает класс withActions и блок действий`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { actions: [action('action 1', 'Icon1')] });

          expect(getRender(ctx)).toHaveClass(
            cnAttachment({ withActions: true }),
          );
          expect(getActionsBlock(ctx)).not.toEqual(null);
        }));

      test(`не присваивает класс withActions без действий`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { actions: [] });

          expect(getRender(ctx)).not.toHaveClass(
            cnAttachment({ withActions: true }),
          );
          expect(getActionsBlock(ctx)).toEqual(null);
        }));

      test(`не присваивает hoverEffect без onClick и действий`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getRender(ctx)).not.toHaveClass(
            cnAttachment({ hoverEffect: true }),
          );
          expect(getRender(ctx)).not.toHaveClass(
            cnAttachment({ cursor: 'pointer' }),
          );
        }));

      test(`присваивает hoverEffect без onClick, но не cursor=pointer`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { actions: [action('action 1', 'Icon1')] });

          expect(getRender(ctx)).toHaveClass(
            cnAttachment({ hoverEffect: true }),
          );
          expect(getRender(ctx)).not.toHaveClass(
            cnAttachment({ cursor: 'pointer' }),
          );
        }));
    });

    describe('проверка перерендера', () => {
      test(`обновление loadingProgress меняет текст без смены корневого элемента`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            fileName: 'fileName',
            loading: true,
            loadingText: 'loadingText',
            loadingProgress: 10,
          });

          const rootElement = getRender(ctx);

          renderComponent(ctx, {
            fileName: 'fileName',
            loading: true,
            loadingText: 'loadingText',
            loadingProgress: 60,
          });

          expect(getRender(ctx)).toBe(rootElement);
          expect(getLoadingText(ctx)?.textContent).toEqual('loadingText 60%');
        }));
    });
  });
});
