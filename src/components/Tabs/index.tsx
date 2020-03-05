import React, { useRef, useEffect } from 'react';
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

  const updateLine = () => {
    const lineElement = refLine.current;
    const wrapperElement = refRoot.current;

    if (lineElement === null) return;
    if (wrapperElement === null) return;

    const activeItemElement = wrapperElement.querySelector<HTMLElement>(`[value="${value}"]`);
    if (activeItemElement === null) return;

    const scaleX = activeItemElement.clientWidth / wrapperElement.clientWidth;
    lineElement.style.transform = `translateX(${activeItemElement.offsetLeft -
      lineElement.offsetLeft}px) scaleX(${scaleX})`;
  };

  useEffect(updateLine, [value, items]);

  const onClick = (e, itemValue) => {
    e.preventDefault();
    onChange(itemValue);
  };

  useEffect(() => {
    setTimeout(updateLine, 150);
  }, []);

  return (
    <div className={b({ view, size: wpSize }, className)} ref={refRoot}>
      {items.map(item => (
        <button
          key={item.value}
          value={item.value}
          className={b('item', { active: item.value === value })}
          aria-label={item.label}
          onClick={e => onClick(e, item.value)}
        >
          {item.label}
        </button>
      ))}
      <div className={b('line')} ref={refLine} />
    </div>
  );
};

export default Tabs;
