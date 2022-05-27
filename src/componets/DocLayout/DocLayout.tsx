import React from 'react';
import './DocLayout.css';

import { cn } from '##/utils/bem';

const cnDocLayout = cn('DocLayout');

export const DocLayout: React.FC<{ children?: React.ReactChild; leftSide?: React.ReactChild }> = (
  props,
) => {
  return (
    <div className={cnDocLayout()}>
      <div className={cnDocLayout('LeftSide')}>{props.leftSide}</div>
      <div className={cnDocLayout('Content')}>
        <div className={cnDocLayout('Paper')}>{props.children}</div>
      </div>
    </div>
  );
};
