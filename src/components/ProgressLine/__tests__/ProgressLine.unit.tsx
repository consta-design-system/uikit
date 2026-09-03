import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, screen } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cn } from '../../../utils/bem';
import { ProgressLine } from '../ProgressLine';
import { ProgressLineProps, progressLinePropSize } from '../types';

createRoot();
clearStack();

const cnProgressLine = cn('ProgressLine');
const testId = 'ProgressLine';

const renderComponent = <ITEM,>(
  ctx: TestContext,
  props: ProgressLineProps<ITEM>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <ProgressLine {...props} data-testid={testId} />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

describe('Компонент ProgressLine', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    test('присваивает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class';
        renderComponent(ctx, { className });
        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('устанавливает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { ref });
        expect(ref.current).toBe(getRender(ctx));
      }));

    describe('проверка size', () => {
      progressLinePropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            expect(getRender(ctx)).toHaveClass(cnProgressLine({ size }));
          }));
      });
    });

    describe('проверка mode', () => {
      test('устанавливает mode="indeterminate" по умолчанию', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {});
          expect(getRender(ctx)).toHaveClass(
            cnProgressLine({ mode: 'indeterminate' }),
          );
        }));

      test('устанавливает mode="determinate" при наличии value', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: 50 });
          expect(getRender(ctx)).toHaveClass(
            cnProgressLine({ mode: 'determinate' }),
          );
        }));

      test('устанавливает mode="step" при наличии steps', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { steps: ['Step 1'] });
          expect(getRender(ctx)).toHaveClass(cnProgressLine({ mode: 'step' }));
        }));
    });

    describe('проверка steps', () => {
      const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3'];

      test('отображает шаги', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            steps,
            getItemLabel: (item) => item,
          });

          const stepElements = getRender(ctx)?.querySelectorAll(
            `.${cnProgressLine('Step')}`,
          );
          expect(stepElements?.length).toBe(steps.length);
          steps.forEach((step) => {
            expect(screen.getByText(step)).toBeInTheDocument();
          });
        }));

      test('не отображает шаги, если getItemLabel не передан', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { steps });
          const stepElements = getRender(ctx)?.querySelectorAll(
            `.${cnProgressLine('Label')}`,
          );
          expect(stepElements?.length).toBe(0);
        }));
    });

    describe('проверка value', () => {
      test('устанавливает CSS-переменную --progress-line-value', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: 30 });
          expect(getRender(ctx)).toHaveStyle('--progress-line-value: 0.3');
        }));

      test('устанавливает --progress-line-value в 0, если value <= 0', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: -10 });
          expect(getRender(ctx)).toHaveStyle('--progress-line-value: 0');
        }));

      test('устанавливает --progress-line-value в 1, если value >= 100', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { value: 110 });
          expect(getRender(ctx)).toHaveStyle('--progress-line-value: 1');
        }));
    });
  });
});
