import React from 'react';

import { GetOptionPropsResult, Option, OptionProps } from '../../../hooks/useSelect/useSelect';
import { Popover } from '../../Popover/Popover';
import { cnSelect } from '../cnSelect';
import { SelectDropdownContainer } from '../SelectDropdownContainer/SelectDropdownContainer';
import { PropSize } from '../types';

type Props<ITEM> = {
  size: PropSize;
  id: string;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  optionsRef: React.MutableRefObject<HTMLDivElement | null>;
  visibleOptions: Option<ITEM>[];
  highlightedIndex: number;
  getOptionProps(props: OptionProps): GetOptionPropsResult;
  onCreate?(newLabel: string): void;
  valueForCreate?: string;
  hasGroup?: boolean;
  selectedValues: ITEM[] | null;
  labelForCreate?: string;
  multi?: boolean;
  getOptionLabel(option: ITEM): string;
};

type SelectDropdown = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const SelectDropdown: SelectDropdown = (props) => {
  const {
    controlRef,
    visibleOptions,
    highlightedIndex,
    size,
    getOptionProps,
    valueForCreate,
    optionsRef,
    id,
    hasGroup = false,
    onCreate,
    selectedValues,
    labelForCreate,
    multi = false,
    getOptionLabel,
  } = props;

  const handleCreate = (): void => {
    if (typeof onCreate === 'function' && valueForCreate) {
      onCreate(valueForCreate);
    }
  };

  return (
    <Popover
      anchorRef={controlRef}
      possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
      offset={1}
    >
      <SelectDropdownContainer role="listbox" aria-activedescendant={`${id}-${highlightedIndex}`}>
        <div className={cnSelect('List', { size })} ref={optionsRef}>
          {visibleOptions.map((option, index: number) => {
            const isOptionForCreate = 'optionForCreate' in option;

            const currentOption = visibleOptions[index];
            const prevOption = visibleOptions[index - 1];
            const menuOption = isOptionForCreate ? visibleOptions[index + 1] : currentOption;

            const isFirstGroup =
              hasGroup && !isOptionForCreate && !visibleOptions[index - 1] && index === 0;

            const shouldShowGroupName =
              isFirstGroup || (hasGroup && prevOption && currentOption.group !== prevOption.group);

            return (
              <React.Fragment key={option.label}>
                {shouldShowGroupName && (
                  <div key={menuOption.group} className={cnSelect('GroupName')}>
                    {menuOption.group}
                  </div>
                )}
                <div
                  aria-selected={
                    !isOptionForCreate &&
                    selectedValues?.some(
                      (val) => getOptionLabel(val) === getOptionLabel(menuOption.item),
                    )
                  }
                  role="option"
                  key={option.label}
                  id={`${id}-${index}`}
                  {...getOptionProps({
                    index,
                    className: cnSelect(multi ? 'CheckItem' : 'ListItem', {
                      forCreate: isOptionForCreate,
                      active:
                        !isOptionForCreate &&
                        selectedValues?.some((val) => {
                          return getOptionLabel(val) === getOptionLabel(menuOption.item);
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
                          option.label.toLowerCase() === valueForCreate?.toLowerCase(),
                      )}
                      onClick={handleCreate}
                    >
                      + {labelForCreate} «<b>{valueForCreate}</b>»
                    </button>
                  ) : (
                    option.label
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </SelectDropdownContainer>
    </Popover>
  );
};
