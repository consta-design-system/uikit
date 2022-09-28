import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnHeaderMenu, HeaderMenu } from '../Menu/HeaderMenu';

type HeaderMenuProps = React.ComponentProps<typeof HeaderMenu>;

const testId = cnHeaderMenu();

const defaultItems: HeaderMenuProps['items'] = [
  {
    label: 'Проекты',
    href: '#projects',
    active: true,
    target: '_blank',
  },
  {
    label: 'Задачи',
    href: '#tasks',
  },
  {
    label: 'Еще',
  },
];

const renderComponent = (
  props: Omit<HeaderMenuProps, 'items'> & { items?: HeaderMenuProps['items'] },
) => {
  const { items, ...otherProps } = props;
  return render(
    <HeaderMenu
      items={items || defaultItems}
      data-testid={testId}
      {...otherProps}
    />,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll(`.${cnHeaderMenu('Link')}`);
}

function getItem(index = 0) {
  return getItems()[index];
}

describe('Компонент HeaderMenu', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Дополнительный className присваевается`, () => {
        const className = 'className';

        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка items', () => {
      it(`items отображаются`, () => {
        renderComponent({});
        expect(getItems().length).toEqual(3);
      });
      it(`item рендериться верно`, () => {
        const index = 0;
        renderComponent({});

        const itemElement = getItem(index) as HTMLDivElement;

        expect(itemElement.textContent).toEqual(defaultItems[index].label);
        expect(itemElement).toHaveAttribute('href', defaultItems[index].href);
        expect(itemElement).toHaveAttribute(
          'target',
          defaultItems[index].target,
        );
        expect(itemElement).toHaveClass(
          cnHeaderMenu('Link', { active: defaultItems[index].active }),
        );
      });
      it(`onClick отрабатывает`, () => {
        const handleClick = jest.fn();

        renderComponent({
          items: [
            {
              label: 'Еще',
              onClick: handleClick,
            },
          ],
        });

        const itemElement = getItem() as HTMLDivElement;

        fireEvent.click(itemElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
