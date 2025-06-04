import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import * as React from 'react';

import { IconMock, iconMockText } from '##/../__mocks__/IconMock';

import {
  Breadcrumbs,
  BreadcrumbsDefaultItem,
  BreadcrumbsProps,
} from '../Breadcrumbs';
import { cnBreadcrumbsItem } from '../BreadcrumbsItem/BreadcrumbsItem';

const testId = 'Breadcrumbs';

type Render = <ITEM = BreadcrumbsDefaultItem>(
  props: BreadcrumbsProps<ITEM>,
) => RenderResult;

const items: BreadcrumbsDefaultItem[] = [
  {
    icon: IconMock,
    label: 'Home',
    href: 'http://yandex.ru',
    onClick: jest.fn(),
  },
  {
    label: 'Page1',
    href: 'http://google.ru',
    onClick: jest.fn(),
    subMenu: [
      {
        label: 'Page1',
        href: '****************',
        onClick: jest.fn(),
      },
      {
        label: 'Page2',
        href: '*****************',
        onClick: jest.fn(),
      },
    ],
  },
  {
    icon: IconMock,
    label: 'Page2',
    href: 'http://google1.ru',
    onClick: jest.fn(),
  },
  {
    label: 'Page3',
    href: 'http://google2.ru',
    onClick: jest.fn(),
    subMenu: [
      {
        label: 'Page1',
        href: '****************',
        onClick: jest.fn(),
      },
      {
        label: 'Page2',
        href: '*****************',
        onClick: jest.fn(),
      },
    ],
  },
  {
    label: 'Page5',
  },
];

type CustomItems = {
  name: string;
  link?: string;
  isHome?: boolean;
  menu?: CustomItems[];
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const customItems: CustomItems[] = [
  {
    name: 'Home',
    link: '/',
    isHome: true,
    handleClick: jest.fn(),
  },
  {
    name: 'Page1',
    link: '/page1',
    handleClick: jest.fn(),
    menu: [
      {
        name: 'Page1',
        link: '/page1/page1',
      },
      {
        name: 'Page2',
        link: '/page1/page2',
      },
    ],
  },
  {
    name: 'Page2',
    link: '/page2',
    handleClick: jest.fn(),
  },
  {
    name: 'Page3',
    link: '/page3',
    handleClick: jest.fn(),
  },
  {
    name: 'Page4',
  },
];

const renderComponent: Render = (props) => {
  return render(
    <>
      <div data-testid="outside" />
      <Breadcrumbs {...props} data-testid={testId} />
    </>,
  );
};

const getRender = () => screen.getByTestId(testId);
const getItems = () =>
  getRender().querySelectorAll(
    `.${cnBreadcrumbsItem()}`,
  ) as unknown as HTMLLIElement[];
const getLinks = () =>
  getRender().querySelectorAll(
    `.${cnBreadcrumbsItem('Link')}`,
  ) as unknown as HTMLElement[];
const getLink = (index = 0) => getLinks()[index];
const getLinkTag = (index = 0) => getLink(index).tagName.toLowerCase();
const getLinkHref = (index = 0) => getLink(index).getAttribute('href');
const getItem = (index = 0) => getItems()[index];
const getSelectButton = (index = 0) =>
  getItem(index).querySelector(
    `.${cnBreadcrumbsItem('SelectButton')}`,
  ) as HTMLButtonElement;
const getLinkIcon = (index = 0) =>
  getLink(index).querySelector(`.${cnBreadcrumbsItem('Icon')}`);
const animateDelay = () => {
  act(() => {
    jest.advanceTimersByTime(200);
  });
};
const getDropdown = () => screen.queryByRole('listbox') as HTMLDivElement;
const getOutside = () => screen.getByTestId('outside') as HTMLDivElement;

describe('Компонент Breadcrumbs (Canary)', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({ items })).not.toThrow();
  });

  describe('проверка иконок', () => {
    items.forEach((item, index) => {
      it(`проверка icon у ${item.label}`, () => {
        renderComponent({ items });
        const icon = getLinkIcon(index);
        if (item.icon) {
          expect(icon).toHaveTextContent(iconMockText);
        } else {
          expect(icon).toBeNull();
        }
      });
    });
  });

  describe('проверка лейблов', () => {
    items.forEach((item, index) => {
      it(`проверка label у ${item.label}`, () => {
        renderComponent({ items });
        expect(getLink(index)).toHaveTextContent(item.label);
      });
    });
  });

  describe('проверка onClick', () => {
    items.forEach((item, index) => {
      it(`проверка onClick у ${item.label}`, () => {
        renderComponent({ items });
        getLink(index).click();

        if (item.onClick) {
          expect(item.onClick).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  describe('проверка тега на ссылке', () => {
    items.forEach((item, index) => {
      it(`проверка тега у ${item.label}`, () => {
        renderComponent({ items });
        const tag = getLinkTag(index);

        if (item.href) {
          expect(tag).toEqual('a');
        } else {
          expect(tag).toEqual('span');
        }
      });
    });
  });

  describe('проверка url на ссылке', () => {
    items.forEach((item, index) => {
      it(`проверка url у ${item.label}`, () => {
        renderComponent({ items });
        const href = getLinkHref(index);

        if (item.href) {
          expect(href).toEqual(item.href);
        } else {
          expect(href).toBeNull();
        }
      });
    });
  });

  describe('проверка submenu на ссылке', () => {
    items.forEach((item, index) => {
      it(`проверка кнопки около текста у ${item.label}`, () => {
        renderComponent({ items, fitMode: 'scroll' });
        const button = getSelectButton(index);

        if (item.subMenu) {
          expect(button).toBeInTheDocument();
        } else {
          expect(button).not.toBeInTheDocument();
        }
      });
      it(`dropdown открывается по клику на кнопку у - ${item.label}`, () => {
        jest.useFakeTimers();
        act(() => renderComponent({ items, fitMode: 'scroll' }));

        if (item.subMenu) {
          const button = getSelectButton(index);
          fireEvent.click(button);
          animateDelay();
          expect(getDropdown()).toBeInTheDocument();
        }
      });
      it(`dropdown закрывается по клику на кнопку у - ${item.label}`, () => {
        jest.useFakeTimers();
        act(() => renderComponent({ items, fitMode: 'scroll' }));

        if (item.subMenu) {
          const button = getSelectButton(index);
          fireEvent.click(button);
          animateDelay();
          fireEvent.click(button);
          animateDelay();
          expect(getDropdown()).not.toBeInTheDocument();
        }
      });
    });
  });

  describe('проверка size', () => {
    (['xs', 's', 'm', 'l'] as const).map((size) => {
      it(`проверка size ${size}`, () => {
        renderComponent({ items, size, fitMode: 'scroll' });
        const link = getLink();
        expect(link).toHaveClass(`Text_size_${size}`);
      });
    });
  });

  describe('проверка props', () => {
    it('проверка лейблов', () => {
      renderComponent({ items, fitMode: 'scroll' });

      expect(getOutside()).toBeInTheDocument();
    });
  });

  describe('проверка onlyIconRoot', () => {
    it(`Лейбл первой ссылки не должен отображаться если выставлен флаг onlyIconRoot`, () => {
      renderComponent({ items, onlyIconRoot: true, fitMode: 'scroll' });
      const link = getLink();
      expect(link).not.toHaveTextContent(`${items[0].label}`);
    });

    it(`Лейбл первой ссылки должен отображаться если флаг onlyIconRoot не выставлен`, () => {
      renderComponent({ items, onlyIconRoot: false, fitMode: 'scroll' });
      const link = getLink();
      expect(link).toHaveTextContent(`${items[0].label}`);
    });
  });

  describe('проверка fitMode', () => {
    describe('проверка fitMode = scroll', () => {
      it(`выбрана нужная обертка`, () => {
        renderComponent({ items, fitMode: 'scroll' });
        expect(getRender()).toHaveClass(`BreadcrumbsFitModeScroll`);
      });
    });
    describe('проверка fitMode = wrap', () => {
      it(`выбрана нужная обертка`, () => {
        renderComponent({ items, fitMode: 'dropdown' });
        expect(getRender()).toHaveClass(`BreadcrumbsFitModeDropdown`);
      });
    });
  });

  describe('проверка onItemClick', () => {
    items.forEach((item, index) => {
      it(`проверка клика по ${item.label}`, () => {
        const onItemClick = jest.fn();
        renderComponent({ items, fitMode: 'scroll', onItemClick });
        const link = getLink(index);
        fireEvent.click(link);
        expect(onItemClick).toHaveBeenCalledTimes(1);
        expect(onItemClick).toHaveBeenCalledWith(item, {
          e: expect.any(Object),
        });
      });
    });
  });

  describe('проверка геттеров', () => {
    describe('проверка getItemLabel', () => {
      customItems.forEach((item, index) => {
        it(`проверка label у ${item.name}`, () => {
          renderComponent({
            items: customItems,
            fitMode: 'scroll',
            getItemLabel: (item) => item.name,
          });
          expect(getLink(index)).toHaveTextContent(item.name);
        });
      });
    });
    describe('проверка getItemHref', () => {
      customItems.forEach((item, index) => {
        it(`проверка url у ${item.name}`, () => {
          renderComponent({
            items: customItems,
            fitMode: 'scroll',
            getItemLabel: (item) => item.name,
            getItemHref: (item) => item.link,
          });
          const href = getLinkHref(index);

          if (item.link) {
            expect(href).toEqual(item.link);
          } else {
            expect(href).toBeNull();
          }
        });
      });
    });
    describe('проверка getItemIcon', () => {
      customItems.forEach((item, index) => {
        it(`проверка icon у ${item.name}`, () => {
          renderComponent({
            items: customItems,
            fitMode: 'scroll',
            getItemLabel: (item) => item.name,
            getItemIcon: (item) => (item.isHome ? IconMock : undefined),
          });
          const icon = getLinkIcon(index);

          if (item.isHome) {
            expect(icon).toHaveTextContent(iconMockText);
          } else {
            expect(icon).toBeNull();
          }
        });
      });
    });
    describe('проверка getItemOnClick', () => {
      customItems.forEach((item, index) => {
        it(`проверка onClick у ${item.name}`, () => {
          renderComponent({
            items: customItems,
            fitMode: 'scroll',
            getItemLabel: (item) => item.name,
            getItemOnClick: (item) => item.handleClick,
          });
          getLink(index).click();

          if (item.handleClick) {
            expect(item.handleClick).toHaveBeenCalledTimes(1);
          }
        });
      });
    });
    describe('проверка getItemSubMenu', () => {
      customItems.forEach((item, index) => {
        it(`проверка кнопки около текста у ${item.name}`, () => {
          renderComponent({
            items: customItems,
            fitMode: 'scroll',
            getItemLabel: (item) => item.name,
            getItemSubMenu: (item) => item.menu,
          });
          const button = getSelectButton(index);

          if (item.menu) {
            expect(button).toBeInTheDocument();
          } else {
            expect(button).not.toBeInTheDocument();
          }
        });
      });
    });
  });
});
