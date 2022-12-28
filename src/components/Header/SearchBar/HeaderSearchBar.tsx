import './HeaderSearchBar.css';

import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import React, { FormEventHandler } from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import {
  TextField,
  TextFieldPropOnChange,
  TextFieldPropValue,
} from '../../TextField/TextField';

export const cnHeaderSearchBar = cn('HeaderSearchBar');

export type SearchBarPropValue = TextFieldPropValue;
export type SearchBarPropOnChange = TextFieldPropOnChange;
export type SearchBarPropOnSearch = (arg: SearchBarOnSearchArguments) => void;

export type SearchBarOnSearchArguments = {
  e: React.FormEvent;
  value: SearchBarPropValue;
};

type SearchBarProps = PropsWithJsxAttributes<
  {
    placeholder?: string;
    label?: string;
    value?: SearchBarPropValue;
    onSearch?: SearchBarPropOnSearch;
    onChange?: SearchBarPropOnChange;
    children?: never;
  },
  'form'
>;

export const HeaderSearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  label,
  className,
  value,
  onSearch,
  onChange,
  ...otherProps
}) => {
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();
    onSearch && onSearch({ e, value: value || null });
  };

  return (
    <form
      {...otherProps}
      onSubmit={handleSearch}
      className={cnHeaderSearchBar(null, [className])}
    >
      {label && (
        <label
          className={cnHeaderSearchBar('Label')}
          htmlFor={cnHeaderSearchBar('Label')}
        >
          {label}
        </label>
      )}
      <TextField
        className={cnHeaderSearchBar('Input')}
        name={cnHeaderSearchBar('Input')}
        placeholder={placeholder}
        size="m"
        width="full"
        value={value}
        onChange={onChange}
        leftSide={IconSearchStroked}
      />
    </form>
  );
};
