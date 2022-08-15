import { render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  Avatar,
  avatarPropForm,
  avatarPropSize,
  cnAvatar,
  getColorIndexForName,
  getInitialsForName,
} from '../Avatar';

type AvatarProps = React.ComponentProps<typeof Avatar>;

const testId = 'avatar';
const maxColorIndex = 17;

const renderComponent = (props: AvatarProps = {}) => {
  return render(<Avatar data-testid={testId} {...props} />);
};

describe('Компонент Avatar', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка form', () => {
      avatarPropForm.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });

          const avatar = screen.getByTestId(testId);

          expect(avatar).toHaveClass(cnAvatar({ form }));
        });
      });
    });
    describe('проверка size', () => {
      avatarPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          const avatar = screen.getByTestId(testId);

          expect(avatar).toHaveClass(cnAvatar({ size }));
        });
      });
    });
    describe('проверка тэга', () => {
      const tags = ['a', 'div', 'span'] as const;

      tags.forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ as: el });

          const avatar = screen.getByTestId(testId);

          expect(avatar.tagName).toEqual(el.toUpperCase());
        });
      });
    });
    describe('проверка url', () => {
      it('должен добавиться указанный url', () => {
        const url =
          'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png';
        const name = 'Вадим Матвеев';

        renderComponent({ url, name });

        const avatar = screen.getByTestId(testId);
        const img = avatar.querySelector('img') as HTMLImageElement;

        expect(img).toBeTruthy();
        expect(img.src).toEqual(url);
      });
      it('должны отобразиться инициалы без url', () => {
        const name = 'Вадим Матвеев';
        const initials = getInitialsForName(name);

        renderComponent({ name });

        const avatar = screen.getByTestId(testId);
        const img = avatar.querySelector('img') as HTMLImageElement;

        expect(img).toBeFalsy();
        expect(avatar.textContent).toEqual(initials);
      });
    });
    describe('проверка name', () => {
      it('должен добавиться указанный name', () => {
        const url =
          'https://pbs.twimg.com/profile_images/1150453787603156992/DoiKLDMY_400x400.png';
        const name = 'Вадим Матвеев';

        renderComponent({ url, name });

        const avatar = screen.getByTestId(testId);
        const img = avatar.querySelector('img') as HTMLImageElement;

        expect(img).toBeTruthy();
        expect(img.alt).toEqual(name);
      });
    });
  });

  describe('проверка вспомогательных функций', () => {
    describe('проверка getInitialsForName', () => {
      it('пустая строка', () => {
        const name = '';
        const initials = getInitialsForName(name);

        expect(initials).toEqual('');
      });
      it('одно слово', () => {
        const name = 'first';
        const initials = getInitialsForName(name);

        expect(initials).toEqual('F');
      });
      it('два слова', () => {
        const name = 'first second';
        const initials = getInitialsForName(name);

        expect(initials).toEqual('FS');
      });
      it('три слова', () => {
        const name = 'first second third';
        const initials = getInitialsForName(name);

        expect(initials).toEqual('FS');
      });
    });
    describe('проверка getColorIndexForName', () => {
      it('пустая строка', () => {
        const name = '';
        const colorIndex = getColorIndexForName(name, maxColorIndex);

        expect(colorIndex).toBeGreaterThanOrEqual(0);
        expect(colorIndex).toBeLessThanOrEqual(maxColorIndex);
      });
      it('функция должна быть детерминированной', () => {
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
      });
    });
  });
});
