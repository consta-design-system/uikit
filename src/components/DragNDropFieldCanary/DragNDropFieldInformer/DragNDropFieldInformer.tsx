import './DragNDropFieldInformer.css';

import { IconPropView } from '@consta/icons/Icon';
import React from 'react';

import { Button } from '##/components/Button';
import { ProgressSpin } from '##/components/ProgressSpin';
import { Text, TextPropView } from '##/components/Text';
import { cnCanary } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import {
  DragNDropFieldInformerProps,
  DragNDropFieldInformerPropStatus,
  dragNDropFieldInformerPropStatus,
} from '../types';

const textViewMap: Record<DragNDropFieldInformerPropStatus, TextPropView> = {
  default: 'ghost',
  alert: 'alert',
  warning: 'warning',
};

const iconStatusMap: Record<DragNDropFieldInformerPropStatus, IconPropView> = {
  default: 'ghost',
  alert: 'alert',
  warning: 'warning',
};

type InformerProps = PropsWithHTMLAttributes<
  DragNDropFieldInformerProps,
  HTMLDivElement
>;

const cnDragNDropFieldInformer = cnCanary('DragNDropFieldInformer');

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
      className={cnDragNDropFieldInformer(
        {
          status,
        },
        [className],
      )}
      ref={ref}
    >
      {loading && (
        <ProgressSpin
          value={typeof loading === 'number' ? loading : undefined}
          animation
          size="m"
          className={cnDragNDropFieldInformer('Progress')}
        />
      )}
      {!loading && Icon && (
        <Icon
          view={iconStatusMap[status]}
          size="s"
          className={cnDragNDropFieldInformer('Icon')}
        />
      )}
      {text ? (
        <Text
          align="left"
          lineHeight="xs"
          size="xs"
          className={cnDragNDropFieldInformer('Text')}
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
          title={buttonLabel}
          className={cnDragNDropFieldInformer('Button')}
        />
      )}
    </div>
  );
});
