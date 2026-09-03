import { IconLeaf } from '@consta/icons/IconLeaf';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnInformer, Informer, informerPropView } from '../Informer';

createRoot();
clearStack();

type InformerProps = React.ComponentProps<typeof Informer>;

const testId = 'Informer';

const renderComponent = (ctx: TestContext, props: InformerProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Informer data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

const getIcon = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnInformer('Icon')}`);

describe('Компонент Informer', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, {});

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка label', () => {
      test(`label отображается`, (ctx) =>
        context.start(async () => {
          const label = 'Label';

          renderComponent(ctx, { label });

          expect(getRender(ctx).textContent).toEqual(label);
        }));
    });

    describe('проверка Title', () => {
      test(`Title отображается`, (ctx) =>
        context.start(async () => {
          const title = 'Title';

          renderComponent(ctx, { title });

          expect(getRender(ctx).textContent).toEqual(title);
        }));
    });

    describe('проверка icon', () => {
      test(`иконка отображается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { icon: IconLeaf });

          const icon = getIcon(ctx);
          expect(icon).toHaveClass('IconLeaf');
        }));
    });

    describe('проверка view', () => {
      informerPropView.forEach((view) => {
        test(`присваивает класс для view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { view });

            expect(getRender(ctx)).toHaveClass(cnInformer({ view }));
          }));
      });
    });
  });
});
