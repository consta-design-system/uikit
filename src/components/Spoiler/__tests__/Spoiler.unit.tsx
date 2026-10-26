import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnSpoiler, cnSpoilerButton, Spoiler } from '..';
import { spoilerPropSize } from '../types';

createRoot();
clearStack();

type SpoilerProps = React.ComponentProps<typeof Spoiler>;

const testId = 'spoiler';

export type ComponentSize = {
  width: number;
  height: number;
};

const renderComponent = (ctx: TestContext, props: SpoilerProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Spoiler data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;

const getButton = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSpoilerButton()}`) as Element;

const getButtonLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSpoilerButton('Label')}`) as Element;

const mocksProps = {
  children:
    'Проснувшись однажды утром после беспокойного сна, Грегор Белый обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на твердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый,разделенный дугообразными чешуйками живот, на верхушке которого еле держалось готовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами. «Что со мной случилось?» – подумал он.',
  lineClamp: 1,
  moreLabel: 'Показать',
  lessLabel: 'Скрыть',
  style: { width: 50 },
};

describe('Компонент Spoiler', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, mocksProps)).not.toThrow();
    }));

  describe('проверка присутствия кнопки', () => {
    test('кнопка не отображается, если высота превью схожа с высотой полного текста', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...mocksProps, children: 'sss' });
        await wrap(tick());

        expect(getButton(ctx)).toEqual(null);
      }));

    test('кнопка отображается, если высота превью меньше высоты полного текста', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, mocksProps);
        await wrap(tick());

        expect(getButton(ctx)).toHaveClass(cnSpoilerButton());
      }));
  });

  describe('проверка props', () => {
    describe('проверка size', () => {
      spoilerPropSize.forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { ...mocksProps, size });
            await wrap(tick());

            expect(getRender(ctx)).toHaveClass(cnSpoiler({ size }));
          }));
      });
    });

    describe('проверка moreLabel', () => {
      test('проверка текста при open="false"', (ctx) =>
        context.start(async () => {
          //   setMockUseResizeObserved(defaultSizes);
          renderComponent(ctx, mocksProps);
          await wrap(tick());

          expect(getButtonLabel(ctx)).toHaveTextContent(mocksProps.moreLabel);
        }));
    });

    describe('проверка lessLabel', () => {
      test('проверка текста при open="true"', (ctx) =>
        context.start(async () => {
          //   setMockUseResizeObserved(defaultSizes);
          renderComponent(ctx, mocksProps);
          await wrap(tick());

          const button = getButton(ctx);

          fireEvent.click(button);

          expect(getButtonLabel(ctx)).toHaveTextContent(mocksProps.lessLabel);
        }));
    });

    test('ref должен быть присвоен', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { ...mocksProps, ref });
        await wrap(tick());
        expect(ref.current).toBe(getRender(ctx));
      }));
  });
});
