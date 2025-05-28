import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { cn } from '../../../utils/bem';
import { avatarGroupItems } from '../__mocks__/mock.data';
import {
  AvatarGroup,
  avatarGroupPropForm,
  AvatarGroupProps,
  avatarGroupPropSize,
} from '../AvatarGroup';

const testId = 'AvatarGroup';

const cnAvatar = cn('Avatar');
const cnAvatarGroup = cn('AvatarGroup');

// const animateDelay = () => {
//   act(() => {
//     jest.advanceTimersByTime(300);
//   });
// };

const renderComponent = (props: AvatarGroupProps = {}) => {
  return render(
    <AvatarGroup data-testid={testId} items={avatarGroupItems} {...props} />,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll(`.${cnAvatar()}`);
}
// function getHiddenItems() {
//   return getRender().querySelectorAll(
//     `.${cnAvatarGroup('Avatar', { hidden: true }).split(' ')[1]}`,
//   );
// }

function getItem(index = 0) {
  return getItems()[index];
}

function getMore() {
  return getRender().querySelectorAll(`.${cnAvatarGroup('More')}`)[0];
}

describe('Компонент Avatar', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка form', () => {
      avatarGroupPropForm.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });
          const avatar = getItem(1);
          expect(avatar).toHaveClass(cnAvatar({ form }));
        });
      });
    });
    describe('проверка size', () => {
      avatarGroupPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          renderComponent({ size });
          const avatar = getItem(1);
          expect(avatar).toHaveClass(cnAvatar({ size }));
        });
      });
    });
    describe('проверка visibleCount', () => {
      it('количество элементов должно быть равно visibleCount + more', () => {
        const visibleCount = 3;
        renderComponent({ visibleCount });
        const items = getItems();
        expect(items.length).toEqual(visibleCount + 1);
      });
      it('если visibleCount больше чем длинна массива то должны выводится все элементы без more', () => {
        renderComponent({ visibleCount: avatarGroupItems.length + 3 });
        const items = getItems();
        expect(items.length).toEqual(avatarGroupItems.length);
      });
      it(`элемент ${cnAvatarGroup('More')} отображается верно`, () => {
        renderComponent({ visibleCount: 3 });
        const more = getMore();
        expect(more.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
      });
      // it('авто подстройка visibleCount', () => {
      //   jest.useFakeTimers();
      //   act(() => {
      //     renderComponent({ visibleCount: 'auto', style: { width: 100 } });
      //   });
      //   animateDelay();
      //   const items = getItems();
      //   const hiddenItems = getHiddenItems();
      //   expect(items.length).toEqual(3);

      //   expect(hiddenItems.length).toEqual(3);
      //   // expect(more.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
      // });
    });
    describe('проверка className', () => {
      it('присваивает класс для className', () => {
        renderComponent({ className: 'test-class' });
        expect(getRender()).toHaveClass('test-class');
      });
    });
    describe('проверка style', () => {
      it('присваивает стиль для style', () => {
        renderComponent({ style: { backgroundColor: 'red' } });
        expect(getRender()).toHaveStyle('background-color: red');
      });
    });
    describe('проверка ref', () => {
      it('присваивает ref для ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ ref });
        expect(ref.current).toBe(getRender());
      });
    });
    describe('проверка onClick', () => {
      it('вызывает onClick при клике на компонент', () => {
        const onClick = jest.fn();
        renderComponent({ onClick });
        getRender().click();
        expect(onClick).toHaveBeenCalled();
      });
    });
    describe('проверка monochrome', () => {
      it('присваивает класс для monochrome', () => {
        renderComponent({ monochrome: true });
        const avatar = getItem(1);
        expect(avatar).toHaveStyle('--avatar-color: var(--avatar-color-18)');
      });
    });
  });
});
