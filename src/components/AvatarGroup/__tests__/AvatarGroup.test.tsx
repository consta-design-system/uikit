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
      it('количество элементов должно быть равно длине массива', () => {
        renderComponent({ visibleCount: avatarGroupItems.length });
        const items = getItems();
        expect(items.length).toEqual(avatarGroupItems.length);
      });
      it('количество скрытых элементов', () => {
        renderComponent({ visibleCount: 3 });
        const more = getMore();
        expect(more.textContent).toEqual(`+${avatarGroupItems.length - 3}`);
      });
    });
  });
});
