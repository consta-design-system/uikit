import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

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
import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { BadgeGroup, BadgeGroupDefaultItem, BadgeGroupProps } from '..';

createRoot();
clearStack();

const testId = 'BadgeGroup';

const iconLeftText = 'IconLeft';
const iconRightText = 'IconRight';
const iconLeft = createIconMock(iconLeftText);
const iconRight = createIconMock(iconRightText);

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

const getItems = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnBadge()}`);

const getItem = (ctx: TestContext, index: number = 0) =>
  getItems(ctx)[index] as HTMLElement;

const getItemLabel = (ctx: TestContext, index: number = 0) =>
  getItem(ctx, index).textContent;

const getItemIconLeft = (ctx: TestContext, index: number = 0) =>
  getItem(ctx, index).querySelectorAll('svg')[0];

const getItemIconRight = (ctx: TestContext, index: number = 0) =>
  getItem(ctx, index).querySelectorAll('svg')[1] ||
  getItem(ctx, index).querySelectorAll('svg')[0];

const getItemTag = (ctx: TestContext, index: number = 0) =>
  getItem(ctx, index).tagName.toLowerCase();

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

type Render = <ITEM = BadgeGroupDefaultItem>(
  ctx: TestContext,
  props: BadgeGroupProps<ITEM>,
) => void;

const renderComponent: Render = (ctx, props) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <BadgeGroup
            {...props}
            items={props?.items || []}
            data-testid={testId}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent(`Компонент ${testId}`, () => {
  test(`должен рендериться без ошибок`, async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, { items: itemsDefault })).not.toThrow();
    });
  });

  test(`проверка className`, async (ctx) => {
    await context.start(async () => {
      const className = 'className';
      renderComponent(ctx, { items: itemsDefault, className });

      expect(getRender(ctx)).toHaveClass(className);
    });
  });

  test(`проверка ref`, async (ctx) => {
    await context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent(ctx, { items: itemsDefault, ref });

      expect(ref.current).toBe(getRender(ctx));
    });
  });

  test(`проверка onClick`, async (ctx) => {
    await context.start(async () => {
      const onClick = vi.fn();
      renderComponent(ctx, { items: itemsDefault, onClick });

      getRender(ctx).click();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe.concurrent(`проверка fitMode = reduction`, () => {
    test(`элемент More отобразился`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { items: itemsDefault, fitMode: 'reduction' });

        expect(getItems(ctx).length).toEqual(itemsDefault.length + 1);
      });
    });

    test(`текст на элементе More отобразился`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: itemsDefault,
          fitMode: 'reduction',
        });

        expect(getItem(ctx, itemsDefault.length)).toHaveTextContent('+1');
      });
    });
  });

  describe.concurrent(`проверка items`, () => {
    test(`количество должно совпадать с передаваемым`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { items: itemsDefault });

        expect(getItems(ctx).length).toEqual(itemsDefault.length);
      });
    });

    itemsDefault.forEach((item, index) => {
      test(`проверка label у элемента -  ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefault });

          expect(getItemLabel(ctx, index)).toEqual(item.label);
        });
      });

      test(`проверка --badge-bg-color у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefault });

          expect(
            getItem(ctx, index).style.getPropertyValue('--badge-bg-color'),
          ).toEqual(getBgColor(itemsDefault[index].status || 'normal'));
        });
      });

      test(`проверка --badge-text-color у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefault });

          expect(
            getItem(ctx, index).style.getPropertyValue('--badge-text-color'),
          ).toEqual(
            getTextColor(
              itemsDefault[index].status || 'normal',
              itemsDefault[index].view || 'filled',
            ),
          );
        });
      });

      test(`проверка --badge-border-color у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefault });

          const borderColor = getBorderColor(
            itemsDefault[index].status || 'normal',
            itemsDefault[index].view || 'filled',
          );

          if (borderColor) {
            expect(
              getItem(ctx, index).style.getPropertyValue(
                '--badge-border-color',
              ),
            ).toEqual(borderColor);
          }
        });
      });

      test(`проверка --badge-degree-mixing у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          const degreeMixing = getDegreeMixing(
            itemsDefault[index].status || 'normal',
            itemsDefault[index].view || 'filled',
          );

          if (degreeMixing) {
            expect(
              getItem(ctx, index).style.getPropertyValue(
                '--badge-degree-mixing',
              ),
            ).toEqual(degreeMixing);
          }
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      [true, false].forEach((minified) => {
        itemsDefault.forEach((item, index) => {
          test(`проверка --badge-size при size = ${size}, minified = ${minified} у элемента - ${index}`, async (ctx) => {
            await context.start(async () => {
              renderComponent(ctx, { items: itemsDefault, size, minified });

              expect(
                getItem(ctx, index).style.getPropertyValue('--badge-size'),
              ).toEqual(getSize(size, minified));
            });
          });
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      itemsDefault.forEach((item, index) => {
        test(`проверка --badge-text-size при size = ${size} у элемента - ${index}`, async (ctx) => {
          await context.start(async () => {
            renderComponent(ctx, { items: itemsDefault, size });

            expect(
              getItem(ctx, index).style.getPropertyValue('--badge-text-size'),
            ).toEqual(getTextSize(size));
          });
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      (['round', 'default'] as const).forEach((form) => {
        [true, false].forEach((minified) => {
          itemsDefault.forEach((item, index) => {
            test(`проверка --badge-horizontal-padding при size = ${size}, minified = ${minified}, form = ${form} у элемента - ${index}`, async (ctx) => {
              await context.start(async () => {
                renderComponent(ctx, {
                  items: itemsDefault,
                  size,
                  minified,
                  form,
                });

                const horizontalPadding = getHorizontalPadding(
                  size,
                  form,
                  minified,
                );
                if (horizontalPadding) {
                  expect(
                    getItem(ctx, index).style.getPropertyValue(
                      '--badge-horizontal-padding',
                    ),
                  ).toEqual(horizontalPadding);
                }
              });
            });
          });
        });
      });
    });

    (['xs', 's', 'm', 'l'] as const).forEach((size) => {
      [true, false].forEach((minified) => {
        itemsDefault.forEach((item, index) => {
          test(`проверка --badge-minified-border-size при size = ${size}, minified = ${minified} у элемента - ${index}`, async (ctx) => {
            await context.start(async () => {
              renderComponent(ctx, { items: itemsDefault, size, minified });

              const minifiedBorderSize = getMinifiedBorderSize(size, minified);
              if (minifiedBorderSize) {
                expect(
                  getItem(ctx, index).style.getPropertyValue(
                    '--badge-minified-border-size',
                  ),
                ).toEqual(minifiedBorderSize);
              }
            });
          });
        });
      });
    });

    itemsDefaultWithIcons.forEach((item, index) => {
      test(`проверка iconLeft у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefaultWithIcons });

          const iconLeft = item?.iconLeft;

          if (iconLeft) {
            expect(getItemIconLeft(ctx, index)).toHaveTextContent(iconLeftText);
          }
        });
      });

      test(`проверка iconRight у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefaultWithIcons });

          const iconRight = itemsDefaultWithIcons[index]?.iconRight;

          if (iconRight) {
            expect(getItemIconRight(ctx, index)).toHaveTextContent(
              iconRightText,
            );
          }
        });
      });
    });

    itemsDefaultWithTags.forEach((item, index) => {
      test(`проверка tag у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefaultWithTags });

          const tag = itemsDefaultWithTags[index]?.as?.toLowerCase();

          expect(getItemTag(ctx, index)).toEqual(tag || 'div');
        });
      });
    });

    itemsDefault.forEach((item, index) => {
      test(`проверка ref у элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { items: itemsDefault });

          expect(getItem(ctx, index)).toBe(item.ref?.current);
        });
      });
    });

    itemsDefaultWithAttributes.forEach((item, index) => {
      describe.concurrent(`проверка attributes у элемента - ${index}`, () => {
        item.attributes &&
          Object.keys(item.attributes).forEach((key) => {
            const value = item.attributes?.[
              key as keyof typeof item.attributes
            ] as string;
            test(`${key} = ${value}`, async (ctx) => {
              await context.start(async () => {
                renderComponent(ctx, { items: itemsDefaultWithAttributes });

                expect(getItem(ctx, index)).toHaveAttribute(key, value);
              });
            });
          });
      });
    });
  });

  describe.concurrent('проверка геттеров', () => {
    test('проверка getItemAs', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemAs: () => 'span',
        });

        expect(getItemTag(ctx)).toEqual('span');
      });
    });

    customItems.forEach((item, index) => {
      test(`проверка getItemLabel для элемента - ${index}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, {
            items: customItems,
            getItemKey: getItemForComponent,
            getItemLabel: getItemForComponent,
          });

          expect(getItem(ctx, index)).toHaveTextContent(
            getItemForComponent(item),
          );
        });
      });
    });

    test(`проверка getItemIconLeft для элемента`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
          getItemIconLeft: () => iconLeft,
        });

        expect(getItemIconLeft(ctx)).toHaveTextContent(iconLeftText);
      });
    });

    test(`проверка getItemIconRight для элемента`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
          getItemIconLeft: () => iconRight,
        });

        expect(getItemIconRight(ctx)).toHaveTextContent(iconRightText);
      });
    });

    test(`проверка getItemStatus`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
          getItemStatus: () => 'success',
        });

        expect(getItem(ctx).style.getPropertyValue('--badge-bg-color')).toEqual(
          getBgColor('success'),
        );

        expect(
          getItem(ctx).style.getPropertyValue('--badge-text-color'),
        ).toEqual(getTextColor('success', 'filled'));
      });
    });

    test(`проверка getItemView`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
          getItemView: () => 'stroked',
        });

        expect(
          getItem(ctx).style.getPropertyValue('--badge-text-color'),
        ).toEqual(getTextColor('normal', 'stroked'));

        expect(
          getItem(ctx).style.getPropertyValue('--badge-border-color'),
        ).toEqual(getBorderColor('normal', 'stroked'));
      });
    });

    test(`проверка getItemAttributes`, async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
          getItemAttributes: () =>
            ({
              'data-testid': 'test',
            }) as React.HTMLAttributes<HTMLDivElement>,
        });

        expect(getItem(ctx)).toHaveAttribute('data-testid', 'test');
      });
    });

    test(`проверка getItemRef`, async (ctx) => {
      await context.start(async () => {
        const refs: Record<string, React.RefObject<HTMLDivElement>> = {};

        customItems.forEach((item) => {
          refs[item] = React.createRef<HTMLDivElement>();
        });

        renderComponent(ctx, {
          items: customItems,
          getItemKey: getItemForComponent,
          getItemLabel: getItemForComponent,
          getItemRef: (item) => refs[item],
        });

        const ref = refs[customItems[3]];
        expect(getItem(ctx, 3)).toBe(ref.current);
      });
    });
  });
});
