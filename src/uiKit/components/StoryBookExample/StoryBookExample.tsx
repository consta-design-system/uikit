import './StoryBookExample.css';
import { cn } from '../../../utils/bem';

import React from 'react';
export type StoryBookModsProps = {
  children: React.ReactNode;
};

export const cnStoryBookExample = cn('StoryBookExample');

export function StoryBookExample(props: StoryBookModsProps): React.ReactElement {
  const { children } = props;

  function renderCildren(children, key = 0) {
    if (!children || children === null) {
      return null;
    }
    return React.cloneElement(children, {
      ...children.props,
      className: cnStoryBookExample('Children'),
      key,
    });
  }

  return (
    <div className={cnStoryBookExample()}>
      {Array.isArray(children)
        ? children.map((item, index) => renderCildren(item, index))
        : renderCildren(children)}
    </div>
  );
}
