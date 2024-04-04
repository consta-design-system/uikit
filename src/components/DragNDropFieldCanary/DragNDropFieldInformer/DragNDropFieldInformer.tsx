import './Informer.css';

import { cn } from '@bem-react/classname';
import { IconPropView } from '@consta/icons/Icon';
import React from 'react';

import { Button } from '##/components/Button';
import { ProgressSpin } from '##/components/ProgressSpin';
import { Text, TextPropView } from '##/components/Text';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import {
  DragNDropFieldInformerProps,
  DragNDropFieldInformerPropStatus,
  dragNDropFieldInformerPropStatus,
} from '../types';

// eslint-disable-next-line no-unused-vars
const textViewMap: { [key in DragNDropFieldInformerPropStatus]: TextPropView } =
  {
    default: 'ghost',
    alert: 'alert',
    warning: 'warning',
  };
const iconStatusMap: {
  // eslint-disable-next-line no-unused-vars
  [key in DragNDropFieldInformerPropStatus]: IconPropView;
} = { default: 'ghost', alert: 'alert', warning: 'warning' };

type InformerProps = PropsWithHTMLAttributes<
  DragNDropFieldInformerProps,
  HTMLDivElement
>;

const cnInformer = cn('Informer');

const propStatusDefault: DragNDropFieldInformerPropStatus =
  dragNDropFieldInformerPropStatus[0];

export const DragNDropFieldInformer = React.forwardRef<
  HTMLDivElement,
  InformerProps
>((props, ref) => {
  const {
    status = propStatusDefault,
    loading = false,
    icon,
    text = '',
    withButton = false,
    buttonIcon,
    buttonLabel,
    onButtonClick,
    className,
    ...otherProps
  } = props;
  const Icon = icon;
  return (
    <div
      {...otherProps}
      className={cnInformer(
        {
          status,
        },
        [className],
      )}
      ref={ref}
    >
      {loading ? (
        <ProgressSpin
          value={typeof loading === 'number' ? loading : undefined}
          animation
          size="m"
          className={cnInformer('Progress')}
        />
      ) : (
        Icon && (
          <Icon
            view={iconStatusMap[status]}
            size="s"
            className={cnInformer('Icon')}
          />
        )
      )}
      {text ? (
        <Text
          align="left"
          lineHeight="xs"
          size="xs"
          className={cnInformer('Text')}
          view={textViewMap[status]}
        >
          {text}
        </Text>
      ) : (
        ' '
      )}
      {withButton && (
        <Button
          onlyIcon
          iconLeft={buttonIcon}
          onClick={onButtonClick}
          view="ghost"
          size="xs"
          label={buttonLabel}
          className={cnInformer('Button')}
        />
      )}
    </div>
  );
});
