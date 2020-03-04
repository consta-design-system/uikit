import React, { useRef, useEffect, useState } from 'react';
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
  const refRoot = useRef<HTMLDivElement>(null);

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

  const [drag, setIsDrag] = useState({
    start: 0,
    current: 0,
    isActive: false,
  });

  const onMoveStart = e => {
    if (drag.isActive) return;
    const rootElement = refRoot.current;

    if (rootElement === null) return;
    setIsDrag({
      ...drag,
      start: e.pageX,
      current: rootElement.scrollLeft,
      isActive: true,
    });
  };

  const onMoveEnd = () => {
    setIsDrag({
      ...drag,
      isActive: false,
    });
  };

  const onMove = e => {
    if (!drag.isActive) return;
    const rootElement = refRoot.current;
    if (rootElement === null) return;
    rootElement.scrollLeft = drag.current - (e.pageX - drag.start);
  };

  const onClick = (e, code) => {
    e.preventDefault();
    onChange(code);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onMoveEnd);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onMoveEnd);
    };
  }, [onMove, onMoveEnd]);

  useEffect(() => {
    setTimeout(updateLine, 150);
  }, []);

  return (
    <div className={b({ view, wpSize })} ref={refRoot}>
      <div className={b('inner')} ref={refInner} onMouseDown={onMoveStart}>
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
