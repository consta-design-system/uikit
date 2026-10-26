import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixFocus } from '##/mixs/MixFocus/MixFocus';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

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

describe('Компонент Button', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, {});

      expect(render).not.toThrow();
    }));

  describe('проверка size', () => {
    buttonPropSize.forEach((size) => {
      test(`присваивает класс для size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });

          expect(getRender(ctx)).toHaveClass(cnButton({ size }));
        }));
    });
  });

  describe('проверка view', () => {
    buttonPropView.forEach((view) => {
      test(`присваивает класс для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });

          expect(getRender(ctx)).toHaveClass(cnButton({ view }));
        }));
    });
  });

  describe('проверка width', () => {
    buttonPropWidth.forEach((width) => {
      test(`присваивает класс для width=${width}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { width });

          expect(getRender(ctx)).toHaveClass(cnButton({ width }));
        }));
    });
  });

  describe('проверка form', () => {
    buttonPropForm.forEach((form) => {
      test(`присваивает класс для form=${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { form });

          expect(getRender(ctx)).toHaveClass(cnButton({ form }));
        }));
    });
  });

  describe('проверка тэга', () => {
    const tags = ['a', 'div', 'span'] as const;
    tags.forEach((el) => {
      test(`должен рендериться как <${el}>`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { as: el });

          expect(getRender(ctx).tagName).toEqual(el.toUpperCase());
        }));
    });
  });

  describe('проверка disabled', () => {
    test('должен отключать <button>', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { disabled: true, onClick: handleClick });

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);

        expect(button).toHaveClass(cnButton({ disabled: true }));
      }));

    test('должен вешать класс disabled на <a> элемент', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { disabled: true, as: 'a', onClick: handleClick });

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);
        expect(button).toHaveClass(cnButton({ disabled: true }));
      }));
  });

  describe('проверка loading', () => {
    test('должен отключать <button>', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { loading: true, onClick: handleClick });

        const button = getRender(ctx);

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(0);

        expect(button).toHaveClass(cnButton({ loading: true }));
      }));

    test('должен вешать класс loading на <a> элемент', (ctx) =>
      context.start(async () => {
        const handleClick = vi.fn();

        renderComponent(ctx, { loading: true, as: 'a', onClick: handleClick });

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

      expect(getRender(ctx).textContent).toEqual(label);
    }));

  test('должен работать onClick, если кнопка не отключена', (ctx) =>
    context.start(async () => {
      const handleClick = vi.fn();

      renderComponent(ctx, { onClick: handleClick });

      const button = getRender(ctx);

      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    }));

  describe('проверка иконки', () => {
    test('должен отображать иконку слева', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';
        renderComponent(ctx, { label, iconLeft: IconLeftMock });

        expect(getRender(ctx)).toHaveTextContent(iconLeftText + label);
      }));

    test('должен отображать иконку справа', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';
        renderComponent(ctx, { label, iconRight: IconRightMock });

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

        expect(getRender(ctx)).toHaveTextContent(
          iconLeftText + label + iconRightText,
        );
      }));

    test('должен отображать только иконку', (ctx) =>
      context.start(async () => {
        const label = 'Текст кнопки';

        renderComponent(ctx, { label, iconLeft: IconLeftMock, onlyIcon: true });

        expect(getRender(ctx)).toHaveTextContent(iconLeftText);
      }));

    describe('проверка атрибута title', () => {
      test('должен устанавливать title, если он передан', (ctx) =>
        context.start(async () => {
          const title = 'Тестовый title';
          renderComponent(ctx, { title });

          expect(getRender(ctx)).toHaveAttribute('title', title);
        }));

      test('не должен устанавливать title, если он не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

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

          expect(getRender(ctx)).toHaveAttribute('title', label);
        }));
    });

    describe('проверка атрибута tabIndex', () => {
      test('должен устанавливать tabIndex, если он передан', (ctx) =>
        context.start(async () => {
          const tabIndex = 3;
          renderComponent(ctx, { tabIndex });

          expect(getRender(ctx)).toHaveAttribute(
            'tabindex',
            tabIndex.toString(),
          );
        }));

      test('не должен устанавливать tabIndex, если он не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getRender(ctx)).not.toHaveAttribute('tabindex');
        }));
    });

    describe('проверка атрибута form', () => {
      test('должен устанавливать form, если передан formId', (ctx) =>
        context.start(async () => {
          const formId = 'test-form';
          renderComponent(ctx, { formId });

          expect(getRender(ctx)).toHaveAttribute('form', formId);
        }));

      test('не должен устанавливать form, если formId не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          expect(getRender(ctx)).not.toHaveAttribute('form');
        }));
    });

    describe('проверка кастомного класса', () => {
      test('должен добавлять переданный className', (ctx) =>
        context.start(async () => {
          const customClass = 'custom-class';
          renderComponent(ctx, { className: customClass });

          expect(getRender(ctx)).toHaveClass(customClass);
        }));
    });

    describe('проверка состояния focus', () => {
      test('должен добавлять класс фокуса, если кнопка активна', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});

          const button = getRender(ctx);

          fireEvent.focus(button);

          expect(button).toHaveClass(cnMixFocus());
        }));

      test('не должен добавлять класс фокуса, если кнопка отключена', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { disabled: true });

          const button = getRender(ctx);

          fireEvent.focus(button);

          expect(button).not.toHaveClass(cnMixFocus());
        }));

      test('не должен добавлять класс фокуса, если кнопка в состоянии загрузки', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { loading: true });

          const button = getRender(ctx);

          fireEvent.focus(button);

          expect(button).not.toHaveClass(cnMixFocus());
        }));
    });
  });
});
