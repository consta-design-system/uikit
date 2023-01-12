import './ExampleUseHideElementsInLine.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Tag } from '../../../../../components/Tag/Tag';
import { cn } from '../../../../../utils/bem';
import { useHideElementsInLine } from '../../../useHideElementsInLine';

const cnExampleUseHideElementsInLine = cn('ExampleUseHideElementsInLine');

const items = [
  'первый',
  'второй',
  'третий',
  'четвёрый',
  'пятый',
  'шестой',
  'седьмой',
  'восьмой',
  'девятый',
  'десятый',
];

export const ExampleUseHideElementsInLine = () => {
  const { itemsRefs, wrapperRef, hiddenItems, moreRef, visibleItems } =
    useHideElementsInLine(items);

  return (
    <Example col={1}>
      <div ref={wrapperRef} className={cnExampleUseHideElementsInLine()}>
        {items.map((item, index) => {
          return (
            <Tag
              className={cnExampleUseHideElementsInLine('Tag', {
                display: !visibleItems[index] && 'hidden',
              })}
              key={index}
              label={item}
              ref={itemsRefs[index]}
              mode="info"
            />
          );
        })}
        <Tag
          className={cnExampleUseHideElementsInLine('Tag', {
            display: !hiddenItems.length && 'none',
          })}
          key="more"
          label={`+${hiddenItems.length}`}
          ref={moreRef}
          mode="info"
        />
      </div>
    </Example>
  );
};
