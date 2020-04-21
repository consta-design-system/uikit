import './Informer.css';
import '../Theme/_color/Theme_color_gpnDefault.css';
import '../Theme/_color/Theme_color_gpnDark.css';

import React, { Fragment } from 'react';
import { classnames } from '@bem-react/classnames';
import { cn } from '../../utils/bem';
import { IIcon } from '../../icons/Icon/Icon';
import { Text } from '../Text/Text';
import { cnTheme } from '../Theme/Theme';

export type InformerPropView = 'filled' | 'bordered';
export type InformerPropStatus = 'system' | 'alert' | 'warning' | 'success';

export type InformerProps = {
  view?: InformerPropView;
  status?: InformerPropStatus;
  icon?: React.FC<IIcon>;
  label?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
};

export type IInformer = InformerProps &
  (Omit<React.HTMLAttributes<HTMLDivElement>, keyof InformerProps>);

const cnInformer = cn('Informer');

export const Informer: React.FC<IInformer> = (props) => {
  const { className, view, status, icon, label, title, children, innerRef, ...otherProps } = props;
  const Icon = icon;
  const withIcon = !!icon;
  const _className =
    status != 'system' && view == 'filled'
      ? classnames(className, cnTheme({ color: 'gpn-dark' }))
      : classnames(className, cnTheme({ color: 'gpn-default' }));

  return (
    <div
      {...otherProps}
      className={cnInformer(
        {
          view,
          status,
          withIcon,
        },
        [_className]
      )}
      ref={innerRef}
    >
      {Icon && <Icon className={cnInformer('Icon')} size="s" />}
      {Icon ? (
        <div className={cnInformer('Content')}>
          {title && <Text weight="bold">{title}</Text>}
          {label || children}
        </div>
      ) : (
        <Fragment>
          {title && <Text weight="bold">{title}</Text>}
          {label || children}
        </Fragment>
      )}
    </div>
  );
};
