import './Header-SearchBar.css';

import React from 'react';
import { TextField, TextFieldPropValue, TextFieldPropOnChange } from '../../TextField/TextField';
import { IconSearch } from '../../Icon/icons/Search';
import { cnHeader } from '../Header';

export type SearchBarPropValue = TextFieldPropValue;
export type SearchBarPropOnChange = TextFieldPropOnChange;
export type SearchBarPropOnSearch = (arg: SearchBarOnSearchArguments) => void;

export type SearchBarOnSearchArguments = {
  e: React.EventHandler<React.MouseEvent>;
  value: SearchBarPropValue;
};

type ISearchBar = {
  placeholder?: string;
  label?: string;
  className?: string;
  value?: SearchBarPropValue;
  onSearch?: SearchBarPropOnSearch;
  onChange?: SearchBarPropOnChange;
};

export const HeaderSearchBar: React.FC<ISearchBar> = ({
  placeholder,
  label,
  className,
  value,
  onSearch,
  onChange,
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch({ e, value: value ? value : null });
  };

  return (
    <form onSubmit={handleSearch} className={cnHeader('SearchBar', [className])}>
      {label && (
        <label className={cnHeader('SearchBarLabel')} htmlFor={cnHeader('SearchBarInput')}>
          {label}
        </label>
      )}
      <TextField
        className={cnHeader('SearchBarInput')}
        name={cnHeader('SearchBarInput')}
        placeholder={placeholder}
        size="m"
        width="full"
        value={value}
        onChange={onChange}
        leftSide={IconSearch}
      />
    </form>
  );
};
