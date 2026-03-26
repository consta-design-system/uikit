import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import {
  getDateTimeTogglerButtonNext,
  getDateTimeTogglerButtonPrev,
  getDateTimeTogglerLabel,
  getRender,
  testId,
} from './helpers';

createRoot();
clearStack();

type DateTimeTogglerProps = React.ComponentProps<typeof DateTimeToggler>;

const renderComponent = (
  ctx: TestContext,
  props: DateTimeTogglerProps = { label: 'test' },
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <DateTimeToggler {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент DateTimeToggler', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, { label: 'label' })).not.toThrow();
    }));

  describe.concurrent('проверка className', () => {
    test(`Присваивается дополнительный className`, (ctx) =>
      context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className, label: 'label' });

        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe.concurrent('проверка label', () => {
    test(`label отображается`, (ctx) =>
      context.start(async () => {
        const label = 'label';

        renderComponent(ctx, { label });

        expect(getDateTimeTogglerLabel(ctx)).toHaveTextContent(label);
      }));
  });

  describe.concurrent('проверка onLabelClick', () => {
    test(`onLabelClick отрабатывает`, (ctx) =>
      context.start(async () => {
        const onLabelClick = vi.fn();
        const label = 'label';

        renderComponent(ctx, { onLabelClick, label });

        const DateTimeTogglerLabel = getDateTimeTogglerLabel(ctx);

        act(() => {
          DateTimeTogglerLabel.dispatchEvent(
            new MouseEvent('click', { bubbles: true }),
          );
        });

        expect(onLabelClick).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка prevOnClick', () => {
    test(`prevOnClick отрабатывает`, (ctx) =>
      context.start(async () => {
        const prevOnClick = vi.fn();
        const label = 'label';

        renderComponent(ctx, { prevOnClick, label });

        act(() => {
          getDateTimeTogglerButtonPrev(ctx).dispatchEvent(
            new MouseEvent('click', { bubbles: true }),
          );
        });

        expect(prevOnClick).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка nextOnClick', () => {
    test(`nextOnClick отрабатывает`, (ctx) =>
      context.start(async () => {
        const nextOnClick = vi.fn();
        const label = 'label';

        renderComponent(ctx, { nextOnClick, label });

        act(() => {
          getDateTimeTogglerButtonNext(ctx).dispatchEvent(
            new MouseEvent('click', { bubbles: true }),
          );
        });

        expect(nextOnClick).toHaveBeenCalledTimes(1);
      }));
  });
});
