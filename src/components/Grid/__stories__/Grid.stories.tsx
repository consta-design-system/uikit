import './Grid.stories.css';

import * as React from 'react';
import { number, select } from '@storybook/addon-knobs';

import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { Grid, GridItem, gridPropGap, gridPropXAlign, gridPropYAlign } from '../Grid';

import mdx from './Grid.docs.mdx';

const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const rows = [1, 2, 3, 4];
const order = [-1, 0, 1];

const defaultKnobs = () => ({
  cols: select('cols', cols, 6),
  gap: select('gap', gridPropGap, 0),
  colGap: select('colGap', gridPropGap, 0),
  rowGap: select('rowGap', gridPropGap, 0),
  xAlign: select('xAlign', ['', ...gridPropXAlign], ''),
  yAlign: select('yAlign', ['', ...gridPropYAlign], ''),
  itemsCount: number('itemsCount', 30),
  selectedItem: number('selectedItem', 5),
  itemCol: select('itemCol', ['', ...cols], ''),
  itemColStart: select('itemColStart', ['', ...cols], ''),
  itemRow: select('itemRow', ['', ...rows], ''),
  itemRowStart: select('itemRowStart', ['', ...rows], ''),
  itemOrder: select('itemOrder', order, 0),
});

const cnGridStories = cn('GridStories');

export function Playground() {
  const {
    cols,
    gap,
    colGap,
    rowGap,
    xAlign,
    yAlign,
    selectedItem,
    itemsCount,
    itemCol,
    itemRow,
    itemOrder,
    itemColStart,
    itemRowStart,
  } = defaultKnobs();

  return (
    <div className={cnGridStories()}>
      <Grid
        cols={cols}
        gap={gap}
        colGap={colGap}
        rowGap={rowGap}
        xAlign={xAlign || undefined}
        yAlign={yAlign || undefined}
      >
        {range(itemsCount).map((item) => {
          const selected = selectedItem === item + 1;
          return (
            <GridItem
              className={cnGridStories('Item', { selected })}
              key={item}
              {...(selected
                ? {
                    col: itemCol || undefined,
                    row: itemRow || undefined,
                    order: itemOrder || undefined,
                    colStart: itemColStart || undefined,
                    rowStart: itemRowStart || undefined,
                  }
                : {})}
            >
              {item + 1}
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Служебные/Grid',
  id: 'components/Grid',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=14188%3A0',
    },
  },
});
