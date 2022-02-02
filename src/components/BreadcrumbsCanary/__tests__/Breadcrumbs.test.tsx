import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconUser } from '../../../icons/IconUser/IconUser';
import { Breadcrumbs } from '../BreadcrumbsCanary';
import { cnBreadcrumbsItem } from '../BreadcrumbsItem/BreadcrumbsItem';

const testId = 'Breadcrumbs';

type Item = {
  icon?: IconComponent;
  link: string;
  label: string;
  isActive?: boolean;
};

const items: Item[] = [
  {
    icon: IconUser,
    label: 'Home',
    link: 'http://yandex.ru',
  },
  {
    label: 'Page1',
    link: 'http://google.ru',
  },
  {
    icon: IconCamera,
    label: 'Page2',
    link: 'http://google1.ru',
  },
  {
    label: 'Page3',
    link: 'http://google2.ru',
  },
  {
    label: 'Page5',
    link: 'http://google3.ru',
  },
];

const initialProps = {
  items,
  getItemLabel: (item: Item) => item.label,
  getItemHref: (item: Item) => item.link,
  getItemIcon: (item: Item) => item.icon,
  onItemClick: (props: { item: Item; e: React.MouseEvent }) => {
    props.e.preventDefault();
    console.log(props.item.link, props.e);
  },
};

const renderComponent = (props = {}) => {
  return render(<Breadcrumbs {...initialProps} {...props} data-testid={testId} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLinks() {
  return getRender().querySelectorAll(`.${cnBreadcrumbsItem('Link')}`);
}

function getLink(index = 0) {
  return getLinks()[index];
}

describe('Компонент Breadcrumbs (Canary)', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    it('проверка лэйблов', () => {
      renderComponent({ items });
      const links = getLinks();
      items.forEach((page, i) => {
        expect(links[i]).toHaveTextContent(page.label);
      });
    });

    it('проверка url', () => {
      renderComponent({ items });
      const links = getLinks();
      items.forEach((page, i) => {
        expect(links[i].getAttribute('href')).toEqual(page.link);
      });
    });

    it('проверка иконок', () => {
      renderComponent({ items });
      const links = getLinks();

      items.forEach((page, i) => {
        expect(!!links[i].querySelector('.Icon')).toEqual(!!page.icon);
      });
    });

    describe('проверка onlyIconRoot', () => {
      it(`Лэйбл первой ссылки не должен отображаться если выставлен флаг onlyIconRoot`, () => {
        renderComponent({ items, onlyIconRoot: true });
        const link = getLink();
        expect(link).toHaveTextContent('');
      });

      it(`Лэйбл первой ссылки должен отображаться если флаг onlyIconRoot не выставлен`, () => {
        renderComponent({ items, onlyIconRoot: false });
        const link = getLink();
        expect(link).toHaveTextContent(items[0].label);
      });
    });
  });
});
