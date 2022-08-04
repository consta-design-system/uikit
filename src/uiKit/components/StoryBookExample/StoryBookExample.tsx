import './StoryBookExample.css';

import React from 'react';

import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { cn } from '../../cn';

export type StoryBookModsProps = PropsWithHTMLAttributes<{}, HTMLDivElement>;

export const cnStoryBookExample = cn('StoryBookExample');

export const StoryBookExample: React.FC<StoryBookModsProps> = (props) => {
  const { children, className, ...otherProps } = props;
  function renderCildren(children: React.ReactElement, key = 0) {
    if (!children || children === null) {
      return null;
    }
    return React.cloneElement(children, {
      ...children.props,
      className: cnStoryBookExample('Children', [children.props.className]),
      key,
    });
  }

  return (
    <div className={cnStoryBookExample(null, [className])} {...otherProps}>
      {Array.isArray(children)
        ? children.map((item, index) =>
            renderCildren(item as React.ReactElement, index),
          )
        : renderCildren(children as React.ReactElement)}
    </div>
  );
};
