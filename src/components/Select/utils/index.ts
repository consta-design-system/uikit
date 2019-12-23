import sortBy from 'lodash/sortBy';
import flatMap from 'lodash/flatMap';
import { SelectValueTypeT, SelectOptionT, SelectOptionWithLevelT, ObjectValueT } from '../index';

type NewOptionValueType = 'new';

export const NEW_OPTION_VALUE: NewOptionValueType = 'new';

export function scrollIntoOption(menuEl: HTMLElement, focusedEl: HTMLElement): void {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  // Перескролл ставим на треть от высоты, так кажется наиболее консистентно
  const overScroll = focusedEl.offsetHeight / 3;
  const scrollableContent = menuEl as HTMLElement;

  if (!scrollableContent) {
    return;
  }

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollableContent.scrollTop = Math.min(
      focusedEl.offsetTop + focusedEl.clientHeight - scrollableContent.offsetHeight + overScroll,
      scrollableContent.scrollHeight,
    );
    return;
  }

  if (focusedRect.top - overScroll < menuRect.top) {
    scrollableContent.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
    return;
  }
}

export const getSelectedOptions = (options: SelectOptionWithLevelT[], value: string | string[]) => {
  const valueForOption = (option: SelectOptionWithLevelT, value: string | string[]) => {
    return option.value === value;
  };

  if (Array.isArray(value)) {
    return value.reduce<SelectOptionWithLevelT[]>((values, item) => {
      const selected = options.find(option => valueForOption(option, item));

      return selected ? values.concat(selected) : values;
    }, []);
  }

  return options.find(option => valueForOption(option, value)) || null;
};

export const createFlatOptionValue = ({ value, level }: ObjectValueT) => `${level}/${value}`;

export const parseFlatOptionValue = (value: string): ObjectValueT => {
  const [level, originalValue] = value.split('/');
  return {
    level: Number(level),
    value: originalValue,
  };
};

export const getFlatOptionsList = (
  options: SelectOptionT[],
  selectedValue: string | string[] | undefined,
  level = 0,
  parentValue: string | null = null,
  selectedParentValue: string | null = null,
): { list: SelectOptionWithLevelT[]; selectionState: 'selected' | 'part' | 'none' } => {
  const list: SelectOptionWithLevelT[] = options.reduce<SelectOptionWithLevelT[]>((res, option) => {
    const leveledValue = createFlatOptionValue({ value: option.value, level });

    const isSelected = Array.isArray(selectedValue)
      ? selectedValue.includes(leveledValue)
      : selectedValue === leveledValue;

    const { list: subOptions, selectionState: subOptionsSelection } = getFlatOptionsList(
      option.subOptions || [],
      selectedValue,
      level + 1,
      leveledValue,
      isSelected ? leveledValue : selectedParentValue,
    );

    return [
      ...res,
      {
        value: leveledValue,
        originalValue: option.value,
        label: option.label,
        level,
        parentValue,
        selectedParentValue,
        selectionState: isSelected || selectedParentValue ? 'selected' : subOptionsSelection,
      },
      ...subOptions,
    ];
  }, []);

  const selectedOptionsOnLevel = list.filter(o => ['selected'].includes(o.selectionState));

  const partSelected =
    selectedOptionsOnLevel.length > 0 && selectedOptionsOnLevel.length < list.length;
  const allSelected =
    selectedOptionsOnLevel.length > 0 && selectedOptionsOnLevel.length === list.length;

  const selectionState = partSelected ? 'part' : allSelected ? 'selected' : 'none';

  return {
    list,
    selectionState,
  };
};

export type OptionsChildsT = {
  [value: string]: {
    option: SelectOptionWithLevelT;
    childValues: string[];
    childOptions: SelectOptionWithLevelT[];
    isSelected: boolean;
    isSelectedByParent: boolean;
  };
};

const isOptionSelected = (
  value: string | null,
  selectedOption: SelectOptionWithLevelT | SelectOptionWithLevelT[] | null,
) =>
  Array.isArray(selectedOption)
    ? selectedOption.some(o => o.value === value)
    : Boolean(selectedOption && selectedOption.value === value);

export const getOptionsRelations = (
  availableOptions: SelectOptionWithLevelT[],
  selectedOption: SelectOptionWithLevelT | SelectOptionWithLevelT[] | null,
): OptionsChildsT => {
  return sortBy(availableOptions, o => o.level).reduce<OptionsChildsT>((res, option) => {
    res[option.value] = res[option.value] || {
      option: option,
      childValues: [],
      childOptions: [],
      isSelected: isOptionSelected(option.value, selectedOption),
      isSelectedByParent:
        option.parentValue !== null &&
        Boolean(res[option.parentValue]) &&
        (res[option.parentValue].isSelected || res[option.parentValue].isSelectedByParent),
    };

    if (option.parentValue !== null) {
      res[option.parentValue] = {
        ...res[option.parentValue],
        childValues: [...res[option.parentValue].childValues, option.value],
        childOptions: [...res[option.parentValue].childOptions, option],
      };
    }

    return res;
  }, {});
};

export const checkValue = (value?: SelectValueTypeT | SelectValueTypeT[]): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value) || value == 'new';
};

export const toggleValue = ({
  values,
  newValue,
  optionsRelations,
}: {
  values: string[];
  newValue: string;
  optionsRelations: OptionsChildsT;
}) => {
  const getOptionByValue = (optionValue: string) =>
    optionsRelations[optionValue] && optionsRelations[optionValue].option;

  const options = Object.values(optionsRelations).map(r => r.option);

  const option = getOptionByValue(newValue);

  if (!option) {
    throw new Error(`Что-то пошло не так, в списке опций нет значения "${newValue}"`); // yaspeller ignore
  }

  const isSelectedNow = values.includes(option.value);

  if (isSelectedNow) {
    return values.filter(v => v !== newValue);
  }

  const selectedParent =
    option.selectedParentValue !== null ? getOptionByValue(option.selectedParentValue) : null;

  const getParentsForSelect = (
    currentOption: SelectOptionWithLevelT,
    parentShouldBeSelected: SelectOptionWithLevelT | null = null,
  ): SelectOptionWithLevelT | null => {
    if (selectedParent || currentOption.parentValue === null) {
      return parentShouldBeSelected;
    }

    const parentOption = getOptionByValue(currentOption.parentValue);

    const nonSelectedOptionsWithSameParent = options.filter(
      o =>
        o.value !== currentOption.value &&
        o.parentValue === currentOption.parentValue &&
        o.selectionState !== 'selected',
    );

    const selectParent = nonSelectedOptionsWithSameParent.length === 0 ? parentOption : null;

    return selectParent ? getParentsForSelect(selectParent, selectParent) : parentShouldBeSelected;
  };

  const getAllChildValues = (optionValue: string): string[] => {
    const childValues = optionsRelations[optionValue]
      ? optionsRelations[optionValue].childValues
      : [];

    return [...childValues, ...flatMap(childValues.map(getAllChildValues))];
  };

  const parentForSelect = getParentsForSelect(option);

  const valuesForUnselect = parentForSelect ? getAllChildValues(parentForSelect.value) : [];

  const childValues = getAllChildValues(option.value);

  if (parentForSelect) {
    return values.filter(v => !valuesForUnselect.includes(v)).concat(parentForSelect.value);
  }

  if (selectedParent) {
    return values
      .filter(v => v !== selectedParent.value)
      .concat(
        options
          .filter(
            o =>
              ![option.value, option.parentValue].includes(o.value) &&
              (o.level < option.level || o.parentValue === option.parentValue) &&
              o.selectedParentValue === selectedParent.value,
          )
          .map(o => o.value),
      );
  }

  return values.filter(v => !childValues.includes(v)).concat(newValue);
};

export const SELECT_CLOSE_EVENT = 'selectclose';

export type SelectCloseEventDetail = { target: HTMLDivElement };

export const fireCloseEvent = (target: HTMLDivElement) => {
  window.dispatchEvent(
    new CustomEvent<SelectCloseEventDetail>(SELECT_CLOSE_EVENT, { detail: { target } }),
  );
};

const filterOption = (option: SelectOptionWithLevelT, input: string) => {
  const candidate = option.label.trim().toLowerCase();

  return candidate.includes(input);
};

export const filterOptions = (
  options: SelectOptionWithLevelT[],
  inputValue: string,
): SelectOptionWithLevelT[] => {
  const input = inputValue.trim().toLowerCase();

  return options.filter(item => filterOption(item, input));
};
