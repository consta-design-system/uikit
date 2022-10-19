import './GridVariants.css';

import { useNumber, useSelect } from '@consta/stand';
import React from 'react';

import { range } from '##/utils/array';
import { cn } from '##/utils/bem';

import {
  Grid,
  GridItem,
  gridPropGap,
  gridPropXAlign,
  gridPropYAlign,
} from '../Grid';

const colsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const rows = [1, 2, 3, 4];
const order = [-1, 0, 1];

const cnGridVariants = cn('GridVariants');

const Variants = () => {
  const cols = useSelect('cols', colsArr, 6);
  const gap = useSelect('gap', gridPropGap, 0);
  const colGap = useSelect('colGap', gridPropGap, 0);
  const rowGap = useSelect('rowGap', gridPropGap, 0);
  const xAlign = useSelect('xAlign', gridPropXAlign);
  const yAlign = useSelect('yAlign', gridPropYAlign);
  const itemsCount = useNumber('itemsCount', 30);
  const selectedItem = useNumber('selectedItem', 5);
  const itemCol = useSelect('itemCol', colsArr);
  const itemColStart = useSelect('itemColStart', colsArr);
  const itemRow = useSelect('itemRow', rows);
  const itemRowStart = useSelect('itemRowStart', rows);
  const itemOrder = useSelect('itemOrder', order, 0);

  return (
    <div className={cnGridVariants()}>
      <Grid
        cols={cols}
        gap={gap}
        colGap={colGap}
        rowGap={rowGap}
        xAlign={xAlign}
        yAlign={yAlign}
      >
        {range(itemsCount ?? 0).map((item) => {
          const selected = selectedItem === item + 1;
          return (
            <GridItem
              className={cnGridVariants('Item', { selected })}
              key={item}
              {...(selected
                ? {
                    col: itemCol,
                    row: itemRow,
                    order: itemOrder,
                    colStart: itemColStart,
                    rowStart: itemRowStart,
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
};

export default Variants;
