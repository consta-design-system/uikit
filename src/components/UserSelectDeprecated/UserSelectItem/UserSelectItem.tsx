import './UserSelectItem.css';

import { IconCheck } from '@consta/icons/IconCheck';
import React from 'react';

import { Avatar } from '##/components/Avatar/Avatar';
import {
  mapHorizontalSpace,
  mapHorizontalSpaceIncreased,
  mapItemVerticalPadding,
} from '##/components/ListCanary';
import { Transition } from '##/components/Transition';
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

  return (
    <div
      {...otherProps}
      className={cnUserSelectItem({ active, hovered, size, indent, disable }, [
        cnMixSpace({
          pH:
            indent === 'increased'
              ? mapHorizontalSpaceIncreased[size]
              : mapHorizontalSpace[size],
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
          <Transition in={active} unmountOnExit timeout={200}>
            {(animate) => (
              <IconCheck
                className={cnUserSelectItem('CheckIcon', { animate })}
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
