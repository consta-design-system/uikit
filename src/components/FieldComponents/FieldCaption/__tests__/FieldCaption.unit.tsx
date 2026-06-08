import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { cnText } from '##/components/Text';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { fieldPropStatus } from '../../__mocks__/variants';
import { FieldCaption } from '..';

createRoot();
clearStack();

type FieldCaptionProps = React.ComponentProps<typeof FieldCaption>;

const testId = 'FieldCaption';

const renderComponent = (ctx: TestContext, props: FieldCaptionProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldCaption data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
};

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe('проверка ref', () => {
    test(`ref присвоен`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          ref: (el: HTMLElement) => setRef(ref, el),
        });

        expect(ref.current).toBeTruthy();
      }));
  });

  describe('проверка props', () => {
    describe('проверка className', () => {
      test(`Присваивается дополнительный className`, (ctx) =>
        context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка children', () => {
      test(`Пробрасывается children`, (ctx) =>
        context.start(async () => {
          const children = 'children';

          renderComponent(ctx, { children });

          expect(getRender(ctx)).toHaveTextContent(children);
        }));
    });

    describe('проверка status', () => {
      const tags = [...fieldPropStatus, undefined] as const;
      tags.forEach((status) => {
        test(`Должен рендериться как ${cnText({
          view: status || 'ghost',
        })}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status });

            const component = getRender(ctx);

            expect(component).toHaveClass(cnText({ view: status || 'ghost' }));
          }));
      });
    });

    describe('проверка other props', () => {
      const props = ['data-attr', 'role', 'id'] as const;

      props.forEach((prop) => {
        test(`присваивается  ${prop}=${prop}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { [prop]: prop });

            expect(getRender(ctx)).toHaveAttribute(prop, prop);
          }));
      });
    });

    describe('проверка Text props', () => {
      test('Присваивается size="xs"', (ctx) =>
        context.start(async () => {
          renderComponent(ctx);

          expect(getRender(ctx)).toHaveClass(cnText({ size: 'xs' }));
        }));

      test('Присваивается lineHeight="m"', (ctx) =>
        context.start(async () => {
          renderComponent(ctx);

          expect(getRender(ctx)).toHaveClass(cnText({ lineHeight: 'm' }));
        }));
    });
  });
});
