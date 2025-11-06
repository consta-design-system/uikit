import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { createIconMock } from '##/../__mocks__/IconMock';

import { cnList, List } from '../ListCanary';
import { cnListGroupLabel } from '../ListGroupLabel';
import { DefaultListGroup, DefaultListItem, ListProps } from '../types';

const testId = cnList();

const getListItem = (itemLabel: string) => screen.getByText(itemLabel);

const getAllListItems = (items: DefaultListItem[]) =>
  items.map(({ label }) => screen.getByText(label as string));

const renderComponent = (props: ListProps = { items: [] }) => {
  return render(
    <div data-testid={testId}>
      <List {...props} />
    </div>,
  );
};

describe('Компонент ListCanary', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('рендерит список элементов', () => {
    const items: DefaultListItem[] = [
      { label: 'Первый' },
      { label: 'Второй' },
      { label: 'Третий' },
    ];

    renderComponent({ items });

    items.forEach(({ label }) => {
      const item = getListItem(label as string);
      expect(item).toBeInTheDocument();
    });
  });

  describe('интерактивные элементы', () => {
    it('рендерит список интерактивных элементов', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      const items: DefaultListItem[] = [
        { label: 'Первый', onClick: handler1 },
        { label: 'Второй', onClick: handler2 },
      ];

      renderComponent({ items });

      const itemNodes = getAllListItems(items);

      fireEvent.click(itemNodes[0]);
      fireEvent.click(itemNodes[1]);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      expect(handler1).toHaveBeenCalledWith(expect.any(Object));
      expect(handler2).toHaveBeenCalledWith(expect.any(Object));
    });

    it('disabled отключает интерактивный элемент', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      const items: DefaultListItem[] = [
        { label: 'Первый', onClick: handler1 },
        { label: 'Второй', onClick: handler2, disabled: true },
      ];

      renderComponent({ items });

      const itemNodes = getAllListItems(items);

      fireEvent.click(itemNodes[0]);
      fireEvent.click(itemNodes[1]);

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).not.toHaveBeenCalled();

      expect(handler1).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('дополнительные элементы', () => {
    const iconText = 'IconMock';
    const IconLeftMock = createIconMock(iconText);

    const customContextText = 'customContextText';
    const customContent = <div>{customContextText}</div>;

    it('рендерит иконку leftIcon', () => {
      const items: DefaultListItem[] = [
        { label: 'Первый', leftIcon: IconLeftMock },
      ];

      renderComponent({ items });

      expect(screen.getByText(iconText)).toBeInTheDocument();
    });

    it('рендерит иконку rightIcon', () => {
      const items: DefaultListItem[] = [
        { label: 'Первый', rightIcon: IconLeftMock },
      ];

      renderComponent({ items });

      expect(screen.getByText(iconText)).toBeInTheDocument();
    });

    it('рендерит контент leftSide', () => {
      const items: DefaultListItem[] = [
        { label: 'Первый', leftSide: customContent },
      ];

      renderComponent({ items });

      expect(screen.getByText(customContextText)).toBeInTheDocument();
    });

    it('рендерит контент rightSide', () => {
      const items: DefaultListItem[] = [
        { label: 'Первый', rightSide: customContent },
      ];

      renderComponent({ items });

      expect(screen.getByText(customContextText)).toBeInTheDocument();
    });
  });

  it('groupId группирует элементы', () => {
    const groupOneLabel = 'group-1';
    const groupTwoLabel = 'group-2';

    const groups: DefaultListGroup[] = [
      { id: 1, label: groupOneLabel },
      { id: 2, label: groupTwoLabel },
    ];

    const items: DefaultListItem[] = [
      { label: 'Первый', groupId: 1 },
      { label: 'Третий', groupId: 1 },
      { label: 'Второй', groupId: 2 },
    ];

    renderComponent({ items, groups });

    expect(screen.getByText(groupOneLabel)).toBeInTheDocument();
    expect(screen.getByText(groupTwoLabel)).toBeInTheDocument();

    const container = screen.getByTestId(testId);
    const groupNodes = container.querySelectorAll(`.${cnListGroupLabel()}`);
    expect(groupNodes.length).toEqual(groups.length);

    const getFollowingItemsTexts = (labelEl: Element) => {
      const texts: string[] = [];
      let el = labelEl.nextElementSibling;
      while (el && !el.classList.contains(cnListGroupLabel())) {
        const t = el.textContent?.trim();
        if (t) texts.push(t);
        el = el.nextElementSibling;
      }
      return texts;
    };

    const firstGroupItems = getFollowingItemsTexts(groupNodes[0]);
    const secondGroupItems = getFollowingItemsTexts(groupNodes[1]);

    expect(firstGroupItems).toContain('Первый');
    expect(firstGroupItems).toContain('Третий');
    expect(firstGroupItems).not.toContain('Второй');

    expect(secondGroupItems).toContain('Второй');
  });

  it('renderItem рендерит кастомный контент', () => {
    const items: DefaultListItem[] = [{ label: 'Первый' }];
    const testId = 'customContent';

    renderComponent({
      items,
      renderItem: (item) => <div data-testid={testId}>{item.label}</div>,
    });

    const item = screen.getByTestId(testId);
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent(items[0].label as string);
  });

  it('getItemAdditionalClassName добавляет класс для всех элементов', () => {
    const items: DefaultListItem[] = [{ label: 'Первый' }, { label: 'Второй' }];
    const additionalClassName = 'mock-class';

    renderComponent({
      items,
      getItemAdditionalClassName: () => additionalClassName,
    });

    const item1 = screen.getByText(items[0].label as string);
    expect(item1).toHaveClass(additionalClassName);

    const item2 = screen.getByText(items[1].label as string);
    expect(item2).toHaveClass(additionalClassName);
  });

  it('проверка getItemAs', () => {
    const items: DefaultListItem[] = [{ label: 'Первый' }];

    renderComponent({
      items,
      getItemAs: () => 'a',
    });

    const item = getAllListItems(items)[0];
    expect(item.tagName.toLowerCase()).toBe('a');
  });
});
