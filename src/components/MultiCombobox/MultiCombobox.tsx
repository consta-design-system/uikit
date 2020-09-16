import React, { useRef, useState } from 'react';

import { useSelect } from '../../hooks/useSelect/useSelect';
import { IconClose } from '../../icons/IconClose/IconClose';
import { IconSelect } from '../../icons/IconSelect/IconSelect';
import { cnMixFocus } from '../../mixs/MixFocus/MixFocus';
import { scrollIntoView } from '../../utils/scrollIntoView';
import { cnSelect } from '../SelectComponents/cnSelect';
import { SelectContainer } from '../SelectComponents/SelectContainer/SelectContainer';
import { SelectDropdown } from '../SelectComponents/SelectDropdown/SelectDropdown';
import {
  CommonSelectProps,
  DefaultPropForm,
  DefaultPropSize,
  DefaultPropView,
} from '../SelectComponents/types';
import { Tag } from '../Tag/Tag';

export type MultiComboboxProps<ITEM> = CommonSelectProps<ITEM> & {
  value?: ITEM[] | null;
  onChange?: (v: ITEM[] | null) => void;
  onCreate?(str: string): void;
  getGroupOptions?(group: ITEM): ITEM[];
  labelForCreate?: string;
};

type MultiComboboxType = <ITEM>(props: MultiComboboxProps<ITEM>) => React.ReactElement | null;

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
    form = DefaultPropForm,
    view = DefaultPropView,
    size = DefaultPropSize,
    onCreate,
    getGroupOptions,
    labelForCreate = 'Добавить',
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
  const arrValue: typeof val | null = typeof val !== 'undefined' && val !== null ? [...val] : null;
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
    const handleCancel = (e: React.SyntheticEvent): void => {
      e.stopPropagation();
      handleRemoveValue(label);
    };
    const commonProps = {
      size,
      label,
      key: getOptionLabel(option),
      className: cnSelect('Tag'),
    };
    return disabled ? (
      <Tag mode="info" {...commonProps} />
    ) : (
      <Tag mode="cancel" {...commonProps} onCancel={handleCancel} />
    );
  });

  const getInputWidth = (): number => {
    if (!toggleRef.current || !controlRef.current) {
      return 0;
    }

    const fakeEl = document.createElement('div');
    fakeEl.style.cssText =
      'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;';
    document.body.appendChild(fakeEl);

    const string = toggleRef.current.value;
    fakeEl.innerHTML = string;

    const fakeElWidth = fakeEl.offsetWidth + 10;

    document.body.removeChild(fakeEl);

    const controlRefWidth = controlRef.current.offsetWidth - 50;

    return fakeElWidth > controlRefWidth ? controlRefWidth : fakeElWidth;
  };

  const inputWidth = React.useMemo(() => getInputWidth(), [inputData.value, arrValue]);

  return (
    <SelectContainer
      focused={isFocused}
      disabled={disabled}
      size={size}
      view={view}
      form={form}
      multi
      {...restProps}
    >
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
              <div className={cnSelect('Placeholder', { isHidden: !showPlaceholder })}>
                {placeholder}
              </div>
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
        <SelectDropdown
          size={size}
          controlRef={controlRef}
          visibleOptions={visibleOptions}
          highlightedIndex={highlightedIndex}
          getOptionProps={getOptionProps}
          onCreate={handleCreate}
          optionsRef={optionsRef}
          valueForCreate={inputData.value}
          id={id}
          hasGroup={hasGroup}
          selectedValues={arrValue}
          labelForCreate={labelForCreate}
          multi
          getOptionLabel={getOptionLabel}
        />
      )}
    </SelectContainer>
  );
};
