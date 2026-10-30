import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { getRowWidth, SkeletonText } from '../SkeletonText';

createRoot();
clearStack();

type SkeletonTextProps = React.ComponentProps<typeof SkeletonText>;

const testId = 'SkeletonText';

const renderComponent = (ctx: TestContext, props: SkeletonTextProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SkeletonText data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

describe('getRowWidth', () => {
  test('возвращает 50%, если это единственная строка', () => {
    expect(getRowWidth(0, 1)).toBe('50%');
  });

  test('возвращает 50%, если это последняя строка', () => {
    expect(getRowWidth(1, 2)).toBe('50%');
    expect(getRowWidth(9, 10)).toBe('50%');
  });

  test('возвращает полную ширину, если это первая строка из тройки', () => {
    expect(getRowWidth(0, 10)).toBe('100%');
    expect(getRowWidth(3, 10)).toBe('100%');
    expect(getRowWidth(6, 10)).toBe('100%');
  });

  test('возвращает 85%, если это вторая строка из тройки', () => {
    expect(getRowWidth(1, 10)).toBe('85%');
    expect(getRowWidth(4, 10)).toBe('85%');
    expect(getRowWidth(7, 10)).toBe('85%');
  });

  test('возвращает 93%, если это третья строка из тройки', () => {
    expect(getRowWidth(2, 10)).toBe('93%');
    expect(getRowWidth(5, 10)).toBe('93%');
    expect(getRowWidth(8, 10)).toBe('93%');
  });
});

describe('компонент SkeletonText', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 1 });

      expect(getRender(ctx)).toBeInTheDocument();
    }));

  test('имеет корректный className', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 1 });

      expect(getRender(ctx)).toHaveClass('SkeletonText');
    }));

  test('рендерит указанное количество строк', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 3 });

      expect(getRender(ctx).querySelectorAll('.SkeletonText-Row')).toHaveLength(
        3,
      );
    }));

  test('у последней строки ширина кирпича 50%', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 3 });

      const rows = getRender(ctx).querySelectorAll('.SkeletonText-Row');
      const lastBrick = rows[rows.length - 1].querySelector('.Skeleton');
      expect(lastBrick).toHaveStyle({ width: '50%' });
    }));

  test('применяет дефолтные fontSize и lineHeight', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 1 });

      const row = getRender(ctx).querySelector(
        '.SkeletonText-Row',
      ) as HTMLDivElement;
      expect(row.style.fontSize).toBe('var(--size-text-m)');
      expect(row.style.height).toBe('var(--line-height-text-m)');
    }));

  test('применяет переданные fontSize и lineHeight', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 1, fontSize: 'l', lineHeight: 'l' });

      const row = getRender(ctx).querySelector(
        '.SkeletonText-Row',
      ) as HTMLDivElement;
      expect(row.style.fontSize).toBe('var(--size-text-l)');
      expect(row.style.height).toBe('var(--line-height-text-l)');
    }));

  test('объединяет переданный className', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 1, className: 'custom-class' });

      expect(getRender(ctx)).toHaveClass('custom-class');
    }));

  test('прокидывает остальные HTML-атрибуты', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { rows: 1, title: 'test-title' });

      expect(getRender(ctx)).toHaveAttribute('title', 'test-title');
    }));
});
