import React, { FocusEventHandler } from 'react';
import bem from '../../utils/bem';
import './styles.css';
import IconArrowDown from '../Icon/icons/ArrowDown';

const b = bem('user');

type CommonProps = {
  type: 'link' | 'button' | 'static';
  view: 'secondary' | 'clear';
  size: 's' | 'm';
  status: undefined | 'available' | 'remote' | 'out';
  avatar?: string;
  name?: string;
  info?: string;
  href?: string;
  onlyAvatar?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  className?: string;
};

const User: React.FC<CommonProps> = props => {
  const {
    type,
    onlyAvatar,
    view,
    size,
    status,
    name,
    info,
    avatar,
    href,
    onClick,
    onBlur,
    className,
  } = props;
  const _className = className + ` pt-icon-plus pt-icon-plus_vertical-align_center`;
  const userNameStyles = {
    m: `text text_size_m text_view_primary text_line-height_xs`,
    s: `text text_size_s text_view_primary text_line-height_xs`,
  };
  const userInfoStyles = {
    m: `text text_size_xs text_view_secondary text_line-height_2xs`,
    s: `text text_size_2xs text_view_secondary text_line-height_2xs`,
  };
  let content;

  if (onlyAvatar)
    content = (
      <React.Fragment>
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
      </React.Fragment>
    );
  else
    content = (
      <React.Fragment>
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
      </React.Fragment>
    );

  if (type == 'link')
    return (
      <a
        className={b({ size: size, view: view, 'only-avatar': onlyAvatar }, _className)}
        href={href}
      >
        {content}
      </a>
    );
  else if (type == 'button')
    return (
      <button
        className={b({ size: size, view: view, 'only-avatar': onlyAvatar }, _className)}
        onClick={onClick}
        onBlur={onBlur}
      >
        {content}
      </button>
    );
  else if (type == 'static' || !type)
    return (
      <div className={b({ size: size, view: view, 'only-avatar': onlyAvatar }, _className)}>
        {content}
      </div>
    );
};

export default User;
