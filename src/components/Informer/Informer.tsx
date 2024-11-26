import './Informer.css';

import { classnames } from '@bem-react/classnames';
import { IconComponent } from '@consta/icons/Icon';
import React from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../Text/Text';
import { useTheme } from '../Theme/Theme';

export const informerPropView = ['filled', 'bordered', 'outline'] as const;
export type InformerPropView = typeof informerPropView[number];
export const informerPropViewDefault: InformerPropView = informerPropView[0];

export const informerPropStatus = [
  'success',
  'system',
  'alert',
  'warning',
  'normal',
] as const;
export type InformerPropStatus = typeof informerPropStatus[number];
export const informerPropStatusDefault: InformerPropStatus =
  informerPropStatus[0];

export const informerPropSize = ['m', 's'] as const;
export type InformerPropSize = typeof informerPropSize[number];
export const informerPropSizeDefault: InformerPropSize = informerPropSize[0];

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
      size = informerPropSizeDefault,
      icon: Icon,
      label,
      title,
      children,
      style,
      ...otherProps
    } = props;
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
          },
          [
            className,
            cnMixSpace({ p: size }),
            cnMixFlex({ flex: 'flex', gap: 's' }),
          ],
        )}
        style={{
          ...style,
          ['--informer-bg-color' as string]: `var(--color-bg-${status})`,
          ['--informer-border-color' as string]:
            status === 'system'
              ? `var(--color-bg-border)`
              : `var(--color-bg-${status})`,
          ['--informer-typo-color' as string]: `var(--color-typo-${status})`,
          ['--informer-bg-opacity' as string]:
            status === 'system' ? '30%' : '10%',
        }}
        ref={ref}
      >
        {Icon && (
          <Icon
            className={cnInformer('Icon', [cnMixSpace({ mT: '3xs' })])}
            size="s"
          />
        )}
        <div className={cnInformer('Content')}>
          {title && (
            <Text
              lineHeight="xs"
              className={cnInformer('Title', [cnMixSpace({ mB: '2xs' })])}
              weight="bold"
              size={size}
              view="primary"
            >
              {title}
            </Text>
          )}
          {label ? (
            <Text
              lineHeight="xs"
              view="primary"
              className={cnInformer('Label')}
              size={size}
            >
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
