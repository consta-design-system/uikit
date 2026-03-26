import { IconLeaf } from '@consta/icons/IconLeaf';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

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

describe.concurrent('Компонент Informer', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () => renderComponent(ctx, {});
      await wrap(tick());
      expect(render).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка label', () => {
      test(`label отображается`, (ctx) =>
        context.start(async () => {
          const label = 'Label';

          renderComponent(ctx, { label });

          await wrap(tick());
          expect(getRender(ctx).textContent).toEqual(label);
        }));
    });

    describe.concurrent('проверка Title', () => {
      test(`Title отображается`, (ctx) =>
        context.start(async () => {
          const title = 'Title';

          renderComponent(ctx, { title });

          await wrap(tick());
          expect(getRender(ctx).textContent).toEqual(title);
        }));
    });

    describe.concurrent('проверка icon', () => {
      test(`иконка отображается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { icon: IconLeaf });

          await wrap(tick());
          const icon = getIcon(ctx);
          expect(icon).toHaveClass('IconLeaf');
        }));
    });

    describe.concurrent('проверка view', () => {
      informerPropView.forEach((view) => {
        test(`присваивает класс для view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { view });

            await wrap(tick());
            expect(getRender(ctx)).toHaveClass(cnInformer({ view }));
          }));
      });
    });
  });
});
