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
  const refInner = useRef<HTMLDivElement>(null);
  const refLine = useRef<HTMLDivElement>(null);

  const updateLine = () => {
    const lineElement = refLine.current;
    const innerElement = refInner.current;

    if (lineElement === null) return;
    if (innerElement === null) return;

    const activeItemElement = innerElement.querySelector<HTMLElement>(`[href="#${activeCode}"]`);

    if (activeItemElement === null) return;

    const scaleX = activeItemElement.clientWidth / innerElement.clientWidth;
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
    <div className={b({ view, wpSize })}>
      <div className={b('inner')} ref={refInner}>
        {list.map(({ label, code }) => (
          <a
            key={code}
            draggable={false}
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
    </div>
  );
};

export default Tabs;
