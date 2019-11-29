import { SelectOptionT } from '../index';

const filterOption = (option: SelectOptionT, input: string) => {
  const candidate = option.label.trim().toLowerCase();

  return candidate.includes(input);
};

export const filterOptions = (options: SelectOptionT[], inputValue: string): SelectOptionT[] => {
  const input = inputValue.trim().toLowerCase();

  return options.filter(item => filterOption(item, input));
};

export function scrollIntoOption(menuEl: HTMLElement, focusedEl: HTMLElement): void {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  // Перескролл ставим на треть от высоты, так кажется наиболее консистентно
  const overScroll = focusedEl.offsetHeight / 3;
  const scrollableContent = menuEl as HTMLElement;

  if (scrollableContent) {
    if (focusedRect.bottom + overScroll > menuRect.bottom) {
      scrollableContent.scrollTop = Math.min(
        focusedEl.offsetTop + focusedEl.clientHeight - scrollableContent.offsetHeight + overScroll,
        scrollableContent.scrollHeight,
      );
    } else if (focusedRect.top - overScroll < menuRect.top) {
      scrollableContent.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
    }
  }
}

export const getValue = (
  options: SelectOptionT[],
  value: string | string[],
  allOption?: SelectOptionT,
) => {
  if (Array.isArray(value)) {
    if (allOption && value.some(val => val === allOption.value)) {
      return [allOption];
    }

    return value.reduce<SelectOptionT[]>((values, item) => {
      const selected = options.find(option => option.value === item);

      if (selected) {
        return values.concat(selected);
      }

      return values;
    }, []);
  }

  return options.find(option => option.value === value);
};

export const checkValue = (value?: string | string[]): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value) || value == 'new';
};

export const getMultiValues = ({
  values,
  newValue,
  remove,
  allOption,
}: {
  values: string[];
  newValue: string;
  remove?: boolean;
  isAllOptionChecked?: boolean;
  allOption?: string;
}) => {
  const currentValues = Array.isArray(values) ? values : [];

  if (allOption && allOption === newValue) {
    return remove || currentValues.includes(allOption) ? [] : [allOption];
  }

  if (remove || currentValues.some(item => item === newValue)) {
    return currentValues.filter(item => item !== newValue);
  }

  return currentValues.filter(value => value !== allOption).concat(newValue);
};

export const getIntermediateMultiValues = (
  values: string[],
  newValue: string,
  allOption?: string,
) => {
  return values.filter(val => val !== newValue && val !== allOption);
};

export const SELECT_CLOSE_EVENT = 'selectclose';

export type SelectCloseEventDetail = { target: HTMLDivElement };

export const fireCloseEvent = (target: HTMLDivElement) => {
  window.dispatchEvent(
    new CustomEvent<SelectCloseEventDetail>(SELECT_CLOSE_EVENT, { detail: { target } }),
  );
};
