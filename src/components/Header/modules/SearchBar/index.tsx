import React from 'react';
import bem from '../../../../utils/bem';

import './styles.css';

import Input from '../../../Input/index';
import Button from '../../../Button/Button';
import IconSearch from '../../../Icon/icons/Search';

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
        <IconSearch size={'s'} />
      </Button>
    </form>
  );
};

export { SearchBar };
