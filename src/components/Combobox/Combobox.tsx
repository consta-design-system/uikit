import '../SelectComponents/Select.css';

import React, { useMemo, useRef, useState } from 'react';

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
  onCreate?(str: string): void;
  getGroupOptions?(group: T): T[];
}

type ComboboxType = <T>(props: ComboboxSelectProps<T>) => React.ReactElement | null;

type OptionType<TO> = Exclude<TO, { optionForCreate: boolean }>;

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
    onCreate,
    getGroupOptions,
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
  const hasGroup = typeof getGroupOptions === 'function';

  const scrollToIndex = (index: number): void => {
    if (!optionsRef.current) {
      return;
    }

    const elements: NodeListOf<HTMLDivElement> = optionsRef.current.querySelectorAll(
      'div[role=option]',
    );

    scrollIntoView(elements[index], optionsRef.current);
  };

  const flatOptions = useMemo(
    () =>
      options
        .map((group) => {
          const label = getOptionLabel(group);
          const items = typeof getGroupOptions === 'function' ? getGroupOptions(group) : [];
          return items.map((item) => ({ ...item, group: label }));
        })
        .flat(),
    [options],
  );

  const {
    visibleOptions,
    highlightedIndex,
    getToggleProps,
    getOptionProps,
    isOpen,
    setOpen,
  } = useSelect({
    options: hasGroup ? flatOptions : options,
    value: arrValue,
    onChange: handlerChangeValue,
    optionsRef,
    scrollToIndex,
    disabled,
    getOptionLabel,
    onCreate,
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

  const handleClear = (e: React.FormEvent): void => {
    setInputData({ value: '' });
    setValue(null);
    const a = getToggleProps();
    typeof a.onChange === 'function' && a.onChange(e);
    toggleRef.current?.focus();
  };

  const handleClearButtonFocus = (): void => {
    setIsFocused(true);
  };

  const handleClearButtonBlur = (): void => {
    setIsFocused(false);
  };

  const handleInputChange = (): void => {
    if (!isOpen) {
      setOpen(true);
    }
    const inputValue = toggleRef.current?.value ?? '';
    setInputData({ value: inputValue });
  };

  const handleControlClick = (): void => {
    toggleRef.current?.focus();
  };

  const showPlaceholder =
    (!arrValue?.length && inputData.value === '') || (arrValue === null && inputData.value === '');

  const showInput = arrValue !== null && arrValue.length > 0;

  const handleCreate = (): void => {
    if (typeof onCreate === 'function') {
      const newValue = toggleRef.current?.value;
      newValue && onCreate(newValue);
    }
  };

  return (
    <SelectContainer focused={isFocused} disabled={disabled} size={size} {...restProps}>
      <div
        className={cnSelect('Control', { hasInput: true })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id={id}
      >
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div
          className={cnSelect('ControlInner')}
          onClick={handleControlClick}
          onKeyDown={handleControlClick}
          role="button"
        >
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
            <button
              type="button"
              onClick={handleClear}
              className={cnSelect('ClearIndicator')}
              onFocus={handleClearButtonFocus}
              onBlur={handleClearButtonBlur}
            >
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
                const isOptionForCreate = 'optionForCreate' in option;

                const menuOption = isOptionForCreate
                  ? (visibleOptions[index + 1] as OptionType<typeof option>)
                  : (option as OptionType<typeof option>);

                const isFirstGroup =
                  hasGroup && !isOptionForCreate && !visibleOptions[index - 1] && index === 0;

                const shouldShowGroupName =
                  isFirstGroup ||
                  (hasGroup &&
                    visibleOptions[index - 1] &&
                    visibleOptions[index].group !== visibleOptions[index - 1].group);

                return (
                  <>
                    {shouldShowGroupName && (
                      <div key={index} className={cnSelect('GroupName')}>
                        {menuOption.group}
                      </div>
                    )}
                    <div
                      aria-selected={arrValue?.some(
                        (val) => JSON.stringify(val) === JSON.stringify(option),
                      )}
                      role="option"
                      key={isOptionForCreate ? inputData.value : getOptionLabel(menuOption)}
                      id={`${id}-${index}`}
                      {...getOptionProps({
                        index,
                        className: cnSelect('ListItem', {
                          forCreate: isOptionForCreate,
                          active:
                            !isOptionForCreate &&
                            arrValue?.some((val) => {
                              return JSON.stringify(val) === JSON.stringify(menuOption);
                            }),
                          hovered: index === highlightedIndex,
                        }),
                      })}
                    >
                      {isOptionForCreate ? (
                        <button
                          type="button"
                          className={cnSelect('CreateOption')}
                          disabled={visibleOptions.some(
                            (option, index) =>
                              index !== 0 &&
                              getOptionLabel(menuOption).toLowerCase() ===
                                inputData.value?.toLowerCase(),
                          )}
                          onClick={handleCreate}
                        >
                          + Добавить «<b>{inputData.value}</b>»
                        </button>
                      ) : (
                        getOptionLabel(menuOption)
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </SelectDropdown>
        </Popover>
      )}
    </SelectContainer>
  );
};
