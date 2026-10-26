import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  cnUser,
  User,
  userPropSize,
  userPropStatus,
  userPropView,
  userPropWidth,
} from '../User';

createRoot();
clearStack();

type UserProps = React.ComponentProps<typeof User>;

const testId = cnUser();

const renderComponent = (ctx: TestContext, props: UserProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <User data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

function getRender(ctx: TestContext) {
  return document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
}

function getAvatar(ctx: TestContext) {
  return getRender(ctx).querySelector(
    `.${cnUser('AvatarWrapper')}`,
  ) as HTMLElement;
}

function getName(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnUser('Name')}`) as HTMLElement;
}

function getInfo(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnUser('Info')}`) as HTMLElement;
}

function getArrow(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnUser('Icon')}`) as HTMLElement;
}

describe('Компонент User', () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      userPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, async (ctx) => {
          await context.start(async () => {
            renderComponent(ctx, { size });

            await wrap(tick());

            expect(getRender(ctx)).toHaveClass(cnUser({ size }));
          });
        });
      });
    });

    describe('проверка status', () => {
      userPropStatus.forEach((status) => {
        test(`присваивает класс для status=${status}`, async (ctx) => {
          await context.start(async () => {
            renderComponent(ctx, { status });

            await wrap(tick());

            expect(getAvatar(ctx)).toHaveClass(
              cnUser('AvatarWrapper', { status }),
            );
          });
        });
      });
    });

    describe('проверка view', () => {
      userPropView.forEach((view) => {
        test(`присваивает класс для view=${view}`, async (ctx) => {
          await context.start(async () => {
            renderComponent(ctx, { view });

            await wrap(tick());

            expect(getRender(ctx)).toHaveClass(cnUser({ view }));
          });
        });
      });
    });

    describe('проверка width', () => {
      userPropWidth.forEach((width) => {
        test(`присваивает класс для width=${width}`, async (ctx) => {
          await context.start(async () => {
            renderComponent(ctx, { width });

            await wrap(tick());

            expect(getRender(ctx)).toHaveClass(cnUser({ width }));
          });
        });
      });
    });

    describe('проверка name', () => {
      test(`текст отображается`, async (ctx) => {
        await context.start(async () => {
          const name = 'name';
          renderComponent(ctx, { name });

          await wrap(tick());

          expect(getName(ctx)?.textContent).toEqual(name);
        });
      });
    });

    describe('проверка info', () => {
      test(`текст отображается`, async (ctx) => {
        await context.start(async () => {
          const info = 'info';
          renderComponent(ctx, { info });

          await wrap(tick());

          expect(getInfo(ctx)?.textContent).toEqual(info);
        });
      });
    });

    describe('проверка minified', () => {
      test(`если onlyAvatar, то не отображать name и info`, async (ctx) => {
        await context.start(async () => {
          const name = 'name';
          const info = 'info';
          renderComponent(ctx, { info, name, onlyAvatar: true });

          await wrap(tick());

          expect(getRender(ctx).textContent).toEqual('N');
        });
      });

      test(`если onlyAvatar, то применить модификатор minified`, async (ctx) => {
        await context.start(async () => {
          const name = 'name';
          const info = 'info';
          renderComponent(ctx, { info, name, onlyAvatar: true });

          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnUser({ minified: true }));
        });
      });

      test(`если нет name и info, то применить модификатор minified`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, {});

          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnUser({ minified: true }));
        });
      });
    });

    describe('проверка withArrow', () => {
      test(`к блоку применился модификатор withArrow`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { withArrow: true });

          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnUser({ withArrow: true }));
        });
      });

      test(`элемент Arrow отобразился c иконкой`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { withArrow: true });

          await wrap(tick());

          expect(getArrow(ctx)).toHaveClass('IconSelect');
        });
      });
    });
  });
});
