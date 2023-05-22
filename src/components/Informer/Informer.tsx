import './Informer.css';

import { classnames } from '@bem-react/classnames';
import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../Text/Text';
import { useTheme } from '../Theme/Theme';

export const informerPropView = ['filled', 'bordered'] as const;
export type InformerPropView = typeof informerPropView[number];
export const informerPropViewDefault: InformerPropView = informerPropView[0];

export const informerPropStatus = [
  'success',
  'system',
  'alert',
  'warning',
] as const;
export type InformerPropStatus = typeof informerPropStatus[number];
export const informerPropStatusDefault: InformerPropStatus =
  informerPropStatus[0];

export const informerPropSize = ['m', 's'] as const;
export type InformerPropSize = typeof informerPropSize[number];
export const informerPropSiseDefault: InformerPropSize = informerPropSize[0];

type Props = {
  view?: InformerPropView;
  status?: InformerPropStatus;
  icon?: IconComponent;
  label?: React.ReactNode;
  title?: string;
  size?: InformerPropSize;
};

export type InformerProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnInformer = cn('Informer');

export const Informer = React.forwardRef<HTMLDivElement, InformerProps>(
  (props, ref) => {
    const {
      view = informerPropViewDefault,
      status = informerPropStatusDefault,
      size = informerPropSiseDefault,
      icon,
      label,
      title,
      children,
      ...otherProps
    } = props;
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
          [className, cnMixSpace({ p: size })],
        )}
        ref={ref}
      >
        {Icon && <Icon className={cnInformer('Icon')} size="s" />}
        <div className={cnInformer('Content')}>
          {title && (
            <Text
              lineHeight="xs"
              className={cnInformer('Title', [cnMixSpace({ mB: '2xs' })])}
              weight="bold"
              size={size}
            >
              {title}
            </Text>
          )}
          {label ? (
            <Text lineHeight="xs" className={cnInformer('Label')} size={size}>
              {label}
            </Text>
          ) : (
            children
          )}
        </div>
      </div>
    );
  },
);
