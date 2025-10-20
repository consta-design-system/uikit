import {
  fireEvent,
  render,
  RenderResult,
  screen,
  within,
} from '@testing-library/react';
import React from 'react';

import { createIconMock } from '##/../__mocks__/IconMock';

import {
  BookmarkTabs,
  BookmarkTabsItemDefault,
  BookmarkTabsProps,
  cnBookmarkTabs,
  cnBookmarkTabsTab,
} from '..';
import * as useBookmarkTabsHook from '../useBookmarkTabs';

type Render = <ITEM = BookmarkTabsItemDefault>(
  props: BookmarkTabsProps<ITEM>,
) => RenderResult;

const testId = cnBookmarkTabs();

const getRender = () => screen.getByTestId(testId);

const getAllTabs = () =>
  getRender().querySelectorAll(`.${cnBookmarkTabsTab()}`);

const getCreateTabButton = () =>
  within(getRender().querySelector(`.BookmarkTabs-Button_type_add`)!).getByRole(
    'button',
  );

const getRemoveButtonForTab = (index: number) =>
  within(getAllTabs()[index] as HTMLElement).getByRole('button');

const getNavigationButton = (index: 0 | 1) =>
  within(
    getRender().querySelector(`.${cnBookmarkTabs('ScrollControls')}`)!,
  ).getAllByRole('button')[index];

const iconLeftText = 'IconLeftMock';
const iconRightText = 'IconRightMock';
const leftIcon = createIconMock(iconLeftText);
const rightIcon = createIconMock(iconRightText);

const itemsDefault: BookmarkTabsItemDefault[] = [
  {
    key: 1,
    label: 'Tab 1',
  },
  {
    key: 2,
    label: 'Tab 2',
    leftIcon,
    rightIcon,
  },
  {
    key: 3,
    label: 'Tab 3',
    rightIcon,
  },
  {
    key: 4,
    label: 'Tab 4',
    leftIcon,
  },
  {
    key: 5,
    label: 'Tab 5',
    leftIcon,
  },
];

const renderComponent: Render = (props) =>
  render(<BookmarkTabs {...props} data-testid={testId} />);

describe('Компонент BookmarkTabs', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('Проверка items', () => {
    it('все табы отображаются', () => {
      renderComponent({ items: itemsDefault });

      expect(getAllTabs().length).toBe(itemsDefault.length);
    });

    it('fixed свойство скрывает лейбл и фиксирует таб в начале списка', () => {
      const itemsWithFixed: BookmarkTabsItemDefault[] = [
        ...itemsDefault,
        { key: 6, label: 'Таб 6', fixed: true, leftIcon },
      ];

      renderComponent({ items: itemsWithFixed });

      const fixedTab = getAllTabs()[0] as HTMLElement;

      expect(within(fixedTab).getByText(iconLeftText)).toBeInTheDocument();
      expect(fixedTab).not.toHaveTextContent(itemsWithFixed[5].label as string);
    });
  });

  describe("проверка callback'ов", () => {
    it('onChange меняет активный таб', () => {
      const handleChange = jest.fn();

      renderComponent({
        items: itemsDefault,
        value: itemsDefault[0],
        onChange: handleChange,
      });

      const tabs = getAllTabs();

      fireEvent.click(tabs[3]);

      expect(handleChange).toHaveBeenCalledWith(
        itemsDefault[3],
        expect.any(Object),
      );
    });

    it('onCreate добавляет кнопку нового таба и создает новый таб', () => {
      const handleCreate = jest.fn();

      renderComponent({
        items: itemsDefault,
        value: itemsDefault[0],
        onCreate: handleCreate,
      });

      const createTabButton = getCreateTabButton();
      expect(createTabButton).toBeInTheDocument();

      fireEvent.click(createTabButton!);
      expect(handleCreate).toHaveBeenCalled();
    });

    it('onRemove добавляет кнопку удаления и удаляет таб', () => {
      const handleRemove = jest.fn();

      renderComponent({
        items: itemsDefault,
        value: itemsDefault[0],
        onRemove: handleRemove,
      });

      const secondTabRemoveButton = getRemoveButtonForTab(1);
      expect(secondTabRemoveButton).toBeInTheDocument();

      fireEvent.click(secondTabRemoveButton);

      expect(handleRemove).toHaveBeenCalledWith(
        itemsDefault[1],
        expect.any(Object),
      );
    });
  });

  it('navigationButtons отображаются c withNavigationButtons=true', () => {
    const useBookmarkTabsSpy = jest.spyOn(
      useBookmarkTabsHook,
      'useBookmarkTabs',
    );

    // Мок useBookmarkTabsSpy т.к. хук использует ResizeObserver недоступный в jsdom
    useBookmarkTabsSpy.mockReturnValue({
      refs: [React.createRef(), React.createRef()],
      fixedTabs: [],
      otherTabs: itemsDefault,
      showControls: true,
      wrapperRef: React.createRef(),
      containerRef: React.createRef(),
      fixedTabsRef: React.createRef(),
      otherTabsRef: React.createRef(),
      controlsRef: React.createRef(),
      addButtonRef: React.createRef(),
      navigate: jest.fn(),
      sizes: [],
    });

    renderComponent({
      items: itemsDefault,
      withNavigationButtons: true,
    });

    expect(getNavigationButton(0)).toBeInTheDocument();
    expect(getNavigationButton(1)).toBeInTheDocument();
  });

  it('присваивает ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ ref, items: itemsDefault });
    expect(ref.current).toBe(getRender());
  });

  it('должен устанавливать дополнительный класс', () => {
    const className = 'my-class';
    renderComponent({ items: itemsDefault, className });
    expect(getRender()).toHaveClass(className);
  });

  it('renderItem отображает кастомный контент для элемента', () => {
    renderComponent({
      items: itemsDefault,
      renderItem: () => (
        <div data-testid="customContentTestId">custom content</div>
      ),
    });

    const tabsWithCustomContent = within(getRender()).getAllByTestId(
      'customContentTestId',
    ).length;

    expect(tabsWithCustomContent).toBe(itemsDefault.length);
  });

  it('getItemAs должен рендерить таб как указанный тег', () => {
    renderComponent({
      items: itemsDefault,
      getItemAs: () => 'a',
      getItemAttributes: (item) => ({ href: `#${item.key}` }),
    });

    const firstTab = getAllTabs()[0];
    expect(firstTab.tagName).toBe('A');
    expect(firstTab).toHaveAttribute('href', `#${itemsDefault[0].key}`);
  });
});
