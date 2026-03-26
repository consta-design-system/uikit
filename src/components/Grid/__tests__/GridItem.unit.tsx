import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnGridItem, GridItem } from '../GridItem';

createRoot();
clearStack();

type GridItemProps = React.ComponentProps<typeof GridItem>;

const testId = cnGridItem();
const children = 'children';

const renderComponent = (ctx: TestContext, props: GridItemProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <GridItem data-testid={testId} {...props}>
            {props.children || children}
          </GridItem>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

describe.concurrent('Компонент GridItem', () => {
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

  test('должен устанавливать col', (ctx) =>
    context.start(async () => {
      const col = 2;
      renderComponent(ctx, { col });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(cnGridItem({ col }));
      expect(getRender(ctx).style.getPropertyValue('--grid-item-col-end')).toBe(
        `${col}`,
      );
    }));

  test('должен устанавливать colStart', (ctx) =>
    context.start(async () => {
      const colStart = 2;
      renderComponent(ctx, { colStart });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(cnGridItem({ colStart }));
      expect(
        getRender(ctx).style.getPropertyValue('--grid-item-col-start'),
      ).toBe(`${colStart} / span`);
    }));

  test('должен устанавливать row', (ctx) =>
    context.start(async () => {
      const row = 2;
      renderComponent(ctx, { row });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(cnGridItem({ row }));
      expect(getRender(ctx).style.getPropertyValue('--grid-item-row-end')).toBe(
        `${row}`,
      );
    }));

  test('должен устанавливать rowStart', (ctx) =>
    context.start(async () => {
      const rowStart = 2;
      renderComponent(ctx, { rowStart });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(cnGridItem({ rowStart }));
      expect(
        getRender(ctx).style.getPropertyValue('--grid-item-row-start'),
      ).toBe(`${rowStart} / span`);
    }));

  test('должен устанавливать order', (ctx) =>
    context.start(async () => {
      const order = 1;
      renderComponent(ctx, { order });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(cnGridItem({ order }));
      expect(getRender(ctx).style.getPropertyValue('--grid-item-order')).toBe(
        `${order}`,
      );
    }));
});
