import React from 'react';
import bem from '../../utils/bem';

import './styles.css';

import TabsItem from './TabsItem/index';

const b = bem('tabs');

export type TabsProps = {
  style: 'border' | 'clear';
  wpSize: 'm' | 's';
  className?: string;
  list: any[];
  width?: 'auto' | 'full';
};

const Tabs: React.FC<TabsProps> = props => {
  const { style, list, wpSize, width, className } = props;
  let activeIndex = 0;

  function click(item: string, index: number) {
    activeIndex = index;
    console.log(item, index, 'qqq');
  }

  const ListLabel = list.map((item, index) => {
    return (
      <button className={b('button')} onClick={() => click(item, index)} key={index}>
        {item.label}
      </button>
    );
  });

  const Items = list.map((item, index) => {
    return <TabsItem key={index} content={item.content} isActive={index === activeIndex} />;
  });

  return (
    <div className={className || ''}>
      <div className={b('wrapper')}>
        <div
          className={b(
            'header',
            {
              size: wpSize,
              style,
              width,
            },
            className,
          )}
        >
          {ListLabel}
          <div className={b('line')} />
        </div>
        <div className={b('body')}>{Items}</div>
      </div>
    </div>
  );
};

export default Tabs;
