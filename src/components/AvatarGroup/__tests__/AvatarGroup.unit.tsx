import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

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

describe('Компонент AvatarGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка form', () => {
      avatarGroupPropForm.forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form });

            const avatar = getItem(ctx, 1);
            expect(avatar).toHaveClass(cnAvatar({ form }));
          }));
      });
    });

    describe('проверка size', () => {
      avatarGroupPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });

            const avatar = getItem(ctx, 1);
            expect(avatar).toHaveClass(cnAvatar({ size }));
          }));
      });
    });

    describe('проверка visibleCount', () => {
      test('количество элементов должно быть равно visibleCount + more', (ctx) =>
        context.start(async () => {
          const visibleCount = 3;
          renderComponent(ctx, { visibleCount });

          const items = getItems(ctx);
          expect(items.length).toEqual(visibleCount + 1);
        }));

      test('если visibleCount больше чем длинна массива то должны выводится все элементы без more', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: avatarGroupItems.length + 3 });

          const items = getItems(ctx);
          expect(items.length).toEqual(avatarGroupItems.length);
        }));

      test(`элемент ${cnAvatarGroup('More')} отображается верно`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 3 });

          const more = getMore(ctx);
          expect(more.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
        }));
    });

    describe('проверка className', () => {
      test('присваивает класс для className', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { className: 'test-class' });

          expect(getRender(ctx)).toHaveClass('test-class');
        }));
    });

    describe('проверка style', () => {
      test('присваивает стиль для style', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { style: { backgroundColor: 'red' } });

          expect(getRender(ctx)).toHaveStyle('background-color: red');
        }));
    });

    describe('проверка ref', () => {
      test('присваивает ref', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, { ref });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe('проверка onClick', () => {
      test('вызывает onClick при клике на компонент', (ctx) =>
        context.start(async () => {
          const onClick = vi.fn();
          renderComponent(ctx, { onClick });

          const render = getRender(ctx);
          fireEvent.click(render);
          expect(onClick).toHaveBeenCalled();
        }));
    });

    describe('проверка monochrome', () => {
      test('присваивает класс для monochrome', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { monochrome: true });

          expect(
            getItem(ctx, 1).style.getPropertyValue('--avatar-color'),
          ).toEqual('var(--avatar-color-18)');
        }));
    });
  });
});
