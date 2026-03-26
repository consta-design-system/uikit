import { IconCamera } from '@consta/icons/IconCamera';
import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { AsTags } from '##/utils/types/AsTags';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  Badge,
  badgePropForm,
  badgePropSize,
  badgePropStatus,
  badgePropView,
  cnBadge,
} from '..';
import {
  getBgColor,
  getBorderColor,
  getDegreeMixing,
  getHorizontalPadding,
  getMinifiedBorderSize,
  getSize,
  getTextColor,
  getTextSize,
} from '../maps';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = cnBadge();

type BadgeProps = React.ComponentProps<typeof Badge>;

const renderComponent = (ctx: TestContext, props: BadgeProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Badge data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLDivElement;

const getIcon = (ctx: TestContext) => {
  return getRender(ctx).querySelector(`.${cnBadge('Icon')}`);
};

describe.concurrent('Компонент Badge', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = renderComponent(ctx, { onChange: vi.fn() });
      await wrap(tick());

      expect(() => render).not.toThrow();
    }));

  describe.concurrent('проверка form', () => {
    badgePropForm.forEach((form) => {
      test(`присваивает класс для form=${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { form });

          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnBadge({ form }));
        }));
    });
  });

  describe.concurrent('проверка view', () => {
    badgePropView.forEach((view) => {
      test(`присваивает класс для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });

          await wrap(tick());

          expect(getRender(ctx)).toHaveClass(cnBadge({ view }));
        }));
    });
  });

  describe.concurrent('проверка label', () => {
    test(`текст отображается`, (ctx) =>
      context.start(async () => {
        const label = 'label';

        renderComponent(ctx, { label });

        await wrap(tick());

        expect(getRender(ctx).textContent).toEqual(label);
      }));
  });

  describe.concurrent('проверка icon', () => {
    test(`иконка отображается`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { icon: IconCamera });

        await wrap(tick());

        expect(getIcon(ctx)).toHaveClass('IconCamera');
      }));
  });

  describe.concurrent('проверка iconLeft', () => {
    test(`иконка отображается`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { iconLeft: IconCamera });

        await wrap(tick());

        expect(getIcon(ctx)).toHaveClass('IconCamera');
      }));
  });

  describe.concurrent('проверка iconRight', () => {
    test(`иконка отображается`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { iconRight: IconCamera });

        await wrap(tick());

        expect(getIcon(ctx)).toHaveClass('IconCamera');
      }));
  });

  describe.concurrent('проверка size', () => {
    badgePropSize.forEach((size) => {
      [true, false].forEach((minified) => {
        test(`присваивает css переменная для size=${size} и minified=${minified}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, minified });

            await wrap(tick());

            expect(
              getRender(ctx).style.getPropertyValue('--badge-size'),
            ).toEqual(getSize(size, minified));
          }));
      });
    });
  });

  describe.concurrent('проверка className', () => {
    test(`присваивает класс для className`, (ctx) =>
      context.start(async () => {
        const className = 'className';
        renderComponent(ctx, { className });

        await wrap(tick());

        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe.concurrent('проверка style', () => {
    test(`присваивает стиль для style`, (ctx) =>
      context.start(async () => {
        const style = { color: 'red' };
        renderComponent(ctx, { style });

        await wrap(tick());

        expect(getRender(ctx)).toHaveStyle(style);
      }));
  });

  describe.concurrent('проверка ref', () => {
    test(`присваивает ref`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };
        renderComponent(ctx, { ref });

        await wrap(tick());

        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  describe.concurrent('проверка onClick', () => {
    test(`вызывает onClick при клике на компонент`, (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, { onClick });

        await wrap(tick());

        fireEvent.click(getRender(ctx));

        expect(onClick).toHaveBeenCalled();
      }));
  });

  describe.concurrent('проверка status', () => {
    badgePropStatus.forEach((status) => {
      test(`присваивает css переменная для status=${status}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { status });

          await wrap(tick());

          expect(
            getRender(ctx).style.getPropertyValue('--badge-bg-color'),
          ).toEqual(getBgColor(status));
        }));
    });
  });

  describe.concurrent('проверка --badge-border-color', () => {
    badgePropStatus.forEach((status) => {
      badgePropView.forEach((view) => {
        test(`присваивает css переменную для status=${status} и view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status, view });
            const borderColor = getBorderColor(status, view);

            await wrap(tick());

            if (borderColor) {
              expect(
                getRender(ctx).style.getPropertyValue('--badge-border-color'),
              ).toEqual(borderColor);
            } else {
              expect(
                getRender(ctx).style.getPropertyValue('--badge-border-color'),
              ).not.toEqual(borderColor);
            }
          }));
      });
    });
  });

  describe.concurrent('проверка --badge-horizontal-padding', () => {
    badgePropSize.forEach((size) => {
      [true, false].forEach((minified) => {
        badgePropForm.forEach((form) => {
          test(`присваивает css переменную для size=${size}, form=${form} и minified=${minified}`, (ctx) =>
            context.start(async () => {
              renderComponent(ctx, { size, form, minified });
              const horizontalPadding = getHorizontalPadding(
                size,
                form,
                minified,
              );

              await wrap(tick());

              if (horizontalPadding) {
                expect(
                  getRender(ctx).style.getPropertyValue(
                    '--badge-horizontal-padding',
                  ),
                ).toEqual(`${horizontalPadding}`);
              } else {
                expect(
                  getRender(ctx).style.getPropertyValue(
                    '--badge-horizontal-padding',
                  ),
                ).not.toEqual(`${horizontalPadding}`);
              }
            }));
        });
      });
    });
  });

  describe.concurrent('проверка --badge-minified-border-size', () => {
    badgePropSize.forEach((size) => {
      [true, false].forEach((minified) => {
        test(`присваивает css переменную для size=${size} и minified=${minified}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, minified });
            const minifiedBorderSize = getMinifiedBorderSize(size, minified);

            await wrap(tick());

            if (minifiedBorderSize) {
              expect(
                getRender(ctx).style.getPropertyValue(
                  '--badge-minified-border-size',
                ),
              ).toEqual(minifiedBorderSize);
            } else {
              expect(
                getRender(ctx).style.getPropertyValue(
                  '--badge-minified-border-size',
                ),
              ).not.toEqual(minifiedBorderSize);
            }
          }));
      });
    });
  });

  describe.concurrent('проверка --badge-text-color', () => {
    badgePropStatus.forEach((status) => {
      badgePropView.forEach((view) => {
        test(`присваивает css переменную для status=${status} и view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status, view });
            const textColor = getTextColor(status, view);

            await wrap(tick());

            if (textColor) {
              expect(
                getRender(ctx).style.getPropertyValue('--badge-text-color'),
              ).toEqual(textColor);
            } else {
              expect(
                getRender(ctx).style.getPropertyValue('--badge-text-color'),
              ).not.toEqual(textColor);
            }
          }));
      });
    });
  });

  describe.concurrent('проверка --badge-text-size', () => {
    badgePropSize.forEach((size) => {
      test(`присваивает css переменную для size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });
          const textSize = getTextSize(size);

          await wrap(tick());

          if (textSize) {
            expect(
              getRender(ctx).style.getPropertyValue('--badge-text-size'),
            ).toEqual(`${textSize}`);
          } else {
            expect(
              getRender(ctx).style.getPropertyValue('--badge-text-size'),
            ).toEqual(`${textSize}`);
          }
        }));
    });
  });

  describe.concurrent('проверка --badge-degree-mixing', () => {
    badgePropStatus.forEach((status) => {
      badgePropView.forEach((view) => {
        test(`присваивает css переменную для status=${status} и view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status, view });
            const degreeMixing = getDegreeMixing(status, view);

            await wrap(tick());

            if (degreeMixing) {
              expect(
                getRender(ctx).style.getPropertyValue('--badge-degree-mixing'),
              ).toEqual(degreeMixing);
            } else {
              expect(
                getRender(ctx).style.getPropertyValue('--badge-degree-mixing'),
              ).not.toEqual(degreeMixing);
            }
          }));
      });
    });
  });

  describe.concurrent('проверка as', () => {
    (['a', 'button', 'div', 'span'] as AsTags[]).forEach((el) => {
      test(`должен рендериться как <${el}>`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { as: el });

          await wrap(tick());

          const button = document.querySelector(
            `#${testRootId(ctx)} *[data-testid=${testId}]`,
          ) as HTMLDivElement;

          expect(button.tagName).toEqual(el.toUpperCase());
        }));
    });
  });

  describe.concurrent('проверка minified', () => {
    test(`модификатор применяется`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { minified: true });

        await wrap(tick());

        expect(getRender(ctx)).toHaveClass(cnBadge({ minified: true }));
      }));

    test(`label используется как title`, (ctx) =>
      context.start(async () => {
        const label = 'label';
        renderComponent(ctx, { minified: true, label });

        await wrap(tick());

        expect(getRender(ctx).title).toEqual(label);
      }));

    test(`нет дочерних элементов и не отображается label`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          minified: true,
          label: 'label',
          icon: IconCamera,
        });

        await wrap(tick());

        expect(getRender(ctx)).toBeEmptyDOMElement();
      }));
  });
});
