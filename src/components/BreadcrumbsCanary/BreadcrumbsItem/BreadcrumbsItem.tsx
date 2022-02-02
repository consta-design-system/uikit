import './BreadcrumbsItem.css';

import React, { forwardRef } from 'react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { cnMixSpace } from '../../../mixs/MixSpace/MixSpace';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { iconSizeMap } from '../helpers';

type Props = PropsWithHTMLAttributes<
  {
    size: 'm' | 'xs' | 's' | 'l';
    label?: React.ReactNode;
    active?: boolean;
    href?: string;
    icon?: IconComponent;
    onlyIcon?: boolean;
    delimiter?: boolean;
    onClick?: React.MouseEventHandler;
  },
  HTMLLIElement
>;

export const cnBreadcrumbsItem = cn('BreadcrumbsItem');

export const BreadcrumbsItem = forwardRef((props: Props, ref: React.Ref<HTMLLIElement>) => {
  const {
    className,
    onClick,
    href,
    icon: Icon,
    size,
    onlyIcon: onlyIconProp,
    label,
    delimiter,
    active,
    children,
    ...otherProps
  } = props;

  const iconSize = getByMap(iconSizeMap, size);
  const linkProps = href
    ? ({
        as: 'a',
        href,
      } as const)
    : ({
        as: 'span',
      } as const);

  const onlyIcon = Icon && onlyIconProp;

  return (
    <li className={cnBreadcrumbsItem(null, [className])} ref={ref} {...otherProps}>
      {delimiter && (
        <IconArrowRight
          className={cnBreadcrumbsItem('Delimiter', [cnMixSpace({ mH: size })])}
          view="ghost"
          size={iconSize}
        />
      )}
      {children || (
        <Text
          className={cnBreadcrumbsItem('Link', { active })}
          view={active ? 'primary' : 'secondary'}
          onClick={onClick}
          size={size}
          truncate={!onlyIcon}
          {...linkProps}
        >
          {Icon &&
            (onlyIcon ? (
              <Button view="clear" onlyIcon iconLeft={Icon} size={iconSize} />
            ) : (
              <Icon
                className={cnBreadcrumbsItem('Icon', [cnMixSpace({ mR: 'xs' })])}
                size={iconSize}
              />
            ))}
          {!onlyIcon && label}
        </Text>
      )}
    </li>
  );
});
