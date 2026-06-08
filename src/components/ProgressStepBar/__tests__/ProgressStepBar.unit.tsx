import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { ProgressStepBar } from '../ProgressStepBar';

createRoot();
clearStack();

type ProgressStepBarProps = React.ComponentProps<typeof ProgressStepBar>;

const testId = 'ProgressStepBar';

const generateItems = (length: number) =>
  Array.from({ length }, (_, i) => ({
    label: `Шаг ${i + 1}`,
    point: i + 1,
  }));

const steps = generateItems(3);

const renderComponent = (
  ctx: TestContext,
  props: Partial<ProgressStepBarProps> = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault} style={{ width: 100 }}>
          <ProgressStepBar
            data-testid={testId}
            steps={steps}
            {...props}
            getItemLabel={() => ''}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} [data-testid="${testId}"]`)!;

const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll('.ProgressStepBarItem');

describe('Компонент ProgressStepBar', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe('проверка props', () => {
    test('className применяется', (ctx) =>
      context.start(async () => {
        const className = 'test-class';
        renderComponent(ctx, { className });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('отображает правильное количество шагов', (ctx) =>
      context.start(async () => {
        renderComponent(ctx);
        expect(getItems(ctx).length).toBe(steps.length);
      }));

    test('onItemClick вызывается при клике на шаг', (ctx) =>
      context.start(async () => {
        const onItemClick = vi.fn();
        renderComponent(ctx, { onItemClick });
        const itemButton = getItems(ctx)[1].querySelector('button');
        if (itemButton) {
          fireEvent.click(itemButton);
        }
        expect(onItemClick).toHaveBeenCalledWith(steps[1], {
          e: expect.any(Object),
          index: 1,
        });
      }));

    test('activeStepIndex правильно применяется', (ctx) =>
      context.start(async () => {
        const activeStepIndex = 1;
        renderComponent(ctx, { activeStepIndex });
        const items = getItems(ctx);
        expect(items[0]).toHaveClass('ProgressStepBarItem_status_normal');
        expect(items[1]).toHaveClass('ProgressStepBarItem_status_normal');
        expect(items[2]).toHaveClass('ProgressStepBarItem_status_system');
      }));

    test('ref устанавливается', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { ref });
        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  describe('проверка direction', () => {
    test('устанавливает горизонтальное направление по умолчанию', (ctx) =>
      context.start(async () => {
        renderComponent(ctx);
        expect(
          getRender(ctx).querySelector('.ProgressStepBar-List'),
        ).toHaveClass('ProgressStepBar-List_direction_horizontal');
      }));

    test('устанавливает вертикальное направление', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { direction: 'vertical' });
        expect(
          getRender(ctx).querySelector('.ProgressStepBar-List'),
        ).toHaveClass('ProgressStepBar-List_direction_vertical');
      }));
  });
});
