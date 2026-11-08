import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cn } from '../../../utils/bem';
import {
  getColorIndexForName,
  getInitialsForName,
  MAX_COLOR_INDEX,
} from '../../Avatar/helpers';
import { avatarGroupItems } from '../__mocks__/mock.data';
import {
  AvatarGroup,
  AvatarGroupDefaultItem,
  avatarGroupPropForm,
  AvatarGroupProps,
  avatarGroupPropSize,
} from '../AvatarGroup';

createRoot();
clearStack();

const testId = 'AvatarGroup';

const cnAvatar = cn('Avatar');
const cnAvatarGroup = cn('AvatarGroup');

/* cspell:disable */
const nameItems: AvatarGroupDefaultItem[] = [
  { name: 'Анна Петрова', url: '' },
  { name: 'Борис Соколов', url: '' },
  { name: 'Вера Кузнецова', url: '' },
  { name: 'Глеб Морозов', url: '' },
];

const stringItems = ['Анна Петрова', 'Борис Соколов', 'Вера Кузнецова'];
/* cspell:enable */

const createRenderer = (ctx: TestContext) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  function render<ITEM = AvatarGroupDefaultItem>(
    props: AvatarGroupProps<ITEM> = {},
  ) {
    // Тесты props не должны каждый раз передавать items, но `items: undefined`
    // нужно прокинуть дальше — так проверяется дефолт компонента.
    const items = ('items' in props
      ? props.items
      : avatarGroupItems) as unknown as ITEM[];

    act(() => {
      root.render(
        <reatomContext.Provider value={top()}>
          <Theme preset={presetGpnDefault}>
            <AvatarGroup {...props} data-testid={testId} items={items} />
          </Theme>
        </reatomContext.Provider>,
      );
    });
  }

  return render;
};

function renderComponent<ITEM = AvatarGroupDefaultItem>(
  ctx: TestContext,
  props: AvatarGroupProps<ITEM> = {},
) {
  createRenderer(ctx)(props);
}

const getRender = (ctx: TestContext) => {
  return document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
};

// Элемент More тоже носит класс Avatar, поэтому `.Avatar` это "аватары + More".
const getItems = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnAvatar()}`) as unknown as HTMLElement[];
};

const getItem = (ctx: TestContext, index = 0) => {
  const items = getItems(ctx);
  return items[index];
};

const getAvatars = (ctx: TestContext) =>
  Array.from(
    getRender(ctx).querySelectorAll(`.${cnAvatarGroup('Avatar')}`),
  ) as HTMLElement[];

const getAvatar = (ctx: TestContext, index = 0) => getAvatars(ctx)[index];

const getAvatarImage = (ctx: TestContext, index = 0) =>
  getAvatar(ctx, index).querySelector(`.${cnAvatar('Image')}`);

const getMore = (ctx: TestContext) => {
  const render = getRender(ctx);
  return render.querySelectorAll(`.${cnAvatarGroup('More')}`)[0];
};

const getAvatarColor = (ctx: TestContext, index = 0) =>
  getAvatar(ctx, index).style.getPropertyValue('--avatar-color');

const hiddenModifier = (block: 'Avatar' | 'More') =>
  cnAvatarGroup(block, { hidden: true })
    .replace(cnAvatarGroup(block), '')
    .trim();

describe('Компонент AvatarGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка items', () => {
      test('количество аватаров равно количеству items', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems,
            visibleCount: nameItems.length,
          });

          expect(getAvatars(ctx).length).toEqual(nameItems.length);
        }));

      test('количество аватаров ограничено visibleCount по умолчанию', (ctx) =>
        context.start(async () => {
          renderComponent(ctx);

          expect(getAvatars(ctx).length).toEqual(4);
        }));

      test('элемент More не входит в список аватаров', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 4 });

          expect(getItems(ctx).length).toEqual(getAvatars(ctx).length + 1);
          expect(getMore(ctx)).not.toHaveClass(cnAvatarGroup('Avatar'));
          expect(getAvatar(ctx, 0)).not.toHaveClass(cnAvatarGroup('More'));
        }));

      test('элемент More стоит первым в DOM', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 2 });

          expect(getRender(ctx).firstElementChild).toHaveClass(
            cnAvatarGroup('More'),
          );
        }));

      test('items выводятся в обратном порядке', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems,
            visibleCount: nameItems.length,
          });

          const reversed = [...nameItems].reverse();
          reversed.forEach((item, index) => {
            expect(getAvatar(ctx, index)).toHaveTextContent(
              getInitialsForName(item.name),
            );
          });
        }));

      test('без items рендерится пустой контейнер', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items: undefined });

          expect(getRender(ctx).childElementCount).toEqual(0);
          expect(getMore(ctx)).toBeUndefined();
        }));

      test('пустой массив items рендерит пустой контейнер', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items: [] });

          expect(getRender(ctx).childElementCount).toEqual(0);
          expect(getMore(ctx)).toBeUndefined();
        }));

      test('для items без url выводятся инициалы имени', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems,
            visibleCount: nameItems.length,
          });

          nameItems.forEach((item, index) => {
            const avatar = getAvatar(ctx, nameItems.length - 1 - index);
            expect(avatar).toHaveTextContent(getInitialsForName(item.name));
            expect(
              getAvatarImage(ctx, nameItems.length - 1 - index),
            ).toBeNull();
          });
        }));

      test('url имеет приоритет над name', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: [{ name: 'Анна Петрова', url: '/static/avatar.png' }],
          });

          const image = getAvatarImage(ctx, 0);
          expect(image).not.toBeNull();
          expect(image?.getAttribute('src')).toEqual('/static/avatar.png');
          expect(image?.getAttribute('alt')).toEqual('Анна Петрова');
          expect(getAvatar(ctx, 0).textContent).toEqual('');
        }));

      test('элемент с url без имени рендерит изображение без alt', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items: [{ url: '/static/avatar.png' }] });

          const image = getAvatarImage(ctx, 0);
          expect(image?.getAttribute('src')).toEqual('/static/avatar.png');
          // React опускает атрибут, когда name не передан.
          expect(image?.getAttribute('alt')).toBeNull();
        }));

      test('цвет аватара без url зависит от имени', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems,
            visibleCount: nameItems.length,
          });

          nameItems.forEach((item, index) => {
            expect(getAvatarColor(ctx, nameItems.length - 1 - index)).toEqual(
              `var(--avatar-color-${getColorIndexForName(
                item.name,
                MAX_COLOR_INDEX,
              )})`,
            );
          });
        }));

      test('для аватара с url цвет не задаётся inline', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: [{ name: 'Анна Петрова', url: '/static/avatar.png' }],
          });

          expect(
            getAvatar(ctx, 0).style.getPropertyValue('--avatar-color'),
          ).toEqual('');
        }));
    });

    describe('проверка getItemName', () => {
      test('инициалы берутся из возвращённого имени', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: stringItems,
            visibleCount: stringItems.length,
            getItemName: (item) => item,
          });

          [...stringItems].reverse().forEach((item, index) => {
            expect(getAvatar(ctx, index)).toHaveTextContent(
              getInitialsForName(item),
            );
          });
        }));

      test('без getItemName кастомные items не ломают рендер', (ctx) =>
        context.start(async () => {
          expect(() =>
            renderComponent(ctx, {
              items: stringItems,
              visibleCount: stringItems.length,
            }),
          ).not.toThrow();
        }));
    });

    describe('проверка getItemUrl', () => {
      test('изображение берётся из возвращённого url', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: stringItems,
            visibleCount: stringItems.length,
            getItemName: (item) => item,
            getItemUrl: () => '/static/avatar.png',
          });

          stringItems.forEach((_, index) => {
            expect(getAvatarImage(ctx, index)?.getAttribute('src')).toEqual(
              '/static/avatar.png',
            );
          });
        }));

      test('геттеры items работают вместе', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: [{ fullName: 'Анна Петрова', avatar: '/static/a.png' }],
            getItemName: (item) => item.fullName,
            getItemUrl: (item) => item.avatar,
          });

          const image = getAvatarImage(ctx, 0);
          expect(image?.getAttribute('src')).toEqual('/static/a.png');
          expect(image?.getAttribute('alt')).toEqual('Анна Петрова');
        }));
    });

    describe('проверка form', () => {
      avatarGroupPropForm.forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form });

            const avatar = getItem(ctx, 1);
            expect(avatar).toHaveClass(cnAvatar({ form }));
          }));

        test(`присваивает класс для form=${form} элементу More`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form, visibleCount: 2 });

            expect(getMore(ctx)).toHaveClass(cnAvatar({ form }));
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

        test(`присваивает класс корню для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });

            expect(getRender(ctx)).toHaveClass(cnAvatarGroup({ size }));
          }));

        test(`присваивает класс для size=${size} элементу More`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, visibleCount: 2 });

            expect(getMore(ctx)).toHaveClass(cnAvatar({ size }));
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

      test('если visibleCount равен длине массива то more не выводится', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: avatarGroupItems.length });

          expect(getAvatars(ctx).length).toEqual(avatarGroupItems.length);
          expect(getMore(ctx)).toBeUndefined();
        }));

      test(`элемент ${cnAvatarGroup('More')} отображается верно`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 3 });

          const more = getMore(ctx);
          expect(more.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
        }));

      test('visibleCount=0 выводит только элемент More', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 0 });

          expect(getAvatars(ctx).length).toEqual(0);
          expect(getMore(ctx).textContent).toEqual(
            `+${avatarGroupItems.length}`,
          );
        }));

      test('visibleCount=1 выводит первый item и элемент More', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 1 });

          expect(getAvatars(ctx).length).toEqual(1);
          expect(getAvatar(ctx, 0)).toHaveTextContent(
            getInitialsForName(avatarGroupItems[0].name),
          );
          expect(getMore(ctx).textContent).toEqual(
            `+${avatarGroupItems.length - 1}`,
          );
        }));

      test('при числовом visibleCount модификатор hidden не применяется', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 2 });

          getAvatars(ctx).forEach((avatar) => {
            expect(avatar).not.toHaveClass(hiddenModifier('Avatar'));
          });
          expect(getMore(ctx)).not.toHaveClass(hiddenModifier('More'));
        }));
    });

    describe("проверка visibleCount='auto'", () => {
      // В тестах CSS не подключается (`css: false` в vite.config.ts), поэтому у
      // элементов нулевые размеры и переполнения контейнера не происходит.
      test('выводятся все элементы без ограничения по количеству', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 'auto' });

          expect(getAvatars(ctx).length).toEqual(avatarGroupItems.length);
          expect(getMore(ctx)).toBeDefined();
        }));

      test('порядок элементов обратный', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems,
            visibleCount: 'auto',
          });

          [...nameItems].reverse().forEach((item, index) => {
            expect(getAvatar(ctx, index)).toHaveTextContent(
              getInitialsForName(item.name),
            );
          });
        }));

      test('элемент More выводится даже когда элементов меньше двух', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems.slice(0, 1),
            visibleCount: 'auto',
          });

          expect(getAvatars(ctx).length).toEqual(1);
          expect(getMore(ctx)).toBeDefined();
        }));

      test('без переполнения контейнера скрыт только элемент More', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 'auto' });

          expect(getMore(ctx)).toHaveClass(hiddenModifier('More'));
          getAvatars(ctx).forEach((avatar) => {
            expect(avatar).not.toHaveClass(hiddenModifier('Avatar'));
          });
        }));

      test('счётчик More в auto-режиме включает сам элемент More', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { visibleCount: 'auto' });

          // getHiddenCount считает все falsy значения visibleMap, а слот More в
          // ней всегда false — поэтому при нулевых размерах счётчик равен 1.
          expect(getMore(ctx).textContent).toEqual('+1');
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

      test('monochrome задаёт цвет по getColorIndexForName', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: nameItems,
            monochrome: true,
            visibleCount: nameItems.length,
          });

          const colorIndex = getColorIndexForName(
            nameItems[0].name,
            MAX_COLOR_INDEX,
            true,
          );
          getAvatars(ctx).forEach((_, index) => {
            expect(getAvatarColor(ctx, index)).toEqual(
              `var(--avatar-color-${colorIndex})`,
            );
          });
        }));

      test('monochrome для items с url добавляет модификатор без inline цвета', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: [{ name: 'Анна Петрова', url: '/static/avatar.png' }],
            monochrome: true,
          });

          expect(getAvatar(ctx, 0)).toHaveClass(cnAvatar({ monochrome: true }));
          expect(getAvatarColor(ctx, 0)).toEqual('');
        }));

      test('monochrome не добавляет модификатор item без url', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: [{ name: 'Анна Петрова', url: '' }],
            monochrome: true,
          });

          expect(getAvatar(ctx, 0)).not.toHaveClass(
            cnAvatar({ monochrome: true }),
          );
        }));

      test('monochrome=false эквивалентен отсутствию monochrome', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items: [{ name: 'Анна Петрова', url: '' }],
            monochrome: false,
          });

          expect(getAvatar(ctx, 0)).not.toHaveClass(
            cnAvatar({ monochrome: true }),
          );
          expect(getAvatarColor(ctx, 0)).toEqual(
            `var(--avatar-color-${getColorIndexForName(
              'Анна Петрова',
              MAX_COLOR_INDEX,
            )})`,
          );
        }));

      test('monochrome не применяется к элементу More', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { monochrome: true, visibleCount: 2 });

          expect(getMore(ctx)).not.toHaveClass(cnAvatar({ monochrome: true }));
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

    describe('проверка других HTML-атрибутов', () => {
      test('прокидывает id, role, aria-label и tabIndex в корень', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            'id': 'group-id',
            'role': 'group',
            'aria-label': 'Группа участников',
            'tabIndex': 0,
          });

          expect(getRender(ctx)).toHaveAttribute('id', 'group-id');
          expect(getRender(ctx)).toHaveAttribute('role', 'group');
          expect(getRender(ctx)).toHaveAttribute(
            'aria-label',
            'Группа участников',
          );
          expect(getRender(ctx)).toHaveAttribute('tabindex', '0');
        }));
    });

    describe('проверка ререндера', () => {
      test('при сокращении items элемент More исчезает', (ctx) =>
        context.start(async () => {
          const render = createRenderer(ctx);

          render({ items: avatarGroupItems, visibleCount: 2 });
          expect(getMore(ctx)).toBeDefined();

          render({ items: avatarGroupItems.slice(0, 1), visibleCount: 2 });
          expect(getAvatars(ctx).length).toEqual(1);
          expect(getMore(ctx)).toBeUndefined();
        }));

      test('при росте items счётчик More увеличивается', (ctx) =>
        context.start(async () => {
          const render = createRenderer(ctx);

          render({ items: nameItems, visibleCount: 2 });
          expect(getMore(ctx).textContent).toEqual(`+${nameItems.length - 2}`);

          render({ items: avatarGroupItems, visibleCount: 2 });
          expect(getMore(ctx).textContent).toEqual(
            `+${avatarGroupItems.length - 2}`,
          );
        }));

      test('при изменении visibleCount количество аватаров обновляется', (ctx) =>
        context.start(async () => {
          const render = createRenderer(ctx);

          render({ items: avatarGroupItems, visibleCount: 2 });
          expect(getAvatars(ctx).length).toEqual(2);

          render({ items: avatarGroupItems, visibleCount: 6 });
          expect(getAvatars(ctx).length).toEqual(6);
        }));
    });
  });
});
