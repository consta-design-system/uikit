import React, { Component } from 'react';

import './styles.css';

export type TabItemProps = {
  activeTab: string | undefined;
  label: string;
  onClick: Function;
  className: string;
  isRef?: any;
};

class Tab extends Component<TabItemProps> {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    let {
      onClick,
      props: { activeTab, label, className, isRef },
    } = this;

    if (activeTab === label) {
      className += ' tabs__button_active';
    }

    return (
      <span className={className} onClick={onClick} data-name={label} ref={isRef}>
        {label}
      </span>
    );
  }
}

export default Tab;
