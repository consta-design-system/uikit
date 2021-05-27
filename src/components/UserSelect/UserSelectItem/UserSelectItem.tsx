import './UserSelectItem.css';

import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Avatar } from '../../Avatar/Avatar';

type UserSelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    subLabel?: string;
    avatarUrl?: string;
    active: boolean;
    hovered: boolean;
    disable?: boolean;
    multiple?: boolean;
    size: 's' | 'm' | 'l';
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnUserItem = cn('UserSelectItem');
export const cnUserItemCssTransition = cnForCssTransition(cnUserItem);

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
      className={cnUserItem({ active, hovered, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      <div className={cnUserItem('AvatarContainer')}>
        <Avatar className={cnUserItem('Avatar', { disable })} url={avatarUrl} name={label} />
        {multiple && (
          <CSSTransition
            in={active}
            unmountOnExit
            appear
            classNames={cnUserItemCssTransition}
            timeout={200}
          >
            <IconCheck className={cnUserItem('CheckIcon')} />
          </CSSTransition>
        )}
        {!multiple && active && <IconCheck className={cnUserItem('CheckIcon')} />}
      </div>
      {!subLabel ? (
        <div className={cnUserItem('Info')}>{label}</div>
      ) : (
        <div className={cnUserItem('Info')}>
          <div>{label}</div>
          <div className={cnUserItem('SubLabel')}>{subLabel}</div>
        </div>
      )}
    </div>
  );
};
