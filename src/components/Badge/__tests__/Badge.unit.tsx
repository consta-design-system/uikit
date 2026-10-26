import { IconCamera } from '@consta/icons/IconCamera';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { AsTags } from '##/utils/types/AsTags';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

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

describe('Компонент Badge', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = renderComponent(ctx, { onChange: vi.fn() });

      expect(() => render).not.toThrow();
    }));

  describe('проверка form', () => {
    badgePropForm.forEach((form) => {
      test(`присваивает класс для form=${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { form });

          expect(getRender(ctx)).toHaveClass(cnBadge({ form }));
        }));
    });
  });

  describe('проверка view', () => {
    badgePropView.forEach((view) => {
      test(`присваивает класс для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });

          expect(getRender(ctx)).toHaveClass(cnBadge({ view }));
        }));
    });
  });

  describe('проверка label', () => {
    test(`текст отображается`, (ctx) =>
      context.start(async () => {
        const label = 'label';

        renderComponent(ctx, { label });

        expect(getRender(ctx).textContent).toEqual(label);
      }));
  });

  describe('проверка icon', () => {
    test(`иконка отображается`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { icon: IconCamera });

        expect(getIcon(ctx)).toHaveClass('IconCamera');
      }));
  });

  describe('проверка iconLeft', () => {
    test(`иконка отображается`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { iconLeft: IconCamera });

        expect(getIcon(ctx)).toHaveClass('IconCamera');
      }));
  });

  describe('проверка iconRight', () => {
    test(`иконка отображается`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { iconRight: IconCamera });

        expect(getIcon(ctx)).toHaveClass('IconCamera');
      }));
  });

  describe('проверка size', () => {
    badgePropSize.forEach((size) => {
      [true, false].forEach((minified) => {
        test(`присваивает css переменная для size=${size} и minified=${minified}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, minified });

            expect(
              getRender(ctx).style.getPropertyValue('--badge-size'),
            ).toEqual(getSize(size, minified));
          }));
      });
    });
  });

  describe('проверка className', () => {
    test(`присваивает класс для className`, (ctx) =>
      context.start(async () => {
        const className = 'className';
        renderComponent(ctx, { className });

        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe('проверка style', () => {
    test(`присваивает стиль для style`, (ctx) =>
      context.start(async () => {
        const style = { color: 'red' };
        renderComponent(ctx, { style });

        expect(getRender(ctx)).toHaveStyle(style);
      }));
  });

  describe('проверка ref', () => {
    test(`присваивает ref`, (ctx) =>
      context.start(async () => {
        const ref = { current: null };
        renderComponent(ctx, { ref });

        expect(ref.current).toBe(getRender(ctx));
      }));
  });

  describe('проверка onClick', () => {
    test(`вызывает onClick при клике на компонент`, (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, { onClick });

        fireEvent.click(getRender(ctx));

        expect(onClick).toHaveBeenCalled();
      }));
  });

  describe('проверка status', () => {
    badgePropStatus.forEach((status) => {
      test(`присваивает css переменная для status=${status}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { status });

          expect(
            getRender(ctx).style.getPropertyValue('--badge-bg-color'),
          ).toEqual(getBgColor(status));
        }));
    });
  });

  describe('проверка --badge-border-color', () => {
    badgePropStatus.forEach((status) => {
      badgePropView.forEach((view) => {
        test(`присваивает css переменную для status=${status} и view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status, view });
            const borderColor = getBorderColor(status, view);

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

  describe('проверка --badge-horizontal-padding', () => {
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

  describe('проверка --badge-minified-border-size', () => {
    badgePropSize.forEach((size) => {
      [true, false].forEach((minified) => {
        test(`присваивает css переменную для size=${size} и minified=${minified}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size, minified });
            const minifiedBorderSize = getMinifiedBorderSize(size, minified);

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

  describe('проверка --badge-text-color', () => {
    badgePropStatus.forEach((status) => {
      badgePropView.forEach((view) => {
        test(`присваивает css переменную для status=${status} и view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status, view });
            const textColor = getTextColor(status, view);

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

  describe('проверка --badge-text-size', () => {
    badgePropSize.forEach((size) => {
      test(`присваивает css переменную для size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });
          const textSize = getTextSize(size);

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

  describe('проверка --badge-degree-mixing', () => {
    badgePropStatus.forEach((status) => {
      badgePropView.forEach((view) => {
        test(`присваивает css переменную для status=${status} и view=${view}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { status, view });
            const degreeMixing = getDegreeMixing(status, view);

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

  describe('проверка as', () => {
    (['a', 'button', 'div', 'span'] as AsTags[]).forEach((el) => {
      test(`должен рендериться как <${el}>`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { as: el });

          const button = document.querySelector(
            `#${testRootId(ctx)} *[data-testid=${testId}]`,
          ) as HTMLDivElement;

          expect(button.tagName).toEqual(el.toUpperCase());
        }));
    });
  });

  describe('проверка minified', () => {
    test(`модификатор применяется`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { minified: true });

        expect(getRender(ctx)).toHaveClass(cnBadge({ minified: true }));
      }));

    test(`label используется как title`, (ctx) =>
      context.start(async () => {
        const label = 'label';
        renderComponent(ctx, { minified: true, label });

        expect(getRender(ctx).title).toEqual(label);
      }));

    test(`нет дочерних элементов и не отображается label`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          minified: true,
          label: 'label',
          icon: IconCamera,
        });

        expect(getRender(ctx)).toBeEmptyDOMElement();
      }));
  });
});
