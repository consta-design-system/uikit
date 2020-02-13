import React from 'react';
import bem from '../../../utils/bem';

import './styles.css';

const b = bem('tabs');

export type TabItemProps = {
  content: string;
  isActive: boolean;
};

const TabItem: React.FC<TabItemProps> = ({ content, isActive }) => {
  return <div className={b('item', { active: isActive })}>{content}</div>;
};

export default TabItem;
