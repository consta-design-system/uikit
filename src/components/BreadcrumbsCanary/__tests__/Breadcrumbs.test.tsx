import * as React from 'react';
import { render } from '@testing-library/react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconCamera } from '../../../icons/IconCamera/IconCamera';
import { IconUser } from '../../../icons/IconUser/IconUser';
import { breadcrumbPropSize, Breadcrumbs, cnBreadcrumbs } from '../BreadcrumbsCanary';

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
  getItemActive: (item: Item) => item.isActive,
  onItemClick: (props: { item: Item; e: React.MouseEvent }) => {
    props.e.preventDefault();
    console.log(props.item.link, props.e);
  },
};

const renderComponent = (props = {}) => {
  return render(<Breadcrumbs {...initialProps} {...props} />);
};

describe('Компонент Breadcrumbs (Canary)', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      breadcrumbPropSize.forEach((size) => {
        it(`присваивает класс для size=${size}`, () => {
          const { container } = renderComponent({ size });

          const breadcrumbs = container.firstChild;

          expect(breadcrumbs).toHaveClass(cnBreadcrumbs({ size }));
        });
      });
    });

    describe('проверка maxCount', () => {
      it('когда maxCount не указан, должны отобразиться все элементы', () => {
        const { container } = renderComponent({ items, maxCount: undefined });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);
        expect(links.length).toEqual(items.length);
      });

      it('когда maxCount не указан, не должно отобразиться многоточие', () => {
        const { container } = renderComponent({ items, maxCount: undefined });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('More')}`);

        expect(links.length).toEqual(0);
      });

      it('когда maxCount больше или равен количеству страниц, должны отобразиться все элементы', () => {
        const { container } = renderComponent({ items, maxCount: 5 });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);

        expect(links.length).toEqual(items.length);
      });

      it('когда maxCount больше или равен количеству страниц, не должно отобразиться многоточие', () => {
        const { container } = renderComponent({ items, maxCount: 5 });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('More')}`);

        expect(links.length).toEqual(0);
      });

      it('когда maxCount меньше количества страниц, должно отобразиться указанное количество элементов вместе с многоточием', () => {
        const { container } = renderComponent({ items, maxCount: 3 });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);

        expect(links.length).toEqual(2);
      });

      it('когда maxCount меньше количества страниц, должно отобразиться многоточие', () => {
        const { container } = renderComponent({ items, maxCount: 3 });
        const more = container.querySelectorAll(`.${cnBreadcrumbs('More')}`);

        expect(more.length).toEqual(1);
      });
    });

    describe('проверка url', () => {
      const { container } = renderComponent({ items, maxCount: 5 });
      const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);

      items.forEach((page, i) => {
        it(`присваивает href=${page.link}`, () => {
          expect(links[i].getAttribute('href')).toEqual(page.link);
        });
      });
    });

    describe('проверка иконок', () => {
      const { container } = renderComponent({ items, maxCount: 5 });
      const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);
      items.forEach((page, i) => {
        it(`наличие иконки=${!!page.icon}`, () => {
          expect(!!links[i].querySelector(`.${cnBreadcrumbs('Icon')}`)).toEqual(!!page.icon);
        });
      });
    });

    describe('проверка лэйблов', () => {
      const { container } = renderComponent({ items });
      const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);
      items.forEach((page, i) => {
        it(`лэйбл=${page.label}`, () => {
          expect(links[i].querySelector(`.${cnBreadcrumbs('Label')}`)).toContainHTML(page.label);
        });
      });
    });

    describe('проверка onlyIconRoot', () => {
      it(`Лэйбл первой ссылки не должен отображаться если выставлен флаг onlyIconRoot`, () => {
        const { container } = renderComponent({ items, onlyIconRoot: true });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);
        expect(!!links[0].querySelector(`.${cnBreadcrumbs('Label')}`)).toEqual(false);
      });

      it(`Лэйбл первой ссылки должен отображаться если флаг onlyIconRoot не выставлен`, () => {
        const { container } = renderComponent({ items, onlyIconRoot: false });
        const links = container.querySelectorAll(`.${cnBreadcrumbs('Link')}`);
        expect(!!links[0].querySelector(`.${cnBreadcrumbs('Label')}`)).toEqual(true);
      });
    });
  });
});
