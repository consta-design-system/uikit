import '../SelectComponents/Select.css';

import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { Popover } from '../Popover/Popover';
import { cnSelect } from '../SelectComponents/cnSelect';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import {
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
  DefaultPropWidth,
  PropForm,
  PropSize,
  PropView,
  PropWidth,
} from '../SelectComponents/types';

import { useSelect } from './hooks/use-select';
import { scrollIntoView } from './hooks/utils';

export interface SimpleSelectProps<T> {
  options: T[];
  id: string;
  value?: T | null;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  form?: PropForm;
  size?: PropSize;
  width?: PropWidth;
  view?: PropView;
  ariaLabel?: string;
  onChange?: (v: T) => void;
  getOptionLabel(arg: T): string;
  onBlur?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLButtonElement>) => void;
}

type Select = <T>(props: SimpleSelectProps<T>) => React.ReactElement | null;

export const BasicSelect: Select = (props) => {
  const {
    placeholder,
    onBlur,
    onFocus,
    options,
    onChange,
    value,
    getOptionLabel,
    disabled,
    ariaLabel,
    id,
    width = DefaultPropWidth,
    form = DefaultPropForm,
    view = DefaultPropView,
    size = DefaultPropSize,
    ...restProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState(value);

  const handlerChangeValue = (v: typeof value): void => {
    if (typeof onChange === 'function' && v) {
      onChange(v);
    }
    setValue(v);
  };

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const arrValue = typeof val !== 'undefined' && val !== null ? [val] : null;

  const scrollToIndex = (index: number): void => {
    if (!optionsRef.current) {
      return;
    }

    const elements: NodeListOf<HTMLDivElement> = optionsRef.current.querySelectorAll(
      'div[role=option]',
    );

    scrollIntoView(elements[index], optionsRef.current);
  };

  const {
    visibleOptions,
    highlightedIndex,
    getToggleProps,
    getOptionProps,
    isOpen,
    setOpen,
  } = useSelect({
    options,
    value: arrValue,
    onChange: handlerChangeValue,
    optionsRef,
    scrollToIndex,
    disabled,
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLButtonElement>): void => {
    if (!disabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLButtonElement>): void => {
    if (isFocused) {
      setIsFocused(false);

      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    }
  };

  const handleToggleDropdown = (): void => {
    setOpen(!isOpen);
    setIsFocused(true);
  };

  const toggleRef = useRef(null);

  return (
    <SelectContainer
      focused={isFocused}
      disabled={disabled}
      size={size}
      {...restProps}
      view={view}
      form={form}
      width={width}
    >
      <div className={cnSelect('Control')} aria-expanded={isOpen} aria-haspopup="listbox" id={id}>
        <div className={cnSelect('ControlInner')}>
          <button
            {...getToggleProps()}
            type="button"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={cnSelect('ControlValueContainer')}
            aria-label={ariaLabel}
            ref={toggleRef}
          >
            {arrValue ? (
              <span className={cnSelect('ControlValue')} title={getOptionLabel(arrValue[0])}>
                {getOptionLabel(arrValue[0])}
              </span>
            ) : (
              <span className={cnSelect('ControlPlaceholder')} title="placeholder">
                {placeholder || ''}
              </span>
            )}
          </button>
        </div>
        <span className={cnSelect('Indicators')}>
          <button
            type="button"
            className={cnSelect('IndicatorsDropdown')}
            tabIndex={-1}
            onClick={handleToggleDropdown}
          >
            <IconSelect size="xs" className={cnSelect('DropdownIndicatorIcon')} />
          </button>
        </span>
      </div>
      {isOpen && (
        <Popover
          anchorRef={toggleRef}
          possibleDirections={['downLeft', 'upLeft', 'downRight', 'upRight']}
          offset={1}
        >
          <SelectDropdown role="listbox" aria-activedescendant={`${id}-${highlightedIndex}`}>
            <div className={cnSelect('List', { size })} ref={optionsRef}>
              {visibleOptions.map((option, index: number) => (
                <div
                  aria-selected={option === value}
                  role="option"
                  key={getOptionLabel(option)}
                  id={`${id}-${index}`}
                  {...getOptionProps({
                    index,
                    className: cnSelect('ListItem', {
                      active: option === value,
                      hovered: index === highlightedIndex,
                    }),
                  })}
                >
                  {getOptionLabel(option)}
                </div>
              ))}
            </div>
          </SelectDropdown>
        </Popover>
      )}
    </SelectContainer>
  );
};
