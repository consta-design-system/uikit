import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnText } from '../../Text/Text';
import { exampleItems as items, groups, Item } from '../__mocks__/mock.data';
import { ContextMenu } from '../ContextMenuDeprecated';
import { cnContextMenuGroupHeader } from '../ContextMenuGroupHeader/ContextMenuGroupHeader';
import { cnContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import { cnContextMenuLevel } from '../ContextMenuLevel/ContextMenuLevel';
import { ContextMenuProps } from '../helpers';

const testId = 'ContextMenu';
const additionalClass = 'additionalClass';

const renderComponent = (props: ContextMenuProps<Item> | {}) => {
  return render(
    <ContextMenu
      {...props}
      anchorRef={undefined}
      position={{ x: 0, y: 0 }}
      items={items}
      getLabel={(item) => item.name}
      className={additionalClass}
      data-testid={testId}
    />,
  );
};

function renderSide(item: Item): React.ReactNode {
  const Icon = item.icon;
  if (Icon) {
    return <Icon size="s" />;
  }

  return undefined;
}

function getRender() {
  return screen.getByTestId(testId);
}

function getLevels() {
  return screen.getAllByTestId(testId);
}

function getItems() {
  return getRender().querySelectorAll(`.${cnContextMenuItem()}`);
}

function getItem(index = 0) {
  return getItems()[index];
}

function getSide(index = 0, sideIndex = 0) {
  return getItem(index).querySelectorAll(`.${cnContextMenuItem('Side')}`)[
    sideIndex
  ];
}

function getGroups() {
  return getRender().querySelectorAll(`.${cnContextMenuLevel('Group')}`);
}

function getGroup(index = 0) {
  return getGroups()[index];
}

function getGroupHeader(index = 0) {
  return getGroup(index).querySelector(`.${cnContextMenuGroupHeader()}`);
}

describe('Компонент ContextMenuDeprecated', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка items', () => {
      it('количество совпадает с передаваемым', () => {
        renderComponent({});
        expect(getItems().length).toEqual(items.length);
      });
    });
    describe('проверка getLabel', () => {
      it('label совпадает', () => {
        renderComponent({});
        expect(getItem().textContent).toEqual(items[0].name);
      });
    });
    describe('проверка getGroupId', () => {
      it('количество групп совпадает', () => {
        renderComponent({
          getGroupId: (item) => item.group,
        });
        expect(getGroups().length).toEqual(2);
      });
    });
    describe('проверка getGroupLabel', () => {
      it('label совпадает', () => {
        const getGroupLabel = (id: number) =>
          groups.find((group) => group.id === id)?.name;
        renderComponent({
          getGroupId: (item) => item.group,
          getGroupLabel,
        });
        expect(getGroupHeader()?.textContent).toEqual(groups[0].name);
      });
    });
    describe('проверка getItemOnClick', () => {
      it('клик по элементу должен вызвать callback', () => {
        const handleChange = jest.fn();

        renderComponent({
          getItemOnClick: handleChange,
        });

        fireEvent.click(getItem());

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining(items[0]),
        );
      });
    });
    describe('проверка getAccent', () => {
      it('элементу присвоился нужный модификатор', () => {
        renderComponent({
          getAccent: (item) => item.accent,
        });

        expect(getItem()).toHaveClass(cnText({ view: items[0].accent }));
      });
    });
    describe('проверка getDisabled', () => {
      it('элементу присвоился нужный модификатор и onClick не отрабатывает', () => {
        const handleChange = jest.fn();

        renderComponent({
          getDisabled: () => true,
          getOnClick: (item) => () => handleChange(item),
        });

        expect(getItem()).toHaveClass(cnContextMenuItem({ disabled: true }));

        fireEvent.click(getItem());
        expect(handleChange).toHaveBeenCalledTimes(0);
      });
    });

    describe('проверка getLeftSideBar', () => {
      it('side cлева отобразился', () => {
        renderComponent({
          getLeftSideBar: renderSide,
        });

        expect(getSide()).toHaveClass(
          cnContextMenuItem('Side', { position: 'left' }),
        );
      });
    });
    describe('проверка getLeftSideBar', () => {
      it('side справа отобразился', () => {
        renderComponent({
          getRightSideBar: renderSide,
        });

        expect(getSide(0, 1)).toHaveClass(
          cnContextMenuItem('Side', { position: 'right' }),
        );
      });
    });
    describe('проверка getSubItems', () => {
      it('подменю отображается по ховеру на элемент меню', () => {
        renderComponent({
          getSubItems: (item) => item.subMenu,
        });

        fireEvent.mouseEnter(getItem());
        expect(getLevels().length).toEqual(2);
      });
    });
    describe('проверка className', () => {
      it('дополнительный класс применяется', () => {
        renderComponent({});

        expect(getRender()).toHaveClass(additionalClass);
      });
    });
  });
});
