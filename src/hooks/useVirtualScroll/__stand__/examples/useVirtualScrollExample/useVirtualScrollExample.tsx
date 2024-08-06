import './useVirtualScrollExample.css';

import { Example } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import { ListBox, ListItem } from '##/components/ListCanary';
import { useVirtualScroll } from '##/hooks/useVirtualScroll';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';

const cnUseVirtualScrollExample = cn('UseVirtualScrollExample');

const items = new Array(10000).fill(null).map((_, i) => i + 1);

export const UseVirtualScrollExampleVirtual = () => {
  const { listRefs, scrollElementRef, slice, spaceTop } = useVirtualScroll({
    length: items.length,
    isActive: true,
  });

  return (
    <Example col={1}>
      <ListBox
        ref={scrollElementRef}
        border
        className={cnUseVirtualScrollExample(null, [cnMixScrollBar()])}
      >
        <div style={{ marginTop: spaceTop }}>
          {items.slice(...slice).map((item, index) => {
            return (
              <ListItem
                key={slice[0] + index}
                ref={listRefs[slice[0] + index]}
                label={`Element ${item}`}
              />
            );
          })}
        </div>
      </ListBox>
    </Example>
  );
};

const SIZE = 500;

export const UseVirtualScrollExampleInfinity = () => {
  const [length, setLength] = useState<number>(SIZE);

  const items = useMemo(
    () => new Array(length).fill(null).map((_, i) => i + 1),
    [length],
  );

  const { listRefs, scrollElementRef, slice, spaceTop } = useVirtualScroll({
    length: items.length,
    isActive: true,
    onScrollToBottom: () => {
      setLength((state) => state + SIZE);
    },
  });

  return (
    <Example col={1}>
      <ListBox
        ref={scrollElementRef}
        border
        className={cnUseVirtualScrollExample()}
      >
        <div style={{ marginTop: spaceTop }}>
          {items.slice(...slice).map((item, index) => {
            return (
              <ListItem
                key={slice[0] + index}
                ref={listRefs[slice[0] + index]}
                label={`Element ${item}`}
              />
            );
          })}
        </div>
      </ListBox>
    </Example>
  );
};
