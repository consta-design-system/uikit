import './StoryBookExample.css';

import React from 'react';

import { cn } from '../../../utils/bem';

export type StoryBookModsProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const cnStoryBookExample = cn('StoryBookExample');

export function StoryBookExample(props: StoryBookModsProps): React.ReactElement {
  const { children, className, ...otherProps } = props;

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
    <div className={cnStoryBookExample(null, [className])} {...otherProps}>
      {Array.isArray(children)
        ? children.map((item, index) => renderCildren(item, index))
        : renderCildren(children)}
    </div>
  );
}
