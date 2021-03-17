import './UserSelectItem.css';

import React from 'react';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Avatar } from '../../Avatar/Avatar';

const sizes = ['xs', 's', 'm', 'l'] as const;
type PropSize = typeof sizes[number];

export type UserSelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    item: any;
    subLabel?: string;
    url?: string;
    active: boolean;
    hovered: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnUserItem = cn('UserSelectItem');

export const UserSelectItem: React.FC<UserSelectItemProps> = (props) => {
  const {
    className,
    label,
    subLabel,
    url, active, hovered,
    size,
    indent,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cnUserItem({ active, hovered, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      <div className={cnUserItem('AvatarBlock')}>
        <Avatar url={url} name={label} />
        {active && <IconCheck className={cnUserItem('CheckIcon')} />}
        {active && (
          <div className={cnUserItem('AvatarCheckIcon')}>
            <IconCheck className={cnUserItem('CheckIcon')} />
          </div>
        )}
      </div>
      {!subLabel ? (
        <div className={cnUserItem('AdditionalInfo')}>{label}</div>
      ) : (
        <div className={cnUserItem('AdditionalInfo')}>
        <div className={cnUserItem('SubUserInfo')}>
          <div>{label}</div>
          <div className={cnUserItem('SubUserLabel')}>{subLabel}</div>
        </div>
      )}
    </div>
  );
};
