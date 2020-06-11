import './Header-SearchBar.css';

import React, { FormEventHandler } from 'react';

import { IconSearch } from '../../../icons/IconSearch/IconSearch';
import { TextField, TextFieldPropOnChange, TextFieldPropValue } from '../../TextField/TextField';
import { cnHeader } from '../Header';

export type SearchBarPropValue = TextFieldPropValue;
export type SearchBarPropOnChange = TextFieldPropOnChange;
export type SearchBarPropOnSearch = (arg: SearchBarOnSearchArguments) => void;

export type SearchBarOnSearchArguments = {
  e: React.FormEvent;
  value: SearchBarPropValue;
};

type SearchBarProps = {
  placeholder?: string;
  label?: string;
  className?: string;
  value?: SearchBarPropValue;
  onSearch?: SearchBarPropOnSearch;
  onChange?: SearchBarPropOnChange;
};

export const HeaderSearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  label,
  className,
  value,
  onSearch,
  onChange,
}) => {
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();
    onSearch && onSearch({ e, value: value || null });
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
