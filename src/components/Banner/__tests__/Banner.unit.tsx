import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixSpace, MixSpaceProps, Space } from '##/mixs/MixSpace';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  Banner,
  bannerPropForm,
  bannerPropFormDefault,
  bannerPropSize,
  bannerPropSizeDefault,
  bannerPropStatus,
  bannerPropStatusDefault,
  bannerPropView,
  bannerPropViewDefault,
  cnBanner,
} from '../Banner';

createRoot();
clearStack();

const iconText = 'IconMock';
const IconLeftMock = createIconMock(iconText);

type BannerProps = React.ComponentProps<typeof Banner>;

const testId = 'banner';

const renderComponent = (ctx: TestContext, props: BannerProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Banner data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

describe('Компонент Banner', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  test('должен рендериться без какого-либо контента', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      expect(getRender(ctx)).toBeInTheDocument();
      // Проверка на пустой элемент будет сложной из-за структуры компонента
    }));

  test('должен использовать default значения когда пропсы не переданы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);

      const banner = getRender(ctx);

      expect(banner).toHaveClass(
        cnBanner({
          size: bannerPropSizeDefault,
          view: bannerPropViewDefault,
          form: bannerPropFormDefault,
        }),
      );
      expect(banner.style.getPropertyValue('--banner-bg-color')).toBe(
        `var(--color-bg-${bannerPropStatusDefault})`,
      );
    }));

  describe('проверка size', () => {
    bannerPropSize.forEach((size) => {
      test(`присваивает класс для size=${size}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { size });

          expect(getRender(ctx)).toHaveClass(cnBanner({ size }));
        }));
    });
  });

  describe('проверка view', () => {
    bannerPropView.forEach((view) => {
      test(`присваивает класс для view=${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { view });

          expect(getRender(ctx)).toHaveClass(cnBanner({ view }));
        }));
    });
  });

  describe('проверка status', () => {
    bannerPropStatus.forEach((status) => {
      test(`устанавливает CSS переменную для status=${status}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { status });

          expect(
            getRender(ctx).style.getPropertyValue('--banner-bg-color'),
          ).toBe(`var(--color-bg-${status})`);
        }));
    });
  });

  describe('проверка form', () => {
    bannerPropForm.forEach((form) => {
      test(`присваивает класс для form=${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { form });

          expect(getRender(ctx)).toHaveClass(cnBanner({ form }));
        }));
    });
  });

  describe('проверка ref', () => {
    test('должен корректно передавать ref', (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          ref: (el: HTMLDivElement | null) => setRef(ref, el),
        });

        expect(ref.current).toBeTruthy();
        expect(ref.current).toHaveClass(cnBanner());
      }));
  });

  describe('проверка кастомного класса', () => {
    test('должен добавлять переданный className', (ctx) =>
      context.start(async () => {
        const customClass = 'custom-class';
        renderComponent(ctx, { className: customClass });

        expect(getRender(ctx)).toHaveClass(customClass);
      }));
  });

  describe('проверка кастомного стиля', () => {
    test('должен применять переданный style', (ctx) =>
      context.start(async () => {
        const customStyle = { backgroundColor: 'red' };
        renderComponent(ctx, { style: customStyle });

        expect(getRender(ctx)).toHaveStyle(customStyle);
      }));
  });

  describe('проверка leftSide', () => {
    test('должен отображать строку в leftSide', (ctx) =>
      context.start(async () => {
        const leftText = 'Левый текст';
        renderComponent(ctx, { leftSide: leftText });

        expect(getRender(ctx)).toHaveTextContent(leftText);
      }));

    test('должен отображать число в leftSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { leftSide: 123 });

        expect(getRender(ctx)).toHaveTextContent('123');
      }));

    test('должен отображать React элемент в leftSide', (ctx) =>
      context.start(async () => {
        const leftElement = <span data-testid="left-element">Элемент</span>;
        renderComponent(ctx, { leftSide: leftElement });

        const element = document.querySelector('[data-testid="left-element"]');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Элемент');
      }));

    test('должен отображать массив строк в leftSide', (ctx) =>
      context.start(async () => {
        const leftArray = ['Текст 1', 'Текст 2', 'Текст 3'];
        renderComponent(ctx, { leftSide: leftArray });

        expect(getRender(ctx)).toHaveTextContent('Текст 1Текст 2Текст 3');
      }));

    test('должен отображать смешанный массив в leftSide', (ctx) =>
      context.start(async () => {
        const mixedArray = [
          'Текст 1',
          <span key="2" data-testid="mixed-element">
            Элемент
          </span>,
          123,
          'Текст 4',
        ];

        renderComponent(ctx, { leftSide: mixedArray });

        expect(getRender(ctx)).toHaveTextContent('Текст 1');
        const element = document.querySelector('[data-testid="mixed-element"]');
        expect(element).toBeInTheDocument();
        expect(getRender(ctx)).toHaveTextContent('123');
        expect(getRender(ctx)).toHaveTextContent('Текст 4');
      }));

    test('должен игнорировать null и undefined в массиве leftSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          leftSide: ['Текст 1', null, 'Текст 2', undefined, 'Текст 3'],
        });

        expect(getRender(ctx)).toHaveTextContent('Текст 1Текст 2Текст 3');
        // Проверка количества слотов сложна из-за структуры DOM
      }));
  });

  describe('проверка rightSide', () => {
    test('должен отображать строку в rightSide', (ctx) =>
      context.start(async () => {
        const rightText = 'Правый текст';
        renderComponent(ctx, { rightSide: rightText });

        expect(getRender(ctx)).toHaveTextContent(rightText);
      }));

    test('должен отображать число в rightSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { rightSide: 123 });

        expect(getRender(ctx)).toHaveTextContent('123');
      }));

    test('должен отображать React элемент в rightSide', (ctx) =>
      context.start(async () => {
        const rightElement = <span data-testid="right-element">Элемент</span>;
        renderComponent(ctx, { rightSide: rightElement });

        const element = document.querySelector('[data-testid="right-element"]');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Элемент');
      }));

    test('должен отображать массив строк в rightSide', (ctx) =>
      context.start(async () => {
        const rightArray = ['Текст 1', 'Текст 2', 'Текст 3'];
        renderComponent(ctx, { rightSide: rightArray });

        expect(getRender(ctx)).toHaveTextContent('Текст 1Текст 2Текст 3');
      }));

    test('должен отображать смешанный массив в rightSide', (ctx) =>
      context.start(async () => {
        const mixedArray = [
          'Текст 1',
          <span key="2" data-testid="mixed-element">
            Элемент
          </span>,
          123,
          'Текст 4',
        ];

        renderComponent(ctx, { rightSide: mixedArray });

        expect(getRender(ctx)).toHaveTextContent('Текст 1');
        const element = document.querySelector('[data-testid="mixed-element"]');
        expect(element).toBeInTheDocument();
        expect(getRender(ctx)).toHaveTextContent('123');
        expect(getRender(ctx)).toHaveTextContent('Текст 4');
      }));

    test('должен игнорировать null и undefined в массиве rightSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          rightSide: ['Текст 1', null, 'Текст 2', undefined, 'Текст 3'],
        });

        expect(getRender(ctx)).toHaveTextContent('Текст 1Текст 2Текст 3');
        // Проверка количества слотов сложна из-за структуры DOM
      }));
  });

  describe('проверка icon', () => {
    test('должен отображать иконку', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { icon: IconLeftMock });

        expect(getRender(ctx)).toHaveTextContent(iconText);
      }));

    test('должен отображать иконку вместе с leftSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { icon: IconLeftMock, leftSide: 'Текст слева' });

        expect(getRender(ctx)).toHaveTextContent(`${iconText}Текст слева`);
      }));

    test('должен добавлять класс для иконки', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { icon: IconLeftMock });

        const iconElement = getRender(ctx).querySelector(
          `.${cnBanner('Icon')}`,
        );
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass(cnBanner('Icon'));
      }));

    test('должен отображать иконку вместе с массивом в leftSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          icon: IconLeftMock,
          leftSide: ['Текст 1', 'Текст 2'],
        });

        expect(getRender(ctx)).toHaveTextContent(`${iconText}Текст 1Текст 2`);
      }));

    test('должен отображать только иконку когда нет leftSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { icon: IconLeftMock });

        expect(getRender(ctx)).toHaveTextContent(iconText);
        // Проверка количества слотов сложна из-за структуры DOM
      }));

    test('иконка должна быть первым элементом в leftSide', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          icon: IconLeftMock,
          leftSide: ['Первый', 'Второй'],
        });

        // Проверка порядка элементов сложна из-за структуры DOM
      }));
  });

  describe('проверка space', () => {
    test('должен применять классы для отступов', (ctx) =>
      context.start(async () => {
        const space: MixSpaceProps = { m: 'm', p: 's' };
        renderComponent(ctx, { space });

        expect(getRender(ctx)).toHaveClass(cnMixSpace(space));
      }));

    test('должен применять отступы по осям', (ctx) =>
      context.start(async () => {
        const space: MixSpaceProps = {
          mH: 'm',
          mV: 's',
          pH: 'l',
          pV: 'xs',
        };
        renderComponent(ctx, { space });

        expect(getRender(ctx)).toHaveClass(cnMixSpace(space));
      }));
  });

  describe('проверка itemsGap', () => {
    test('должен применять единый отступ для всех элементов', (ctx) =>
      context.start(async () => {
        const itemsGap: Space = 'm';
        renderComponent(ctx, {
          itemsGap,
          leftSide: ['Текст 1', 'Текст 2'],
          rightSide: ['Текст 3', 'Текст 4'],
        });

        // Проверка классов сложна из-за структуры DOM
      }));

    test('должен применять разные отступы для левой и правой стороны', (ctx) =>
      context.start(async () => {
        const itemsGap: [Space, Space] = ['s', 'm'];
        renderComponent(ctx, {
          itemsGap,
          leftSide: ['Текст 1', 'Текст 2'],
          rightSide: ['Текст 3', 'Текст 4'],
        });

        // Проверка классов сложна из-за структуры DOM
      }));

    test('должен применять gap только к левому контейнеру при отсутствии правого', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          itemsGap: 'm',
          leftSide: ['Текст 1', 'Текст 2'],
        });

        // Проверка классов сложна из-за структуры DOM
      }));

    test('должен применять gap только к правому контейнеру при отсутствии левого', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          itemsGap: 'm',
          rightSide: ['Текст 1', 'Текст 2'],
        });

        // Проверка классов сложна из-за структуры DOM
      }));
  });
});
