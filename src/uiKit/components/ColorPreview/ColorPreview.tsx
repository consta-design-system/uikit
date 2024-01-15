/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ColorPreview.css';

import { classnames } from '@bem-react/classnames';
import { IconCopy } from '@consta/icons/IconCopy';
import React from 'react';

import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';

import { cn } from '../../cn';

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
  value: valueProp,
  clickHandler,
  opacity,
  description,
  className,
  rgba,
  ...restProps
}) => {
  const value = valueProp?.replace(/\s/g, '') || '';

  return (
    <div
      {...restProps}
      className={classnames(cnMixFlex({ gap: 'm' }), className)}
    >
      <div
        className={cnColorPreview('Circle')}
        style={
          !rgba
            ? { color: `var(${color})` }
            : { color: `rgba(var(${color}), 0.5)` }
        }
      />
      <div>
        <Text
          as="h3"
          size="m"
          font="mono"
          view="primary"
          lineHeight="m"
          className={cnColorPreview('Name', [cnMixSpace({ mB: '2xs' })])}
        >
          {color}
        </Text>
        <div
          className={cnColorPreview('ColorCode', [
            cnMixFlex({ gap: '2xs', align: 'center' }),
            cnMixSpace({ mB: '2xs' }),
          ])}
          onClick={() => {
            navigator.clipboard.writeText(value);
            clickHandler();
          }}
        >
          <IconCopy size="xs" />
          <Text size="s" font="mono" view="primary" lineHeight="m">
            {value}
          </Text>
        </div>
        <Text
          as="p"
          size="s"
          view="primary"
          lineHeight="m"
          className={cnColorPreview('Description')}
        >
          {description}
        </Text>
      </div>
    </div>
  );
};

export default ColorPreview;
