import { render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnUser,
  User,
  userPropSize,
  userPropStatus,
  userPropView,
  userPropWidth,
} from '../User';

type UserProps = React.ComponentProps<typeof User>;

const testId = cnUser();

const renderComponent = (props: UserProps = {}) => {
  return render(<User data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getAvatar() {
  return getRender().querySelector(`.${cnUser('AvatarWrapper')}`);
}

function getName() {
  return getRender().querySelector(`.${cnUser('Name')}`);
}

function getInfo() {
  return getRender().querySelector(`.${cnUser('Info')}`);
}

function getArrow() {
  return getRender().querySelector(`.${cnUser('Icon')}`);
}

describe('Компонент Avatar', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка size', () => {
      userPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });

          expect(getRender()).toHaveClass(cnUser({ size }));
        });
      });
    });
    describe('проверка status', () => {
      userPropStatus.forEach((status) => {
        it(`присваивает класс для status=${status}`, () => {
          renderComponent({ status });

          expect(getAvatar()).toHaveClass(cnUser('AvatarWrapper', { status }));
        });
      });
    });
    describe('проверка view', () => {
      userPropView.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });

          expect(getRender()).toHaveClass(cnUser({ view }));
        });
      });
    });
    describe('проверка width', () => {
      userPropWidth.forEach((width) => {
        it(`присваивает класс для width=${width}`, () => {
          renderComponent({ width });

          expect(getRender()).toHaveClass(cnUser({ width }));
        });
      });
    });
    describe('проверка name', () => {
      it(`текст отображается`, () => {
        const name = 'name';
        renderComponent({ name });

        expect(getName()?.textContent).toEqual(name);
      });
    });
    describe('проверка info', () => {
      it(`текст отображается`, () => {
        const info = 'info';
        renderComponent({ info });

        expect(getInfo()?.textContent).toEqual(info);
      });
    });
    describe('проверка minified', () => {
      it(`если onlyAvatar, то не отображать name и info`, () => {
        const name = 'name';
        const info = 'info';
        renderComponent({ info, name, onlyAvatar: true });

        expect(getRender().textContent).toEqual('N');
      });
      it(`если onlyAvatar, то применить модификатор minified`, () => {
        const name = 'name';
        const info = 'info';
        renderComponent({ info, name, onlyAvatar: true });

        expect(getRender()).toHaveClass(cnUser({ minified: true }));
      });
      it(`если нет name и info, то применить модификатор minified`, () => {
        renderComponent();

        expect(getRender()).toHaveClass(cnUser({ minified: true }));
      });
    });
    describe('проверка withArrow', () => {
      it(`к блоку применился модификатор withArrow`, () => {
        renderComponent({ withArrow: true });

        expect(getRender()).toHaveClass(cnUser({ withArrow: true }));
      });
      it(`элемент Arrow отобразился c иконкой`, () => {
        renderComponent({ withArrow: true });

        expect(getArrow()).toHaveClass('IconSelect');
      });
    });
  });
});
