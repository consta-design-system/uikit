import React, { useRef, useEffect, useState } from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('tabs');

type TabsProps = {
  view: 'bordered' | 'clear';
  wpSize: 'm' | 's';
  value: string;
  className?: string;
  items: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ className, value, items, view, wpSize, onChange }) => {
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
      if (items[activeIndex].value === value) break;
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
    onChange(value);
  };

  useEffect(() => {
    setTimeout(updateLine, 150);
  }, []);

  return (
    <div className={b({ view, size: wpSize }, className)} ref={refRoot}>
      {items.map((item, index) => (
        <button
          key={item.value}
          value={item.value}
          className={b('item', { active: item.value === value })}
          aria-label={item.label}
          onClick={e => onClick({ e, value: item.value })}
          ref={el => (refItems.current[index] = el)}
        >
          {item.label}
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
