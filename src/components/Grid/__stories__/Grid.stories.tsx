import './Grid.stories.css';

import * as React from 'react';
import { number, select } from '@storybook/addon-knobs';

import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import {
  Grid,
  GridItem,
  gridItemPropCols,
  gridItemPropOrder,
  gridItemPropRows,
  gridPropCols,
  gridPropGap,
  gridPropXAlign,
  gridPropYAlign,
} from '../Grid';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// import mdx from './File.mdx';

const defaultKnobs = () => ({
  cols: select('cols', gridPropCols, 6),
  gap: select('gap', gridPropGap, 0),
  colGap: select('colGap', gridPropGap, 0),
  rowGap: select('rowGap', gridPropGap, 0),
  xAlign: select('xAlign', ['', ...gridPropXAlign], ''),
  yAlign: select('yAlign', ['', ...gridPropYAlign], ''),
  itemsCount: number('itemsCount', 30),
  selectedItem: number('selectedItem', 5),
  itemCol: select('itemCol', ['', ...gridItemPropCols], ''),
  itemColStart: select('itemColStart', ['', ...gridItemPropCols], ''),
  itemRow: select('itemRow', ['', ...gridItemPropRows], ''),
  itemRowStart: select('itemRowStart', ['', ...gridItemPropRows], ''),
  itemOrder: select('itemOrder', ['', ...gridItemPropOrder], ''),
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
  title: 'Компоненты|/Grid',
  id: 'components/Grid',
  parameters: {
    // docs: {
    //   page: mdx,
    // },
  },
});
