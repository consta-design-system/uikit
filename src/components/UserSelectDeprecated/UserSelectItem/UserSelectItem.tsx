import './UserSelectItem.css';

import { IconCheck } from '@consta/icons/IconCheck';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { Avatar } from '##/components/Avatar/Avatar';
import {
  mapHorisontalSpase,
  mapHorisontalSpaseIncreased,
  mapItemVerticalPadding,
} from '##/components/ListCanary';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

type UserSelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    size: 's' | 'm' | 'l';
    indent: 'normal' | 'increased';
    subLabel?: string;
    avatarUrl?: string;
    disable?: boolean;
    multiple?: boolean;
  },
  HTMLDivElement
>;

export const cnUserSelectItem = cn('UserSelectItem');

export const UserSelectItem: React.FC<UserSelectItemProps> = (props) => {
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
      className={cnUserSelectItem({ active, hovered, size, indent, disable }, [
        cnMixSpace({
          pH:
            indent === 'increased'
              ? mapHorisontalSpaseIncreased[size]
              : mapHorisontalSpase[size],
          pV: mapItemVerticalPadding[size],
        }),
        className,
      ])}
      aria-selected={active}
      role="option"
    >
      <div className={cnUserSelectItem('AvatarContainer')}>
        <Avatar
          className={cnUserSelectItem('Avatar')}
          url={avatarUrl}
          name={label}
        />
        {multiple && (
          <Transition in={active} unmountOnExit timeout={200} nodeRef={iconRef}>
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
      {!subLabel ? (
        <div className={cnUserSelectItem('Info')}>{label}</div>
      ) : (
        <div className={cnUserSelectItem('Info')}>
          <div>{label}</div>
          <div className={cnUserSelectItem('SubLabel', { disable })}>
            {subLabel}
          </div>
        </div>
      )}
    </div>
  );
};
