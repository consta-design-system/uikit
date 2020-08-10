import '../SelectComponents/styles.css';

import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { Popover } from '../Popover/Popover';
import { cnSelect } from '../SelectComponents/cnSelect';
import { Container } from '../SelectComponents/Container/Container';
import { Dropdown } from '../SelectComponents/Dropdown/Dropdown';
import { PropForm, PropSize, PropView, PropWidth } from '../SelectComponents/types';
import { Tag } from '../Tag/Tag';

export type SimpleSelectProps<T> = {
  options: T[];
  id: string;
  value?: T[] | null;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  form?: PropForm;
  size?: PropSize;
  width?: PropWidth;
  view?: PropView;
  ariaLabel?: string;
  onChange?: (v: T[]) => void;
  getOptionLabel(arg: T): string;
  onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
};

export function MultiCombobox<T>(props: SimpleSelectProps<T>): React.ReactElement {
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
  const [val, setValue] = useState<T[] | null | undefined>(value);
  const [inputData, setInputData] = useState<{ size: number; value: string | undefined }>({
    size: 0,
    value: '',
  });
  const toggleRef = useRef<HTMLInputElement>(null);

  const handlerChangeValue = (v: T[]): void => {
    if (typeof onChange === 'function') {
      onChange(v);
    }
    setValue(v);
    setInputData({ ...inputData, value: toggleRef.current?.value });
  };

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const arrValue = typeof val !== 'undefined' && val !== null ? [...val] : null;

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
    multi: true,
    value: arrValue,
    onChange: handlerChangeValue,
    optionsRef,
    scrollToIndex,
    disabled,
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

  const handleClear = (): void => {
    setValue(null);
  };

  const handleInputChange = (): void => {
    const inputValue = toggleRef.current?.value ?? '';
    setInputData({ value: inputValue, size: inputValue?.length });
  };

  const handleControlClick = (): void => {
    toggleRef.current?.focus();
  };

  const handleRemove = (val): void => {
    const newVal = arrValue?.filter((v) => JSON.stringify(v) !== JSON.stringify(val));
    setValue(newVal);
  };

  const valueTags = arrValue?.map((val) => (
    <Tag
      size={size}
      mode="cancel"
      onCancel={(): void => handleRemove(val)}
      key={getOptionLabel(val)}
      label={getOptionLabel(val)}
    />
  ));

  const showPlaceholder =
    (inputData?.size === 0 && !arrValue?.length) || (inputData?.size === 0 && arrValue === null);

  console.log({ ...inputData, arrValue });

  return (
    <Container focused={isFocused} disabled={disabled} size={size} {...restProps}>
      <div
        className={cnSelect('Control', { multi: true })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id={id}
      >
        <div className={cnSelect('ControlInner')} onClick={handleControlClick}>
          <div className={cnSelect('ControlValueContainer')}>
            {arrValue && <span className={cnSelect('ControlValue')}>{valueTags}</span>}
            {showPlaceholder && <span className={cnSelect('Placeholder')}>{placeholder}</span>}
            <input
              {...getToggleProps()}
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              aria-label={ariaLabel}
              ref={toggleRef}
              onChange={handleInputChange}
              size={inputData.size}
              value={inputData.value}
              className={cnSelect('Input', { size })}
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
          <Dropdown role="listbox" aria-activedescendant={`${id}-${highlightedIndex}`}>
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
          </Dropdown>
        </Popover>
      )}
    </Container>
  );
}
