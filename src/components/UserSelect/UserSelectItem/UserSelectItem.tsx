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
    active: boolean;
    hovered: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnUserItem = cn('UserSelectItem');

export const UserSelectItem: React.FC<UserSelectItemProps> = (props) => {
  const { className, label, item, active, hovered, size, indent, ...otherProps } = props;
  const { subLabel } = item;
  const { url } = item;

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
      </div>
      {!subLabel ? (
        <div className={cnUserItem('AdditionalInfo')}>{label}</div>
      ) : (
        <div className={cnUserItem('AdditionalInfo')}>
          <div>{label}</div>
          <div className={cnUserItem('SubUserLabel')}>{subLabel}</div>
        </div>
      )}
    </div>
  );
};
