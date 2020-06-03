import './Informer.css';
import '../Theme/_color/Theme_color_gpnDefault.css';
import '../Theme/_color/Theme_color_gpnDark.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { IIcon } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { Text } from '../Text/Text';
import { useTheme } from '../Theme/Theme';

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
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof InformerProps>;

const cnInformer = cn('Informer');

export const Informer: React.FC<IInformer> = (props) => {
  const { view, status, icon, label, title, children, innerRef, ...otherProps } = props;
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
      ref={innerRef}
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
};
