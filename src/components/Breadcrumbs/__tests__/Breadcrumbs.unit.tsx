import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { IconMock, iconMockText } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import {
  Breadcrumbs,
  BreadcrumbsDefaultItem,
  BreadcrumbsProps,
} from '../Breadcrumbs';
import { cnBreadcrumbsItem } from '../BreadcrumbsItem/BreadcrumbsItem';

createRoot();
clearStack();

const testId = 'Breadcrumbs';

type Render = <ITEM = BreadcrumbsDefaultItem>(
  ctx: TestContext,
  props: BreadcrumbsProps<ITEM>,
) => void;

const items: BreadcrumbsDefaultItem[] = [
  {
    icon: IconMock,
    label: 'Home',
    href: 'http://yandex.ru',
    onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
      e.preventDefault(),
    ),
  },
  {
    label: 'Page1',
    href: 'http://google.ru',
    onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
      e.preventDefault(),
    ),
    subMenu: [
      {
        label: 'Page1',
        href: '****************',
        onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
          e.preventDefault(),
        ),
      },
      {
        label: 'Page2',
        href: '*****************',
        onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
          e.preventDefault(),
        ),
      },
    ],
  },
  {
    icon: IconMock,
    label: 'Page2',
    href: 'http://google1.ru',
    onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
      e.preventDefault(),
    ),
  },
  {
    label: 'Page3',
    href: 'http://google2.ru',
    onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
      e.preventDefault(),
    ),
    subMenu: [
      {
        label: 'Page1',
        href: '****************',
        onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
          e.preventDefault(),
        ),
      },
      {
        label: 'Page2',
        href: '*****************',
        onClick: vi.fn((e: React.MouseEvent<HTMLAnchorElement>) =>
          e.preventDefault(),
        ),
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
    handleClick: vi.fn(),
  },
  {
    name: 'Page1',
    link: '/page1',
    handleClick: vi.fn(),
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
    handleClick: vi.fn(),
  },
  {
    name: 'Page3',
    link: '/page3',
    handleClick: vi.fn(),
  },
  {
    name: 'Page4',
  },
];

const renderComponent: Render = (ctx, props) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  const outside = document.getElementById(testOutsideId(ctx))!;
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <div data-testid="outside" id={outside.id} />
          <Breadcrumbs
            {...props}
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLDivElement;

const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(
    `.${cnBreadcrumbsItem()}`,
  ) as unknown as HTMLLIElement[];

const getLinks = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(
    `.${cnBreadcrumbsItem('Link')}`,
  ) as unknown as HTMLElement[];

const getLink = (ctx: TestContext, index = 0) => getLinks(ctx)[index];
const getLinkTag = (ctx: TestContext, index = 0) =>
  getLink(ctx, index).tagName.toLowerCase();
const getLinkHref = (ctx: TestContext, index = 0) =>
  getLink(ctx, index).getAttribute('href');

const getItem = (ctx: TestContext, index = 0) => getItems(ctx)[index];

const getSelectButton = (ctx: TestContext, index = 0) =>
  getItem(ctx, index).querySelector(
    `.${cnBreadcrumbsItem('SelectButton')}`,
  ) as HTMLButtonElement;

const getLinkIcon = (ctx: TestContext, index = 0) =>
  getLink(ctx, index).querySelector(`.${cnBreadcrumbsItem('Icon')}`);

const getDropdown = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLDivElement;

const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`) as HTMLDivElement;

describe('Компонент Breadcrumbs (Canary)', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = renderComponent(ctx, { items });

      expect(() => render).not.toThrow();
    }));

  describe('проверка иконок', () => {
    items.forEach((item, index) => {
      test(`проверка icon у ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items });

          const icon = getLinkIcon(ctx, index);
          if (item.icon) {
            expect(icon).toHaveTextContent(iconMockText);
          } else {
            expect(icon).toBeNull();
          }
        }));
    });
  });
  describe('проверка лейблов', () => {
    items.forEach((item, index) => {
      test(`проверка label у ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items });

          expect(getLink(ctx, index)).toHaveTextContent(item.label);
        }));
    });
  });
  describe('проверка onClick', () => {
    items.forEach((item, index) => {
      test(`проверка onClick у ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items });

          getLink(ctx, index).click();
          if (item.onClick) {
            expect(item.onClick).toHaveBeenCalledTimes(1);
          }
        }));
    });
  });
  describe('проверка тега на ссылке', () => {
    items.forEach((item, index) => {
      test(`проверка тега у ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items });

          const tag = getLinkTag(ctx, index);
          if (item.href) {
            expect(tag).toEqual('a');
          } else {
            expect(tag).toEqual('span');
          }
        }));
    });
  });
  describe('проверка url на ссылке', () => {
    items.forEach((item, index) => {
      test(`проверка url у ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items });

          const href = getLinkHref(ctx, index);
          if (item.href) {
            expect(href).toEqual(item.href);
          } else {
            expect(href).toBeNull();
          }
        }));
    });
  });
  describe('проверка submenu на ссылке', () => {
    items.forEach((item, index) => {
      test(`проверка кнопки около текста у ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, fitMode: 'scroll' });

          const button = getSelectButton(ctx, index);
          if (item.subMenu) {
            expect(button).toBeInTheDocument();
          } else {
            expect(button).not.toBeInTheDocument();
          }
        }));
      test(`dropdown открывается по клику на кнопку у - ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, fitMode: 'scroll' });

          if (item.subMenu) {
            const button = getSelectButton(ctx, index);
            fireEvent.click(button);
            await wrap(tick());
            expect(getDropdown(ctx)).toBeInTheDocument();
          }
        }));
      test(`dropdown закрывается по клику на кнопку у - ${item.label}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, fitMode: 'scroll' });

          if (item.subMenu) {
            const button = getSelectButton(ctx, index);
            fireEvent.click(button);

            fireEvent.click(button);
            await wrap(tick());

            await wrap(sleep(animateTimeout));
            expect(getDropdown(ctx)).not.toBeInTheDocument();
          }
        }));
    });
  });
  describe('проверка size', () => {
    (['xs', 's', 'm', 'l'] as const).map((size) => {
      test(`проверка size ${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, size, fitMode: 'scroll' });

          const link = getLink(ctx, 0);
          expect(link).toHaveClass(`Text_size_${size}`);
        }));
    });
  });
  describe('проверка props', () => {
    test('проверка лейблов', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items, fitMode: 'scroll' });

        expect(getOutside(ctx)).toBeInTheDocument();
      }));
  });
  describe('проверка onlyIconRoot', () => {
    test(`Лейбл первой ссылки не должен отображаться если выставлен флаг onlyIconRoot`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items, onlyIconRoot: true, fitMode: 'scroll' });

        const link = getLink(ctx, 0);
        expect(link).not.toHaveTextContent(`${items[0].label}`);
      }));
    test(`Лейбл первой ссылки должен отображаться если флаг onlyIconRoot не выставлен`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items, onlyIconRoot: false, fitMode: 'scroll' });

        const link = getLink(ctx, 0);
        expect(link).toHaveTextContent(`${items[0].label}`);
      }));
  });
  describe('проверка fitMode', () => {
    describe('проверка fitMode = scroll', () => {
      test(`выбрана нужная обертка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, fitMode: 'scroll' });

          expect(getRender(ctx)).toHaveClass(`BreadcrumbsFitModeScroll`);
        }));
    });
    describe('проверка fitMode = wrap', () => {
      test(`выбрана нужная обертка`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, fitMode: 'dropdown' });

          expect(getRender(ctx)).toHaveClass(`BreadcrumbsFitModeDropdown`);
        }));
    });
  });
  describe('проверка onItemClick', () => {
    items.forEach((item, index) => {
      test(`проверка клика по ${item.label}`, (ctx) =>
        context.start(async () => {
          const onItemClick = vi.fn();
          renderComponent(ctx, { items, fitMode: 'scroll', onItemClick });

          const link = getLink(ctx, index);
          fireEvent.click(link);
          expect(onItemClick).toHaveBeenCalledTimes(1);
          expect(onItemClick).toHaveBeenCalledWith(item, {
            e: expect.any(Object),
          });
        }));
    });
  });
  describe('проверка геттеров', () => {
    describe('проверка getItemLabel', () => {
      customItems.forEach((item, index) => {
        test(`проверка label у ${item.name}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              items: customItems,
              fitMode: 'scroll',
              getItemLabel: (item) => item.name,
            });

            expect(getLink(ctx, index)).toHaveTextContent(item.name);
          }));
      });
    });
    describe('проверка getItemHref', () => {
      customItems.forEach((item, index) => {
        test(`проверка url у ${item.name}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              items: customItems,
              fitMode: 'scroll',
              getItemLabel: (item) => item.name,
              getItemHref: (item) => item.link,
            });

            const href = getLinkHref(ctx, index);
            if (item.link) {
              expect(href).toEqual(item.link);
            } else {
              expect(href).toBeNull();
            }
          }));
      });
    });
    describe('проверка getItemIcon', () => {
      customItems.forEach((item, index) => {
        test(`проверка icon у ${item.name}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              items: customItems,
              fitMode: 'scroll',
              getItemLabel: (item) => item.name,
              getItemIcon: (item) => (item.isHome ? IconMock : undefined),
            });

            const icon = getLinkIcon(ctx, index);
            if (item.isHome) {
              expect(icon).toHaveTextContent(iconMockText);
            } else {
              expect(icon).toBeNull();
            }
          }));
      });
    });
    describe('проверка getItemOnClick', () => {
      customItems.forEach((item, index) => {
        test(`проверка onClick у ${item.name}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              items: customItems,
              fitMode: 'scroll',
              getItemLabel: (item) => item.name,
              getItemOnClick: (item) => item.handleClick,
            });

            getLink(ctx, index).click();
            if (item.handleClick) {
              expect(item.handleClick).toHaveBeenCalledTimes(1);
            }
          }));
      });
    });
    describe('проверка getItemSubMenu', () => {
      customItems.forEach((item, index) => {
        test(`проверка кнопки около текста у ${item.name}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, {
              items: customItems,
              fitMode: 'scroll',
              getItemLabel: (item) => item.name,
              getItemSubMenu: (item) => item.menu,
            });

            const button = getSelectButton(ctx, index);
            if (item.menu) {
              expect(button).toBeInTheDocument();
            } else {
              expect(button).not.toBeInTheDocument();
            }
          }));
      });
    });
  });
});
