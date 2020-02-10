import React from 'react';
import bem from '../../utils/bem';
import './styles.css';
import IconArrowDown from '../Icon/icons/ArrowDown';

const b = bem('user');

type CommonProps = {
  view: 'secondary' | 'clear';
  size: 's' | 'm';
  status: 'default' | 'available' | 'away' | 'off';
  avatar?: string;
  name?: string;
  info?: string;
  profileLink?: string;
  onlyAvatar?: boolean;
  className?: string;
};

const User: React.FC<CommonProps> = props => {
  const { onlyAvatar, view, size, status, name, info, profileLink, avatar, className } = props;
  const _className = className + ` pt-icon-plus pt-icon-plus_vertical-align_center`;
  const userNameStyles = {
    m: `text text_size_m text_view_primary text_line-height_xs`,
    s: `text text_size_s text_view_primary text_line-height_xs`,
  };
  const userInfoStyles = {
    m: `text text_size_xs text_view_secondary text_line-height_2xs`,
    s: `text text_size_2xs text_view_secondary text_line-height_2xs`,
  };

  if (onlyAvatar)
    return (
      <a
        className={b({ size: size, view: view, 'only-avatar': onlyAvatar }, _className)}
        href={profileLink}
      >
        <img
          className={b(
            'avatar',
            { size: size, status: status },
            `pt-icon-plus__icon pt-icon-plus__icon_indent-r_2xs`,
          )}
          src={avatar}
          alt={``}
        />
        <IconArrowDown size={size} view={`secondary`} />
      </a>
    );

  return (
    <a className={b({ size: size, view: view }, _className)} href={profileLink}>
      <img
        className={b(
          'avatar',
          { size: size, status: status },
          `pt-icon-plus__icon pt-icon-plus__icon_indent-r_xs`,
        )}
        src={avatar}
        alt={``}
      />
      <div className={`pt-icon-plus__block`}>
        <div className={size == `s` ? userNameStyles.s : userNameStyles.m}>{name}</div>
        <div className={size == `s` ? userInfoStyles.s : userInfoStyles.m}>{info}</div>
      </div>
    </a>
  );
};

export default User;
