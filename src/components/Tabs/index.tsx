import React, { useRef, useEffect, useState } from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('tabs');

type Item = any;

type TabsProps = {
  view: 'bordered' | 'clear';
  wpSize: 'm' | 's';
  value: Item;
  className?: string;
  items: Item[];
  onChange: ({ e: Event, value: string }) => void;
  getKey?: (item: Item) => string | number;
  getLabel?: (item: Item) => string;
};

const defaultGetKey = (item: Item) => item.id;
const defaultGetLabel = (item: Item) => item.label;

const Tabs: React.FC<TabsProps> = ({
  className,
  value,
  items,
  view,
  wpSize,
  onChange,
  getKey = defaultGetKey,
  getLabel = defaultGetLabel,
}) => {
  const refRoot = useRef<HTMLDivElement>(null);
  const refLine = useRef<HTMLDivElement>(null);
  const refItems = useRef<(HTMLButtonElement | null)[]>([]);

  const [lineStyles, setLineStyles] = useState({ x: 0, scale: 0 });

  const updateLine = () => {
    const lineElement = refLine.current;
    const wrapperElement = refRoot.current;
    const itemElements = refItems.current;

    if (lineElement === null) return;
    if (wrapperElement === null) return;
    if (itemElements.length === 0) return;

    let activeIndex = 0;
    for (; activeIndex < items.length; activeIndex += 1) {
      if (getKey(items[activeIndex]) === getKey(value)) break;
    }

    const activeItemElement = itemElements[activeIndex];
    if (activeItemElement === null) return;

    setLineStyles({
      x: activeItemElement.offsetLeft - lineElement.offsetLeft,
      scale: activeItemElement.clientWidth / wrapperElement.clientWidth,
    });
  };

  useEffect(updateLine, [value, items]);

  const onClick = ({ e, value }) => {
    e.preventDefault();
    onChange({ e, value });
  };

  useEffect(() => {
    setTimeout(updateLine, 150);
  }, []);

  return (
    <div className={b({ view, size: wpSize }, className)} ref={refRoot}>
      {items.map((item, index) => (
        <button
          key={getKey(item)}
          value={item}
          className={b('item', { active: getKey(item) === getKey(value) })}
          aria-label={getLabel(item)}
          onClick={e => onClick({ e, value: item })}
          ref={el => (refItems.current[index] = el)}
        >
          {getLabel(item)}
        </button>
      ))}
      <div
        className={b('line')}
        ref={refLine}
        style={{ transform: `translateX(${lineStyles.x}px) scaleX(${lineStyles.scale})` }}
      />
    </div>
  );
};

export default Tabs;
