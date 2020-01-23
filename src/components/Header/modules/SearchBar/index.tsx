import React from 'react';
import bem from '../../../../utils/bem';

import './styles.css';

import Input from '../../../Input/index';
import Button from '../../../Button/index';

const b = bem('search-bar');

type Props = {
  placeholder: string;
  label?: string;
  className?: string;
};

const SearchBar: React.FC<Props> = ({ placeholder, label, className, ...restProps }) => {
  return (
    <form {...restProps} className={b({}, className || '')}>
      <label className={b('label', {}, className || '')} htmlFor="main-search">
        {label}
      </label>
      <Input
        name="main-search"
        placeholder={placeholder}
        form="default"
        wpSize="m"
        view="default"
        className={b('input', {})}
      />
      <Button
        type="submit"
        form="default"
        wpSize="s"
        view="clear"
        className={b('button', {}, 'button_icon-only')}
      >
        <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.618 11.032a5.5 5.5 0 111.414-1.414l3.97 3.969L13.586 15l-3.97-3.97zM10 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
          />
        </svg>
      </Button>
    </form>
  );
};

export { SearchBar };
