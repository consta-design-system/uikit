import React from 'react';
import bem from '../../../../utils/bem';

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
  state?: string;
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
  state,
  className,
  ...restProps
}) => {
  const isLoggedIn = isLogged;
  const hasInfo = personInfo;

  return isLoggedIn ? (
    <button
      className={b(
        { state, minified: isMinified },
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
        <img className={b('photo', {})} src={linkToPhoto} alt={altForPhoto} />
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
        {/* TODO заменить на icon в будущем */}
        <svg
          className={b('arrow', {}, 'icon icon_size_xs')}
          fill="currentColor"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 9.593L3.703 5.296 2.289 6.71 8 12.421l5.711-5.71-1.414-1.415L8 9.593z"
          />
        </svg>
      </div>
    </button>
  ) : (
    <Button type="button" onClick={onClick} wpSize="s" view="primary">
      Войти
    </Button>
  );
};

export default Login;
