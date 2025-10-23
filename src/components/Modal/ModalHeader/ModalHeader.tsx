import './ModalHeader.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex, CnMixFlexProps } from '##/mixs/MixFlex';
import { cnMixHitSlop } from '##/mixs/MixHitSlop';
import { cn } from '##/utils/bem';
import { isString } from '##/utils/type-guards';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

export const cnModalHeader = cn('ModalHeader');

type ModalHeaderPropDirection = 'vertical' | 'horizontal';

export type ModalHeaderPropStatus =
  | 'success'
  | 'system'
  | 'normal'
  | 'warning'
  | 'alert';

type ModalHeaderProps = PropsWithHTMLAttributes<
  {
    direction?: ModalHeaderPropDirection;
    icon?: IconComponent;
    status?: ModalHeaderPropStatus;
    onClose?: () => void;
    size?: 's' | 'm' | 'l' | 'xs';
  },
  HTMLDivElement
>;

const StatusIcon: React.FC<{
  icon: IconComponent;
  status: ModalHeaderProps['status'];
  size: 'm' | 'l';
}> = ({ icon: Icon, status, size = 'm' }) => {
  return (
    <Text
      view={status}
      className={cnModalHeader('StatusIcon', { status, size }, [
        cnMixFlex({ align: 'center', justify: 'center' }),
      ])}
      style={
        status
          ? {
              ['--modal-status-icon-degree-mixing' as string]:
                status === 'system' ? '30%' : '10%',
              ['--modal-status-icon-bg' as string]: `var(--color-bg-${status})`,
            }
          : undefined
      }
    >
      <Icon size="m" view={status === 'system' ? 'secondary' : undefined} />
    </Text>
  );
};

const rootFlexProps: Record<ModalHeaderPropDirection, CnMixFlexProps> = {
  horizontal: {
    direction: 'row',
    gap: 'xs',
  },
  vertical: {
    direction: 'column',
    align: 'center',
    justify: 'center',
    gap: 's',
  },
};

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (props, ref) => {
    const {
      children,
      className,
      icon: Icon,
      onClose,
      direction = 'horizontal',
      size,
      status,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnModalHeader(
          { gap: direction === 'vertical' && onClose && !Icon },
          [className, cnMixFlex(rootFlexProps[direction])],
        )}
      >
        {Icon && (
          <StatusIcon
            icon={Icon}
            status={status}
            size={direction === 'vertical' ? 'l' : 'm'}
          />
        )}
        {isString(children) ? (
          <Text
            view="primary"
            weight="semibold"
            size={size}
            align={direction === 'vertical' ? 'center' : undefined}
            className={cnModalHeader(
              'Title',
              {
                minHeight:
                  direction === 'horizontal' ||
                  (direction === 'vertical' && !Icon),
                gap: direction === 'vertical' && onClose && !Icon,
              },
              [cnMixFlex({ align: 'center' })],
            )}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        {onClose && (
          <Button
            className={cnModalHeader(
              'ButtonClose',
              { fixed: direction === 'vertical' || (!children && !Icon) },
              [cnMixHitSlop({ mode: 'reverseMargin' })],
            )}
            size="s"
            view="clear"
            iconLeft={IconClose}
            onClick={onClose}
            form="round"
          />
        )}
      </div>
    );
  },
);
