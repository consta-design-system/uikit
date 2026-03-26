import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixFocus } from '##/mixs/MixFocus/MixFocus';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  Button,
  buttonPropForm,
  buttonPropSize,
  buttonPropView,
  buttonPropWidth,
  cnButton,
} from '../Button';

createRoot();
clearStack();

const iconLeftText = 'IconLeftMock';
const iconRightText = 'IconRightMock';
const IconLeftMock = createIconMock(iconLeftText);
const IconRightMock = createIconMock(iconRightText);

type ButtonProps = React.ComponentProps<typeof Button>;

const testId = 'button';

const renderComponent = (ctx: TestContext, props: ButtonProps = {}) => {
  const { label = 'Текст кнопки', ...rest } = props;
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Button data-testid={testId} label={label} {...rest} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLButtonElement;

describe.concurrent('Компонент Button', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, {});
      await wrap(tick());
      expect(render).not.toThrow();
    }));

  describe.concurrent('проверка size', () => {
    buttonPropSize.forEach((size) => {
      test(`присваивает класс для size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(cnButton({ size }));
        }));
    });
  });

  describe.concurrent('проверка view', () => {
    buttonPropView.forEach((view) => {
      test(`присваивает класс для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(cnButton({ view }));
        }));
    });
  });

  describe.concurrent('проверка width', () => {
    buttonPropWidth.forEach((width) => {
      test(`присваивает класс для width=${width}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { width });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(cnButton({ width }));
        }));
    });
  });

  describe.concurrent('проверка form', () => {
    buttonPropForm.forEach((form) => {
      test(`присваивает класс для form=${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { form });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(cnButton({ form }));
        }));
    });
  });

  describe.concurrent('проверка тэга', () => {
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

  describe.concurrent('проверка disabled', () => {
    test('должен отключать <button>', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { disabled: true, onClick: handleClick });

        await wrap(tick());

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);

        expect(button).toHaveClass(cnButton({ disabled: true }));
      }));

    test('должен вешать класс disabled на <a> элемент', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { disabled: true, as: 'a', onClick: handleClick });

        await wrap(tick());

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);
        expect(button).toHaveClass(cnButton({ disabled: true }));
      }));
  });

  describe.concurrent('проверка loading', () => {
    test('должен отключать <button>', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { loading: true, onClick: handleClick });

        await wrap(tick());

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);

        expect(button).toHaveClass(cnButton({ loading: true }));
      }));

    test('должен вешать класс loading на <a> элемент', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { loading: true, as: 'a', onClick: handleClick });

        await wrap(tick());

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);
        expect(button).toHaveClass(cnButton({ loading: true }));
      }));
  });

  test('должен отображать текст в кнопке', (ctx) =>
    context.start(async () => {
      const label = 'Это кнопка';
      renderComponent(ctx, { label });

      await wrap(tick());

      expect(getRender(ctx).textContent).toEqual(label);
    }));

  test('должен работать onClick, если кнопка не отключена', (ctx) =>
    context.start(async () => {
      const handleClick = vi.fn();

      renderComponent(ctx, { onClick: handleClick });

      await wrap(tick());

      const button = getRender(ctx);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    }));

  describe.concurrent('проверка иконки', () => {
    test('должен отображать иконку слева', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';
        renderComponent(ctx, { label, iconLeft: IconLeftMock });
        await wrap(tick());
        expect(getRender(ctx)).toHaveTextContent(iconLeftText + label);
      }));

    test('должен отображать иконку справа', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';
        renderComponent(ctx, { label, iconRight: IconRightMock });
        await wrap(tick());
        expect(getRender(ctx)).toHaveTextContent(label + iconRightText);
      }));

    test('должен отображать иконки слева и справа', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';

        renderComponent(ctx, {
          label,
          iconRight: IconRightMock,
          iconLeft: IconLeftMock,
        });
        await wrap(tick());
        expect(getRender(ctx)).toHaveTextContent(
          iconLeftText + label + iconRightText,
        );
      }));

    test('должен отображать только иконку', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';

        renderComponent(ctx, { label, iconLeft: IconLeftMock, onlyIcon: true });
        await wrap(tick());
        expect(getRender(ctx)).toHaveTextContent(iconLeftText);
      }));

    describe.concurrent('проверка атрибута title', () => {
      test('должен устанавливать title, если он передан', (ctx) =>
        context.start(async () => {
          const title = 'Тестовый title';
          renderComponent(ctx, { title });
          await wrap(tick());
          expect(getRender(ctx)).toHaveAttribute('title', title);
        }));

      test('не должен устанавливать title, если он не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getRender(ctx)).not.toHaveAttribute('title');
        }));

      test('должен устанавливать title, если onlyIcon=true и передан label', (ctx) =>
        context.start(async () => {
          const label = 'Текст кнопки';
          renderComponent(ctx, {
            onlyIcon: true,
            label,
            iconLeft: createIconMock('Icon'),
          });
          await wrap(tick());
          expect(getRender(ctx)).toHaveAttribute('title', label);
        }));
    });

    describe.concurrent('проверка атрибута tabIndex', () => {
      test('должен устанавливать tabIndex, если он передан', (ctx) =>
        context.start(async () => {
          const tabIndex = 3;
          renderComponent(ctx, { tabIndex });
          await wrap(tick());
          expect(getRender(ctx)).toHaveAttribute(
            'tabindex',
            tabIndex.toString(),
          );
        }));

      test('не должен устанавливать tabIndex, если он не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getRender(ctx)).not.toHaveAttribute('tabindex');
        }));
    });

    describe.concurrent('проверка атрибута form', () => {
      test('должен устанавливать form, если передан formId', (ctx) =>
        context.start(async () => {
          const formId = 'test-form';
          renderComponent(ctx, { formId });
          await wrap(tick());
          expect(getRender(ctx)).toHaveAttribute('form', formId);
        }));

      test('не должен устанавливать form, если formId не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());
          expect(getRender(ctx)).not.toHaveAttribute('form');
        }));
    });

    describe.concurrent('проверка кастомного класса', () => {
      test('должен добавлять переданный className', (ctx) =>
        context.start(async () => {
          const customClass = 'custom-class';
          renderComponent(ctx, { className: customClass });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(customClass);
        }));
    });

    describe.concurrent('проверка состояния focus', () => {
      test('должен добавлять класс фокуса, если кнопка активна', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          await wrap(tick());

          const button = getRender(ctx);

          fireEvent.focus(button);

          expect(button).toHaveClass(cnMixFocus());
        }));

      test('не должен добавлять класс фокуса, если кнопка отключена', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { disabled: true });
          await wrap(tick());

          const button = getRender(ctx);

          fireEvent.focus(button);

          expect(button).not.toHaveClass(cnMixFocus());
        }));

      test('не должен добавлять класс фокуса, если кнопка в состоянии загрузки', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { loading: true });
          await wrap(tick());

          const button = getRender(ctx);

          fireEvent.focus(button);

          expect(button).not.toHaveClass(cnMixFocus());
        }));
    });
  });
});
