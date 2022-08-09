import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { avatarGroupItems } from '../__mocks__/mock.data';
import { cn } from '../../../utils/bem';
import {
  AvatarGroup,
  avatarGroupPropForm,
  AvatarGroupProps,
  avatarGroupPropSize,
} from '../AvatarGroup';

const testId = 'AvatarGroup';

const cnAvatar = cn('Avatar');
const cnAvatarGroup = cn('AvatarGroup');

const renderComponent = (props: AvatarGroupProps = {}) => {
  return render(<AvatarGroup data-testid={testId} items={avatarGroupItems} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll(`.${cnAvatar()}`);
}

function getItem(index = 0) {
  return getItems()[index];
}

function getShowMore() {
  return getRender().querySelectorAll(`.${cnAvatarGroup('ShowMore')}`)[0];
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
    describe('проверка тэга', () => {
      const tags = ['a', 'div', 'span'] as const;
      tags.forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ getItemAs: () => el });
          const avatar = getItem(1);
          expect(avatar.tagName).toEqual(el.toUpperCase());
        });
      });
    });
    describe('проверка visibleCount', () => {
      it('количество элементов должно быть равно длине массива', () => {
        renderComponent({ visibleCount: avatarGroupItems.length });
        const items = getItems();
        expect(items.length).toEqual(avatarGroupItems.length);
      });
      it('количество скрытых элементов', () => {
        renderComponent({ visibleCount: 3 });
        const showMore = getShowMore();
        expect(showMore.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
      });
    });
    describe('проверка onMoreClick', () => {
      it('событие отрабатывает', () => {
        const handleChange = jest.fn();
        renderComponent({
          visibleCount: 2,
          onMoreClick: handleChange,
        });
        fireEvent.click(getShowMore());
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
