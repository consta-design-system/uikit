import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import {
  cnTextAreaAutoSize,
  TextAreaAutoSize,
  TextAreaAutoSizeProps,
} from '..';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = 'TextAreaAutoSize';

/**
 * baseTestStyle - базовый стиль для предсказуемого расчёта высоты в тестах.
 * Без явного line-height браузер возвращает 'normal', и компонент не может вычислить высоту.
 */
const baseTestStyle: React.CSSProperties = {
  lineHeight: '20px',
  padding: '0px',
  border: 'none',
};

const renderComponent = (
  ctx: TestContext,
  props: TextAreaAutoSizeProps & { 'data-testid'?: string } = {},
  ref?: React.Ref<HTMLTextAreaElement>,
) => {
  const { style, ...restProps } = props;
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <TextAreaAutoSize
          ref={ref}
          data-testid={testId}
          style={{ ...baseTestStyle, ...style }}
          {...restProps}
        />
      </reatomContext.Provider>,
    );
  });
};

const renderComponents = (
  ctx: TestContext,
  components: React.ReactElement[],
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        {components}
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext, id: string = testId) =>
  document.querySelector(
    `#${testRootId(ctx)} textarea[data-testid="${id}"]`,
  ) as HTMLTextAreaElement;

const getFake = (ctx: TestContext) =>
  document.querySelector(
    `body > textarea.${cnTextAreaAutoSize('Fake')}`,
  ) as HTMLTextAreaElement;

const changeValue = (element: HTMLTextAreaElement, value: string) => {
  act(() => {
    fireEvent.change(element, { target: { value } });
  });
};

describe('Компонент TextAreaAutoSize', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      expect(getRender(ctx)).toBeInTheDocument();
      expect(getFake(ctx)).toBeInTheDocument();
    }));

  test('присваивается дополнительный className', (ctx) =>
    context.start(async () => {
      const className = 'custom-class';
      renderComponent(ctx, { className });

      expect(getRender(ctx)).toHaveClass(cnTextAreaAutoSize());
      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('пробрасываются дополнительные атрибуты', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        'placeholder': 'Введите текст',
        'disabled': true,
        'aria-label': 'text-area-label',
      });

      expect(getRender(ctx)).toHaveAttribute('placeholder', 'Введите текст');
      expect(getRender(ctx)).toBeDisabled();
      expect(getRender(ctx)).toHaveAttribute('aria-label', 'text-area-label');
    }));

  test('проверка ref', (ctx) =>
    context.start(async () => {
      const ref = { current: null };
      renderComponent(ctx, {}, ref);

      expect(ref.current).toBeInTheDocument();
    }));

  test('прокинутый style смешивается с вычисленным', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { style: { color: 'red' } });

      await wrap(tick());
      changeValue(getRender(ctx), 'a');
      await wrap(tick());

      expect(getRender(ctx).style.color).toEqual('red');
      expect(parseFloat(getRender(ctx).style.height)).toBeGreaterThan(0);
    }));

  test('проверка onChange', (ctx) =>
    context.start(async () => {
      const onChange = vi.fn();
      renderComponent(ctx, { onChange });

      changeValue(getRender(ctx), 'test');

      expect(onChange).toHaveBeenCalled();
    }));

  test('значение textarea синхронизируется с fake элементом', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      changeValue(getRender(ctx), 'sync text');

      expect(getFake(ctx).value).toEqual('sync text');
    }));

  test('fake элемент имеет класс и id с суффиксом Fake', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { id: 'myTextArea', name: 'myName' });

      const fake = getFake(ctx);

      expect(fake).toHaveClass(cnTextAreaAutoSize('Fake'));
      expect(fake.id).toContain(cnTextAreaAutoSize('Fake'));
      expect(fake.id).toContain('myTextArea');
      expect(fake.id).toContain('myName');
    }));

  test('fake элемент рендерится в portalRoot', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        portalRoot: document.getElementById(testPopoverId(ctx))!,
      });

      const fake = document.querySelector(
        `#${testPopoverId(ctx)} textarea.${cnTextAreaAutoSize('Fake')}`,
      );

      expect(fake).toBeInTheDocument();
    }));

  test('высота увеличивается при вводе многострочного текста', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      await wrap(tick());
      changeValue(getRender(ctx), 'a');
      await wrap(tick());
      const initialHeight = parseFloat(getRender(ctx).style.height);

      changeValue(getRender(ctx), 'line1\nline2\nline3');
      await wrap(tick());

      const newHeight = parseFloat(getRender(ctx).style.height);

      expect(newHeight).toBeGreaterThan(initialHeight);
    }));

  test('высота уменьшается при очистке текста', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      await wrap(tick());
      changeValue(getRender(ctx), 'a\nb\nc');
      await wrap(tick());
      const heightWithText = parseFloat(getRender(ctx).style.height);

      changeValue(getRender(ctx), '');
      await wrap(tick());
      const heightAfterClear = parseFloat(getRender(ctx).style.height);

      expect(heightAfterClear).toBeLessThan(heightWithText);
    }));

  test('по умолчанию minRows равен 1', async (ctx) =>
    context.start(async () => {
      renderComponents(ctx, [
        <TextAreaAutoSize
          data-testid={`${testId}Default`}
          key="default"
          style={baseTestStyle}
        />,
        <TextAreaAutoSize
          data-testid={`${testId}One`}
          minRows={1}
          key="one"
          style={baseTestStyle}
        />,
      ]);

      await wrap(tick());
      changeValue(getRender(ctx, `${testId}Default`), 'a');
      changeValue(getRender(ctx, `${testId}One`), 'a');
      await wrap(tick());

      expect(
        parseFloat(getRender(ctx, `${testId}Default`).style.height),
      ).toBeCloseTo(parseFloat(getRender(ctx, `${testId}One`).style.height), 1);
    }));

  test('minRows увеличивает минимальную высоту', async (ctx) =>
    context.start(async () => {
      renderComponents(ctx, [
        <TextAreaAutoSize
          data-testid={`${testId}One`}
          minRows={1}
          key="one"
          style={baseTestStyle}
        />,
        <TextAreaAutoSize
          data-testid={`${testId}Two`}
          minRows={2}
          key="two"
          style={baseTestStyle}
        />,
      ]);

      await wrap(tick());
      changeValue(getRender(ctx, `${testId}One`), 'a');
      changeValue(getRender(ctx, `${testId}Two`), 'a');
      await wrap(tick());

      expect(
        parseFloat(getRender(ctx, `${testId}Two`).style.height),
      ).toBeGreaterThan(
        parseFloat(getRender(ctx, `${testId}One`).style.height),
      );
    }));

  test('без maxRows overflowY равен hidden', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      await wrap(tick());
      changeValue(getRender(ctx), 'a\nb\nc');
      await wrap(tick());

      expect(getRender(ctx).style.overflowY).toEqual('hidden');
    }));

  test('при превышении maxRows overflowY становится scroll', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { maxRows: 1 });

      await wrap(tick());
      changeValue(getRender(ctx), 'a\nb\nc');
      await wrap(tick());

      expect(getRender(ctx).style.overflowY).toEqual('scroll');
    }));

  test('при maxRows высота ограничивается максимальной', async (ctx) =>
    context.start(async () => {
      renderComponents(ctx, [
        <TextAreaAutoSize
          data-testid={`${testId}A`}
          maxRows={1}
          key="a"
          style={baseTestStyle}
        />,
        <TextAreaAutoSize
          data-testid={`${testId}B`}
          maxRows={1}
          key="b"
          style={baseTestStyle}
        />,
      ]);

      await wrap(tick());

      const textAreaA = getRender(ctx, `${testId}A`);
      const textAreaB = getRender(ctx, `${testId}B`);

      changeValue(textAreaA, 'one');
      changeValue(textAreaB, 'one\ntwo\nthree\nfour\nfive');
      await wrap(tick());

      expect(parseFloat(textAreaA.style.height)).toBeCloseTo(
        parseFloat(textAreaB.style.height),
        1,
      );
    }));
});
