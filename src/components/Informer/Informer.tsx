import './Informer.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { IconProps } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../Text/Text';
import { useTheme } from '../Theme/Theme';

export const informerPropView = ['filled', 'bordered'] as const;
export type InformerPropView = typeof informerPropView[number];
export const informerPropViewDefault: InformerPropView = informerPropView[0];

export const informerPropStatus = ['success', 'system', 'alert', 'alert', 'warning'] as const;
export type InformerPropStatus = typeof informerPropStatus[number];
export const informerPropStatusDefault: InformerPropStatus = informerPropStatus[0];

type Props = {
  view?: InformerPropView;
  status?: InformerPropStatus;
  icon?: React.FC<IconProps>;
  label?: React.ReactNode;
  title?: string;
};

export type InformerProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnInformer = cn('Informer');

export const Informer = React.forwardRef<HTMLDivElement, InformerProps>((props, ref) => {
  const { view, status, icon, label, title, children, ...otherProps } = props;
  const Icon = icon;
  const withIcon = !!icon;
  const { themeClassNames } = useTheme();
  const className =
    status !== 'system' && view === 'filled'
      ? classnames(props.className, themeClassNames.color.accent)
      : props.className;

  return (
    <div
      {...otherProps}
      className={cnInformer(
        {
          view,
          status,
          withIcon,
        },
        [className],
      )}
      ref={ref}
    >
      {Icon && <Icon className={cnInformer('Icon')} size="s" />}
      {Icon ? (
        <div className={cnInformer('Content')}>
          {title && <Text weight="bold">{title}</Text>}
          {label || children}
        </div>
      ) : (
        <>
          {title && <Text weight="bold">{title}</Text>}
          {label || children}
        </>
      )}
    </div>
  );
});
