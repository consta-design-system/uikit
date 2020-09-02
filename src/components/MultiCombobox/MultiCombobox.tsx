import '../SelectComponents/Select.css';

import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { Popover } from '../Popover/Popover';
import { cnSelect } from '../SelectComponents/cnSelect';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import { CommonSelectProps } from '../SelectComponents/types';
import { Tag } from '../Tag/Tag';

export interface MultiComboboxProps<T> extends CommonSelectProps<T> {
  value?: T[] | null;
  onChange?: (v: T[] | null) => void;
  onCreate?(str: string): void;
  getGroupOptions?(group: T): T[];
}

type MultiComboboxType = <T>(props: MultiComboboxProps<T>) => React.ReactElement | null;

export const MultiCombobox: MultiComboboxType = (props) => {
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
  const controlRef = useRef<HTMLDivElement | null>(null);
  const arrValue = typeof val !== 'undefined' && val !== null ? [...val] : null;
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

  const onSelectOption = (): void => {
    setInputData({ value: '' });
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
    controlRef,
    scrollToIndex,
    disabled,
    getOptionLabel,
    onCreate,
    getGroupOptions,
    multi: true,
    onSelectOption,
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!disabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
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
    setInputData({ value: '' });
    setValue(null);
    typeof onChange === 'function' && onChange(null);
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
    if (!isFocused) {
      setOpen(!isOpen);
    }
  };

  const showPlaceholder =
    (!arrValue?.length && inputData.value === '') || (arrValue === null && inputData.value === '');

  const handleCreate = (): void => {
    if (typeof onCreate === 'function') {
      const newValue = toggleRef.current?.value.trim();
      newValue && onCreate(newValue);
    }
  };

  const handleRemoveValue = (optionLabel: string): void => {
    const newVal = arrValue?.filter((arrVal) => getOptionLabel(arrVal) !== optionLabel);
    handlerChangeValue(newVal);
  };

  const valueTags = arrValue?.map((option) => {
    const label = getOptionLabel(option);
    return (
      <Tag
        mode="cancel"
        size={size}
        label={label}
        key={getOptionLabel(option)}
        className={cnSelect('Tag')}
        onCancel={(): void => handleRemoveValue(label)}
      />
    );
  });

  const getInputWidth = (): number => {
    if (!toggleRef.current) {
      return 0;
    }

    const fakeEl = document.createElement('div');
    fakeEl.style.cssText =
      'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;';
    document.body.appendChild(fakeEl);

    const string = toggleRef.current.value;
    fakeEl.innerHTML = string;

    return fakeEl.offsetWidth + 10;
  };

  const inputWidth = getInputWidth();

  return (
    <SelectContainer focused={isFocused} disabled={disabled} size={size} multi {...restProps}>
      <div
        className={cnSelect('Control', { hasInput: true })}
        ref={controlRef}
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
            <div className={cnSelect('ControlValue')}>
              {showPlaceholder && <div className={cnSelect('Placeholder')}>{placeholder}</div>}
              {valueTags}
              <input
                {...getToggleProps({ onChange: handleInputChange })}
                type="text"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                aria-label={ariaLabel}
                ref={toggleRef}
                value={inputData.value}
                className={cnSelect('Input', { size })}
                style={{ width: inputWidth }}
              />
            </div>
          </div>
        </div>
        <div className={cnSelect('Indicators')}>
          {arrValue && arrValue.length !== 0 && (
            <button
              type="button"
              onClick={handleClear}
              className={cnSelect('ClearIndicator', [cnMixFocus()])}
              onFocus={handleClearButtonFocus}
              onBlur={handleClearButtonBlur}
            >
              <IconClose size="xs" className={cnSelect('ClearIndicatorIcon')} />
            </button>
          )}
          <div className={cnSelect('Delimiter')} />
          <button
            type="button"
            className={cnSelect('IndicatorsDropdown')}
            tabIndex={-1}
            onClick={handleToggleDropdown}
          >
            <IconSelect size="xs" className={cnSelect('DropdownIndicatorIcon')} />
          </button>
        </div>
      </div>
      {isOpen && (
        <Popover
          anchorRef={controlRef}
          possibleDirections={['downCenter', 'upLeft', 'downRight', 'upRight']}
          offset={1}
        >
          <SelectDropdown role="listbox" aria-activedescendant={`${id}-${highlightedIndex}`}>
            <div className={cnSelect('List', { size })} ref={optionsRef}>
              {visibleOptions.map((option, index: number) => {
                const isOptionForCreate = 'optionForCreate' in option;

                const currentOption = visibleOptions[index];
                const prevOption = visibleOptions[index - 1];
                const menuOption = isOptionForCreate ? visibleOptions[index + 1] : currentOption;

                const isFirstGroup =
                  hasGroup && !isOptionForCreate && !visibleOptions[index - 1] && index === 0;

                const shouldShowGroupName =
                  isFirstGroup ||
                  (hasGroup && prevOption && currentOption.group !== prevOption.group);

                return (
                  <>
                    {shouldShowGroupName && (
                      <div key={menuOption.group} className={cnSelect('GroupName')}>
                        {menuOption.group}
                      </div>
                    )}
                    <div
                      aria-selected={arrValue?.some(
                        (val) => JSON.stringify(val) === JSON.stringify(option),
                      )}
                      role="option"
                      key={option.label}
                      id={`${id}-${index}`}
                      {...getOptionProps({
                        index,
                        className: cnSelect('CheckItem', {
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
                              option.label.toLowerCase() === inputData.value?.toLowerCase(),
                          )}
                          onClick={handleCreate}
                        >
                          + Добавить «<b>{inputData.value}</b>»
                        </button>
                      ) : (
                        option.label
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
