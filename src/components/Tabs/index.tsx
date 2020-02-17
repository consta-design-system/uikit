import React from 'react';
import bem from '../../utils/bem';
import TabsItem from './TabsItem/index';
import './styles.css';

const b = bem('tabs');

export type TabsProps = {
  view: 'bordered' | 'clear';
  wpSize: 'm' | 's';
  className?: string;
  list: {
    label: string;
    content: JSX.Element;
  }[];
};

const Tabs: React.FC<TabsProps> = props => {
  const { view, list, wpSize, className } = props;

  function updateLine(item: object) {
    console.log(item, 'item');
    // const line = document.querySelector('.tabs__line');
    // const button = document.querySelector('tabs__button_active');

    // line.style.width = `${button.clientWidth}px`;
    // line.style.transform = `translateX(${getOffsetElement(button).left - getOffsetElement(this.$el).left - this.$refs.header.offsetLeft}px) translateX(${this.$refs.header.scrollLeft}px)`;
  }

  function onClick(item: object) {
    updateLine(item);
  }

  const ListLabel = list.map((item, isActive) => {
    return (
      <button
        className={b(`button ${!isActive ? 'tabs__button_active' : ''}`)}
        onClick={() => onClick(item)}
        key={Math.random()}
      >
        {item.label}
      </button>
    );
  });

  const Items = list.map((item, isActive) => {
    return (
      <TabsItem
        key={Math.random()}
        content={item.content}
        className={b(`item ${!isActive ? 'tabs__item_active' : ''}`)}
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
              view,
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
