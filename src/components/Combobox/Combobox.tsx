import '../SelectComponents/Select.css';

import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { Popover } from '../Popover/Popover';
import { cnSelect } from '../SelectComponents/cnSelect';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import { PropForm, PropSize, PropView, PropWidth } from '../SelectComponents/types';

export interface ComboboxSelectProps<T> {
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
  onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
}

type ComboboxType = <T>(props: ComboboxSelectProps<T>) => React.ReactElement | null;

export const Combobox: ComboboxType = (props) => {
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
    size = 'm',
    ...restProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState(value);
  const [inputData, setInputData] = useState<{ value: string | undefined }>({
    value: '',
  });
  const toggleRef = useRef<HTMLInputElement>(null);

  const handlerChangeValue = (v: typeof value): void => {
    if (typeof onChange === 'function' && v) {
      onChange(v);
    }
    setValue(v);
    setInputData({ value: toggleRef.current?.value });
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
    getOptionLabel,
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLElement>): void => {
    if (!disabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLElement>): void => {
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

  const handleClear = (e): void => {
    setInputData({ value: '' });
    setValue(null);
    getToggleProps().onChange(e);
    toggleRef.current?.focus();
  };

  const handleInputChange = (): void => {
    const inputValue = toggleRef.current?.value ?? '';
    setInputData({ value: inputValue });
  };

  const handleControlClick = (): void => {
    toggleRef.current?.focus();
  };

  const showPlaceholder =
    (!arrValue?.length && inputData.value === '') || (arrValue === null && inputData.value === '');

  const showInput = arrValue !== null && arrValue.length > 0;

  return (
    <SelectContainer focused={isFocused} disabled={disabled} size={size} {...restProps}>
      <div
        className={cnSelect('Control', { hasInput: true })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id={id}
      >
        <div className={cnSelect('ControlInner')} onClick={handleControlClick}>
          <div className={cnSelect('ControlValueContainer')}>
            {arrValue && (
              <span className={cnSelect('ControlValue')}>{getOptionLabel(arrValue[0])}</span>
            )}
            {showPlaceholder && <span className={cnSelect('Placeholder')}>{placeholder}</span>}
            <input
              {...getToggleProps({ onChange: handleInputChange })}
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              aria-label={ariaLabel}
              ref={toggleRef}
              value={inputData.value}
              className={cnSelect('Input', { size, hide: showInput })}
            />
          </div>
        </div>
        <span className={cnSelect('Indicators')}>
          {arrValue && (
            <button type="button" onClick={handleClear} className={cnSelect('ClearIndicator')}>
              <IconClose size="xs" className={cnSelect('ClearIndicatorIcon')} />
            </button>
          )}
          <span className={cnSelect('Delimiter')} />
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
              {visibleOptions.map((option, index: number) => {
                return (
                  <div
                    aria-selected={arrValue?.some(
                      (val) => JSON.stringify(val) === JSON.stringify(option),
                    )}
                    role="option"
                    key={getOptionLabel(option)}
                    id={`${id}-${index}`}
                    {...getOptionProps({
                      index,
                      className: cnSelect('ListItem', {
                        active: arrValue?.some((val) => {
                          return JSON.stringify(val) === JSON.stringify(option);
                        }),
                        hovered: index === highlightedIndex,
                      }),
                    })}
                  >
                    {getOptionLabel(option)}
                  </div>
                );
              })}
            </div>
          </SelectDropdown>
        </Popover>
      )}
    </SelectContainer>
  );
};
