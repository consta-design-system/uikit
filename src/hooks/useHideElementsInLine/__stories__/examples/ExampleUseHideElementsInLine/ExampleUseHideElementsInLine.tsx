import './ExampleUseHideElementsInLine.css';

import React from 'react';

import { Tag } from '../../../../../components/Tag/Tag';
import { cn } from '../../../../../utils/bem';
import { useHideElementsInLine } from '../../../useHideElementsInLine';

const cnExampleUseHideElementsInLine = cn('ExampleUseHideElementsInLine');

const items = [
  'первый',
  'вотрой',
  'третий',
  'чеверый',
  'пятый',
  'шестой',
  'седьмой',
  'восьмой',
  'девяый',
  'десятый',
];

export const ExampleUseHideElementsInLine = () => {
  const { itemsRefs, wrapperRef, hiddenItems, moreRef, visibleItems } = useHideElementsInLine(
    items,
  );

  return (
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
  );
};
