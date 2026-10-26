import { IconAdd } from '@consta/icons/IconAdd';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import {
  cnTextField,
  TextField,
  textFieldPropForm,
  TextFieldProps,
  textFieldPropSize,
  textFieldPropStatus,
  textFieldPropView,
} from '..';

createRoot();
clearStack();

const testId = cnTextField();

const renderComponent = <TYPE extends string>(
  ctx: TestContext,
  props: TextFieldProps<TYPE> = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <TextField data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getInput = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`input.${cnTextField('Input')}`);
};

const getInputContainer = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.TextField-InputContainer`);
};

const getTextArea = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`textarea.${cnTextField('Input')}`);
};

const getLeftSide = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.TextField-Side_position_left`);
};

const getRightSide = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.TextField-Side_position_right`);
};

describe('Компонент TextField', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка size', () => {
      textFieldPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            await wrap(tick());
            expect(getRender(ctx)).toHaveClass(cnTextField({ size }));
          }));
      });
    });

    describe('проверка form', () => {
      textFieldPropForm.forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form });
            await wrap(tick());
            expect(getInputContainer(ctx)).toHaveClass(
              cnTextField('InputContainer', { form }),
            );
          }));
      });
    });

    describe('проверка status', () => {
      textFieldPropStatus.forEach((status) => {
        test(`присваивает класс для status=${status}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status });
            await wrap(tick());
            expect(getInputContainer(ctx)).toHaveClass(
              cnTextField('InputContainer', { status }),
            );
          }));
      });
    });

    describe('проверка view', () => {
      textFieldPropView.forEach((view) => {
        test(`присваивает класс для view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { view });
            await wrap(tick());
            expect(getRender(ctx)).toHaveClass(cnTextField({ view }));
          }));
      });
    });

    describe('проверка type', () => {
      test(`по умолчанию рендериться как input`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx);
          await wrap(tick());
          expect(getInput(ctx)).not.toBeNull();
        }));

      test(`при type=textarea рендериться как textarea`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            type: 'textarea',
            fakeElementContainer: document.getElementById(testPopoverId(ctx))!,
          });
          await wrap(tick());

          expect(getTextArea(ctx)).not.toBeNull();
        }));
    });

    describe('проверка onChange', () => {
      test(`в callback попадает ожидаемое value`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();
          const value = 'value';

          renderComponent(ctx, { onChange: handleChange });
          await wrap(tick());

          const input = getInput(ctx) as Element;

          fireEvent.focus(input);
          fireEvent.change(input, { target: { value } });

          expect(handleChange).toHaveBeenCalled();
          expect(handleChange).toHaveBeenCalledTimes(1);
          expect(handleChange).toHaveBeenCalledWith(
            value,
            expect.objectContaining({ e: expect.any(Object) }),
          );
        }));
    });

    describe('проверка className', () => {
      test(`присвоился дополнительный класс`, (ctx) =>
        context.start(async () => {
          const className = 'className';
          renderComponent(ctx, { className });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка leftSide', () => {
      test(`отображается как текст`, (ctx) =>
        context.start(async () => {
          const leftSideText = 'leftSideText';

          renderComponent(ctx, { leftSide: leftSideText });
          await wrap(tick());

          const leftSide = getLeftSide(ctx);

          expect(leftSide).toHaveClass(cnTextField('Side', { type: 'string' }));
          expect(leftSide).toHaveTextContent(leftSideText);
        }));

      test(`отображается как иконка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { leftSide: IconAdd });
          await wrap(tick());

          const leftSide = getLeftSide(ctx) as Element;

          expect(leftSide).toHaveClass(cnTextField('Side', { type: 'icon' }));

          const icon = leftSide.querySelector(`.${cnTextField('Icon')}`);

          expect(icon).toHaveClass('IconAdd');
        }));
    });

    describe('проверка rightSide', () => {
      test(`отображается как текст`, (ctx) =>
        context.start(async () => {
          const rightSideText = 'rightSideText';

          renderComponent(ctx, { rightSide: rightSideText });
          await wrap(tick());

          const rightSide = getRightSide(ctx);

          expect(rightSide).toHaveClass(
            cnTextField('Side', { type: 'string' }),
          );
          expect(rightSide).toHaveTextContent(rightSideText);
        }));

      test(`отображается как иконка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { rightSide: IconAdd });
          await wrap(tick());

          const rightSide = getRightSide(ctx) as Element;

          expect(rightSide).toHaveClass(cnTextField('Side', { type: 'icon' }));

          const icon = rightSide.querySelector(`.${cnTextField('Icon')}`);

          expect(icon).toHaveClass('IconAdd');
        }));
    });
  });

  describe('проверка onWheel', () => {
    test('вызывается onWheel', (ctx) =>
      context.start(async () => {
        const handleWheel = vi.fn();
        renderComponent(ctx, {
          onWheel: handleWheel,
        });
        await wrap(tick());

        const input = getInput(ctx) as Element;
        fireEvent.wheel(input, { deltaMode: 0, deltaY: 10 });

        expect(handleWheel).toHaveBeenCalledTimes(1);
      }));

    test('снимается фокус числовой инпут при отсутствии onWheel', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();

        renderComponent(ctx, {
          type: 'number',
          step: 1,
          onChange: handleChange,
        });
        await wrap(tick());
        const input = getInput(ctx) as Element;
        fireEvent.wheel(input, { deltaMode: 0, deltaY: 10 });

        expect(input).not.toHaveFocus();
      }));
  });
});
