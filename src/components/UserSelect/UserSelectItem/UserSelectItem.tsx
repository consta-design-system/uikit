import './UserSelectItem.css';

import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Avatar } from '../../Avatar/Avatar';

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

const cnUserSelectItemCheckIconCssTransition = cnForCssTransition(
  cnUserSelectItem,
  'CheckIcon',
);

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
          <Transition
            in={active}
            unmountOnExit
            classNames={cnUserSelectItemCheckIconCssTransition}
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
