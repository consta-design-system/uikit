import { IconSun } from '@consta/icons/IconSun';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { getByMap } from '../../../utils/getByMap';
import { Badge } from '../../Badge/Badge';
import { cnCollapse, sizeIconMap } from '../../Collapse/Collapse';
import { CollapseGroup, CollapseGroupProps } from '../CollapseGroup';

const testId = cnCollapse();

type Item = {
  name: string;
  text?: string;
};

export const items: Item[] = [
  {
    name: 'один',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores delectus eius fuga hic optio qui unde velit vitae voluptatibus! Ab autem dignissimos dolorum eaque, est et fugit ipsum molestias necessitatibus nesciunt ratione, vel veniam. Aspernatur aut consequatur ducimus est explicabo harum nemo, nisi officia placeat quisquam, tempore vitae, voluptates.',
  },
  {
    name: 'два',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur esse explicabo harum illum molestias mollitia pariatur quasi quia tempora vel!',
  },
  { name: 'три', text: 'Lorem ipsum dolor sit amet.' },
];

const defaultRightSide: React.ReactNode = [
  <Badge label="Статус" size="s" />,
  <IconSun size={getByMap(sizeIconMap, 'm')} />,
];

const getItemLabel = (item: Item) => item.name;
const getItemContent = (item: Item) => item.text;
const getItemRightSide = () => defaultRightSide;

function renderComponent<ITEM, IS_ACCORDION extends boolean = false>(
  props: CollapseGroupProps<ITEM, IS_ACCORDION>,
) {
  return render(<CollapseGroup data-testid={testId} {...props} />);
}

function getRender() {
  return screen.getByTestId(testId);
}

function getLabelTexts() {
  return getRender().querySelectorAll(`.${cnCollapse('LabelText')}`);
}

function getLabelText(index = 0) {
  return getLabelTexts()[index];
}

function selectCollapse() {
  return getRender().querySelectorAll(`.${cnCollapse()}`);
}

describe('Компонент CollapseGroup', () => {
  it('должен рендериться без ошибок', () => {
    expect(() =>
      renderComponent({
        items,
        getItemLabel,
        getItemContent,
        getItemRightSide,
      }),
    ).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка label', () => {
      it(`label отображается`, () => {
        renderComponent({
          items,
          getItemLabel,
          getItemContent,
        });
        const labelElement = getLabelText() as HTMLDivElement;
        expect(labelElement.textContent).toEqual('один');
      });
    });
    describe('проверка количества коллапсов', () => {
      it(`3 коллапса`, () => {
        renderComponent({
          items,
          getItemLabel,
          getItemContent,
        });
        const elements = selectCollapse();
        expect(elements.length).toEqual(3);
      });
    });
    describe('проверка onOpen', () => {
      it(`клик должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleClick = jest.fn();
        const index = 0;

        renderComponent({
          onOpen: handleClick,
          items,
          getItemLabel,
          getItemContent,
        });

        const element = getLabelText(index) as HTMLDivElement;

        fireEvent.click(element);
        expect(handleClick).toHaveBeenCalled();
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(
          expect.objectContaining({ value: [index] }),
        );
      });
    });
  });
});
