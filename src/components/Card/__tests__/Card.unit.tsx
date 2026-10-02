import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixCard } from '##/mixs/MixCard/MixCard';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Card, CardProps } from '../Card';

createRoot();
clearStack();

const testId = 'Card';

type Render<Props> = (ctx: TestContext, props: Props) => void;

const renderComponent: Render<CardProps> = (ctx, props) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Card data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const statuses = ['alert', 'success', 'warning'] as const;
const forms = ['round', 'square'] as const;

describe('компонент Card', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {});

      expect(getRender(ctx)).toBeInTheDocument();
    }));

  test('имеет корректный className', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {});

      expect(getRender(ctx)).toHaveClass('Card');
    }));

  test('должен рендериться с переданным children', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { children: 'Test children' });

      expect(getRender(ctx)).toHaveTextContent('Test children');
    }));

  describe('проверка verticalSpace', () => {
    sizes.forEach((verticalSpace) => {
      test(`должен рендериться с классом ${cnMixCard({ verticalSpace })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { verticalSpace });

          expect(getRender(ctx)).toHaveClass(cnMixCard({ verticalSpace }));
        }));
    });
  });

  describe('проверка horizontalSpace', () => {
    sizes.forEach((horizontalSpace) => {
      test(`должен рендериться с классом ${cnMixCard({ horizontalSpace })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { horizontalSpace });

          expect(getRender(ctx)).toHaveClass(cnMixCard({ horizontalSpace }));
        }));
    });
  });

  describe('проверка status', () => {
    statuses.forEach((status) => {
      test(`должен рендериться с классом ${cnMixCard({ status })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { status });

          expect(getRender(ctx)).toHaveClass(cnMixCard({ status }));
        }));
    });
  });

  describe('проверка form', () => {
    forms.forEach((form) => {
      test(`должен рендериться с классом ${cnMixCard({ form })}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { form });

          expect(getRender(ctx)).toHaveClass(cnMixCard({ form }));
        }));
    });
  });

  describe('проверка border', () => {
    test('должен рендериться с классом border', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { border: true });

        expect(getRender(ctx)).toHaveClass(cnMixCard({ border: true }));
      }));
  });

  describe('проверка shadow', () => {
    test('должен рендериться с классом shadow', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { shadow: true });

        expect(getRender(ctx)).toHaveClass(cnMixCard({ shadow: true }));
      }));
  });

  describe('проверка onClick', () => {
    test('должен вызываться колбэк onClick', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, { ...({ onClick } as any) });

        fireEvent.click(getRender(ctx));
        expect(onClick).toHaveBeenCalled();
      }));
  });

  describe('проверка ref', () => {
    test('должен присваиваться ref', (ctx) =>
      context.start(async () => {
        const ref = { current: null };
        renderComponent(ctx, { ...({ ref } as any) });

        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  describe('проверка className', () => {
    test('должен присваиваться className', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...({ className: 'test-class' } as any) });

        expect(getRender(ctx)).toHaveClass('test-class');
      }));
  });

  describe('проверка style', () => {
    test('должен присваиваться style', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...({ style: { backgroundColor: 'red' } } as any),
        });

        expect(getRender(ctx)).toHaveStyle('background-color: red');
      }));
  });

  describe('проверка as', () => {
    test('должен присваиваться as', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...({ as: 'div' } as any) });

        // В Vitest мы не можем напрямую проверить instanceof, поэтому проверим тег
        expect(getRender(ctx).tagName).toBe('DIV');
      }));
  });
});
