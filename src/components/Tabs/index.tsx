import React from 'react';
import bem from '../../utils/bem';
import TabsItem from './TabsItem/index';
import './styles.css';

const b = bem('tabs');

export type TabsProps = {
  style: 'border' | 'clear';
  wpSize: 'm' | 's';
  className?: string;
  width?: 'auto' | 'full';
  list?: {
    label: string;
    content: string;
  }[];
};

const Tabs: React.FC<TabsProps> = props => {
  const { style, list, wpSize, width, className } = props;

  function updateLine(item: object) {
    console.log(item, 'item');
    // const line = document.querySelector('.tabs__line');
    // const button = document.querySelector('tabs__button_active');

    // line.style.width = `${button.clientWidth}px`;
    // line.style.transform = `translateX(${getOffsetElement(button).left - getOffsetElement(this.$el).left - this.$refs.header.offsetLeft}px) translateX(${this.$refs.header.scrollLeft}px)`;
  }

  function onClick(item: object, index: number) {
    console.log(item, index);
    updateLine(item);
  }

  const ListLabel = list.map((item, index, isActive) => {
    return (
      <button
        className={b(`button ${isActive ? 'tabs__button_active' : ''}`)}
        onClick={() => onClick(item, index)}
        key={index}
      >
        {item.label}
      </button>
    );
  });

  const Items = list.map((item, index, isActive) => {
    return (
      <TabsItem
        key={index}
        content={item.content}
        className={b(`item ${isActive ? 'tabs__item_active' : ''}`)}
      />
    );
  });

  return (
    <div className={b('')}>
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
