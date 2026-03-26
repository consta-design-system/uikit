import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { Avatar, avatarPropForm, avatarPropSize, cnAvatar } from '../Avatar';
import {
  getColorIndexForName,
  getInitialsForName,
  getRandomInt,
} from '../helpers';

createRoot();
clearStack();

const testId = cnAvatar();
type AvatarProps = React.ComponentProps<typeof Avatar>;

const renderComponent = (ctx: TestContext, props: AvatarProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Avatar data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLElement;

describe.concurrent('Компонент Avatar', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка form', () => {
      avatarPropForm.forEach((form) => {
        test(`присваивает класс для form=${form}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { form });

            await wrap(tick());

            expect(getRender(ctx)).toHaveClass(cnAvatar({ form }));
          }));
      });
    });

    describe.concurrent('проверка size', () => {
      avatarPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });
            await wrap(tick());
            const avatar = getRender(ctx);

            expect(avatar).toHaveClass(cnAvatar({ size }));
          }));
      });
    });

    describe.concurrent('проверка тэга', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        test(`должен рендериться как <${el}>`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { as: el });
            await wrap(tick());
            const avatar = getRender(ctx);

            expect(avatar?.nodeName).toEqual(el.toUpperCase());
          }));
      });
    });

    describe.concurrent('проверка url', () => {
      test('должен добавиться указанный url', (ctx) =>
        context.start(async () => {
          const url =
            'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png';
          const name = 'Вадим Матвеев';

          renderComponent(ctx, { url, name });
          await wrap(tick());
          const avatar = getRender(ctx);
          const img = avatar?.querySelector('img') as HTMLImageElement;

          expect(img).toBeTruthy();
          expect(img.src).toEqual(url);
        }));

      test('должны отобразиться инициалы без url', (ctx) =>
        context.start(async () => {
          const name = 'Вадим Матвеев';
          const initials = getInitialsForName(name);

          renderComponent(ctx, { name });
          await wrap(tick());
          const avatar = getRender(ctx);
          const img = avatar?.querySelector('img') as HTMLImageElement;

          expect(img).toBeFalsy();
          expect(avatar?.textContent).toEqual(initials);
        }));
    });

    describe.concurrent('проверка name', () => {
      test('должен добавиться указанный name', (ctx) =>
        context.start(async () => {
          const url =
            'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png';
          const name = 'Вадим Матвеев';

          renderComponent(ctx, { url, name });
          await wrap(tick());
          const avatar = getRender(ctx);
          const img = avatar?.querySelector('img') as HTMLImageElement;

          expect(img).toBeTruthy();
          expect(img.alt).toEqual(name);
        }));
    });

    describe.concurrent('проверка monochrome', () => {
      test('должен использовать monochrome цвет, если monochrome=true', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { monochrome: true });
          await wrap(tick());

          expect(getRender(ctx).style.getPropertyValue('--avatar-color')).toBe(
            'var(--avatar-color-18)',
          );
        }));

      test('не должен использовать monochrome цвет, если monochrome=false', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { monochrome: false, name: 'Test User' });
          await wrap(tick());

          expect(
            getRender(ctx).style.getPropertyValue('--avatar-color'),
          ).not.toBe('var(--avatar-color-18)');
        }));
    });

    describe.concurrent('проверка стилей', () => {
      test('должен добавлять кастомные стили', (ctx) =>
        context.start(async () => {
          const customStyle = { backgroundColor: 'red' };

          renderComponent(ctx, { style: customStyle });
          await wrap(tick());
          const avatar = getRender(ctx);

          expect(avatar).toHaveStyle('background-color: red');
        }));
    });

    describe.concurrent('проверка className', () => {
      test('должен добавлять пользовательский className', (ctx) =>
        context.start(async () => {
          const customClass = 'custom-class';
          renderComponent(ctx, { className: customClass });
          await wrap(tick());
          const avatar = getRender(ctx);

          expect(avatar).toHaveClass(customClass);
        }));
    });

    describe.concurrent('проверка отображения инициалов', () => {
      test('должен отображать инициалы, если имя указано', (ctx) =>
        context.start(async () => {
          const name = 'John Doe';
          const initials = getInitialsForName(name);

          renderComponent(ctx, { name });
          await wrap(tick());
          const avatar = getRender(ctx);

          expect(avatar?.textContent).toEqual(initials);
        }));

      test('не должен отображать инициалы, если имя не указано', (ctx) =>
        context.start(async () => {
          renderComponent(ctx);
          await wrap(tick());
          const avatar = getRender(ctx);

          expect(avatar?.textContent).toEqual('');
        }));
    });

    describe.concurrent('проверка комбинации props', () => {
      test('должен корректно рендериться с url и monochrome', (ctx) =>
        context.start(async () => {
          const url = 'https://example.com/avatar.png';
          const name = 'John Doe';

          renderComponent(ctx, { url, name, monochrome: true });
          await wrap(tick());
          const avatar = getRender(ctx);
          const img = avatar?.querySelector('img') as HTMLImageElement;

          expect(img).toBeTruthy();
          expect(img.src).toEqual(url);
          expect(avatar?.textContent).toEqual('');
        }));

      test('должен корректно рендериться без url и с monochrome', (ctx) =>
        context.start(async () => {
          const name = 'John Doe';

          renderComponent(ctx, { name, monochrome: true });
          await wrap(tick());
          const avatar = getRender(ctx);

          expect(avatar?.textContent).toEqual('JD');

          expect(avatar.style.getPropertyValue('--avatar-color')).toBe(
            'var(--avatar-color-18)',
          );
        }));
    });
  });

  describe.concurrent('проверка вспомогательных функций', () => {
    describe.concurrent('проверка getInitialsForName', () => {
      test('пустая строка', (ctx) =>
        context.start(async () => {
          const name = '';
          const initials = getInitialsForName(name);

          expect(initials).toEqual('');
        }));

      test('одно слово', (ctx) =>
        context.start(async () => {
          const name = 'first';
          const initials = getInitialsForName(name);

          expect(initials).toEqual('F');
        }));

      test('два слова', (ctx) =>
        context.start(async () => {
          const name = 'first second';
          const initials = getInitialsForName(name);

          expect(initials).toEqual('FS');
        }));

      test('три слова', (ctx) =>
        context.start(async () => {
          const name = 'first second third';
          const initials = getInitialsForName(name);

          expect(initials).toEqual('FS');
        }));
    });

    describe.concurrent('проверка getColorIndexForName', () => {
      const maxColorIndex = 17;

      test('пустая строка', (ctx) =>
        context.start(async () => {
          const name = '';
          const colorIndex = getColorIndexForName(name, maxColorIndex);

          expect(colorIndex).toBeGreaterThanOrEqual(0);
          expect(colorIndex).toBeLessThanOrEqual(maxColorIndex);
        }));

      test('функция должна быть детерминированной', (ctx) =>
        context.start(async () => {
          const names = [
            'Liam',
            'Noah William',
            'James Oliver',
            'Ethan Jacob',
            'Benjamin Elijah Lucas',
          ];
          const colorIndexes: { [value: string]: number } = names.reduce(
            (acc, name) => {
              return {
                ...acc,
                [name]: getColorIndexForName(name, maxColorIndex),
              };
            },
            {},
          );

          names.reverse().forEach((name) => {
            const colorIndex = getColorIndexForName(name, maxColorIndex);

            expect(colorIndex).toBeGreaterThanOrEqual(0);
            expect(colorIndex).toBeLessThanOrEqual(maxColorIndex);
            expect(colorIndexes[name]).toEqual(colorIndex);
          });
        }));
    });

    describe.concurrent('проверка getRandomInt', () => {
      test('должен возвращать значение в пределах max', (ctx) =>
        context.start(async () => {
          const max = 10;
          const randomValue = getRandomInt(max);

          expect(randomValue).toBeGreaterThanOrEqual(0);
          expect(randomValue).toBeLessThan(max);
        }));
    });
  });
});
