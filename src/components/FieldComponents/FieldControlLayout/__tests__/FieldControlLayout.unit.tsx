import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  cnFieldControlLayout,
  FieldControlLayout,
  FieldControlLayoutProps,
} from '..';

createRoot();
clearStack();

const testId = cnFieldControlLayout();

const renderComponent = (
  ctx: TestContext,
  props: FieldControlLayoutProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldControlLayout data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
const getSlots = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll(`.${cnFieldControlLayout('Slot')}`) || [];

describe.concurrent('Компонент FieldControlLayout', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  test(`Присваивается дополнительный className`, (ctx) =>
    context.start(async () => {
      const className = 'className';
      renderComponent(ctx, { className });

      await wrap(tick());

      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('Указываются все css переменные', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      await wrap(tick());

      const element = getRender(ctx);
      expect(
        element.style.getPropertyValue('--field-control-layout-bg-color'),
      ).toEqual('var(--color-bg-default)');
      expect(
        element.style.getPropertyValue('--field-control-layout-border-color'),
      ).toEqual('var(--color-control-bg-border-default)');
      expect(
        element.style.getPropertyValue('--field-control-layout-border-radius'),
      ).toEqual(
        'var(--control-radius) var(--control-radius) var(--control-radius) var(--control-radius)',
      );
      expect(
        element.style.getPropertyValue('--field-control-layout-border-style'),
      ).toEqual('solid solid solid solid');
      expect(
        element.style.getPropertyValue('--field-control-layout-border-width'),
      ).toEqual('var(--control-border-width)');
      expect(
        element.style.getPropertyValue('--field-control-layout-height'),
      ).toEqual(
        'var(--field-control-layout-height-override, var(--control-height-m))',
      );
      expect(
        element.style
          .getPropertyValue('--field-control-layout-padding-bottom')
          .replace(/\s/g, ''),
      ).toEqual(
        'var(--field-control-layout-padding-bottom-override, var(--field-control-layout-additional-padding-bottom, 0px))'.replace(
          /\s/g,
          '',
        ),
      );
      expect(
        element.style.getPropertyValue('--field-control-layout-padding-left'),
      ).toEqual(
        'var(--field-control-layout-padding-left-override,calc(var(--field-control-layout-space) + var(--field-control-layout-additional-padding-left, 0px)))',
      );
      expect(
        element.style.getPropertyValue('--field-control-layout-padding-right'),
      ).toEqual(
        'var(--field-control-layout-padding-right-override, calc(var(--field-control-layout-space) + var(--field-control-layout-additional-padding-right, 0px)))',
      );
      expect(
        element.style.getPropertyValue('--field-control-layout-padding-top'),
      ).toEqual(
        'var(--field-control-layout-padding-top-override,var(--field-control-layout-additional-padding-top, 0px))',
      );
      expect(
        element.style.getPropertyValue('--field-control-layout-space'),
      ).toEqual('calc(var(--control-space-m) * 0.5)');
      expect(
        element.style.getPropertyValue(
          '--field-control-layout-text-line-height',
        ),
      ).toEqual('var(--line-height-text-m)');
      expect(
        element.style.getPropertyValue('--field-control-layout-text-size'),
      ).toEqual('var(--control-text-size-m)');
    }));

  test('leftSide отображается верно', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { leftSide: ['1', 0, false, null] });

      await wrap(tick());

      expect(getSlots(ctx).length).toEqual(2);
    }));

  test('rightSide отображается верно', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rightSide: ['1', 0, false, null] });

      await wrap(tick());

      expect(getSlots(ctx).length).toEqual(2);
    }));

  test('Компонент корректно обрабатывает состояние hovered', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      await wrap(tick());

      const element = getRender(ctx);
      expect(
        element.style.getPropertyValue('--field-control-layout-border-color'),
      ).not.toEqual('var(--color-control-bg-border-default-hover)');

      fireEvent.mouseEnter(element);

      expect(
        element.style.getPropertyValue('--field-control-layout-border-color'),
      ).toEqual('var(--color-control-bg-border-default-hover)');

      fireEvent.mouseLeave(element);

      expect(
        element.style.getPropertyValue('--field-control-layout-border-color'),
      ).not.toEqual(' var(--color-control-bg-border-default-hover)');
    }));

  test('Компонент корректно обрабатывает состояние disabled', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { disabled: true });

      await wrap(tick());

      const element = getRender(ctx);
      expect(element).toHaveClass(cnFieldControlLayout({ disabled: true }));
      expect(
        element.style.getPropertyValue('--field-control-layout-bg-color'),
      ).toEqual('var(--color-control-bg-disable)');
    }));

  test('Компонент корректно обрабатывает состояние focused', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { focused: true });

      await wrap(tick());

      expect(
        getRender(ctx).style.getPropertyValue(
          '--field-control-layout-border-color',
        ),
      ).toEqual('var(--color-control-bg-border-focus)');
    }));

  test('Компонент корректно обрабатывает разные размеры', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { size: 's' });

      await wrap(tick());

      expect(
        getRender(ctx).style.getPropertyValue('--field-control-layout-height'),
      ).toEqual(
        'var(--field-control-layout-height-override, var(--control-height-s))',
      );
    }));

  test('Компонент корректно обрабатывает разные формы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { form: 'round' });

      await wrap(tick());

      expect(
        getRender(ctx).style.getPropertyValue(
          '--field-control-layout-border-radius',
        ),
      ).toEqual(
        'calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2) calc(var(--field-control-layout-height) / 2)',
      );
    }));

  test('Компонент корректно обрабатывает разные виды отображения (view)', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { view: 'clear' });

      await wrap(tick());

      expect(
        getRender(ctx).style.getPropertyValue(
          '--field-control-layout-border-width',
        ),
      ).toEqual('0px');
    }));
});
