import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnGrid, Grid } from '../Grid';
import { gridPropGap, gridPropXAlign, gridPropYAlign } from '../types';

createRoot();
clearStack();

type GridProps = React.ComponentProps<typeof Grid>;

const testId = cnGrid();
const children = 'children';

const renderComponent = (ctx: TestContext, props: GridProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Grid data-testid={testId} {...props}>
            {props.children || children}
          </Grid>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

describe.concurrent('Компонент Grid', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  test('должен рендерить children', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);
      await wrap(tick());
      expect(getRender(ctx)).toHaveTextContent(children);
    }));

  test('должен устанавливать className', (ctx) =>
    context.start(async () => {
      const className = 'test-class';
      renderComponent(ctx, { className });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('должен рендериться с тегом, переданным в as', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { as: 'section' });
      await wrap(tick());
      expect(getRender(ctx).tagName).toBe('SECTION');
    }));

  test('должен устанавливать cols', (ctx) =>
    context.start(async () => {
      const cols = 3;
      renderComponent(ctx, { cols });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(cnGrid({ cols }));
      expect(getRender(ctx).style.getPropertyValue('--grid-cols')).toBe(
        `${cols}`,
      );
    }));

  gridPropGap.forEach((gap) => {
    test(`присваивает класс для gap=${gap}`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { gap });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnGrid({ gap }));
      }));
  });

  gridPropGap.forEach((colGap) => {
    test(`присваивает класс для colGap=${colGap}`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { colGap });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnGrid({ colGap }));
      }));
  });

  gridPropGap.forEach((rowGap) => {
    test(`присваивает класс для rowGap=${rowGap}`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { rowGap });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnGrid({ rowGap }));
      }));
  });

  gridPropXAlign.forEach((xAlign) => {
    test(`присваивает класс для xAlign=${xAlign}`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { xAlign });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnGrid({ xAlign }));
      }));
  });

  gridPropYAlign.forEach((yAlign) => {
    test(`присваивает класс для yAlign=${yAlign}`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { yAlign });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnGrid({ yAlign }));
      }));
  });
});
