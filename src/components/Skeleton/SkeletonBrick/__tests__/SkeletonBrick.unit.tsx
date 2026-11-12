import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSkeleton } from '../../Skeleton';
import { SkeletonBrick } from '../SkeletonBrick';

createRoot();
clearStack();

type SkeletonBrickProps = React.ComponentProps<typeof SkeletonBrick>;

const testId = 'SkeletonBrick';

const renderComponent = (ctx: TestContext, props: SkeletonBrickProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SkeletonBrick data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

describe('компонент SkeletonBrick', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { height: '10px' });

      expect(getRender(ctx)).toBeInTheDocument();
    }));

  test('имеет корректный className', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { height: '10px' });

      expect(getRender(ctx)).toHaveClass(cnSkeleton());
    }));

  test('ширина по умолчанию равна 100%', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { height: '10px' });

      expect(getRender(ctx)).toHaveStyle({ width: '100%' });
    }));

  test('применяет переданные width и height', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { width: '50px', height: '20px' });

      const render = getRender(ctx);
      expect(render).toHaveStyle({ width: '50px' });
      expect(render).toHaveStyle({ height: '20px' });
    }));

  test('объединяет переданные className и style', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        height: '10px',
        className: 'custom-class',
        style: { backgroundColor: 'rgb(255, 0, 0)' },
      });

      const render = getRender(ctx);
      expect(render).toHaveClass('custom-class');
      expect(render).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    }));

  test('прокидывает остальные HTML-атрибуты', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { height: '10px', title: 'test-title' });

      expect(getRender(ctx)).toHaveAttribute('title', 'test-title');
    }));
});
