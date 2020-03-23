import React, { useMemo, useEffect } from 'react';
import { SelectOptionWithLevelT } from '..';
import { parseFlatOptionValue, NEW_OPTION_VALUE, OptionsChildsT } from '../utils';
import { Option, EmptyOption, NewOption } from '../Option';
import bem from '../../../utils/bem';

import './styles.css';
import { useCollapseContent } from '../../../hooks/useCollapseContent';
import Button from '../../Button';

const b = bem('select-options-list');

const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 6.406l-4.297 4.297L2.29 9.289 8 3.577l5.712 5.712-1.415 1.414L8 6.406z"
    />
  </svg>
);

type Props = {
  availableOptions: SelectOptionWithLevelT[];
  parentChildRelations: OptionsChildsT;
  selectedOption: SelectOptionWithLevelT | SelectOptionWithLevelT[] | null;
  isMulti: boolean | undefined;
  focusedOption: string | undefined;
  focusedElementRef: React.RefObject<HTMLDivElement>;
  isCreatable: boolean | undefined;
  newValueText: string;
  formatLabel?: (option: SelectOptionWithLevelT) => React.ReactNode;
  handleOptionSelect: (value: string) => void;
  expandAll: boolean;
  name: string;
  isHierarchical?: boolean;
  wpSize: 'xs' | 's' | 'm' | 'l';
};
const OptionsGroup: React.FC<
  {
    option: SelectOptionWithLevelT;
  } & Omit<Props, 'isHierarchical'>
> = ({
  parentChildRelations,
  option,
  selectedOption,
  isMulti,
  focusedElementRef,
  focusedOption,
  handleOptionSelect,
  newValueText,
  isCreatable,
  formatLabel,
  name,
  expandAll,
  availableOptions,
  wpSize,
}) => {
  const { value, label, level } = option;

  const { childOptions } = parentChildRelations[value];

  const isSelected = option.selectionState === 'selected';
  const isIntermediate = option.selectionState === 'part';
  const isSelectedByParent = option.selectedParentValue !== null;

  const isFocused = option.value === focusedOption;
  const originalValue = parseFlatOptionValue(option.value).value;

  const availableChildOptions: SelectOptionWithLevelT[] = useMemo(
    () => childOptions.filter(o => availableOptions.includes(o)),
    [availableOptions],
  );

  const {
    content: childOptionsContent,
    onClick: onCollapseClick,
    isOpened: childOptionsIsOpened,
  } = useCollapseContent({
    children: (
      <>
        {availableChildOptions.map(childOption => (
          <OptionsGroup
            key={`group:${childOption.value}`}
            parentChildRelations={parentChildRelations}
            option={childOption}
            selectedOption={selectedOption}
            isMulti={isMulti}
            focusedElementRef={focusedElementRef}
            focusedOption={focusedOption}
            handleOptionSelect={handleOptionSelect}
            newValueText={newValueText}
            isCreatable={isCreatable}
            formatLabel={formatLabel}
            name={name}
            expandAll={expandAll}
            availableOptions={availableOptions}
            wpSize={wpSize}
          />
        ))}
      </>
    ),
    defaultOpen: isIntermediate || expandAll || level === 0,
  });

  useEffect(() => {
    if (expandAll && !childOptionsIsOpened) {
      onCollapseClick();
    }
  }, [expandAll]);

  const toggleChildOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCollapseClick();
  };
  return (
    <div className={b('group')}>
      <Option
        key={value}
        isSelected={isSelected || isSelectedByParent}
        isNewOption={originalValue === NEW_OPTION_VALUE}
        isIntermediate={isIntermediate}
        isFocused={isFocused}
        indentLevel={level}
        value={value}
        isMulti={isMulti}
        focusedRef={isFocused ? focusedElementRef : undefined}
        onSelect={handleOptionSelect}
        wpSize={wpSize}
      >
        {isCreatable && originalValue === NEW_OPTION_VALUE ? (
          <NewOption placeholder={newValueText}>{label}</NewOption>
        ) : formatLabel ? (
          formatLabel(option)
        ) : (
          label
        )}
      </Option>
      {Boolean(childOptions.length) && (
        <Button
          wpSize="xs"
          view="clear"
          iconOnly
          type="button"
          tabIndex={-1}
          onClick={toggleChildOptions}
          className={b('collapse', { down: !childOptionsIsOpened })}
        >
          <ArrowUpIcon className={b('icon')} />
        </Button>
      )}
      {childOptionsContent}
    </div>
  );
};

export const OptionsList: React.FC<Props> = props => {
  const { availableOptions, wpSize } = props;
  const renderHierachicalList = () => {
    const rootOptions = availableOptions.filter(o => o.parentValue === null);
    return (
      <>
        {rootOptions.map(option => (
          <OptionsGroup key={`group:${option.value}`} option={option} {...props} />
        ))}
      </>
    );
  };

  const renderFlatList = () => {
    const {
      isMulti,
      focusedElementRef,
      focusedOption,
      handleOptionSelect,
      newValueText,
      isCreatable,
      formatLabel,
      availableOptions,
    } = props;

    return (
      <>
        {availableOptions.map(option => {
          const isSelected = option.selectionState === 'selected';
          const isIntermediate = option.selectionState === 'part';

          const isFocused = option.value === focusedOption;
          const originalValue = parseFlatOptionValue(option.value).value;

          return (
            <Option
              key={option.value}
              isSelected={isSelected}
              isNewOption={originalValue === NEW_OPTION_VALUE}
              isIntermediate={isIntermediate}
              isFocused={isFocused}
              indentLevel={option.level}
              value={option.value}
              isMulti={isMulti}
              focusedRef={isFocused ? focusedElementRef : undefined}
              onSelect={handleOptionSelect}
              wpSize={wpSize}
            >
              {isCreatable && originalValue === NEW_OPTION_VALUE ? (
                <NewOption placeholder={newValueText}>{option.label}</NewOption>
              ) : formatLabel ? (
                formatLabel(option)
              ) : (
                option.label
              )}
            </Option>
          );
        })}
      </>
    );
  };

  const options = (
    <>
      {!availableOptions.length && <EmptyOption>Нет подходящих вариантов</EmptyOption>}
      {props.isHierarchical ? renderHierachicalList() : renderFlatList()}
    </>
  );

  return options;
};
