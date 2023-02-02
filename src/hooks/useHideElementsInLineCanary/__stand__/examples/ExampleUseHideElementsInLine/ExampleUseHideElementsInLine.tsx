import './ExampleUseHideElementsInLine.css';

import { Example } from '@consta/stand';
import React from 'react';

import { Tag } from '../../../../../components/Tag/Tag';
import { cn } from '../../../../../utils/bem';
import { useHideElementsInLine } from '../../../useHideElementsInLineCanary';

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
  const { elementsRefs, parentRef, visibleMap } = useHideElementsInLine(
    items.length + 1,
  );

  return (
    <Example col={1}>
      <div ref={parentRef} className={cnExampleUseHideElementsInLine()}>
        {items.map((item, index) => {
          return (
            <Tag
              className={cnExampleUseHideElementsInLine('Tag', {
                hidden: !visibleMap[index],
              })}
              key={index}
              label={item}
              ref={elementsRefs[index]}
              mode="info"
            />
          );
        })}
        <Tag
          className={cnExampleUseHideElementsInLine('Tag', {
            hidden: !visibleMap[items.length],
          })}
          key="more"
          label="..."
          ref={elementsRefs[elementsRefs.length - 1]}
          mode="info"
        />
      </div>
    </Example>
  );
};

export const ExampleUseHideElementsInLineMoreIndex0 = () => {
  const { elementsRefs, parentRef, visibleMap } = useHideElementsInLine(
    items.length + 1,
    0,
  );

  return (
    <Example col={1}>
      <div ref={parentRef} className={cnExampleUseHideElementsInLine()}>
        <Tag
          className={cnExampleUseHideElementsInLine('Tag', {
            hidden: !visibleMap[0],
          })}
          key="more"
          label="..."
          ref={elementsRefs[0]}
          mode="info"
        />
        {items.map((item, index) => {
          return (
            <Tag
              className={cnExampleUseHideElementsInLine('Tag', {
                hidden: !visibleMap[index + 1],
              })}
              key={index}
              label={item}
              ref={elementsRefs[index + 1]}
              mode="info"
            />
          );
        })}
      </div>
    </Example>
  );
};

export const ExampleUseHideElementsInLineMoreIndex5 = () => {
  const moreIndex = 5;

  const { elementsRefs, parentRef, visibleMap } = useHideElementsInLine(
    items.length + 1,
    moreIndex,
  );

  return (
    <Example col={1}>
      <div ref={parentRef} className={cnExampleUseHideElementsInLine()}>
        {elementsRefs.map((ref, index) => {
          if (index === moreIndex) {
            return (
              <Tag
                className={cnExampleUseHideElementsInLine('Tag', {
                  hidden: !visibleMap[index],
                })}
                key="more"
                label="..."
                ref={ref}
                mode="info"
              />
            );
          }
          const item = index < moreIndex ? items[index] : items[index - 1];

          return (
            <Tag
              className={cnExampleUseHideElementsInLine('Tag', {
                hidden: !visibleMap[index],
              })}
              key={index}
              label={item}
              ref={ref}
              mode="info"
            />
          );
        })}
      </div>
    </Example>
  );
};
