import React, { useRef, useEffect } from 'react';
import bem from '../../utils/bem';

import './styles.css';

const b = bem('tabs');

type TabsProps = {
  view: 'bordered' | 'clear';
  wpSize: 'm' | 's';
  activeCode: string;
  className?: string;
  list: {
    label: string;
    code: string;
  }[];
  onChange: (code: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ activeCode, list, view, wpSize, onChange }) => {
  const refRoot = useRef<HTMLDivElement>(null);
  const refLine = useRef<HTMLDivElement>(null);

  const updateLine = () => {
    const lineElement = refLine.current;
    const wrapperElement = refRoot.current;

    if (lineElement === null) return;
    if (wrapperElement === null) return;

    const activeItemElement = wrapperElement.querySelector<HTMLElement>(`[href="#${activeCode}"]`);

    if (activeItemElement === null) return;

    const scaleX = activeItemElement.clientWidth / wrapperElement.clientWidth;
    lineElement.style.transform = `translateX(${activeItemElement.offsetLeft -
      lineElement.offsetLeft}px) scaleX(${scaleX})`;
  };

  useEffect(updateLine, [activeCode]);

  const onClick = (e, code) => {
    e.preventDefault();
    onChange(code);
  };

  useEffect(() => {
    setTimeout(updateLine, 150);
  }, []);

  return (
    <div className={b({ view, size: wpSize })} ref={refRoot}>
      {list.map(({ label, code }) => (
        <a
          key={code}
          href={`#${code}`}
          className={b('item', { active: code === activeCode })}
          aria-label={label}
          onClick={e => onClick(e, code)}
        >
          {label}
        </a>
      ))}
      <div className={b('line')} ref={refLine} />
    </div>
  );
};

export default Tabs;
