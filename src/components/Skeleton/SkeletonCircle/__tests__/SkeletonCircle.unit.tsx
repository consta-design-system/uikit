import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSkeleton } from '../../Skeleton';
import { SkeletonCircle } from '../SkeletonCircle';

createRoot();
clearStack();

type SkeletonCircleProps = React.ComponentProps<typeof SkeletonCircle>;

const testId = 'SkeletonCircle';

const renderComponent = (ctx: TestContext, props: SkeletonCircleProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SkeletonCircle data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

describe('компонент SkeletonCircle', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { size: '20px' });

      expect(getRender(ctx)).toBeInTheDocument();
    }));

  test('имеет корректные className', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { size: '20px' });

      const render = getRender(ctx);
      expect(render).toHaveClass('SkeletonCircle');
      expect(render).toHaveClass(cnSkeleton());
    }));

  test('применяет size к ширине и высоте', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { size: '24px' });

      const render = getRender(ctx);
      expect(render).toHaveStyle({ width: '24px' });
      expect(render).toHaveStyle({ height: '24px' });
    }));

  test('объединяет переданные className и style', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        size: '20px',
        className: 'custom-class',
        style: { borderRadius: '4px' },
      });

      const render = getRender(ctx);
      expect(render).toHaveClass('custom-class');
      expect(render).toHaveStyle({ borderRadius: '4px' });
    }));

  test('прокидывает остальные HTML-атрибуты', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { size: '20px', title: 'test-title' });

      expect(getRender(ctx)).toHaveAttribute('title', 'test-title');
    }));
});
