import './UserSelectItem.css';

import { IconPropSize } from '@consta/icons/Icon';
import { IconCheck } from '@consta/icons/IconCheck';
import React, { forwardRef, useRef } from 'react';
import { Transition } from 'react-transition-group';

import { Avatar } from '##/components/Avatar';
import {
  mapHorizontalSpace,
  mapHorizontalSpaceIncreased,
  mapItemVerticalPadding,
} from '##/components/ListCanary';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { Text } from '../../Text/Text';
import { UserSelectPropSize } from '../helpers';

type UserSelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    size: UserSelectPropSize;
    indent: 'normal' | 'increased';
    subLabel?: string;
    avatarUrl?: string;
    disable?: boolean;
    multiple?: boolean;
  },
  HTMLDivElement
>;

export const cnUserSelectItem = cn('UserSelectItem');

const avatarSizeMap: Record<UserSelectPropSize, IconPropSize> = {
  s: 's',
  m: 'm',
  l: 'm',
};

const labelOffsetMap: Record<UserSelectPropSize, Space> = {
  s: '3xs',
  m: '2xs',
  l: '2xs',
};

export const UserSelectItem = forwardRef<HTMLDivElement, UserSelectItemProps>(
  (props, ref) => {
    const {
      className,
      label,
      subLabel,
      avatarUrl,
      active,
      hovered,
      size,
      indent,
      disable,
      multiple,
      ...otherProps
    } = props;

    const iconRef = useRef<HTMLSpanElement>(null);

    return (
      <div
        {...otherProps}
        className={cnUserSelectItem(
          { active, hovered, size, indent, disable },
          [
            cnMixSpace({
              pH:
                indent === 'increased'
                  ? mapHorizontalSpaceIncreased[size]
                  : mapHorizontalSpace[size],
              pV: mapItemVerticalPadding[size],
            }),
            className,
          ],
        )}
        aria-selected={active}
        ref={ref}
      >
        <div className={cnUserSelectItem('AvatarContainer')}>
          <Avatar
            className={cnUserSelectItem('Avatar')}
            size={avatarSizeMap[size]}
            url={avatarUrl}
            name={label}
            monochrome={disable}
          />
          {multiple && (
            <Transition
              in={active}
              unmountOnExit
              timeout={200}
              nodeRef={iconRef}
            >
              {(animate) => (
                <IconCheck
                  className={cnUserSelectItem('CheckIcon', { animate })}
                  ref={iconRef}
                />
              )}
            </Transition>
          )}
          {!multiple && active && (
            <IconCheck className={cnUserSelectItem('CheckIcon')} />
          )}
        </div>
        <div className={cnUserSelectItem('Info')}>
          {label && (
            <Text
              className={cnUserSelectItem('Label', [
                cnMixSpace({ mB: labelOffsetMap[size] }),
              ])}
              view="brand"
            >
              {label}
            </Text>
          )}
          {subLabel && (
            <Text
              className={cnUserSelectItem('SubLabel', { disable })}
              view="brand"
            >
              {subLabel}
            </Text>
          )}
        </div>
      </div>
    );
  },
);
