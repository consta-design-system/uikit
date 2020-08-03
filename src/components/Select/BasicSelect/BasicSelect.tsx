import '../styles.css';

import React, { useRef, useState } from 'react';

import { IconSelect } from '../../../icons/IconSelect/IconSelect';
import { Popover } from '../../Popover/Popover';
import { cnSelect } from '../cnSelect';
import { Container } from '../components/Container';
import { Dropdown } from '../components/Dropdown';
import { useSelect } from '../hooks/use-select';
import { scrollIntoView } from '../hooks/utils';
import { PropForm, PropSize, PropView, PropWidth } from '../types';

export type SimpleSelectProps<T> = {
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
  onChange?: (v: string) => void;
  getOptionLabel(arg: T): string;
  getOptionKey(arg: T): string;
  getOptionValue(arg: T): string;
  getOptionValue(arg: T): string | string[];
  onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
};

export function BasicSelect<T>(props: SimpleSelectProps<T>): React.ReactElement {
  const {
    placeholder,
    onBlur,
    onFocus,
    options,
    onChange,
    value,
    getOptionLabel,
    getOptionKey,
    getOptionValue,
    disabled,
    ariaLabel,
    id,
    size,
    ...restProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState<T | null | undefined>(value);

  const handlerChangeValue = (v: T): void => {
    // istanbul ignore else path
    if (typeof onChange === 'function') {
      onChange(getOptionValue(v));
    }
    setValue(v);
  };

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const arrValue = val ? [val] : null;

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

  const handleInputFocus = (e: React.FocusEvent<HTMLElement>): void => {
    // istanbul ignore else path
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
    // istanbul ignore else path
    if (isFocused) {
      setIsFocused(false);

      // istanbul ignore else path
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
    <Container focused={isFocused} disabled={disabled} size={size} {...restProps}>
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
                {placeholder}
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
            // ref={toggleRef}
          >
            <IconSelect size="xs" className={cnSelect('DropdownIndicatorIcon')} />
          </button>
        </span>
      </div>
      {isOpen && (
        <Popover
          anchorRef={toggleRef}
          possibleDirections={['downLeft', 'upLeft', 'downRight', 'upRight']}
        >
          <Dropdown role="listbox" aria-activedescendant={`${id}-${highlightedIndex}`}>
            <div className={cnSelect('List', { size })} ref={optionsRef}>
              {visibleOptions.map((option, index: number) => (
                <div
                  aria-selected={option === value}
                  role="option"
                  key={getOptionKey(option)}
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
          </Dropdown>
        </Popover>
      )}
    </Container>
  );
}
