import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';

import { createIconMock } from '##/../__mocks__/IconMock';
import { cnBadge } from '##/components/Badge';
import {
  getBgColor,
  getBorderColor,
  getDegreeMixing,
  getHorizontalPadding,
  getMinifiedBorderSize,
  getSize,
  getTextColor,
  getTextSize,
} from '##/components/Badge/maps';

import { BadgeGroup, BadgeGroupDefaultItem, BadgeGroupProps } from '..';

const testId = 'BadgeGroup';

const iconLeftText = 'IconLeft';
const iconRightText = 'IconRight';
const iconLeft = createIconMock(iconLeftText);
const iconRight = createIconMock(iconRightText);

const getRender = () => screen.getByTestId(testId);
const getItems = () => getRender().querySelectorAll(`.${cnBadge()}`);
const getItem = (index: number = 0) => getItems()[index] as HTMLElement;
const getItemLabel = (index: number = 0) => getItem(index).textContent;
const getItemIconLeft = (index: number = 0) =>
  getItem(index).querySelectorAll('svg')[0];
const getItemIconRight = (index: number = 0) =>
  getItem(index).querySelectorAll('svg')[1] ||
  getItem(index).querySelectorAll('svg')[0];
const getItemTag = (index: number = 0) => getItem(index).tagName.toLowerCase();

const itemsDefault: BadgeGroupDefaultItem[] = [
  {
    key: 1,
    label: 'Согласован',
    status: 'success',
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    key: 2,
    label: 'ожидает',
    status: 'warning',
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    key: 3,
    label: 'новый',
    view: 'stroked',
    status: 'normal',
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    key: 4,
    label: 'черновик',
    status: 'system',
    ref: React.createRef<HTMLDivElement>(),
  },
  {
    key: 5,
    label: 'отказано',
    view: 'stroked',
    status: 'alert',
    ref: React.createRef<HTMLDivElement>(),
  },
];

const itemsDefaultWithIcons: BadgeGroupDefaultItem[] = [
  {
    key: 1,
    label: 'Согласован',
    status: 'success',
    iconLeft,
  },
  {
    key: 2,
    label: 'ожидает',
    status: 'warning',
    iconRight,
  },
  {
    key: 3,
    label: 'новый',
    view: 'stroked',
    status: 'normal',
    iconRight,
    iconLeft,
  },
  {
    key: 4,
    label: 'черновик',
    status: 'system',
    iconLeft,
  },
  {
    key: 5,
    label: 'отказано',
    view: 'stroked',
    status: 'alert',
    iconRight,
  },
];

const itemsDefaultWithTags: BadgeGroupDefaultItem[] = [
  {
    key: 1,
    label: 'Согласован',
    status: 'success',
    as: 'div',
  },
  {
    key: 2,
    label: 'ожидает',
    status: 'warning',
    as: 'a',
  },
  {
    key: 3,
    label: 'новый',
    view: 'stroked',
    status: 'normal',
    as: 'span',
  },
  {
    key: 4,
    label: 'черновик',
    status: 'system',
  },
  {
    key: 5,
    label: 'отказано',
    view: 'stroked',
    status: 'alert',
  },
];

const itemsDefaultWithAttributes: BadgeGroupDefaultItem[] = [
  {
    key: 1,
    label: 'Согласован',
    status: 'success',
    as: 'a',
    attributes: { href: '#' } as React.AnchorHTMLAttributes<HTMLAnchorElement>,
  },
  {
    key: 2,
    label: 'ожидает',
    status: 'warning',
    as: 'a',
    attributes: {
      href: '#',
      target: '_blank',
    } as React.AnchorHTMLAttributes<HTMLAnchorElement>,
  },
  {
    key: 3,
    label: 'новый',
    view: 'stroked',
    status: 'normal',
    as: 'a',
    attributes: {
      href: '#',
      target: '_blank',
    } as React.AnchorHTMLAttributes<HTMLAnchorElement>,
  },
  {
    key: 4,
    label: 'черновик',
    status: 'system',
    attributes: {
      'data-badge-test': 'test',
    } as React.AnchorHTMLAttributes<HTMLDivElement>,
  },
  {
    key: 5,
    label: 'отказано',
    view: 'stroked',
    status: 'alert',
    attributes: {
      'data-badge-test': 'test',
    } as React.AnchorHTMLAttributes<HTMLDivElement>,
  },
];

const customItems = ['item1', 'item2', 'item3', 'item4', 'item5'];
const getItemForComponent = (item: string) => item;

export type Render = <ITEM = BadgeGroupDefaultItem>(
  props: BadgeGroupProps<ITEM>,
) => RenderResult;

const renderComponent: Render = (props) => {
  return render(
    <BadgeGroup {...props} items={props?.items || []} data-testid={testId} />,
  );
};

describe(`Компонент ${testId}`, () => {
  it(`должен рендериться без ошибок`, () => {
    expect(renderComponent).not.toThrow();
  });

  it(`проверка className`, () => {
    const className = 'className';
    renderComponent({ items: itemsDefault, className });
    expect(getRender()).toHaveClass(className);
  });

  it(`проверка ref`, () => {
    const ref = React.createRef<HTMLDivElement>();
    renderComponent({ items: itemsDefault, ref });
    expect(ref.current).toBe(getRender());
  });

  it(`проверка onClick`, () => {
    const onClick = jest.fn();
    renderComponent({ items: itemsDefault, onClick });
    getRender().click();
    expect(onClick).toHaveBeenCalled();
  });

  describe(`проверка fitMode = reduction`, () => {
    it(`элемент More отобразился`, () => {
      renderComponent({ items: itemsDefault, fitMode: 'reduction' });
      expect(getItems().length).toEqual(itemsDefault.length + 1);
    });
    it(`текст на элементе More отобразился`, () => {
      renderComponent({
        items: itemsDefault,
        fitMode: 'reduction',
      });
      expect(getItem(itemsDefault.length)).toHaveTextContent('+1');
    });
  });

  describe(`проверка items`, () => {
    it(`количество должно совпадать с передаваемым`, () => {
      renderComponent({ items: itemsDefault });
      expect(getItems().length).toEqual(itemsDefault.length);
    });
    itemsDefault.forEach((item, index) => {
      it(`проверка label у элемента -  ${index}`, () => {
        renderComponent({ items: itemsDefault });
        expect(getItemLabel(index)).toEqual(item.label);
      });
      it(`проверка --badge-bg-color у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefault });

        expect(getItem(index)).toHaveStyle(
          `--badge-bg-color: ${getBgColor(
            itemsDefault[index].status || 'normal',
          )}`,
        );
      });
      it(`проверка --badge-text-color у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefault });

        expect(getItem(index)).toHaveStyle(
          `--badge-text-color: ${getTextColor(
            itemsDefault[index].status || 'normal',
            itemsDefault[index].view || 'filled',
          )}`,
        );
      });

      it(`проверка --badge-border-color у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefault });

        const borderColor = getBorderColor(
          itemsDefault[index].status || 'normal',
          itemsDefault[index].view || 'filled',
        );

        if (borderColor) {
          expect(getItem(index)).toHaveStyle(
            `--badge-border-color: ${borderColor}`,
          );
        }
      });

      it(`проверка --badge-degree-mixing у элемента - ${index}`, () => {
        const degreeMixing = getDegreeMixing(
          itemsDefault[index].status || 'normal',
          itemsDefault[index].view || 'filled',
        );

        if (degreeMixing) {
          expect(getItem(index)).toHaveStyle(
            `--badge-degree-mixing: ${degreeMixing}`,
          );
        }
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      [true, false].forEach((minified) => {
        itemsDefault.forEach((item, index) => {
          it(`проверка --badge-size при size = ${size}, minified = ${minified} у элемента - ${index}`, () => {
            renderComponent({ items: itemsDefault, size, minified });
            expect(getItem(index)).toHaveStyle(
              `--badge-size: ${getSize(size, minified)}`,
            );
          });
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      itemsDefault.forEach((item, index) => {
        it(`проверка --badge-text-size при size = ${size} у элемента - ${index}`, () => {
          renderComponent({ items: itemsDefault, size });
          expect(getItem(index)).toHaveStyle(
            `--badge-text-size: ${getTextSize(size)}`,
          );
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      (['round', 'default'] as const).forEach((form) => {
        [true, false].forEach((minified) => {
          itemsDefault.forEach((item, index) => {
            it(`проверка --badge-horizontal-padding при size = ${size}, minified = ${minified}, form = ${form} у элемента - ${index}`, () => {
              renderComponent({ items: itemsDefault, size, minified, form });
              const horizontalPadding = getHorizontalPadding(
                size,
                form,
                minified,
              );
              if (horizontalPadding) {
                expect(getItem(index)).toHaveStyle(
                  `--badge-horizontal-padding: ${horizontalPadding}`,
                );
              }
            });
          });
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      [true, false].forEach((minified) => {
        itemsDefault.forEach((item, index) => {
          it(`проверка --badge-minified-border-size при size = ${size}, minified = ${minified} у элемента - ${index}`, () => {
            renderComponent({ items: itemsDefault, size, minified });
            const minifiedBorderSize = getMinifiedBorderSize(size, minified);
            if (minifiedBorderSize) {
              expect(getItem(index)).toHaveStyle(
                `--badge-minified-border-size: ${minifiedBorderSize}`,
              );
            }
          });
        });
      });
    });

    itemsDefaultWithIcons.forEach((item, index) => {
      it(`проверка iconLeft у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefaultWithIcons });

        const iconLeft = item?.iconLeft;

        if (iconLeft) {
          expect(getItemIconLeft(index)).toHaveTextContent(iconLeftText);
        }
      });
      it(`проверка iconRight у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefaultWithIcons });

        const iconRight = itemsDefaultWithIcons[index]?.iconRight;

        if (iconRight) {
          expect(getItemIconRight(index)).toHaveTextContent(iconRightText);
        }
      });
    });

    itemsDefaultWithTags.forEach((item, index) => {
      it(`проверка tag у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefaultWithTags });

        const tag = itemsDefaultWithTags[index]?.as?.toLowerCase();

        expect(getItemTag(index)).toEqual(tag || 'div');
      });
    });

    itemsDefault.forEach((item, index) => {
      it(`проверка ref у элемента - ${index}`, () => {
        renderComponent({ items: itemsDefault });
        expect(getItem(index)).toBe(item.ref?.current);
      });
    });

    itemsDefaultWithAttributes.forEach((item, index) => {
      describe(`проверка attributes у элемента - ${index}`, () => {
        item.attributes &&
          Object.keys(item.attributes).forEach((key) => {
            const value = item.attributes?.[
              key as keyof typeof item.attributes
            ] as string;
            it(`${key} = ${value}`, () => {
              renderComponent({ items: itemsDefaultWithAttributes });
              expect(getItem(index)).toHaveAttribute(key, value);
            });
          });
      });
    });
  });

  describe('проверка геттеров', () => {
    it('проверка getItemAs', () => {
      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemAs: () => 'span',
      });
      expect(getItemTag()).toEqual('span');
    });

    customItems.forEach((item, index) => {
      it(`проверка getItemLabel для элемента - ${index}`, () => {
        renderComponent({
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
        });
        expect(getItem(index)).toHaveTextContent(getItemForComponent(item));
      });
    });

    it(`проверка getItemIconLeft для элемента`, () => {
      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemLabel: getItemForComponent,
        getItemIconLeft: () => iconLeft,
      });
      expect(getItemIconLeft()).toHaveTextContent(iconLeftText);
    });

    it(`проверка getItemIconRight для элемента`, () => {
      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemLabel: getItemForComponent,
        getItemIconLeft: () => iconRight,
      });
      expect(getItemIconRight()).toHaveTextContent(iconRightText);
    });

    it(`проверка getItemStatus`, () => {
      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemLabel: getItemForComponent,
        getItemStatus: () => 'success',
      });
      expect(getItem()).toHaveStyle({
        '--badge-bg-color': `${getBgColor('success')}`,
        '--badge-text-color': `${getTextColor('success', 'filled')}`,
      });
    });

    it(`проверка getItemView`, () => {
      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemLabel: getItemForComponent,
        getItemView: () => 'stroked',
      });
      expect(getItem()).toHaveStyle({
        '--badge-text-color': `${getTextColor('normal', 'stroked')}`,
        '--badge-border-color': `${getBorderColor('normal', 'stroked')}`,
      });
    });

    it(`проверка getItemAttributes`, () => {
      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemLabel: getItemForComponent,
        getItemAttributes: () =>
          ({
            'data-testid': 'test',
          } as React.HTMLAttributes<HTMLDivElement>),
      });
      expect(getItem()).toHaveAttribute('data-testid', 'test');
    });

    it(`проверка getItemRef`, () => {
      const refs: Record<string, React.RefObject<HTMLDivElement>> = {};

      customItems.forEach((item) => {
        refs[item] = React.createRef<HTMLDivElement>();
      });

      renderComponent({
        items: customItems,
        getItemKey: getItemForComponent,
        getItemLabel: getItemForComponent,
        getItemRef: (item) => refs[item],
      });

      const ref = refs[customItems[3]];
      expect(getItem(3)).toBe(ref.current);
    });
  });
});
