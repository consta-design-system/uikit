import { IconSun } from '@consta/icons/IconSun';
import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { getByMap } from '##/utils/getByMap';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { Badge } from '../../Badge/Badge';
import { cnCollapse, sizeIconMap } from '../../Collapse/Collapse';
import { CollapseGroup, CollapseGroupProps } from '../CollapseGroup';

createRoot();
clearStack();

const testId = cnCollapse();

type Item = {
  name: string;
  text?: string;
};

export const items: Item[] = [
  {
    name: 'один',
    /* cspell:disable-next-line */
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores delectus eius fuga hic optio qui unde velit vitae voluptatibus! Ab autem dignissimos dolorum eaque, est et fugit ipsum molestias necessitatibus nesciunt ratione, vel veniam. Aspernatur aut consequatur ducimus est explicabo harum nemo, nisi officia placeat quisquam, tempore vitae, voluptates.',
  },
  {
    name: 'два',
    /* cspell:disable-next-line */
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
  },

  {
    name: 'три',
    /* cspell:disable-next-line */
    text: 'Lorem ipsum dolor sit amet.',
  },
];

const defaultRightSide: React.ReactNode = [
  <Badge label="Статус" size="s" />,
  <IconSun size={getByMap(sizeIconMap, 'm')} />,
];

const getItemLabel = (item: Item) => item.name;
const getItemContent = (item: Item) => item.text;
const getItemRightSide = () => defaultRightSide;

function renderComponent<ITEM, IS_ACCORDION extends boolean = false>(
  ctx: TestContext,
  props: CollapseGroupProps<ITEM, IS_ACCORDION>,
) {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <CollapseGroup data-testid={testId} {...props} />
      </reatomContext.Provider>,
    );
  });
}

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getLabelTexts = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnCollapse('LabelText')}`);

const getLabelText = (ctx: TestContext, index = 0) => getLabelTexts(ctx)[index];

const selectCollapse = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnCollapse()}`);

describe('Компонент CollapseGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, {
          items,
          getItemLabel,
          getItemContent,
          getItemRightSide,
        }),
      ).not.toThrow();
    }));

  describe('проверка props', () => {
    describe('проверка label', () => {
      test(`label отображается`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items,
            getItemLabel,
            getItemContent,
          });

          const labelElement = getLabelText(ctx) as HTMLDivElement;
          expect(labelElement.textContent).toEqual('один');
        }));
    });

    describe('проверка количества коллапсов', () => {
      test(`3 коллапса`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            items,
            getItemLabel,
            getItemContent,
          });

          const elements = selectCollapse(ctx);
          expect(elements.length).toEqual(3);
        }));
    });

    describe('проверка onOpen', () => {
      test(`клик должен вызвать callback c ожидаемыми параметрами`, (ctx) =>
        context.start(async () => {
          const handleClick = vi.fn();
          const index = 0;

          renderComponent(ctx, {
            onOpen: handleClick,
            items,
            getItemLabel,
            getItemContent,
          });

          const element = getLabelText(ctx, index) as HTMLDivElement;

          fireEvent.click(element);
          expect(handleClick).toHaveBeenCalled();
          expect(handleClick).toHaveBeenCalledTimes(1);
          expect(handleClick).toHaveBeenCalledWith([0], expect.anything());
        }));
    });
  });
});
