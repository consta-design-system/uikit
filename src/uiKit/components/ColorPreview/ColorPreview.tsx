import './ColorPreview.css';

import React from 'react';

import { Text } from '../../../components/Text/Text';
import { cn } from '../../cn';
import * as wp from '../../whitepaper/whitepaper';

const cnColorPreview = cn('ColorPreview');

type Props = {
  color: string;
  opacity?: boolean;
  description?: string;
  rgba?: boolean;
  className?: string;
  children?: never;
};

export const ColorPreview: React.FC<Props> = ({
  color,
  opacity,
  description,
  className,
  rgba,
  ...restProps
}) => {
  return (
    <div {...restProps} className={cnColorPreview('', [wp.ptIconPlus(), className])}>
      <div
        className={cnColorPreview('Circle', [
          wp.ptIconPlus('icon', { 'vertical-align': 'top', 'indent-r': 'm' }),
          wp.decorator({ 'indent-b': 'l' }),
        ])}
        style={!rgba ? { color: `var(${color})` } : { color: `rgba(var(${color}), 0.5)` }}
      />
      <div className={wp.ptIconPlus('block')}>
        <Text
          as="h3"
          size="m"
          font="mono"
          view="primary"
          className={cnColorPreview('Name', [wp.decorator({ 'indent-b': 'xs' })])}
        >
          {color}
        </Text>
        <Text
          as="p"
          size="s"
          view="primary"
          className={cnColorPreview('Description', [wp.decorator({ 'indent-t': 'none' })])}
        >
          {description}
        </Text>
      </div>
    </div>
  );
};

export default ColorPreview;
