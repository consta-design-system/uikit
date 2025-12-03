import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import React from 'react';

import {
  cnNotification,
  cnNotificationCaption,
  cnNotificationItem,
  groupsByDay,
  Notification,
  NotificationDefaultGroup,
  NotificationDefaultItem,
  NotificationProps,
} from '..';
import {
  defaultGroups,
  defaultItems,
  itemsCustom,
  itemsWithDates,
} from './data';

const testId = 'Notification';

type NotificationTestComponent = <
  ITEM = NotificationDefaultItem,
  GROUP = NotificationDefaultGroup,
>(
  props: NotificationProps<ITEM, GROUP>,
) => RenderResult;

const renderComponent: NotificationTestComponent = (props) =>
  render(<Notification data-testid={testId} {...props} />);

const getRender = () => screen.getByTestId(testId);
const getGroups = () =>
  getRender().querySelectorAll(`.${cnNotification('Group')}`);

const getGroup = (index: number) => getGroups()[index];

const getItems = () =>
  getRender().querySelectorAll(`.${cnNotification('Item')}`);

const getItem = (index: number) => getItems()[index];

const getItemLabel = (index: number) =>
  getItem(index).querySelector(`.${cnNotificationItem('Title')}`);

const getItemContent = (index: number) =>
  getItem(index).querySelector(`.${cnNotificationItem('Children')}`);

const getItemBadge = (index: number) =>
  getItem(index).querySelector(`.${cnNotificationItem('Badge')}`);

const getItemCaption = (index: number) =>
  getItem(index).querySelector(`.${cnNotificationCaption()}`);

const getItemAvatar = (index: number) =>
  getItem(index).querySelector(`.${cnNotificationItem('Avatar')}`);

const getItemActions = (index: number) =>
  getItem(index).querySelector(`.${cnNotificationItem('Actions')}`);

describe('Компонент Notification', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({ items: defaultItems })).not.toThrow();
  });

  describe('проверка props', () => {
    it('прокидывает className', () => {
      const className = 'test-class-name';
      renderComponent({ className, items: defaultItems });

      expect(getRender()).toHaveClass(className);
    });

    it('прокидывает ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent({ ref, items: defaultItems });

      expect(ref.current).not.toBeNull();
      expect(ref.current).toBe(getRender());
    });

    it('проверка style', () => {
      const style = { color: 'red' };
      renderComponent({ style, items: defaultItems });

      expect(getRender()).toHaveStyle(style);
    });

    it('рендерит элементы', () => {
      renderComponent({ items: defaultItems });

      expect(getItems()).toHaveLength(defaultItems.length);
    });

    it('выводит группы из признака', () => {
      renderComponent({
        items: itemsWithDates,
        getItemGroup: ({ date }) => groupsByDay(date),
        getGroupLabel: ({ key }) => key.toString(),
      });

      expect(getGroups()).toHaveLength(2);
    });

    it('Рендерит группы указанные в groups', () => {
      renderComponent({
        items: defaultItems,
        groups: defaultGroups,
      });

      expect(getGroups()).toHaveLength(defaultGroups.length);
    });

    it('itemSpace верно работает', () => {
      renderComponent({
        items: defaultItems,
        itemSpace: { pT: 'm' },
      });

      expect(getItem(0)).toHaveClass('MixSpace_pT_m');
    });

    it('groupSpace верно работает', () => {
      renderComponent({
        items: defaultItems,
        groupSpace: { pT: 'm' },
        groups: defaultGroups,
      });

      expect(getGroup(0)).toHaveClass('MixSpace_pT_m');
    });
  });

  describe('проверка элементов', () => {
    it('рендерит заголовок', () => {
      renderComponent({ items: defaultItems });

      expect(getItemLabel(0)).toHaveTextContent(defaultItems[0].label);
    });

    it('рендерит контент', () => {
      renderComponent({ items: defaultItems });

      expect(getItemContent(0)).toHaveTextContent(
        defaultItems[0]?.content as string,
      );
    });

    it('рендерит бейджик - непрочитанный', () => {
      renderComponent({ items: defaultItems });

      expect(getItemBadge(0)).not.toBeInTheDocument();
      expect(getItemBadge(1)).toBeInTheDocument();
    });

    it('рендерит подпись', () => {
      renderComponent({ items: defaultItems });

      expect(getItemCaption(0)).toHaveTextContent(
        defaultItems[0].caption as string,
      );
    });

    it('рендерит аватар', () => {
      renderComponent({ items: defaultItems });

      expect(getItemAvatar(0)).toBeInTheDocument();
      expect(getItemAvatar(0)?.querySelector('img')).toHaveAttribute(
        'src',
        defaultItems[0].userImage,
      );
    });

    it('рендерит действия', () => {
      renderComponent({ items: defaultItems });

      expect(getItemActions(0)).toBeInTheDocument();
    });
  });

  describe('проверка геттеров', () => {
    it('проверка getItemLabel', () => {
      renderComponent({
        items: itemsCustom,
        getItemLabel: (item) => item.name,
      });

      expect(getItemLabel(0)).toHaveTextContent(itemsCustom[0].name);
    });

    it('проверка getItemContent', () => {
      renderComponent({
        items: itemsCustom,
        getItemContent: (item) => item.message,
      });

      expect(getItemContent(0)).toHaveTextContent(itemsCustom[0].message);
    });

    it('проверка getItemCaption', () => {
      renderComponent({
        items: itemsCustom,
        getItemCaption: (item) => item.date.toLocaleDateString(),
      });

      expect(getItemCaption(0)).toHaveTextContent(
        itemsCustom[0].date.toLocaleDateString(),
      );
    });
    it('проверка getItemUserName', () => {
      renderComponent({
        items: itemsCustom,
        getItemUserName: (item) => item.name,
      });

      expect(getItemAvatar(0)).toBeInTheDocument();
    });

    it('проверка getItemUserImage', () => {
      renderComponent({
        items: itemsCustom,
        getItemUserName: (item) => item.name,
        getItemUserImage: (item) => item.name,
      });

      expect(getItemAvatar(0)).toBeInTheDocument();
      expect(getItemAvatar(0)?.querySelector('img')).toHaveAttribute(
        'src',
        itemsCustom[0].name,
      );
    });

    it('проверка getItemActions', () => {
      const actions = [
        {
          label: 'Action 1',
          onClick: () => {},
        },
        {
          label: 'Action 2',
          onClick: () => {},
        },
      ];
      renderComponent({
        items: itemsCustom,
        getItemActions: () => actions,
      });

      expect(getItemActions(0)).toBeInTheDocument();
    });
  });

  describe('проверка взаимодействия', () => {
    it('вызывает onItemClick при клике на элемент', () => {
      const onItemClick = jest.fn();
      renderComponent({ items: defaultItems, onItemClick });

      fireEvent.click(getItems()[0]);

      expect(onItemClick).toHaveBeenCalledTimes(1);
    });
  });
});
