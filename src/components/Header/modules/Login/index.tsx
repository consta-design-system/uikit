import React from 'react';
import bem from '../../../../utils/bem';

import IconArrowDown from '../../../Icon/icons/ArrowDown';
import Button from '../../../Button';

import './styles.css';

const b = bem('login');

type Props = {
  isLogged: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  personName: string;
  personInfo?: string;
  personStatus?: 'active' | 'remote' | 'out';
  linkToPhoto?: string;
  altForPhoto?: string;
  isMinified?: boolean;
  className?: string;
};

const Login: React.FC<Props> = ({
  isLogged,
  onClick,
  personName,
  personInfo,
  personStatus,
  linkToPhoto,
  altForPhoto,
  isMinified,
  className,
  ...restProps
}) => {
  const isLoggedIn = isLogged;
  const hasInfo = personInfo;

  return isLoggedIn ? (
    <button
      className={b(
        { minified: isMinified },
        'pt-icon-plus pt-icon-plus_vertical-align_center',
        className,
      )}
      onClick={onClick}
      {...restProps}
    >
      {/* TODO заменить на компонент avatar в будущем */}
      <div
        className={b(
          'avatar',
          { status: personStatus },
          'pt-icon-plus__icon pt-icon-plus__icon_indent-r_s',
        )}
      >
        <img className={b('photo')} src={linkToPhoto} alt={altForPhoto} />
      </div>

      <div className={b('person', {}, 'pt-icon-plus__block')}>
        <div className={b('info')}>
          <span className={b('name', {}, 'text text_size_m text_view_primary text_line-height_xs')}>
            {personName}
          </span>
          {hasInfo ? (
            <span
              className={b('info', {}, 'text text_size_xs text_view_secondary text_line-height_xs')}
            >
              {personInfo}
            </span>
          ) : (
            ''
          )}
        </div>
        <IconArrowDown size={'s'} className={b('icon')} />
      </div>
    </button>
  ) : (
    <Button type="button" onClick={onClick} wpSize="s" view="primary">
      Войти
    </Button>
  );
};

export { Login };
