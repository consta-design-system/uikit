import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cn } from '../../../utils/bem';
import { avatarGroupItems } from '../__mocks__/mock.data';
import {
  AvatarGroup,
  avatarGroupPropForm,
  AvatarGroupProps,
  avatarGroupPropSize,
} from '../AvatarGroup';

createRoot();
clearStack();

const testId = 'AvatarGroup';

const cnAvatar = cn('Avatar');
const cnAvatarGroup = cn('AvatarGroup');

const renderComponent = (ctx: TestContext, props: AvatarGroupProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <AvatarGroup
            data-testid={testId}
            items={avatarGroupItems}
            {...props}
          />
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

const getItems = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnAvatar()}`) as unknown as HTMLElement[];
};

const getItem = (ctx: TestContext, index = 0) => {
  const items = getItems(ctx);
  return items[index];
};

const getMore = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnAvatarGroup('More')}`)[0];
};

describe.concurrent('Компонент AvatarGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка form', () => {
      avatarGroupPropForm.forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form });
            await wrap(tick());
            const avatar = getItem(ctx, 1);
            expect(avatar).toHaveClass(cnAvatar({ form }));
          }));
      });
    });

    describe.concurrent('проверка size', () => {
      avatarGroupPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            await wrap(tick());
            const avatar = getItem(ctx, 1);
            expect(avatar).toHaveClass(cnAvatar({ size }));
          }));
      });
    });

    describe.concurrent('проверка visibleCount', () => {
      test('количество элементов должно быть равно visibleCount + more', (ctx) =>
        context.start(async () => {
          const visibleCount = 3;
          renderComponent(ctx, { visibleCount });
          await wrap(tick());
          const items = getItems(ctx);
          expect(items.length).toEqual(visibleCount + 1);
        }));

      test('если visibleCount больше чем длинна массива то должны выводится все элементы без more', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: avatarGroupItems.length + 3 });
          await wrap(tick());
          const items = getItems(ctx);
          expect(items.length).toEqual(avatarGroupItems.length);
        }));

      test(`элемент ${cnAvatarGroup('More')} отображается верно`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 3 });
          await wrap(tick());
          const more = getMore(ctx);
          expect(more.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
        }));
    });

    describe.concurrent('проверка className', () => {
      test('присваивает класс для className', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { className: 'test-class' });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass('test-class');
        }));
    });

    describe.concurrent('проверка style', () => {
      test('присваивает стиль для style', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { style: { backgroundColor: 'red' } });
          await wrap(tick());
          expect(getRender(ctx)).toHaveStyle('background-color: red');
        }));
    });

    describe.concurrent('проверка ref', () => {
      test('присваивает ref', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, { ref });
          await wrap(tick());
          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe.concurrent('проверка onClick', () => {
      test('вызывает onClick при клике на компонент', (ctx) =>
        context.start(async () => {
          const onClick = vi.fn();
          renderComponent(ctx, { onClick });
          await wrap(tick());
          const render = getRender(ctx);
          fireEvent.click(render);
          expect(onClick).toHaveBeenCalled();
        }));
    });

    describe.concurrent('проверка monochrome', () => {
      test('присваивает класс для monochrome', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { monochrome: true });
          await wrap(tick());

          expect(
            getItem(ctx, 1).style.getPropertyValue('--avatar-color'),
          ).toEqual('var(--avatar-color-18)');
        }));
    });
  });
});
