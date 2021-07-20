import './UserSelectItem.css';

import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { IconCheck } from '../../../icons/IconCheck/IconCheck';
import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Avatar } from '../../Avatar/Avatar';

const sizes = ['xs', 's', 'm', 'l'] as const;
type PropSize = typeof sizes[number];

type UserSelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    subLabel?: string;
    url?: string;
    active: boolean;
    hovered: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const cnUserItem = cn('UserSelectItemDeprecated');
export const cnUserItemCssTransition = cnForCssTransition(cnUserItem);

export const UserSelectItem: React.FC<UserSelectItemProps> = (props) => {
  const { className, label, subLabel, url, active, hovered, size, indent, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cnUserItem({ active, hovered, size, indent }, [className])}
      aria-selected={active}
      role="option"
    >
      <div className={cnUserItem('AvatarBlock')}>
        <Avatar url={url} name={label} />
        <CSSTransition
          in={active}
          unmountOnExit
          appear
          classNames={cnUserItemCssTransition}
          timeout={200}
        >
          <IconCheck className={cnUserItem('CheckIcon')} />
        </CSSTransition>
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
