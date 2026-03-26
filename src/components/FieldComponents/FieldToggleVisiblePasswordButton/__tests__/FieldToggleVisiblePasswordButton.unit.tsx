import { cnIcon } from '@consta/icons/Icon';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { getFieldIconSize } from '##/components/FieldComponents';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { FieldToggleVisiblePasswordButton } from '..';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof FieldToggleVisiblePasswordButton>;

const testId = 'FieldToggleVisiblePasswordButton';

const renderComponent = (ctx: TestContext, props: Props = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldToggleVisiblePasswordButton data-testid={testId} {...props} />
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

const getAnimateIconBase = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelector(`.${cnIcon()}`) as HTMLSpanElement;
};

const getIcon = (ctx: TestContext) => {
  const animateIconBase = getAnimateIconBase(ctx);
  return animateIconBase.querySelector(`.${cnIcon()}`);
};

describe.concurrent(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe.concurrent('проверка ref', () => {
    test(`ref присвоен`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          ref: (el) => setRef(ref, el),
        });
        await wrap(tick());

        expect(ref.current).toBeTruthy();
      }));
  });

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка className', () => {
      test(`Присваивается дополнительный className`, (ctx) =>
        context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка active', () => {
      test(`при  active: false отображается иконка IconEye`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { active: false });
          await wrap(tick());
          expect(getIcon(ctx)).toHaveClass('IconEye');
        }));

      test(`при  active: true отображается иконка IconEyeClose`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { active: true });
          await wrap(tick());
          expect(getIcon(ctx)).toHaveClass('IconEyeClose');
        }));
    });

    describe.concurrent('проверка size', () => {
      const sizes = ['s', 'm', 'l', 'xs'] as const;
      sizes.forEach((size) => {
        test(`У иконки класс ${cnIcon({
          size,
        })}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            await wrap(tick());

            expect(getAnimateIconBase(ctx)).toHaveClass(
              cnIcon({ size: getFieldIconSize(size) }),
            );
          }));
      });
    });

    describe.concurrent('проверка other props', () => {
      const props = ['data-attr', 'role', 'id'] as const;

      props.forEach((prop) => {
        test(`присваивается  ${prop}=${prop}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { [prop]: prop });
            await wrap(tick());

            expect(getRender(ctx)).toHaveAttribute(prop, prop);
          }));
      });
    });
  });
});
