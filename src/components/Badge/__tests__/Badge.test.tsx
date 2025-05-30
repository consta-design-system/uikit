import { IconCamera } from '@consta/icons/IconCamera';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AsTags } from '##/utils/types/AsTags';

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

type BadgeProps = React.ComponentProps<typeof Badge>;

const testId = cnBadge();

function getRender() {
  return screen.getByTestId(testId);
}

function getIcon() {
  return getRender().querySelector(`.${cnBadge('Icon')}`);
}

const renderComponent = (props: BadgeProps) => {
  return render(<Badge data-testid={testId} {...props} />);
};

describe('Компонент Badge', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка form', () => {
      badgePropForm.forEach((form) => {
        it(`присваивает класс для form=${form}`, () => {
          renderComponent({ form });

          expect(getRender()).toHaveClass(cnBadge({ form }));
        });
      });
    });
    describe('проверка view', () => {
      badgePropView.forEach((view) => {
        it(`присваивает класс для view=${view}`, () => {
          renderComponent({ view });

          expect(getRender()).toHaveClass(cnBadge({ view }));
        });
      });
    });
    describe('проверка label', () => {
      it(`текст отображается`, () => {
        const label = 'label';

        renderComponent({ label });

        expect(getRender().textContent).toEqual(label);
      });
    });
    describe('проверка icon', () => {
      it(`иконка отображается`, () => {
        renderComponent({ icon: IconCamera });

        expect(getIcon()).toHaveClass('IconCamera');
      });
    });
    describe('проверка iconLeft', () => {
      it(`иконка отображается`, () => {
        renderComponent({ iconLeft: IconCamera });

        expect(getIcon()).toHaveClass('IconCamera');
      });
    });
    describe('проверка iconRight', () => {
      it(`иконка отображается`, () => {
        renderComponent({ iconRight: IconCamera });

        expect(getIcon()).toHaveClass('IconCamera');
      });
    });
    describe('проверка size', () => {
      badgePropSize.forEach((size) => {
        [true, false].forEach((minified) => {
          it(`присваивает css переменная для size=${size} и minified=${minified}`, () => {
            renderComponent({ size, minified });

            expect(getRender()).toHaveStyle(
              `--badge-size: ${getSize(size, minified)}`,
            );
          });
        });
      });
    });
    describe('проверка className', () => {
      it(`присваивает класс для className`, () => {
        const className = 'className';
        renderComponent({ className });

        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка style', () => {
      it(`присваивает стиль для style`, () => {
        const style = { color: 'red' };
        renderComponent({ style });

        expect(getRender()).toHaveStyle(style);
      });
    });
    describe('проверка ref', () => {
      it(`присваивает ref`, () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ ref });

        expect(ref.current).toBe(getRender());
      });
    });
    describe('проверка onClick', () => {
      it(`вызывает onClick при клике на компонент`, () => {
        const onClick = jest.fn();
        renderComponent({ onClick });

        getRender().click();

        expect(onClick).toHaveBeenCalled();
      });
    });
    describe('проверка status', () => {
      badgePropStatus.forEach((status) => {
        it(`присваивает css переменная для status=${status}`, () => {
          renderComponent({ status });

          expect(getRender()).toHaveStyle(
            `--badge-bg-color: ${getBgColor(status)}`,
          );
        });
      });
    });
    describe('проверка --badge-border-color', () => {
      badgePropStatus.forEach((status) => {
        badgePropView.forEach((view) => {
          it(`присваивает css переменную для status=${status} и view=${view}`, () => {
            renderComponent({ status, view });
            const borderColor = getBorderColor(status, view);

            if (borderColor) {
              expect(getRender()).toHaveStyle(
                `--badge-border-color: ${borderColor}`,
              );
            } else {
              expect(getRender()).not.toHaveStyle(
                `--badge-border-color: ${borderColor}`,
              );
            }
          });
        });
      });
    });
    describe('проверка --badge-horizontal-padding', () => {
      badgePropSize.forEach((size) => {
        [true, false].forEach((minified) => {
          badgePropForm.forEach((form) => {
            it(`присваивает css переменную для size=${size}, form=${form} и minified=${minified}`, () => {
              renderComponent({ size, form, minified });
              const horizontalPadding = getHorizontalPadding(
                size,
                form,
                minified,
              );
              if (horizontalPadding) {
                expect(getRender()).toHaveStyle(
                  `--badge-horizontal-padding: ${horizontalPadding}`,
                );
              } else {
                expect(getRender()).not.toHaveStyle(
                  `--badge-horizontal-padding: ${horizontalPadding}`,
                );
              }
            });
          });
        });
      });
    });
    describe('проверка --badge-minified-border-size', () => {
      badgePropSize.forEach((size) => {
        [true, false].forEach((minified) => {
          it(`присваивает css переменную для size=${size} и minified=${minified}`, () => {
            renderComponent({ size, minified });
            const minifiedBorderSize = getMinifiedBorderSize(size, minified);
            if (minifiedBorderSize) {
              expect(getRender()).toHaveStyle(
                `--badge-minified-border-size: ${minifiedBorderSize}`,
              );
            } else {
              expect(getRender()).not.toHaveStyle(
                `--badge-minified-border-size: ${minifiedBorderSize}`,
              );
            }
          });
        });
      });
    });
    describe('проверка --badge-text-color', () => {
      badgePropStatus.forEach((status) => {
        badgePropView.forEach((view) => {
          it(`присваивает css переменную для status=${status} и view=${view}`, () => {
            renderComponent({ status, view });
            const textColor = getTextColor(status, view);
            if (textColor) {
              expect(getRender()).toHaveStyle(
                `--badge-text-color: ${textColor}`,
              );
            } else {
              expect(getRender()).not.toHaveStyle(
                `--badge-text-color: ${textColor}`,
              );
            }
          });
        });
      });
    });
    describe('проверка --badge-text-size', () => {
      badgePropSize.forEach((size) => {
        it(`присваивает css переменную для size=${size}`, () => {
          renderComponent({ size });
          const textSize = getTextSize(size);
          if (textSize) {
            expect(getRender()).toHaveStyle(`--badge-text-size: ${textSize}`);
          } else {
            expect(getRender()).not.toHaveStyle(`--badge-text: ${textSize}`);
          }
        });
      });
    });
    describe('проверка --badge-degree-mixing', () => {
      badgePropStatus.forEach((status) => {
        badgePropView.forEach((view) => {
          it(`присваивает css переменную для status=${status} и view=${view}`, () => {
            renderComponent({ status, view });
            const degreeMixing = getDegreeMixing(status, view);
            if (degreeMixing) {
              expect(getRender()).toHaveStyle(
                `--badge-degree-mixing: ${degreeMixing}`,
              );
            } else {
              expect(getRender()).not.toHaveStyle(
                `--badge-degree-mixing: ${degreeMixing}`,
              );
            }
          });
        });
      });
    });
    describe('проверка as', () => {
      (['a', 'button', 'div', 'span'] as AsTags[]).forEach((el) => {
        it(`должен рендериться как <${el}>`, () => {
          renderComponent({ as: el });

          const button = screen.getByTestId(testId);

          expect(button.tagName).toEqual(el.toUpperCase());
        });
      });
    });

    describe('проверка minified', () => {
      it(`модификатор применяется`, () => {
        renderComponent({ minified: true });

        expect(getRender()).toHaveClass(cnBadge({ minified: true }));
      });
      it(`label используется как title`, () => {
        const label = 'label';
        renderComponent({ minified: true, label });

        expect(getRender().title).toEqual(label);
      });
      it(`нет дочерних элементов и не отображается label`, () => {
        renderComponent({ minified: true, label: 'label', icon: IconCamera });

        expect(getRender()).toBeEmptyDOMElement();
      });
    });
  });
});
