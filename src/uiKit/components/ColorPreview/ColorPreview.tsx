/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ColorPreview.css';

import { IconCopy } from '@consta/icons/IconCopy';
import React from 'react';

import { Text } from '../../../components/Text/Text';
import { cn } from '../../cn';
import * as wp from '../../whitepaper/whitepaper';

const cnColorPreview = cn('ColorPreview');

type Props = {
  color: string;
  value: string;
  clickHandler: () => void;
  opacity?: boolean;
  description?: string;
  rgba?: boolean;
  className?: string;
  children?: never;
};

export const ColorPreview: React.FC<Props> = ({
  color,
  value,
  clickHandler,
  opacity,
  description,
  className,
  rgba,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={cnColorPreview('', [wp.ptIconPlus(), className])}
    >
      <div
        className={cnColorPreview('Circle', [
          wp.ptIconPlus('icon', { 'vertical-align': 'top', 'indent-r': 'm' }),
          wp.decorator({ 'indent-b': 'l' }),
        ])}
        style={
          !rgba
            ? { color: `var(${color})` }
            : { color: `rgba(var(${color}), 0.5)` }
        }
      />
      <div className={wp.ptIconPlus('block')}>
        <Text
          as="h3"
          size="m"
          font="mono"
          view="primary"
          className={cnColorPreview('Name', [
            wp.decorator({ 'indent-b': '2xs', 'indent-l': '2xs' }),
          ])}
        >
          {color}
        </Text>
        <div
          className={cnColorPreview('ColorCode', [
            wp.decorator({ 'indent-t': 'none', 'space-h': '2xs' }),
          ])}
          onClick={() => {
            navigator.clipboard.writeText(value);
            clickHandler();
          }}
        >
          <IconCopy size="xs" />
          <Text size="s" font="mono">
            {value}
          </Text>
        </div>
        <Text
          as="p"
          size="s"
          view="primary"
          className={cnColorPreview('Description', [
            wp.decorator({ 'indent-t': 'none', 'indent-l': '2xs' }),
          ])}
        >
          {description}
        </Text>
      </div>
    </div>
  );
};

export default ColorPreview;
