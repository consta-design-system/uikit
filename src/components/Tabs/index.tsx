import React from 'react';
import bem from '../../utils/bem';
import Tab from './TabsItem/index';

import './styles.css';

const b = bem('tabs');

type TabsProps = {
  view: 'bordered' | 'clear';
  wpSize: 'm' | 's';
  className?: string;
  list: {
    label: string;
    content: JSX.Element;
  }[];
};

type TabProp = {
  activeTab?: string | undefined;
};

class Tabs extends React.Component<TabsProps, TabProp> {
  private lineRef = React.createRef<HTMLDivElement>();
  private buttonRef = React.createRef<HTMLDivElement>();
  private headerRef = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.list[0].label,
    };
  }

  updateLine(tab: string | undefined) {
    const button = document.querySelector<HTMLElement>(`.tabs__button[data-name="${tab}"]`);
    const line = this.lineRef.current;
    const header = this.headerRef.current;

    if (line !== null && button !== null && header !== null) {
      line.style.width = `${button.clientWidth}px`;
      line.style.transform = `translateX(${button.offsetLeft - line.offsetLeft}px)`;
    }
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab });
    this.updateLine(tab);
  };

  render() {
    const {
      onClickTabItem,
      props: { list, view, wpSize },
      state: { activeTab },
    } = this;

    return (
      <div className={b('')}>
        <div className={b('header', { view, wpSize })} ref={this.headerRef}>
          {list.map(child => {
            return (
              <Tab
                activeTab={activeTab}
                key={child.label}
                label={child.label}
                onClick={onClickTabItem}
                className={b('button')}
                isRef={this.buttonRef}
              />
            );
          })}
          <div className={b('line')} ref={this.lineRef} />
        </div>
        <div className={b('body')}>
          {list.map(child => {
            if (child.label !== activeTab) return undefined;
            return <div key={child.label}>{child.content}</div>;
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateLine(this.state.activeTab);
    }, 500);
  }
}

export default Tabs;
